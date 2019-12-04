import FormFieldModel from "../models/FormFieldModel";
import TextFormFieldModel from "../modelfactories/TextFormFieldModel";
import Types from "../enums/Types";

export const FormFieldFactory = obj => {
  if (obj.type === Types.TEXT) {
    return new TextFormFieldModel(obj);
  }
};
