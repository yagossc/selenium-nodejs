const test_performer = require('./github_user_test.js');

test_performer.perform_test_case().
then(
function(sucess){
    console.log("Test case performed successfully.");
},
function(err){
    console.log("ERROR: " + err);
});
