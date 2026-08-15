import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const MathsBlog = ({location, data}) => {
    return (
        <Layout location={location} pageTitle="Maths blog">
            {
                data.allMdx.nodes.map((node) => (
                    <article key={node.id}>
                        <h2><Link to={`/mathsblog/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link></h2>
                        <p>Posted: {node.frontmatter.date} | Updated: {node.parent.modifiedTime}</p>
                        <p>{node.excerpt}</p>
                    </article>
                ))
            }
        </Layout>
    )
}

export const Head = () => <Seo title="Maths blog" />

export default MathsBlog

export const query = graphql`
    query {
        allMdx(filter: {frontmatter: {tags: {eq: "blog"}}}, sort: { frontmatter: { date: DESC } }){
            nodes{
                parent {
                    ... on File {
                        modifiedTime(formatString: "MMMM D, YYYY")
                    }
                }
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                    slug
                }
                id
                excerpt
            }
        }
    }
`