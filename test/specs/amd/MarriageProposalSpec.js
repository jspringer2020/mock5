/* globals chance */
define(["Squire", "jquery"], function (Squire, $) {
  'use strict';

  describe("MarriageProposal", function () {
    var injector, Person;
    
    beforeEach(function() {
      injector = new Squire();

      Person = function () {};
      Person.prototype.sillyGoose = function sillyGoose() {};
      injector.mock("amd/Person", Person);
    });


    function getModule(promise) {
      injector.require(["amd/MarriageProposal"], function(Constructor) {
        promise.resolve(Constructor);
      });
      
      return promise;
    }

    describe("when creating a new marriage proposal", function () {
      var MarriageProposal;

      beforeEach(function () {
        var promise = $.Deferred();
        getModule(promise)
          .then(function(Constructor) {
            MarriageProposal = Constructor;
          });
        
        return promise;
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
            proposer = new Person();
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
          proposedTo = new Person();
          proposer = new Person();

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

    describe("when performing a marriage proposal", function () {
      var target, proposer, proposedTo;
      beforeEach(function () {
        proposer = new Person();
        proposedTo = new Person();
        
        proposer.calculatePersonalCompatibility = sinon.stub();
        proposedTo.calculatePersonalCompatibility = sinon.stub();

        var promise = $.Deferred();
        getModule(promise)
          .then(function(MarriageProposal) {
            target = new MarriageProposal(proposer, proposedTo);
          });

        return promise;
      });

        describe("when the proposer is not compatible", function () {
          var result;
          beforeEach(function () {
            proposer.calculatePersonalCompatibility.withArgs(proposedTo).returns(74);
            proposedTo.calculatePersonalCompatibility.withArgs(proposer).returns(75);

            result = target.performMarriageProposal();
          });

          it("then the filing status is 'Single'", function () {
            result.should.equal("Single");
          });

          it("then the likelihood of marriage was determined for the proposer", function () {
            proposer.calculatePersonalCompatibility.calledWithExactly(proposedTo)
              .should.equal(true);
          });

          it("then the likelihood of marriage was determined for the proposed to", function () {
            proposedTo.calculatePersonalCompatibility.calledWithExactly(proposer)
              .should.equal(true);
          });
        });

        describe("when the proposed To is not compatible", function () {
          var result;
          beforeEach(function () {
            proposer.calculatePersonalCompatibility.returns(chance.integer({min: 75, max: 100}));
            proposedTo.calculatePersonalCompatibility.returns(chance.integer({min: 0, max: 74}));

            result = target.performMarriageProposal();
          });

          it("then the filing status is 'Single'", function () {
            result.should.equal("Single");
          });

          it("then the likelihood of marriage was determined for the proposer", function () {
            proposer.calculatePersonalCompatibility.called
              .should.equal(true);
          });
          
          it("then the likelihood for the proposer used the proposedTo", function() {
            proposer.calculatePersonalCompatibility.getCall(0).args[0]
              .should.equal(proposedTo);
          });

          it("then the likelihood of marriage was determined for the proposed to", function () {
            proposedTo.calculatePersonalCompatibility.calledWithExactly(proposer)
              .should.equal(true);
          });
        });

        describe("when the proposer & proposed to are compatible", function () {
          var result;
          beforeEach(function () {
            proposer.calculatePersonalCompatibility.withArgs(proposedTo)
              .returns(chance.integer({min: 75, max: 100}));
            proposedTo.calculatePersonalCompatibility.withArgs(proposer)
              .returns(chance.integer({min: 75, max: 100}));

            result = target.performMarriageProposal();
          });

          it("then the filing status is 'Married'", function () {
            result.should.equal("Married");
          });

          it("then the likelihood of marriage was determined for the proposer", function () {
            proposer.calculatePersonalCompatibility.callCount
              .should.equal(1);
          });

          it("then the likelihood of marriage was determined for the proposed to", function () {
            proposedTo.calculatePersonalCompatibility.calledOnce
              .should.equal(true);
          });
        });
    });
  });
});