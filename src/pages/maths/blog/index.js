import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../../../components/layout"
import Seo from "../../../components/seo"
import Mathtext from "../../../components/mathtext"
import "katex/dist/katex.min.css"
import "gatsby-remark-katex"

//TODO: Load blog excerpts underneath dates with math that renders correctly. <Mathtext>{node.fields.excerpt}</Mathtext>

const MathsBlog = ({location, data}) => {
    console.log(typeof data.allMdx.nodes[0].body)
    return (
        <Layout location={location} pageTitle="Maths blog">
            {
                data.allMdx.nodes.map((node) => (
                    <article key={node.id}>
                        <h2><Link to={`./${node.frontmatter.slug}`}>{node.frontmatter.title}</Link></h2>
                        <p>Posted: {node.frontmatter.date} | Updated: {node.parent.modifiedTime}</p>
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
        allMdx(filter: {frontmatter: {tags: {in: "blog"}}}, sort: { frontmatter: { date: DESC } }){
            nodes{
                parent {
                    ... on File {
                        modifiedTime(formatString: "MMMM D, YYYY")
                    }
                }
                ...MdxDefaults
                fields {
                    excerpt
                }
            }
        }
    }
`