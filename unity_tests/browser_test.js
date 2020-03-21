//Instanciate browser helper
const browser = require('../helpers/browser.js');

const delay = require('delay');

//Desired URL
const url = 'http://www.google.com.br';

let init_connection = function(url){
    return browser.start(url);
}

let end_tests = function(){
    return browser.end();
}

//Do test routine
init_connection(url).
then(
function(conected){
    return browser.type_into('name', 'q', false, 'love');
    },
function(err){
    console.log("ERROR: "+ err);
}).
then(
function(sucess){
    return browser.send_command_key('name', 'q', 'RETURN');
},
function(err)
{
    console.log("ERROR: " + err);
}).
then(
function(sucess){
    return delay(3000);
},
function(err){
}).
then(
function(sucess){
    return browser.execute_script("document.getElementById('logo').setAttribute('title', 'working thing')");
    console.log("Query sucessful!");
},
function(err){
    console.log("ERROR: "+ err);
}).
/*then(
function(sucess){
    return end_tests();
},
function(err){
    console.log("ERROR: " + err);
}).*/
then(
function(sucess){
    console.log("Ending tests.");
},
function(err){
    console.log("ERROR: "+ err);
});
