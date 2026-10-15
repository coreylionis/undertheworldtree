import * as React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"
import Navlinks from "../components/blogNav"

const MathsBlogPost = ({ location, pageContext, children}) => {
    const previous = pageContext.neighbours[0]
    const next = pageContext.neighbours[1]

    return (
        <Layout location={location} pageTitle={pageContext.title}>
            <article className="blogpostmath">
                <p>Posted: {pageContext.dateCreated} | Updated: {pageContext.dateModified}</p>
                <main className="math-text">{children}</main>
                <footer><Bio /></footer>
            </article>
            <Navlinks previous={ previous } next={ next } />
        </Layout>
    )
}

export const Head = ({ pageContext }) => <Seo title={pageContext.title} />

export default MathsBlogPost