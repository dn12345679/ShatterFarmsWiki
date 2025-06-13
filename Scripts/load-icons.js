import './infocard.js';

// TEMPORARY DOES NOT WORK. WORKING ON FUNCTIONALITY FIRST
var names;


/*
    path = image folder
    tclass = table class for styling
    pathjson = JSON data path, information to be loaded, IMPORTANT: must have columns of JSON file and headers to display for each category
    placeholder = true/false if it is using the default icon or not
*/
function loadIcons(path, tclass, pathjson, placeholder) {
    if (!placeholder) {
        console.log("Loading from JSON");
        get_names(pathjson);    
    }
    
    const targetDiv = document.querySelector("#" + tclass);
    
    // Create 40 cards
    for (let i = 0; i < 40; i++) {
        const card = document.createElement('info-card');
        card.setAttribute('fontpath', '/Assets/Font/Blackcraft.ttf');
        card.setAttribute('icon', '/Assets/Icons/CultiveIcons/Question.webp');
        card.setAttribute('text', `Card ${i + 1}`);
        
        targetDiv.appendChild(card);
    }
}


function get_names(pathjson){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', pathjson, true);
    xhr.onload = function() {

        if (xhr.status === 200) {

            const data = JSON.parse(xhr.responseText);
            names = data.map(item => item.genesisName); 
            
        }
    }
    xhr.send();
    
};

export { loadIcons };