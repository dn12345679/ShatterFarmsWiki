import './infocard.js';


/* given a path to a readable JSON and a function to callback to */
function get_table(pathjson, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', pathjson, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data.table);
        }   
    }
    xhr.send();
};

/*
    img_folder = path to folder of images
    t_id = table id for appending
    pathjson = JSON data path, information to be loaded, IMPORTANT: must have columns of JSON file and headers to display for each category
    placeholder = true/false if it is using the default icon or not
*/
function loadIcons(img_folder, t_id, pathjson, sortBy) {



    let tableCultives = get_table(pathjson, function(table) {
        createCards(img_folder, t_id, table, sortBy);
    } );   
    
   
    

}

function createCards(icon_folder, t_id, table_data, sortBy) {
    const targetDiv = document.querySelector("#" + t_id);
    targetDiv.innerHTML = '';
    
    // 3 categories
    const sortByCategory = Array.from({ length: 3 }, () => []);
    // 4 rarities
    const sortByRarity = Array.from({length: 4}, () => []);

    const table_rarities = table_data.map(item => item.rarity);
    for (let i = 0; i < table_data.length; i++) {
        const card = document.createElement('info-card');
        card.setAttribute('fontpath', '/Assets/Font/Blackcraft.ttf');
        card.setAttribute('icon', get_icon_string(icon_folder, table_data[i].genesisName));
        card.setAttribute('text', table_data[i].genesisName);
        card.setAttribute('rarity', table_data[i].rarity);
        card.setAttribute('category', table_data[i].category);
        card.setAttribute('description', table_data[i].description);
        
        const idx = choose_chain_indices(table_data[i].rarity, table_data[i].category );

        sortByCategory[idx[1]].push(card);
        sortByRarity[idx[0]].push(card);

    }

    switch (sortBy) {
        case "rarity":
            for( let i = 0; i < sortByRarity.length; i++) {
                for(let j = 0 ; j < sortByRarity[i].length; j++) {
                    targetDiv.appendChild(sortByRarity[i][j]);
                }
            }
            break;
        case "category":
            for (let i = 0; i < sortByCategory.length; i++) {
                for (let j = 0;j < sortByCategory[i].length; j++) {
                    targetDiv.appendChild(sortByCategory[i][j]);
                }
                
            }
            break;
    } 
    
    

}

function choose_chain_indices(rarity, category) {
    let r_idx;
    let c_idx;
    switch (rarity.toLowerCase()) {
        case "rudimentary":
            r_idx = 0;
            break;
        case "developed":
            r_idx = 1;
            break;
        case "perfected":
            r_idx = 2;
            break;
        case "calamity":
            r_idx = 3;
            break;
    }
    switch (category.toLowerCase()) {
        case "cactus":
            c_idx = 0;
            break;
        case "fungus":
            c_idx = 1;
            break;
        case "lotus":
            c_idx = 2;
            break;
    }
    return [r_idx, c_idx]
}

function get_icon_string(folder, name) {
    if (folder === "") {
        return '/Assets/Icons/CultiveIcons/Question.webp'; // default
    }
    else {
        return folder + name.replace(/ /g,'').trim(); // trimmed and removed white space for syntax
    }
}




export { loadIcons };