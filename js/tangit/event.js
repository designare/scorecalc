(function() {

	/**
	 * コンストラクタ
	 */
	Event = function() {
		
		/*----------------
		  クラス変数
		  ----------------*/
		this.touchStart = null;
		
		/*----------------
		  初期処理
		  ----------------*/
		this._initialize();
		return this;
	};

	/**
	 * 継承 (親クラスの初期処理はここで実施される)
	 */
	Event.prototype = new Device();

	/**
	 * 定数宣言
	 */
	Event.Config = {
		touch: {
			SWIPE_PX_THRESHOLD: 50
		}
	};
	
	/**
	 * 初期処理
	 */
	Event.prototype._initialize = function() {
		this._setEvents();
	};
	
	/**
	 * 座標clientX, clientYを取得
	 * @return array 座標
	 */
	Event.prototype._getClientXY = function(e) {
		var event = this.isSp() ? e.originalEvent.touches[0] : e.originalEvent;
		return {x: event.clientX, y: event.clientY};
	};

	/**
	 * 座標clientXを取得
	 * @return clientX
	 */
	Event.prototype._getClientX = function(e) {
		return this._getClientXY(e).x;
	};

	/**
	 * 座標clientYを取得
	 * @return clientY
	 */
	Event.prototype._getClientY = function(e) {
		return this._getClientXY(e).y;
	};

	/**
	 * デバイスに応じたイベント名を取得する
	 * @param event SP用イベント名
	 * @return イベント名
	 */
	Event.prototype._event = function(event) {
		if (this.isSp()) {
			return event;
		}
		
		var pcEvents = {
			touchstart: 'mousedown',
			touchend: 'mouseup',
			touchmove: 'mousemove',
			swipeleft: 'swipeleft',
			swiperight: 'swiperight',
		};
		return eval('pcEvents.' + event);
	};

	/**
	 * イベント登録
	 */
	Event.prototype._setEvents = function() {
		$('body').bind(this._event('touchstart'), this, function(e){
			e.data._onTouchStart(e);
		});
		$('body').bind(this._event('touchmove'), this, function(e){
			e.data._onTouchMove(e);
		});
		$('body').bind(this._event('touchend'), this, function(e){
			e.data._finishTouching();
		});
	};

	/**
	 * タッチイベント関連
	 */
	Event.prototype._onTouchStart = function(e) {
		this._startTouching(e);
	},
	Event.prototype._onTouchMove = function(e) {
		if (this._isTouching()) {
			var dx = this._getClientX(e) - this.touchStart.x;
			var threshold = Event.Config.touch.SWIPE_PX_THRESHOLD;
			// 右スワイプ
			if (dx > threshold) {
				jQuery(e.target).trigger("swiperight");
				this._finishTouching();
			}
			// 左スワイプ
			else if (dx < -threshold) {
				jQuery(e.target).trigger("swipeleft");
				this._finishTouching();
			}
		}
	};
	Event.prototype._isTouching = function() {
		return this.touchStart != null;
	};
	Event.prototype._startTouching = function(e) {
		this.touchStart = this._getClientXY(e);
	};
	Event.prototype._finishTouching = function() {
		this.touchStart = null;
	};

})();