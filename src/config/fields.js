import identifiers from "./identifiers";
const {
  createdBy,
  description,
  severity,
  status,
  cancelledReason,
  cancelledOthersDescription,
  comments
} = identifiers;
const fields = [
  {
    fieldId: createdBy,
    type: "text",
    fieldLabel: "Created By",
    placeholder: "",
    value: "",
    required: false,
    fieldsToActivate: []
  },
  {
    fieldId: description,
    type: "text",
    fieldLabel: "Description",
    placeholder: "",
    value: "",
    required: false,
    fieldsToActivate: []
  },
  {
    fieldId: severity,
    type: "number",
    fieldLabel: "Severity",
    placeholder: "",
    value: null,
    required: false,
    fieldsToActivate: []
  },
  {
    fieldId: status,
    type: "enum",
    fieldLabel: "Status",
    placeholder: "",
    required: false,
    enumOptions: [
      {
        optionId: "cancelled",
        optionLabel: "CANCELLED"
      },
      {
        optionId: "completed",
        optionLabel: "COMPLETED"
      }
    ],
    fieldsToActivate: []
  },
  {
    fieldId: cancelledReason,
    type: "enum",
    fieldLabel: "Cancelled Reason",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: "status",
        value: "cancelled"
      }
    ],
    enumOptions: [
      {
        optionId: "others",
        optionLabel: "OTHERS"
      },
      {
        optionId: "endUser",
        optionLabel: "ENDUSER"
      }
    ]
  },
  {
    fieldId: cancelledOthersDescription,
    type: "text",
    fieldLabel: "Cancelled Others Description",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: "status",
        value: "cancelled"
      },
      {
        fieldId: "cancelledReason",
        value: "others"
      }
    ]
  },
  {
    fieldId: comments,
    type: "text",
    fieldLabel: "Comments",
    placeholder: "",
    required: false,
    fieldsToActivate: [
      {
        fieldId: "status",
        value: "completed"
      }
    ]
  }
];

export default fields;
