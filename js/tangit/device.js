(function() {

	/**
	 * コンストラクタ
	 */
	Device = function() {
		
		/*----------------
		  クラス変数
		  ----------------*/
		this.device = null;
		
		/*----------------
		  初期処理
		  ----------------*/
		this._initialize();
		return this;
	};

	/**
	 * 定数宣言
	 */
	Device.Config = {
		device: {
			SP: 1,
			PC: 2
		}
	};
	
	/**
	 * メソッド宣言
	 */
	Device.prototype = {
		
		/**
		 * 初期処理
		 */
		_initialize: function() {
			this._setDevice();
			return this;
		},
		
		/**
		 * デバイスを識別しセットする
		 */
		_setDevice: function() {
			var ua = navigator.userAgent;
			if ( ua.indexOf('iPhone') > 0
					|| ua.indexOf('iPad') > 0
					|| ua.indexOf('iPod') > 0
					|| ua.indexOf('Android') > 0 ) {
				this.device = Device.Config.device.SP;
			} else {
				this.device = Device.Config.device.PC;
			}
		},
		
		/**
		 * SP判定
		 */
		isSp: function() {
			return this.device == Device.Config.device.SP;
		},

		/**
		 * PC判定
		 */
		isPc: function() {
			return this.device == Device.Config.device.PC;
		}

	};

})();