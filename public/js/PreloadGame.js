"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PreloadGame = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(PreloadGame, _Phaser$Scene);

  var _super = _createSuper(PreloadGame);

  function PreloadGame() {
    _classCallCheck(this, PreloadGame);

    return _super.call(this, 'loadGame');
  }

  _createClass(PreloadGame, [{
    key: "preload",
    value: function preload() {
      this.load.image('slotbg', 'assets/images/slotbg.jpg');
      this.load.image('spinbtn', 'assets/images/spinbtn.png');
      this.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', {
        frameWidth: 32,
        frameHeight: 24
      });
      this.load.atlas('lazer', 'assets/sprites/lazer.png', 'assets/sprites/lazer.json');
      this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }
  }, {
    key: "create",
    value: function create() {
      this.add.text(550, 300, 'Loading.....', {
        fontSize: '32px',
        fill: '#FFF'
      });
      this.anims.create({
        key: 'blast',
        frames: this.anims.generateFrameNames('lazer', {
          prefix: 'lazer_',
          start: 0,
          end: 22,
          zeroPad: 2
        }),
        repeat: 0
      });
      this.time.addEvent({
        delay: 200,
        callback: function callback() {
          this.scene.start('playGame');
        },
        callbackScope: this,
        loop: false
      });
    }
  }]);

  return PreloadGame;
}(Phaser.Scene);