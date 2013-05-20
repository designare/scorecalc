(function() {

	/**
	 * コンストラクタ
	 */
	Storage = function() {};

	/**
	 * 定数宣言
	 */
	Storage.Config = {
		KEY: {
			'MODE': 'MODE',
			'BASE_SCORE_PLUS': 'BASE_SCORE_PLUS',
			'BASE_SCORE_MINUS': 'BASE_SCORE_MINUS'
		}
	};
	
	/*----------------------
	 * private利用メソッド
	 ----------------------*/
	/**
	 * 値登録
	 */
	Storage._set = function(name, value) {
		console.log('Storage._set name='+name +' value='+value);

		// キー取得
		var key = Storage._getKey(name);
		if (key === false) return false;
		
		// ローカルストレージへ値登録
		localStorage.setItem(key, value);
		return true;
	};
		
	/**
	 * 値取得
	 */
	Storage._get = function(name) {
		console.log('Storage._get name='+name);

		// キー取得
		var key = Storage._getKey(name);
		if (key === false) return null;

		// ローカルストレージから値取得
		return localStorage.getItem(key);
	},

	/**
	 * キー取得
	 */
	Storage._getKey = function(name) {
		var key = Storage.Config.KEY[name];
		if (typeof key === 'undefined') {
			console.log('Storage._getKey error: ' +name+'=>'+key);
			return false;
		}
		return key;
	};

	/*----------------------
	 * setter / getter
	 ----------------------*/
	/**
	 * モード
	 */
	Storage.setMode = function(value) {return Storage._set('MODE', value)};
	Storage.getMode = function() {return Storage._get('MODE')};

	/**
	 * ベーススコア（加点モード）
	 */
	Storage.setBaseScorePlus = function(value) {return Storage._set('BASE_SCORE_PLUS', value)};
	Storage.getBaseScorePlus = function() {return Storage._get('BASE_SCORE_PLUS')};

	/**
	 * ベーススコア（減点モード）
	 */
	Storage.setBaseScoreMinus = function(value) {return Storage._set('BASE_SCORE_MINUS', value)};
	Storage.getBaseScoreMinus = function() {return Storage._get('BASE_SCORE_MINUS')};

})();