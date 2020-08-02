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
    for (var j = 0; j < responseData.length; j++) {
        var item = responseData[j];
        Logger.log('Response #%s to the question "%s" was "%s"', 
                    (j + 1).toString(), 
                    item.getItem().getTitle(),
                    item.getResponse());
    }
    var data = {
        idNum: "",
        dateTime: "",
        requestor: "",
        wbsNum: "",
        what: "",
        why: "",
        impact: "",
        docs: "",
    }
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