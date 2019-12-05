import identifiers from "./identifiers";
import { Status as StatusEnum } from "../enums/Status";
import { CancelledReason as CancelledReasonEnum } from "../enums/CancelledReason";
import Types from "../enums/Types";
const { createdBy, description, severity, status, cancelledReason, cancelledOthersDescription, comments } = identifiers;
const fields = [
  {
    fieldId: createdBy,
    type: Types.TEXT,
    fieldLabel: "Created By",
    placeholder: "",
    value: "karthik",
    required: true,
    fieldsToActivate: [],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true,
    multiple: false
  },
  {
    fieldId: description,
    type: Types.TEXT,
    fieldLabel: "Description",
    placeholder: "",
    value: "",
    required: false,
    fieldsToActivate: [],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true,
    multiple: false
  },
  {
    fieldId: severity,
    type: Types.NUMBER,
    fieldLabel: "Severity",
    placeholder: "",
    value: null,
    required: false,
    fieldsToActivate: [],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true,
    multiple: false,
    minValue: null,
    maxValue: null
  },
  {
    fieldId: status,
    type: Types.ENUM,
    fieldLabel: "Status",
    placeholder: "",
    required: false,
    options: [
      {
        optionId: StatusEnum.CANCELLED,
        optionLabel: "CANCELLED"
      },
      {
        optionId: StatusEnum.COMPLETED,
        optionLabel: "COMPLETED"
      }
    ],
    fieldsToActivate: [],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true,
    multiple: false
  },
  {
    fieldId: cancelledReason,
    type: Types.ENUM,
    value: "",
    fieldLabel: "Cancelled Reason",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: status,
        value: StatusEnum.CANCELLED
      }
    ],
    oneOfTheFieldsToActivate: [],
    options: [
      {
        optionId: CancelledReasonEnum.OTHERS,
        optionLabel: "OTHERS"
      },
      {
        optionId: CancelledReasonEnum.ENDUSER,
        optionLabel: "ENDUSER"
      }
    ],
    renderWhenNotActive: true,
    multiple: false
  },
  {
    fieldId: cancelledOthersDescription,
    type: Types.TEXT,
    fieldLabel: "Cancelled Others Description",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: status,
        value: StatusEnum.CANCELLED
      },
      {
        fieldId: cancelledReason,
        value: CancelledReasonEnum.OTHERS
      }
    ],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true,
    multiple: false
  },
  {
    fieldId: comments,
    type: Types.TEXT,
    fieldLabel: "Comments",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: status,
        value: StatusEnum.COMPLETED
      }
    ],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true,
    multiple: false
  }
];

export default fields;
