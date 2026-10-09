import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import SiteNav from "./siteNav.js"
import * as baseStyles from "./layout.module.css"

const Layout = ({location, pageTitle, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const data = useStaticQuery(graphql`
      query{
        site{
          siteMetadata{
            title
            }
              }
                }
    `)

  return (
      <div className={`global-wrapper`} data-is-root-path={isRootPath}>
        <SiteNav location={location} title={data.site.siteMetadata.title} />
        <main className={baseStyles.container}>
          <h1 className={baseStyles.heading}>{pageTitle}</h1>
          {children}
        </main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
  )
}

export default Layout
