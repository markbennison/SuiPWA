const txtName = document.getElementById("name");
const txtEmail = document.getElementById("email");
const txtTelephone = document.getElementById("telephone");
const txtMessage = document.getElementById("message");

const btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", submit);

const nameValidElement = document.getElementById("nameValidText");
const emailValidElement = document.getElementById("emailValidText");
const telephoneValidElement = document.getElementById("telephoneValidText");
const messageValidElement = document.getElementById("messageValidText");

function submit() {
    event.preventDefault();
    console.log(txtName.value + " " + txtEmail.value + " " + txtTelephone.value + " " + txtMessage.value);
    var validForm = true;
    if (!txtName.checkValidity()) {
        nameValidElement.innerHTML = txtName.validationMessage;
        validForm = false;
    } else {
        nameValidElement.innerHTML = "";
    }

    if (!txtEmail.checkValidity()) {
        emailValidElement.innerHTML =  txtEmail.validationMessage;
        validForm = false;
    } else {
        emailValidElement.innerHTML = "";
    }
    
    if (!txtTelephone.checkValidity()) {
        telephoneValidElement.innerHTML =  txtTelephone.validationMessage;
        validForm = false;
    } else {
        telephoneValidElement.innerHTML = "";
    }

    if (!txtMessage.checkValidity()) {
        messageValidElement.innerHTML = txtMessage.validationMessage;
        validForm = false;
    } else {
        messageValidElement.innerHTML = "";
    }
/*
    if(validForm){
        btnSubmit.classList.add("success")
    }else{
        btnSubmit.classList.remove("success")
    }
*/
}