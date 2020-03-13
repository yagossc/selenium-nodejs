SELENIUM PROJECT
=================
The code presented here is based on the web-driver available at:

https://github.com/SeleniumHQ/selenium/tree/master/javascript/node/selenium-webdriver


USAGE
=================
The main idea of this project is to narrow the distance between what
is read in the test case listing and the actual code that performs the
testing. Let's pretend a valid test case would be to login to one's
github account, visit one's own profile page and logout, as listed:
```
1) Login
2) Access profile
3) Logout
```
Which, in a lower level description should look something like:
```
1) Login
  1.1: Request to https://www.github.com/login
  1.2: Click on user name form field
  1.3: Type in user name
  1.4: Click on password form field
  1.5: Type in password
  1.6: Click on submit || Hit 'return'
2) Acess profile
  2.1: Click on drop down menu
  2.2: Click on profile link
3) Logout
  3.1: Click on logout button
```
And, finally, regarding the code, if all was correctly
understood and done properly, things should pretty much look the same:
```
// Higher level functions
longin(user_info).
then(
    return access_profile();
).
then(
    return logout();
)
```
And the lower level:
```
login = function(user_info)
{
    return driver.click_on(identifier_type, login_form).
    then(
        return driver.type_into(login_form, user_name);
    ).
    then(
        return driver.click_on(identifier_type, password_form);
    )
    ...
}
...
access_profile = function()
{
    return driver.click_on(identifier_type, drop_down).
    then(
        return driver.click_on(identifier_type, profile_link);
    )
    ...
}
...
logout = function()
{
    return driver.click_on(identifier_type, logout_link)
    ...
}
```
There are some more examples in `~/helpers/examples` and `~/unity_tests`, check that out.
