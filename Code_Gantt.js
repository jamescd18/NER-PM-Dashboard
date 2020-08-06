

// getEntireGanttSheet : n/a -> HTML
// return HTML iframe display for the Gantt in the Database spreadsheet
function getEntireGanttSheet() {
    var html = `<div class="big-gantt">
                    <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21BbKSgpjzx-GgFu8OymjbgaaWcp-VnTcNdeFYiMmcib_LTpYQcs4229ZvGBwUNrB8zBpOqzYvF7v/pubhtml?gid=100811517&amp;single=true&amp;widget=true&amp;headers=false"
                            style="width: 100%; height: 700px">
                    </iframe>
                </div>`;
    return html;
}