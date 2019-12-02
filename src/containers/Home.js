import React, { Component } from "react";
import { Container, Alert } from "reactstrap";
import DyForm from "../components/DyForm";
import formFields from "../config/fields";
import FormFieldModel from "../models/FormFieldModel";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubmittedAlert: false
    };
  }
  render() {
    return (
      <div className="home">
        <Container>
          {this.state.showSubmittedAlert && this.renderSubmittedAlert()}
          <h1 className="heading mb-2">DyForms</h1>
          <DyForm formFields={this.getModelledFormFields()} onFormSubmit={this.onFormSubmit} />
        </Container>
      </div>
    );
  }
  renderSubmittedAlert = () => {
    return <Alert color="secondary">{"Your form is submitted, please check the console for the details"}</Alert>;
  };
  getModelledFormFields = () => {
    return formFields.map(field => {
      return new FormFieldModel(field);
    });
  };
  onFormSubmit = filledFields => {
    this.setState({
      showSubmittedAlert: true
    });
    const transformedFields = filledFields.reduce((acc, field) => {
      acc[field.fieldLabel] = field.value;
      return acc;
    }, {});
    console.table(transformedFields);
    this.closeAlertAfter(3000);
  };
  closeAlertAfter = ms => {
    setTimeout(() => {
      this.setState({
        showSubmittedAlert: false
      });
    }, ms);
  };
}

export default Home;
