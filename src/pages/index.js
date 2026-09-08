import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"


/* import AboutContent from "../components/aboutContent"  to put eg the about page text heree*/

// creates IndexPage component
const IndexPage = ({location}) => {
  return (
    <Layout location={location} pageTitle="Home Page">
      <p>This is the home page of Under the World Tree, the personal site/blog of Corey Lionis.</p>
      <div style={{width:"40vw", height:"25vw", overflow: "hidden"}}><StaticImage src="../../static/images/PixCropped.jpg" alt="The boy who started it all." aspectRatio="16/9"/></div>
  </Layout>
  )
}

export const Head = () => <Seo title="Home Page"/>

export default IndexPage