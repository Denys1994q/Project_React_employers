import { Component } from 'react';
import "./app-info.css";

class AppInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }

    cli = () => {
        this.setState(state => ({
            count: state.count + 1,
        }))
    }

    render() {
        const {numberOfEmployers, numberOfEmployersToIncrease} = this.props;
        return(
            <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {numberOfEmployers} </h2>
            <h2>Премию получат: {numberOfEmployersToIncrease} </h2>
            <button onClick={this.cli} >=====</button>
            <h2>{this.state.count}</h2>
            </div>
        )
    }
}

export default AppInfo;