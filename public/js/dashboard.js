async function copyToClipboard(value) {
    try {
        await navigator.clipboard.writeText(value);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const decryptButtons = document.querySelectorAll('.decrypt-btn');
    const generatePassButton = document.querySelector('.generate-pass');
    const editButtons = document.querySelectorAll('.change-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const id = button.getAttribute('data-id');
            try {
                const response = await fetch(`/dashboard/password/${id}`);
                const result = await response.json();

                if (result.success) {
                    const { website, login, decryptedPassword } = result.password;

                    if (website && login && decryptedPassword) {
                        document.getElementById('edit-id').value = id;
                        document.getElementById('edit-url').value = website;
                        document.getElementById('edit-login-input').value = login;
                        document.getElementById('edit-pass').value = decryptedPassword;
                        document.querySelector('.popup-bg-edit').style.display = 'block';
                    } else {
                        alert('Some data is missing');
                    }
                } else {
                    alert(result.message || 'Failed to edit password');
                }
            } catch (error) {
                console.error('Error fetching password:', error);
                alert('An error occurred while trying to edit the password');
            }
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const id = button.getAttribute('data-id');
            try {
                const response = await fetch(`/dashboard/delete/${id}`);
                const result = await response.json();

                if (result.success) {
                    const row = document.querySelector(`tr[data-id="${id}"]`);
                    row.remove();
                } else {
                    alert('Failed to delete password');
                }
                location.reload();
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    decryptButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const id = button.getAttribute('data-id');
            const passwordStars = document.getElementById(`password-stars-${id}`);
            const realPassword = document.getElementById(`real-password-${id}`);
            const icon = button.querySelector('i');

            if (realPassword.style.display === 'none') {
                try {
                    const response = await fetch(`/dashboard/decrypt/${id}`);
                    const result = await response.json();

                    if (result.decryptedPassword) {
                        realPassword.textContent = result.decryptedPassword;
                        passwordStars.style.display = 'none';
                        realPassword.style.display = 'inline';
                        copyToClipboard(result.decryptedPassword);
                        icon.className = 'bx bxs-hide bx-sm';
                        // Set a timeout to hide the password after 5 seconds
                        setTimeout(() => {
                            passwordStars.style.display = 'inline';
                            realPassword.style.display = 'none';
                            icon.className = 'bx bx-show bx-sm';
                        }, 15000);

                        alert('Password view for 15 seconds and copied to clipboard');
                    } else {
                        alert('Failed to decrypt password');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Скрываем пароль обратно и показываем звёздочки
                passwordStars.style.display = 'inline';
                realPassword.style.display = 'none';
                icon.className = 'bx bx-show bx-sm';
            }
        });
    });

    // Функция для обновления полоски силы пароля
    document.getElementById('pass').addEventListener('input', updateStrengthBar);
    document.getElementById('edit-pass').addEventListener('input', updateEditStrengthBar);

    function updateStrengthBar() {
        const strengthBar = document.getElementById('strength-bar');
        const password = document.getElementById('pass').value;
        let strength = 0;

        if (password.length > 7) strength += 1; // длина пароля больше 7 символов
        if (/[A-Z]/.test(password)) strength += 1; // содержит заглавные буквы
        if (/[0-9]/.test(password)) strength += 1; // содержит цифры
        if (/[\W]/.test(password)) strength += 1; // содержит специальные символы

        switch (strength) {
            case 0:
                strengthBar.style.width = '0%';
                strengthBar.style.backgroundColor = 'red';
                break;
            case 1:
                strengthBar.style.width = '25%';
                strengthBar.style.backgroundColor = 'red';
                break;
            case 2:
                strengthBar.style.width = '50%';
                strengthBar.style.backgroundColor = 'orange';
                break;
            case 3:
                strengthBar.style.width = '75%';
                strengthBar.style.backgroundColor = 'yellowgreen';
                break;
            case 4:
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = 'green';
                break;
        }
    }

    function updateEditStrengthBar() {
        const strengthBar = document.getElementById('edit-strength-bar');
        const password = document.getElementById('edit-pass').value;
        let strength = 0;

        if (password.length > 7) strength += 1; // длина пароля больше 7 символов
        if (/[A-Z]/.test(password)) strength += 1; // содержит заглавные буквы
        if (/[0-9]/.test(password)) strength += 1; // содержит цифры
        if (/[\W]/.test(password)) strength += 1; // содержит специальные символы

        switch (strength) {
            case 0:
                strengthBar.style.width = '0%';
                strengthBar.style.backgroundColor = 'red';
                break;
            case 1:
                strengthBar.style.width = '25%';
                strengthBar.style.backgroundColor = 'red';
                break;
            case 2:
                strengthBar.style.width = '50%';
                strengthBar.style.backgroundColor = 'orange';
                break;
            case 3:
                strengthBar.style.width = '75%';
                strengthBar.style.backgroundColor = 'yellowgreen';
                break;
            case 4:
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = 'green';
                break;
        }
    }

    generatePassButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const length = document.getElementById('length').value;
        const numbers = document.querySelector('input[name="numbers"]').checked;
        const symbols = document.querySelector('input[name="symbols"]').checked;
        const uppercase = document.querySelector('input[name="uppercase"]').checked;
        const excludeSimilarCharacters = document.querySelector('input[name="excludeSimilarCharacters"]').checked;
        const strict = document.querySelector('input[name="strict"]').checked;

        try {
            const response = await fetch('/dashboard/generate-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'length': length,
                    'numbers': numbers ? 'on' : '',
                    'symbols': symbols ? 'on' : '',
                    'uppercase': uppercase ? 'on' : '',
                    'excludeSimilarCharacters': excludeSimilarCharacters ? 'on' : '',
                    'strict': strict ? 'on' : ''
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            const passwordField = document.getElementById('pass');
            updateStrengthBar();
            passwordField.value = result.password;
        } catch (error) {
            console.error('Error during password generation:', error);
        }
    });
});