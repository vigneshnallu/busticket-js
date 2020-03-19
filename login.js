function validateLogin() {
   event.preventDefault();
   //step 1:Get form values
   var emailId = $("#userId").val();
   var password = $("#password").val();
  
    var url="http://localhost:8090/api/userlogin?email="+emailId+"&password="+password;
    
   $.getJSON(url, function (data) {
    //console.log(password);
    console.log(data);
    
        alert("Login Success");
      window.location.href="searchbus.html";
      
   });
}