import Conditionals from "../enums/Conditionals";
export default class FormFieldModel {
  constructor(formFieldProps) {
    this._fieldId = formFieldProps.fieldId;
    this._type = formFieldProps.type;
    this._fieldLabel = formFieldProps.fieldLabel;
    this._required = formFieldProps.required || false;
    this._value = formFieldProps.value || "";
    this._placeholder = formFieldProps.placeholder || "";
    this._fieldsToActivate = formFieldProps.fieldsToActivate || [];
    this._oneOfTheFieldsToActivate = formFieldProps.oneOfTheFieldsToActivate || [];
    this._renderWhenNotActive = formFieldProps.renderWhenNotActive === false ? false : true;
    this._considerBothConditionals = formFieldProps.considerBothConditionals || false;
    this.isMultiConditional = formFieldProps.isMultiConditional || false;
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
    return this._renderWhenNotActive;
  }
  set renderWhenNotActive(renderWhenNotActive) {
    this._renderWhenNotActive = renderWhenNotActive;
  }

  get considerBothConditionals() {
    return this._considerBothConditionals;
  }
  set considerBothConditionals(considerBothConditionals) {
    this._considerBothConditionals = considerBothConditionals;
  }

  get isMultiConditional() {
    return this._isMultiConditional;
  }
  set isMultiConditional(isMultiConditional) {
    this._isMultiConditional = isMultiConditional;
  }

  isFormFieldActive = fieldsFilled => {
    return this.evaluateBooleanArray(this.conditions, true, fieldsFilled);
    const isFieldsToActivateDefined = this.fieldsToActivate.length > 0;
    const isOneOfTheFieldsToActivateDefined = this.oneOfTheFieldsToActivate.length > 0;
    if (this.isMultiConditional) {
      return this.validateMultiConditionalFields(fieldsFilled);
    }
    if (this.considerBothConditionals && isFieldsToActivateDefined && isOneOfTheFieldsToActivateDefined) {
      return (
        this.isAllRequiredFieldsFilled(fieldsFilled, this.fieldsToActivate) ||
        this.isAtleastOneOfTheRequiredFieldsFilled(fieldsFilled)
      );
    }
    if (this.fieldsToActivate.length > 0) {
      return this.isAllRequiredFieldsFilled(fieldsFilled, this.fieldsToActivate);
    } else if (this.oneOfTheFieldsToActivate.length > 0) {
      return this.isAtleastOneOfTheRequiredFieldsFilled(fieldsFilled);
    } else {
      return true;
    }
  };
  isAllRequiredFieldsFilled = (fieldsFilled, fieldsToActivate) => {
    let isActive = true;
    const fieldsRequiredToActive = fieldsToActivate;
    for (let fieldRequired of fieldsRequiredToActive) {
      const filledFieldsHasRequired = this.isFieldFilled(fieldRequired, fieldsFilled);
      if (!filledFieldsHasRequired) {
        return false;
      }
    }
    return isActive;
  };
  isFieldFilled = (field, fieldsFilled) => {
    return fieldsFilled.some(filledField => {
      return (
        filledField.fieldId === field.fieldId &&
        this.validateFieldBasedOnConditional(filledField.value, field.value, field.conditional)
      );
    });
  };
  isAtleastOneOfTheRequiredFieldsFilled = fieldsFilled => {
    let isActive = true;
    const fieldsToCheck = this.oneOfTheFieldsToActivate;
    for (let fieldToCheck of fieldsToCheck) {
      const filledFieldsHasRequired = fieldsFilled.some(filledField => {
        return (
          filledField.fieldId === fieldToCheck.fieldId &&
          this.validateFieldBasedOnConditional(filledField.value, fieldToCheck.value, fieldToCheck.conditional)
        );
      });
      if (!filledFieldsHasRequired) {
        isActive = false;
      } else {
        return true;
      }
    }
    return isActive;
  };
  validateMultiConditionalFields = fieldsFilled => {
    const setOfConditionals = new Set();
    let isActive = false;
    this.fieldsToActivate.forEach(field => {
      setOfConditionals.add(field.conditionalId);
    });
    for (let conditional of setOfConditionals) {
      let fieldsToCheckOfConditional = this.fieldsToActivate.filter(field => field.conditionalId === conditional);
      let filledFieldsOfConditional = fieldsFilled.filter(filledField =>
        Boolean(fieldsToCheckOfConditional.find(field => field.fieldId === filledField.fieldId))
      );
      isActive = this.validateMultiFieldsFilled(filledFieldsOfConditional, fieldsToCheckOfConditional);
      if (isActive) {
        return isActive;
      }
    }
    setOfConditionals.forEach(conditional => {});
    return isActive;
  };
  validateMultiFieldsFilled = (fieldsFilled, fieldsToCheck) => {
    let isOneOfTheFieldsFilled = false;
    for (let field of fieldsToCheck) {
      let isFieldFilled = this.isFieldFilled(field, fieldsFilled);
      isOneOfTheFieldsFilled = isFieldFilled;
      if (!isFieldFilled && field.isMandatory) {
        return false;
      } else {
        continue;
      }
    }
    return isOneOfTheFieldsFilled;
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
  isConditionSatisfied = (filledFields, fieldToCheck) => {
    let fieldInFilled = filledFields.find(field => {
      return this.validateFieldBasedOnConditional(field.value, fieldToCheck.value, fieldToCheck.condition);
    });
    if (fieldInFilled) {
      return true;
    } else {
      return false;
    }
  };
  conditionEvaluator = filledFields => {
    let conditions = this.conditions;
    for (let condition of conditions) {
      if (condition instanceof Array) {
        let parsedConditions = condition.map(expression => {
          if (typeof expression === "object" && !Array.isArray(expression)) {
            return this.isConditionSatisfied(filledFields, expression);
          } else if (Array.isArray(expression)) {
            expression.reduce((acc, curr) => {
              return this.isConditionSatisfied(filledFields, expression);
            }, []);
          }
        });
      }
    }
  };
  evaluateBooleanArray = (arr, evaluated = true, filledFields) => {
    if (arr.length === 0) return evaluated;
    else if (typeof arr[0] === "object" && !Array.isArray(arr[0])) {
      evaluated = this.checkForCondition(arr[0], filledFields);
      return this.evaluateBooleanArray(arr.splice(1), evaluated);
    } else if (typeof arr[0] === "string" && arr[0].toLowerCase() === "or") {
      return evaluated || this.evaluateBooleanArray(arr.splice(1), evaluated);
    } else if (typeof arr[0] === "string" && arr[0].toLowerCase()) {
      return evaluated && this.evaluateBooleanArray(arr.splice(1), evaluated);
    } else if (Array.isArray(arr[0])) {
      return this.evaluateBooleanArray(arr.splice(1), true);
    } else {
      throw new Error("Invalid Expression in Conditions");
    }
  };
  checkForCondition = (condition, filledFields) => {
    return filledFields.some(field => {
      field.fieldId === condition.fieldId &&
        this.validateFieldBasedOnConditional(field.value, condition.value, condition.conditional);
    });
  };
  evaluateArray = booleanExpressions => {
    for (let [i, expr] of booleanExpressions.entries()) {
      if (typeof expr === "object" && !Array.isArray(expr)) {
        booleanExpressions[i] = this.checkForCondition(expr);
      } else if (typeof expr === "object" && Array.isArray(expr)) {
        booleanExpressions[i] = this.evaluateBooleanArray(expr);
      }
    }
  };
}
