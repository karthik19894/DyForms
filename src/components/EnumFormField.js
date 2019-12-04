import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import EnumFieldModel from "../models/EnumFieldModel";

class EnumFormField extends Component {
  render() {
    const { enumFormField, disabled } = this.props;
    const { fieldLabel, fieldId, className, required, options, type, placeholder, value } = enumFormField;
    const requiredCls = required ? "required" : "";
    const optionsWithDefaultEmpty = options.length > 0 ? [{ value: "", label: "None" }, ...options] : [];
    return (
      <FormGroup className={`form-field ${className} ${requiredCls}`} data-test="form-field">
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
        >
          {this.renderOptionsList(optionsWithDefaultEmpty)}
        </Input>
      </FormGroup>
    );
  }
  renderOptionsList = options => {
    return options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };
  handleInputChange = e => {
    const { fieldId, fieldLabel } = this.props;
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
