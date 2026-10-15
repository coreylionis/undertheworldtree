import * as React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Navlinks from "../components/blogNav"

const MathsTalkNote = ({ location, pageContext, children}) => {
    const previous = pageContext.neighbours[0]
    const next = pageContext.neighbours[1]

    return (
        <Layout location={location} pageTitle={pageContext.title}>
            <article className="note">
                <h2>Speaker: {pageContext.speaker}</h2>
                <main className="math-text">{children} </main>
            </article>
            <Navlinks previous={ previous } next={ next } />
        </Layout>
    )
}

export const Head = ({ pageContext }) => <Seo title={pageContext.title} />

export default MathsTalkNote