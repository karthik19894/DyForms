import React, { Component } from "react";
import TextFormField from "./TextFormField";
import EnumFormField from "./EnumFormField";
import NumericFormField from "./NumericFormField";
import { FormGroup, Button } from "reactstrap";
import PropTypes from "prop-types";
import Types from "../enums/Types";
import { FormFieldModelCreator } from "../models/ModelCreator";

class DyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filledFields: [],
      formFields: this.getModelledFields(this.props.formFields)
    };
  }
  componentDidMount() {
    const modelledFields = this.state.formFields;
    this.checkAndAppendFieldsFilledWithValuesToState(modelledFields);
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
  getModelledFields = formFields => {
    const modelledFields = [];
    formFields.forEach(field => {
      modelledFields.push(FormFieldModelCreator(field));
    });
    return modelledFields;
  };

  checkAndAppendFieldsFilledWithValuesToState = fields => {
    const fieldsFilledWithValues = fields.filter(field => Boolean(field.value));
    if (fieldsFilledWithValues.length > 0) {
      this.setState({
        filledFields: fieldsFilledWithValues
      });
    }
  };
  renderFormFields = () => {
    const { formFields } = this.state;
    let formFieldsList = [];
    for (let field of formFields) {
      const isFieldActive = field.isFormFieldActive(this.state.filledFields);
      if (!isFieldActive && !field.renderWhenNotActive) continue;
      const formField = this.getFormFieldRendererBasedOnType(field);
      formFieldsList.push(formField);
    }
    return formFieldsList;
  };
  renderSubmitButton = () => {
    return (
      <FormGroup className={"submit-btn-container text-center"}>
        <Button
          size="lg"
          color="primary"
          onClick={this.onFormSubmit}
          disabled={!this.canSubmit()}
          data-test="submit-btn"
        >
          {"Submit"}
        </Button>
      </FormGroup>
    );
  };
  canSubmit = () => {
    let requiredFieldIds = this.state.formFields.filter(field => field.required).map(field => field.fieldId);
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
    const formFields = [].concat(this.state.formFields);
    const fieldToUpdate = formFields.find(field => field.fieldId === selectedOption.fieldId);
    fieldToUpdate.value = selectedOption.value;
    const callback = this.updateFilledFormFields.bind(this, selectedOption);
    this.setState(
      {
        formFields
      },
      callback
    );
  };
  updateFilledFormFields = selectedOption => {
    const filledFields = [...this.state.filledFields];
    if (selectedOption.value) {
      let existingFieldIndex = filledFields.findIndex(field => field.fieldId === selectedOption.fieldId);
      if (existingFieldIndex > -1) {
        filledFields.splice(existingFieldIndex, 1, selectedOption);
      } else {
        filledFields.push(selectedOption);
      }
    }
    const disabledFieldIds = this.state.formFields
      .filter(field => !field.isFormFieldActive(filledFields))
      .map(field => field.fieldId);
    const filledFieldsFilteredOfDisabled = filledFields.filter(field => !disabledFieldIds.includes(field.fieldId));
    this.setState({
      filledFields: filledFieldsFilteredOfDisabled
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
  getFormFieldRendererBasedOnType = field => {
    const { filledFields } = this.state;
    const commonProps = {
      onChange: this.onFormFieldChange,
      onRemoveField: this.onRemoveField,
      "data-test": "form-field"
    };
    const fieldObj = FormFieldModelCreator(field);
    switch (fieldObj.type) {
      case Types.TEXT:
        return (
          <TextFormField
            key={fieldObj.fieldId}
            textFormField={fieldObj}
            disabled={!fieldObj.isFormFieldActive(filledFields)}
            {...commonProps}
          />
        );
      case Types.ENUM:
        return (
          <EnumFormField
            key={fieldObj.fieldId}
            enumFormField={fieldObj}
            disabled={!fieldObj.isFormFieldActive(filledFields)}
            {...commonProps}
            data-test="enum-form-field"
          />
        );
      case Types.NUMBER:
        return (
          <NumericFormField
            key={fieldObj.fieldId}
            numericFormField={fieldObj}
            disabled={!fieldObj.isFormFieldActive(filledFields)}
            {...commonProps}
          />
        );
      default:
        return (
          <TextFormField
            key={fieldObj.fieldId}
            textFormField={fieldObj}
            disabled={!fieldObj.isFormFieldActive(filledFields)}
            {...commonProps}
          />
        );
    }
  };
}

DyForm.propTypes = {
  className: PropTypes.string,
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  style: PropTypes.object
};
DyForm.defaultProps = {
  className: "",
  style: {}
};

export default DyForm;
