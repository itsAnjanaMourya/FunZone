function t(t, e, i, s) {
    this.topLeft = {
       x: t,
       y: e
    }, this.bottomRight = {
       x: t + i,
       y: e + s
    }
 }
 
 function e(t, e) {
    this.boundingBox = t, this.onTap = e
 }
 
 function i(t) {
    this.inputController = t, this.listeners = {
       keyDown: this.listener.bind(this)
    }
 }
 
 function s(t, e, i, s, n, h, o, r) {
    this.element = "undefined" != typeof t ? t : document, this.maxWidth = t.width || t.offsetWidth || t.clientWidth || window.innerWidth, this.callback = e, this.xPad = i, this.yMin = s, this.yMax = n, this.min = h, this.max = o, this.value = h, this.xStart = null, this.yStart = null, this.radius = r || 0, this.listeners = {
       touchStart: this.startTouch.bind(this),
       touchMove: this.determineValue.bind(this),
       touchEnd: this.endTouch.bind(this),
       mouseDown: this.startTouch.bind(this),
       mouseMove: this.determineValue.bind(this),
       mouseUp: this.endTouch.bind(this),
       keyDown: this.setValue.bind(this)
    }
 }
 
 function n(t, e) {
    this.element = "undefined" != typeof t ? t : document, this.inputController = e, this.listeners = {
       touchStart: this.startTouch.bind(this),
       touchMove: this.detectSwipe.bind(this),
       touchEnd: this.endSwipe.bind(this),
       mouseDown: this.startTouch.bind(this),
       mouseMove: this.detectSwipe.bind(this),
       mouseUp: this.endSwipe.bind(this)
    }, this.xStart = null, this.yStart = null, this.threshold = 25
 }
 
 function h(t, e) {
    this.element = "undefined" != typeof t ? t : document, this.tapRegions = Array.isArray(e) ? e : [], this.upCount = 0, this.listeners = {
       touchStart: this.tap.bind(this),
       mouseDown: this.tap.bind(this)
    }
 }
 
 function o(t, e) {
    this.puzzle = t, this.palette = e, this.index = Math.floor(t.board.columns / 2)
 }
 
 function r(t, e, i) {
    this.numberColor = t, this.boardColors = e, this.backgroundColor = i
 }
 
 function l(t, e) {
    this.prng = t, this.theme = e
 }
 
 function a(t, e, i, s) {
    this.h = t, this.s = e, this.l = i, this.a = s || 1
 }
 
 function u(t, e, i) {
    this.hue = t, this.saturation = e, this.alpha = i || 1
 }
 
 function c(t, e, i, s) {
    this.r = t, this.g = e, this.b = i, this.a = s || 1
 }
 
 function d(t) {
    this.color = t
 }
 
 function p(t, e) {
    this.board = t, this.rows = t.length, this.columns = t[0].length, this.prng = "undefined" != typeof e ? e : Math
 }
 
 function g(t, e) {
    this.number = t, this.original = t, this.board = e, this.currentRow = 0, this.history = []
 }
 
 function v(t) {
    this.seed(t), this.max = 2147483648
 }
 
 function f(t, e, i, s, n, h) {
    this.brush = t, this.renderRegion = e, this.level = i, this.levelView = s, this.statusBar = n, this.onComplete = h
 }
 
 function m(t, e, i, s) {
    this.x = t, this.y = e, this.width = i, this.height = s
 }
 
 function b(t) {
    this.paletteRange = t || 70, this.prng = new v(1), this.paletteBuilder = new u(null, null, .8)
 }
 
 function y() {
    this.paletteBuilder = new d(new a(180, 60, 30))
 }
 
 function w(t, e, i, s) {
    this.storageManager = t, this.onSelect = e, this.levelLimit = i, this.level = s
 }
 
 function x(t, e, i, s) {
    this.afterInput = t, this.onComplete = e, this.onInitialStateUp = i, this.level = s
 }
 
 function S(s) {
    this.game = s;
    var o = new m(0, 0, s.canvas.width, s.canvas.height);
    this.animation = new f(s.brush, o), this.completeView = new T(s.brush, o, s.config.theme.numberColor), this.levelCompleteController = new w(s.storageManager, function (t, e) {
       this.nextLevel = s.levels.get(t), s.transition(e ? "PLAYING" : "SELECT")
    }.bind(this)), this.levelCompleteController.levelLimit = s.config.levelLimit;
    var r = new e(new t(0, .825 * o.height, .5 * o.width - 1, .1 * o.height), function () {
          this.levelCompleteController.left()
       }.bind(this)),
       l = new e(new t(.5 * o.width + 1, .825 * o.height, .5 * o.width - 1, .1 * o.height), function () {
          this.levelCompleteController.right()
       }.bind(this));
    this.tapInputMethod = new h(s.canvas, [r, l]), this.keyboardInputMethod = new i(this.levelCompleteController), this.swipeInputMethod = new n(s.canvas, this.levelCompleteController)
 }
 
 function R(t) {
    this.game = t;
    var s = new m(0, .15 * t.canvas.height, t.canvas.width, .85 * t.canvas.height);
    this.levelView = new B(t.brush, s, 2, t.config.theme.numberColor), this.statusBar = new P(t.brush, new m), this.statusBar.renderRegion.height = .15 * t.canvas.height, this.levelController = new x, this.levelController.afterInput = function () {
       this.levelView.redraw()
    }.bind(this), this.levelController.onComplete = function () {
       t.transition("COMPLETE")
    }, this.levelController.onInitialStateUp = function () {
       t.transition("SELECT")
    }, this.selectTransitionTapInputMethod = new h(t.canvas, [new e(null, function () {
       t.transition("SELECT")
    })]), this.levelKeyboardInputMethod = new i(this.levelController), this.levelTouchInputMethod = new n(t.canvas, this.levelController)
 }
 
 function L(t) {
    this.game = t;
    var i = new I(t.brush, new m(0, 0, t.canvas.width, t.canvas.height), t.storageManager, t.config.theme);
    this.selectView = i;
    var n = new s(t.canvas, function (t, e, s, n) {
       i.redraw(t, e, s, n)
    });
    this.sliderInput = n;
    var o = function () {
       var e = n.value;
       t.levelIsAvailable(e) && t.transition("PLAYING")
    };
    this.sliderInput.onSelect = o, this.playButtonInput = new h(t.canvas, [new e(null, o)]), this.sliderTapInput = new h(t.canvas, [new e(null, function () {
       n.trigger(n.value - 1)
    }), new e(null, function () {
       n.trigger(n.value + 1)
    })])
 }
 
 function C(t) {
    this.game = t, this.playingState = new R(t);
    var e = new m(null, .005 * t.canvas.height, null, .1 * t.canvas.height),
       i = new E(t.brush, e, t.config.theme.textColor, t.config.theme.textBackground);
    this.tutorial = i;
    var s = this.playingState.levelController.afterInput,
       n = function () {
          s(), i.draw()
       };
    this.playingState.levelController.afterInput = n, this.playingState.levelController.onInitialStateUp = null
 }
 
 function z(t, e, i) {
    try {
       t.setItem("__available__", !0), t.removeItem && t.removeItem("__available__")
    } catch (s) {
       throw "Storage method is not currently available."
    }
    this.storageMethod = t, this.prefix = e || "", this.bucketSize = i || 16, this.cachedLevelResults = [], this.cacheLevelResults()
 }
 
 function k(t) {
    this.results = t
 }
 
 function M(t, e) {
    try {
       t.setItem("__available__", !0), t.removeItem && t.removeItem("__available__")
    } catch (i) {
       throw "Storage method is not currently available."
    }
    this.storageMethod = t, this.prefix = e || ""
 }
 
 function T(t, e, i, s, n) {
    this.brush = t, this.renderRegion = e, this.textColor = i, this.level = s, this.score = n
 }
 
 function I(t, e, i, s, n, h) {
    this.brush = t, this.renderRegion = e, this.storageManager = i, this.theme = s, this.sliderY = .5 * this.renderRegion.height, this.blockSize = n, this.xPad = h || 0
 }
 
 function B(t, e, i, s, n) {
    this.brush = t, this.renderRegion = e, this.spacing = i, this.numberColor = s, this.level = n, this.last = this.level
 }
 
 function P(t, e, i, s, n, h) {
    this.brush = t, this.fontSize = i, this.renderRegion = e, this.score = s, this.level = n, this.offsetTop = h || 0
 }
 
 function E(t, e, i, s, n, h) {
    this.brush = t, this.renderRegion = e, this.textColor = i, this.blockColor = s, this.borderColor = n || i, this.level = h, this.initial = !0, this.up = !1, this.done = !1, this.lines = ["Swipe or type left or right.", "Swipe or type down to make a move.", "Swipe or type up to start over.", "Factors divide. Others add. Go for 1."], this.currentLine = ""
 }
 
 function FactorsGame(t, e, i, s, n) {
    this.levels = t, this.config = e, this.storageManager = i, this.score = s, this.canvas = n, this.brush = n.getContext("2d"), this.brush.clearAll = function () {
       this.clearRect(0, 0, n.width, n.height)
    }, this.states = {
       TUTORIAL: new C(this),
       PLAYING: new R(this),
       COMPLETE: new S(this),
       SELECT: new L(this)
    }, this.state = null
 }
 t.prototype.isPointWithin = function (t, e) {
    return this.topLeft.x > t || t > this.bottomRight.x ? !1 : this.topLeft.y > e || e > this.bottomRight.y ? !1 : !0
 }, i.prototype.listener = function (t) {
    switch (t.keyCode) {
       case 37:
       case 65:
       case 72:
          t.preventDefault(), this.inputController.left();
          break;
       case 40:
       case 74:
       case 83:
          t.preventDefault(), this.inputController.down();
          break;
       case 38:
       case 75:
       case 87:
          t.preventDefault(), this.inputController.up();
          break;
       case 39:
       case 68:
       case 76:
          t.preventDefault(), this.inputController.right()
    }
 }, i.prototype.listen = function () {
    document.addEventListener("keydown", this.listeners.keyDown)
 }, i.prototype.detach = function () {
    document.removeEventListener("keydown", this.listeners.keyDown)
 }, s.prototype.listen = function () {
    this.element.addEventListener("touchstart", this.listeners.touchStart), this.element.addEventListener("touchmove", this.listeners.touchMove), this.element.addEventListener("touchend", this.listeners.touchEnd), this.element.addEventListener("mousedown", this.listeners.mouseDown), this.element.addEventListener("mousemove", this.listeners.mouseMove), this.element.addEventListener("mouseup", this.listeners.mouseUp), document.addEventListener("keydown", this.listeners.keyDown)
 }, s.prototype.startTouch = function (t) {
    t.preventDefault(), t.stopPropagation();
    var e = this.offsetPoints(t.clientX || t.touches[0].clientX, t.clientY || t.touches[0].clientY, t);
    this.xStart = e.x, this.yStart = e.y
 }, s.prototype.offsetPoints = function (t, e, i) {
    var s = i.target.getBoundingClientRect(),
       n = (this.element.width || this.element.clientWidth) / this.element.clientWidth,
       h = (this.element.height || this.element.clientHeight) / this.element.clientHeight;
    return {
       x: (t - s.left) * n,
       y: (e - s.top) * h
    }
 }, s.prototype.determineValue = function (t) {
    if (t.preventDefault(), t.stopPropagation(), !(null === this.xStart || this.xStart < this.xPad - this.radius || this.xStart > this.maxWidth - this.xPad + this.radius || this.yStart < this.yMin || this.yStart > this.yMax)) {
       var e = this.offsetPoints(t.clientX || t.touches[0].clientX, t.clientY || t.touches[0].clientY, t),
          i = e.x,
          s = (e.y, Math.max(this.min, Math.min(Math.round((i - this.xPad) * (this.max - this.min) / (this.maxWidth - 2 * this.xPad) + this.min), this.max)));
       if (this.value = s, "function" == typeof this.callback) {
          var n = Math.max(this.xPad, Math.min(i, this.maxWidth - this.xPad)),
             h = t.clientY || t.touches[0].clientY;
          this.lastX = n, this.lastY = h, this.callback(s, n, h, !1)
       }
    }
 }, s.prototype.endTouch = function (t) {
    {
       var e = this.offsetPoints(t.clientX || t.changedTouches[0].clientX, t.clientY || t.changedTouches[0].clientY, t);
       e.x, e.y
    }
    this.xStart = null, this.yStart = null, this.callback(this.value, this.lastX, this.lastY, !0)
 }, s.prototype.onSelect = function () {}, s.prototype.setValue = function (t) {
    var e = t.keyCode;
    if (e >= 48 && 57 >= e || e >= 96 && 105 >= e) {
       var i = 57 >= e ? 48 : 96,
          s = e - i,
          n = this.value.toString();
       n += s.toString(), this.value = n > this.max ? Math.min(s, this.max) : parseInt(n)
    } else if (8 === e) t.preventDefault(), this.value = Math.floor(this.value / 10);
    else switch (t.keyCode) {
       case 37:
       case 65:
       case 72:
          t.preventDefault(), this.value > this.min && (this.value -= 1);
          break;
       case 39:
       case 68:
       case 76:
          t.preventDefault(), this.value < this.max && (this.value += 1);
          break;
       case 40:
       case 74:
       case 83:
       case 13:
       case 32:
          return t.preventDefault(), void this.onSelect(this.value, t)
    }
    var h = this.min === this.max ? this.maxWidth / 2 : (Math.max(this.value, this.min) - this.min) * ((this.maxWidth - 2 * this.xPad) / (this.max - this.min)) + this.xPad;
    this.lastX = h, this.callback(this.value, h, null, !0)
 }, s.prototype.trigger = function (t) {
    if (!(t > this.max || t < this.min)) {
       var e = this.min === this.max ? this.maxWidth / 2 : (Math.max(t, this.min) - this.min) * ((this.maxWidth - 2 * this.xPad) / (this.max - this.min)) + this.xPad;
       this.lastX = e, this.value = t, this.callback(t, e, null, !0)
    }
 }, s.prototype.detach = function () {
    this.element.removeEventListener("touchstart", this.listeners.touchStart), this.element.removeEventListener("touchmove", this.listeners.touchMove), this.element.removeEventListener("touchend", this.listeners.touchEnd), this.element.removeEventListener("mousedown", this.listeners.mouseDown), this.element.removeEventListener("mousemove", this.listeners.mouseMove), this.element.removeEventListener("mouseup", this.listeners.mouseUp), document.removeEventListener("keydown", this.listeners.keyDown)
 }, n.prototype.listen = function () {
    this.element.addEventListener("touchstart", this.listeners.touchStart), this.element.addEventListener("touchmove", this.listeners.touchMove), this.element.addEventListener("touchend", this.listeners.touchEnd), this.element.addEventListener("mousedown", this.listeners.mouseDown), this.element.addEventListener("mousemove", this.listeners.mouseMove), this.element.addEventListener("mouseup", this.listeners.mouseUp)
 }, n.prototype.startTouch = function (t) {
    t.preventDefault(), this.xStart = t.clientX || t.touches[0].clientX, this.yStart = t.clientY || t.touches[0].clientY
 }, n.prototype.detectSwipe = function (t) {
    if (t.preventDefault(), null !== this.xStart && null !== this.yStart) {
       var e = t.clientX || t.changedTouches[0].clientX,
          i = t.clientY || t.changedTouches[0].clientY,
          s = e - this.xStart,
          n = i - this.yStart;
       if (!(Math.abs(s) < this.threshold && Math.abs(n) < this.threshold)) {
          var h = Math.abs(s) > Math.abs(n);
          h ? 0 > s ? this.inputController.left() : this.inputController.right() : n > 0 ? this.inputController.down() : this.inputController.up(), this.xStart = null, this.yStart = null
       }
    }
 }, n.prototype.endSwipe = function (t) {
    t.preventDefault(), this.xStart = null, this.yStart = null
 }, n.prototype.detach = function () {
    this.xStart = null, this.yStart = null, this.element.removeEventListener("touchstart", this.listeners.touchStart), this.element.removeEventListener("touchmove", this.listeners.touchMove), this.element.removeEventListener("touchend", this.listeners.touchEnd), this.element.removeEventListener("mousedown", this.listeners.mouseDown), this.element.removeEventListener("mousemove", this.listeners.mouseMove), this.element.removeEventListener("mouseup", this.listeners.mouseUp)
 }, h.prototype.add = function (t) {
    this.tapRegions.push(t)
 }, h.prototype.listen = function () {
    this.element.addEventListener("touchstart", this.listeners.touchStart), this.element.addEventListener("mousedown", this.listeners.mouseDown)
 }, h.prototype.tap = function (t) {
    t.preventDefault();
    for (var e = "touchstart" === t.type, i = t.target.getBoundingClientRect(), s = (this.element.width || this.element.clientWidth) / this.element.clientWidth, n = (this.element.height || this.element.clientHeight) / this.element.clientHeight, h = ((e ? t.touches[0].clientX : t.clientX) - i.left) * s, o = ((e ? t.touches[0].clientY : t.clientY) - i.top) * n, r = 0; r < this.tapRegions.length; r += 1) {
       var l = this.tapRegions[r];
       l.boundingBox.isPointWithin(h, o) && "function" == typeof l.onTap && l.onTap(h, o)
    }
 }, h.prototype.detach = function () {
    this.element.removeEventListener("touchstart", this.listeners.touchStart), this.element.removeEventListener("mousedown", this.listeners.mouseDown)
 }, o.prototype.getNumber = function () {
    return this.puzzle.original
 }, l.prototype.get = function (t) {
    "function" == typeof this.prng.seed && (this.prng.seed(t), this.prng.random(), this.prng.random(), this.prng.random());
    var e = this.theme.getLevelPalette(t),
       i = p.create(4, 4, this.prng);
    i.shuffle();
    var s = new g(t, i);
    return new o(s, e)
 }, a.complement = function (t) {
    return new a((t.h + 180) % 360, t.s, t.l, t.a)
 }, a.prototype.clone = function () {
    return new a(this.h, this.s, this.l, this.a)
 }, a.prototype.toString = function () {
    return "hsla(" + this.h + "," + this.s + "%," + this.l + "%," + this.a + ")"
 }, u.prototype.build = function (t, e) {
    if (1 > t) throw "Count cannot be less than 1.";
    var i = 100;
    e > i && (e = i);
    for (var s = (i - e) / 2, n = this.hue, h = this.saturation, o = this.alpha, r = e / (t - 1), l = [], u = t - 1; u >= 0; u -= 1) l.push(new a(n, h, Math.floor(r * u + s), o));
    return l
 }, c.prototype.clone = function () {
    return new c(this.r, this.g, this.b, this.a)
 }, c.prototype.toString = function () {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
 }, d.prototype.build = function (t) {
    for (var e = [], i = 0; t > i; i += 1) e.push(this.color.clone());
    return e
 }, p.create = function (t, e, i) {
    for (var s = [], n = 1, h = 0; t > h; h += 1) {
       for (var o = [], r = 0; e > r; r += 1) o.push(n), n += 1;
       s.push(o)
    }
    return new p(s, i)
 }, p.prototype.shuffle = function () {
    for (var t = 0, e = 0; e < this.board.length; e += 1)
       for (var i = 0; i < this.board[e].length; i += 1) {
          var s = Math.floor(this.prng.random() * this.board.length),
             n = Math.floor(this.prng.random() * this.board[e].length),
             t = this.board[e][i];
          this.board[e][i] = this.board[s][n], this.board[s][n] = t
       }
 }, p.prototype.get = function (t, e) {
    return "undefined" == typeof t ? this.board : "undefined" == typeof e ? this.board[t] : this.board[t][e]
 }, "undefined" != typeof Symbol && "undefined" != typeof Symbol.iterator && (p.prototype[Symbol.iterator] = function () {
    var t = this.board;
    return {
       next: function () {
          if (this._pos >= t.length) return {
             done: !0
          };
          var e = {
             value: t[this._pos],
             done: !1
          };
          return this._pos += 1, e
       },
       _pos: 0
    }
 }), g.prototype.play = function (t) {
    this.assertOngoing();
    var e = this.board.get(this.currentRow).indexOf(t);
    if (0 > e) throw "Number is not currently an option.";
    return this.playIndex(e)
 }, g.prototype.playIndex = function (t) {
    if (this.assertOngoing(), !(t in this.board.get(this.currentRow))) throw "Index not available for play.";
    var e = this.board.get(this.currentRow, t);
    return this.number % e === 0 ? this.number /= e : this.number += e, this.currentRow += 1, this.history.push(t), this.state()
 }, g.prototype.reset = function () {
    this.history = [], this.number = this.original, this.currentRow = 0
 }, g.prototype.state = function () {
    return 0 !== this.currentRow && 1 === this.number ? "ace" : this.currentRow >= this.board.get().length ? "done" : "ongoing"
 }, g.prototype.isComplete = function () {
    var t = this.state();
    return "ace" === t || "done" === t
 }, g.prototype.assertOngoing = function () {
    if (this.isComplete()) throw "Puzzle is complete."
 }, v.prototype.seed = function (t) {
    if ((0 ^ t) !== t) throw "Seed should be integer.";
    this.original = t, this.previous = t
 }, v.prototype.random = function () {
    var t = v.xorshift32plusstar(this.previous);
    return this.previous = t, t / this.max
 }, v.xorshift32plusstar = function (t) {
    return t += 113566, t *= 5172511, t ^= t << 13, t ^= t << 5, t ^= t >> 17, t >>> 0
 }, f.prototype.frame = function () {
    var t = this.brush,
       e = this.level.puzzle.number,
       i = Math.floor(.025 * Math.max(this.renderRegion.width, this.renderRegion.height));
    if (this.y < this.renderRegion.height - this.blockSize ? this.y += i : this.y !== this.renderRegion.height - this.blockSize ? this.y = this.renderRegion.height - this.blockSize : this.x <= 0 ? (this.x = 0, this.blockSize += i, this.y -= i) : this.x -= i, t.fillStyle = this.blockColor, t.clearRect(0, 0, this.renderRegion.width, this.renderRegion.height), t.fillRect(this.x, this.y, this.blockSize, this.blockSize), this.x > 0 && (this.resetFont(), t.fillStyle = this.numberColor, t.fillText("" + e, this.x + this.blockSize / 2, this.y + this.blockSize / 2)), this.blockSize > this.renderRegion.width && this.blockSize > this.renderRegion.height) return void("undefined" != typeof this.onComplete && this.onComplete());
    this.statusBar && "function" == typeof this.statusBar.draw && this.statusBar.draw();
    var s = this;
    window.requestAnimationFrame(function () {
       s.frame()
    })
 }, f.prototype.run = function (t) {
    "undefined" != typeof t && (this.onComplete = t);
    var e = this.level.puzzle.history.slice(-1)[0];
    this.x = e * this.levelView.blockSize + this.levelView.spacing * e + this.levelView.leftMargin;
    var i = this.levelView.renderRegion.y + this.levelView.blockSize + this.levelView.spacing;
    this.y = this.level.puzzle.history.length * this.levelView.blockSize + i + this.levelView.spacing * this.level.puzzle.history.length, this.blockSize = this.levelView.blockSize;
    var s = this.level.palette.numberColor.clone();
    s.a = 1, this.blockColor = s, this.numberColor = this.levelView.numberColor, this.resetFont = this.levelView.resetFont;
    var n = this;
    setTimeout(function () {
       n.frame()
    }, 500)
 }, b.prototype.numberColor = "#FFFFFF", b.prototype.defaultBackgroundColor = "#D3D3D3", b.prototype.textColor = "#000000", b.prototype.textBackground = "#FFFFFF", b.prototype.sliderColor = "#FFFFFF", b.prototype.changesDocumentTextColor = !1, b.prototype.defaultGray = "#808080", b.prototype.getLevelPalette = function (t) {
    "function" == typeof this.prng.seed && this.prng.seed(t);
    var e = Math.floor(360 * this.prng.random()),
       i = Math.floor(20 * this.prng.random()) + 80;
    this.paletteBuilder.hue = e, this.paletteBuilder.saturation = i;
    var s = this.paletteBuilder.build(16, this.paletteRange),
       n = a.complement(s[Math.floor(16 * this.prng.random())]),
       h = n.clone();
    return h.l = Math.floor(n.l + 45) % 101, h.a = 1, new r(n, s, h)
 }, y.prototype.colors = [new a(0, 100, 77), new a(25, 100, 64), new a(57, 100, 37), new a(150, 100, 43), new a(200, 100, 60), new a(252, 100, 80), new a(290, 100, 77)], y.prototype.numberColor = "#202030", y.prototype.defaultBackgroundColor = "#202030", y.prototype.textColor = "#FFFFFF", y.prototype.textBackground = "#202030", y.prototype.sliderColor = "#FFFFFF", y.prototype.changesDocumentTextColor = !0, y.prototype.defaultGray = "#969696", y.prototype.getLevelPalette = function (t) {
    var e = this.colors[(t - 1) % 7],
       i = this.paletteBuilder.build(16);
    return new r(e, i)
 }, w.prototype.left = function () {
    "function" == typeof this.onSelect && this.onSelect(this.level.getNumber(), !0)
 }, w.prototype.right = function () {
    var t = this.level.getNumber() + 1;
    this.levelLimit && t > this.levelLimit && (t = 1), "function" == typeof this.onSelect && this.onSelect(t, !0)
 }, w.prototype.up = function () {
    "function" == typeof this.onSelect && this.onSelect(this.level.getNumber(), !1)
 }, w.prototype.down = function () {}, x.prototype.left = function () {
    0 !== this.level.index && (this.level.index -= 1, this.tryAfterInput())
 }, x.prototype.right = function () {
    this.level.index !== this.level.puzzle.board.columns - 1 && (this.level.index += 1, this.tryAfterInput())
 }, x.prototype.down = function () {
    this.level.puzzle.isComplete() || this.level.puzzle.playIndex(this.level.index), this.level.puzzle.isComplete() && "function" == typeof this.onComplete && this.onComplete(this.level), this.tryAfterInput()
 }, x.prototype.up = function () {
    var t = 0 === this.level.puzzle.history.length;
    return t && "function" == typeof this.onInitialStateUp ? void this.onInitialStateUp() : (this.level.puzzle.reset(), void this.tryAfterInput())
 }, x.prototype.tryAfterInput = function () {
    "function" == typeof this.afterInput && this.afterInput()
 }, S.prototype.onEnter = function (t) {
    var e = {
       level: t.level.getNumber(),
       path: t.level.puzzle.history,
       endNumber: t.level.puzzle.number
    };
    try {
       var i = this.game.storageManager.getLevelResult(e.level);
       (e.endNumber < i.endNumber || e.endNumber === i.endNumber && e.path.length <= i.path.length) && this.game.storageManager.setLevelResult(e.level, e)
    } catch (s) {
       this.game.storageManager.setLevelResult(e.level, e), e.level < this.game.config.levelLimit && this.game.storageManager.incrementCurrentLevel()
    }
    this.levelView = t.levelView, this.completeView.level = t.level, this.completeView.score = this.game.score, this.animation.level = t.level, this.animation.levelView = t.levelView, this.animation.statusBar = t.statusBar, this.levelCompleteController.level = t.level;
    var n = this.completeView,
       h = this.keyboardInputMethod,
       o = this.swipeInputMethod,
       r = this.tapInputMethod;
    this.animation.run(function () {
       n.draw(), h.listen(), o.listen(), r.listen()
    })
 }, S.prototype.onLeave = function () {
    return this.keyboardInputMethod.detach(), this.swipeInputMethod.detach(), this.tapInputMethod.detach(), this.levelView.level = this.nextLevel, {
       level: this.nextLevel,
       levelView: this.levelView
    }
 }, R.prototype.onEnter = function (e) {
    this.game.brush.clearAll();
    var i = e && e.level ? e.level : this.game.levels.get(this.game.storageManager.getCurrentLevel());
    this.game.canvas.style.backgroundColor = i.palette.backgroundColor, this.levelController.level = i, this.levelView.level = i, this.levelKeyboardInputMethod.listen(), this.levelTouchInputMethod.listen(), this.levelView.draw(), this.statusBar.renderRegion.x = this.levelView.leftMargin + this.levelView.spacing, this.statusBar.renderRegion.y = 0, this.statusBar.offsetTop = this.game.config.statusBarOffsetTop, this.statusBar.renderRegion.width = 4 * this.levelView.blockSize, this.statusBar.level = i, this.statusBar.fontSize = this.levelView.blockSize / 3.75, this.statusBar.score = this.game.score, this.statusBar.draw(), this.game.config.changeDocumentTextColor && this.game.config.theme.changesDocumentTextColor && (document.body.style.color = i.palette.numberColor.toString()), this.selectTransitionTapInputMethod.tapRegions[0].boundingBox = new t(this.levelView.leftMargin + 3 * (this.levelView.blockSize + this.levelView.spacing), 0, this.levelView.blockSize, .75 * this.statusBar.renderRegion.height), this.selectTransitionTapInputMethod.listen(), this.game.isComplete() && this.game.storageManager.setCurrentLevel(i.getNumber())
 }, R.prototype.onLeave = function () {
    return this.levelKeyboardInputMethod.detach(), this.levelTouchInputMethod.detach(), this.selectTransitionTapInputMethod.detach(), {
       level: this.levelView.level,
       levelView: this.levelView,
       statusBar: this.statusBar
    }
 }, L.prototype.onEnter = function (t) {
    this.game.brush.clearAll(), this.game.canvas.style.removeProperty("background-color"), this.selectView.blockSize = t.levelView.blockSize, this.selectView.xPad = .25 * t.levelView.renderRegion.width, this.sliderInput.min = 1, this.sliderInput.max = Math.min(this.game.score.totalLevelsPlayed() + 1, this.game.config.levelLimit), this.sliderInput.xPad = this.selectView.xPad, this.sliderInput.yMin = this.selectView.sliderY - this.selectView.blockSize, this.sliderInput.yMax = this.selectView.sliderY + this.selectView.blockSize, this.sliderInput.radius = this.selectView.blockSize / 3, this.sliderInput.trigger(t.level.getNumber() || 0), this.sliderInput.listen(), this.playButtonInput.tapRegions[0].boundingBox = this.selectView.getButtonBoundingBox(), this.playButtonInput.listen();
    var e = this.selectView.getSliderTapBoundingBoxes();
    this.sliderTapInput.tapRegions[0].boundingBox = e.previous, this.sliderTapInput.tapRegions[1].boundingBox = e.next, this.sliderTapInput.listen()
 }, L.prototype.onLeave = function () {
    return this.sliderInput.detach(), this.playButtonInput.detach(), this.sliderTapInput.detach(), {
       level: this.game.levels.get(this.sliderInput.value)
    }
 }, C.prototype.onEnter = function (t) {
    t || (t = {}), t.level = this.tutorial.level = this.game.levels.get(1), this.playingState.onEnter(t), this.playingState.selectTransitionTapInputMethod.detach(), this.tutorial.renderRegion.x = this.playingState.statusBar.renderRegion.x, this.tutorial.renderRegion.width = this.playingState.statusBar.renderRegion.width, this.tutorial.draw(), this.tutorial.initial = !1
 }, C.prototype.onLeave = function () {
    return this.playingState.onLeave()
 }, z.prototype.cacheLevelResults = function () {
    for (var t = [], e = 0;;) {
       var i = this.getLevelResultBucket(e);
       if (0 === i.length) break;
       t = t.concat(i), e += 1
    }
    this.cachedLevelResults = t
 }, z.prototype.getLevelResultBucket = function (t) {
    var e = this.storageMethod.getItem(this.prefix + "level_results_bucket_" + t);
    return e ? JSON.parse(e) : []
 }, z.prototype.setLevelResultBucket = function (t, e) {
    this.storageMethod.setItem(this.prefix + "level_results_bucket_" + t, JSON.stringify(e))
 }, z.prototype.setCurrentLevel = function (t) {
    this.storageMethod.setItem(this.prefix + "level_current", t)
 }, z.prototype.incrementCurrentLevel = function () {
    this.setCurrentLevel(this.getCurrentLevel() + 1)
 }, z.prototype.getCurrentLevel = function () {
    return parseInt(this.storageMethod.getItem(this.prefix + "level_current")) || 1
 }, z.prototype.getLevelResults = function () {
    return this.cachedLevelResults
 }, z.prototype.setLevelResult = function (t, e) {
    var i = t - 1,
       s = Math.floor(i / this.bucketSize),
       n = this.getLevelResultBucket(s);
    n[i % this.bucketSize] = e, this.cachedLevelResults[i] = e, this.setLevelResultBucket(s, n)
 }, z.prototype.getLevelResult = function (t) {
    return this.getLevelResults()[t - 1]
 }, k.prototype.getResults = function () {
    return "function" == typeof this.results ? this.results() : this.results
 }, k.prototype.totalLevelsPlayed = function () {
    return this.getResults().length
 }, k.prototype.compositeFrom = function (t, e) {
    var i = this.totalLevelsPlayed();
    if (1 > t || 1 > e) throw "Level must be greater than 0.";
    if (t > e) throw "First level cannot be greater than last level.";
    if (e > i) throw "Last level is greater than total levels played.";
    for (var s = 0, n = t - 1; e > n; n += 1) s += this.getResults()[n].endNumber;
    return s
 }, k.prototype.compositeThrough = function (t) {
    return this.compositeFrom(1, t)
 }, k.prototype.averageFrom = function (t, e) {
    var i = e - t + 1;
    return this.compositeFrom(t, e) / i
 }, k.prototype.averageThrough = function (t) {
    return this.averageFrom(1, t)
 }, k.prototype.composite = function () {
    return this.compositeThrough(this.totalLevelsPlayed())
 }, k.prototype.average = function () {
    return this.averageThrough(this.totalLevelsPlayed())
 }, M.prototype.setCurrentLevel = function (t) {
    this.storageMethod.setItem(this.prefix + "level_current", t)
 }, M.prototype.incrementCurrentLevel = function () {
    this.setCurrentLevel(this.getCurrentLevel() + 1)
 }, M.prototype.getCurrentLevel = function () {
    return parseInt(this.storageMethod.getItem(this.prefix + "level_current")) || 1
 }, M.prototype.getLevelResults = function () {
    var t = this.storageMethod.getItem(this.prefix + "level_results");
    return t ? JSON.parse(t) : []
 }, M.prototype.setLevelResult = function (t, e) {
    var i = this.getLevelResults();
    i[t - 1] = e, this.storageMethod.setItem(this.prefix + "level_results", JSON.stringify(i))
 }, M.prototype.getLevelResult = function (t) {
    return this.getLevelResults()[t - 1]
 }, T.prototype.drawResult = function () {
    var t = this.level.puzzle,
       e = "done",
       i = t.state();
    if ("ace" === i) e = "ACE!";
    else {
       if ("done" !== i) throw "Puzzle is still ongoing. Level is not complete.";
       e = t.number < 10 ? "LOW!" : "High"
    }
    var s = .35;
    "LOW!" === e ? s = .3 : "High" === e && (s = .25), this.brush.font = "bolder " + Math.min(this.renderRegion.height, this.renderRegion.width) * s + "px sans-serif", this.brush.fillText(e, this.renderRegion.width / 2, .175 * this.renderRegion.height)
 }, T.prototype.drawScore = function () {
    var t, e;
    t = e = "âˆž";
    var i = this.level.getNumber();
    try {
       t = this.score.average().toFixed(4), e = this.score.averageThrough(i).toFixed(4)
    } catch (s) {}
    var n, h, o, r = this.renderRegion.width / 2,
       l = this.score.totalLevelsPlayed() <= i;
    l ? (n = .4 * this.renderRegion.height, h = .5 * this.renderRegion.height, o = .6 * this.renderRegion.height) : (n = .375 * this.renderRegion.height, h = .475 * this.renderRegion.height, o = .575 * this.renderRegion.height), this.brush.font = .0825 * Math.min(this.renderRegion.width, this.renderRegion.height) + "px sans-serif", this.brush.fillText("Level: " + this.level.getNumber(), r, n);
    var a = this.level.puzzle.number,
       u = "End Number: " + a;
    if (1 === a) {
       var c = this.level.puzzle.history.length;
       u += " (" + c + " Move" + (c > 1 ? "s)" : ")")
    }
    if (this.brush.fillText(u, r, h), this.brush.fillText("Avg: " + t, r, o), !l) {
       var d = i > 1 ? "Avg[1 - " + i + "]: " : "Avg[1]: ";
       this.brush.fillText(d + e, r, .675 * this.renderRegion.height)
    }
 }, T.prototype.drawControlLabels = function () {
    this.brush.font = "bold " + .1 * Math.min(this.renderRegion.width, this.renderRegion.height) + "px sans-serif", this.brush.fillText("< RETRY", this.renderRegion.width / 4, .875 * this.renderRegion.height), this.brush.fillText("NEXT >", 3 * (this.renderRegion.width / 4), .875 * this.renderRegion.height)
 }, T.prototype.draw = function () {
    this.brush.textAlign = "center", this.brush.textBaseline = "middle", this.brush.fillStyle = this.textColor, this.drawResult(), this.drawScore(), this.drawControlLabels()
 }, I.prototype.drawLevelResults = function (t) {
    var e = this.storageManager.getLevelResult(t);
    if (e) {
       var i = e.endNumber;
       result = 1 === i ? "ACE!" : 10 > i ? "LOW!" : "High", this.brush.fillStyle = this.theme.sliderColor, this.brush.font = "bold " + .5 * this.blockSize + "px sans-serif", this.brush.fillText(result, this.renderRegion.width / 2, .4 * this.renderRegion.height), this.brush.font = "bold " + .25 * this.blockSize + "px sans-serif", this.brush.fillText("End Number: " + i, this.renderRegion.width / 2, .6 * this.renderRegion.height), 1 === i && this.brush.fillText("Moves: " + e.path.length, this.renderRegion.width / 2, .6675 * this.renderRegion.height)
    }
 }, I.prototype.drawNumber = function (t, e) {
    this.brush.fillStyle = e, this.brush.fillRect(this.renderRegion.width / 2 - this.blockSize / 2, .15 * this.renderRegion.height, this.blockSize, this.blockSize), 1 > t && (t = "?"), this.brush.font = "bold " + .5 * this.blockSize + "px sans-serif", this.brush.fillStyle = this.theme.numberColor, this.brush.fillText("" + t, this.renderRegion.width / 2, .15 * this.renderRegion.height + this.blockSize / 2)
 }, I.prototype.drawSlider = function (t, e, i, s) {
    var n = this.blockSize / 6;
    this.brush.font = "bold " + .5 * this.blockSize + "px sans-serif", this.brush.strokeStyle = s, this.brush.lineWidth = 5, this.brush.beginPath(), this.brush.moveTo(this.xPad - 2 * n, this.sliderY), this.brush.lineTo(this.renderRegion.width - this.xPad + 2 * n, this.sliderY), this.brush.stroke(), this.brush.closePath(), this.brush.beginPath(), this.brush.arc(e, this.sliderY, n, 2 * Math.PI, !1), this.brush.stroke(), this.brush.closePath(), this.drawSliderTapControls(s)
 }, I.prototype.drawSliderTapControls = function (t) {
    this.brush.fillStyle = t, this.brush.strokeStyle = t, this.brush.lineWidth = 10;
    var e = this.xPad / 2,
       i = this.blockSize / 3,
       s = this.sliderY,
       n = this.blockSize / 1.5;
    this.brush.beginPath(), this.brush.moveTo(this.renderRegion.width - e, s + n), this.brush.lineTo(this.renderRegion.width - e + i, s), this.brush.lineTo(this.renderRegion.width - e, s - n), this.brush.lineTo(this.renderRegion.width - e, s + n), this.brush.fill(), this.brush.closePath(), this.brush.beginPath(), this.brush.moveTo(e, s + n), this.brush.lineTo(e - i, s), this.brush.lineTo(e, s - n), this.brush.lineTo(e, s + n), this.brush.fill(), this.brush.closePath()
 }, I.prototype.drawButton = function (t) {
    this.brush.fillStyle = t, this.brush.fillRect(this.xPad, .75 * this.renderRegion.height, this.renderRegion.width - 2 * this.xPad, .15 * this.renderRegion.height), this.brush.font = "bold " + .5 * this.blockSize + "px sans-serif", this.brush.fillStyle = this.theme.numberColor, this.brush.fillText("Play", this.renderRegion.width / 2, .75 * this.renderRegion.height + .075 * this.renderRegion.height)
 }, I.prototype.getButtonBoundingBox = function () {
    return new t(this.xPad / 2, .75 * this.renderRegion.height, this.renderRegion.width - this.xPad, .15 * this.renderRegion.height)
 }, I.prototype.getSliderTapBoundingBoxes = function () {
    var e = this.blockSize / 1.5,
       i = 2 * e,
       s = this.sliderY - e,
       n = this.blockSize / 2;
    return {
       previous: new t(0, s, this.xPad - n, i),
       next: new t(this.renderRegion.width - this.xPad + n, s, this.xPad - n, i)
    }
 }, I.prototype.draw = function (t, e, i, s) {
    this.brush.textAlign = "center", this.brush.textBaseline = "middle";
    var n = this.theme.defaultGray || "#808080";
    s && t > 0 && (n = this.theme.getLevelPalette(t).numberColor.toString()), this.brush.font = "bold " + .25 * this.blockSize + "px sans-serif", this.brush.fillStyle = this.theme.sliderColor, this.brush.fillText("LEVEL", this.renderRegion.width / 2, .1 * this.renderRegion.height), this.drawNumber(t, n), this.drawLevelResults(t),
       this.drawSlider(t, e, i, this.theme.sliderColor), this.drawButton(n)
 }, I.prototype.redraw = function (t, e, i, s) {
    this.brush.clearRect(0, 0, this.renderRegion.width, this.renderRegion.height), this.draw(t, e, i, s)
 }, B.prototype.resetFont = function () {
    this.brush.font = "bold " + .5 * this.blockSize + "px sans-serif", this.brush.textAlign = "center", this.brush.textBaseline = "middle"
 }, B.prototype.determineBlockSize = function () {
    var t = this.level.puzzle.board.columns,
       e = this.level.puzzle.board.rows + 1,
       i = this.renderRegion.width / t,
       s = this.renderRegion.height / e;
    this.blockSize = Math.min(i, s) - this.spacing
 }, B.prototype.determineLeftMargin = function () {
    var t = this.level.puzzle.board.columns;
    this.leftMargin = (this.renderRegion.width - (this.blockSize * t + this.spacing * (t - 1))) / 2
 }, B.prototype.drawBoard = function () {
    for (var t = this.level.puzzle.currentRow * this.level.puzzle.board.columns, e = 0, i = 0, s = this.renderRegion.y + this.blockSize + this.spacing, n = 0; n < this.level.puzzle.board.columns; n += 1)
       for (var h = this.level.puzzle.history.length; h < this.level.puzzle.board.rows; h += 1) {
          var o = this.level.puzzle.board.get(h, n);
          this.brush.fillStyle = this.level.palette.boardColors[o - 1].toString(), e = n * this.blockSize + this.spacing * n + this.leftMargin, i = h * this.blockSize + s + this.spacing * h, this.brush.fillRect(e, i, this.blockSize, this.blockSize), this.brush.fillStyle = this.numberColor, this.brush.fillText("" + o, e + this.blockSize / 2, i + this.blockSize / 2), t += 1
       }
 }, B.prototype.drawNumber = function () {
    var t = this.level.index,
       e = this.level.puzzle.currentRow,
       i = t * this.blockSize + this.spacing * t + this.leftMargin,
       s = e * this.blockSize + this.renderRegion.y + this.spacing * e;
    this.brush.fillStyle = this.level.palette.numberColor.toString(), this.brush.fillRect(i, s, this.blockSize, this.blockSize), this.brush.fillStyle = this.numberColor, this.brush.fillText("" + this.level.puzzle.number, i + this.blockSize / 2, s + this.blockSize / 2)
 }, B.prototype.draw = function () {
    "undefined" != typeof this.level && (("undefined" == typeof this.last || this.last.columns !== this.level.columns || this.last.rows !== this.level.rows) && (this.determineBlockSize(), this.determineLeftMargin(), this.last = this.level), this.resetFont(), this.drawNumber(), this.drawBoard())
 }, B.prototype.redraw = function () {
    this.brush.clearRect(this.renderRegion.x, this.renderRegion.y - 1, this.renderRegion.width, this.renderRegion.height + 1), this.draw()
 }, P.prototype.draw = function () {
    this.brush.font = this.fontSize + "px sans-serif", this.brush.textAlign = "left", this.brush.textBaseline = "top", this.brush.fillStyle = this.level.palette.numberColor.toString();
    var t = "Level " + this.level.getNumber();
    if (this.score) try {
       t += " | Avg: " + this.score.average().toFixed(4)
    } catch (e) {}
    this.brush.fillText(t, this.renderRegion.x, this.renderRegion.y + this.offsetTop), this.brush.textAlign = "right", this.brush.fillText("[Select]", this.renderRegion.x + this.renderRegion.width, this.renderRegion.y + this.offsetTop)
 }, P.prototype.redraw = function () {
    this.brush.clearRect(this.renderRegion.x, this.renderRegion.y, this.renderRegion.width, this.renderRegion.height), this.draw()
 }, E.prototype.resetFont = function () {
    this.brush.font = "bold " + .045 * this.renderRegion.width + "px sans-serif", this.brush.textAlign = "center", this.brush.textBaseline = "middle", this.brush.fillStyle = this.textColor
 }, E.prototype.draw = function () {
    this.resetFont();
    var t;
    this.initial ? t = this.lines[0] : this.level.puzzle.history === [] || 0 === this.level.puzzle.history.length && !this.up ? t = this.lines[1] : this.level.puzzle.history.length > 0 && !this.done ? (t = this.lines[2], this.up = !0) : (t = this.lines[3], this.done = !0), t !== this.currentLine && "undefined" != typeof t && this.drawLine(t)
 }, E.prototype.drawLine = function (t) {
    this.brush.fillStyle = this.blockColor, this.brush.strokeStyle = this.textColor, this.brush.lineWidth = .005 * this.renderRegion.width;
    var e = this.renderRegion.x,
       i = this.renderRegion.y,
       s = this.renderRegion.width,
       n = this.renderRegion.height;
    this.brush.fillRect(e, i, s, n), this.brush.strokeRect(e, i, s, n), this.brush.fillStyle = this.textColor, this.brush.fillText(t, e + s / 2, i + n / 2)
 }, FactorsGame.prototype.start = function () {
    var t = this.score.totalLevelsPlayed() > 0;
    this.transition(t || !this.config.showTutorial ? "PLAYING" : "TUTORIAL")
 }, FactorsGame.prototype.transition = function (t) {
    var e;
    this.state && (e = this.state.onLeave()), this.states[t] && (this.state = this.states[t]), this.onStateChange(t, e), this.state.onEnter(e)
 }, FactorsGame.prototype.isComplete = function () {
    return this.score.totalLevelsPlayed() >= this.config.levelLimit
 }, FactorsGame.prototype.levelIsAvailable = function (t) {
    return t > 0 && t <= Math.min(this.score.totalLevelsPlayed() + 1, this.config.levelLimit)
 }, FactorsGame.prototype.onStateChange = function () {}, FactorsGame.init = function (t, e) {
    e = e || {}, this.configure(e);
    var i, s = new l(new v(1), e.theme);
    try {
       i = new z(e.storageMethod, e.storagePrefix)
    } catch (n) {
       e.storageMethod = {
          data: {},
          setItem: function (t, e) {
             this.data[t] = e
          },
          getItem: function (t) {
             return this.data[t]
          }
       }, i = new z(e.storageMethod, e.storagePrefix)
    }
    var h = new k(function () {
       return i.getLevelResults()
    });
    return new FactorsGame(s, e, i, h, t)
 }, FactorsGame.configure = function (t) {
    var e = function (t) {
       return (0 ^ t) === t && t > 0 || t === Number.POSITIVE_INFINITY
    };
    t.levelLimit = e(t.levelLimit) ? t.levelLimit : 256, t.storageMethod = t.storageMethod || localStorage, t.storagePrefix = t.storagePrefix || "factors_", t.showTutorial = "undefined" != typeof t.showTutorial ? t.showTutorial : !0, t.theme = t.theme || new y, t.changeDocumentTextColor = "undefined" != typeof t.changeDocumentTextColor ? t.changeDocumentTextColor : !1, t.statusBarOffsetTop = t.statusBarOffsetTop || 0
 };