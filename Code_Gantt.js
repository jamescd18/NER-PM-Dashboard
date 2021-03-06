

// getEntireGanttSheet : HTMLWindow -> HTML
// return HTML iframe display for the Gantt in the Database spreadsheet
function getEntireGanttSheet(width, height) {
    var widthScalar = 0.75;
    var heightScalar = 0.85;
    var html = `<div>
                    <div>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#centeredFullGantt">
                            View Full Gantt
                        </button>
                        <div class="modal fade" id="centeredFullGantt" tabindex="-1" role="dialog" aria-labelledby="centeredFullGantt" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content" style="width: ` + width * widthScalar * 1.1 + `px; height: ` + height * heightScalar * 1.1 + `px">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body" style="width: ` + width * widthScalar + `px; height: ` + height * heightScalar + `px">
                                        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21BbKSgpjzx-GgFu8OymjbgaaWcp-VnTcNdeFYiMmcib_LTpYQcs4229ZvGBwUNrB8zBpOqzYvF7v/pubhtml?gid=100811517&amp;single=true&amp;widget=true&amp;headers=false"
                                                style="width: ` + width * widthScalar + `px; height: ` + height * heightScalar + `px">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="big-gantt">
                        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21BbKSgpjzx-GgFu8OymjbgaaWcp-VnTcNdeFYiMmcib_LTpYQcs4229ZvGBwUNrB8zBpOqzYvF7v/pubhtml?gid=100811517&amp;single=true&amp;widget=true&amp;headers=false"
                                style="width: 100%; height: 700px">
                        </iframe>
                    </div>
                </div>`;
    return html;
}