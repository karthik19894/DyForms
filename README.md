# DyForms

DyForms is a dynamic react form component that behaves based on the JSON configuration passed, it basically provides a form  that dynamically renders based on the user's interaction.

## Instructions 
Please follow the following instructions to run the DyForms App.

1. After extracting the contents of the zip folder, make sure you have latest stable version of node and npm installed.
2. In the command line run "npm i" to install all the packages required as part of the project.
3. After running the above the app can be run by the following command "npm start", which serves your app in http://localhost:3000 by default.
4. To run the tests, use the command "npm test".

The instructions for the dynamic form fields to be configured are as follows:

The config is formatted as a json or javascript object.

To configure the form fields navigate to src/config/fields.js

now the example json structure and instructions for configuring the fields are as follows:

### Text Field:

The text field object would look like the below:
```javascript
{
    fieldId:"name",
    type:"text",
    fieldLabel:"Name",
    placeholder:"Enter your name here",
    required:false,
    conditions:[],
    renderWhenNotActive:true
}
```
Here the conditions array will determine when a particular form field is active, to give an example, lets say we have a field called "Location" and we want this field to be active only if the other field that has the fieldId of "isLocationNeeded" has its value set to true, then the conditions array would look like below

```javascript
conditions:[
    {
        fieldId:"isLocationNeeded",
        value:true,
        conditional:Conditionals.EQUALS
    }
]
```

In the above conditional object, the property conditional is by default set to equals, however in case of numeric fields, we could use other conditionals like "GREATER_THAN", "LESS_THAN", "GREATER_THAN_OR_EQUAL_TO" AND "LESS_THAN_OR_EQUAL_TO".

There are two other Field types NUMBER and ENUM

which has additional properties including the above.

### Number Field:

```javascript 
minValue:1 //Restricts the minimum value set to the value defined under this property, here its 1.
maxValue:10 //Restricts the maximum value set to the value defined under this property, here its 10.
```
### Enum Field:

```javascript
options:[{optionId:1,optionLabel:"one"}] // This field takes a list of objects with props "optionId" which will be the value or identifier for the option and label will be the text that is rendered to the user.
value:[] //Here the value will be an array of identifiers.
multiple:false //this bool field will allow multiple values in the enum.
```
