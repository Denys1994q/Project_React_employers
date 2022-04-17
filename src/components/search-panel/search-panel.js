import { Component } from 'react';
import './search-panel.css'

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    getInfoForSearchProcess = (e) => {
        const term = e.target.value;
        this.setState({
            term: term
          })
        this.props.getInfoForSearchProcess(term)
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Знайти співробітника" 
                value={this.state.term}
                onChange={this.getInfoForSearchProcess} />
        )
    }
}

export default SearchPanel;