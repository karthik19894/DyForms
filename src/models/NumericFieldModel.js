import FormFieldModel from "./FormFieldModel";
export default class NumericFieldModel extends FormFieldModel {
  constructor(formFieldProps) {
    super(formFieldProps);
    this._minValue = formFieldProps.minValue || null;
    this._maxValue = formFieldProps.maxValue || null;
  }

  get minValue() {
    return this._minValue;
  }
  set minValue(minVal) {
    this._minValue = minVal;
  }
  get maxValue() {
    return this._maxValue;
  }
  set maxValue(maxVal) {
    this._maxValue = maxVal;
  }
}
