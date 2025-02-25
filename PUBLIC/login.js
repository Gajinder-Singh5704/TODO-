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

    const submitForm = () =>{
        const submitBtn = document.querySelector("#register-btn");
        submitBtn.addEventListener('click',()=>{
            const form = document.querySelector('form');
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log(email,password)
            fetch('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    return alert(data.message);
                }
                form.reset();
                window.location.href='/home'
            });          
        })
    }
    submitForm();
});
