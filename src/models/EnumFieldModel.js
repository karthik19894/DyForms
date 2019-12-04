import FormFieldModel from "./FormFieldModel";

export default class EnumFieldModel extends FormFieldModel {
  constructor(formFieldProps) {
    super(formFieldProps);
    this._multiple = formFieldProps.multiple || false;
    this._options = formFieldProps.options || [];
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(multiple) {
    this._multiple = multiple;
  }
  get options() {
    return this._options.map(option => {
      return {
        value: option.optionId,
        label: option.optionLabel
      };
    });
  }
  set options(options) {
    this._options = options;
  }
}
