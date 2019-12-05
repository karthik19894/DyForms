import Types from "../enums/Types";
import TextFormFieldModel from "../models/TextFormFieldModel";
import EnumFieldModel from "../models/EnumFieldModel";
import NumericFieldModel from "../models/NumericFieldModel";
export const FormFieldModelCreator = field => {
  switch (field.type) {
    case Types.TEXT:
      return new TextFormFieldModel(field);
    case Types.ENUM:
      return new EnumFieldModel(field);
    case Types.NUMBER:
      return new NumericFieldModel(field);
    default:
      return new TextFormFieldModel(field);
  }
};
