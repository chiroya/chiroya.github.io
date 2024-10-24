class Particle {
    constructor(x, y, color) {
        this.character = "*";
        this.lifeSpan = 300;
        this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1
        };
        this.position = { 
            x: x + window.pageXOffset,
            y: y + window.pageYOffset
        };
        this.color = color;
        this.element = this.createElement();
        this.updateStyles();
        document.body.appendChild(this.element);
    }

    createElement() {
        const span = document.createElement('span');
        span.innerHTML = this.character;
        span.style.position = "fixed";
        span.style.display = "block";
        span.style.pointerEvents = "none";
        span.style.zIndex = "10000000";
        span.style.fontSize = "2vw"; // 입자크기 설정
        span.style.willChange = "transform";
        span.style.color = this.color;
        return span;
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
        
        const viewportX = this.position.x - window.pageXOffset;
        const viewportY = this.position.y - window.pageYOffset;
        
        this.element.style.transform = `translate3d(${viewportX}px, ${viewportY}px, 0) scale(${this.lifeSpan / 300})`;
    }

    die() {
        this.element.remove();
    }

    updateStyles() {
        const viewportX = this.position.x - window.pageXOffset;
        const viewportY = this.position.y - window.pageYOffset;
        
        this.element.style.left = "0px";
        this.element.style.top = "0px";
        this.element.style.transform = `translate3d(${viewportX}px, ${viewportY}px, 0)`;
    }
}

class FairyDustCursor {
    constructor() {
        this.particles = [];
        this.lastParticleTime = 0;
        this.particleInterval = 100;
        this.colors = ["#D61C59", "#E7D84B", "#1B8798"];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loop();
    }

    bindEvents() {
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('touchmove', this.onTouchMove.bind(this));
        document.addEventListener('touchstart', this.onTouchMove.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    getRelativePosition(clientX, clientY) {
        const scale = window.visualViewport ? window.visualViewport.scale : 1;
        const vhToPx = window.innerHeight / 100;
        const vwToPx = window.innerWidth / 100;
        
        return {
            x: (clientX + (2.5 * vwToPx)) / scale,      // 입자 위치 설정 : 2.5%만큼 오른쪽, 6.5%만큼 아래쪽
            y: (clientY + (6.5 * vhToPx)) / scale
        };
    }

    onMouseMove(e) {
        const currentTime = Date.now();
        if (currentTime - this.lastParticleTime > this.particleInterval) {
            const pos = this.getRelativePosition(e.clientX, e.clientY);
            this.addParticle(pos.x, pos.y);
            this.lastParticleTime = currentTime;
        }
    }

    onTouchMove(e) {
        if (e.touches.length > 0) {
            for (let i = 0; i < e.touches.length; i++) {
                const pos = this.getRelativePosition(e.touches[i].clientX, e.touches[i].clientY);
                this.addParticle(pos.x, pos.y);
            }
        }
    }

    onWindowResize() {
        this.particles.forEach(particle => particle.updateStyles());
    }

    onScroll() {
        this.particles.forEach(particle => particle.updateStyles());
    }

    addParticle(x, y) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const particle = new Particle(x, y, color);
        this.particles.push(particle);
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            if (particle.lifeSpan < 0) {
                particle.die();
                this.particles.splice(i, 1);
            }
        }
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.updateParticles();
    }
}

// 초기화
new FairyDustCursor();