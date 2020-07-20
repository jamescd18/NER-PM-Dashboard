/*
Document: Main JS code

*/

var scriptProps = PropertiesService.getScriptProperties(); // Google apps script properties

// doGet : HttpsRequest -> HTML
// Serve up the website HTML from Index.html
function doGet(request) {
    return HtmlService.createTemplateFromFile('Index').evaluate();
}

// include : String -> HTML
// Serve HTML content from the file specified by the string file name
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// testFunc : n/a -> Error
// Function that just throws an error
function testFunc() {
    throw "example error";
}

// getSheetData : String String -> Array[][]
// Fetches 2D array of spreadsheet data given the script property name where the file ID is stored and the sheet name
function getSheetData(fileIDPropName, sheetName) {
    var fileId = scriptProps.getProperty(fileIDPropName);
    var file = SpreadsheetApp.openById(fileId);
    var sheet = file.getSheetByName(sheetName);
    var range = sheet.getDataRange();
    return range.getValues();
}

// validateWbsNum : String -> n/a
// Is the provided string a valid Work Breakdown Structure number? (If no, throw an error)
function validateWbsNum(wbsNum) {
    var errorMsg = "WBS Invalid: ";
    if (wbsNum.length != 9) {
        throw errorMsg + "incorrect length";
    }
}