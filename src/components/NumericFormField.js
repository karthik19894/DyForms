import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import NumericFieldModel from "../models/NumericFieldModel";

class NumericFormField extends Component {
  render() {
    const { className, numericFormField } = this.props;
    const requiredCls = numericFormField.required ? "required" : "";
    const { type, fieldId, fieldLabel, required, disabled, placeholder, value, minValue, maxValue } = numericFormField;
    return (
      <FormGroup className={`form-field numeric-form-field ${className} ${requiredCls}`} data-test="numeric-form-field">
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
          min={minValue}
          max={maxValue}
        />
      </FormGroup>
    );
  }
  handleInputChange = e => {
    const { fieldId, fieldLabel } = this.props.numericFormField;
    const value = e.target.value;
    const selectedField = {
      fieldId: fieldId,
      fieldLabel: fieldLabel,
      value: value ? parseInt(e.target.value) : null
    };
    this.props.onChange(selectedField);
    if (!e.target.value) {
      this.props.onRemoveField({ fieldId: fieldId });
    }
  };
}

NumericFormField.propTypes = {
  className: PropTypes.string,
  numericFormField: PropTypes.instanceOf(NumericFieldModel),
  onChange: PropTypes.func.isRequired,
  onRemoveField: PropTypes.func.isRequired
};
NumericFormField.defaultProps = {
  className: ""
};

export default NumericFormField;
