import * as React from "react"
import DOMPurify from "dompurify"

const Email = () => { 
    const buildEmail = ({code, provider, extension}) => {

        // Numeric function posted to Overflow by Christian C. Salvadó, 
        // modified by community. Retrieved 2026-08-25, License - CC BY-SA 4.0
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        const book = {
            'panopticon': 'c', 
            'broken beak': 'o',
            'whisper of the oak tree': 'r', 
            'faltered': 'e',
            'I gave up': 'y'
        }
        var numbers = []
        for (let i=0; i < code.length; i++) {
            if (isNumeric(code[i]) && parseInt(code[i]) !== 0) {
                numbers.push(10- code[i])
            }
        }
        const letters = code.split(/\d/)
        numbers = numbers.sort().filter(a => a !== 2)
        
        return ( DOMPurify.sanitize(
            "mailto:" + letters.map(l => book[l]).join('') + numbers.map(n => (n === 1 ? 10 : n)).join('') + numbers.map(n => (n === 1 ? 10 : n)).join('').slice(0, -1) + '@' + provider + '.' + extension)
        )
    }
    const [href, setHref] = React.useState("panopticon3broken beak8whisper of the oak tree5faltered8I gave up9");
    const [flag, setFlag] = React.useState(true)

    return <a id="link" href={href} onMouseEnter={() =>{
            console.log("current value:" + href);
            if (flag) {
                setHref(buildEmail({code: href, provider: 'gmail', extension: 'com'}));
                setFlag(false);
                }
            }}>clickme</a>
}

export default Email

