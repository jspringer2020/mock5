describe("MarriageProposal", function () {

  var baseDirectory = "./../../";
  var proxyquire = require("proxyquire");
  var chance = require("chance")();
  var sinon = require("sinon");

  var personConstructorMock, personConstructorResultMock;
  
  personConstructorResultMock = { person: null };
  personConstructorMock = sinon.stub();
  personConstructorMock.returns(personConstructorResultMock.person);
  
  var mocks = {
    "src/Person": personConstructorMock
  };

  function getModule() {
    var mod = proxyquire(baseDirectory + "src/MarriageProposal", mocks);
    return mod;
  }

  describe("when creating a new marriage proposal", function () {
    var MarriageProposal;

    beforeEach(function () {
      MarriageProposal = getModule();
      var cool = new MarriageProposal();
      console.log(cool);
    });
    
    describe("when invalid parameters are used", function() {
      
      describe("when the proposing person is invalid", function() {
        
        describe("when person is missing", function() {
          
          it("then an error is raised during construction");
        });
        
        describe("when person is not a Person", function() {
          
          it("then an error is raised during construction");
        });
      });

      describe("when the proposed to person is invalid", function() {
        
        describe("when person is missing", function() {
          
          it("then an error is raised during construction");
        });
        
        describe("when person is not a Person", function() {
          
          it("then an error is raised during construction");
        });
      });
    });
    
    describe("when the object is constructed successful", function() {
      
      it("then the instance is not null");
      
      it("then the instance's properties are set");
    });
  });
  
  describe("when validating the proposal", function() {
    
    describe("when proposing to 'myself'", function() {
      
      it("then error code 10000 is returned");
    });
    
    describe("when proposing to the same gender", function() {
      
      it("then error code 10001 is returned");
    });
    
    describe("when proposing to someone else of the opposite sex", function() {
      
      it("then the result is a valid proposal");
    });
  });
  
  describe("when performing a marriage proposal", function() {
    
    describe("when the proposal is rejected", function() {
      
      it("then the filing status is 'Single'");
      
      it("then the history was retrieved");
      
      it("then the likelihood of marriage was determined for the proposer");
      
      it("then the likelihood of marriage was determined for the proposed to");
    });

    describe("when the proposal is accepted", function() {
      
      it("then the filing status is 'Single'");
      
      it("then the history was retrieved");
      
      it("then the likelihood of marriage was determined for the proposer");
      
      it("then the likelihood of marriage was determined for the proposed to");
    });

    describe("when the proposal is 50%", function() {
      
      describe("when the long shot calculator says YES", function() {
        it("then the filing status is 'Married, filing separately'");

        it("then the history was retrieved");

        it("then the likelihood of marriage was determined for the proposer");

        it("then the likelihood of marriage was determined for the proposed to");

        it("then the long shot calculator was determined");
      });
      
      describe("when the long shot calculator says NO", function() {
        it("then the filing status is 'Single'");

        it("then the history was retrieved");

        it("then the likelihood of marriage was determined for the proposer");

        it("then the likelihood of marriage was determined for the proposed to");

        it("then the long shot calculator was determined");
      });
    });
  });
});