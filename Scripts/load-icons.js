

// TEMPORARY DOES NOT WORK. WORKING ON FUNCTIONALITY FIRST
var names;


/*
    path = image folder
    tclass = table class for styling
    pathjson = JSON data path, information to be loaded, IMPORTANT: must have columns of JSON file and headers to display for each category
    placeholder = true/false if it is using the default icon or not
*/
function loadIcons(path, tclass, pathjson, placeholder) {
    

    if (!placeholder){
        console.log("yeah")
        get_names(pathjson);    
    }
    

    const targetDiv = document.querySelector("." + tclass);



    
    // TODO: fetch icons from .json, then open them by name:
    const name = path + "/Question.webp"
    for (let i = 0; i < 40; i++) {
        const card = document.createElement('div');
        card.className = "card deck-center";
        const img = document.createElement('img');
        img.src = name;
        card.appendChild(img);
        targetDiv.appendChild(card);
        console.log(card);
    }

};


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

