const sun = document.querySelector(".sun");
const core = document.querySelector(".sun-core");
const rays = document.querySelector(".sun-rays");

const logo = document.querySelector(".logo");
const brandName = document.querySelector(".brand-name");

const cards =
    document.querySelectorAll(".info-card, .impact-card");



function updateSun() {


    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;


    const progress =
        window.scrollY / maxScroll;



    // -------------------------
    // SUN EXPANSION
    // Happens during first 55%
    // -------------------------

    const sunProgress =
        Math.min(
            1,
            progress / 0.55
        );


    const scale =
        1 + sunProgress * 30;


    sun.style.transform =
        `scale(${scale})`;



    // -------------------------
    // RAY INTENSITY
    // -------------------------

    rays.style.opacity =
        sunProgress;



    // -------------------------
    // CORE GLOW
    // -------------------------

    core.style.boxShadow = `
        0 0 ${40 + sunProgress * 100}px #FFD93D,
        0 0 ${100 + sunProgress * 200}px rgba(255,217,61,0.9)
    `;



    // -------------------------
    // Logo reveal
    // -------------------------

    if (logo) {

        const logoProgress =
            Math.max(
                0,
                Math.min(
                    1,
                    (progress - 0.05) / 0.25
                )
            );


        logo.style.opacity = logoProgress;


        logo.style.transform =
            `
            scale(
                ${0.75 + logoProgress * 0.25}
            )
            `;

    }


    // -------------------------
    // BRAND NAME
    // -------------------------

    if (brandName) {


        const textOpacity =
            0.45 + sunProgress * 0.55;


        brandName.style.opacity =
            textOpacity;



        const textOffset =
            10 - sunProgress * 10;


        brandName.style.transform =
            `
            translateY(${textOffset}px)
            `;

    }

}

// ======================================
// ABOUT SECTION REVEAL
// ======================================

const aboutCards =
    document.querySelectorAll(
        ".info-card, .statistics-card"
    );


let aboutShown = false;


function revealAbout(){

    if(aboutShown) return;


    const section =
        document.querySelector(".about-section");


    if(!section) return;


    const position =
        section.getBoundingClientRect().top;



    if(position < window.innerHeight * 0.95){


        aboutShown = true;


        aboutCards.forEach((card,index)=>{


            setTimeout(()=>{

                card.classList.add("show");


            }, index * 180);



        });


    }

}



window.addEventListener(
    "scroll",
    revealAbout
);


revealAbout();


// -------------------------
// CARD REVEAL
// Starts after sun finishes
// -------------------------

function revealCards() {


    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;


    const progress =
        window.scrollY / maxScroll;



    // Wait until sunlight reveal finishes

    if (progress < 0.6) {

        return;

    }



    const trigger =
        window.innerHeight * 0.85;



    cards.forEach(card => {


        const top =
            card.getBoundingClientRect().top;



        if (top < trigger) {

            card.classList.add("show");

            setTimeout(() => {

                card.classList.add("flip");

            }, 700);

        }


    });

}





window.addEventListener(
    "scroll",
    updateSun
);


window.addEventListener(
    "scroll",
    revealCards
);



updateSun();
revealCards();

const counters =
document.querySelectorAll(".counter");


let counted = false;



function startCounters(){


    const stats =
        document.querySelector(".statistics-card");


    if(!stats) return;



    const position =
        stats.getBoundingClientRect().top;



    if(
        position < window.innerHeight * 0.8
        &&
        !counted
    ){


        counted = true;



        counters.forEach(counter => {


            const target =
                +counter.dataset.target;



            let current = 0;


            const increment =
                target / 120;



            function update(){


                current += increment;



                if(current < target){


                    counter.innerText =
                        Math.ceil(current);


                    requestAnimationFrame(update);


                }

                else {


                    counter.innerText =
                        target;


                }


            }



            update();


        });


    }


}



window.addEventListener(
    "scroll",
    startCounters
);


