import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

// creates IndexPage component
const IndexPage = ({location}) => {
  return (
    <Layout location={location} pageTitle="Home Page">
      <p>This is the home page of Under the World Tree, the personal site/blog of Corey Lionis.</p>
  </Layout>
  )
}

export const Head = () => <Seo title="Home Page"/>

export default IndexPage