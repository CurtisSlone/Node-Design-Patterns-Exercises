import react from 'react'
import ReactDom from 'react-dom'
import htm from 'htm'

// React element binding to htm template literal
const html = htm.bind(react.createElement)

export default class Subjects extends react.Component {
    constructor(props){
        super(props)
        this.state = {
            subjects: [],
            loading: true
        }
    }
    
    componentDidMount() {
        
    }

    // const { body } = await superagent.agent(`https://openlibrary.org/search/subjects.json?q=${query}`)
    // this.setState({loading: false, authors: body.docs})
    
        /*
            if (!subject){
                return html`
                    <${NotFound}
                        staticContext=${this.props.Context}
                        error="Subject not found"
                    />
                `
            }
        */

    render(){
        // if(this.state.loading){
        //     return html`<h1> Loading... </h1>`
        // }
        return html`
            <div>
                <form>
                    <input
                        type="text"
                        id="author-search"
                        placeholder="Search Subjects"
                        name="subject__search"
                    />
                </form>
                ${this.state.subjects.map((subject)=> 
                    html`
                        <div key=${subject.key}>
                            <p>
                                <${Link} to="${`/subject/${subject.name}`}">
                                    ${subject.name}
                                </>
                            </p>
                        </div>
                    `    
                )}
            </div>
        `
    }
}
