import react from 'react'
import htm from 'htm'
import { Link } from 'react-router-dom'
import { routes } from '../routes'

// React element binding to htm template literal
const html = htm.bind(react.createElement)
const menu = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Authors",
        path: "/authors"
    },
    {
        name: "Subjects",
        path: "/subjects"
    },

]

export default class Header extends react.Component {
   
    render(){
        return html`
        <header className="header">
            <nav className="header__nav">
                <ul>
                    ${menu.map(menuItem =>
                        html`
                            <li>
                                <${Link} to="${menuItem.path}">${menuItem.name}</>
                            </li>
                        `    
                    )}
                </ul>
            </>
        </header>
        `
    }
}