startCounters();


const exploreCards =
document.querySelectorAll(".explore-card");

let exploreShown = false;

function revealExploreCards(){

    if(exploreShown) return;

    const section =
        document.querySelector(".explore-section");

    if(!section) return;

    const top =
        section.getBoundingClientRect().top;

    if(top < window.innerHeight * 0.8){

        exploreShown = true;

        exploreCards.forEach((card,index)=>{

            setTimeout(()=>{

                card.classList.add("show");

                setTimeout(() => {

                    card.classList.add("flip");

                }, 700);

            }, index * 180);

        });

    }

}

window.addEventListener(
    "scroll",
    revealExploreCards
);

revealExploreCards();

// ======================================
// WORLD CONNECTION ANIMATION
// ======================================

const connectionMap =
    document.querySelector(".connection-map");

const flightPath =
    document.querySelector("#flightPath");

const plane =
    document.querySelector(".plane");


let connectionPlayed = false;



function animateConnection(){


    if(
        !connectionMap ||
        !flightPath ||
        !plane ||
        connectionPlayed
    ){
        return;
    }



    const rect =
        connectionMap.getBoundingClientRect();



    if(
        rect.top >
        window.innerHeight * 0.75
    ){
        return;
    }



    connectionPlayed = true;



    const pathLength =
        flightPath.getTotalLength();



    // prepare drawing animation

    flightPath.style.strokeDasharray =
        pathLength;


    flightPath.style.strokeDashoffset =
        pathLength;



    plane.style.opacity = "1";



    let progress = 0;



    function drawFlight(){


        progress += 0.008;



        if(progress > 1){
            progress = 1;
        }




        // -------------------------
        // Draw arc
        // -------------------------

        flightPath.style.strokeDashoffset =
            pathLength * (1 - progress);





        // -------------------------
        // Move plane
        // -------------------------

        const currentLength =
            pathLength * progress;



        const point =
            flightPath.getPointAtLength(
                currentLength
            );



        plane.style.left =
            `${point.x}px`;


        plane.style.top =
            `${point.y}px`;





        // -------------------------
        // Rotate plane direction
        // -------------------------

        const nextPoint =
            flightPath.getPointAtLength(
                Math.min(
                    pathLength,
                    currentLength + 8
                )
            );



        const angle =
            Math.atan2(
                nextPoint.y - point.y,
                nextPoint.x - point.x
            )
            *
            180
            /
            Math.PI;



        plane.style.transform =
            `
            translate(-50%, -50%)
            rotate(${angle}deg)
            `;




        if(progress < 1){

            requestAnimationFrame(
                drawFlight
            );

        }

    }



    requestAnimationFrame(
        drawFlight
    );


}



window.addEventListener(
    "scroll",
    animateConnection
);


animateConnection();





// ======================================
// INITIATIVE CARD REVEAL
// ======================================


const initiativeCards =
    document.querySelectorAll(
        ".initiative-card"
    );


let initiativesShown = false;



function revealInitiatives(){


    if(initiativesShown){
        return;
    }



    const section =
        document.querySelector(
            ".initiatives-section"
        );



    if(!section){
        return;
    }



    const top =
        section.getBoundingClientRect().top;



    if(
        top <
        window.innerHeight * 0.75
    ){


        initiativesShown = true;



        initiativeCards.forEach(
            (card,index)=>{


                setTimeout(()=>{


                    card.classList.add(
                        "show"
                    );


                }, index * 250);


            }
        );


    }


}



window.addEventListener(
    "scroll",
    revealInitiatives
);


revealInitiatives();

// ======================================
// GALLERY SLIDER
// ======================================


const galleryImage =
    document.querySelector("#galleryImage");


const nextButton =
    document.querySelector(".next-btn");


const prevButton =
    document.querySelector(".prev-btn");


const galleryCurrent =
    document.querySelector("#galleryCurrent");



let galleryIndex = 1;


