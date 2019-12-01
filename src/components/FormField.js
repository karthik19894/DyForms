import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { fieldLabel, fieldId } = this.props;

    return (
      <FormGroup>
        <Label for={fieldId}>{fieldLabel}</Label>
        {this.renderInputBasedOnType()}
      </FormGroup>
    );
  }
  renderInputBasedOnType = () => {
    const {
      type,
      fieldId,
      required,
      disabled,
      placeholder,
      options
    } = this.props;
    const onChange = this.handleInputChange;
    if (this.props.type === "select") {
      const optionsWithDefaultEmpty = [{ value: "", label: "" }, ...options];
      return (
        <Input
          type={type}
          name={fieldId}
          id={fieldId}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          value={null}
        >
          {optionsWithDefaultEmpty.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      );
    } else {
      return (
        <Input
          type={type}
          name={fieldId}
          id={fieldId}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
        />
      );
    }
  };
  handleInputChange = e => {
    const { fieldId } = this.props;
    if (e.target.value) {
      const selectedField = {
        fieldId: fieldId,
        value: e.target.value
      };
      this.props.onChange(selectedField);
    } else {
      this.props.onRemoveField({ fieldId: fieldId });
    }
  };
}
