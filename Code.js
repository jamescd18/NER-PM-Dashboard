/*
Document: Main JS code

*/


function doGet(request) {
    return HtmlService.createTemplateFromFile('Index').evaluate();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function testFunc() {
    throw "example error";
}