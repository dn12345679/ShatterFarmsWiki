const mapInner = document.querySelector('.map-inner');
const mapContainer = document.querySelector('.map-container');
let isDragging = false;
let startX, startY, currentX = 0, currentY = 0;
let currZoom = 1;
const minZoom = 0.6;
const maxZoom = 1.5;
const zoomStep = 0.05;
const mWidth = 4226;
const mHeight = 3450;

// Initialize map position
function initMapPosition() {
    currentX = (mapContainer.offsetWidth - mWidth) / 2;
    currentY = (mapContainer.offsetHeight - mHeight) / 2;
    updateTransform();
}
initMapPosition();

// Get boundaries for dragging
function getBoundaries() {
    const containerWidth = mapContainer.offsetWidth;
    const containerHeight = mapContainer.offsetHeight;
    const scaledMapWidth = mWidth * currZoom;
    const scaledMapHeight = mHeight * currZoom;
    
    return {
        minX: Math.min(0, containerWidth - scaledMapWidth),
        maxX: Math.max(0, containerWidth - scaledMapWidth),
        minY: Math.min(0, containerHeight - scaledMapHeight),
        maxY: Math.max(0, containerHeight - scaledMapHeight)
    };
}

// Constrain position within boundaries
function constrainPosition(x, y) {
    const bounds = getBoundaries();
    return {
        x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
        y: Math.max(bounds.minY, Math.min(bounds.maxY, y))
    };
}

// Update transform style
function updateTransform() {
    const constrained = constrainPosition(currentX, currentY);
    currentX = constrained.x;
    currentY = constrained.y;
    mapInner.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currZoom})`;
}

// Zoom handler
mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const rect = mapContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate mouse position relative to map
    const mapX = (mouseX - currentX) / currZoom;
    const mapY = (mouseY - currentY) / currZoom;
    
    // Zoom direction
    const zoomDirection = e.deltaY > 0 ? -1 : 1;
    const newZoom = Math.min(Math.max(currZoom + (zoomDirection * zoomStep), minZoom), maxZoom);
    
    if (newZoom !== currZoom) {
        // Calculate new position to keep mouse point stable
        currZoom = newZoom;
        currentX = mouseX - mapX * currZoom;
        currentY = mouseY - mapY * currZoom;
        updateTransform();
    }
});

// Drag handlers
mapContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    mapContainer.style.cursor = 'grabbing';

});

mapContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - startX;
    const newY = e.clientY - startY;
    
    const constrained = constrainPosition(newX, newY);
    currentX = constrained.x;
    currentY = constrained.y;
    updateTransform();
});

mapContainer.addEventListener('mouseup', () => {
    isDragging = false;
    mapContainer.style.cursor = 'grab';
});

mapContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    mapContainer.style.cursor = 'grab';
});

// Prevent default behaviors
mapContainer.addEventListener('dragstart', (e) => e.preventDefault());
mapContainer.addEventListener('selectstart', (e) => e.preventDefault());

// Handle window resize
window.addEventListener('resize', initMapPosition);









// LINE DRAWING


function getElementCenter(element) {
    const rect = element.getBoundingClientRect();
    const containerRect = element.offsetParent.getBoundingClientRect();

    return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
    };
}

function drawLineBetween(element1, element2) {
    const svg = document.getElementById('lineSvg');
    const pos1 = getElementCenter(element1);
    const pos2 = getElementCenter(element2);
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', pos1.x);
    line.setAttribute('y1', pos1.y);
    line.setAttribute('x2', pos2.x);
    line.setAttribute('y2', pos2.y);
    line.setAttribute('class', 'connection-line');
    
    svg.appendChild(line);
}

function drawLineBetweenLocations(location1, location2) {
    const element1 = document.querySelector(`[data-location="${location1}"]`);
    const element2 = document.querySelector(`[data-location="${location2}"]`);
    
    if (element1 && element2) {
        drawLineBetween(element1, element2);
    }
}

function drawAllLines() {
    
    clearLines();
    
    drawLineBetweenLocations('city1', 'city2');
    drawLineBetweenLocations('city1', 'city3');
    drawLineBetweenLocations('city2', 'city3');
}

function clearLines() {
    const svg = document.getElementById('lineSvg');
    svg.innerHTML = '';
}

window.addEventListener('resize', drawAllLines);

drawAllLines();