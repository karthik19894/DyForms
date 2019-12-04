import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import TextFormFieldModel from "../models/TextFormFieldModel";

class TextFormField extends Component {
  render() {
    const { textFormField } = this.props;
    const { fieldLabel, fieldId, className, required } = textFormField;
    const requiredCls = required ? "required" : "";
    return (
      <FormGroup className={`form-field ${className} ${requiredCls}`} data-test="form-field">
        <Label className="control-label" for={fieldId}>
          {fieldLabel}
        </Label>
        {this.renderInputBasedOnType()}
      </FormGroup>
    );
  }
  renderInputBasedOnType = () => {
    const { type, fieldId, required, disabled, placeholder, value } = this.props;
    const onChange = this.handleInputChange;
    return (
      <Input
        type={type}
        name={fieldId}
        id={fieldId}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
        data-test="input"
      />
    );
  };
  handleInputChange = e => {
    const { fieldId, fieldLabel } = this.props;
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
