//SHOW/HIDE PASSWORDS
document.addEventListener("DOMContentLoaded", function () {
    function togglePassword(inputId, iconId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(iconId);

        toggleIcon.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleIcon.classList.remove("fa-eye");
                toggleIcon.classList.add("fa-eye-slash");
            } else {
                passwordInput.type = "password";
                toggleIcon.classList.remove("fa-eye-slash");
                toggleIcon.classList.add("fa-eye");
            }
        });
    }
    togglePassword("password", "togglePassword");
    togglePassword("confirm-password", "toggleConfirmPassword");
    
//USERNAME CHECK

const checkUsername = () =>{
    const username = document.querySelector('#username');
    if(!username.value){
      alert('Username cannot be empty');
      return false;
    }
    else {
      if(username.value.length<4){
          alert('Username Must Contain 4 Alphabets');
          return false;
      }
      else{
        return true;
      }
    }
}

//EMAIL CHECK
const checkEmail = () =>{
    const email = document.querySelector('#email');
    if(!email.value){
      alert('Email cannot be empty');
    }
    else{
      if(email.checkValidity()){
        console.log('okay report');
        return true;
      }
      else{
        alert('Enter a valid Email');
        return false;
      }
    }
}

//Password Strength
const passStrength = () =>{
  //PASSWORD STRENGTH
  const pass = document.querySelector('#password');
  const password = pass.value.trim();
  console.log('pass : ',password);
        if(!password){
          alert('Password cannot be empty')
          return false;
        } 
          if(password.length>8){
              if(/[!@#$%^&*()_+]/.test(password)){
                  if(/[0-9]/.test(password)){
                      if(/[A-Z]/.test(password)){
                          return true;
                      }
                      else{
                          const message = "Password must contain an Uppercase letter";
                          alert(message);
                          return false;
                      }    
                  }
                  else{
                      const message = "Password must contain a number";
                      alert(message);
                      return false;

                  }
              }
              else{
                  const message = "Password must contain a special character i.e.(!@#$%^&*()_+)"
                  alert(message);
                  return false;

              }
          }
          else{
              const message = "Password length must be more than 8";
              alert(message);
              return false;
          }
  
}

//MATCH PASSWORDS
const matchPasswords = () =>{
    const password = document.querySelector('#password');
    const confirm_password = document.querySelector('#confirm-password');

    if(password.value==confirm_password.value){
      console.log('ok report');
      return true;
    }
    else{
      alert('Passwords do not match');
      return false;
    }

}

//SEND DATA
const submitForm = () =>{
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
      
    fetch('/signup',{
        method : 'POST',
        body: JSON.stringify({ username, email, password }),
        headers : {
          'Content-Type' : 'application/json'
        }
    })
    .then(data => data.json())
    .then(data => {
      if(!data.success){
        alert(data.message);
        return;
      }
      document.querySelector('form').reset();
      window.location.replace('/');
    //   console.log('SUCCESS');
    })

    // console.log(username,email,password);

}

//SUBMIT BUTTON
const submit= document.querySelector('#register-btn')
submit.addEventListener('click',(event)=>{
    event.preventDefault();
    if(checkUsername()){
        if(checkEmail()){
            if(passStrength()){
                if(matchPasswords()){
                    submitForm();
                }
            }
        }
    }
})


});


