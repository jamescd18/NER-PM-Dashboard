/*
Document: JS code connecting the Change Management Request form to the spreadsheet

*/

// onRequestSubmit : n/a -> n/a
// Pull the new change request submitted to the form
function onRequestSubmit() {
    var form = FormApp.openById(scriptProps.getProperty('changeForm'));
    var responses = form.getResponses();
    var latestResponse = responses[responses.length - 1];
    var responseData = latestResponse.getItemResponses();
    var data = [
        getNextChangeRequestId(responseData[2].getResponse()), // id num
        latestResponse.getTimestamp(), // date time
        responseData[0].getResponse(), // requestor
        responseData[1].getResponse(), // wbs number
        responseData[3].getResponse(), // what
        responseData[4].getResponse(), // why
        responseData[5].getResponse(), // impact
        responseData[6].getResponse(), // docs
    ]
    var sheet = getSheetInfo('mainSheetID', 'Change Requests', 'sheet');
    sheet.appendRow(data);
}

// getNextChangeRequestId : String -> String
// returns the next request ID for the given request type based on previous requests
function getNextChangeRequestId(requestType) {
    var typeLetter;
    if (requestType == "New Function") {
        typeLetter = "N";
    } else if (requestType == "Design Issue") {
        typeLetter = "I";
    } else if (requestType == "Project Delay") {
        typeLetter = "D";
    } else if (requestType == "Budget") {
        typeLetter = "B";
    } else if (requestType == "Stage Transition") {
        typeLetter = "S";
    } else if (requestType == "Other") {
        typeLetter = "O";
    } else {
        throw "Request type not supported, found " + requestType;
    }
    var data = getSheetInfo('mainSheetID', 'Change Requests', 'data');
    var changeIdIdx = findIdx("Request ID", data[0]);
    var numRequests = data.length;
    var latestId;
    for (var rowIdx = numRequests; rowIdx > 0; rowIdx--) {
        var rowId = data[rowIdx][changeIdIdx];
        if (rowId.includes(typeLetter)) {
            latestId = rowId;
            break;
        }
    }
    if (latestId == null) {
        return typeLetter + "-001";
    } else {
        var numStr = "0." + latestId.substring(latestId.indexOf("-") + 1); // converts ID (N-001) into number string ("0.001")
        var nextNum = (parseFloat(numStr) + 0.001).toString(); // converts string to float and increments by 1
        return typeLetter + "-" + nextNum.substring(nextNum.indexOf(".") + 1); // converts back to string ID form
    }
}