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

function loadDescription(description) {
    let text_element = document.querySelector('.item-description');
    text_element.textContent = description || 'default';
}

export {loadDescription }