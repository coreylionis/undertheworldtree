import * as React from "react"
import Layout from "../components/layout"

// creates IndexPage component
const IndexPage = ({location}) => {
  return (
    <Layout location={location} pageTitle="Home Page">
      <h2>This is the Index Page!</h2>
      <p>This is my first time writing html using React, 
        I hope it looks nice online. 
      </p>
  </Layout>
  )
}

export const Head = () => <title>Home Page</title>

export default IndexPage