(function() {

	/**
	 * コンストラクタ
	 */
	CalculatorView = function() {
		
		/*----------------
		  クラス変数
		  ----------------*/
		this.score = new Score();
		this.scoreHistory = new ScoreHistory();
		this.touching = false;
		
		/*----------------
		  初期処理
		 ----------------*/
		this._initialize();
		return this;
	};

	/**
	 * 継承 (親クラスの初期処理はここで実施される)
	 */
	CalculatorView.prototype = new View();

	/**
	 * 定数宣言
	 */
	CalculatorView.Config = {};
	
	/**
	 * 初期処理
	 */
	CalculatorView.prototype._initialize = function() {
		this._setEvents();
		this._render();
	};
	
	/**
	 * スコア制御
	 */
	CalculatorView.prototype._addPoint = function(value) {
		this.score.push(value);
		this._render();
	};
	CalculatorView.prototype._clear = function() {
		if (this.score.getCount() == 0) return;
		this.score.clear();
		this._render();
	};
	CalculatorView.prototype._clearAll = function() {
		this.score.clear();
		this.scoreHistory.clear();
		this._render();
	};
	CalculatorView.prototype._undo = function() {
		if (this.score.getCount() == 0) return;
		this.score.pop();
		this._render();
	};
	CalculatorView.prototype._toggleMode = function() {
		this.score.toggleMode();
		this._render();
	};
	CalculatorView.prototype._next = function() {
		this.scoreHistory.push(this.score);
		this.score = new Score(this.baseScore);
		this._render();
		this._effectDisplayAverage('next');
	};
	CalculatorView.prototype._back = function() {
		if (this.scoreHistory.getCount() == 0) return;
		this.scoreHistory.pop(this.score);
		this._render();
		this._effectDisplayAverage('back');
	};
	CalculatorView.prototype._setBaseScore = function(value) {
		if (!this.score.setBaseScore(value, true)) {
			this._alert('Please input number. (0 - ' + Score.Config.BASE_SCORE_MAX + ')');
		}
		this._render();
	};
	
	/**
	 * 平均点エフェクト
	 */
	CalculatorView.prototype._effectDisplayAverage = function(mode) {
		var color;
		switch (mode) {
		case 'next':
			color = '#ffcccc';
			break;
		case 'back':
			color = '#ccccff';
			break;
		}
		// 背景色
		$('#displayAverage').css({'background-color': color}).delay(300).animate({'backgroundColor': '#fff'}, 600);
	};
	
	/**
	 * アラートダイアログ
	 */
	CalculatorView.prototype._alert = function(message) {
		console.log(message);
		var alert = $('#alert');
		alert.html('&nbsp;&nbsp;'+message).css({display:'block'});
		alert.delay(3000).animate({opacity: 0}, {complete: function(){
			alert.css({opacity: 1, display:'none'});
		}});
	};
		
	/**
	 * 描画
	 */
	CalculatorView.prototype._render = function() {
		$('#displayFormula').html(this.score.getFormula());
		$('#valueBaseScore').val(this.score.getBaseScore());
		$('#valueDiffScore').html(this.score.getDiffScore());
		$('#valueTotalScore').html(this.score.getTotalScore());
		$('#valueAverageCount').html(this.scoreHistory.getCount());
		$('#valueAverageScore').html(this.scoreHistory.getAverageScore(1));
		
		// ラベル表示制御
		if (this.score.isPlusMode()) {
			$('#labelBaseScore').html('Base');
			$('#labelDiffScore').html('Gain');
			$('#labelOperator').html('+');
		} else {
			$('#labelBaseScore').html('Full');
			$('#labelDiffScore').html('Loss');
			$('#labelOperator').html('-');
		}
		
		// ボタン表示制御
		if (this.score.getCount() == 0) {
			$('#buttonC').hide();
			$('#buttonAC').show();
			$('#buttonUndo').addClass('btn-disabled');
		} else {
			$('#buttonC').show();
			$('#buttonAC').hide();
			$('#buttonUndo').removeClass('btn-disabled');
		}
		
		if (this.scoreHistory.getCount() == 0) {
			$('#buttonAC').addClass('btn-disabled');
			$('#buttonBack').addClass('btn-disabled');
		} else {
			$('#buttonAC').removeClass('btn-disabled');
			$('#buttonBack').removeClass('btn-disabled');
		}

		return this;
	};
	
	/**
	 * イベント登録
	 */
	CalculatorView.prototype._setEvents = function() {
		
		/**
		 * タッチ開始 (ボタン共通)
		 */
		$('.button').bind(this._event('touchstart'), this, function(e){
			var self = e.data;
			self._startTouching();
		});

		/**
		 * タッチ終了 (数字ボタン)
		 */
		$('.btn-digit').bind(this._event('touchend'), this, function(e){
			var self = e.data;
			if (self._isTouching()) {
				self._addPoint(jQuery(e.target).attr('value'));
				self._finishTouching();
			}
		});

		/**
		 * タッチ終了 (制御ボタン)
		 */
		$('.btn-control').bind(this._event('touchend'), this, function(e){
			var self = e.data;
			if (self._isTouching()) {
				switch (e.target.id) {
				case 'buttonC':
					self._clear();
					break;

				case 'buttonAC':
					self._clearAll();
					break;

				case 'buttonUndo':
					self._undo();
					break;

				case 'buttonMode':
					self._toggleMode();
					break;

				case 'buttonBack':
					self._back();
					break;

				case 'buttonNext':
					self._next();
					break;
				}
				self._finishTouching();
			}
		});
		
		/**
		 * 左スワイプ
		 */
		$('body').bind(this._event('swipeleft'), this, function(e){
			var self = e.data;
			self._next();
			self._finishTouching();
		});

		/**
		 * 右スワイプ
		 */
		$('body').bind(this._event('swiperight'), this, function(e){
			var self = e.data;
			self._undo();
			self._finishTouching();
		});
		
		/**
		 * ベーススコア選択
		 */
		$('#valueBaseScore').bind('mouseup', this, function(e){
			$(this).select();
		});
		
		/**
		 * ベーススコア変更
		 */
		$('#valueBaseScore').bind('change', this, function(e){
			var self = e.data;
			self._setBaseScore( Number($('#valueBaseScore').val()) );
		});
		
		/**
		 * ベーススコア：キーダウン
		 */
		$('#valueBaseScore').bind('keydown', this, function(e){
			if (e.keyCode == '13') {
				$(this).blur();	// Enter：選択解除
			}
		});

	};

	/**
	 * タッチイベント関連
	 */
	CalculatorView.prototype._startTouching = function() {
		this.touching = true;
	};
	CalculatorView.prototype._finishTouching = function() {
		this.touching = false;
	};
	CalculatorView.prototype._isTouching = function() {
		return this.touching;
	};

	/*----------------
	  インスタンス化
	  ----------------*/
	var calculatorView = new CalculatorView();
	var calculatorViewLayout = new CalculatorViewLayout();

})();