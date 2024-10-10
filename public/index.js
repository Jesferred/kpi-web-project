const showPasswordIcon = document.querySelector('#showPassword');
const hidePasswordIcon = document.querySelector('#hidePassword');
const passwordInput = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');
const submitButton = document.querySelector('.btn');

function checkPasswordLength() {
    if (passwordInput.value.length < 8) {
        passwordError.style.display = 'block';
        submitButton.disabled = true;
    } else {
        passwordError.style.display = 'none';
        submitButton.disabled = false;
    }
}

showPasswordIcon.addEventListener('click', function () {
    passwordInput.setAttribute('type', 'text');
    showPasswordIcon.style.display = 'none';
    hidePasswordIcon.style.display = 'inline';
});

hidePasswordIcon.addEventListener('click', function () {
    passwordInput.setAttribute('type', 'password');
    hidePasswordIcon.style.display = 'none';
    showPasswordIcon.style.display = 'inline';
});

passwordInput.addEventListener('input', () => {
    checkPasswordLength();
  });
submitButton.addEventListener('click', () => {
    location.reload();
});