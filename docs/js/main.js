enchant();

window.onload = () => {

	//global
	let FPS = 60;
	let WIDTH = 640;
	let HEIGHT = 1136;
	//内部
	let SCROLLSPEED = 30;
	let HORIZON = 330;
	let VERSION = "0.0.0";
	//外部
	let SCOREPOINT = 0;

	//ゲームの初期化
	let game = new Game(WIDTH, HEIGHT);
	game.fps = FPS;
	game.keybind(32, 'a');

	let assets = [
		'./assets/images/cli_matcho.png',
		'./assets/images/breathframe.png',
		'./assets/images/enemyiru.png',
		'./assets/images/enemyryusk.png',
		'./assets/images/enemysy4in.png',
		'./assets/images/town.png',
		'./assets/images/townbg.png',
		'./assets/images/town2.png',
		'./assets/images/town2bg.png',
		'./assets/images/title.png',
		'./assets/sounds/rayfami.mp3',
		'./assets/sounds/jump.mp3',
		'./assets/images/ui_bg.png',
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
					start: '#ff7f7f',
          end: '#ff7f7f'
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

			const rank =
				SCOREPOINT < 30 ? "凶クリ"
					: SCOREPOINT < 60 ? "末クリ"
						: SCOREPOINT < 66 ? "小クリ"
							: SCOREPOINT < 76 ? "中クリ"
								: SCOREPOINT < 108 ? "クリ"
									: SCOREPOINT < 108 ? "クリクリ"
										: SCOREPOINT < 120 ? "大クリ"
											: SCOREPOINT < 168 ? "特大クリ"
												: SCOREPOINT < 200 ? "超特大クリ"
													: SCOREPOINT < 300 ? "凶悪クリ"
														: "極悪クリ"

			const EUC = encodeURIComponent;
			const LINK = "https://sometrouble.github.io/climikuji_2019/";
			const message = `🎍クリみくじ2019🎍 - 今年の運クリを占おう❕\nあなたの運勢は${rank}です！ラッキーアイテムは\"${luckyitem[1]}\"`
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

			var scene = new Scene();

			var rand1 = Math.floor(Math.random() * 11);
			var rand2 = Math.floor(Math.random() * 11);
			var rand3 = Math.floor(Math.random() * 11);

			//---------- background ----------//
			var ui_bg = new Sprite(WIDTH, HEIGHT);
			ui_bg.image = game.assets['./assets/images/ui_bg.png'];
      scene.addChild(ui_bg);
      
			var bg = new Sprite(WIDTH, HEIGHT - 110);
			//bg.image = game.assets['./assets/images/townbg.png'];
			bg.x = 0;
			bg.y = 0;
			scene.addChild(bg);

			var bg1 = new Sprite(WIDTH + 20, HEIGHT - 110);
			//bg1.image = game.assets['./assets/images/town.png'];
			bg1.x = 0;
			bg1.y = 0;
			scene.addChild(bg1);

			var bg2 = new Sprite(WIDTH + 20, HEIGHT - 110);
			//bg2.image = game.assets['./assets/images/town.png'];
			bg2.x = WIDTH;
			bg2.y = 0;
      scene.addChild(bg2);

			//---------- foreground ----------//
			var score = new Label(0);
			score.color = "#000000";
			score.x = 10;
			score.y = 5;
			score.font = "normal normal 15px/1.0 monospace";
			scene.addChild(score);

			var player = new Sprite(32, 32);
			player.image = game.assets['./assets/images/breathframe.png'];
			player.x = 80;
			player.y = HORIZON;
			scene.addChild(player);

			//---------- enemy ----------//
			var ryusk = new Sprite(32, 32);
			ryusk.image = game.assets['./assets/images/enemyryusk.png'];
			ryusk.x = -ryusk.width;
			ryusk.y = HORIZON - 32;
			scene.addChild(ryusk);

			var iru = new Sprite(32, 32);
			iru.image = game.assets['./assets/images/enemyiru.png'];
			iru.x = -iru.width;
			iru.y = HORIZON;
			scene.addChild(iru);

			var sy4in = new Sprite(64, 32);
			sy4in.image = game.assets['./assets/images/enemysy4in.png'];
			sy4in.x = -sy4in.width;
			sy4in.y = HORIZON - 32;
			scene.addChild(sy4in);


			//---------- ui ----------//
      var button = new Button("Jump!", jumpTheme, 65, 300);
      button.font = '4em Arial';
      button.moveTo(WIDTH / 2 - 150, 800);
      button.size = 30;
      scene.addChild(button);

			button.ontouchstart = () => {
				if (player.y == HORIZON) {
					player.frame = 0;
					player.tl.moveBy(0, -60, 6, enchant.Easing.CUBIC_EASEOUT)
						.moveBy(0, 60, 6, enchant.Easing.CUBIC_EASEIN);
					jumpse.play();
				}
			}

			//var escbutton = new Button("Back", jumpTheme, 65, 100);
      //escbutton.font = '4em Arial';
			//escbutton.moveTo(10, 900);
			//scene.addChild(escbutton);
			//escbutton.ontouchstart = function () {
			//	location.reload();
			//}

			scene.addEventListener(Event.ENTER_FRAME, function () {

				//---------- initialize ----------//
				SCOREPOINT = game.frame * 2;

				score.text = "score: " + SCOREPOINT;
				//TIME++;
				enemies = [];

				player.frame++;
				if (player.frane >= 2) {
					player.frame = 0;
				}

				bg1.x -= SCROLLSPEED;
				bg2.x -= SCROLLSPEED;

				if (bg1.x <= -WIDTH) {
					bg1.x = WIDTH;
				}

				if (bg2.x <= -WIDTH) {
					bg2.x = WIDTH;
				}

				//---------- game ----------//
				if (game.frame > 50) {

					if (game.frame % (30 + rand1) == 0) {
						iru.x = WIDTH;
					}
					if (game.frame % (40 + rand2) == 0) {
						ryusk.x = WIDTH;
					}
					if (SCOREPOINT > 2000 && game.frame % (182 + rand3) == 0) {
						sy4in.x = WIDTH;
					}
				}

				if (iru.x > -iru.width) {
					iru.x -= SCROLLSPEED;
				}
				if (ryusk.x > -ryusk.width) {
					ryusk.x -= SCROLLSPEED;
				}
				if (sy4in.x > -sy4in.width) {
					sy4in.x -= SCROLLSPEED * 1.2;
				}

				/*
				if (game.frame > (FPS*4) && SCOREPOINT < 10000){
					
					popenemy();
					
				}
				*/

				if (player.within(ryusk, 28) || player.within(iru, 30) || player.within(sy4in, 30)) {
					game.pushScene(createGameoverScene());
				}


				//---------- randomize ----------//

				if (game.frame % 200 == 0 && iru.x < -iru.width) {
					rand1 = Math.floor(Math.random() * 11);
				}

				if (game.frame % 200 == 0 && ryusk.x < -ryusk.width) {
					rand2 = Math.floor(Math.random() * 11);
				}

				rand3 = Math.floor(Math.random() * 11);



				//testlabel.text = testvariable;

			});

			//scene.addEventListener(Event.TOUCH_END, function (e) {
			//	//game.pushScene(createGameoverScene());
			//});

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