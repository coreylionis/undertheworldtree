import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"

const PersonalMathPage = ({ location, pageContext, children }) => {

    return (
        <Layout location={location} pageTitle={pageContext.title}>
            <article>
                <p>Latest update was: {pageContext.dateModified}</p>
                <main className="math-text">{children}</main>
                <footer><Bio /></footer>
            </article>
            <Link to='../' style={{color: "var(--color-links-internal)"}}>Back</Link>
        </Layout>
    )
}

export const Head = ({ pageContext }) => <Seo title={pageContext.title} />

export default PersonalMathPage