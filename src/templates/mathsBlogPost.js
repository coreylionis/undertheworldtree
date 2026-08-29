import * as React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"
import Mathtext from "../components/mathtext"
import Navlinks from "../components/blognav"

const MathsBlogPost = ({ location, data, children}) => {
    const postData = data.postData
    const context = data.context.nodes

    let index = 0

    for (let i = 0; i < context.length; i++) {
        if (context[i].frontmatter.tags.includes('private')) {
            context.splice(i, 1)
        }
        if (context[i].frontmatter.slug === postData.frontmatter.slug) {
            index = i
        }
    }

    const previous = index === 0 ? null : context[index - 1]
    const next = index === context.length - 1 ? null : context[index + 1]

    return (
        //note: layout is overriding styles from Katex for some text. I want to fix this since I often use text regions in my Latex code.

        //note 2: the use of && below ensures we only create navlinks when there's somewhere to go.
        <Layout location={location} pageTitle={postData.frontmatter.title}>
            <article class="blogpostmath">
                <p>Posted: {postData.frontmatter.date} | Updated: {postData.parent.modifiedTime}</p>
                <Mathtext children={children} />
                <footer><Bio /></footer>
            </article>
            <Navlinks previous={ previous } next={ next } />
        </Layout>
    )
}

export const Head = ({data: {postData}}) => <Seo title={postData.frontmatter.title} description = {postData.excerpt} />

export default MathsBlogPost

export const mathPostQuery = graphql`
    query ($id: String!) {
        context: allMdx(filter: {frontmatter: {tags: {in: ["blog"]}}}, sort: { frontmatter: { date: ASC } }) {
                nodes {
                    frontmatter {
                        alttitle
                        slug
                        tags
                    }
                }
            }
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