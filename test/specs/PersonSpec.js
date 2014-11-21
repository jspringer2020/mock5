describe("Person", function() {
  //var proxyquire = require("proxyquire");
  //var sinon = require("sinon");
  //var should = require("should");

  
  describe("when creating a new person", function() {
    
    describe("when the name is not supplied", function() {
      
      it("then an error is thrown");
    });
    
    describe("when the gender is not supplied", function() {
      
      it("then an error is thrown");
    });
    
    describe("when all required parameters are passed", function() {
      
      it("then the object is created");
      
      it("then the gender is set");
      
      it("then the name is set");
    });
  });
  
  describe("when retrieving the gender of a person", function() {
    
    describe("when the gender is MALE", function() {
      
      it("then the result is MALE");
    });
    
    describe("when the gender is FEMALE", function() {
      
      it("then the result is FEMALE");
    });
  });
  
  describe("when retrieving the name of a person", function() {
    
    it("then the name matches");
  });
  
  describe("when determining the marriage proposal response", function() {
    
    describe("when no other person is supplied", function() {
      
      it("then an error is raised");
    });
    
    describe("when no history service provider is supplied", function() {
      
      it("then an error is raised");
    });
    
    describe("when the marriage proposal isn't valid", function() {
      
      it("then an error is raised");
    });
    
    describe("when the marriage proposal is valid", function() {
      
      describe("when there is no personal history", function() {
        
        it("then the result is 0");
        
        it("then the history service provider was searched");
      });
      
      describe("when there is personal history", function() {
        
        describe("when the history results in a 100 response", function() {
          
          it("then the result is 100");
          
          it("then the history service provider was searched");
        });
        
        describe("when the history results in a 75 response", function() {
          
          it("then the result is 75");
          
          it("then the history service provider was searched");
        });
        
        describe("when the history results in a 35 response", function() {
          
          it("then the result is 35");
          
          it("then the history service provider was searched");
        });
        
        describe("when the history results in a 0 response", function() {
          
          describe("when all history is bad leading to a negative total", function() {
            
            it("then the result is 0");

            it("then the history service provider was searched");
          });
          
          describe("when history results in a 0 response", function() {
            
            it("then the result is 0");

            it("then the history service provider was searched");
          });
        });
      });
    });
  });
});