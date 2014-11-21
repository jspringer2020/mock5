

function Person(gender, name) {
  if (typeof gender !== "boolean") {
    throw new Error("The argument 'gender' does not conform to expected contract");
  }
  
  if (!name) {
    throw new Error("The argument 'name' is required");
  }
  
  if (typeof name !== "string") {
    throw new Error("The argument 'name' does not conform to expected contract");
  }
  
  this._gender = gender ? Gender.getMale() : Gender.getFemale();
  this._name = name;
}


/**
 * Returns the gender of the person.
 *
 * @returns {Person.Gender} The gender of the person
 */
Person.prototype.getGender = function getGender() {
  return this._gender;
};


/**
 * Returns the name of the person.
 *
 * @returns {String} The person's name
 */
Person.prototype.getName = function getName() {
  return this._name;
};


/**
 * Taking in a {Person} it determines the likelihood of a YES response for marriage. This is a long running method 
 * because it examines of all the "history" between the two {Person}s. The result of this method is a positive 
 * integer between 0 and 100 which describes how likely the response to the proposal will be YES.
 * 
 * @param {Person} proposal The marriage proposal
 * @param {PersonalHistoryProvider} personalHistoryProvider The service provider used for retrieving all the history for two {Person}s.
 * @result {Integer} A percent of how likely the person is to respond YES to the proposal.
 */
Person.prototype.getMarriageProposalResponse = function getMarriageProposalResponse(/*otherPerson, personalHistoryProvider*/) {
  return 0;
};


var Gender = function(isMale) {
  this._isMale = isMale === true;
  this._displayName = this._isMale ? "Male" : "Female";
};


Gender.prototype.getIsMale = function getIsMale() {
  return this._isMale;
};


Gender.prototype.getDisplayName = function getDisplayName() {
  return this._displayName;
};


var genders = {
  male: new Gender(true),
  female: new Gender(false)
};

Gender.getMale = function getMale() { return genders.male; };
Gender.getFemale = function getFemale() { return genders.female; };


module.exports = Person;