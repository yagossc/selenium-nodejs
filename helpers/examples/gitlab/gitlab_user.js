module.exports.login_enum = function()
{
	let login_info = {
		//insert new user login info here
		user1 :
		{
			name : "Enter your user name",
			password : "Enter your password"
		}
	};
	return login_info;
}

module.exports.sign_in = function(user, driver)
{
	return driver.click_on('class', 'sign-in-up-btn is-last').
	then(
	function(sucess){
		return driver.type_into('id', 'user_login', true, user.name);
	},
	function(err){
		console.log("ERROR: " + err);
	}).
	then(
	function(sucess){
		return driver.type_into('id', 'user_password', true, user.password);
	},
	function(err){
		console.log("ERROR: " + err);
	}).
	then(
	function(sucess){
		return driver.send_command_key('id', 'user_password', 'RETURN');
	},
	function(err){
		console.log("ERROR: " + err);
	});
}


module.exports.sign_out = function(driver)
{
	return driver.access_url('https://gitlab.com/users/sign_out');
}
