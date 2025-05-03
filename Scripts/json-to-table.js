

function loadData(path, tclass) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onload = function() {
        console.log("okay");
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            console.log(tclass);
            const targetDiv = document.querySelector("." + tclass);
            const table = document.createElement('table');
            table.id = "content-font";
            table.className = "item-table";
        
            const headerRow = document.createElement('tr');
            headerRow.className = 'content-text item-table-header-row';
            
            const headers = [
                'Crop ID', 
                'Genesis Name', 
                'Rarity', 
                'Category', 
                'Cultives Ability', 
                'Attribute Value', 
                'Description'
              ];
              headers.forEach(headerText => {
                const th = document.createElement('td');
                th.textContent = headerText;
                headerRow.appendChild(th);
              });
              
              table.appendChild(headerRow);
              
        
            data.crops.forEach(obj => {
                const row = document.createElement('tr');
                row.className = 'content-text item-table-main-row';
                
                [
                    obj.cropID,
                    obj.genesisName,
                    obj.rarity,
                    obj.category,
                    obj.cultivesAbility,
                    obj.attributeValue,
                    obj.description
                ].forEach(cellText => {
                    const td = document.createElement('td');
                        td.textContent = cellText || '';
                        row.appendChild(td);
                });
                table.appendChild(row);
            });
        

            targetDiv.appendChild(table);
        }
    }
    xhr.send();
};


document.addEventListener('DOMContentLoaded', loadData("../Data/crop-table.json", "crop-table"));