// ======================================
// CONTACT FORM SUBMISSION
// ======================================


const contactForm =
document.querySelector("#contactForm");


if(contactForm){


contactForm.addEventListener(
"submit",
function(e){


e.preventDefault();



const data = {


firstName:
document.querySelector("#firstName").value,


lastName:
document.querySelector("#lastName").value,


email:
document.querySelector("#contactEmail").value,


message:
document.querySelector("#message").value


};




fetch(
"https://script.google.com/macros/s/AKfycbyKmZyIG6e05FUBH9EZRInSfFeMuElpG9myFX73dH1vjL1JwZBrP8DfppbSqdT_kpwL/exec",
{

method:"POST",

body:
JSON.stringify(data)

}

)
.then(()=>{


alert(
"Thank you for contacting Empowering Education Foundation!"
);


contactForm.reset();


})

.catch(()=>{


alert(
"Something went wrong. Please email us directly."
);


});


});


}

