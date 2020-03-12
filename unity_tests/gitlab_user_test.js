//Instance of gitlab user helper
const gitlab_user = require('../helpers/examples/gitlab_user.js');

//Instance o browser helper
const browser = require('../helpers/browser.js');

const delay = require('delay');

//Login information Enum
const login_info = gitlab_user.login_enum();

//Gitlab url
const url = 'http://gitlab.com';


module.exports.perform_test_case_1 = function()
{
//Sign in
    return browser.start(url).
    then(
    function(connection_sucessful){
        return gitlab_user.sign_in(login_info.user1, browser);
    },
    function(err){
        console.log("ERROR: " + err);
    }).
    then(
    function(sucess){
        return delay(3000);
    },
    function(err){
        console.log("ERROR: " + err);
    }).
    then(
    function(sucess){ //Sign out
        return gitlab_user.sign_out(browser);
    },
    function(err){
        console.log("ERROR: " + err);
    }).
    then(
    function(sucess){
        return delay(3000);
    },
    function(err){
        console.log("ERROR: " + err);
    }).
    then(
    function(sucess){ //End session
        console.log("Closing.");
        return browser.end();
    },
    function(err){
        console.log("ERROR: " + err);
    });
}
