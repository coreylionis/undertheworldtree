import * as React from "react"
import { Link } from "gatsby"
import * as baseStyles from "./layout.module.css"

const Layout = ({location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/` 
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {'Home'}
      </Link>
    )
  }

  return (
    <div className={baseStyles.container} data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <nav>
        <ul className={baseStyles.navLinks}>
          <li className={baseStyles.navLinkItem}><Link className={baseStyles.navLinkText} to="/">Home</Link></li>
          <li className={baseStyles.navLinkItem}><Link className={baseStyles.navLinkText} to="/about">About</Link></li>
        </ul>
      </nav>
      <main>
        <h1 className={baseStyles.heading}>{title}</h1>
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