const totalImages = 24;



function updateGallery(){


    galleryImage.classList.add("fade");



    setTimeout(()=>{


        galleryImage.src =
            `assets/gallery/ClassImage${galleryIndex}.jpg`;



        galleryCurrent.textContent =
            galleryIndex;



        galleryImage.classList.remove("fade");


    },300);


}




nextButton.addEventListener(
    "click",
    ()=>{


        galleryIndex++;


        if(galleryIndex > totalImages){

            galleryIndex = 1;

        }


        updateGallery();


    }
);





prevButton.addEventListener(
    "click",
    ()=>{


        galleryIndex--;


        if(galleryIndex < 1){

            galleryIndex = totalImages;

        }


        updateGallery();


    }
);

// ======================================
// CAUSES REVEAL ANIMATION
// ======================================


const causeCards =
    document.querySelectorAll(".cause-card");



function revealCauses(){


    causeCards.forEach(card=>{


        const top =
            card.getBoundingClientRect().top;



        if(
            top <
            window.innerHeight * .8
        ){

            card.classList.add("show");

        }


    });


}



window.addEventListener(
    "scroll",
    revealCauses
);


revealCauses();

// ======================================
// TEAM REVEAL
// ======================================


const teamCards =
document.querySelectorAll(
".leadership-card, .member-card, .advisor-card, .founder-card"
);



const teamImages =
document.querySelectorAll(
".leadership-card img, .member-card img, .advisor-card img, .founder-card img"
);




function revealTeam(){


    teamCards.forEach(card=>{


        const top =
        card.getBoundingClientRect().top;



        if(
            top <
            window.innerHeight * .8
        ){


            card.classList.add("show");


        }


    });





    teamImages.forEach(image=>{


        const top =
        image.getBoundingClientRect().top;



        if(
            top <
            window.innerHeight * .85
        ){


            image.classList.add("image-show");


        }


    });



}



window.addEventListener(
"scroll",
revealTeam
);



revealTeam();
// ======================================
// VOLUNTEER FORM
// ======================================


const volunteerForm =
document.querySelector("#volunteer-form");


if(volunteerForm){


volunteerForm.addEventListener(
"submit",
async function(e){


e.preventDefault();


const formData =
new FormData(volunteerForm);



const data = {

name:
formData.get("name"),

email:
formData.get("email"),

subject:
formData.get("subject"),

comment:
formData.get("comment"),

cv:
""

};



fetch(
"https://script.google.com/macros/s/AKfycbyrdDjcI0ztpMGq9Cm03lPYwAWVub4_gYxIx8LP8W9GkdcbsKWo6zSETZ5oUIUVNE0G/exec",
{

method:"POST",

body:
JSON.stringify(data)

}

);



alert(
"Thank you for volunteering!"
);


volunteerForm.reset();


});

}

// ======================================
// RESULTS & GOALS ANIMATION
// ======================================


const resultsSection =
document.querySelector(".results-section");


const resultsCards =
document.querySelectorAll(".results-card");


let resultsAnimated = false;



function revealResults(){


    if(!resultsSection || resultsAnimated){
        return;
    }



    const position =
    resultsSection.getBoundingClientRect().top;



    if(position < window.innerHeight * 0.75){


        resultsAnimated = true;



        resultsCards.forEach((card,index)=>{


            setTimeout(()=>{


                card.classList.add("results-show");


            }, index * 300);


        });


    }


}



window.addEventListener(
    "scroll",
    revealResults
);


revealResults();

// ======================================
// CONTACT SECTION REVEAL
// ======================================


const contactElements =
document.querySelectorAll(
".director-card,.contact-card"
);



function revealContact(){


contactElements.forEach(card=>{


const top =
card.getBoundingClientRect().top;



if(
top <
window.innerHeight*.8
){


card.classList.add("show");


}


});


}



window.addEventListener(
"scroll",
revealContact
);


revealContact();


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

