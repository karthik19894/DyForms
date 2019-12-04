var GettersAndSetters = function() {
  return {
    get fieldId() {
      return this._fieldId;
    },
    set fieldId(id) {
      this.fieldId = id;
    },
    get type() {
      if (this._type === "enum") {
        return "select";
      }
      return this._type;
    },
    set type(type) {
      this._type = type;
    },
    get fieldLabel() {
      return this._fieldLabel;
    },
    set fieldLabel(label) {
      this._fieldLabel = label;
    },
    get required() {
      return this._required;
    },
    set required(required) {
      this._required = required;
    },
    get value() {
      return this._value;
    },
    set value(value) {
      this._value = value;
    },
    get fieldsToActivate() {
      return this._fieldsToActivate;
    },
    set fieldsToActivate(fieldsToActivate) {
      this._fieldsToActivate = fieldsToActivate;
    },
    get oneOfTheFieldsToActivate() {
      return this._oneOfTheFieldsToActivate;
    },
    set oneOfTheFieldsToActivate(oneOfTheFieldsToActivate) {
      this._oneOfTheFieldsToActivate = oneOfTheFieldsToActivate;
    },
    get placeholder() {
      return this._placeholder;
    },
    set placeholder(placeholder) {
      this._placeholder = placeholder;
    },
    get renderWhenNotActive() {
      return this._renderWhenNotActive;
    },
    set renderWhenNotActive(renderWhenNotActive) {
      this._renderWhenNotActive = renderWhenNotActive;
    }
  };
};
