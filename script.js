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
        this.animationRunning = false;
        
        this.correctMessages = [
            "Então você sabe se todos os números são impar ou pares de cabeça?",
            "Uau! Você deve ter decorado a tabuada toda!",
            "Nossa, você é tipo um gênio da matemática! Mais um aqui:",
            "Impressionante! Eu ainda conto nos dedos... Vamos tentar outro:",
            "Que incrível! Eu sempre confundo esses números... Mais um:",
            "Poxa! Você é melhor que minha calculadora!"
        ];
        
        this.wrongMessages = [
            "Você já ganhou algum par ou impar na sua vida?",
            "beleza 120 é impar ou par então???",
            "Eu fico confuso quando termina com 7, 8 ou 9",
            "Pois é... eu também erro quando o número é muito grande",
            "É difícil mesmo! Eu sempre esqueço se 2 é par ou ímpar",
            "Eu tenho que contar nos dedos sempre",
            "Esses números me confundem também! Principalmente os que terminam em 0",
            "É mesmo! Eu nunca lembro se 1 é par... ou era ímpar?",
            "Os números que começam com 4 são os mais difíceis",
            "Também erro sempre! Principalmente quando tem 5 no meio",
            "Primeiro que esse número nem existe! Como você quer que eu saiba?",
        ];
        
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
        const randomMessage = this.correctMessages[Math.floor(Math.random() * this.correctMessages.length)];
        this.message.textContent = randomMessage;
        this.message.classList.add('show');
        this.numberDisplay.classList.add('pulse');
        
        this.createFireworks();
        
        setTimeout(() => {
            this.generateNewNumber();
            this.numberDisplay.classList.remove('pulse');
        }, 3000);
    }
    
    showWrongAnswer() {
        const randomMessage = this.wrongMessages[Math.floor(Math.random() * this.wrongMessages.length)];
        this.message.textContent = randomMessage;
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
        
        // Always ensure animation is running
        this.ensureAnimationRunning();
    }
    
    ensureAnimationRunning() {
        if (!this.animationRunning) {
            this.animationRunning = true;
            this.animateFireworks();
        }
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
        
        // Ensure animation keeps running when new fireworks are added
        this.ensureAnimationRunning();
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
        } else {
            this.animationRunning = false;
        }
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new IsEvenGame();
});