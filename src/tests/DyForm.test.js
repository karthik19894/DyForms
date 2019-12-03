import React from "react";
import { shallow } from "../enzyme";
import { findByTestAttr } from "./testutils/utils";
import DyForm from "../components/DyForm";
import { fields } from "./testutils/mockformfields";
import FormFieldModel from "../models/FormFieldModel";
import FormField from "../components/FormField";

const formFields = fields.map(f => new FormFieldModel(f));
const wrapper = shallow(<DyForm className="dyform-test" formFields={formFields} />);

describe("DyForm rendering", () => {
  it("should render the dy form with container", () => {
    expect(findByTestAttr(wrapper, "dy-form")).toBeDefined();
  });

  it("should render list of FormFields equal to the length of inputs passed", () => {
    expect(wrapper.find(FormField)).toHaveLength(formFields.length);
  });

  it("should accept the className passed as prop", () => {
    expect(findByTestAttr(wrapper, "dy-form").hasClass("dyform-test")).toBeTruthy();
  });
});

//Modifying fields to support rendering logic tests
const filterTestFields = [...formFields];
const fieldToFilter = filterTestFields[0];
fieldToFilter.fieldsToActivate = [
  {
    fieldId: "nonexistent_field",
    value: "no value"
  }
];

fieldToFilter.renderWhenNotActive = false;

let filteredWrapper = shallow(<DyForm formFields={filterTestFields} />);
describe("FormFields filtering", () => {
  it("should not render the fields which are not active", () => {
    expect(filteredWrapper.find(FormField)).toHaveLength(formFields.length - 1);
  });
  fieldToFilter.renderWhenNotActive = true;
  let nonFilteredWrapper = shallow(<DyForm formFields={filterTestFields} />);
  it("should render the non active fields when the prop renderWhenNotActive set to true", () => {
    expect(nonFilteredWrapper.find(FormField)).toHaveLength(formFields.length);
  });
});

describe("Form Submit Validations", () => {
  it("should not allow submit when required fields are not filled", () => {
    const buttonWrapper = findByTestAttr(wrapper, "submit-btn");
    expect(buttonWrapper.prop("disabled")).toBeTruthy();
  });
  const submissionTestFields = [...formFields];
  const requiredField = submissionTestFields[0];
  requiredField.value = "test value for submission";
  const submissionWrapper = shallow(<DyForm formFields={submissionTestFields} />);
  it("should allow form submission when all required fields are filled", () => {
    const submittableButton = findByTestAttr(submissionWrapper, "submit-btn");
    expect(submittableButton.prop("disabled")).toBeFalsy();
  });
});
