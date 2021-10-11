import react from 'react'
import htm from 'htm'
import NotFound from './NotFound'

// React element binding to htm template literal
const html = htm.bind(react.createElement)

export default class Subject extends react.Component {
    /*
        if (!subject){
            return html`
                <${NotFound}
                    staticContext=${this.props.Context}
                    error="Author not found"
                />
            `
        }
    */
    render(){
        return html`
            <h1> Authors </h1>
        `
    }
}