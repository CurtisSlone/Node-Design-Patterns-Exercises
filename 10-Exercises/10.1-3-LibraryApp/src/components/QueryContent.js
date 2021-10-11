import react from 'react'
import htm from 'htm'

// React element binding to htm template literal
const html = htm.bind(react.createElement)

//API Request method
function createRequestUri (mode,query) {
    return `https://openlibrary.org/search/${encodeURIComponent(mode)}.json?q=${encodeURIComponent(query)}`
  }

export default class QueryContent extends react.Component {
    constructor(props){
        super(props)
        this.state = {
            results: [],
            loading: true
        }
    }

    async loadData(){
        this.setState({loading: true, results: []})
        const response = await fetch(
            createRequestUri(this.props.mode,this.props.query),
            { mode: 'cors' }
        )
        const responseBody = await response.json()
        this.setState({loading: false, results: responseBody.docs})
    }

    componentDidMount(){
        this.loadData()
    }

    componentDidUpdate (prevProps) {
        if (this.props.query !== prevProps.query) {
          this.loadData()
        }
      }
    

    render(){
        return html`
        <h1>${this.props.mode.toUpperCase()}</h1>
            <div className="resultsContainer">
                
                ${this.state.results.map((result,index)=> 
                    html`
                        <div key=${index}>
                            <div className="result">
                            ${result.name}
                            </div>
                        </div>
                    `    
                )}
            </div>
        `
    }
}
