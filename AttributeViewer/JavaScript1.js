
//var settings;

$(document).ready(function () {

    createTable();

    var bubble = new attributeViewer();

    bubble.containar = "#disablingDiv";
    //bubble.callBack = myCallBackFunction;

    
    $("#disablingDiv").click(function (e) {
        bubble.show(e.pageX, e.pageY, table);
    });
    
});

function createTable() {

    table = document.createElement("table");
    table.id = "myTable";

    //remove all the rows except first
    $("#myTable").find("tr:gt(0)").remove();

    for (var key in jsonData) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.className = "cellcolor";
        cell1.innerHTML = key;
        cell2.innerHTML = jsonData[key];
    }

    
};

function myCallBackFunction() {
    alert("CallBack for close is fired");
};