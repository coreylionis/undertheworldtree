import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"

const MathsBlog = ({location, pageContext }) => {
    return (
        <Layout location={location} pageTitle="Maths blog">
            {
                pageContext.data.reverse().map((node) => (
                    <article key={node.title}>
                        <h3><Link to={`./${node.slug}`}>{node.title}</Link></h3>
                        <span>Posted: {node.date} | Updated: {node.modifiedTime}</span>
                        <div dangerouslySetInnerHTML={{__html: `${node.extract}`}}></div>
                    </article> )
                    )
            }
        </Layout>
    )
}

export const Head = () => <Seo title="Maths blog" />

export default MathsBlog
