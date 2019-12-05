import FormFieldModel from "./FormFieldModel";

export default class EnumFieldModel extends FormFieldModel {
  constructor(formFieldProps) {
    super(formFieldProps);
    this._multiple = formFieldProps.multiple || false;
    this._options = formFieldProps.options || [];
    this._value = formFieldProps.value || this._multiple ? [] : "";
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(multiple) {
    this._multiple = multiple;
  }
  get value() {
    return this._value;
  }
  set value(arrOfValues) {
    this._value = arrOfValues;
  }
  get options() {
    return this._options;
  }
  set options(options) {
    this._options = options;
  }
  getOptionsForSelect = () => {
    return this._options.map(option => {
      return {
        value: option.optionId,
        label: option.optionLabel
      };
    });
  };
}
