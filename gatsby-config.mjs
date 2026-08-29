import { createRequire } from "module"
import { dirname } from "path"
import { fileURLToPath } from "url"
import siteUrl from "./defaults.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

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
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name:'pages',
        path:`${__dirname}/src/pages`,
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
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [`gatsby-remark-katex`, {
          resolve: `gatsby-remark-images`, 
          options: {
            maxWidth: 630,
            loading: "eager",
          }
        }],
        mdxOptions: {
          remarkPlugins: [
            require(`remark-math`),
          ],
          rehypePlugins: [
            require(`rehype-katex`)
          ],
        },
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
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
                  description: node.excerpt,
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
                  excerpt(pruneLength:160)
                  body
                  frontmatter {
                    title
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
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
    resolve: `gatsby-plugin-offline`,
    options: {
      precachePages: [`/about/`, `/maths/*`],
    },
    },
  ],
};

export default config