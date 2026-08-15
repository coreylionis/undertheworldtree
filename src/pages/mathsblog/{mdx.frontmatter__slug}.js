import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import "katex/dist/katex.min.css"


const MathsBlogPost = ({location, data, children}) => { 
    return (
        <Layout location={location} pageTitle={data.mdx.frontmatter.title}>
            <p>Posted: {data.mdx.frontmatter.date} | Updated: {data.mdx.parent.modifiedTime}</p>
            {children}
            <p className="katex-html">Test the KaTeX rendering: eat this please $A + B -2$.</p>
        </Layout>
    )
}

export const Head = () => <Seo title="Maths blog post" />

export default MathsBlogPost

export const query = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
            parent {
                    ... on File {
                        modifiedTime(formatString: "MMMM D, YYYY")
                    }
            }
            frontmatter{
                title
                date(formatString: "MMMM D, YYYY")
            }
            body
        }
    }
`