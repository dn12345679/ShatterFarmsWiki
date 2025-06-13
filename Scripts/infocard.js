
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
                transition: all 0.3s ease;
            }
            
            .card:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                z-index: 10;
                background-color: #f0f0f0;
            }
            
            img {
                width: min(32px, 30%);
                height: min(32px, 30%);
                margin-bottom: 8px;
                object-fit: contain;
            }
            
            span {
                font-size: clamp(8px, 1.5vw, 14px);
                text-align: center;
                font-family: 'CustomFont', sans-serif;
                word-break: break-word;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                pointer-events: none;
            }
            </style>
            <div class="card">
                <img src="${icon}" alt="icon">
                <span>${text}</span>
            </div>
        `;
    }
}

customElements.define('info-card', InfoCard);