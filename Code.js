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
// Function for testing features and functions
function testFunc() {
  var stuff = buildUnorderedListHTML("item one; item 2", ";");
  Logger.log(stuff);
}

// getSheetRange : String String -> Object[Range]
// Fetches Range object of spreadsheet data given the script property name where the file ID is stored and the sheet name
function getSheetRange(fileIDPropName, sheetName) {
    var fileId = scriptProps.getProperty(fileIDPropName);
    var file = SpreadsheetApp.openById(fileId);
    var sheet = file.getSheetByName(sheetName);
    var range = sheet.getDataRange();
    return range;
}

// findIdx : Array[] any -> Number
// Return index of given item in the given array, throws error if not found
function findIdx(item, array) {
    var idx = array.indexOf(item);
    if (idx == -1) {
        throw "Item not found in array";
    } else {
        return idx;
    }
}

// validateWbsNum : String -> n/a
// Is the provided string a valid Work Breakdown Structure number? (If no, throw an error)
function validateWbsNum(wbsNum) {
    var errorMsg = "WBS Invalid: ";
    if (wbsNum.length != 9) {
        throw errorMsg + "incorrect length";
    }
}

// buildUnorderedListHTML : String String -> HTML
// Processes text with specified delimiter to produce an HTML unordered list
function buildUnorderedListHTML(text, delimiter) {
    return `<ul>` + buildListHTML(text, delimiter) + `</ul>`;
}

// buildOrderedListHTML : String String -> HTML
// Processes text with specified delimiter to produce an HTML ordered list (ordered subbullets not supported)
function buildOrderedListHTML(text, delimiter) {
    return `<ol>` + buildListHTML(text, delimiter) + `</ol>`;
}

// buildListHTML : String String -> HTML
// Processes text with specified delimiter to produce HTML of list elements
function buildListHTML(text, delimiter) {
    var textRemaining = text;
    var list = "";
    while(textRemaining.indexOf(delimiter) != -1) {
        nextIdx = textRemaining.indexOf(delimiter);
        var line = textRemaining.slice(0, nextIdx);
        if (line.slice(0, 1) == "-") {
            list += `<ul><li>` + line.slice(1) + `</li></ul>`;
        } else {
            list += `<li>` + line + `</li>`;
        }
        textRemaining = textRemaining.slice(nextIdx + 1);
    }
    return list;
}

// getPlaceholderHTML : String -> HTML
// Get HTML for placeholder content given placeholder text
function getPlaceholderHTML(text) {
    var html = `<div class="placeholder-content">
                    ` + text + `
                </div>`;
    return html;
}