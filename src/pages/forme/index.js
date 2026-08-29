import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../../components/layout"

const PersonalFile = ({location, data}) => {
    return (
        <Layout location={location} pageTitle="Personal content">
            {
                data.allMdx.nodes.map((node) => (
                    <article key={node.id}>
                        <li><Link to={`./${node.frontmatter.slug}`}>{node.frontmatter.title}</Link></li>
                    </article>
                ))
            }
        </Layout>
    )
}

export default PersonalFile

export const query = graphql`
    query {
        allMdx(filter: {frontmatter: {tags: {in: "private"}}}, sort: { frontmatter: { date: DESC } }){
            nodes{
                frontmatter {
                    title
                    slug
                }
                id
            }
        }
    }
`