import * as React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../../../components/layout"
import Seo from "../../../components/seo"
import MdxFields from "../../../components/mdxdefaults"

const NotesPage = ({location, data}) => {
    /* Prepare clean data */
    // Using tags I further refine notes: I remove all public nodes from display and sort talks from other notes. 
    // This is done separately to graphQL because the conditional logic is harder to handle there.   
    const nodes = data.allMdx.nodes
    let notes = []
    let talks = []
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].frontmatter.tags.includes('private') ? nodes.splice(i, 1) : (
            nodes[i].frontmatter.tags.includes('talk') ? talks.push(nodes[i]) : notes.push(nodes[i]) )
    }

    return (
        <Layout location={location} pageTitle="Maths Notes">
            <p>Currently I have two types of notes here: summaries of theory for quick reference, and notes from talks I've attended. If it seems like something is missing, try the maths blog!</p>
            {
                notes.map((node) => (
                    <article key={node.id}>
                        <li><Link to={`./${node.frontmatter.slug}`}>{node.frontmatter.title}</Link></li>
                    </article>
                ))
            }
            <h4>Talks:</h4>
            {
                talks.map((node) => (
                    <article key={node.id}>
                        <li><Link to={`./${node.frontmatter.slug}`}>{ node.frontmatter.title } — { node.frontmatter.speaker }</Link></li>
                    </article>
                ))
            }
        </Layout>
    )
}

export const Head = () => <Seo title="Notes Page" />

export default NotesPage

export const notesQuery = graphql`
    query{
        allMdx(filter: {frontmatter: {tags: 
                                            {in: ["notes"]}
                                        }
                                }
                       sort: { frontmatter: { date: DESC } })
            {
                nodes {
                    ...MdxDefaults
                    frontmatter { 
                        speaker
                    }
                }
            }
    }
`