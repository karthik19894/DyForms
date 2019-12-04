import React, { Component } from "react";
import TextFormField from "./TextFormField";
import EnumFormField from "./EnumFormField";
import NumericFormField from "./NumericFormField";
import { FormGroup, Button } from "reactstrap";
import PropTypes from "prop-types";
import TextFormFieldModel from "../models/TextFormFieldModel";
import Types from "../enums/Types";
import EnumFieldModel from "../models/EnumFieldModel";
import NumericFieldModel from "../models/NumericFieldModel";

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
      const FieldModel = this.getModelConstructorBasedOnType(field.type);
      modelledFields.push(new FieldModel(field));
    });
    return modelledFields;
  };
  getModelConstructorBasedOnType = type => {
    switch (type) {
      case Types.TEXT:
        return TextFormFieldModel;
      case Types.ENUM:
        return EnumFieldModel;
      case Types.NUMBER:
        return NumericFieldModel;
      default:
        return TextFormFieldModel;
    }
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
      const isFieldActive = field.isFormFieldActive(this.state.filledFields) || true;
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
          Submit
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
    const formFields = [...this.state.formFields];
    const indexOfFieldToUpdate = formFields.findIndex(field => field.fieldId === selectedOption.fieldId);
    const fieldToUpdate = formFields[indexOfFieldToUpdate];
    fieldToUpdate.value = selectedOption.value;
    const callback = this.updateCurrentFormValues.bind(this, selectedOption);
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
  getFormFieldRendererBasedOnType = field => {
    const { filledFields } = this.state;
    const commonProps = {
      onChange: this.onFormFieldChange,
      onRemoveField: this.onRemoveField
    };
    switch (field.type) {
      case Types.TEXT:
        const textField = new TextFormFieldModel(field);
        return (
          <TextFormField
            key={field.fieldId}
            textFormField={textField}
            disabled={textField.isFormFieldActive(filledFields)}
            {...commonProps}
          />
        );
      case Types.ENUM:
        const enumField = new EnumFieldModel(field);
        return (
          <EnumFormField
            key={field.fieldId}
            enumFormField={enumField}
            disabled={enumField.isFormFieldActive(filledFields)}
            {...commonProps}
          />
        );
      case Types.NUMBER:
        const numField = new NumericFieldModel(field);
        return (
          <NumericFormField
            key={field.fieldId}
            numericFormField={numField}
            disabled={numField.isFormFieldActive(filledFields)}
            {...commonProps}
          />
        );
      default:
        const defaultTextField = new TextFormFieldModel(field);
        return (
          <TextFormField
            key={field.fieldId}
            textFormField={defaultTextField}
            disabled={defaultTextField.isFormFieldActive(filledFields)}
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
