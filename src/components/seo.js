/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const defaultTitle = site.siteMetadata?.title

  return (
    //note to self: if you want to add metadata, import react-helmet-async and augment title.
    //this is considered best-practice for header metadata with React.
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      {children}
    </>
  )
}

export default Seo
