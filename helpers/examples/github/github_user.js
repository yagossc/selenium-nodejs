module.exports.login_enum = function()
{
    let login_info = {
        //insert desired login info here
        user:
        {
            name : "Enter your user name",
            password : "Enter your password"
        },

    };
    return login_info;
}

module.exports.sign_in = function(user, driver)
{
    return driver.type_into('id', 'login_field', true, user.name).
        then(
            function(sucess){
                return driver.type_into('id', 'password', true, user.password);
            },
            function(err){
                console.log("ERROR: ", err);
            }
        ).
        then(
            function(sucess){
                return driver.click_on('name', 'commit');
            },
            function(err){
                console.log("ERROR: ", err);
            }
        );
}
