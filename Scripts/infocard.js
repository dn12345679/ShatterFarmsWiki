class InfoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    extractRarityColor(rarity) {
        switch (rarity){
            case 'rudimentary':
                return '#c4c4c4';
            case 'developed':
                return '#f5ff69';
            case 'perfected':
                return '#d67513';
            case 'calamity':
                return '#fa282f';
        }
    }
   
    connectedCallback() {
        const fontPath = this.getAttribute('fontpath') || 'default-font.ttf';
        const icon = this.getAttribute('icon') || 'default-icon.png';
        const text = this.getAttribute('text') || 'Default text';
        const rarity = this.getAttribute('rarity') || 'rudimentary';
       
        this.shadowRoot.innerHTML = `
            <style>
            @font-face {
                font-family: 'CustomFont';
                src: url(${fontPath});
            }
               
            .card {
                width: 22dvmin;
                height: 15dvmax;

                border-radius: 8px;
                color: black;
                
                background-color: ${this.extractRarityColor(rarity)};
                border: 2px solid #333;
                opacity: 0.9;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                
                padding: 8px;
                box-sizing: border-box;
                cursor: pointer;

                transition: all 0.3s ease;
            }
           
            .card:hover {
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                opacity: 1;
                transform: scale(1.2);
            }
            
            .card-face {
                display: flex;

                justify-content: center;
                align-items: center;
                width: 20dvmin;
                height: 15dvmax;

                border-radius: 8px;
                color: black;
                background-color: white;
                border: 2px solid #333;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                
                
            }
            
            
           
            img {
                width: 1dvmin;
                height: 10dvmin;
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
            <div class="card">
                <div class="card-face">
                    <img src="${icon}" alt="icon">
                    <span>${text}</span>
                </div>
            </div>
        `;
    }
}
customElements.define('info-card', InfoCard);