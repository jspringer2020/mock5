var Person = require("Person");


function MarriageProposal(proposingPerson, proposedToPerson) {
  if (!(proposedToPerson instanceof Person)) {
    throw new Error("The argument 'proposingPerson' does not conform to expected contract");
  }

  if (!(proposedToPerson instanceof Person)) {
    throw new Error("The argument 'proposedToPerson' does not conform to expected contract");
  }
  
  this._proposingPerson = proposingPerson;
  this._proposedToPerson = proposedToPerson;
}


/**
 * Validates the marriage proposal ensuring that it can in fact take place.
 *
 * @returns {(MarriageProposal.Validation|Array.)} A list of broken {MarriageProposal.ValidationCodes} that failed validation.
 */
MarriageProposal.prototype.validate = function validate() {
  return [];
};


/**
 * Creates all the actions of performing a marriage proposal including getting down on one knew,
 * asking the question, receiving a response from the {otherPerson} and then returns the happiness level
 * of the person proposing.
 * 
 * @param {Person} otherPerson The other person that is being proposed to.
 * @returns {String} The new tax filing status
 */
Person.prototype.performMarriageProposal = function performMarriageProposal() {
  return null;
};


var marriageValidation = {
  10000: {
    rule: function() {
      return this._proposingPerson !== this._proposedToPerson;
    }
  },
  10001: {
    rule: function() {
      return this._proposingPerson.getGender() !== this._proposedToPerson.getGender();
    }
  }
};


MarriageProposal.Validation = marriageValidation;
module.exports = MarriageProposal;