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
                      <li><Link to="./blog">Blog</Link></li>
                      <li><Link to="./notes">Notes</Link></li>
                    </ul>
            </nav>
        </Layout>
    )
}

export const Head = () => <Seo title="Maths" />

export default MathsIndex