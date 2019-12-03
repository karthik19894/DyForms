import React, { Component } from "react";
import FormField from "./FormField";
import { FormGroup, Button } from "reactstrap";
import PropTypes from "prop-types";
import FormFieldModel from "../models/FormFieldModel";

class DyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filledFields: [],
      formFields: this.props.formFields
    };
  }
  componentDidMount() {
    const { formFields } = this.state;
    this.checkAndAppendFieldsFilledWithValuesToState(formFields);
  }
  render() {
    const { className, style } = this.props;
    return (
      <div className={`dynamic-form ${className}`} style={style} data-test="dy-form">
        {this.renderFormFields()}
        {this.renderSubmitButton()}
      </div>
    );
  }
  checkAndAppendFieldsFilledWithValuesToState = fields => {
    const fieldsFilledWithValues = fields.filter(field => Boolean(field.value));
    if (fieldsFilledWithValues.length > 0) {
      this.setState({
        filledFields: fieldsFilledWithValues
      });
    }
  };
  renderFormFields = () => {
    const { formFields } = this.props;
    let formFieldsList = [];
    for (let field of formFields) {
      const isFieldActive = field.isFormFieldActive(this.state.filledFields);
      if (!isFieldActive && !field.renderWhenNotActive) continue;
      const formField = (
        <FormField
          key={field.fieldId}
          fieldId={field.fieldId}
          type={field.type}
          placeholder={field.placeholder}
          fieldLabel={field.fieldLabel}
          disabled={!isFieldActive}
          required={field.required}
          options={field.getEnumOptions()}
          onChange={this.onFormFieldChange}
          onRemoveField={this.onRemoveField}
          value={field.value}
        />
      );
      formFieldsList.push(formField);
    }
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
    const formFields = [...this.state.formFields];
    const indexOfFieldToUpdate = formFields.findIndex(field => field.fieldId === selectedOption.fieldId);
    const fieldToUpdate = formFields[indexOfFieldToUpdate];
    fieldToUpdate.value = selectedOption.value;
    var callback = this.updateCurrentFormValues.bind(this, selectedOption);
    this.setState(
      {
        formFields
      },
      callback
    );
  };
  updateCurrentFormValues = selectedOption => {
    if (selectedOption.value) {
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
    }
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
  formFields: PropTypes.arrayOf(PropTypes.instanceOf(FormFieldModel)).isRequired,
  style: PropTypes.object
};
DyForm.defaultProps = {
  className: "",
  style: {}
};

export default DyForm;
