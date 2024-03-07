function validateLogin() {
  
  var email = document.getElementById("input-email").value;
  var password = document.getElementById("input-password").value;
  
  if (email == "" || password == "") {
    alert("Please, fill all the blanks");
    return false;
  }
  else if (email == "admin@example.com" && password == "Admin@123") {
    alert("Login successfully");
    return true;
  }
  else if(email == "user@example.com" && password == "#123User"){
    alert("Login successfully");
    return true;
  }
  else if(email == "guest@example" && password == "321%Guest"){
    alert("Login successfully");
    return true;
  }
  else {
    alert("Email or password incorrect");
    return false;
  }
}

