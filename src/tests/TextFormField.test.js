import React from "react";
import { shallow } from "../enzyme";
import { findByTestAttr } from "./testutils/utils";
import TextFormFieldModel from "../models/TextFormFieldModel";
import TextFormField from "../components/TextFormField";
import Types from "../enums/Types";

const mockFormField = new TextFormFieldModel({
  fieldId: "testFieldId",
  type: Types.TEXT,
  value: "",
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
  <TextFormField textFormField={mockFormField} disabled={false} onChange={mockOnChange} onRemoveField={mockOnRemove} />
);

describe("TextFormField Component Rendering", () => {
  it("must render the text form field component", () => {
    expect(findByTestAttr(wrapper, "text-form-field")).toBeDefined();
  });
  it("must contain the required class when required is true", () => {
    expect(findByTestAttr(wrapper, "text-form-field").hasClass("required")).toBeTruthy();
  });
  it("must render with the placeholder text passed", () => {
    expect(findByTestAttr(wrapper, "input").prop("placeholder")).toEqual("test placeholder");
  });
});

describe("TextFormField responding to events", () => {
  it("must call the on change prop when on change is triggered on the input", () => {
    findByTestAttr(wrapper, "input").simulate("change", { target: { value: "hello" } });
    expect(mockOnChange).toHaveBeenCalled();
  });
  it("must call the on remove prop when on change results in falsy values", () => {
    findByTestAttr(wrapper, "input").simulate("change", { target: { value: "" } });
    expect(mockOnRemove).toHaveBeenCalled();
  });
});
