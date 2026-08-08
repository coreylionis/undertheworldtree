import * as React from 'react'
import Layout from "../components/layout"

const AboutPage = ({location}) => {
    return (
        <Layout location={location} pageTitle="About Me">
           <p>Corey Lionis holds a Master's degree in pure mathematics from the University of Melbourne. Their mathematical interests span algebraic geometry, geometric representation theory, and mathematical physics. Corey's thesis discusses moduli interpretations of the affine Grassmannian and presents an intepretation of the theory of stacks and torsors. Outside of study, Corey plays piano and violin, and enjoys yoga, cooking and crochet. They are currently living in Canberra. </p>
        </Layout>
    )
}

export const Head = () => <title>About Page</title>

export default AboutPage