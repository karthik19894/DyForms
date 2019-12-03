import React from "react";
import { shallow } from "../enzyme";
import { findByTestAttr } from "./testutils/utils";
import FormFieldModel from "../models/FormFieldModel";
import FormField from "../components/FormField";

const mockFormField = new FormFieldModel({
  fieldId: "testFieldId",
  type: "text",
  value: "",
  fieldLabel: "Test Field",
  required: true,
  placeholder: "test placeholder",
  fieldsToActivate: [],
  _oneOfTheFieldsToActivate: [],
  options: [],
  renderWhenNotActive: true
});

const mockOnChange = jest.fn();
const mockOnRemove = jest.fn();
const wrapper = shallow(
  <FormField
    fieldId={mockFormField.fieldId}
    type={mockFormField.type}
    value={mockFormField.value}
    fieldLabel={mockFormField.fieldLabel}
    required={mockFormField.required}
    placeholder={mockFormField.placeholder}
    options={mockFormField.options}
    onChange={mockOnChange}
    onRemoveField={mockOnRemove}
  />
);

describe("FormField Component Rendering", () => {
  it("must render the form field component", () => {
    expect(findByTestAttr(wrapper, "form-field")).toBeDefined();
  });
  it("must contain the required class when required is true", () => {
    expect(findByTestAttr(wrapper, "form-field").hasClass("required")).toBeTruthy();
  });
  it("must render with the placeholder text passed", () => {
    expect(findByTestAttr(wrapper, "input").prop("placeholder")).toEqual("test placeholder");
  });
});

describe("FormField responding to events", () => {
  it("must call the on change prop when on change is triggered on the input", () => {
    findByTestAttr(wrapper, "input").simulate("change", { target: { value: "hello" } });
    expect(mockOnChange).toHaveBeenCalled();
  });
  it("must call the on remove prop when on change results in falsy values", () => {
    findByTestAttr(wrapper, "input").simulate("change", { target: { value: "" } });
    expect(mockOnRemove).toHaveBeenCalled();
  });
});
