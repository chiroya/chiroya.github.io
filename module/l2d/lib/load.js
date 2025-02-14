var linkers = [
  "https://github.com/chiroya/chiroya.github.io"
]

const initConfig = {
  mode: "fixed",
  hidden: true,
  content: {
    link: linkers[Math.floor(Math.random() * linkers.length)],
    welcome: ["어서오세요!"],
    touch: "",
    skin: ["잠깐 어디 좀 다녀올게요∼"],
    custom: [
      { "selector": ".comment-form", "text": "Content Tooltip" },
      { "selector": ".home-social a:last-child", "text": "Blog Tooltip" },
      { "selector": ".list .postname", "type": "read" },
      { "selector": ".post-content a, .page-content a, .post a", "type": "link" }
    ],
  },
  night: "toggleNightMode()",
  model: [
    "module/l2d/Diana/Diana.model3.json",
  ],
  tips: true,
  onModelLoad: onModelLoad
}

// 야간 모드 전환
function toggleNightMode() {
  document.body.classList.toggle("night-mode");
}

function loadKaren() {
  pio_reference = new Paul_Pio(initConfig)
  pio_alignment = "left"
  pio_refresh_style()
}

function onModelLoad(model) {
  const container = document.getElementById("pio-container")
  const canvas = document.getElementById("pio")
  const modelName = model.internalModel.settings.name
  const coreModel = model.internalModel.coreModel
  const motionManager = model.internalModel.motionManager

  let touchList = [
    {
      text: "点击展示文本1",
      motion: "Idle"
    },
    {
      text: "点击展示文本2",
      motion: "Idle"
    }
  ]

  function playAction(action) {
    action.text && pio_reference.modules.render(action.text)
    action.motion && pio_reference.model.motion(action.motion)

    if (action.from && action.to) {
      Object.keys(action.from).forEach(id => {
        const hidePartIndex = coreModel._partIds.indexOf(id)
        TweenLite.to(coreModel._partOpacities, 0.6, { [hidePartIndex]: action.from[id] });
      })

      motionManager.once("motionFinish", (data) => {
        Object.keys(action.to).forEach(id => {
          const hidePartIndex = coreModel._partIds.indexOf(id)
          TweenLite.to(coreModel._partOpacities, 0.6, { [hidePartIndex]: action.to[id] });
        })
      })
    }
  }

  function handleInteraction(event) {
    event.preventDefault(); // 기본 동작 방지
    if (motionManager.state.currentGroup !== "Idle") return

    const action = pio_reference.modules.rand(touchList)
    playAction(action)
  }

  canvas.onclick = handleInteraction;
  canvas.ontouchstart = handleInteraction;

  // pio-container에 대한 이벤트 처리
  container.onclick = function(event) {
    if (event.target === container) {
      handleInteraction(event);
    }
  };
  container.ontouchstart = function(event) {
    if (event.target === container) {
      handleInteraction(event);
    }
  };

  if (modelName === "Diana") {
    container.dataset.model = "Diana"
    initConfig.content.skin[1] = ["Diana 라고 해요! 잘 부탁드려요∼"]
    playAction({ motion: "Tap抱阿草-左手" })

    touchList = [
      {
        text: "우우... 자꾸 귀찮게 하지 마세요.",
        motion: "Tap生气 -领结"
      },
      {
        text: "짓궂게 하는 사람이 보이는데, <br>누구인지는 말씀 안 드릴게요.",
        motion: "Tap= =  左蝴蝶结"
      },
      {
        text: "흑, 흑. 훌쩍...",
        motion: "Tap哭 -眼角"
      },
      {
        text: "좋아해요∼♡",
        motion: "Tap害羞-中间刘海"
      },
      {
        text: "푹신푹신∼♡",
        motion: "Tap抱阿草-左手"
      },
      {
        text: "그만 찌르세요! 간지럽다구요∼",
        motion: "Tap摇头- 身体"
      },
      {
        text: "우와아앙...",
        motion: "Tap耳朵-发卡"
      },
      {
        text: "Zzz。..",
        motion: "Leave"
      },
      {
        text: "와아! 행복해요∼♡",
        motion: "Tap右头发"
      },
    ]
  } 
}

var pio_reference
window.addEventListener('DOMContentLoaded', loadKaren)
