var Person = require("./src/libs/Person");
var MarriageProposal = require("./src/libs/MarriageProposal");

var me = new Person(true, "Me");
var girlfriend = new Person(false, "Girlfriend");

var proposal = new MarriageProposal(me, girlfriend);

console.log("Will you, " + girlfriend.getName() + " marry me (" + me.getName() + ")");

try {
  var proposalResult = proposal.performMarriageProposal();
  console.log("You should not get here because the application should error");
}
catch (err) {
  console.log(err.message);
}
