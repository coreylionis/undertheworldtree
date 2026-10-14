import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotesPage = ({location, pageContext }) => {

    let talks = pageContext.data[0]
    let notes = pageContext.data[1]

    return (
        <Layout location={location} pageTitle="Maths Notes">
            <p>The notes on this page are theory summaries for quick references and transcriptions from talks I've attended. Let me know if you spot any errors!</p>
            <ul>
            {
                notes.map((node) => (
                    <li key={node.title}>
                        <Link to={`./${node.slug}`} style={{color:"var(--color-links-internal)"}}>{node.title}</Link>
                    </li>
                ))
            }
            </ul>
            <ul>
            <h4>Talks:</h4>
            {
                talks.map((node) => (
                    <li key={node.title}>
                        <Link to={`./${node.slug}`} style={{color: "var(--color-links-internal)"}}>{ node.title } — { node.speaker }</Link>
                    </li>
                ))
            }
            </ul>
        </Layout>
    )
}

export const Head = () => <Seo title="Notes Page" />

export default NotesPage