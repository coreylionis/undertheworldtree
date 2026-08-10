import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"

const MathsBlog = ({location, data}) => {
    return (
        <Layout location={location} pageTitle="Maths blog">
            <ul>{data.allFile.nodes.map(node => (
                <li key={node.name}>{node.name}</li>
            ))}</ul>
        </Layout>
    )
}

export const Head = () => <Seo title="Maths blog" />

export default MathsBlog

export const query = graphql`
    query {
        allFile(filter: {relativePath: {glob: "mathsblog/*"}}){
            nodes{
                name
            }
        }
    }
`