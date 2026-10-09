import * as React from "react"
import { Link } from "gatsby"
import * as Styles from "./siteNav.module.css"
import banner from "../images/world-tree-banner.jpeg"

const SiteNav = ({location, title }) => {
  
  return (
    <>
        <header className={Styles.navbar}>
          <div className={Styles.banner} style={{flex:2}}><img src={banner} /></div>
          <Link to= "/" style={{textDecoration: 'none'}}><h1 className={Styles.grenzeGotisch} style={{flex:3, textAlign:"left"}}>{title}</h1></Link>
        </header>
        <nav>
            <ul className={Styles.navLinks}>
              <li className={`${Styles.navLinkItem} ${location.pathname === "/about/" ? Styles.active : ""}`}>
                <Link className={Styles.navLinkText} to="/about">About</Link>
              </li>
              <li className={`${Styles.navLinkItem} ${location.pathname === "/maths/" ? Styles.active : ""}`}>
                <Link className={Styles.navLinkText} to="/maths">Maths</Link>
              </li>
            </ul>
          </nav>
    </>
  )
}

export default SiteNav
