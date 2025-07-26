class IsEvenGame {
    constructor() {
        this.numberDisplay = document.getElementById('numberDisplay');
        this.evenBtn = document.getElementById('evenBtn');
        this.oddBtn = document.getElementById('oddBtn');
        this.message = document.getElementById('message');
        this.fireworksCanvas = document.getElementById('fireworks');
        this.ctx = this.fireworksCanvas.getContext('2d');
        
        this.currentNumber = 0;
        this.fireworks = [];
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.generateNewNumber();
        this.evenBtn.addEventListener('click', () => this.handleAnswer(true));
        this.oddBtn.addEventListener('click', () => this.handleAnswer(false));
    }
    
    setupCanvas() {
        this.fireworksCanvas.width = window.innerWidth;
        this.fireworksCanvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.fireworksCanvas.width = window.innerWidth;
            this.fireworksCanvas.height = window.innerHeight;
        });
    }
    
    generateNewNumber() {
        this.currentNumber = Math.floor(Math.random() * 1000) + 1;
        this.numberDisplay.textContent = this.currentNumber;
        this.message.classList.remove('show');
        this.message.textContent = '';
    }
    
    isEven(number) {
        return number % 2 === 0;
    }
    
    handleAnswer(userSaysEven) {
        const actuallyEven = this.isEven(this.currentNumber);
        const isCorrect = userSaysEven === actuallyEven;
        
        if (isCorrect) {
            this.showCorrectAnswer();
        } else {
            this.showWrongAnswer();
        }
    }
    
    showCorrectAnswer() {
        this.message.textContent = "Então você sabe se todos os números são impar ou pares de cabeça? Vamos ver o próximo";
        this.message.classList.add('show');
        this.numberDisplay.classList.add('pulse');
        
        this.createFireworks();
        
        setTimeout(() => {
            this.generateNewNumber();
            this.numberDisplay.classList.remove('pulse');
        }, 3000);
    }
    
    showWrongAnswer() {
        this.message.textContent = "Eu fico confuso quando termina com 7, 8 ou 9";
        this.message.classList.add('show');
        this.numberDisplay.classList.add('shake');
        
        setTimeout(() => {
            this.numberDisplay.classList.remove('shake');
        }, 500);
    }
    
    createFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.addFirework();
            }, i * 200);
        }
        this.animateFireworks();
    }
    
    addFirework() {
        const x = Math.random() * this.fireworksCanvas.width;
        const y = Math.random() * this.fireworksCanvas.height * 0.7 + this.fireworksCanvas.height * 0.1;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const particles = [];
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                color: color
            });
        }
        
        this.fireworks.push(...particles);
    }
    
    animateFireworks() {
        this.ctx.clearRect(0, 0, this.fireworksCanvas.width, this.fireworksCanvas.height);
        
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const particle = this.fireworks[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.fireworks.splice(i, 1);
                continue;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
        
        if (this.fireworks.length > 0) {
            requestAnimationFrame(() => this.animateFireworks());
        }
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new IsEvenGame();
});