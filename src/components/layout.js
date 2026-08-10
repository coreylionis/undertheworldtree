import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import * as baseStyles from "./layout.module.css"

const Layout = ({location, pageTitle, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location=== rootPath
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
    <div className={baseStyles.container} data-is-root-path={isRootPath}>
      <Link to= "/" style={{textDecoration: 'none'}}>
      <header className={baseStyles.siteTitle}>{data.site.siteMetadata.title}</header>
      </Link>
      <nav>
        <ul className={baseStyles.navLinks}>
          <li className={baseStyles.navLinkItem}><Link className={baseStyles.navLinkText} to="/">Home</Link></li>
          <li className={baseStyles.navLinkItem}><Link className={baseStyles.navLinkText} to="/about">About</Link></li>
          <li className={baseStyles.navLinkItem}><Link className={baseStyles.navLinkText} to="/mathsblog">Maths Blog</Link></li>
          <li className={baseStyles.navLinkItem}><Link className={baseStyles.navLinkText} to="/blog/hello-world">Tutorial: Hello World</Link></li>
          <li className={baseStyles.navLinkItem}><Link className={baseStyles.navLinkText} to="/blog/my-second-post">Tutorial: Second Page</Link></li>
          <li className={baseStyles.navLinkItem}><Link className={baseStyles.navLinkText} to="/blog/new-beginnings">Tutorial: New Beginnings</Link></li>
        </ul>
      </nav>
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
