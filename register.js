function addUser() {
    event.preventDefault();
   //step 1:Get form values
   var userName = $("#userName").val();
   var password = $("#password").val();
   var contactNumber = $("#contactNumber").val();
   var mailId = $("#mailId").val();
   
   var formData = { "userName": userName, "password": password, "contactNumber": contactNumber, "emailId": mailId }

    console.log(formData);
    var url="http://localhost:8090/api/addUser";

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
            
        }).fail( function(err,status){
            console.log(err);
            if (err.status == 201) 
            {
                alert("Register Successfully");
                window.location.href = "userLogin.html";
                return;
            }
            else{    
                var msg = err.responseJSON.errorMessage;
                alert(msg);
            }
        });
    }
    

