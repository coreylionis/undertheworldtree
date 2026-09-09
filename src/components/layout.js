import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
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
      <div className={`${baseStyles.container} global-wrapper`} data-is-root-path={isRootPath}>
        
        <header className={baseStyles.navbar}>
          <div style={{height: "110px", width:"300px", marginRight: "1rem", overflow: "hidden"}}><StaticImage src="../images/world-tree-banner.jpeg" layout="fullWidth" width="300px" /></div>
          <Link to= "/" style={{textDecoration: 'none'}}><h1 className={baseStyles.siteTitle}>{data.site.siteMetadata.title}</h1></Link>
          <nav>
            <ul className={baseStyles.navLinks}>
              <li className={`${baseStyles.navLinkItem} ${location.pathname === "/about/" ? baseStyles.active : ""}`}>
                <Link className={baseStyles.navLinkText} to="/about">About</Link>
              </li>
              <li className={`${baseStyles.navLinkItem} ${location.pathname === "/maths/" ? baseStyles.active : ""}`}>
                <Link className={baseStyles.navLinkText} to="/maths">Maths</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
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
