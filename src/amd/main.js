/* globals window */
define([
  "jquery",
  "amd/Person",
  "amd/MarriageProposal"
], function ($, Person, MarriageProposal) {
  'use strict';
  
  function errorHandler() {
    console.log("Something bad happened", arguments);
    alert("Uh ohhss...");
    
    return false;
  }
  
  function handleSubmit() {
    var proposerInput = $('input.proposer'),
        proposedToInput = $('input.proposedTo'),
        proposer,
        proposedTo,
        marriageProposal;
    
    if (proposerInput.val().trim() && proposedToInput.val().trim()) {
      proposer = new Person(true, proposerInput.val().trim());
      proposedTo = new Person(false, proposedToInput.val().trim());
      
      marriageProposal = new MarriageProposal(proposer, proposedTo);
      
      if (confirm("Are you sure you want to propose?")) {
        console.log("Attempting proposal", { marriageProposal: marriageProposal });

        marriageProposal.performMarriageProposal();
        
        console.log("This is a fail, there should have been an error....");
      }
    }
    else {
      alert("Missing something...try again...");
    }
  }
  
  var $body = $("body");
  var $proposerDIV = $('<div>')
    .append($('<span class="label">Proposer (Male)</span><span class="input"><input type="text" class="proposer" /></span>'))
    .append($('<span class="label">Proposed To (Female)</span><span class="input"><input type="text" class="proposedTo" /></span>'))
    .append($('<button class="submit">Propose Marriage</button>').click(handleSubmit));
  
  $body.append($proposerDIV);
  window.onerror = errorHandler;
});
