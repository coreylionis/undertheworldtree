import * as React from "react"
import { StaticImage } from "gatsby-plugin-image" 
import Email from "../components/encodeMail"
import TextWindow from '../components/textWindow'

/*I could recommend "https://simplystatic.com/tutorials/web-security-best-practices/" if I include a security discussion*/

const AboutContent = () => {
    return (
        <>
        <div className="textimg-grid about-wrapper">
                <div className="about-left">
                    <p>Corey Lionis holds a Master's degree in pure mathematics from the University of Melbourne. Their mathematical interests span algebraic geometry, geometric representation theory, and mathematical physics. Corey's thesis discusses moduli interpretations of the affine Grassmannian and presents an intepretation of the theory of stacks and torsors. Corey plays piano and violin, and enjoys yoga, cooking and crochet. They are currently living in Canberra. </p>
                    <span style={{fontSize: "0.9rem"}}>Email address: <Email />.</span>
                    <br />
                    <span style={{fontStyle:"italic", fontSize: "0.8rem"}}>My email address should appear when you click the link. If you have trouble try reloading the page, or let me know via Github of any problems.</span>
                    <TextWindow buttonText="On email obfuscation" children={
                        <>
                        <p className="text-in-box">It is common practice for maths academics to use text patterns such as "someone AT example.com" for their email addresses. While this approach blocks spam, it also makes the links unusable. If you're interested in trying something different, <a href="https://spencermortensen.com/articles/email-obfuscation/">Spencer Mortenson email obfuscation</a> lists and compares various techniques which are currently effective.</p>
                        </>}
                    />
                </div>
                <div style={{overflow: "hidden"}}><StaticImage alt="A picture of Corey Lionis, 2025 near St Kilda Beach." src="../images/me2.0Cropped.jpeg" aspectRatio="16/9"/></div>
        </div>
        </>
    )
}

export default AboutContent