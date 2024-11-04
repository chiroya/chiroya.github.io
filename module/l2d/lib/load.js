var linkers = [
  "https://github.com/chiroya/chiroya.github.io"
]

const initConfig = {
  mode: "fixed",
  hidden: true,
  content: {
    link: linkers[Math.floor(Math.random() * linkers.length)],
    welcome: ["Hi!"],
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


function toggleNightMode() {
  // body 요소에 night-mode 클래스를 토글하여 야간 모드 전환
  document.body.classList.toggle("night-mode");
}

function loadKaren() {
  pio_reference = new Paul_Pio(initConfig)

  pio_alignment = "left"

  // Then apply style
  pio_refresh_style()
}

function onModelLoad(model) {
  const container = document.getElementById("pio-container")
  const canvas = document.getElementById("pio")
  const modelNmae = model.internalModel.settings.name
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
        // coreModel._partOpacities[hidePartIndex] = action.from[id]
      })

      motionManager.once("motionFinish", (data) => {
        Object.keys(action.to).forEach(id => {
          const hidePartIndex = coreModel._partIds.indexOf(id)
          TweenLite.to(coreModel._partOpacities, 0.6, { [hidePartIndex]: action.to[id] });
          // coreModel._partOpacities[hidePartIndex] = action.to[id]
        })
      })
    }
  }

  canvas.onclick = function () {
    if (motionManager.state.currentGroup !== "Idle") return

    const action = pio_reference.modules.rand(touchList)
    playAction(action)
  }

  if (modelNmae === "Diana") {
    container.dataset.model = "Diana"
    initConfig.content.skin[1] = ["Diana 라고 해요! 잘 부탁드려요∼"]
    playAction({ motion: "Tap抱阿草-左手" })

    touchList = [
      {
        text: "우우...",
        motion: "Tap生气 -领结"
      },
      {
        text: "짓궂게 하는 사람이 보이는데, <br>누구인지는 말씀 안드릴게요",
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
        text: "푹신푹신∼",
        motion: "Tap抱阿草-左手"
      },
      {
        text: "그만 찌르세요! 간지럽다구요∼",
        motion: "Tap摇头- 身体"
      },
      {
        text: "우와아...",
        motion: "Tap耳朵-发卡"
      },
      {
        text: "Zzz。..",
        motion: "Leave"
      },
      {
        text: "와아! 행복해요!",
        motion: "Tap右头发"
      },
    ]

  } else if (modelNmae === "#") {




    canvas.width = model.width * 1.2
    const hideParts = [
      "Part5", // 어지러움
      "neko", // 냥냥펀치
      "game", // 왼손 게임패드
      "Part15", // 선글라스
      "Part21", // 오른 팔뚝
      "Part22", // 늘어지는 왼손
      "Part", // 양손 주먹
      "Part16", // 깜짝이야
      "Part12" // 조심조심
    ]
    const hidePartsIndex = hideParts.map(id => coreModel._partIds.indexOf(id))
    hidePartsIndex.forEach(idx => {
      coreModel._partOpacities[idx] = 0
    })
  }
}


var pio_reference
window.onload = loadKaren
