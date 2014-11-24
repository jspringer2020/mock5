describe("MarriageProposal", function () {
  'use strict';


  var baseDirectory = "./../../";
  var proxyquire = require("proxyquire");
  //var chance = require("chance")();
  var sinon = require("sinon");

  var mocks = {},
    PersonConstructorMock, personalHistoryProviderMock, longShotCalculatorMock;

  PersonConstructorMock = function () {};
  PersonConstructorMock.prototype.sillyGoose = function sillyGoose() {};
  mocks["./Person"] = PersonConstructorMock;

  personalHistoryProviderMock = sinon.stub();
  mocks["./PersonalHistoryProvider"] = personalHistoryProviderMock;

  longShotCalculatorMock = sinon.stub();
  mocks["./LongShotCalculationProvider"] = longShotCalculatorMock;


  function getModule() {
    var mod = proxyquire(baseDirectory + "src/MarriageProposal", mocks);
    return mod;
  }

  describe("when creating a new marriage proposal", function () {
    var MarriageProposal;

    beforeEach(function () {
      MarriageProposal = getModule();
    });

    describe("when invalid parameters are used", function () {

      describe("when the proposing person is invalid", function () {

        describe("when person is missing", function () {
          var construction;

          beforeEach(function () {
            construction = function () {
              return new MarriageProposal();
            };
          });

          it("then an error is raised during construction", function () {
            construction.should.throwError("The argument 'proposingPerson' is required");
          });
        });

        describe("when person is not a Person", function () {
          var construction;

          beforeEach(function () {
            construction = function () {
              return new MarriageProposal({});
            };
          });

          it("then an error is raised during construction", function () {
            construction.should.throwError("The argument 'proposingPerson' does not conform to expected contract");
          });
        });
      });

      describe("when the proposed to person is invalid", function () {
        var proposer;
        beforeEach(function () {
          proposer = new PersonConstructorMock();
        });

        describe("when person is missing", function () {
          var construction;
          beforeEach(function () {
            construction = function () {
              return new MarriageProposal(proposer, null);
            };
          });

          it("then an error is raised during construction", function () {
            construction.should.throwError("The argument 'proposedToPerson' is required");
          });
        });

        describe("when person is not a Person", function () {
          var construction;
          beforeEach(function () {
            construction = function () {
              return new MarriageProposal(proposer, {});
            };
          });

          it("then an error is raised during construction", function () {
            construction.should.throwError("The argument 'proposedToPerson' does not conform to expected contract");
          });
        });
      });
    });

    describe("when the object is constructed successful", function () {
      var construction, proposedTo, proposer;
      beforeEach(function () {
        proposedTo = new PersonConstructorMock();
        proposer = new PersonConstructorMock();

        construction = function () {
          return new MarriageProposal(proposer, proposedTo);
        };
      });

      it("then an error is not raised", function () {
        construction.should.not.throwError();
      });

      it("then the instance is not null", function () {
        construction().should.not.equal(null);
      });

      it("then the instance's properties are set", function () {
        construction().should.have.properties({
          _proposingPerson: proposer,
          _proposedToPerson: proposedTo
        });
      });
    });
  });

  describe("when validating the proposal", function () {
    var MarriageProposal;
    beforeEach(function () {
      MarriageProposal = getModule();
    });

    describe("when proposing to 'myself'", function () {
      var result;
      beforeEach(function () {
        var proposer = new PersonConstructorMock();
        proposer.getGender = sinon.stub();
        proposer.getGender.onFirstCall().returns({})
          .onSecondCall().returns({});

        var target = new MarriageProposal(proposer, proposer);
        result = target.validate();
      });

      it("then the object is invalid", function () {
        result.should.with.lengthOf(1);
      });

      it("then error code 10000 is returned", function () {
        result[0].should.equal("10000");
      });
    });

    describe("when proposing to the same gender", function () {
      var result;
      beforeEach(function () {
        var gender = {};

        var proposer = new PersonConstructorMock();
        proposer.getGender = sinon.stub();
        proposer.getGender.returns(gender);

        var proposedTo = new PersonConstructorMock();
        proposedTo.getGender = sinon.stub();
        proposedTo.getGender.returns(gender);

        var target = new MarriageProposal(proposer, proposedTo);
        result = target.validate();
      });

      it("then the object is invalid", function () {
        result.should.with.lengthOf(1);
      });

      it("then error code 10001 is returned", function () {
        result[0].should.equal("10001");
      });
    });

    describe("when proposing to someone else of the opposite sex", function () {
      var result;
      beforeEach(function () {
        var proposer = new PersonConstructorMock();
        proposer.getGender = sinon.stub();
        proposer.getGender.returns({});

        var proposedTo = new PersonConstructorMock();
        proposedTo.getGender = sinon.stub();
        proposedTo.getGender.returns({});

        var target = new MarriageProposal(proposer, proposedTo);
        result = target.validate();
      });

      it("then the result is a valid proposal", function () {
        result.should.with.lengthOf(0);
      });
    });
  });

  describe("when performing a marriage proposal", function () {
    var target, proposer, proposedTo;
    beforeEach(function () {
      proposer = new PersonConstructorMock();
      proposedTo = new PersonConstructorMock();

      var MarriageProposal = getModule();
      
      target = new MarriageProposal(proposer, proposedTo);
    });

    describe("when the proposal is invalid", function () {
      var execution;
      
      beforeEach(function() {
        var gender = {};
        proposer.getGender = sinon.stub();
        proposer.getGender.returns(gender);
      
        proposedTo.getGender = sinon.stub();
        proposedTo.getGender.returns(gender);
        
        execution = function() { target.performMarriageProposal(); };
      });

      it("then an error is raised", function() {
        execution.should.throwError("Marriage proposal is invalid.");
      });
    });

    describe("when the proposal is valid", function () {
      var personalHistoryResult;
      
      beforeEach(function() {
        proposer.getGender = sinon.stub();
        proposer.getGender.returns({});

        proposedTo.getGender = sinon.stub();
        proposedTo.getGender.returns({});

        personalHistoryProviderMock.searchHistory = sinon.stub();
        personalHistoryProviderMock.searchHistory.returns(personalHistoryResult = {});
        
        proposer.calculatePersonalCompatibility = sinon.stub();
        proposedTo.calculatePersonalCompatibility = sinon.stub();
      });

      describe("when the proposal is rejected", function () {
        var result;
        beforeEach(function() {
          proposer.calculatePersonalCompatibility.returns(40);
          proposedTo.calculatePersonalCompatibility.returns(40);
          
          result = target.performMarriageProposal();
        });

        it("then the filing status is 'Single'", function() {
          result.should.equal("Single");
        });

        it("then the history was retrieved", function() {
          personalHistoryProviderMock.searchHistory.calledWithExactly(proposer, proposedTo)
            .should.equal(true);
        });

        it("then the likelihood of marriage was determined for the proposer", function() {
          proposer.calculatePersonalCompatibility.calledWithExactly(personalHistoryResult)
            .should.equal(true);
        });

        it("then the likelihood of marriage was determined for the proposed to", function() {
          proposedTo.calculatePersonalCompatibility.calledWithExactly(personalHistoryResult)
            .should.equal(true);
        });
      });

      describe("when the proposal is accepted", function () {
        var result;
        beforeEach(function() {
          proposer.calculatePersonalCompatibility.returns(100);
          proposedTo.calculatePersonalCompatibility.returns(100);

          result = target.performMarriageProposal();
        });

        it("then the filing status is 'Married'", function() {
          result.should.equal("Married");
        });

        it("then the history was retrieved", function() {
          personalHistoryProviderMock.searchHistory.calledWithExactly(proposer, proposedTo)
          .should.equal(true);
        });

        it("then the likelihood of marriage was determined for the proposer", function() {
          proposer.calculatePersonalCompatibility.calledWithExactly(personalHistoryResult)
            .should.equal(true);
        });

        it("then the likelihood of marriage was determined for the proposed to", function() {
          proposedTo.calculatePersonalCompatibility.calledWithExactly(personalHistoryResult)
            .should.equal(true);
        });
      });

      describe("when the proposal is a long shot", function () {
        beforeEach(function() {
          longShotCalculatorMock.generateRandomResult = sinon.stub();
        });
        
        describe("when the proposer is really compatible but not the proposed to", function() {
          var result;
          beforeEach(function() {
            proposer.calculatePersonalCompatibility.returns(75);
            proposedTo.calculatePersonalCompatibility.returns(41);
            longShotCalculatorMock.generateRandomResult.returns(49);
            
            result = target.performMarriageProposal();
          });
          
          it("then the result is 'Single'", function() {
            result.should.equal("Single");
          });
          
          it("then the history was retrieved", function() {
            personalHistoryProviderMock.searchHistory.calledWithExactly(proposer, proposedTo)
              .should.equal(true);
          });

          it("then the likelihood of marriage was determined for the proposer", function() {
            proposer.calculatePersonalCompatibility.calledWithExactly(personalHistoryResult)
              .should.equal(true);
          });

          it("then the likelihood of marriage was determined for the proposed to", function() {
            proposedTo.calculatePersonalCompatibility.calledWithExactly(personalHistoryResult)
              .should.equal(true);
          });
          
          it("then the long shot is calculated", function() {
            longShotCalculatorMock.generateRandomResult.calledWithExactly(75, 41)
              .should.equal(true);
          });
        });
        
        describe("when the proposer is not compatible but not the proposed to", function() {
          var result;
          beforeEach(function() {
            proposer.calculatePersonalCompatibility.returns(74);
            proposedTo.calculatePersonalCompatibility.returns(75);
            longShotCalculatorMock.generateRandomResult.returns(50);

            result = target.performMarriageProposal();
          });

          it("then the result is 'Married, filing separately'", function() {
            result.should.equal("Married, filing separately");
          });

          it("then the history was retrieved", function() {
            personalHistoryProviderMock.searchHistory.calledWithExactly(proposer, proposedTo)
              .should.equal(true);
          });

          it("then the likelihood of marriage was determined for the proposer", function() {
            proposer.calculatePersonalCompatibility.calledWithExactly(personalHistoryResult)
              .should.equal(true);
          });

          it("then the likelihood of marriage was determined for the proposed to", function() {
            proposedTo.calculatePersonalCompatibility.calledWithExactly(personalHistoryResult)
              .should.equal(true);
          });

          it("then the long shot is calculated", function() {
            longShotCalculatorMock.generateRandomResult.calledWithExactly(74, 75)
              .should.equal(true);
          });
        });

        describe("when the long shot calculator says YES", function () {
          var result;
          beforeEach(function() {
            proposer.calculatePersonalCompatibility.returns(41);
            proposedTo.calculatePersonalCompatibility.returns(74);

            result = target.performMarriageProposal();
          });
          
          it("then the filing status is 'Married, filing separately'");

          it("then the history was retrieved");

          it("then the likelihood of marriage was determined for the proposer");

          it("then the likelihood of marriage was determined for the proposed to");

          it("then the long shot calculator was determined");
        });

        describe("when the long shot calculator says NO", function () {
          it("then the filing status is 'Single'");

          it("then the history was retrieved");

          it("then the likelihood of marriage was determined for the proposer");

          it("then the likelihood of marriage was determined for the proposed to");

          it("then the long shot calculator was determined");
        });
      });
    });
  });
});