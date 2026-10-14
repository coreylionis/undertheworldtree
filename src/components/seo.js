/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
*/

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const defaultTitle = site.siteMetadata?.title

  return (
    // adds [Site Title] | [Page Title] to the head of pages for minimal SEO. 
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      {children}
    </>
  )
}

export default Seo