import React, { Component } from "react";
import formFields from "../config/fields";
import FormFieldModel from "../models/FormFieldModel";
import FormField from "./FormField";

export default class DyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filledFields: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.formFields = formFields.map(field => {
      return new FormFieldModel(field);
    });
    this.setState({
      isLoading: false
    });
  }
  render() {
    return this.state.isLoading ? (
      "Loading"
    ) : (
      <div
        className="dynamic-form"
        style={{ textAlign: "left", maxWidth: 500, margin: "0 auto" }}
      >
        {this.renderFormFields()}
      </div>
    );
  }
  renderFormFields = () => {
    let formFieldsList = this.formFields.map(field => (
      <FormField
        key={field.fieldId}
        fieldId={field.fieldId}
        type={field.type}
        placeholder={field.placeholder}
        fieldLabel={field.fieldLabel}
        disabled={!field.isFormFieldActive(this.state.filledFields)}
        required={field.required}
        options={field.getEnumOptions()}
        onChange={this.onFormFieldChange}
        onRemoveField={this.onRemoveField}
      />
    ));
    return formFieldsList;
  };
  onFormFieldChange = selectedOption => {
    const filledFields = [...this.state.filledFields];
    let existingFieldIndex = filledFields.findIndex(
      field => field.fieldId === selectedOption.fieldId
    );
    if (existingFieldIndex > -1) {
      filledFields.splice(existingFieldIndex, 1, selectedOption);
    } else {
      filledFields.push(selectedOption);
    }
    this.setState({
      filledFields
    });
  };
  onRemoveField = fieldToRemove => {
    const filledFields = [...this.state.filledFields];
    let existingFieldIndex = filledFields.findIndex(
      field => field.fieldId === fieldToRemove.fieldId
    );
    if (existingFieldIndex > -1) {
      filledFields.splice(existingFieldIndex, 1);
    }
    this.setState({
      filledFields
    });
  };
}
