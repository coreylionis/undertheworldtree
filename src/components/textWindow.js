import * as React from "react"
import * as Styles from "./textWindow.module.css"

const TextWindow = ({ buttonText, children }) => {
    const [flag, setFlag] = React.useState(false)
    const [display, setDisplay] = React.useState("none")
    const [body, setBody] = React.useState("")
    return (
    <>
    <button className={`${Styles.collapsible}  ${body}`} onClick={ () => {
        flag === false? setFlag(true):setFlag(false)
        flag === true?setDisplay(`${Styles.contentActive}`):setDisplay("")
        setBody(flag===true?`${Styles.active}`:"")
    }}>{buttonText}</button>
    <div className={`${Styles.content} ${display}`}>{children}</div>
    </>
    )
}

export default TextWindow