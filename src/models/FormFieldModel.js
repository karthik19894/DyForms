import Conditionals from "../enums/Conditionals";
export default class FormFieldModel {
  constructor(formFieldProps) {
    this._fieldId = formFieldProps.fieldId;
    this._type = formFieldProps.type;
    this._fieldLabel = formFieldProps.fieldLabel;
    this._required = formFieldProps.required || false;
    this._value = formFieldProps.value || "";
    this._placeholder = formFieldProps.placeholder || "";
    this._renderWhenNotActive = formFieldProps.renderWhenNotActive === false ? false : true;
    this.conditions =
      Array.isArray(formFieldProps.conditions) && formFieldProps.conditions.length > 0
        ? this.setConditions(formFieldProps.conditions)
        : [];
  }
  setConditions(conditions) {
    let newConditions = [];
    conditions.forEach(condition => {
      newConditions.push(condition);
    });
    return newConditions;
  }
  get fieldId() {
    return this._fieldId;
  }
  set fieldId(id) {
    this.fieldId = id;
  }
  get type() {
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
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(placeholder) {
    this._placeholder = placeholder;
  }
  get renderWhenNotActive() {
    return this._renderWhenNotActive;
  }
  set renderWhenNotActive(renderWhenNotActive) {
    this._renderWhenNotActive = renderWhenNotActive;
  }
  isFormFieldActive = fieldsFilled => {
    let conditionsToEvaluate = [].concat(this.conditions);
    return conditionsToEvaluate.length > 0 ? this.evaluateBooleanArray(conditionsToEvaluate, true, fieldsFilled) : true;
  };
  validateFieldBasedOnConditional = (valueToCheck, value, conditional = Conditionals.EQUALS) => {
    switch (conditional) {
      case Conditionals.EQUALS:
        return valueToCheck === value;
      case Conditionals.GREATER_THAN:
        return valueToCheck > value;
      case Conditionals.LESS_THAN:
        return valueToCheck < value;
      case Conditionals.LESS_THAN_OR_EQUAL_TO:
        return valueToCheck <= value;
      case Conditionals.GREATER_THAN_OR_EQUAL_TO:
        return valueToCheck >= value;
      default:
        return valueToCheck === value;
    }
  };
  evaluateBooleanArray = (arr, evaluated = true, filledFields) => {
    if (arr.length === 0) return evaluated;
    else if (typeof arr[0] === "object" && !Array.isArray(arr[0])) {
      let newEvaluated = this.checkForCondition(arr[0], filledFields);
      return this.evaluateBooleanArray(arr.splice(1), newEvaluated, filledFields);
    } else if (typeof arr[0] === "string" && arr[0].toLowerCase() === "or") {
      return evaluated || this.evaluateBooleanArray(arr.splice(1), evaluated, filledFields);
    } else if (typeof arr[0] === "string" && arr[0].toLowerCase() === "and") {
      return evaluated && this.evaluateBooleanArray(arr.splice(1), evaluated, filledFields);
    } else if (Array.isArray(arr[0])) {
      let arrToValuate = [].concat(arr[0]);
      return this.evaluateBooleanArray(
        arr.splice(1),
        this.evaluateBooleanArray(arrToValuate, evaluated, filledFields),
        filledFields
      );
    } else {
      throw new Error("Invalid Expression in Conditions");
    }
  };
  checkForCondition = (condition, filledFields) => {
    return filledFields.some(field => {
      return (
        field.fieldId === condition.fieldId &&
        this.validateFieldBasedOnConditional(field.value, condition.value, condition.conditional)
      );
    });
  };
}
