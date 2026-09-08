import * as React from "react"
import { Link } from 'gatsby'
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const MathsIndex = ({location}) => {
    return (
        <Layout location={location} pageTitle="Maths">
            <p>This is the landing page for the maths part of my website. My notes, blog posts, seminar pages and other maths resources can be accessed from here! </p>
            <nav>
                    <ul>
                      <li style={{fontSize: "1.3rem"}}><Link to="./blog" style={{textDecoration: "none"}}>Blog</Link></li>
                      <li style={{fontSize: "1.3rem"}}><Link to="./notes" style={{textDecoration: "none"}}>Notes</Link></li>
                    </ul>
            </nav>
        </Layout>
    )
}

export const Head = () => <Seo title="Maths" />

export default MathsIndex