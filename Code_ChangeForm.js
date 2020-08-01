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
    console.log(requestType);
}