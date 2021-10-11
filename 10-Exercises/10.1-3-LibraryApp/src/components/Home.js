import react from 'react'
import htm from 'htm'

// React element binding to htm template literal
const html = htm.bind(react.createElement)

export default class Home extends react.Component {
    render(){
        return html`
            <h1>Home</h1>
        `
    }
}