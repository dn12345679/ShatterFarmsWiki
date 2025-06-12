
const header_list = [
    [
        'Crop ID', 
        'Genesis Name', 
        'Rarity', 
        'Category', 
        'Cultives Ability', 
        'Attribute Value', 
        'Description'
    ],
    [
        'Artifact ID',
        'Artifact Name',
        'Rarity',
        'Weapon Type',
        'Ability Description' 
    ]
]

const column_list = [
    [
        'cropID',
        'genesisName',
        'rarity',
        'category',
        'cultivesAbility',
        'attributeValue',
        'description'
    ],
    [
        'artifactID',
        'artifactName',
        'rarity',
        'type',
        'description'
    ]
];

/*
    path = JSON data path, information to be loaded, IMPORTANT: must have columns of JSON file and headers to display for each category
    tclass = table class for styling
    index = index of header/column in the arrays above. Must match JSON 
*/
function loadData(path, tclass, index) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onload = function() {

        if (xhr.status === 200) {

            const data = JSON.parse(xhr.responseText);

            const targetDiv = document.querySelector("." + tclass);
            const table = document.createElement('table');
            table.id = "content-font";
            table.className = "item-table";
        
            const headerRow = document.createElement('tr');
            headerRow.className = 'content-text item-table-header-row';
            
            const headers = header_list[index];
              headers.forEach(headerText => {
                const th = document.createElement('td');
                th.textContent = headerText;
                headerRow.appendChild(th);
              });
              
              table.appendChild(headerRow);
              
            
            data.table.forEach(obj => {
                const row = document.createElement('tr');
                row.className = 'content-text item-table-main-row';
                
                column_list[index].forEach(key => {
                    const td = document.createElement('td');
                    td.classList.add("card");
                    td.textContent = obj[key] || '';
                    row.appendChild(td);
                });
                table.appendChild(row);
            });
        

            targetDiv.appendChild(table);
        }
    }
    xhr.send();
};
