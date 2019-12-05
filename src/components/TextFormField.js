import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import TextFormFieldModel from "../models/TextFormFieldModel";

class TextFormField extends Component {
  render() {
    const { className, textFormField, disabled } = this.props;
    const { fieldLabel, fieldId, required, value, placeholder, type } = textFormField;
    const requiredCls = required ? "required" : "";
    return (
      <FormGroup className={`form-field text-form-field ${className} ${requiredCls}`} data-test="text-form-field">
        <Label className="control-label" for={fieldId}>
          {fieldLabel}
        </Label>
        <Input
          type={type}
          name={fieldId}
          id={fieldId}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={this.handleInputChange}
          value={value}
          data-test="input"
        />
      </FormGroup>
    );
  }
  handleInputChange = e => {
    const { fieldId, fieldLabel } = this.props.textFormField;
    const selectedField = {
      fieldId: fieldId,
      fieldLabel: fieldLabel,
      value: e.target.value
    };
    this.props.onChange(selectedField);
    if (!e.target.value) {
      this.props.onRemoveField({ fieldId: fieldId });
    }
  };
}

TextFormField.propTypes = {
  className: PropTypes.string,
  textFormField: PropTypes.instanceOf(TextFormFieldModel).isRequired,
  disabled: PropTypes.bool
};
TextFormField.defaultProps = {
  className: "",
  disabled: false
};

export default TextFormField;
