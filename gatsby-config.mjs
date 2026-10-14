import { createRequire } from "module"
import { dirname } from "path"
import { fileURLToPath } from "url"
import siteUrl from "./defaults.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
export const katexOptions = {delimiters: [{left: "$$", right: "$$", display: true}, {left: "$", right: "$", display: false}],
macros: {"\\frr": "\\mathfrak", "\\bb": "\\mathbb", "\\cal": "\\mathcal", "\\eps": "\\varepsilon"} };
const gatsbyMdxOptions = {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve:`gatsby-remark-katex`,
            options: katexOptions,
          }, 
          {
          resolve: `gatsby-remark-images`, 
          options: { maxWidth: 630, loading: "eager",}
          }
        ],
      };


/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = {
  siteMetadata: {
    title: `Under the World Tree`,
    author: {
      name: `Corey Lionis`,
    },
    description: `Personal site Corey Lionis.`,
    siteurl: siteUrl, 
    pathPrefix: '/',
    social: {
      github: `coreylionis`,
      linkedin: `corey-lionis-7a4440214`
    },
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name:'mdx',
        path:`${__dirname}/src/mdx`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name:'images',
        path:`${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: gatsbyMdxOptions,
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteurl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.extract,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteurl + node.frontmatter.slug,
                  guid: site.siteMetadata.siteurl + node.frontmatter.slug,
                  custom_elements: [{ "content:encoded": node.body }],
                })
              })
            },
            query: `{
              allMdx(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  extract
                  body
                  frontmatter {
                    alttitle
                    date
                    slug
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Under the World Tree RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Corey Lionis Personal Site`,
        short_name: `undertheworldtree`,
        start_url: `/`,
        background_color: `#80461b`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/world-tree-thumbnail.jpeg`, // This path is relative to the root of the site.
      },
    },
    // add workboxConfig: {
    //     globPatterns: ['**/icon-path*']
    //  } to offline in case of icon caching issues 
    // 
  ],
};

export default config