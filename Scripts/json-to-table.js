
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


document.addEventListener('DOMContentLoaded', function () {
    loadData("../Data/crop-table.json", "crop-table", 0);
    loadData("../Data/artifact-table.json", "artifact-table", 1);
});