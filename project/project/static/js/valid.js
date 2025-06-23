function validateForm() {
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');
    const errorText = document.getElementById('password-error');
    const submitButton = document.getElementById('submit-button');
    const usernameiInput = document.getElementById('username');
    const username_error = document.getElementById('username-error');
    const signedup = document.getElementById('signedup');
    if(users.includes(usernameiInput.value))
    {
      username_error.style.display= 'block';
      username_error.style.fontWeight='100';
      username_error.style.color='white';
      submitButton.disabled = true;
      return false; 
    } else if(passwordInput.value !== confirmInput.value){

      username_error.style.display = 'none';
      errorText.style.display = 'block';
      errorText.style.fontWeight = '100';
      errorText.style.color = 'white';
      errorText.style.transform = "translateY(-60%)";
      submitButton.disabled = true;
      return false;
    }else {

      errorText.style.display = 'none';
      submitButton.disabled = false;

      return true; // Allow form submission
    }
  }
          