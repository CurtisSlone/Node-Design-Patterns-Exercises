import react from 'react'
import htm from 'htm'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header.js'
import Home from './components/Home.js'
import Search from './components/Search.js'
import NotFound from './components/NotFound.js'

// React element binding to htm template literal
const html = htm.bind(react.createElement)

export default class App extends react.Component {
    render(){
        return html`
        <${Header}/>
        <${Switch}>
        <${Route}
            path="/"
            exact=${true}
            component=${Home}
        />
        <${Route}
            path="/:mode"
            component=${Search}
        />
        <${Route}
            path="*"
            component=${NotFound}
        />
        </>
        ` 
    }
}

