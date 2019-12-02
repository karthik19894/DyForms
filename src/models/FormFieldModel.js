export default class FormFieldModel {
  constructor(formFieldProps) {
    this._fieldId = formFieldProps.fieldId;
    this._type = formFieldProps.type;
    this._fieldLabel = formFieldProps.fieldLabel;
    this._required = formFieldProps.required || false;
    this._value = formFieldProps.value || null;
    this._placeholder = formFieldProps.placeholder || "";
    this._fieldsToActivate = formFieldProps.fieldsToActivate || [];
    this._enumOptions = formFieldProps.enumOptions || [];
  }
  get fieldId() {
    return this._fieldId;
  }
  set fieldId(id) {
    this.fieldId = id;
  }
  get type() {
    if (this._type === "enum") {
      return "select";
    }
    return this._type;
  }
  set type(type) {
    this._type = type;
  }
  get fieldLabel() {
    return this._fieldLabel;
  }
  set fieldLabel(label) {
    this._fieldLabel = label;
  }
  get required() {
    return this._required;
  }
  set required(required) {
    this._required = required;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  get fieldsToActivate() {
    return this._fieldsToActivate;
  }
  set fieldsToActivate(fieldsToActivate) {
    this._fieldsToActivate = fieldsToActivate;
  }
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(placeholder) {
    this._placeholder = placeholder;
  }
  isFormFieldActive = fieldsFilled => {
    const fieldsRequiredToActive = this.fieldsToActivate;
    let isActive = true;
    for (let fieldRequired of fieldsRequiredToActive) {
      if (
        !fieldsFilled.some(filledField => {
          return filledField.value === fieldRequired.value;
        })
      ) {
        return false;
      }
    }
    return isActive;
  };
  getEnumOptions = () => {
    if (!(this._type === "enum")) return null;
    return this._enumOptions.map(option => {
      return {
        value: option.optionId,
        label: option.optionLabel
      };
    });
  };
}
