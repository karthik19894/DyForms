Please follow the following instructions to run the DyForms App.

1. After extracting the contents of the zip folder, make sure you have latest stable version of node and npm installed.
2. In the command line run "npm i" to install all the packages required as part of the project.
3. After running the above the app can be run by the following command "npm start", which serves your app in http://localhost:3000 by default.
4. To run the tests, use the command "npm test".

The instructions for the dynamic form fields to be configured are as follows:

The config is formatted as a json or javascript object.

To configure the form fields navigate to src/config/fields.js

now the example json structure and instructions for configuring the fields are as follows:

TEXT FIELD:

    fieldId: "name",    //The fieldId column can take string or integer values which has to be unique
    type: "text", //The types for now can take three values as defined in the enum file Types.js under src/enums/Types
    fieldLabel: "Name", //The Name can be any string
    placeholder: "Enter your name here", //The placeholder can be any string
    required: false, //This field will determine whether the field has to be filled in order to allow submission of the form
    fieldsToActivate: [], // This field can take an array of objects with "fieldId" and "value" as props, These objects in the array will make the defined field active
                                only upon filling all the fields defined under this property.
    oneOfTheFieldsToActivate: [],// This field can take an array of objects with "fieldId" and "value" as props, These objects in the array will make the defined field active
                                    only upon  filling one of all the fields defined under this property.
    renderWhenNotActive: true //This field takes a boolean and will determine whether the field is displayed to the user when the field is not active, this is set to true by                               default.

    There are two other Field types NUMBER and ENUM

    which has additional properties including the above.

NUMBER FIELD:

    minValue:1 //Restricts the minimum value set to the value defined under this property, here its 1.
    maxValue:10 //Restricts the maximum value set to the value defined under this property, here its 10.

ENUM FIELD:

    options:[{optionId:1,optionLabel:"one"}] // This field takes a list of objects with props "optionId" which will be the value or identifier for the option and
                                                label will be the text that is rendered to the user.
    value:[] //Here the value will be an array of identifiers.

    multiple:false //this bool field will allow multiple values in the enum.
