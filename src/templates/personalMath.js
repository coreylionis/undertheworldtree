import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"
import Mathtext from "../components/mathtext"

const PersonalMathPage = ({ location, data, children }) => {
    const postData = data.postData

    return (
        //note: layout is overriding styles from Katex for some text. I want to fix this since I often use text regions in my Latex code.
        
        <Layout location={location} pageTitle={postData.frontmatter.title}>
            <article>
                <p>Latest update was: {postData.parent.modifiedTime}</p>
                <Mathtext children={children} />
                <footer><Bio /></footer>
            </article>
            <Link to='../'>Back</Link>
        </Layout>
    )
}

export const Head = ({data: {postData}}) => <Seo title={postData.frontmatter.title} description = {postData.excerpt} />

export default PersonalMathPage

export const mathPostQuery = graphql`
    query ($id: String!) {
        postData: mdx(id: {eq: $id}) {
            parent {
                ... on File {
                    modifiedTime(formatString: "MMMM D, YYYY")
                }
            }
            ...MdxDefaults
        }
    }
`