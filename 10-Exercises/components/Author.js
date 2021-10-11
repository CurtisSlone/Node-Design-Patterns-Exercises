import react from 'react'
import htm from 'htm'
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import NotFound from './NotFound'

// React element binding to htm template literal
const html = htm.bind(react.createElement)

export default class Author extends react.Component {

    render(){
       
        return html`
            
        `
    }
}