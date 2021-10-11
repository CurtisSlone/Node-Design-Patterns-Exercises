import react from 'react'
import ReactDom from 'react-dom'
import htm from 'htm'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import application from './application.scss'

/*
    Node.js Design Patterns uses the class based style of React.
    Despite the hook/functional method being the new standard,
    I will stick with the methods the book teaches
    In addition, the book uses htm for template literals instead of JSX
    This is done to avoid an intermediate compilation process
*/

// React element binding to htm template literal
const html = htm.bind(react.createElement)


ReactDom.render(
    html`<${BrowserRouter}> <${App} /></>`,
    document.getElementById('root')
)