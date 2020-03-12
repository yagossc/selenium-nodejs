const test_performer = require('./gitlab_user_test.js');

test_performer.perform_test_case_1().
then(
function(sucess){
	console.log("Test case 1 performed successfully.");
},
function(err){
	console.log("ERROR: " + err);
});
