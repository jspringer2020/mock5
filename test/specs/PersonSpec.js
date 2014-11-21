describe("Person", function () {

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

  describe("when creating a new person", function () {
    var Person;

    beforeEach(function () {
      Person = getModule();
    });

    describe("when the name is not valid", function () {
      var construction;

      describe("when the name is not supplied", function () {
        beforeEach(function () {
          construction = function () {
            return new Person(true);
          };
        });

        it("then an error is thrown", function () {
          construction.should.throwError();
        });
      });

      describe("when the name is not a string", function () {
        beforeEach(function () {
          construction = function () {
            return new Person(true, chance.integer());
          };
        });

        it("then an error is thrown", function () {
          construction.should.throwError();
        });
      });
    });

    describe("when the gender is not supplied", function () {
      var construction;

      beforeEach(function () {
        construction = function () {
          return new Person();
        };
      });

      it("then an error is thrown", function () {
        construction.should.throwError();
      });
    });

    describe("when all required parameters are passed", function () {
      var result, name;

      describe("when its a male", function () {
        beforeEach(function () {
          name = chance.string();
          result = new Person(true, name);
        });

        it("then the object is created", function () {
          result.should.be.ok
            .and.be.an.instanceOf(Person);
        });

        it("then the gender is MALE", function () {
          result.getGender().should.have.properties({
            _displayName: "Male",
            _isMale: true
          });
        });

        it("then the name is set", function () {
          result.getName().should.equal(name);
        });
      });

      describe("when its a female", function () {
        beforeEach(function () {
          name = chance.string();
          result = new Person(false, name);
        });

        it("then the object is created", function () {
          result.should.be.ok
            .and.be.an.instanceOf(Person);
        });

        it("then the gender is MALE", function () {
          result.getGender().should.have.properties({
            _displayName: "Female",
            _isMale: false
          });
        });

        it("then the name is set", function () {
          result.getName().should.equal(name);
        });
      });
    });
  });

  describe("when retrieving the gender of a person", function () {
    var Person;

    beforeEach(function () {
      Person = getModule();
    });

    describe("when the gender is MALE", function () {
      var result;

      beforeEach(function () {
        var target = new Person(true, chance.string());
        result = target.getGender();
      });

      it("then the result is MALE", function () {
        result.should.have.properties({
          _isMale: true,
          _displayName: "Male"
        });
      });
      
      describe("when checking if its male", function() {
        var isMale;
        beforeEach(function() {
          isMale = result.getIsMale();
        });
        
        it("then its a male", function() {
          isMale.should.be.ok
            .and.an.instanceOf(Boolean);
        });
      });
      
      describe("when getting the display", function() {
        var display;
        beforeEach(function() {
          display = result.getDisplayName();
        });
        
        it("then its MALE", function() {
          display.should.equal("Male");
        });
      });
    });

    describe("when the gender is FEMALE", function () {
      var result;

      beforeEach(function () {
        var target = new Person(false, chance.string());
        result = target.getGender();
      });

      it("then the result is FEMALE", function () {
        result.should.have.properties({
          _isMale: false,
          _displayName: "Female"
        });
      });

      describe("when checking if its male", function() {
        var isMale;
        beforeEach(function() {
          isMale = result.getIsMale();
        });

        it("then its a male", function() {
          isMale.should.not.be.ok
            .and.an.instanceOf(Boolean);
        });
      });

      describe("when getting the display", function() {
        var display;
        beforeEach(function() {
          display = result.getDisplayName();
        });

        it("then its Female", function() {
          display.should.equal("Female");
        });
      });
    });
  });

  describe("when retrieving the name of a person", function () {
    var name, result;

    beforeEach(function () {
      name = chance.string();

      var Person, target;
      Person = getModule();
      target = new Person(chance.bool(), name);

      result = target.getName();
    });

    it("then the name matches", function () { 
      result.should.equal(name);
    });
  });

  describe("when calculating personal compatibility", function () {
    var Person, target;
    
    beforeEach(function() {
      Person = getModule();
      
      target = new Person(true, chance.string());
    });

    describe("when invalid parameters are used", function() {
      describe("when the other person is not a Person", function () {
        var delegate;
        beforeEach(function() {
          delegate = function() {
            return target.calculatePersonalCompatibility({});
          };
        });

        it("then an error is raised", function() {
          delegate.should.throwError();
        });
      });
      
      describe("when the personal history is not an Array", function() {
        var delegate;
        beforeEach(function() {
          delegate = function() {
            return target.calculatePersonalCompatibility(new Person(true, chance.string()), {});
          };
        });

        it("then an error is raised", function() {
          delegate.should.throwError();
        });
      });
    });

    describe("when the personal history is missing", function () {
      var result;
      beforeEach(function() {
        result = target.calculatePersonalCompatibility();
      });

      it("then the result is 0", function() {
        result.should.equal(0);
      });
    });

    describe("when there is no personal history", function () {
      var result;
      beforeEach(function() {
        result = target.calculatePersonalCompatibility([]);
      });

      it("then the result is 0", function() {
        result.should.equal(0);
      });
    });

    describe("when there is personal history", function () {
      var personalHistories;
      
      function createPersonalHistory(person, enjoymentLevel) {
        return {
          wasIncludedInHistory: function(me) {
            return me === person;
          },
          getEnjoymentLevel: function() {
            return enjoymentLevel;
          }
        };
      }
      
      beforeEach(function() {
        personalHistories = [];
      });

      describe("when the history results in a 100 response", function () {
        var result;
        
        beforeEach(function() {
          var x, events = chance.integer({ min: 5, max: 20 });
          
          for (x = 0; x < events; x++) {
            personalHistories.push(createPersonalHistory(target, 100));
          }
          
          result = target.calculatePersonalCompatibility(personalHistories);
        });

        it("then the result is 100", function() {
          result.should.equal(100);
        });
        
        describe("when an amazing event is added to the history", function() {
          beforeEach(function() {
            personalHistories.push(createPersonalHistory(target, 100 * 5));
            result = target.calculatePersonalCompatibility(personalHistories);
          });

          it("then the result is 100", function() {
            result.should.equal(100);
          });
          
          describe("when a terrible event occurred without the person", function() {
            beforeEach(function() {
              personalHistories.push(createPersonalHistory({}, 100 * -5));
              result = target.calculatePersonalCompatibility(personalHistories);
            });

            it("then the result is 100", function() {
              result.should.equal(100);
            });
          });
        });
      });

      describe("when the history results in a 75 response", function () {
        var result;
        
        beforeEach(function() {
          personalHistories.push(createPersonalHistory(target, 100));
          personalHistories.push(createPersonalHistory(target, 50));
          personalHistories.push(createPersonalHistory(target, 75));
          personalHistories.push(createPersonalHistory(target, 75));
          result = target.calculatePersonalCompatibility(personalHistories);
        });

        it("then the result is 75", function() {
          result.should.equal(75);
        });
      });

      describe("when the history results in a 35 response", function () {
        var result;

        beforeEach(function() {
          personalHistories.push(createPersonalHistory(target, 50));
          personalHistories.push(createPersonalHistory(target, 20));
          personalHistories.push(createPersonalHistory(target, 35));
          result = target.calculatePersonalCompatibility(personalHistories);
        });
        
        it("then the result is 35", function() {
          result.should.equal(35);
        });
      });

      describe("when the history results in a 0 response", function () {
        var result;
        beforeEach(function() {
          var x, count = chance.integer({ min: 10, max: 50 });
          for (x = 0; x < count; x++) {
            personalHistories.push(createPersonalHistory(target, (10 + x)));
            personalHistories.push(createPersonalHistory(target, -1 * (10 + x)));
          }
          
          result = target.calculatePersonalCompatibility(personalHistories);
        });

        it("then the result is 0", function() {
          result.should.equal(0);
        });
        
        describe("when all history is bad leading to a negative total", function () {
          beforeEach(function() {
            personalHistories.push(createPersonalHistory(target, -1500));
            result = target.calculatePersonalCompatibility(personalHistories);
          });
          
          it("then the result is 0", function() {
            result.should.equal(0);
          });
        });
      });
    });
  });
});