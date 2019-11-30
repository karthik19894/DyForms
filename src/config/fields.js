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
    required: false,
    fieldsToActivate: []
  },
  {
    fieldId: description,
    type: "text",
    fieldLabel: "Description",
    required: false,
    fieldsToActivate: []
  },
  {
    fieldId: severity,
    type: "number",
    fieldLabel: "Severity",
    required: false,
    fieldsToActivate: []
  },
  {
    fieldId: status,
    type: "enum",
    fieldLabel: "Status",
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
    type: "text",
    fieldLabel: "Cancelled Reason",
    required: false,
    fieldsToActivate: [
      {
        fieldType: "enum",
        fieldId: "status",
        enumOptionId: "cancelled"
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
    required: false,
    fieldsToActivate: [
      {
        fieldType: "enum",
        fieldId: "status",
        enumOptionId: "cancelled"
      },
      {
        fieldType: "enum",
        fieldId: "cancelledReason",
        enumOptionId: "others"
      }
    ]
  },
  {
    fieldId: comments,
    type: "text",
    fieldLabel: "Comments",
    required: false,
    fieldsToActivate: [
      {
        fieldType: "enum",
        fieldId: "status",
        enumOptionId: "completed"
      }
    ]
  }
];

export default fields;
