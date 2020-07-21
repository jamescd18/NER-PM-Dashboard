/*
Document: JS code specific for Changes

*/

// getChangeForm : String -> HTML
// Produce HTML display output form for given desired change type
function getChangeForm(changeType) {
    if (changeType == "status") {
        return getStatusUpdateForm();
    } else if (changeType == "change") {
        return getChangeRequestForm();
    } else {
        throw "Change type not recognized";
    }
}

// getStatusUpdateForm : n/a -> HTML
// return HTML display output for status update form
function getStatusUpdateForm() {
    var html = `<div class="data-frame">
                    <h4>Status Update</h4>
                    ` + getWBSFormGroup("status") + `
                    <div id="wp-content">
                        ` + getPlaceholderHTML("* Coming Soon! * <br> Enter WBS # Above") + `
                    </div>
                </div>`;
    return html;
}