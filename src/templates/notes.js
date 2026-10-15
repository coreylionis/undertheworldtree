import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"

const Note = ({ location, pageContext, children}) => {

    return (
        <Layout location={location} pageTitle={pageContext.title}>
            <article className="note">
                <main className="math-text">{children}</main>
            </article>
            <Link to='../' style={{color: "var(--color-links-internal)"}}>Back</Link>
        </Layout>
    )
}

export const Head = ({ pageContext }) => <Seo title={pageContext.title} />

export default Note