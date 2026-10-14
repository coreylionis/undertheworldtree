/**
createPages() to build pages and paths from mdx files. 
onCreateNode() to produce excerpt from mdx files.
createSchemaCustomisation() to specify structure of data in graphQL queries.
*/

import { createRequire } from "module"
import gatsbyRemarkKatex from "gatsby-remark-katex"
import { katexOptions } from "./gatsby-config.mjs"
import { unified } from "unified"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"

const require = createRequire(import.meta.url)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Location of template for math blogs
const personalMath = path.resolve(`./src/templates/personalMath.js`)
const talks = path.resolve(`./src/templates/mathsTalkTemplate.js`)
const blogs = path.resolve(`./src/templates/mathsBlogPost.js`)
const notes = path.resolve(`./src/templates/notes.js`)
const notesIndex = path.resolve(`./src/templates/notesIndex.js`)
const blogIndex = path.resolve(`./src/templates/blogIndex.js`)
const privateIndex = path.resolve(`./src/templates/privateIndex.js`)

/*
note to self: the underlying code to retrieve modifiedTime for files is fs.stat. 
this basically parses internal file metadata. 
*/ 

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

export async function createPages ({ graphql, actions, reporter }) {
  const { createPage } = actions
  /* Get all math posts sorted by date */
  const result = await graphql(`
    query {
      allMdx(sort: {frontmatter: {date: ASC } } ) {
          nodes {
            id
            extract
            path
            frontmatter {
              title
              alttitle
              speaker
              date(formatString: "MMMM D, YYYY")
              tags
              slug
            }
            parent { 
              ...on File {
              modifiedTime(formatString: "MMMM D, YYYY")
              }
            }
            }
          }
        }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading data through graphQL:`,
      result.errors
    )
    return
  }

  const mdx = result.data.allMdx.nodes;
  /* match tags to the corresponding createPage inputs */
  const params = {
      'talk': ['/maths/notes/', talks, ['frontmatter.slug', 'frontmatter.title', 'frontmatter.alttitle', 'frontmatter.speaker']], 
      'private': ['/forme/', personalMath, ['frontmatter.slug', 'frontmatter.title']],
      'reference': ['/maths/notes/', notes,  ['frontmatter.slug', 'frontmatter.title']], 
      'blog': ['/maths/blog/', blogs, ['frontmatter.slug', 'frontmatter.title', 'frontmatter.alttitle', 'frontmatter.date', 'extract', 'parent.modifiedTime']]
  };

  /* preprocess node information */ 
  function extractData(node, key) {
    var data = Object.fromEntries(params[key][2].map((p) => { 
      let args = p.split('.'); 
      /*
      reduce pattern: output becomes input until array turns into singleton 
      in our case, we want to do this to args.
      the reduce pattern will be (a, b) => a?.[b]. 
      */ 
      return [args[args.length-1], args.reduce((current, key) => current?.[key], node)] }
    ));
    return data;
  }

  builder(mdx);

  /* runs createPage on a post paired with its tag. */
  function buildMath(tag, post, neighbours) {
      try {
        createPage({
          path: params[tag][0] + post.frontmatter.slug,
          component: params[tag][1] + `?__contentFilePath=${post.path}`,
          context: {
            id: post.id, 
            title: post.frontmatter.title,
            alttitle: post.frontmatter.alttitle, 
            dateCreated: post.frontmatter.date,
            dateModified: post.parent.modifiedTime,
            tags: post.frontmatter.tags, 
            slug: post.frontmatter.slug, 
            speaker: post.frontmatter?.speaker, 
            extract: post.extract,
            neighbours: neighbours,
          }
        })
    }
      catch (error) { reporter.panic(`Failed building page ${post.frontmatter.slug}:`, error) }
  };

  /* runs createPage for index pages */ 
  function buildIndex(key, context) {
    if (key === 'blog') {
      try { 
        const blogPages = context.map( p => extractData(p, 'blog'))
        createPage({ path: '/maths/blog/', component: blogIndex, context: { data: blogPages }});
          }
      catch (error) { 
            reporter.panic(`Failed building blog index page:`, error);
          }
    }
    else if (key === 'private') {
      try { 
        const privatePages = context.map( p => extractData(p, 'private'))
        createPage({ path: '/forme/', component: privateIndex, context: { data: privatePages }});
          }
      catch (error) { 
            reporter.panic(`Failed building private index page:`, error);
          }
    }
    else {
         try { 
          const notePages = [context[0].map( p => extractData(p, 'talk')), context[1].map(p => extractData(p, 'reference'))]
          createPage({ path: '/maths/notes/', component: notesIndex, context: { data: notePages }});
          }
          catch (error) { 
            reporter.panic(`Failed building private index page:`, error);
          }
    }
    return
  };

  /* builds all maths pages from templates */
  function builder(nodes) {
    var talks = null;
    var notes = null;

    /* syntactic sugar: for each key, filter nodes for tags matching that key and then run the build process. */
    Object.keys(params).forEach((k) => {
      let keyed = nodes.filter((node) => node.frontmatter.tags.includes(k));
      /* builds all posts with a given key, passing only the parameters we need later */ 
      for (let i = 0; i < keyed.length; i++) {
        buildMath(k, keyed[i], [i === 0 ? null : extractData(keyed[i-1], k), i === keyed.length-1 ? null: extractData(keyed[i+1], k)])
      };

      if (k === 'talk') {
        talks = keyed;
      }
      else if (k === 'reference') {
        notes = keyed;
      }
      else {
        buildIndex(k, keyed);
      }
      /* Case logic to build the index pages: will require a 'balls and bins' approach since we don't have 
         access to a node we can update state of and also can't run graphQl. */ 
    }) 
    buildIndex('notes', [talks, notes])
  };
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
// Original source: https://suhasdara.me/blogs/gatsby-mdx-excerpts/

