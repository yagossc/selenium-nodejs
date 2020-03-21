//Since every function returns a Promise
//This is a thennable module

//Require selenium web-driver
const webdriver = require('selenium-webdriver');

//Instance webdriver utilities
const By = webdriver.By;
const until = webdriver.until;
const Key = webdriver.Key;
const firefox = require('selenium-webdriver/firefox');

//Defines
const max_wait_time = 20000;

//Require modules/utilities
const delay = require('delay');

// There used to be a logger attached to this project
// and it would be nice to have one
//const logger = require('../util/logger.js');

//Set Firefox Options (ex.: profile, headless, etc>)
const options = new firefox.Options();
// options.setProfile('/path/to/.mozilla/firefox/your_profile');
// options.headless();

//Helper variable
let browser;

/**
@desc Start browser with given url
@params url
@return Promise from get url routine
**/
module.exports.start = function(url)
{
    browser = new webdriver.Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();

    browser.manage().window().maximize();
    return browser.get(url);
}

module.exports.access_url = function(url)
{
    return browser.get(url);
}
/**
@desc Close browser
@params none
@return Promise from close browser routine
*/
module.exports.end = function()
{
    return browser.quit();
}

/**
@desc Close current window
@params none
@return Promise from close window routine
*/
module.exports.close_window = function()
{
    return browser.close();
}

/**
@desc Find element in DOM, given it's locator's type and locator
@params locator type, locator
@return Promise from wait.until.elementLocated(By...)
*/
let find_element = function(type, locator)
{
    if(type == 'name')
        return browser.wait(until.elementLocated(By.name(locator)), max_wait_time);

    else if(type == 'id')
        return browser.wait(until.elementLocated(By.id(locator)), max_wait_time);

    else if(type == 'xpath')
        return browser.wait(until.elementLocated(By.xpath(locator)), max_wait_time);

    else if(type == 'class')
        return browser.wait(until.elementLocated(By.className(locator)), max_wait_time);

}

/**
@desc Wait until given element is visible
@params return value of find_element
@return Promise from wait.until.elementIsVisible
*/
let wait_until_visible = function(element)
{
    return browser.wait(until.elementIsVisible(element), max_wait_time);
}

/**
@desc Click on specified element
@params locator's type, locator
@return Promise chain find_element->wait_until_visible->element.click()
*/
module.exports.click_on = function(type, locator)
{
    return find_element(type, locator).
    then(
    function(element){
        return wait_until_visible(element);
    },
    function(err){
        console.log("ERROR: " + err);
    }).
    then(function(element){
        return element.click();
    },
    function(err){
        console.log("ERROR: " + err);
    });
}

/**
@desc Types in specified element, after clearing it or not
@params locator's type, locator, clear bool, string to type
@return Promise chain: find_element->element.sendKeys(string)
*/
module.exports.type_into = function(type, locator, clear, string)
{
    return find_element(type, locator).
    then(
    function(element){
        if(clear){
            return element.clear().
            then(
            function(cleared){
                return element.sendKeys(string);
            },
            function(err){
                console.log("ERROR: " + err);
            });
        }
        else
            return element.sendKeys(string);
    },
    function(err){
        console.log("ERROR: " + err);
    });
}


/**
@desc Send command key
@params locator's type, locator, command
@return Promise chain: find_element->element.sendKeys(Key.CMD)
*/
module.exports.send_command_key = function(type, locator, command)
{
    return find_element(type, locator).
    then(
    function(element){
        if(command == 'RETURN')
            return element.sendKeys(Key.RETURN);
        else if(command == 'BACK_SPACE')
            return element.sendKeys(Key.BACK_SPACE);
    },
    function(err){
        console.log("ERROR: " + err);
    });
}

/**
@desc Get element's text
@params locator's type, locator
@return Promise chain: find_element->wait_until_visible->getText()
*/
module.exports.get_text = function(type, locator)
{
    return find_element(type, locator).
    then(
    function(element){
        return wait_until_visible(element);
    },
    function(err){
        console.log("ERROR: " + err);
    }).
    then(
    function(element){
        return element.getText();
    },
    function(err){
        console.log("ERROR: " + err);
    });
}

module.exports.execute_script = function(script)
{
    return browser.executeScript(script);
}
