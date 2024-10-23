(function fairyDustCursor() {
    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"];
    var particles = [];
    var lastParticleTime = 0;
    var particleInterval = 100;

    // 기준 위치 (100%에서의 오른쪽 위치)
    var baseOffsetX = 300; // 100% 확대 시 300px 위치
    var scale = 1; // 현재 확대 비율

    function init() {
        createInitialParticle();
        bindEvents();
        loop();
    }

    function createInitialParticle() {
        addParticle(getFixedX(window.innerWidth / 2), window.innerHeight / 2, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
    }

    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);
        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        createInitialParticle(); // 리사이즈 시 입자 재생성
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            for (var i = 0; i < e.touches.length; i++) {
                addParticle(
                    getFixedX(e.touches[i].clientX),
                    e.touches[i].clientY,
                    possibleColors[Math.floor(Math.random() * possibleColors.length)]
                );
            }
        }
    }

    function onMouseMove(e) {
        var currentTime = Date.now();
        if (currentTime - lastParticleTime > particleInterval) {
            addParticle(
                getFixedX(e.clientX),
                e.clientY,
                possibleColors[Math.floor(Math.random() * possibleColors.length)]
            );
            lastParticleTime = currentTime;
        }
    }

    // 현재 확대 비율에 따른 고정된 X 위치 계산
    function getFixedX(x) {
        return x + (baseOffsetX * scale); // 고정된 오프셋 계산
    }

    function addParticle(x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
    }

    function updateParticles() {
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles[i].die();
                particles.splice(i, 1);
            }
        }
    }

    function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }

    function Particle() {
        this.character = "*";
        this.lifeSpan = 300;
        this.initialStyles = {
            "position": "absolute",
            "display": "block",
            "pointerEvents": "none",
            "z-index": "10000000",
            "fontSize": "24px",
            "will-change": "transform"
        };

        this.init = function(x, y, color) {
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };

            this.position = { x: x - 640, y: y };
            this.initialStyles.color = color;

            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update();

            document.querySelector('.container').appendChild(this.element);
        };

        this.update = function() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 300) + ")";
        };

        this.die = function() {
            this.element.parentNode.removeChild(this.element);
        };
    }

    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    // 확대 비율 계산
    function updateScale() {
        scale = window.devicePixelRatio; // 브라우저의 확대 비율을 가져옴
    }

    updateScale(); // 초기화 시 확대 비율 설정
    init();
})();
