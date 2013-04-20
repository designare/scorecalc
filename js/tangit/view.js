(function() {

	/**
	 * コンストラクタ
	 */
	View = function() {
		
		/*----------------
		  クラス変数
		  ----------------*/
		
		/*----------------
		  初期処理
		  ----------------*/
		this._initialize();
		return this;
	};

	/**
	 * 継承 (親クラスの初期処理はここで実施される)
	 */
	View.prototype = new Event();

	/**
	 * 定数宣言
	 */
	View.Config = {
	};
	
	/**
	 * 初期処理
	 */
	View.prototype._initialize = function() {
	};
	
})();