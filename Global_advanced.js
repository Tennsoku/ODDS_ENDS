/*********Global***********/
//Code Copy & Revised From av411036 by UHI


var playerState = Player.state;
if (playerState == 'playing')
	Player.pause();

load("libBitmap", function() {
	var $$ = {};

	$$.PI = 3.14159265;
	$$.lastFrame = 0;
	$$.updaters = [];
	$$.addFrameUpdater = function(caller, func) {
		$$.updaters.push({
			c: caller,
			f: func
		});
	};
	$$.removeFrameUpdater = function(func) {
		var length = $$.updaters.length;
		for (var i = 0; i < length; ++i) {
			if ($$.updaters[i].f == func) {
				$$.updaters.splice(i, 1);
				break;
			}
		}
	};
	$$.clearFrameUpdaters = function() {
		$$.updaters.length = 0;
	};
	$$.hasFrameUpdater = function(func) {
		var length = $$.updaters.length;
		for (var i = 0; i < length; ++i) {
			if ($$.updaters[i].f == func) {
				return true;
			}
		}
		return false;
	};
	$$.update = function(e) {
		var frame = getTimer();
		if ($$.lastFrame == 0)
			$$.lastFrame = frame;
		var delta = (frame - $$.lastFrame) * 0.001;
		$$.lastFrame = frame;

		var length = $$.updaters.length;
		for (var i = 0; i < length; ++i)
			$$.updaters[i].f.call($$.updaters[i].c, delta);
	};
	$$.resetTimer = function() {
		$$.lastFrame = getTimer();
	};
	$$.createEternalCanvas = function() {
		var obj = $.createCanvas({
			x: 0,
			y: 0,
			lifeTime: 0
		});
		(obj.motionManager).reset();
		obj.transform.matrix3D = null;
		return obj;
	};
	$$.createEternalShape = function() {
		var obj = $.createShape({
			x: 0,
			y: 0,
			lifeTime: 0
		});
		(obj.motionManager).reset();
		obj.transform.matrix3D = null;
		return obj;
	};
	$$.createIsolatedCanvas = function() {
		var obj = $.createCanvas({
			x: 0,
			y: 0,
			lifeTime: 0
		});
		$.root.removeChild(obj);
		(obj.motionManager).reset();
		obj.transform.matrix3D = null;
		return obj;
	};
	$$.createIsolatedShape = function() {
		var obj = $.createShape({
			x: 0,
			y: 0,
			lifeTime: 0
		});
		$.root.removeChild(obj);
		(obj.motionManager).reset();
		obj.transform.matrix3D = null;
		return obj;
	};
	$$.createIsolatedBitmap = function(bitmapData) {
		var obj = Bitmap.createBitmap({
			lifeTime: 0,
			bitmapData: bitmapData
		});
		$.root.removeChild(obj);
		(obj.motionManager).reset();
		obj.transform.matrix3D = null;
		return obj;
	};
	$$.makeBitmapData = function(obj) {
		var bitmapData = Bitmap.createBitmapData(543, 386, true, 0);
		bitmapData.draw(obj);
		return bitmapData;
	};
	$$.createIsolatedBitmapFromShape = function(shape) {
		return $$.createIsolatedBitmap($$.makeBitmapData(shape));
	};
	$$.random = function(min, max) {
		return Math.random() * (max - min) + min;
	};

	function createLoading() {
		var loading = {};
		loading.canvas = $.createCanvas({
			x: 0,
			y: 0,
			lifeTime: 0
		});
		loading.canvas.transform.matrix3D = null;

		loading.logText = $.createComment('', {
			x: 0,
			y: 0,
			lifeTime: 0,
			parent: loading.canvas
		});
		loading.logText.transform.matrix3D = null;
		loading.logText.x = 8;
		loading.logText.y = 348;
		loading.bar = $.createShape({
			x: 0,
			y: 0,
			lifeTime: 0,
			parent: loading.canvas
		});
		loading.bar.transform.matrix3D = null;
		loading.bar.x = 8;
		loading.bar.y = $.height / 6 * 5;
		loading.bar.filters = [$.createGlowFilter(0xFFFFFF, 1, 5, 5, 0.8, 3)];

		loading.status = 0;
		loading.time = 0;
		loading.base = 0;

		loading.prepare = function() {
			if ($.root.contains(loading.canvas))
				$.root.removeChild(loading.canvas);
			$.root.addChild(loading.canvas);
		};
		loading.update = function(d) {
			function calculate(t, b, c, d) {
				return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			}

			this.time += d;
			if (this.status == 0) {
				if (this.time >= 1.0) {
					this.value = $.width - 16;
					this.time = 0;
					this.status = 1;
				} else
					this.value = calculate(this.time, this.base, $.width - 16 - this.base, 1.0);
				this.redraw();
			} else if (this.status == 1) {
				if (this.time >= 1.0) {
					this.time = 0;
					this.status = 2;
				}
			} else if (this.status == 2) {
				if (this.time >= 1.0) {
					this.remove();
				} else
					this.canvas.alpha -= d;
			}
		};
		loading.redraw = function() {
			this.bar.graphics.clear();
			this.bar.graphics.beginFill(0xFFFFFF);
			this.bar.graphics.drawRect(0, 0, this.value, $.height / 20);
			this.bar.graphics.endFill();
		};
		loading.remove = function() {
			$.root.removeChild(this.canvas);
			$$.removeFrameUpdater(this.update);
		};
		loading.change = function(v) {
			this.value = v;
			this.redraw();
		};
		loading.finish = function() {
			this.base = this.value;
			$$.resetTimer();
			if (!$$.hasFrameUpdater(this.update))
				$$.addFrameUpdater(this, this.update);
		};
		loading.change(3);
		return loading;
	}
	$$.loading = createLoading();

	$G._set('$$', $$);
	var sys = $.createCanvas({
		x: 0,
		y: 0,
		lifeTime: 0
	});
	(sys.motionManager).reset();
	sys.visible = false;
	sys.addEventListener("enterFrame", $$.update);

	if (playerState == 'playing')
		Player.play();
});