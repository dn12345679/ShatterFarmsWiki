class InfoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
   
    connectedCallback() {
        const fontPath = this.getAttribute('fontpath') || 'default-font.ttf';
        const icon = this.getAttribute('icon') || 'default-icon.png';
        const text = this.getAttribute('text') || 'Default text';
       
        this.shadowRoot.innerHTML = `
            <style>
            @font-face {
                font-family: 'CustomFont';
                src: url(${fontPath});
            }
            
            :host {
                display: block;
                grid-column: span 1;
                grid-row: span 1;
                transition: all 0.3s ease;
            }
            
            :host(:hover) {
                grid-column: span 2;
                grid-row: span 2;   
                z-index: 10;
            }
               
            .card {
                width: 100%;
                height: 100%;

                border-radius: 8px;
                color: black;
                background-color: white;
                border: 2px solid #333;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                
                padding: 8px;
                box-sizing: border-box;
                cursor: pointer;
                transform-style: preserve-3d;
                transition: all 0.3s ease;
            }
           
            .card:hover {
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                background-color: #f0f0f0;

            }
            
            .card-face {
                position: absolute;
                display: flex;

                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;

                border-radius: 8px;
                color: black;
                background-color: white;
                border: 2px solid #333;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 8px;
                box-sizing: border-box;
            }
            
            .card.flipped {
                transform: rotateY(180deg);
            }
            
            .card-front {
                /* no changes needed */
            }
            
            .card-back {
                transform: rotateY(180deg);
            }
           
            img {
                width: min(32px, 30%);
                height: min(32px, 30%);
                margin-bottom: 8px;
                object-fit: contain;
                pointer-events: none;
            }
           
            span {
                font-size: clamp(8px, 1.5vw, 14px);
                text-align: center;
                font-family: 'CustomFont', sans-serif;
                word-break: break-word;
                pointer-events: none;
                padding: 8px;
            }
            </style>
            <div class="card" onclick="this.classList.toggle('flipped')">
                <div class="card-face card-front">
                    <img src="${icon}" alt="icon">
                    <span>${text}</span>
                </div>
                <div class="card-face card-back">
                    <img src="${icon}" alt="icon">
                    <span>This is the backside of the card with more info</span>
                </div>
            </div>
        `;
    }
}
customElements.define('info-card', InfoCard);