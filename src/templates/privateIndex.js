import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"

const PersonalFile = ({location, pageContext}) => {
    return (
        <Layout location={location} pageTitle="Personal content">
            {
                pageContext.data.map((node) => (
                    <article key={node.title}>
                        <li><Link to={`./${node.slug}`} style={{color: "var(--color-links-internal)"}}>{node.title}</Link></li>
                    </article>
                ))
            }
        </Layout>
    )
}

export default PersonalFile
