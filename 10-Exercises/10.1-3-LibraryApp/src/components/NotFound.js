import react from 'react'
import htm from 'htm'

// React element binding to htm template literal
const html = htm.bind(react.createElement)

export default class NotFound extends react.Component {
    render(){
        //If this page is rendered via ServerSide Rendering
        // Status Code should be 404
        // TODO: Use as base for error handling if components have errors in rendering
        if (this.props.staticContext){
            this.props.staticContext.statusCode = 404
        }
        return html`
            <h1>Not found</h1>
        `
    }
}