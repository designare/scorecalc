(function() {

	/*
	 * コンストラクタ
	 */
	Score = function() {
		
		// モード（加点/減点）
		this.mode = null;
		
		// ベーススコア
		this.baseScore = null;
		
		// 差分点（diffsの合計）
		this.diffScore;
		
		// 合計点（ベーススコア +/- 差分点）
		this.totalScore;
		
		// 差分点の配列
		this.diffs = [];
		
		// 初期化処理
		this.initMode();
		
		return this;
	};

	/*
	 * 定数
	 */
	Score.Config = {
		BASE_SCORE_MINUS_DEFAULT: 100,
		BASE_SCORE_PLUS_DEFAULT: 0,
		BASE_SCORE_MAX: 9999,
		MODE: {
			PLUS: 1,
			MINUS: 2
		}
	};
	
	/*
	 * メソッド
	 */
	Score.prototype = {

		/*
		 * モードを初期化
		 */
		initMode: function() {
			// キャッシュから取得
			var value = Storage.getMode();
			
			// 初期値セット
			if (value == null) {
				this.setMode(Number(Score.Config.MODE.MINUS), true);
			} else {
				this.setMode(Number(value), false);
			}
		},

		/*
		 * モードをセット
		 */
		setMode: function(value, doCache) {
			var config = Score.Config.MODE;
			
			// バリデーション
			if (typeof value === 'undefined'
					|| !(value == config.PLUS || value == config.MINUS)) {
				return false;
			}
			
			// 値セットし再計算
			this.mode = value;
			this.initBaseScore();
			this.calculate();
			
			// キャッシュ化
			if (doCache) {
				Storage.setMode(value);
			}
			return true;
		},
		
		/*
		 * モードを切り替え
		 */
		toggleMode: function() {
			var config = Score.Config.MODE;
			if (this.isPlusMode()) {
				this.setMode(config.MINUS, true);
			} else {
				this.setMode(config.PLUS, true);
			}
		},

		/*
		 * ベーススコアを初期化
		 */
		initBaseScore: function() {
			// キャッシュから取得
			var value = this.isPlusMode() ? Storage.getBaseScorePlus() : Storage.getBaseScoreMinus();
			
			// 初期値セット
			var config = Score.Config;
			if (value == null) {
				if (this.isPlusMode()) {
					this.setBaseScore(Number(config.BASE_SCORE_PLUS_DEFAULT), true);
				} else {
					this.setBaseScore(Number(config.BASE_SCORE_MINUS_DEFAULT), true);
				}
			} else {
				if (this.isPlusMode()) {
					this.setBaseScore(Number(value), false);
				} else {
					this.setBaseScore(Number(value), false);
				}
			}
		},

		/*
		 * ベーススコアをセット
		 */
		setBaseScore: function(value, doCache) {
			// バリデーション
			if (typeof value === 'undefined'
					|| ! _.isNumber(value)
					|| ! (value>=0 && value<=Score.Config.BASE_SCORE_MAX)) {
				return false;
			}
			
			// 値セットし再計算
			this.baseScore = value;
			this.calculate();
			
			// キャッシュ化
			if (doCache) {
				if (this.isPlusMode()) {
					Storage.setBaseScorePlus(value);
				} else {
					Storage.setBaseScoreMinus(value);
				}
			}
			return true;
		},

		/*
		 * 差分点を追加
		 */
		push: function(value) {
			this.diffs.push(value);
			value = parseInt(value);
			this.diffScore += value;
			if (this.isPlusMode()) {
				this.totalScore += value;
			} else {
				this.totalScore -= value;
			}
		},

		/*
		 * 差分点を１つ削除
		 */
		pop: function() {
			if (this.diffs.length > 0) {
				var value = parseInt(this.diffs.pop());
				this.diffScore -= value;
				if (this.isPlusMode()) {
					this.totalScore -= value;
				} else {
					this.totalScore += value;
				}
			}
		},

		/*
		 * 差分点をクリア
		 */
		clear: function() {
			this.diffs = [];
			this.calculate();
		},

		/*
		 * 登録差分点の数を取得
		 */
		getCount: function() {
			return this.diffs.length;
		},

		/*
		 * 計算
		 */
		calculate: function() {
			// 差分点
			var diff = 0;
			for (var i=0; i<this.diffs.length; i++) {
				diff += parseInt(this.diffs[i]);
			}
			this.diffScore = diff;
			
			// 合計点
			if (this.isPlusMode()) {
				this.totalScore = this.baseScore + this.diffScore;
			} else {
				this.totalScore = this.baseScore - this.diffScore;
			}
		},

		/*
		 * getter
		 */
		getBaseScore: function() {
			return this.baseScore;
		},
		getDiffScore: function() {
			return this.diffScore;
		},
		getTotalScore: function() {
			return this.totalScore;
		},

		/*
		 * 計算式取得
		 */
		getFormula: function() {
			var formula = "";
			for (var i=0; i<this.diffs.length; i++) {
				formula += String(this.diffs[i]) + " + ";
			}
			return formula;
		},
		
		/**
		 * プラスモード判定
		 */
		isPlusMode: function() {
			return this.mode == Score.Config.MODE.PLUS;
		},
		
		/**
		 * マイナスモード判定
		 */
		isMinusMode: function() {
			return this.mode == Score.Config.MODE.MINUS;
		}

	};
})();
