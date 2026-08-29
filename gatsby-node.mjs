/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import { createRequire } from "module"

const require = createRequire(import.meta.url)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Location of template for math blogs
const personalMath = path.resolve(`./src/templates/personalMath.js`)
const talks = path.resolve(`./src/templates/mathsTalkTemplate.js`)
const blogs = path.resolve(`./src/templates/mathsBlogPost.js`)
const notes = path.resolve(`./src/templates/notes.js`)


/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export async function createPages ({ graphql, actions, reporter }) {
  const { createPage } = actions
  // Get all math posts sorted by date, organised by type
  // I have to have this long ugly code block because the Gatsby devs don't want to update the build process so gatsby-node can use framents : ((
  const result = await graphql(`
    query {
      personal: allMdx(filter: {frontmatter: {tags: {in: "private"} } }, sort: { frontmatter: { date: ASC } }) {
          nodes {
            id
            frontmatter {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      mathsTalks: allMdx(filter: {frontmatter: {tags: {in: "talk" } } }, sort: { frontmatter: { date: ASC } }) {
        nodes {
            id
            frontmatter {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      mathsBlogs: allMdx(filter: {frontmatter: {tags: {in: "blog" } } }, sort: { frontmatter: { date: ASC } }) {
       nodes {
            id
            frontmatter {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      mathsNotes: allMdx(filter: {frontmatter: {tags: {in: "notes" } } }, sort: { frontmatter: { date: ASC } }) {
       nodes {
            id
            frontmatter {
              slug
              tags
            }
            internal {
              contentFilePath
            }
          }
        }
      }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading content to gatsby-node,`,
      result.errors
    )
    return
  }

  function buildMath(posts, pagepath, componentpath) {
    if (posts.length > 0) {
    posts.forEach((post) => {
      //Nb: You should never send a template string `foo {bar}` to pageContext; graphQL cannot 
      //use this formatting.
      createPage({
        path: pagepath + post.frontmatter.slug,
        component: componentpath + `?__contentFilePath=${post.internal.contentFilePath}`,
        context: {
          id: post.id, 
        },
      })
    })
  }
  }

  const personalMathNodes = result.data.personal.nodes
  //console.log(JSON.stringify(personalMathNodes))
  const mathsTalkNodes = result.data.mathsTalks.nodes
  //console.log(JSON.stringify(mathTalkNodes)) 
  const mathsBlogNodes = result.data.mathsBlogs.nodes
  const mathsNotesNodes = result.data.mathsNotes.nodes
  for (let i=1; i < mathsNotesNodes.length; i++) {
    if (mathsNotesNodes[i].frontmatter.tags.includes('talk')) {
      mathsNotesNodes.splice(i,1)
    }
  }

  buildMath(personalMathNodes, '/forme/', personalMath)
  buildMath(mathsTalkNodes, '/maths/notes/', talks)
  buildMath(mathsBlogNodes, '/maths/blog/', blogs)
  buildMath(mathsNotesNodes, '/maths/notes/', notes)
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
// Original source: https://suhasdara.me/blogs/gatsby-mdx-excerpts/
export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  const end = "<!--excerpt-->"; //excerpt separator
  const prune = 400; //default prune length
  if(node.internal.type === `Mdx`) {
    let content = node.body;
    let excerptEnd = content.indexOf(end);
    let ellipsis = excerptEnd === -1 ? "..." : "";
    excerptEnd = excerptEnd === -1 ?
      Math.min(content.length, prune) :
      excerptEnd;
    let excerpt = content.substring(0, excerptEnd) + ellipsis;
    excerpt = excerpt.trim();

    createNodeField({
      node,
      name: `excerpt`,
      value: excerpt,
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
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
    }

    type Frontmatter {
      title: String
      alttitle: String
      speaker: String
      slug: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
      excerpt: String
    }
  `)
}
