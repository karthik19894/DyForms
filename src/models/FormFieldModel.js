export default class FormFieldModel {
  constructor(formFieldProps) {
    this._fieldId = formFieldProps.fieldId;
    this._type = formFieldProps.type;
    this._fieldLabel = formFieldProps.fieldLabel;
    this._required = formFieldProps.required || false;
    this._value = formFieldProps.value || null;
    this._placeholder = formFieldProps.placeholder || "";
    this._fieldsToActivate = formFieldProps.fieldsToActivate || [];
    this._oneOfTheFieldsToActivate = formFieldProps.oneOfTheFieldsToActivate || [];
    this._options = formFieldProps.options || [];
    this._renderWhenNotActive = formFieldProps.renderWhenNotActive === false ? false : true;
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
  get oneOfTheFieldsToActivate() {
    return this._oneOfTheFieldsToActivate;
  }
  set oneOfTheFieldsToActivate(oneOfTheFieldsToActivate) {
    this._oneOfTheFieldsToActivate = oneOfTheFieldsToActivate;
  }
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(placeholder) {
    this._placeholder = placeholder;
  }
  get renderWhenNotActive() {
    return this._required;
  }
  set renderWhenNotActive(renderWhenNotActive) {
    this._renderWhenNotActive = renderWhenNotActive;
  }
  isFormFieldActive = fieldsFilled => {
    if (this.fieldsToActivate.length > 0) {
      return this.isAllRequiredFieldsFilled(fieldsFilled);
    } else if (this.oneOfTheFieldsToActivate.length > 0) {
      return this.isAtleastOneOfTheRequiredFieldsFilled(fieldsFilled);
    } else {
      return true;
    }
  };
  isAllRequiredFieldsFilled = fieldsFilled => {
    let isActive = true;
    const fieldsRequiredToActive = this.fieldsToActivate;
    for (let fieldRequired of fieldsRequiredToActive) {
      const filledFieldsHasRequired = fieldsFilled.some(filledField => {
        return filledField.fieldId === fieldRequired.fieldId && filledField.value === fieldRequired.value;
      });
      if (!filledFieldsHasRequired) {
        return false;
      }
    }
    return isActive;
  };
  isAtleastOneOfTheRequiredFieldsFilled = fieldsFilled => {
    let isActive = true;
    const fieldsToCheck = this.oneOfTheFieldsToActivate;
    for (let fieldToCheck of fieldsToCheck) {
      const filledFieldsHasRequired = fieldsFilled.some(filledField => {
        return filledField.fieldId === fieldToCheck.fieldId && filledField.value === fieldToCheck.value;
      });
      if (!filledFieldsHasRequired) {
        isActive = false;
      } else {
        return true;
      }
    }
    return isActive;
  };
  getEnumOptions = () => {
    if (!(this._type === "enum")) return null;
    return this._options.map(option => {
      return {
        value: option.optionId,
        label: option.optionLabel
      };
    });
  };
}
