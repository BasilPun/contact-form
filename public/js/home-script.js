document.querySelector('#contact-form').onsubmit = () =>{
    let isValid = true;
    let hasEmail = false;
    clearErrors();

    //trim for whitespace
    let fname = document.getElementById("fname").value.trim();
    if (fname === ""){
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    let lname = document.getElementById("lname").value.trim();
    if (lname === ""){
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();
    if(email != ""){
        //if not empty, check for @ and .
        let hasDot = false;
        let hasAt = false;

        for(char of email){
            if(char == '@'){
                hasAt = true;
            }
            if(char == '.'){
                hasDot = true;
            }
        }
        if (!hasDot || !hasAt){
            document.getElementById("err-email-invalid").style.display = "block";
            hasEmail = false;
            isValid = false;
        }
        else{
            hasEmail = true;
        }
    }

    let mailingListBox = document.querySelector("#mailing-list");
    if (mailingListBox.checked == true && hasEmail == false){
        document.getElementById("err-email-needed").style.display = "block";
        isValid = false;
    }

    let linkedin = document.querySelector("#linkedin").value.trim();
    if (linkedin != ""){
        if(linkedin.startsWith("https://linkedin.com/in/") == false){
            document.getElementById("err-linkedin").style.display = "block";
            isValid = false
        }
    }

    let metProvided = false;
    let metValue = document.querySelector("#met").value;
    let metOther = document.querySelector("#met-other").value.trim();

    if (metValue != "none") {
        if (metValue != "other"){
            metProvided = true;
        }
    }

    if (metOther != ""){
        metProvided = true;
    }

    if (metProvided == false){
        document.getElementById("err-met").style.display = "block";
        isValid = false;
    }

    return isValid;
}

let mailingListBox = document.querySelector("#mailing-list");
let formatBox = document.querySelector('#email-format');
mailingListBox.onchange = function(){
    if (mailingListBox.checked == true){
        formatBox.style.display = "block";
    }
    else{
        formatBox.style.display = "none";
    }
}

let metboxOther = document.querySelector('#metbox-other');
let met = document.querySelector("#met");
met.onchange = function (){
    if (met.value == "other"){
        metboxOther.style.display = "flex";
    }
    else{
        metboxOther.style.display = "none";
    }
}

function clearErrors(){
    //creates an array of errors
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i< errors.length; i++){
        //for each error, make it disappear.
        errors[i].style.display = "none";
    }
}