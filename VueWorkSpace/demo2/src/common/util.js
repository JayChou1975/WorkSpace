import axios from 'axios';
import config from '../common/config';
import EXIF from 'exif-js'
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
	var len = len - (s + '').length;
	for (var i = 0; i < len; i++) {
		s = '0' + s;
	}
	return s;
};

export default {
	//根据类型返回配置url
	getBaseUrl: function(type) {
		//登录
		if (type == 'ccfanApiUrl') {
			return config.ccfanApiUrl;
			// return location.hostname == 'localhost' ? config.ccfanApiUrl : (location.origin + '/');
		}
		//node api
		if (type == 'apiUrl') {
			return config.apiUrl;
			// return location.hostname == 'localhost' ? config.apiUrl : (location.origin + '/napi/');
		}
		//pic api
		if (type == 'picUrl') {
			return config.picUrl;
			// return location.hostname == 'localhost' ? config.picUrl : (location.origin + '/');
		}	
		//tancl-fudy api
		if (type == 'pyApi') {
			return config.pyApi;
			// return location.hostname == 'localhost' ? config.picUrl : (location.origin + '/');
		}		
	},
	//设置缓存
	localStorageSet: function(item, value) {
		let data = localStorage.local;
		if (data) {
			data = JSON.parse(data);
		} else {
			data = {};
		}
		data[item] = value;
		localStorage.setItem('local', JSON.stringify(data));
	},
	//获取缓存
	localStorageGet: function(key) {
		let data = localStorage.local;
		if (data) {
			data = JSON.parse(data);
			return data[key] || null;
		}
		return null;
	},
	clearLoginInfo: function() {
		this.localStorageSet('token', '');
		this.localStorageSet('userAgent', '');
	},
	//校验token，suss：成功回调
	tokenCheck(token, suss) {
		let util = this,
			base, ajaxConfig = {};
		base = util.getBaseUrl('apiUrl');// + 'scrm-app-web';
		ajaxConfig.params = {
			info: token,
			timer: (new Date()).getTime()
		};
		axios.get(base + 'user/m', ajaxConfig).then(function(res) {
			let resD = res.data;
			if (resD.code == 1001) {
				util.localStorageSet('token', resD.result.token);
				util.localStorageSet('userAgent', resD.result.userName);
				if (suss && typeof suss == 'function') {
					suss();
				}
			}
		}).catch(function(err) {
			console.log(err)
		});
	},
	//判断终端
	device: function() {
		let u = navigator.userAgent;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端		
		if (isAndroid) {
			return 'Android'
		}
		if (isiOS) {
			return 'Ios'
		}
		return ''
	},
	statusString: function(statuCode) {
		var statuCodeObj = config.backCode;
		return !statuCodeObj[statuCode] && "网络开小差了,请稍后再试" || statuCodeObj[statuCode];
	},
	getDeviceInfo: function(success, error) {
		//设备信息格式{name:"设备名称",platform:"设备类型",uuid:"通用唯一标识符",version:"操作系统版本",mac:"MAC地址"}
		if (success) {
			if (window.MacAddress) {
				window.MacAddress.getMacAddress(
					function(macAddress) {
						success({
							mac: macAddress
						});
					},
					function(fail) {
						console.log(fail);
					}
				);
			} else {
				success();
			}

		}

	},
	//url参数
	getQueryStringByName: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		var context = "";
		if (r != null)
			context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	},
	//日期格式化
	formatDate: function(date, pattern) {
		if (!date) return;
		if (!(date instanceof Date)) {
			date = new Date(date.replace(/-/g, '/'));
		}
		pattern = pattern || DEFAULT_PATTERN;
		var parse = function(dateString, pattern) {
			var matchs1 = pattern.match(SIGN_REGEXP);
			var matchs2 = dateString.match(/(\d)+/g);
			if (matchs1.length == matchs2.length) {
				var _date = new Date(1970, 0, 1);
				for (var i = 0; i < matchs1.length; i++) {
					var _int = parseInt(matchs2[i]);
					var sign = matchs1[i];
					switch (sign.charAt(0)) {
						case 'y':
							_date.setFullYear(_int);
							break;
						case 'M':
							_date.setMonth(_int - 1);
							break;
						case 'd':
							_date.setDate(_int);
							break;
						case 'h':
							_date.setHours(_int);
							break;
						case 'm':
							_date.setMinutes(_int);
							break;
						case 's':
							_date.setSeconds(_int);
							break;
					}
				}
				return _date;
			}
			return null;
		};
		return pattern.replace(SIGN_REGEXP, function($0) {
			switch ($0.charAt(0)) {
				case 'y':
					return padding(date.getFullYear(), $0.length);
				case 'M':
					return padding(date.getMonth() + 1, $0.length);
				case 'd':
					return padding(date.getDate(), $0.length);
				case 'w':
					return date.getDay() + 1;
				case 'h':
					return padding(date.getHours(), $0.length);
				case 'm':
					return padding(date.getMinutes(), $0.length);
				case 's':
					return padding(date.getSeconds(), $0.length);
			}
		});
	},
	//今天昨天判断，date：字符串日期，返回例子：今天14:23,昨天13:11,4月6日16:12
	todayText: function(getdate) {
		if (!getdate) return;
		getdate = getdate.replace(/-/g, '/');
		
		let ptime = new Date(getdate).getTime();
		   
		const twentyFourHours = 24 * 60 * 60 * 1000;
		const fortyEightHours = 24 * 60 * 60 * 1000 * 2;
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const today = `${year}-${month}-${day}`; 
		const todayTime = new Date(today).getTime();
		const yesterdayTime = new Date(todayTime - twentyFourHours).getTime();
		const lastYesterdayTime = new Date(todayTime - fortyEightHours).getTime();
			
		if( ptime >= todayTime ){
			return '今天' + getdate.substring(11, 16);
		}
		else if( ptime < todayTime && yesterdayTime <= ptime ){
			return '昨天' + getdate.substring(11, 16);
		}
		else if( ptime < yesterdayTime && lastYesterdayTime <= ptime ){
			return '前天 '+ getdate.substring(11, 16);
		}
		else{
			return this.formatDate(getdate, 'M') + '月' + this.formatDate(getdate, 'd') + '日' + getdate.substring(11,
			16);
		}
	},
	//时分判断，date：字符串日期，返回例子：40分钟前,2小时40分钟前,2019-05-02 16:12
	timeText: function(date) {
		if (!date) return;
		date = date.replace(/-/g, '/');
		let today = new Date(),
			getday = new Date(date),
			diff = today.getTime() - getday.getTime(),
			d = diff / (1000 * 60 * 60 * 24); //天
		//一天前的直接显示日期
		if (d > 1) {
			return this.formatDate(date, 'M') + '月' + this.formatDate(date, 'd') + '日' + date.substring(11,
				16);
		}
		let h = parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), //时
			m = parseInt((diff % (1000 * 60 * 60)) / (1000 * 60)); //分
		if (h == 0) {
			return m + '分钟前'
		}
		if (h > 0) {
			return h + '小时' + m + '分钟前'
		}
	},
	//textarea文本内容处理
	textareaVal: {
		//替换特殊符号，用于保存
		transcoding: function(val) {
			console.log(val)
			//替换'<'，'>','"'
			val = val.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			//替换'\r\n'，' '
			val = val.replace(/[\r\n]/gi, '<br/>').replace(/[ ]/g, '&nbsp;');
			return val;
		},
		//还原特殊符号，用于赋值给textarea
		reduction: function(val) {
			//还原'\r\n'，' '
			val = val.replace(/<br\/>/gi, '\r\n').replace(/&nbsp;/g, ' ');
			//还原'<'，'>','"'
			val = val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
			return val;
		},
	},

	//图片压缩和拍照时旋转的处理
	compressImg: function(file, suss) {
		let Orientation;
		//去获取拍照时的信息，解决拍出来的照片旋转问题
		EXIF.getData(file, function() {
			Orientation = EXIF.getTag(this, 'Orientation');
		});
		let rotateImg = function(img, direction, canvas) {
			//最小与最大旋转方向，图片旋转4次后回到原方向
			const min_step = 0;
			const max_step = 3;
			if (img == null) return;
			//img的高度和宽度不能在img元素隐藏后获取，否则会出错
			let height = img.height;
			let width = img.width;
			let step = 2;
			if (step == null) {
				step = min_step;
			}
			if (direction == 'right') {
				step++;
				//旋转到原位置，即超过最大值
				step > max_step && (step = min_step);
			} else {
				step--;
				step < min_step && (step = max_step);
			}
			//旋转角度以弧度值为参数
			let degree = step * 90 * Math.PI / 180;
			let ctx = canvas.getContext('2d');
			switch (step) {
				case 0:
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0);
					break;
				case 1:
					canvas.width = height;
					canvas.height = width;
					ctx.rotate(degree);
					ctx.drawImage(img, 0, -height);
					break;
				case 2:
					canvas.width = width;
					canvas.height = height;
					ctx.rotate(degree);
					ctx.drawImage(img, -width, -height);
					break;
				case 3:
					canvas.width = height;
					canvas.height = width;
					ctx.rotate(degree);
					ctx.drawImage(img, -width, 0);
					break;
			}
		};
		let compress = function(img, Orientation) {
			let canvas = document.createElement("canvas");
			let ctx = canvas.getContext('2d');
			//瓦片canvas
			let tCanvas = document.createElement("canvas");
			let tctx = tCanvas.getContext("2d");
			let initSize = img.src.length;
			let width = img.width;
			let height = img.height;
			//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
			let ratio;
			if ((ratio = width * height / 1500000) > 1) {
				ratio = Math.sqrt(ratio);
				width /= ratio;
				height /= ratio;
			} else {
				ratio = 1;
			}
			canvas.width = width;
			canvas.height = height;
			//        铺底色
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			//如果图片像素大于100万则使用瓦片绘制
			let count;
			if ((count = width * height / 1000000) > 1) {
				count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
				//            计算每块瓦片的宽和高
				let nw = ~~(width / count);
				let nh = ~~(height / count);
				tCanvas.width = nw;
				tCanvas.height = nh;
				for (let i = 0; i < count; i++) {
					for (let j = 0; j < count; j++) {
						tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
						ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
					}
				}
			} else {
				ctx.drawImage(img, 0, 0, width, height);
			}
			//修复ios上传图片的时候 被旋转的问题
			if (Orientation != "" && Orientation != 1) {
				switch (Orientation) {
					case 6: //需要顺时针（向左）90度旋转
						rotateImg(img, 'left', canvas);
						break;
					case 8: //需要逆时针（向右）90度旋转
						rotateImg(img, 'right', canvas);
						break;
					case 3: //需要180度旋转
						rotateImg(img, 'right', canvas); //转两次
						rotateImg(img, 'right', canvas);
						break;
				}
			}
			//进行最小压缩
			let ndata = canvas.toDataURL('image/jpeg', 0.7);
			tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
			
			//base64转为file对象
			var arr = ndata.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			//根据类型生成file对象
			return new File([u8arr], new Date().getTime() + ".jpg", {
				type: "image/jpeg"
			});
		};
		// 看支持不支持FileReader  
		if (!file || !window.FileReader) {
			suss(file);
		} else {
			if (/^image/.test(file.type)) {
				// 创建一个reader
				let reader = new FileReader();
				// 将图片2将转成 base64 格式
				reader.readAsDataURL(file);
				// 读取成功后的回调
				reader.onloadend = function() {
					let result = this.result;
					let img = new Image();
					img.src = result;
					//判断图片是否大于100K,是就直接上传，反之压缩图片
					if (this.result.length <= (100 * 1024)) {
						suss(file);
					} else {
						img.onload = function() {
							let file = compress(img, Orientation);
							suss(file);
						}
					}
				}
			}
		}
	},
	//检查汉字数量
	checkWordsSum: function(check_str) {
		var chineseArray = [];
		check_str.replace((/[\u4e00-\u9fa5]/gm), function() {
			var text = arguments[0];
			var index = arguments[arguments.length - 2];
			chineseArray.push({
				text: text,
				index: index
			});
			return text;
		});
		return chineseArray.length;
	},
	//阻止冒泡
	stopBubble: function(e) {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		}
		if (window.event) {
			window.event.cancelBubble = true;
			return false;
		}
		return false;
	},
	//表单验证
	valid: function(option, value, callback) {
		//console.log(option, value);
		let rule = {
			//名称验证
			'name': {
				'reg': /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
				'error': '1-20个字符的中文、字母、数字或“-”“_”的组合'
			},
			//中文验证
			'chinese': {
				'reg': /^[\u4e00-\u9fa5]+$/,
				'error': '中文字符'
			},
			//英文验证
			'english': {
				'reg': /^[A-Za-z0-9]+$/,
				'error': '英文'
			},
			//手机号验证
			'mobile': {
				'reg': /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/,
				'error': '输入不正确'
			},
			//国内座机号验证
			'phone': {
				'reg': /^(\d{3}-\d{8}|\d{4}-\d{7,8})$/,
				'error': '输入不正确'
			},
			//密码验证
			'password': {
				'reg': /^[0-9a-zA-Z!@$#%*,.;\'\|\{\}\[\]\-\_\+\/\\]{6,16}$/,
				'error': '6~16位的数字、字母或符号的组合'
			},
			//账户验证
			'acount': {
				'reg': /^[0-9a-zA-Z]{4,20}$/,
				'error': '4-20个字符的字母或数字的组合'
			},
			//字母、数字验证
			'num-and-ler': {
				'reg': /^[0-9a-zA-Z]{4,20}$/,
				'error': '4-20个字符的字母或数字的组合'
			},
			//邮箱验证
			'email': {
				'reg': /\w[-\w.+]*@([A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
				'error': '输入不正确'
			},
			//正数验证
			'positive-number': {
				'reg': /^([0-9]+(\.[0-9]{1})?|0\.[1-9])$/,
				'error': '大于或等于零的数字(支持一位小数点)'
			},
			//number验证
			'number': {
				'reg': /^[0-9]+\.{0,1}[0-9]{0,1}$/,
				'error': '大于或等于零的数字'
			},
			//正整数验证
			'integer': {
				'reg': /^[1-9]\d*$/,
				'error': '正整数'
			},
			//正整数和零验证
			'integer-and-zero': {
				'reg': /^([1-9]\d*|0)$/,
				'error': '正整数和零'
			},
			//日期
			'date': {
				'reg': /^\d{4}-\d{1,2}-\d{1,2}/,
				'error': '日期'
			},
			//身份证号
			'IdNo': {
				'reg': /^\d{15}|\d{18}$/,
				'error': '身份证号'
			},
			//网站地址
			'website': {
				'reg': new RegExp("^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
					+
					"(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
					+
					"|" // 允许IP和DOMAIN（域名）
					+
					"([0-9a-z_!~*'()-]+\.)*" // 域名- www.
					+
					"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
					+
					"[a-z]{2,6})" // first level domain- .com or .museum
					+
					"(:[0-9]{1,4})?" // 端口- :80
					+
					"((/?)|" // a slash isn't required if there is no file name
					+
					"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"),
				'error': '网站地址'
			},
		};
		if (!value) {
			callback(new Error('请输入' + option.name));
			return;
		}
		let thisReg = rule[option.type] ? rule[option.type].reg : rule[option.field].reg,
			thisRuleError = rule[option.type] ? rule[option.type].error : rule[option.field].error,
			thisError = option.message || thisRuleError;
		if (!thisReg.test(value)) {
			callback(new Error(thisError));
		} else {
			callback();
		}
	},
	//①判断浏览器类型
	myBrowser: function() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1;
		if (isOpera) {
			return "Opera"
		};
		if (userAgent.indexOf("Firefox") > -1) {
			return "FF";
		};
		//包含Chrome和Safari属性，所以放到Chrome前面判断
		if (userAgent.indexOf("Edge") > -1) {
			return "Edge";
		};
		//包含Safari属性，所以放到Safari前面判断
		if (userAgent.indexOf("Chrome") > -1) {
			return "Chrome";
		};
		if (userAgent.indexOf("Safari") > -1) {
			return "Safari";
		};
		if (userAgent.indexOf("Trident") > -1 && !isOpera) {
			return "IE";
		};
	
	},
	fontSize:function(res){
		let docEl = document.documentElement,
			clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
		if (!clientWidth) return;
		let fontSize = 100 * (clientWidth / 1920);
		return res*fontSize;
	},
	convertCanvasToImage:function(canvas) {
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		// console.log()
		return image;
	}
};
