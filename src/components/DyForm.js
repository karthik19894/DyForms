import React, { Component } from 'react';
import {Input} from 'reactstrap';

export default class DyForm extends Component {
    constructor(props){
        super(props);
        this.state={
            test:""
        };
    }
    render() {
        return (
            <div>
                <Input name="test" type="text" onChange={this.handleInputChange} placeholder="Test Input" />
            </div>
        )
    }
    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
};
