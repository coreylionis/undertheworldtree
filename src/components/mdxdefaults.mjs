import { graphql } from 'gatsby'

export const MdxDefaults = graphql`
    fragment MdxDefaults on Mdx {
        frontmatter {
            title 
            alttitle
            date(formatString: "MMMM D, YYYY")
            tags 
            slug
        }
        id
    }`