(function() {

	/**
	 * コンストラクタ
	 */
	CalculatorViewLayout = function() {
		
		/*
		 * メンバ変数
		 */
		this._pxGrid = {width: 0, height: 0};
		
		// 初期処理
		this._initialize();
		
	};

	/**
	 * 定数宣言
	 */
	CalculatorViewLayout.Config = {
		
		pxMargin: {top: 8, right: 8, bottom: 8, left: 8},
		grids: {width: 60, height: 73},
		
		contents: {
			displayFormula: {
				layout: {
					grids: {top: 0, left: 0, width: 60, height: 9},
					pxPadding: {top: 0, right: 0, bottom: 0, left: 0}
				}
			},
			displayScore: {
				layout: {
					grids: {top: 0, left: 0, width: 60, height: 14},
					pxPadding: {top: 0, right: 0, bottom: 0, left: 0}
				},
				labelFullScore: {
					layout: {
						grids: {top: 0, left: 0, width: 14, height: 2},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				labelLossScore: {
					layout: {
						grids: {top: 0, left: 23, width: 14, height: 2},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				labelTotalScore: {
					layout: {
						grids: {top: 0, left: 46, width: 14, height: 2},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				
				valueFullScore: {
					layout: {
						grids: {top: 2, left: 0, width: 14, height: 6},
						pxPadding: {top: 4, right: 2, bottom: 2, left: 2}
					}
				},
				labelMinus: {
					layout: {
						grids: {top: 2, left: 14, width: 9, height: 6},
						pxPadding: {top: 8, right: 2, bottom: 2, left: 2}
					}
				},
				valueLossScore: {
					layout: {
						grids: {top: 2, left: 23, width: 14, height: 6},
						pxPadding: {top: 8, right: 2, bottom: 2, left: 2}
					}
				},
				labelEqual: {
					layout: {
						grids: {top: 2, left: 37, width: 9, height: 6},
						pxPadding: {top: 8, right: 2, bottom: 2, left: 2}
					}
				},
				valueTotalScore: {
					layout: {
						grids: {top: 2, left: 46, width: 14, height: 6},
						pxPadding: {top: 8, right: 2, bottom: 2, left: 2}
					}
				},
				displayAverage: {
					layout: {
						grids: {top: 9, left: 0, width: 60, height: 5},
						pxPadding: {top: 6, right: 4, bottom: 2, left: 4}
					}
				},
			},
			calculator: {
				layout: {
					grids: {top: 0, left: 0, width: 60, height: 50},
					pxPadding: {top: 0, right: 0, bottom: 0, left: 0}
				},
				button1: {
					layout: {
						grids: {top: 20, left: 0, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button2: {
					layout: {
						grids: {top: 20, left: 20, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button3: {
					layout: {
						grids: {top: 20, left: 40, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button4: {
					layout: {
						grids: {top: 10, left: 0, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button5: {
					layout: {
						grids: {top: 10, left: 20, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button6: {
					layout: {
						grids: {top: 10, left: 40, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button7: {
					layout: {
						grids: {top: 0, left: 0, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button8: {
					layout: {
						grids: {top: 0, left: 20, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button9: {
					layout: {
						grids: {top: 0, left: 40, width: 20, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				button10: {
					layout: {
						grids: {top: 30, left: 0, width: 60, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				buttonC: {
					layout: {
						grids: {top: 40, left: 0, width: 15, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				buttonAC: {
					layout: {
						grids: {top: 40, left: 0, width: 15, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				buttonUndo: {
					layout: {
						grids: {top: 40, left: 15, width: 15, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				buttonBack: {
					layout: {
						grids: {top: 40, left: 30, width: 15, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				},
				buttonNext: {
					layout: {
						grids: {top: 40, left: 45, width: 15, height: 10},
						pxPadding: {top: 2, right: 2, bottom: 2, left: 2}
					}
				}
			}
		}

	};
	
	/**
	 * メソッド宣言
	 */
	CalculatorViewLayout.prototype = {
		
		/**
		 * 初期処理
		 */
		_initialize: function() {
			
			// サイズセット
			this._setSize();
			
			// 描画後に表示させる
			$('body').css({visibility: 'visible'});
			
			// 画面リサイズイベント登録
//			$(window).bind('resize', this, function(e){
//				e.data._setSize();
//			});
			
		},
		
		/**
		 * 値取得
		 */
		_getValue: function(value) {
			return _.isNumber(value) ? value : 0;
		},

		/**
		 * サイズセット
		 */
		_setSize: function() {
			var config = eval('CalculatorViewLayout.Config');
			this._pxGrid.width = (document.documentElement.clientWidth - this._getValue(config.pxMargin.left) - this._getValue(config.pxMargin.right)) / this._getValue(config.grids.width);
			this._pxGrid.height = (document.documentElement.clientHeight - this._getValue(config.pxMargin.top) - this._getValue(config.pxMargin.bottom)) / this._getValue(config.grids.height);
			this._render();
		},
		
		/**
		 * レイアウト取得
		 */
		_getLayout: function(element) {
			var config = eval('CalculatorViewLayout.Config.contents.' + element + '.layout');
			return {
				top: this._pxGrid.height * this._getValue(config.grids.top) + this._getValue(config.pxPadding.top),
				left: this._pxGrid.width * this._getValue(config.grids.left) + this._getValue(config.pxPadding.left),
				width: this._pxGrid.width * this._getValue(config.grids.width) - this._getValue(config.pxPadding.left) - this._getValue(config.pxPadding.right),
				height: this._pxGrid.height * this._getValue(config.grids.height) - this._getValue(config.pxPadding.left) - this._getValue(config.pxPadding.right),
			};
		},
		
		/**
		 * 描画
		 */
		_render: function() {
			
			/*
			 * 大枠
			 */
			$('#displayFormula').css( this._getLayout('displayFormula') );
			$('#displayScore').css( this._getLayout('displayScore') );
			$('#calculator').css( this._getLayout('calculator') );

			/*
			 * アラートダイアログ
			 */
			$('#alert').css( {width:$('#displayFormula').css("width")} );

			/*
			 * スコア表示部
			 */
			$('#displayScore #labelFullScore').css( this._getLayout('displayScore.labelFullScore') );
			$('#displayScore #labelLossScore').css( this._getLayout('displayScore.labelLossScore') );
			$('#displayScore #labelTotalScore').css( this._getLayout('displayScore.labelTotalScore') );
			$('#displayScore #valueFullScore').css( this._getLayout('displayScore.valueFullScore') );
			$('#displayScore #labelMinus').css( this._getLayout('displayScore.labelMinus') );
			$('#displayScore #valueLossScore').css( this._getLayout('displayScore.valueLossScore') );
			$('#displayScore #labelEqual').css( this._getLayout('displayScore.labelEqual') );
			$('#displayScore #valueTotalScore').css( this._getLayout('displayScore.valueTotalScore') );
			$('#displayScore #displayAverage').css( this._getLayout('displayScore.displayAverage') );

			$('span').each(function(i){
				var obj = $(this);
				obj.css({"line-height": obj.css("height")});	// ラベル、数値の文字を高さ中央揃え
			});
			var obj = $('#displayAverage');
			obj.css({"line-height": obj.css("height")});

			/*
			 * 電卓ボタン部
			 */
			$('#calculator #button1').css( this._getLayout('calculator.button1') );
			$('#calculator #button2').css( this._getLayout('calculator.button2') );
			$('#calculator #button3').css( this._getLayout('calculator.button3') );
			$('#calculator #button4').css( this._getLayout('calculator.button4') );
			$('#calculator #button5').css( this._getLayout('calculator.button5') );
			$('#calculator #button6').css( this._getLayout('calculator.button6') );
			$('#calculator #button7').css( this._getLayout('calculator.button7') );
			$('#calculator #button8').css( this._getLayout('calculator.button8') );
			$('#calculator #button9').css( this._getLayout('calculator.button9') );
			$('#calculator #button10').css( this._getLayout('calculator.button10') );
			$('#calculator #buttonC').css( this._getLayout('calculator.buttonC') );
			$('#calculator #buttonAC').css( this._getLayout('calculator.buttonAC') );
			$('#calculator #buttonUndo').css( this._getLayout('calculator.buttonUndo') );
			$('#calculator #buttonBack').css( this._getLayout('calculator.buttonBack') );
			$('#calculator #buttonNext').css( this._getLayout('calculator.buttonNext') );
			
			$('.button').each(function(i){
				var obj = $(this);
				obj.css({"line-height": obj.css("height")});	// ボタン文字を高さ中央揃え
			});
			
			
		}

	};

})();