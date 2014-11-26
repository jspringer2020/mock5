/* globals window */
define([
  "jquery",
  "amd/Person",
  "amd/MarriageProposal"
], function ($, Person, MarriageProposal) {
  'use strict';
  
  function errorHandler(message) {
    writeLog("<b><font color=red>UH OHS!!!<br />" + message + "</font></b>");
    return false;
  }
  
  function writeLog(message) {
    $('ul').append('<li><span>' + message + '</span></li>');
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
      
      writeLog("Will you, " + proposedTo.getName() + " marry me (" + proposer.getName() + ")");
      
      marriageProposal = new MarriageProposal(proposer, proposedTo);
      
      if (confirm("Are you sure you want to propose?")) {
        writeLog(" -- Proposal starting");

        marriageProposal.performMarriageProposal();
        
        writeLog("You should not get here because the application should error");
      }
    }
    else {
      writeLog("Missing something...try again...");
    }
  }
  
  var $body = $("body");
  var $proposerDIV = $('<div>')
    .append($('<span class="label">Proposer (Male)</span><span class="input"><input type="text" class="proposer" /></span>'))
    .append($('<span class="label">Proposed To (Female)</span><span class="input"><input type="text" class="proposedTo" /></span>'))
    .append($('<button class="submit">Propose Marriage</button>').click(handleSubmit))
    .append($('<ul>Activity Log</ul>'));
  
  $body.append($proposerDIV);
  window.onerror = errorHandler;
  
  writeLog("APPLICATION STARTING...");
});
