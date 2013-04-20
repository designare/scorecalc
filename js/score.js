(function() {

	/*
	 * コンストラクタ
	 */
	Score = function() {
		
		// フルスコア
		this.fullScore = null;
		
		// 失点（lossesの合計）
		this.lossScore;
		
		// 合計点（フルスコア - 失点）
		this.totalScore;
		
		// 失点の配列
		this.losses = [];
		
		// 初期化処理
		this.initFullScore();
		this.calculate();
		
		return this;
	};

	/*
	 * 定数
	 */
	Score.Config = {
		FULL_SCORE_DEFAULT : 100,
		FULL_SCORE_MAX : 100000,
	};
	
	/*
	 * メソッド
	 */
	Score.prototype = {

		/*
		 * フルスコアを初期化
		 */
		initFullScore: function() {
			// キャッシュから取得
			var value = Storage.getFullScore();
			
			// 初期値セット
			if (value == null) {
				this.setFullScore(Number(Score.Config.FULL_SCORE_DEFAULT), true);
			} else {
				this.setFullScore(Number(value), false);
			}
		},

		/*
		 * フルスコアをセット
		 */
		setFullScore: function(value, doCache) {
			// バリデーション
			if (typeof value === 'undefined'
					|| ! _.isNumber(value)
					|| ! (value>=0 && value<=Score.Config.FULL_SCORE_MAX)) {
				return false;
			}
			
			// 値セットし再計算
			this.fullScore = value;
			this.calculate();
			
			// キャッシュ化
			if (doCache) {
				Storage.setFullScore(value);
			}
			return true;
		},

		/*
		 * 失点を追加
		 */
		push: function(value) {
			this.losses.push(value);
			value = parseInt(value);
			this.totalScore -= value;
			this.lossScore += value;
		},

		/*
		 * 失点を１つ削除
		 */
		pop: function() {
			if (this.losses.length > 0) {
				var value = parseInt(this.losses.pop());
				this.totalScore += value;
				this.lossScore -= value;
			}
		},

		/*
		 * 失点をクリア
		 */
		clear: function() {
			this.losses = [];
			this.calculate();
		},

		/*
		 * 登録失点の数を取得
		 */
		getCount: function() {
			return this.losses.length;
		},

		/*
		 * 計算
		 */
		calculate: function() {
			// 失点
			var loss = 0;
			for (var i=0; i<this.losses.length; i++) {
				loss += parseInt(this.losses[i]);
			}
			this.lossScore = loss;
			
			// 合計点
			this.totalScore = this.fullScore - this.lossScore;
		},

		/*
		 * getter
		 */
		getFullScore: function() {
			return this.fullScore;
		},
		getLossScore: function() {
			return this.lossScore;
		},
		getTotalScore: function() {
			return this.totalScore;
		},

		/*
		 * 計算式取得
		 */
		getFormula: function() {
			var formula = "";
			for (var i=0; i<this.losses.length; i++) {
				formula += String(this.losses[i]) + " + ";
			}
			return formula;
		}

	};
})();
