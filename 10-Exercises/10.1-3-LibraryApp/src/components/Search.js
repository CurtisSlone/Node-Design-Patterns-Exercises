import react from 'react'
import htm from 'htm'
import QueryContent from './QueryContent.js'

// React element binding to htm template literal
const html = htm.bind(react.createElement)

export default class Search extends react.Component {
    constructor(props){
        super(props)
        this.state = { 
            query: ''
        }

        this.setQuery = this.setQuery.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    setQuery(e){
        e.preventDefault()
        this.setState({query: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
    }

    
    render(){
        return html`
        <form onSubmit=${this.handleSubmit}>
            <input
                type="text"
                onChange=${this.setQuery}
                placeholder="Search For ${this.props.match.params.mode}"
            />
         </form>
         <${QueryContent} 
            mode=${this.props.match.params.mode}
            query=${this.state.query}
         />
        `
    }
}

//             
//             query=${this.state.query.toLowerCase()}