var Person = require("./src/libs/Person");
var MarriageProposal = require("./src/libs/MarriageProposal");

var me = new Person(true, "Me");
var girlfriend = new Person(false, "Girlfriend");

var proposal = new MarriageProposal(me, girlfriend);

console.log("\n\n\n\n");
console.log("APPLICATION STARTING...");
console.log("\n\n");
console.log("Will you, " + girlfriend.getName() + " marry me (" + me.getName() + ")");

try {
  console.log("\n\n");
  console.log(" -- Proposal starting");
  
  var proposalResult = proposal.performMarriageProposal();
  
  console.log("\n\n");
  console.log("You should not get here because the application should error");
}
catch (err) {
  console.log("\n\n\n\n");
  console.log("UH OHS!!!!!");
  console.log(err.message);
}

console.log("\n\n\n\n");
console.log("Application Ended...");