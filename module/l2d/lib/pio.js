/* ----

# Pio Plugin
# By: Dreamer-Paul
# Modify: journey-ad
# ko : chiroya
# Last Update: 2024.11

---- */
var Paul_Pio = function (prop) {
    var that = this;

    var current = {
        menu: document.querySelector(".pio-container .pio-action"),
        canvas: document.getElementById("pio"),
        body: document.querySelector(".pio-container"),
        root: document.location.protocol + '//' + document.location.hostname + '/'
    };

    /* - 모듈 */
    var modules = {

        // 내용 만들기
        create: function (tag, prop) {
            var e = document.createElement(tag);
            if (prop.class) e.className = prop.class;
            return e;
        },
        // 랜덤 내용
        rand: function (arr) {
            return arr[Math.floor(Math.random() * arr.length + 1) - 1];
        },
        // 대화 상자 생성
        render: function (text) {
            if (text.constructor === Array) {
                dialog.innerHTML = modules.rand(text);
            }
            else if (text.constructor === String) {
                dialog.innerHTML = text;
            }
            else {
                dialog.innerHTML = "입력된 내용에 문제가 있습니다 X_X";
            }

            dialog.classList.add("active");

            clearTimeout(this.t);
            this.t = setTimeout(function () {
                dialog.classList.remove("active");
            }, 3000);
        },
        // 제거
        destroy: function () {
            that.initHidden();
            localStorage.removeItem("posterGirl"); // posterGirl 값을 삭제해 새로고침 시 다시 표시되도록 수정
        },
        // 모바일 장치 여부
        isMobile: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            ua = ua.indexOf("mobile") || ua.indexOf("android") || ua.indexOf("ios");

            return window.innerWidth < 500 || ua !== -1;
        }
    };
    this.modules = modules;
    this.destroy = modules.destroy;

    var elements = {
        home: modules.create("span", { class: "pio-home" }),
        skin: modules.create("span", { class: "pio-skin" }),
        info: modules.create("span", { class: "pio-info" }),
        night: modules.create("span", { class: "pio-night" }),
        close: modules.create("span", { class: "pio-close" }),

        show: modules.create("div", { class: "pio-show" })
    };

    var dialog = modules.create("div", { class: "pio-dialog" });
    current.body.appendChild(dialog);
    current.body.appendChild(elements.show);

    /* - 조작 */
    var action = {
        welcome: function () {
            if (document.referrer !== "" && document.referrer.indexOf(current.root) === -1) {
                var referrer = document.createElement('a');
                referrer.href = document.referrer;
                prop.content.referer ? modules.render(prop.content.referer.replace(/%t/, "“" + referrer.hostname + "”")) : modules.render("어서오세요! “" + referrer.hostname + "” 환경에서 <br> 구동 중입니다.");
            }
            else if (prop.tips) {
                var text, hour = new Date().getHours();
                if (hour > 1 && hour <= 5) text = '밤이 늦었는데 아직도 안 주무시구...';
                else if (hour > 6 && hour <= 8) text = '좋은 아침이에요! <br> 부지런하시네요∼';
                else if (hour > 9 && hour <= 11) text = '오전 일과 화이팅! <br> 졸리면 커피 한 잔 어떠세요?';
                else if (hour > 11 && hour <= 14) text = '점심 시간이네요∼ <br> 점심 맛있게 드세요!';
                else if (hour > 14 && hour <= 17) text = '오후 일과 화이팅! <br> 피곤하면 스트레칭 어떠세요?';
                else if (hour > 17 && hour <= 19) text = '오늘도 고생하셨어요! <br> 저녁식사 맛있게 하세요∼';
                else if (hour > 19 && hour <= 22) text = '저녁은 맛있게 드셨나요? <br> 푹 쉬세요∼';
                else if (hour > 22 && hour <= 0) text = '오늘도 이만, 안녕히 주무세요∼';
                else text = "후아암∼";
                modules.render(text);
            } else {
                modules.render(prop.content.welcome || "어서오세요∼");
            }
        },
        // 터치 시 대사
        touch: function () {
            current.canvas.onclick = function () {
                modules.render(prop.content.touch || ["지금 어딜 만지시는건가요", "자꾸 그러면 화낼거에요?", "만지지 마세요!"]);
            };
        },
        // 측면 버튼
        buttons: function () {

            // About Me
            elements.info.onclick = function () {
                window.open(prop.content.link);
            };
            elements.info.onmouseover = function () {
                modules.render("저에 대해 알고 싶으신 건가요?");
            };
            current.menu.appendChild(elements.info);

            // 야간 모드(dark mode)
            if (prop.night) {
                elements.night.onclick = function () {
                    eval(prop.night);
                };
                elements.night.onmouseover = function () {
                    modules.render("밤에는 여길 눌러서 눈을 보호하세요∼");
                };
                current.menu.appendChild(elements.night);
            }

            // 모델 닫기
            elements.close.onclick = function () {
                modules.destroy();
            };
            elements.close.onmouseover = function () {
                modules.render(prop.content.close || "다음에 또 만나요∼");
            };
            current.menu.appendChild(elements.close);
        },

        // 버튼 부분에 마우스 액션 메시지 출력
        customButtons: function () {
            var bmc_Btn = document.getElementById("donate");
            var gh_Btn = document.getElementById("github");
            var yt_Btn = document.getElementById("youtube");
            var twt_Btn = document.getElementById("twitter");
            var chat_Btn = document.getElementById("chat-page");
            var send_Btn = document.getElementById("form-send");
            var top_Btn = document.getElementById("pg-top");
            var glr_Btn = document.getElementById("glr");

        
            if (bmc_Btn) {
                bmc_Btn.onmouseover = function () {
                    modules.render("딸기, 사주시는 건가요? 고맙습니다∼♡");
                };
            }
            if (gh_Btn) {
                gh_Btn.onmouseover = function () {
                    modules.render("저의 GitHub로 이동하시겠어요?");
                };
            }
            if (yt_Btn) {
                yt_Btn.onmouseover = function () {
                    modules.render("저의 YouTube로 이동하시겠어요?");
                };
            }
            if (twt_Btn) {
                twt_Btn.onmouseover = function () {
                    modules.render("저의 Twitter로 이동하시겠어요?");
                };
            }
            if (chat_Btn) {
                chat_Btn.onmouseover = function () {
                    modules.render("저와 함께 이야기 하러 가실래요?");
                };
            }
            if (send_Btn) {
                send_Btn.onclick = function () {
                    modules.render("죄송하지만, 아직 사용할 수 없습니다.");
                };
            }
            if (top_Btn) {
                top_Btn.onmouseover = function () {
                    modules.render("꼭대기로 올라갈게요∼");
                };
            }
            if (glr_Btn) {
                glr_Btn.onmouseover = function () {
                    modules.render("같이 그림 구경하러 가실래요?");
                };
            }
        },


        custom: function () {
            prop.content.custom.forEach(function (t) {
            });
        }
    };

    /* - serving */
    var begin = {
        static: function () {
            current.body.classList.add("static");
        },
        fixed: function () {
            action.touch(); action.buttons(); action.customButtons();
        },
        draggable: function () {
            action.touch(); action.buttons(); action.customButtons();

            var body = current.body;
            body.onmousedown = function (downEvent) {
                var location = {
                    x: downEvent.clientX - this.offsetLeft,
                    y: downEvent.clientY - this.offsetTop
                };

                function move(moveEvent) {
                    body.classList.add("active");
                    body.classList.remove("right");
                    body.style.left = (moveEvent.clientX - location.x) + 'px';
                    body.style.top = (moveEvent.clientY - location.y) + 'px';
                    body.style.bottom = "auto";
                }

                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", function () {
                    body.classList.remove("active");
                    document.removeEventListener("mousemove", move);
                });
            };
        }
    };

    // serving
    this.init = function (onlyText) {
        if (!(prop.hidden && modules.isMobile())) {
            if (!onlyText) {
                action.welcome();
                that.model = loadlive2d("pio", prop.model[0], model => {
                    prop.onModelLoad && prop.onModelLoad(model);
                });
            }
            switch (prop.mode) {
                case "static": begin.static(); break;
                case "fixed": begin.fixed(); break;
                case "draggable": begin.draggable(); break;
            }
            if (prop.content.custom) action.custom();
        }
    };

    // 상태 숨기기
    this.initHidden = function () {
        current.body.classList.add("hidden");
        dialog.classList.remove("active");

        elements.show.onclick = function () {
            current.body.classList.remove("hidden");
            that.init();
        };
    };

    // 처음 방문 시 모델이 표시되도록 초기 설정
    if (!localStorage.getItem("posterGirl")) {
        // 처음 방문이므로 모델을 표시하고, localStorage에 값 설정
        this.init();
        localStorage.setItem("posterGirl", "1"); // 첫 방문을 표시하기 위해 설정
    } else if (localStorage.getItem("posterGirl") == "0") {
        // 이미 방문했고 posterGirl 값이 0이면 모델 숨기기
        this.initHidden();
    } else {
        // 그 외 경우 (값이 1일 경우)에는 모델을 표시
        this.init();
    }

};

