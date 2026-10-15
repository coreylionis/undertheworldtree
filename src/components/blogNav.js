import * as React from "react"
import { Link } from "gatsby"
import * as Styles from "./blogNav.module.css"


//note 2: the use of && below ensures we only create navlinks when there's somewhere to go.
const NavLinks = ({ previous, next }) => {
    return (
    <nav>
      <ul className={Styles.blogPostNav}>
        <li>{previous && (<Link to={'../'+ previous.slug} rel="prev"> ← {previous.alttitle}</Link>)}</li>
            |
        <li>
            <Link to={'../'}>Back</Link>
        </li>
            |
        <li>{next && (<Link to={'../' + next.slug} rel="next">{next.alttitle} →</Link>)}</li>
      </ul>
    </nav> 
    )         
}

export default NavLinks
