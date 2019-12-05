import React from "react";
import { shallow } from "../enzyme";
import { findByTestAttr } from "./testutils/utils";
import EnumFieldModel from "../models/EnumFieldModel";
import EnumFormField from "../components/EnumFormField";
import Types from "../enums/Types";

const mockFormField = new EnumFieldModel({
  fieldId: "testFieldId",
  type: Types.TEXT,
  value: "",
  fieldLabel: "Test Field",
  required: true,
  placeholder: "test placeholder",
  fieldsToActivate: [],
  _oneOfTheFieldsToActivate: [],
  renderWhenNotActive: true,
  options: [
    {
      optionId: 1,
      optionLabel: "test option 1"
    },
    {
      optionId: 2,
      optionLabel: "test option 2"
    }
  ]
});

const mockOnChange = jest.fn();
const mockOnRemove = jest.fn();
const wrapper = shallow(
  <EnumFormField enumFormField={mockFormField} disabled={false} onChange={mockOnChange} onRemoveField={mockOnRemove} />
);

describe("EnumFormField Component Rendering", () => {
  it("must render the text form field component", () => {
    expect(findByTestAttr(wrapper, "enum-form-field")).toBeDefined();
  });
  it("must contain the required class when required is true", () => {
    expect(findByTestAttr(wrapper, "enum-form-field").hasClass("required")).toBeTruthy();
  });
  it("must render with the placeholder text passed", () => {
    expect(findByTestAttr(wrapper, "input").prop("placeholder")).toEqual("test placeholder");
  });
});

describe("EnumFormField responding to events", () => {
  it("must call the on change prop when on change is triggered on the input", () => {
    findByTestAttr(wrapper, "input").simulate("change", { target: { value: mockFormField.getOptionsForSelect()[0] } });
    expect(mockOnChange).toHaveBeenCalled();
  });
  it("must call the on remove prop when on change results in falsy values", () => {
    findByTestAttr(wrapper, "input").simulate("change", { target: { value: "" } });
    expect(mockOnRemove).toHaveBeenCalled();
  });
});

describe("EnumField Options Rendering", () => {
  it("must render the list of options passed along with default none", () => {
    expect(findByTestAttr(wrapper, "option")).toHaveLength(mockFormField.options.length + 1);
  });
});
