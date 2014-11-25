define([
  "amd/Person",
  "amd/PersonalHistoryProvider",
  "amd/LongShotCalculationProvider"
], function (Person, personalHistoryProvider, longShotCalculationProvider) {
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
   * Validates the marriage proposal ensuring that it can in fact take place.
   *
   * @returns {(MarriageProposal.Validation|Array.)} A list of broken {MarriageProposal.ValidationCodes} that failed validation.
   */
  MarriageProposal.prototype.validate = function validate() {
    var key, ruleInfo, result = [];

    for (key in marriageValidation) {
      ruleInfo = marriageValidation[key];

      if (!ruleInfo.rule.call(this)) {
        result.push(key);
      }
    }

    return result;
  };


  /**
   * Creates all the actions of performing a marriage proposal including getting down on one knew,
   * asking the question, receiving a response from the {otherPerson} and then returns the happiness level
   * of the person proposing.
   *
   * @param {Person} otherPerson The other person that is being proposed to.
   * @returns {String} The new tax filing status
   */
  MarriageProposal.prototype.performMarriageProposal = function performMarriageProposal() {
    var personalHistory,
      proposingLikelihood,
      proposedToLikelihood,
      longShotLikelihood,
      result = null,
      validationResult = this.validate();

    if (!validationResult || validationResult.length) {
      throw new Error("Marriage proposal is invalid.");
    }

    personalHistory = personalHistoryProvider.searchHistory(this._proposingPerson, this._proposedToPerson);
    proposingLikelihood = this._proposingPerson.calculatePersonalCompatibility(personalHistory);
    proposedToLikelihood = this._proposedToPerson.calculatePersonalCompatibility(personalHistory);

    if (proposingLikelihood <= 40 || proposedToLikelihood <= 40) {
      result = "Single";
    } else if (proposingLikelihood >= 75 && proposedToLikelihood >= 75) {
      result = "Married";
    } else {
      longShotLikelihood = Math.round(longShotCalculationProvider.generateRandomResult(proposingLikelihood, proposedToLikelihood) / 100);
      if (longShotLikelihood) {
        result = "Married, filing separately";
      } else {
        result = "Single";
      }
    }

    return result;
  };


  var marriageValidation = {
    10000: {
      rule: function () {
        return this._proposingPerson !== this._proposedToPerson;
      }
    },
    10001: {
      rule: function () {
        return this._proposingPerson.getGender() !== this._proposedToPerson.getGender();
      }
    }
  };


  MarriageProposal.Validation = marriageValidation;
  return MarriageProposal;
});