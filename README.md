mock5
=====

Helper library containing an example application that will show the power of using Stubs, Spies and dependency mocking.



###**Installation Instructions**###
* Prerequisites for installation are [nodeJS](http://nodejs.org/download/) and [Grunt](http://gruntjs.com/getting-started)
* Clone this repository `git clone https://github.com/jspringer2020/mock5.git`
* Install the dependencies `npm install`
* Run the unit tests
  * There are several grunt steps you can execute for testing
  * `npm test` will run all the tests and execute code coverage
* Run the application
  * NodeJS `node index.js`
  * AMD `grunt connect:appRunner`
  * `npm start` will execute both the node and RequireJS applications
* Watch the video on mocking ***(Coming Soon)***


###**Lightining Talk Synopsis**###
What would happen if we used real human beings for testing automobile crashes? What is the likelihood that someone
will reject a marriage proposal -- yet, statistically its a 50/50 chance. 

Gathering information during testing is crucial, hence the use of mock humans called Crash Test Dummies. Also, knowing
the exact outcome of a logical fork is also critical - Yes, you actually need to test the positive and negative response 
of a marriage proposal.

As developers, we need to "control our own testing destiny," and in many cases, that means that we must use dependency overrides
only during our unit testing. This means forcing the code to go down as many logical paths as possible -- in other words, both 
sides of an IF statement. The goal of unit tests are to aid increase our confidence that our code is accurate. So testing many, 
if not all, cases is critical. That means controlling inputs and outputs.

By using stubs and mocks, we can force a depency to respond a certain way which can drive our actual testing. You can have the 
"counterparty" respond both YES and NO in our marriage proposal. You may also have long running methods that you don't want
to wait for during testing (especially if they are called over and over again). In both cases, you will want to "override" 
the dependency with a stub or mock.

After utilizing a controlled set of code with a stub or mock, you want to examine all the details about it as possible. Using
our crash test dummy example, they are full of sensors and such gather large quantities of data. A Spy is similar, gather method
usage statistics about your code, while potentially not changing the execution.

By utilizing stubs, mocks and spies, you can have significantly more control over your unit tests which will allow you to have
much more of your code actually covered in a test, which of course leads to a hightened level of confidence.

###**The Hope**###
By providing a few examples, and watching the video, you will take it upon yourself to start owning your own destiny and 
mocking your dependencies so that you have more control over them which will increase your testing coverage which of course
leads to a better application with fewer bugs.
