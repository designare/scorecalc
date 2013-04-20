(function() {

	/*
	 * コンストラクタ
	 */
	ScoreHistory = function() {
		
		// スコアの配列
		this.scores = [];
		
		return this;
	};

	/*
	 * メソッド
	 */
	ScoreHistory.prototype = {

		/*
		 * スコアを追加
		 */
		push: function(score) {
			this.scores.push(score);
		},

		/*
		 * スコアを１つ削除
		 */
		pop: function() {
			this.scores.pop();
		},

		/*
		 * スコアをクリア
		 */
		clear: function() {
			this.scores = [];
		},

		/*
		 * 登録スコア数取得
		 */
		getCount: function() {
			return this.scores.length;
		},

		/*
		 * 平均点取得
		 * @param level 四捨五入する小数点桁数
		 */
		getAverageScore: function(level) {
			var average = 0.0;
			if (this.scores.length > 0) {
				var sum = 0;
				for (var i=0; i<this.scores.length; i++) {
					sum += this.scores[i].getTotalScore();
				}
				average = sum / this.scores.length;
			}
			
			// 小数点桁数調整
			if (level >= 0) {
				var shifter = Math.pow(10, level);
				average = Math.round(average * shifter) / shifter;
			}
			
			return average.toFixed(level);
		}

	};
})();
