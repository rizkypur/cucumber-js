const { Given, When, Then, AfterAll, BeforeAll, Before } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

var {setDefaultTimeout} = require('@cucumber/cucumber');
const { build } = require('protobufjs');
const { after } = require('lodash');
setDefaultTimeout(60 * 1000);


require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

BeforeAll(async function () {
  await driver.manage().window().maximize();
}); 

Given('I am accesing tanihub website', async function () {
    await driver.get('http://tanihub.com');
});

When('I click Jabodetabek for Area Pengiriman', async function () {
    const element = await driver.findElement(By.xpath("//input[@name='radio-desktop']"));
    element.click();
});

Then('the page title should be Majukan Perekonomian Lokal | TaniHub', async function () {
     const title = await driver.getTitle();
    // const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
     expect(title).to.equal('Majukan Perekonomian Lokal | TaniHub');
});


  AfterAll(async function () {
    await driver.quit();
  });  