/*
Document: JS code specific for Work Packages

*/

// getWorkPackage : String -> HTML
// Produce HTML display output for given WBS #'s work package
function getWorkPackage(wbsNum) {
    return getWorkPackageHtml(getWorkPackageObj(wbsNum));
}

// getWorkPackageObj : String -> Object[Work Package]
// Build work package object from spreadsheet data
function getWorkPackageObj(wbsNum) {
    validateWbsNum(wbsNum);
    var data = getSheetData('mainSheetID', 'Work Packages');
    var rowData = [];
    for (var rowIdx = 1; rowIdx < data.length; rowIdx++) {
        if (data[rowIdx][2] == wbsNum) {
            rowData = data[rowIdx];
            break;
        }
    }
    if (rowData.length == 0) {
        throw "No Work Package data found."
    }
    var workPackage = {
        project: rowData[0],
        lead: rowData[1],
        wbsNum: rowData[2],
        name: rowData[3],
        duration: rowData[4] + " weeks",
        budget: "$" + rowData[5],
        dependancies: rowData[6],
        deliverable: rowData[7],
        description: rowData[8],
        changes: rowData[9]
    };
    return workPackage;
}

// getWorkPackageHtml : Object[Work Package] -> HTML
// Builds HTML description list from fields in given work package
function getWorkPackageHtml(workPackage) {
    var html = `<div class="data-frame">
                    <dl class="row">
                        <dt class="col-sm-3">Project</dt>
                        <dd class="col-sm-9">` + workPackage.project + `</dd>
                        <dt class="col-sm-3">Project Lead</dt>
                        <dd class="col-sm-9">` + workPackage.lead + `</dd>
                        <hr>
                        <dt class="col-sm-3">WBS #</dt>
                        <dd class="col-sm-9">` + workPackage.wbsNum + `</dd>
                        <dt class="col-sm-3">WP Name</dt>
                        <dd class="col-sm-9">` + workPackage.name + `</dd>
                        <dt class="col-sm-3">Duration</dt>
                        <dd class="col-sm-9">` + workPackage.duration + `</dd>
                        <dt class="col-sm-3">Budget</dt>
                        <dd class="col-sm-9">` + workPackage.budget + `</dd>
                        <dt class="col-sm-3">Dependancies</dt>
                        <dd class="col-sm-9">` + workPackage.dependancies + `</dd>
                        <dt class="col-sm-3">Deliverable(s)</dt>
                        <dd class="col-sm-9">` + workPackage.deliverable + `</dd>
                        <dt class="col-sm-3">Description</dt>
                        <dd class="col-sm-9">` + buildUnorderedListHTML(workPackage.description, ";") + `</dd>
                        <dt class="col-sm-3">Changes</dt>
                        <dd class="col-sm-9">` + buildUnorderedListHTML(workPackage.changes, ";") + `</dd>
                    </dl>
                </div>`;
    return html;
}

// buildUnorderedListHTML : String String -> HTML
// Processes text with specified delimiter to produce an HTML unordered list
function buildUnorderedListHTML(text, delimiter) {
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
    list = `<li>` + textRemaining + `</li>`;
    return `<ul>` + list + `</ul>`;
}