import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";

class FormField extends Component {
  render() {
    const { fieldLabel, fieldId, className } = this.props;
    return (
      <FormGroup className={`form-field ${className}`}>
        <Label for={fieldId}>{fieldLabel}</Label>
        {this.renderInputBasedOnType()}
      </FormGroup>
    );
  }
  renderInputBasedOnType = () => {
    const { type, fieldId, required, disabled, placeholder, options } = this.props;
    const onChange = this.handleInputChange;
    const isSelectTypeInput = type === "select";
    const optionsWithDefaultEmpty = isSelectTypeInput ? [{ value: "", label: "None" }, ...options] : [];
    return (
      <Input
        type={type}
        name={fieldId}
        id={fieldId}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
      >
        {isSelectTypeInput ? this.renderOptionsList(optionsWithDefaultEmpty) : null}
      </Input>
    );
  };
  renderOptionsList = options => {
    return options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };
  handleInputChange = e => {
    const { fieldId, fieldLabel, type } = this.props;
    const isSelectTypeInput = type === "select";
    if (e.target.value) {
      const selectedField = {
        fieldId: fieldId,
        fieldLabel: fieldLabel,
        value: isSelectTypeInput ? parseInt(e.target.value) : e.target.value
      };
      this.props.onChange(selectedField);
    } else {
      this.props.onRemoveField({ fieldId: fieldId });
    }
  };
}

FormField.propTypes = {
  className: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRemoveField: PropTypes.func.isRequired
};
FormField.defaultProps = {
  className: "",
  disabled: false,
  required: false,
  placeholder: ""
};

export default FormField;
