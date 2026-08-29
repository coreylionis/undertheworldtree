import * as React from "react"
import katex from "katex"
import "katex/dist/katex.min.css"
//import of a css module goes here

// //sourced from remarkMath github
// import rehypeKatex from 'rehype-katex'
// import rehypeStringify from 'rehype-stringify'
// import remarkMath from 'remark-math'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
// import {read} from 'to-vfile'
// import {unified} from 'unified'
//  const file = await unified().use(remarkParse).use(remarkMath).use(remarkRehype).use(rehypeKatex).use(rehypeStringify).process(await read({children}))


const mathText = ({ children }) => {
 
  return (
    // the languageMath name is processed by rehypeKatex
    <main>
      {children}
    </main>
  )
}

export default mathText

