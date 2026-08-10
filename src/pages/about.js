import * as React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image" 

const AboutPage = ({location}) => {
    return (
        <Layout location={location} pageTitle="About Me">
           <p>Corey Lionis holds a Master's degree in pure mathematics from the University of Melbourne. Their mathematical interests span algebraic geometry, geometric representation theory, and mathematical physics. Corey's thesis discusses moduli interpretations of the affine Grassmannian and presents an intepretation of the theory of stacks and torsors. Outside of study, Corey plays piano and violin, and enjoys yoga, cooking and crochet. They are currently living in Canberra. </p>
           <StaticImage alt="A picture of Corey Lionis, 2025 near St Kilda Beach." src="../images/me2.0.jpeg" />
           <h3>This website</h3>
           <p style={{color:'red'}}>TODO: Add README. If you're reading this in browser, you can find the file on my Github.</p>
        </Layout>
    )
}

export const Head = () => <Seo title="About Me" />

export default AboutPage