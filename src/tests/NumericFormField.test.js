import React from "react";
import { shallow } from "../enzyme";
import { findByTestAttr } from "./testutils/utils";
import NumericFieldModel from "../models/NumericFieldModel";
import NumericFormField from "../components/NumericFormField";
import Types from "../enums/Types";

const mockFormField = new NumericFieldModel({
  fieldId: "testFieldId",
  type: Types.NUMBER,
  value: 1,
  fieldLabel: "Test Field",
  required: true,
  placeholder: "test placeholder",
  fieldsToActivate: [],
  _oneOfTheFieldsToActivate: [],
  renderWhenNotActive: true
});

const mockOnChange = jest.fn();
const mockOnRemove = jest.fn();
const wrapper = shallow(
  <NumericFormField
    numericFormField={mockFormField}
    disabled={false}
    onChange={mockOnChange}
    onRemoveField={mockOnRemove}
  />
);

describe("NumericFormField Component Rendering", () => {
  it("must render the text form field component", () => {
    expect(findByTestAttr(wrapper, "text-form-field")).toBeDefined();
  });
  it("must contain the required class when required is true", () => {
    expect(findByTestAttr(wrapper, "numeric-form-field").hasClass("required")).toBeTruthy();
  });
  it("must render with the placeholder text passed", () => {
    expect(findByTestAttr(wrapper, "input").prop("placeholder")).toEqual("test placeholder");
  });
});

describe("NumericFormField responding to events", () => {
  it("must call the on change prop when on change is triggered on the input", () => {
    findByTestAttr(wrapper, "input").simulate("change", { target: { value: 1 } });
    expect(mockOnChange).toHaveBeenCalled();
  });
  it("must call the on remove prop when on change results in falsy values", () => {
    findByTestAttr(wrapper, "input").simulate("change", { target: { value: "" } });
    expect(mockOnRemove).toHaveBeenCalled();
  });
});
