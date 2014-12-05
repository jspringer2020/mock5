define([
  "amd/Person"
], function (Person) {
  'use strict';

  function MarriageProposal(proposingPerson, proposedToPerson) {

    if (!proposingPerson) {
      throw new Error("The argument 'proposingPerson' is required");
    }

    if (!(proposingPerson instanceof Person)) {
      throw new Error("The argument 'proposingPerson' does not conform to expected contract");
    }

    if (!proposedToPerson) {
      throw new Error("The argument 'proposedToPerson' is required");
    }

    if (!(proposedToPerson instanceof Person)) {
      throw new Error("The argument 'proposedToPerson' does not conform to expected contract");
    }

    this._proposingPerson = proposingPerson;
    this._proposedToPerson = proposedToPerson;
  }


  /**
   * Creates all the actions of performing a marriage proposal including getting down on one knew,
   * asking the question, receiving a response from the {otherPerson} and then returns the happiness level
   * of the person proposing.
   *
   * @param {Person} otherPerson The other person that is being proposed to.
   * @returns {String} The new tax filing status
   */
  MarriageProposal.prototype.performMarriageProposal = function performMarriageProposal() {
    var proposingLikelihood, proposedToLikelihood,
        proposer = this._proposingPerson, proposedTo = this._proposedToPerson,
        result = "Single";

    proposingLikelihood = proposer.calculatePersonalCompatibility(proposedTo);
    proposedToLikelihood = proposedTo.calculatePersonalCompatibility(proposer);

    if (proposingLikelihood >= 75 && proposedToLikelihood >= 75) {
      result = "Married";
    }

    return result;
  };

  
  return MarriageProposal;
});