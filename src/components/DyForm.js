import React, { Component } from "react";
import FormField from "./FormField";
import { FormGroup, Button } from "reactstrap";
import PropTypes from "prop-types";
import FormFieldModel from "../models/FormFieldModel";

class DyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filledFields: []
    };
  }
  render() {
    const { className } = this.props;
    return (
      <div className={`dynamic-form ${className}`} style={{ textAlign: "left", maxWidth: 500, margin: "0 auto" }}>
        {this.renderFormFields()}
        {this.renderSubmitButton()}
      </div>
    );
  }
  renderFormFields = () => {
    const { formFields } = this.props;
    let formFieldsList = formFields.map(field => (
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
  renderSubmitButton = () => {
    return (
      <FormGroup className={"submit-btn-container text-center"}>
        <Button size="lg" color="primary" onClick={this.onFormSubmit} disabled={!this.canSubmit()}>
          Submit
        </Button>
      </FormGroup>
    );
  };
  canSubmit = () => {
    let requiredFieldIds = this.props.formFields.filter(field => field.required).map(f => f.fieldId);
    if (requiredFieldIds.length === 0) return true;
    else {
      const filledFieldIds = this.state.filledFields.map(field => field.fieldId);
      for (let fieldId of requiredFieldIds) {
        if (!filledFieldIds.includes(fieldId)) return false;
      }
    }
    return true;
  };
  onFormFieldChange = selectedOption => {
    const filledFields = [...this.state.filledFields];
    let existingFieldIndex = filledFields.findIndex(field => field.fieldId === selectedOption.fieldId);
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
    let existingFieldIndex = filledFields.findIndex(field => field.fieldId === fieldToRemove.fieldId);
    if (existingFieldIndex > -1) {
      filledFields.splice(existingFieldIndex, 1);
    }
    this.setState({
      filledFields
    });
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.props.onFormSubmit(this.state.filledFields);
  };
}

DyForm.propTypes = {
  className: PropTypes.string,
  formFields: PropTypes.arrayOf(PropTypes.instanceOf(FormFieldModel)).isRequired
};
DyForm.defaultProps = {
  className: ""
};

export default DyForm;
