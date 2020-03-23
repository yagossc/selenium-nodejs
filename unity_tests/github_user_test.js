//Instance of gitlab user helper
const github_user = require('../helpers/examples/github/github_user.js');

//Instance o browser helper
const browser = require('../helpers/browser.js');

const delay = require('delay');

//Login information Enum
const login_info = github_user.login_enum();

const url = 'https://github.com/login'

// The test case consists of:
// 1) Sing in;
// 2) Go to profile page;
// 3) Sing out;
module.exports.perform_test_case = function()
{
    //1) Sign in
    return browser.start(url).
        then(
            function(connection_sucessful){
                return github_user.sign_in(login_info.user, browser);
            },
            function(connection_error){
                console.log("ERROR: ", connection_error);
            }
        ). //2) Go to Profile
        then(
            function(sucess){
                return github_user.go_to_profile(browser)
            },
            function(err){
                console.log("ERROR: Couldn't click on dropdown menu item", err);
            }
        ). // Stop for 3 seconds
        then(
            function(sucess){
                return delay(3000)
            },
            function(err){
                console.log("ERROR: ", err);
            }
        ).
        then(
            function(sucess){
                return browser.end();
            },
            function(err){
                console.log("ERROR: ", err);
            }
        )
}
