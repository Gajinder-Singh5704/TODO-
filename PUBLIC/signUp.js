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
    const passStrength = () =>{
        //PASSWORD STRENGTH
        const pass = document.querySelector('#password');
        const alert = document.querySelector('.password-alert');
        const form = document.querySelector('form');
        
        pass.addEventListener('input',()=>{
            const password = pass.value;
                if(password.length>8){
                    if(/[!@#$%^&*()_+]/.test(password)){
                        if(/[0-9]/.test(password)){
                            if(/[A-Z]/.test(password)){
                                alert.style.display = 'none';
                                pass.style.borderBottom = '1px solid rgb(85, 82, 82)';
                            }
                            else{
                                alert.textContent = "Password must contain an Uppercase alplphabet";
                                alert.style.display = 'flex';
                                pass.style.borderBottom = '1px solid red';
                            }    
                        }
                        else{
                            alert.textContent = "Password must contain a number";
                            alert.style.display = 'flex';
                            pass.style.borderBottom = '1px solid red';
                        }
                    }
                    else{
                        alert.textContent = "Password must contain a symbol i.e.(!@#$%^&*()_+)"
                        alert.style.display = 'flex';
                        pass.style.borderBottom = '1px solid red';
                    }
                }
                else{
                    alert.textContent = "Password length must be more than 8";
                    alert.style.display = 'flex';
                    pass.style.borderBottom = '1px solid red';
                }
                if(!pass.value){
                    // let alert = document.querySelector('.cnfrm-pass-alert');
                    alert.style.display = 'none';
                    pass.style.borderBottom = '1px solid rgb(85, 82, 82)';
                }
        })
        
    }       
    passStrength();

    const matchPasswords = () =>{
        const pass = document.querySelector('#password');
        const cnfrm_pass = document.querySelector('#confirm-password');
        const alert = document.querySelector('.cnfrm-pass-alert');
        const form = document.querySelector('form');
    
            form.addEventListener('submit',(event)=>{
                if(cnfrm_pass.value !== pass.value){
                    event.preventDefault();
                    alert.textContent='Passwords dont match';
                    alert.style.display = 'flex';
                    cnfrm_pass.style.borderBottom = '1px solid red';
                }        
            })
    
            cnfrm_pass.addEventListener('input',()=>{
                if(cnfrm_pass.value !== pass.value){
                    // let alert = document.querySelector('.cnfrm-pass-alert');
                    alert.textContent='Passwords dont match';
                    alert.style.display = 'flex';
                    cnfrm_pass.style.borderBottom = '1px solid red';
                }
                else{
                    // let alert = document.querySelector('.cnfrm-pass-alert');
                    alert.style.display = 'none';
                    cnfrm_pass.style.borderBottom = '1px solid rgb(85, 82, 82)';
                }
                if(!cnfrm_pass.value){
                    // let alert = document.querySelector('.cnfrm-pass-alert');
                    alert.style.display = 'none';
                    cnfrm_pass.style.borderBottom = '1px solid rgb(85, 82, 82)';
                }
            })
    }
    matchPasswords();
    
    const submitForm = () =>{
        const submitBtn = document.querySelector("#register-btn");
        submitBtn.addEventListener('click',()=>{
            const form = document.querySelector('form');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log(email,password)
            fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({ name,email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    return alert(data.message);
                }
                form.reset();
                window.location.href='/'
            });          
        })
    }
    submitForm();
});


