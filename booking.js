function bookTicket() {
    event.preventDefault();
    //step 1:Get form values
    var busNo = $("#bno").val();
    var passengerId = $("#pid").val();
    var timing = $("#timing").val();
    var noOfTicket = $("#noofticket").val();
    var journeyDate = $("#date").val();
    var userId = $("#userid").val();

    var journeyTime = journeyDate + "T" + timing;

    var formData = { "busNo": busNo, "passengerId": passengerId, "noOfTicket": noOfTicket, "journeyDate": journeyTime, "userId": userId }

    console.log(formData);

    var url = "http://localhost:8090/api/addBooking";    

   post(url,formData);
}

function post(url, formData){
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',        
        data: JSON.stringify(formData)
    }).done( function(){
        // alert("Booking Successfull");
    }).fail( function(err,status){
        console.log(err);
        if (err.status == 201) /* jQuery thinks, Status 201 means error, but it doesnt so we have to work around it here */
        {
            alert("Booked Successfully");
            window.location.href = "welcome.html";
            return;
        }
        else{    
            var msg = err.responseJSON.errorMessage;
            alert(msg);
        }
    });
}


$(document).ready(function(){

    // JSON.parse(localStorage.getItem("busNo"));           get data from localstorage and convert back to json

    $("#bno").val( JSON.parse(localStorage.getItem("busNo")) );
    $("#timing").val( JSON.parse(localStorage.getItem("busTiming")) );

})