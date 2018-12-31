enchant();

window.onload = () => {

	//global
	let FPS = 60;
	let WIDTH = 640;
	let HEIGHT = 1136;
	//内部
	let SCROLLSPEED = 15;
	let HORIZON = 440;
	let VERSION = "0.0.0";
	//外部
	let SCOREPOINT = 0;

	//ゲームの初期化
	let game = new Game(WIDTH, HEIGHT);
	game.fps = FPS;
	game.keybind(32, 'a');

	let assets = [
		'./assets/sounds/rayfami.mp3',
    './assets/sounds/jump.mp3',
    './assets/images/bg_1.png',
    './assets/images/bg_2.png',
    './assets/images/breathframe.png',
    //'./assets/images/climikuji2k19.png',
    './assets/images/enemy_dotn.png',
    './assets/images/enemy_iru.png',
    './assets/images/enemy_ryuks.png',
    './assets/images/enemy_sum.png',
    './assets/images/enemy_sy4in.png',
    './assets/images/title.png',
    //'./assets/images/twitter-card.png',
    './assets/images/ui_bg.png',
    //'./assets/images/ui_bg_light.png',
	]
	assets.forEach((item) => {
		game.preload(item)
	});

	//要素のセンタリング
	game.scale = Math.min(window.innerWidth / game.width, window.innerHeight / game.height);
	let left = (window.innerWidth - (game.width * game.scale)) / 2;
	let top = (window.innerHeight - (game.height * game.scale)) / 2;
	$('#enchant-stage').css({
		"position": "absolute",
		"left": left + "px",
		"top": (top) + "px",
	});

	//ゲームの開始
	game.onload = () => {
		let bgm = game.assets['./assets/sounds/rayfami.mp3'];
		let jumpse = game.assets['./assets/sounds/jump.mp3'];

		let jumpTheme = {
			normal: {
        color: '#FFF',
				background: {
					type: 'linear-gradient',
					start: '#dc143c',
          end: '#dc143c'
				},
				border: {
					color: '#66d0ff',
					width: 1,
					type: 'solid'
				},
				textShadow: {
					offsetX: 0.5,
					offsetY: 0.5,
					blur: '3px',
					color: '#F00'
				},
				boxShadow: {
					offsetX: 2,
					offsetY: 2,
					blur: '5px',
					color: 'rgba(0, 0, 0, 0.3)'
				}
			},
			active: {
				color: 'rgb(255, 255, 169)',
				background: {
					type: 'linear-gradient',
					start: '#FFF',
					end: '#FFF'
				},
				border: {
					color: '#ff66b8',
					width: 1,
					type: 'solid'
				},
				textShadow: {
					offsetX: 0.5,
					offsetY: 0.5,
					blur: '3px',
					color: '#F00'
				},
				boxShadow: {
					offsetX: 2,
					offsetY: 2,
					blur: '5px',
					color: 'rgba(0, 0, 0, 0.3)'
				}
			}
		}

		var tweet = () => {
			const luckyitem = [
				'モォ～娘',
				'Mojito',
				'エロ同人誌',
				'イクちゃん',
				'Sylenth1',
				'授乳手コキCG',
				'iru1919',
				'クリオンのクリ',
				'チンポ',
				'おっぱいマウスパッド',
				'Clion - Ray',
				'シャインレコーズ',
				'う-21b',
				'今年もよろしくお願いします',
				'5%の確率で性器を露出するクリオン',
				'5000兆円',
				'オナホ',
				'シャッタマ',
				'エロいいね研究会',
				'クリオンくん',
				'VRAV',
				'こんにちは',
				'ミライアカリの乳',
				'手仕込とんかつカレー',
				'ココイチ',
				'paypay',
				'Sy4InRecordsバーチャル部',
				'CLion',
				'クソアマ'
      ];
      
      const item = luckyitem[Math.floor(Math.random() * luckyitem.length) -1];

			const rank =
				SCOREPOINT < 500 ? "敏感クリ"
			:	SCOREPOINT < 1000 ? "凶クリ"
      : SCOREPOINT < 2000 ? "末クリ"
      : SCOREPOINT < 3000 ? "小クリ"
      : SCOREPOINT < 4000 ? "中クリ"
      : SCOREPOINT < 5000 ? "クリ"
      : SCOREPOINT < 6000 ? "クリクリ"
      : SCOREPOINT < 7000 ? "大クリ"
      : SCOREPOINT < 8000 ? "特大クリ"
      : SCOREPOINT < 9000 ? "超特大クリ"
      : SCOREPOINT < 10000 ? "凶悪クリ"
      : "極悪クリ"

			const EUC = encodeURIComponent;
			const LINK = "https://sometrouble.github.io/climikuji_2019/";
			const message = `🎍クリみくじ2019🎍 - 今年の運クリを占おう❕\nあなたの運勢は${rank}です！ラッキーアイテムは\"${item}\"`
			const hashtag = "クリみくじ,Cli_Omikuji"
			const URL = `https://twitter.com/intent/tweet?text=${EUC(message)}&hashtags=${EUC(hashtag)}&url=${LINK}`

			if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
				location.href = URL
			} else {
				window.open(URL, "_blank", "top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1");
			}
		}

		var createTitleScene = function () {
			var scene = new Scene();

			var titlebg = new Sprite(WIDTH, HEIGHT);
			titlebg.image = game.assets['./assets/images/title.png'];
			titlebg.x = 0;
			titlebg.y = 0;
			scene.addChild(titlebg);

			var versionlabel = new Label("ver." + VERSION)
			versionlabel.x = 550;
			versionlabel.y = 450;
			versionlabel.font = "normal normal 15px/1.0 monospace";
			scene.addChild(versionlabel);

			var startmsg = new Label("touch to start")
			startmsg.x = WIDTH / 2 - 50;
			startmsg.y = HEIGHT - 40;
			startmsg.font = "normal normal 15px/1.0 monospace";
			startmsg.color = "white";
			scene.addChild(startmsg);

			scene.backgroundColor = 'rgba(255, 230, 0, 1)';

			scene.addEventListener(Event.ENTER_FRAME, (e) => {
				startmsg.opacity = (new Date()).getMilliseconds() > 500 ? 1 : 0;
			});

			scene.addEventListener(Event.TOUCH_START, (e) => {
				game.replaceScene(createGameScene());
				bgm.play();
				bgm.src.loop = true;
			});

			return scene;
		};

		var createGameScene = () => {
      $.post('https://script.google.com/macros/s/AKfycbwEf0jiuCUTOxCym_pEE2EFNQwtIXqoiWYCOsixyRPbnBSGvdLg/exec')

			var scene = new Scene();

      //乱数作成
      var random = new Array(5);
      random.forEach((r) => {
        r = Math.floor(Math.random() * 30);
      })

      var moveflag = false;

			//---------- background ----------//
			var ui_bg = new Sprite(WIDTH, HEIGHT);
			ui_bg.image = game.assets['./assets/images/ui_bg.png'];
      scene.addChild(ui_bg);
      
      const BG_WIDTH = 900
      const BG_HEIGHT = 641

			var bg1 = new Sprite(BG_WIDTH, BG_HEIGHT);
			bg1.image = game.assets['./assets/images/bg_1.png'];
			bg1.x = 0;
			bg1.y = 0;
			scene.addChild(bg1);

			var bg2 = new Sprite(BG_WIDTH, BG_HEIGHT);
			bg2.image = game.assets['./assets/images/bg_2.png'];
			bg2.x = BG_WIDTH;
			bg2.y = 0;
      scene.addChild(bg2);

			//---------- foreground ----------//
			var score = new Label(0);
			score.color = "#000000";
			score.x = 10;
			score.y = 5;
			score.font = "normal normal 15px/1.0 monospace";
			scene.addChild(score);

			var player = new Sprite(64, 64);
			player.image = game.assets['./assets/images/breathframe.png'];
			player.x = 40;
			player.y = HORIZON;
			scene.addChild(player);

			//---------- enemy ----------//
			var ryusk = new Sprite(64, 64);
			ryusk.image = game.assets['./assets/images/enemy_ryuks.png'];
			ryusk.x = -ryusk.width;
			ryusk.y = HORIZON - 64;
			scene.addChild(ryusk);

			var iru = new Sprite(64, 64);
			iru.image = game.assets['./assets/images/enemy_iru.png'];
			iru.x = -iru.width;
			iru.y = HORIZON;
      scene.addChild(iru);
      
			var dotn = new Sprite(64, 64);
			dotn.image = game.assets['./assets/images/enemy_dotn.png'];
			dotn.x = -dotn.width;
			dotn.y = HORIZON;
			scene.addChild(dotn);
      
      var sum = new Sprite(64, 64);
			sum.image = game.assets['./assets/images/enemy_sum.png'];
			sum.x = -sum.width;
			sum.y = HORIZON;
			scene.addChild(sum);

			var sy4in = new Sprite(128, 64);
			sy4in.image = game.assets['./assets/images/enemy_sy4in.png'];
			sy4in.x = -sy4in.width;
			sy4in.y = HORIZON - 100;
			scene.addChild(sy4in);

			//---------- ui ----------//
      var button = new Button("Jump", jumpTheme, 180, 400);
      button.font = '12em Arial';
      button.moveTo(WIDTH / 2 - 200, 820);
      scene.addChild(button);

			button.ontouchstart = () => {
				if (player.y == HORIZON) {
					player.frame = 0;
					player.tl.moveBy(0, -150, 12, enchant.Easing.CUBIC_EASEOUT)
						.moveBy(0, 150, 12, enchant.Easing.CUBIC_EASEIN);
					jumpse.play();
				}
			}

      //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=ゲーム内ループ-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			scene.addEventListener(Event.ENTER_FRAME, () => {
				SCOREPOINT = game.frame * 2;
        score.text = "score: " + SCOREPOINT;

        //クリちゃんがクリクリする
        if(moveflag) {
          if(player.rotation < 0) moveflag = false;
          player.rotation -= 4;
        } else {
          if(player.rotation > 30) moveflag = true;
          player.rotation += 4;
        }

        //背景のスクロール
        [bg1, bg2].forEach((bg) => {
          bg.x -= SCROLLSPEED;
          if(bg.x <= -BG_WIDTH) {
            bg.x = BG_WIDTH
          }
        });

        //ゲーム開始3秒後、前回定まった出現間隔でアスペが出てくる
				if (game.frame > 180) {
					if (game.frame % (80 + random[0]) == 0) iru.x = WIDTH;
					if (game.frame % (120 + random[1]) == 0) ryusk.x = WIDTH;
					if (game.frame % (240 + random[2]) == 0) dotn.x = WIDTH;
					if (SCOREPOINT > 2000 && game.frame % (1000 + random[3]) == 0) sum.x = WIDTH;
					if (SCOREPOINT > 5000 && game.frame % (1400 + random[4]) == 0) sy4in.x = WIDTH;
				}

        // 全速前進
        [iru, ryusk, dotn, sum, sy4in].forEach((enemy, index) => {
          if(enemy.x > -enemy.width) {
            //しゃいんだけ速い
            if(index == 4) {
              enemy.x -= SCROLLSPEED * 1.2;
            
            //とらさむは遅い
            } else if (index == 3) {
              enemy.x -= SCROLLSPEED * 0.8;
            
            //ほかは一緒
            } else {
              enemy.x -= SCROLLSPEED;
            }
          }

          //当たると死ぬ
          if(player.within(enemy, 28)) {
            game.pushScene(createGameoverScene());
          }
        });

        //出現間隔を定める
        [iru, ryusk, dotn, sum, sy4in].forEach((enemy, index) => {
          if(enemy.x <= -enemy.width) {
            random[index] = Math.floor(Math.random() * 30);
          }
        });

			});
			return scene;
		}

		var createGameoverScene = () => {
			var scene = new Scene();
			scene.backgroundColor = 'rgba(0, 0, 0, 0.5)';

			scene.addEventListener(Event.ENTER_FRAME, function (e) {
        var retrybutton = new Button("Retry", jumpTheme, 65, 300);
        retrybutton.font = '4em Arial';
				retrybutton.moveTo(WIDTH / 2 - 150, HEIGHT / 1.5);
				scene.addChild(retrybutton);
				retrybutton.ontouchstart = function () {
					location.reload();
				}

				var Tweetbutton = new Button("Tweet", jumpTheme, 65, 300);
        Tweetbutton.font = '4em Arial';
				Tweetbutton.moveTo(WIDTH / 2 - 150, HEIGHT / 3);
				scene.addChild(Tweetbutton);
				Tweetbutton.ontouchstart = function () {
					tweet();
				}
			});

			return scene;
		};

		game.replaceScene(createTitleScene());
	};
	game.start();
};