/*
Mdx nodes automatically come with a (bad) excerpt, so I use a new extract field to replace this.
  1. Find start and end tags which specify the extract in body.
  2. Add the field we've just created to the MDX node. 
The resolver implementation below takes the Mdx extract and runs the unified pipeline on it: 
converting to mdAST, adding Katex html, converting to hast, and eventually rewriting to html.

Common typo: if an extract tag starts after an unclosed (with ;) import it can cause read errors.
*/ 
export const onCreateNode = ({ node, actions, reporter }) => {
  const { createNodeField } = actions;

  /* extract field for mdx nodes */
  function createExtract(start, end, maxLength) {
    let content = node.body;
    let extractStart = content.indexOf(start);
    let extractEnd = content.indexOf(end);
    var extract = '';
    /* Checks from back of extract to find terminating character, stripping to first occurrence */ 
    function stripToEnd( str ) {
      const endChars = ['!', '.', '?', ':', ';', ',', ];
      var endIndex = str.length-1;
      while (endIndex > 0) {
        if (endChars.includes(str[endIndex])) {
          return str.substring(0, endIndex + 1);
        }
        endIndex--;
      }
      return str
    }


    if (extractStart !== -1 && extractEnd !== -1) {
      try {
        extract = content.substring(extractStart + start.length, Math.min(extractEnd, maxLength)).trim();
        if (extractEnd > maxLength) {
          extract = stripToEnd(extract) + '...';
        }
      }
      catch (error) {
        reporter.warn(`Failed to construct extract with error`, error);
        reporter.log('The extract field will be rewritten as empty.');
        extract = '';
      }
    }
    createNodeField({
        node,
        name: `extract`,
        value: extract,
    });
    return
  }

  /* fields for mdx */
  if(node.internal.type === `Mdx`) {
    const start = "{/* excerpt start */}";
    const end = "{/* excerpt end */}"; //extract separator
    const tooLong = 2000;
    createExtract(start, end, tooLong);
  }

};

/**
 * @type {import('gatsby').GatsbyNode['createResolvers']}
 */


export const createResolvers = ({ createResolvers, reporter  }) => {
  const resolvers = {
      Mdx: {
        extract: { 
          /* I write out all expected params for the resolve to avoid headaches even though I don't use them */
          resolve: async (source, args, context, info) => {
            try {
            var result = await unified().use(remarkParse).use(remarkMath).parse(source.fields.extract)
            gatsbyRemarkKatex({ markdownAST: result}, katexOptions)
            result = await unified().use(remarkRehype).run(result)
            result = await unified().use(rehypeStringify, { allowDangerousHtml: true }).stringify(result)
            return result
          }
          catch (e) {
            reporter.warn('The problem is:' + e)
          }
          }
        }
      }
  }
  createResolvers(resolvers)
}



/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
export const createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  /* types specifying Mdx fields, Site Metadata, and types for the head api (unused) */ 
  createTypes(`
    type SiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
      extract: String @proxy(from: "fields.extract")
      path: String @proxy(from: "internal.contentFilePath")
    }

    type Frontmatter {
      title: String
      alttitle: String
      speaker: String
      date: Date @dateformat
      tags: [String]
      slug: String
    }

    type Fields {
      extract: String
    }
  `)
}
