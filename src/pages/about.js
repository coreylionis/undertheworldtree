import * as React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image" 
import Email from "../components/encodeMail"
import TextWindow from '../components/textWindow'

/*I could recommend "https://simplystatic.com/tutorials/web-security-best-practices/" if I include a security discussion*/

const AboutPage = ({location}) => {
    return (
        <Layout location={location} pageTitle="About Me">
           <p>Corey Lionis holds a Master's degree in pure mathematics from the University of Melbourne. Their mathematical interests span algebraic geometry, geometric representation theory, and mathematical physics. Corey's thesis discusses moduli interpretations of the affine Grassmannian and presents an intepretation of the theory of stacks and torsors. Outside of study, Corey plays piano and violin, and enjoys yoga, cooking and crochet. They are currently living in Canberra. </p>
           <StaticImage alt="A picture of Corey Lionis, 2025 near St Kilda Beach." src="../images/me2.0.jpeg" />
           <span>Email:<Email /></span>
           <br />
           <span style={{fontStyle:"italic"}}>You can use the above link to email me. Hover over before clicking to check that it's correct!</span>
           <TextWindow buttonText="On email obfuscation:" children={
            <><p>It is common practice for academics in mathematics to use text patterns such as "someone AT example.com" for their email addresses. While this approach blocks spam, it also makes the links unusable. Since everybody uses the same obfuscation patterns, spammers can target academics using text processing functions. <br /> If you're interested in trying something different, <a href="https://spencermortensen.com/articles/email-obfuscation/">Spencer Mortenson email obfuscation</a> lists and compares various techniques which are currently effective.</p>
           </>
           }/>
           
        </Layout>
        // todo: social link to github here.
    )
}

export const Head = () => <><Seo title="About Me" /></>

export default AboutPage

// export const aboutMeQuery = useStaticQuery(graphql`
//     allMarkdownRemark(){
//     }
//     `)