import * as React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Mathtext from "../components/mathtext"
import Navlinks from "../components/blognav"

const MathsTalkNote = ({ location, data, children}) => {
    const postData = data.postData
    const context = data.context.nodes

    for (let i = 0; i < context.length; i++) {
        if (context[i].frontmatter.tags.includes('private')) {
            context.splice(i, 1)
        }
    }

    let index = 0

    while (context[index].frontmatter.slug !== postData.frontmatter.slug) {
        index++;
    }

    const previous = index === 0 ? null : context[index - 1]
    const next = index === context.length - 1 ? null : context[index + 1]

    return (
        //note: layout is overriding styles from Katex for some text. I want to fix this since I often use text regions in my Latex code.
        <Layout location={location} pageTitle={postData.frontmatter.title}>
            <article class="note">
                <h2>Speaker: {postData.frontmatter.speaker}</h2>
                <Mathtext children={children} />
            </article>
            <Navlinks previous={ previous } next={ next } />
        </Layout>
    )
}

export const Head = ({data: {postData}}) => <Seo title={postData.frontmatter.title} description = {postData.excerpt} />

export default MathsTalkNote

export const mathPostQuery = graphql`
    query ($id: String!) {
        context: allMdx(filter: {frontmatter: {tags: {in: ["talk"]}}}, sort: { frontmatter: { date: ASC } }) {
                nodes {
                    frontmatter {
                        alttitle
                        slug
                        tags
                    }
                }
            }
        postData: mdx(id: {eq: $id}) {
            ...MdxDefaults
            frontmatter {
                speaker
            }
        }
    }
`