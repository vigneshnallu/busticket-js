$(document).ready(function () {
    $("#src").change(function () {
        $("#des").empty();
        var src = $("#src").val();
        console.log(src);
        var url = "http://localhost:8090/api/viewbusdestination?source=" + src;
        $.get(url, function (data) {
            var content = "";
            console.log(data);
            var destinations = _.uniq( _.pluck(data,'busDestination'));
            console.log(destinations);
            for ( let d of destinations){
            //for (let d of data) {
                console.log(d.busDestination);
                //var
                content += `"<option value="${d}">${d}</option>"`;
            }
            console.log(content);
            $("#des").append(content);
            displayData();

        });
    })
});


$(document).ready(function () {
    $("#des").change(function () {
        displayData();
    })
});



function bookTicket(busNo, busTiming) {
    localStorage.setItem("busNo", JSON.stringify(busNo));            //set data to localstorage and convert to string.
    localStorage.setItem("busTiming", JSON.stringify(busTiming));
    window.location.href = "book.html";              // ?busNo="+ busTiming + "&timing="+ busTiming
}


function displayData() {
    event.preventDefault();
    getDataFromDB(function (busList) {
        $("#busTbl").empty();
        var row = "";
        var j = 1;
        for (var i = 0; i < busList.length; i++) {
            var busObj = busList[i];
            var btn = "bookTicket(" + busObj.busNo + ",'" + busObj.busTiming.departureTime + "')";
            console.log(btn);
            row += "<tr><td>" + (j++) + "</td><td>" + busObj.busNo + "</td><td>" + busObj.busName + "</td><td>" + busObj.amount + "</td><td>" + busObj.clazz + "</td><td>" + busObj.seatAvailability.totalSeats + "</td><td>" + busObj.seatAvailability.availableSeats + "</td><td>" + busObj.busTiming.departureTime + "</td>" +
                "<td><button onclick=" + btn + ">Book</button></td></tr>";
        }
        $("#busTbl").append(row);
        // alert("success");
    });
}




function getDataFromDB(callBackData) {
    var source = $("#src").val();
    var destination = $("#des").val();
    var journeydate = $("#date").val();

    console.log(source, destination);

    var url = "http://localhost:8090/api/viewbus?destination=" + destination + "&source=" + source;

    $.getJSON(url, function (data) {
        console.table(data);
        callBackData(data);
    });
}



//  function getDesination() {


//    var url = "http://localhost:8090/api/viewbusdestination?source=TMB";

// }