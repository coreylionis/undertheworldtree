import * as React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import AboutContent from "../components/aboutContent"


const AboutPage = ({location}) => {
    return (
        <Layout location={location} pageTitle="About Me">
            <AboutContent />
        </Layout>
        // todo: social link to github here.
    )
}

export const Head = () => <><Seo title="About Me" /></>

export default AboutPage
