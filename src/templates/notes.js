import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Mathtext from "../components/mathtext"

const Note = ({ location, data, children}) => {
    const postData = data.postData

    return (
        //note: layout is overriding styles from Katex for some text. I want to fix this since I often use text regions in my Latex code.

        //note 2: the use of && below ensures we only create navlinks when there's somewhere to go.
        <Layout location={location} pageTitle={postData.frontmatter.title}>
            <article class="note">
                <Mathtext children={children} />
            </article>
            <Link to='../'>Back</Link>
        </Layout>
    )
}

export const Head = ({data: {postData}}) => <Seo title={postData.frontmatter.title} description = {postData.excerpt} />

export default Note

export const mathNotesQuery = graphql`
    query ($id: String!) {
        postData: mdx(id: {eq: $id}) {
            parent {
                ... on File {
                    modifiedTime(formatString: "MMMM D, YYYY")
                }
            }
            ...MdxDefaults
            excerpt(pruneLength:160)
        }
    }
`