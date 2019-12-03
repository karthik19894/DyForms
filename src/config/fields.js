import identifiers from "./identifiers";
import { status as statusEnum } from "../enums/status";
import { cancelledReason as cancelledReasonEnum } from "../enums/cancelledReason";
const { createdBy, description, severity, status, cancelledReason, cancelledOthersDescription, comments } = identifiers;
const fields = [
  {
    fieldId: createdBy,
    type: "text",
    fieldLabel: "Created By",
    placeholder: "",
    value: "",
    required: true,
    fieldsToActivate: [],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true
  },
  {
    fieldId: description,
    type: "text",
    fieldLabel: "Description",
    placeholder: "",
    value: "",
    required: false,
    fieldsToActivate: [],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true
  },
  {
    fieldId: severity,
    type: "number",
    fieldLabel: "Severity",
    placeholder: "",
    value: null,
    required: false,
    fieldsToActivate: [],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true
  },
  {
    fieldId: status,
    type: "enum",
    fieldLabel: "Status",
    placeholder: "",
    required: false,
    options: [
      {
        optionId: statusEnum.CANCELLED,
        optionLabel: "CANCELLED"
      },
      {
        optionId: statusEnum.COMPLETED,
        optionLabel: "COMPLETED"
      }
    ],
    fieldsToActivate: [],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true
  },
  {
    fieldId: cancelledReason,
    type: "enum",
    fieldLabel: "Cancelled Reason",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: status,
        value: statusEnum.CANCELLED
      }
    ],
    oneOfTheFieldsToActivate: [],
    options: [
      {
        optionId: cancelledReasonEnum.OTHERS,
        optionLabel: "OTHERS"
      },
      {
        optionId: cancelledReasonEnum.ENDUSER,
        optionLabel: "ENDUSER"
      }
    ],
    renderWhenNotActive: true
  },
  {
    fieldId: cancelledOthersDescription,
    type: "text",
    fieldLabel: "Cancelled Others Description",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: status,
        value: statusEnum.CANCELLED
      },
      {
        fieldId: cancelledReason,
        value: cancelledReasonEnum.OTHERS
      }
    ],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true
  },
  {
    fieldId: comments,
    type: "text",
    fieldLabel: "Comments",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: status,
        value: statusEnum.COMPLETED
      }
    ],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: true
  }
];

export default fields;
