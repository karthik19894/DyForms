import React from "react";
import { shallow } from "../enzyme";
import { findByTestAttr } from "./testutils/utils";
import DyForm from "../components/DyForm";
import { fields } from "./testutils/mockformfields";
import FormFieldModel from "../models/FormFieldModel";

const formFields = fields.map(f => new FormFieldModel(f));
const wrapper = shallow(<DyForm formFields={formFields} />);

describe("DyForm rendering", () => {
  it("Renders the dy form with container", () => {
    expect(findByTestAttr(wrapper, "dy-form")).toBeDefined();
  });
});
