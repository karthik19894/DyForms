import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import EnumFieldModel from "../models/EnumFieldModel";

class EnumFormField extends Component {
  state = {
    fieldValues: this.props.enumFormField.value
  };
  render() {
    const { enumFormField, disabled, className } = this.props;
    const { fieldLabel, fieldId, required, placeholder, multiple, value } = enumFormField;
    const options = enumFormField.getOptionsForSelect();
    const requiredCls = required ? "required" : "";
    const optionsWithDefaultEmpty = options.length > 0 ? [{ value: "", label: "None" }, ...options] : [];
    const optionsToRender = multiple ? options : optionsWithDefaultEmpty;
    const onChange = multiple ? this.handleMultipleInputsChange : this.handleInputChange;
    const valueInForm = multiple ? this.state.fieldValues : value;
    return (
      <FormGroup className={`form-field enum-form-field ${className} ${requiredCls}`} data-test="enum-form-field">
        <Label className="control-label" for={fieldId}>
          {fieldLabel}
        </Label>
        <Input
          type={"select"}
          name={fieldId}
          id={fieldId}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          value={valueInForm}
          data-test="input"
          multiple={multiple}
        >
          {this.renderOptionsList(optionsToRender)}
        </Input>
      </FormGroup>
    );
  }
  renderOptionsList = options => {
    return options.map(option => (
      <option key={option.value} value={option.value} data-test="option">
        {option.label}
      </option>
    ));
  };
  handleInputChange = e => {
    const { fieldId, fieldLabel } = this.props.enumFormField;
    const selectedField = {
      fieldId: fieldId,
      fieldLabel: fieldLabel,
      value: parseInt(e.target.value)
    };
    this.props.onChange(selectedField);
    if (!e.target.value) {
      this.props.onRemoveField({ fieldId: fieldId });
    }
  };
  handleMultipleInputsChange = e => {
    const { fieldId, fieldLabel } = this.props.enumFormField;
    const newValue = e.target.value;
    const updatedValues = [...this.state.fieldValues];
    const indexOfUpdatedValue = updatedValues.indexOf(newValue);
    if (indexOfUpdatedValue > -1) {
      updatedValues.splice(indexOfUpdatedValue, 1);
    } else {
      updatedValues.push(newValue);
    }
    this.setState(
      {
        fieldValues: updatedValues
      },
      () => {
        const selectedField = {
          fieldId: fieldId,
          fieldLabel: fieldLabel,
          value: updatedValues
        };
        this.props.onChange(selectedField);
      }
    );
  };
}

EnumFormField.propTypes = {
  className: PropTypes.string,
  enumFormField: PropTypes.instanceOf(EnumFieldModel).isRequired
};
EnumFormField.defaultProps = {
  className: "",
  disabled: false
};

export default EnumFormField;
