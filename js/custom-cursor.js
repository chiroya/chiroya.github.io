/*!
 * Fairy Dust Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- https://codepen.io/tholman/full/jWmZxZ/
 */

(function fairyDustCursor() {
    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"];
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = { x: width / 2, y: height / 2 }; // 수정된 좌표
    var particles = [];
    var lastParticleTime = 0; // 마지막 입자 생성 시간
    var particleInterval = 100; // 입자 생성 간격 (ms)

    function init() {
        createInitialParticle(); // 페이지 로드 시 초기 입자 생성
        bindEvents();
        loop();
    }

    // 페이지 로드 시 초기 입자 생성
    function createInitialParticle() {
        addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
    }

    // Bind events that are needed
    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);

        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            for (var i = 0; i < e.touches.length; i++) {
                addParticle(
                    e.touches[i].clientX,
                    e.touches[i].clientY,
                    possibleColors[Math.floor(Math.random() * possibleColors.length)]
                );
            }
        }
    }

    function onMouseMove(e) {
        var currentTime = Date.now();
        if (currentTime - lastParticleTime > particleInterval) {
            cursor.x = e.clientX;
            cursor.y = e.clientY;

            addParticle(
                cursor.x,
                cursor.y,
                possibleColors[Math.floor(Math.random() * possibleColors.length)]
            );

            lastParticleTime = currentTime; // 마지막 입자 생성 시간 업데이트
        }
    }

    function addParticle(x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
    }

    function updateParticles() {
        // Updated
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        // Remove dead particles
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

    /**
     * Particles
     */

    function Particle() {
        this.character = "*";
        this.lifeSpan = 300; // 지속 시간 (ms)
        this.initialStyles = {
            "position": "absolute",
            "display": "block",
            "pointerEvents": "none",
            "z-index": "10000000",
            "fontSize": "24px", // 크기 조정
            "will-change": "transform"
        };

        // Init, and set properties
        this.init = function(x, y, color) {
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };

            this.position = { x: x - 298, y: y + 12 }; // 200px 왼쪽으로 이동
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
        }

        this.die = function() {
            this.element.parentNode.removeChild(this.element);
        }
    }

    /**
     * Utils
     */

    // Applies css `properties` to an element.
    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    init();
})();
