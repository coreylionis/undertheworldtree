import * as React from "react"
import { Link } from "gatsby"
//Idea : If I start using multiple navpanes with similar css but different inputs, I could make this a .mjs 
// with no preferred export. 
const NavLinks = ({ previous, next }) => {
    return (
<nav className="blogpostNav">
                     <ul style={{ display: `flex`,
                                  flexWrap: `wrap`,
                                  justifyContent: `space-between`,
                                  listStyle: `none`,
                                  padding: 0}}>
                       <li>{previous && (
                           <Link to={'../'+ previous.frontmatter.slug} rel="prev">
                             ← {previous.frontmatter.alttitle}
                           </Link>
                         )}
                       </li>
                       |
                       <li>
                          <Link to={'../'}>Back</Link>
                       </li>
                       |
                       <li>
                         {next && (
                           <Link to={'../' + next.frontmatter.slug} rel="next">
                             {next.frontmatter.alttitle} →
                           </Link>
                         )}
                       </li>
                     </ul>
                   </nav> 
    )         
}

export default NavLinks