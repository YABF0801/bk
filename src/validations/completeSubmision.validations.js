const { childDataValidation } = require("./child.validations");
const { parentsDataValidation } = require("./parents.validations");
const { submisionDataValidation } = require("./submision.validations");

const SubmisionFormValidations = (data) => {
    const childDataErrors = childDataValidation(data);
    const parentDataErrors = parentsDataValidation(data);
    const submissionDataErrors = submisionDataValidation(data);
    
  return {
    ...childDataErrors,
    ...parentDataErrors,
    ...submissionDataErrors
  };
};
  
module.exports = {SubmisionFormValidations}; 
