describe("Person", function() {
  
  var baseDirectory = "./../../";
  var proxyquire = require("proxyquire");
  var chance = require("chance")();
//  var sinon = require("sinon");
//  var should = require("should");

  var mocks = {};
  
  function getModule() {
    var mod = proxyquire(baseDirectory + "src/Person", mocks);
    return mod;
  }
  
  describe("when creating a new person", function() {
    var Person;
    
    beforeEach(function() {
      Person = getModule();
    });
    
    describe("when the name is not valid", function() {
      var construction;

      describe("when the name is not supplied", function() {
        beforeEach(function() {
          construction = function() {
            return new Person(true);
          };
        });

        it("then an error is thrown", function() {
          construction.should.throwError();
        });
      });

      describe("when the name is not a string", function() {
        beforeEach(function() {
          construction = function() {
            return new Person(true, chance.integer());
          };
        });

        it("then an error is thrown", function() {
          construction.should.throwError();
        });
      });
    });
    
    describe("when the gender is not supplied", function() {
      var construction;

      beforeEach(function() {
        construction = function() {
          return new Person();
        };
      });
      
      it("then an error is thrown", function() {
        construction.should.throwError();
      });
    });
    
    describe("when all required parameters are passed", function() {
      var result, name;
      
      describe("when its a male", function() {
        beforeEach(function() {
          name = chance.string();
          result = new Person(true, name);
        });
        
        it("then the object is created", function() {
          result.should.be.ok
            .and.be.an.instanceOf(Person);
        });

        it("then the gender is MALE", function() {
          result.getGender().should.have.properties({
            _displayName: "Male",
            _isMale: true
          });
        });

        it("then the name is set", function() {
          result.getName().should.equal(name);
        });
      });

      describe("when its a female", function() {
        beforeEach(function() {
          name = chance.string();
          result = new Person(false, name);
        });
        
        it("then the object is created", function() {
          result.should.be.ok
            .and.be.an.instanceOf(Person);
        });

        it("then the gender is MALE", function() {
          result.getGender().should.have.properties({
            _displayName: "Female",
            _isMale: false
          });
        });

        it("then the name is set", function() {
          result.getName().should.equal(name);
        });
      });
    });
  });
  
  describe("when retrieving the gender of a person", function() {
    var Person;

    beforeEach(function() {
      Person = getModule();
    });

    describe("when the gender is MALE", function() {
      var result;
      
      beforeEach(function() {
        var target = new Person(true, chance.string());
        result = target.getGender();
      });
      
      it("then the result is MALE", function() {
        result.should.have.properties({
          _isMale: true,
          _displayName: "Male"
        });
      });
    });
    
    describe("when the gender is FEMALE", function() {
      var result;
      
      beforeEach(function() {
        var target = new Person(false, chance.string());
        result = target.getGender();
      });
      
      it("then the result is FEMALE", function() {
        result.should.have.properties({
          _isMale: false,
          _displayName: "Female"
        });
      });
    });
  });
  
  describe("when retrieving the name of a person", function() {
    var name, result;
    
    beforeEach(function() {
      name = chance.string();
      
      var Person, target;
      Person = getModule();
      target = new Person(chance.bool(), name);
      
      result = target.getName();
    });
    
    it("then the name matches", function() {
      result.should.equal(name);
    });
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