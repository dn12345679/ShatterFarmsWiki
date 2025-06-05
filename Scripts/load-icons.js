

// TEMPORARY DOES NOT WORK. WORKING ON FUNCTIONALITY FIRST
var names;

function loadData(path, tclass, pathjson = -1) {
    
    get_names(pathjson);

    const targetDiv = document.querySelector("." + tclass);
    const table = document.createElement('table');
    table.id = "content-font";
    table.className = "icon-table";
    
    // TODO: fetch icons from .json, then open them by name:

    for (let i = 0; i < 40; i++) {
        const name = path + "/Question.webp"
        const img = document.createElement('img');
        img.src = name;
        table.appendChild(img)
    }

    
    

    targetDiv.appendChild(table);
        

};


function get_names(pathjson){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onload = function() {

        if (xhr.status === 200) {

            const data = JSON.parse(xhr.responseText);
            names = data.map(item => item.genesisName); 
            
        }
    }
    xhr.send();
    
};


document.addEventListener('DOMContentLoaded', function () {
    loadData("../Assets/Icons/CultiveIcons", "icon-grid", "../Data/crop-table.json");

});