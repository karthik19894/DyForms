import identifiers from "./identifiers";
import { Status as StatusEnum } from "../enums/Status";
import { CancelledReason as CancelledReasonEnum } from "../enums/CancelledReason";
import Types from "../enums/Types";
import CriticalReason from "../enums/CriticalReason";
import Conditionals from "../enums/Conditionals";
const {
  createdBy,
  description,
  severity,
  status,
  cancelledReason,
  cancelledOthersDescription,
  comments,
  criticalReason,
  normalComment,
  cancelledSeverity
} = identifiers;
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
  },
  {
    fieldId: criticalReason,
    type: Types.ENUM,
    fieldLabel: "Critical Reason",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: severity,
        conditional: Conditionals.GREATER_THAN_OR_EQUAL_TO,
        value: 100
      }
    ],
    options: [
      {
        optionId: CriticalReason.REASON_1,
        optionLabel: "REASON 1"
      },
      {
        optionId: CriticalReason.REASON_2,
        optionLabel: "REASON 2"
      },
      {
        optionId: CriticalReason.REASON_3,
        optionLabel: "REASON 3"
      }
    ],
    renderWhenNotActive: false
  },
  {
    fieldId: normalComment,
    type: Types.TEXT,
    fieldLabel: "Normal Comment",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: severity,
        conditional: Conditionals.LESS_THAN,
        value: 100
      }
    ],
    renderWhenNotActive: false
  },
  {
    fieldId: cancelledSeverity,
    type: Types.TEXT,
    fieldLabel: "Cancelled Severity",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: severity,
        conditional: Conditionals.LESS_THAN,
        value: 100,
        conditionalId: 1,
        overallConditionalType: "AND",
        overallConditionalMandatory: true,
        isMandatory: false
      },
      {
        fieldId: status,
        value: StatusEnum.CANCELLED,
        conditionalId: 1,
        isMandatory: false
      },
      {
        fieldId: status,
        value: StatusEnum.COMPLETED,
        conditionalId: 2,
        isMandatory: true
      },
      {
        fieldId: severity,
        conditional: Conditionals.EQUALS,
        value: 200,
        conditionalId: 2,
        isMandatory: true
      }
    ],
    conditions: [
      [
        {
          fieldId: severity,
          value: 200
        },
        "OR",
        {
          fieldId: status,
          value: StatusEnum.COMPLETED
        }
      ],
      "AND",
      [
        {
          fieldId: severity,
          value: 200
        },
        "OR",
        {
          fieldId: status,
          value: StatusEnum.COMPLETED
        }
      ],
      "OR",
      []
    ],
    oneOfTheFieldsToActivate: [],
    renderWhenNotActive: false,
    considerBothConditionals: false,
    isMultiConditional: true
  }
];

export default fields;
