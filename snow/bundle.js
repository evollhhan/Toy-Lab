/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _clock = __webpack_require__(1);
	
	var _clock2 = _interopRequireDefault(_clock);
	
	var _scene = __webpack_require__(10);
	
	var _scene2 = _interopRequireDefault(_scene);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var stage = void 0,
	    scene = void 0,
	    renderer = void 0,
	    camera = void 0;
	
	function getAspect() {
	  return window.innerWidth / window.innerHeight;
	}
	
	function init() {
	  // -- Stage
	  stage = document.querySelector('.renderObject');
	
	  // -- Scene
	  scene = new THREE.Scene();
	  window.scene = scene;
	
	  // -- Camera
	  camera = new THREE.PerspectiveCamera(75, getAspect(), 1, 5000);
	  camera.position.set(0, 0, 0);
	
	  // -- Create Element
	  var ck = new _clock2.default(scene);
	  ck.create();
	
	  var s = new _scene2.default(scene);
	  s.create();
	  ck.scene1();
	
	  // -- Render
	  renderer = new THREE.WebGLRenderer({
	    alpha: true
	    // antialias: true
	  });
	  renderer.shadowMap.enabled = true;
	  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	  renderer.setClearColor(0x000000);
	  renderer.setPixelRatio(window.devicePixelRatio);
	  renderer.setSize(window.innerWidth, window.innerHeight);
	  renderer.autoClear = false;
	  stage.appendChild(renderer.domElement);
	}
	
	function animate() {
	  requestAnimationFrame(animate);
	  render();
	}
	
	function render() {
	  TWEEN.update();
	  renderer.clear();
	  renderer.render(scene, camera);
	}
	
	init();
	animate();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($scene) {
	  var scene = $scene;
	  var GroupClock = new THREE.Group();
	  var ClockMaterial = {};
	  GroupClock.name = 'CLOCK';
	
	  function drawClockPanel() {
	    var geom = void 0,
	        materail = void 0,
	        mesh = void 0;
	
	    // Base Panel
	    geom = new THREE.CircleGeometry(150, 48);
	    ClockMaterial.panel = new THREE.MeshLambertMaterial({ color: 0x000000 });
	    mesh = new THREE.Mesh(geom, ClockMaterial.panel);
	    mesh.name = 'base_panel';
	    GroupClock.add(mesh);
	
	    // Ring Inner
	    geom = new THREE.RingBufferGeometry(145, 150, 48);
	    ClockMaterial.RingInner = new THREE.MeshLambertMaterial({ color: 0x8da1c5 });
	    mesh = new THREE.Mesh(geom, ClockMaterial.RingInner);
	    mesh.name = 'ring_inner';
	    GroupClock.add(mesh);
	
	    // Ring Outer
	    geom = new THREE.RingBufferGeometry(150, 165, 48);
	    ClockMaterial.RingOuter = new THREE.MeshLambertMaterial({ color: 0xebf1fc });
	    mesh = new THREE.Mesh(geom, ClockMaterial.RingOuter);
	    mesh.name = 'ring_outer';
	    GroupClock.add(mesh);
	
	    // Clock Num
	    (0, _Math.mClock)(120, function (x, y, no) {
	      var t = (0, _Text2.default)(no, {
	        w: 32,
	        h: 32,
	        font: 'bold 28px Impact',
	        color: '#ebf1fc'
	      });
	      var texture = new THREE.Texture(t);
	      texture.needsUpdate = true;
	      geom = new THREE.PlaneBufferGeometry(32, 32);
	      materail = new THREE.MeshLambertMaterial({ map: texture });
	      materail.transparent = true;
	      mesh = new THREE.Mesh(geom, materail);
	      mesh.position.set(x, y, 1);
	      mesh.name = 'Clock_No_' + no;
	      GroupClock.add(mesh);
	    });
	
	    GroupClock.position.set(0, 0, -400);
	    scene.add(GroupClock);
	  }
	
	  function addLight() {
	    var light = new THREE.DirectionalLight(0xffffff, 0.5);
	    light.position.set(0, 0, 100);
	    // light.intensity = 0.2
	    light.intensity = 1;
	    light.castShadow = true;
	    scene.add(light);
	  }
	
	  return {
	    create: function create() {
	      addLight();
	      drawClockPanel();
	    },
	    scene1: function scene1() {
	      ClockMaterial.panel.color.setHex(0xaf1f39);
	    }
	  };
	};
	
	var _Math = __webpack_require__(11);
	
	var _Text = __webpack_require__(12);
	
	var _Text2 = _interopRequireDefault(_Text);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (r, callback) {
	  var theta = Math.PI / 3;
	  var end = 0 - Math.PI * 3 / 2;
	  var x = void 0,
	      y = void 0;
	  var index = 1;
	  for (; theta >= end;) {
	    x = r * Math.cos(theta);
	    y = r * Math.sin(theta);
	    callback(x, y, index, theta);
	    theta -= Math.PI / 6;
	    index++;
	  }
	};

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (ctx) {
	  ctx.moveTo(726.5, 0);
	  ctx.bezierCurveTo(726.5, 0, 639.5, 114, 493.5, 175);
	  ctx.bezierCurveTo(347.5, 236, 378, 201, 260.5, 245.5);
	  ctx.bezierCurveTo(143, 290, 58.5, 361, 0, 433);
	  ctx.lineTo(132.833, 612.333);
	  ctx.bezierCurveTo(132.833, 612.333, 213.5, 425.66594, 399.5, 321.666);
	  ctx.bezierCurveTo(399.5, 321.666, 539.5, 266.33297, 632.167, 148.999);
	  ctx.bezierCurveTo(724.8341, 31.66502, 702.167, 37, 726.5, 0);
	};

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($scene) {
	  var scene = $scene;
	  var loader = new THREE.TextureLoader();
	  var GroupScene2 = new THREE.Group();
	  GroupScene2.name = 'SCENE2';
	
	  function createBackground() {
	    var geom = void 0,
	        materail = void 0,
	        mesh = void 0;
	    geom = new THREE.PlaneGeometry(1400, 1400);
	    materail = new THREE.MeshLambertMaterial({ color: 0xdb294c });
	    mesh = new THREE.Mesh(geom, materail);
	    mesh.position.set(0, 0, -420);
	    mesh.name = 'S2_BG';
	    GroupScene2.add(mesh);
	  }
	
	  function createBackgroundMask() {
	    loader.load(window.ResourceS1.sBgMask, function (texture) {
	      var geom = void 0,
	          materail = void 0,
	          mesh = void 0;
	      geom = new THREE.PlaneGeometry(1320, 660);
	      materail = new THREE.MeshLambertMaterial({ map: texture });
	      materail.transparent = true;
	      materail.opacity = 0.1;
	      mesh = new THREE.Mesh(geom, materail);
	      mesh.position.set(0, 0, -419);
	      mesh.name = 'S2_BG_Mask';
	      GroupScene2.add(mesh);
	
	      new TWEEN.Tween(mesh.position).to({ x: -100 }, 16000).start();
	    });
	  }
	
	  function create22() {
	    loader.load(window.ResourceS1.s22, function (texture) {
	      var geom = void 0,
	          materail = void 0,
	          mesh = void 0;
	      geom = new THREE.PlaneGeometry(180, 180);
	      materail = new THREE.MeshLambertMaterial({ map: texture });
	      materail.transparent = true;
	      mesh = new THREE.Mesh(geom, materail);
	      mesh.name = 'S2_SM22';
	      mesh.position.set(0, 0, -405);
	      mesh.rotation.set(0, 0, 0.2);
	
	      new TWEEN.Tween(mesh.position).delay(2100).to({ x: -120, y: 140 }, 1200).easing(TWEEN.Easing.Cubic.Out).start();
	
	      GroupScene2.add(mesh);
	    });
	  }
	
	  function create33() {
	    loader.load(window.ResourceS1.s33, function (texture) {
	      var geom = void 0,
	          materail = void 0,
	          mesh = void 0;
	      geom = new THREE.PlaneGeometry(128, 256);
	      materail = new THREE.MeshLambertMaterial({ map: texture });
	      materail.transparent = true;
	      mesh = new THREE.Mesh(geom, materail);
	      mesh.name = 'S2_SM33';
	      mesh.position.set(5, -5, -395);
	      mesh.scale.set(0.7, 0.7, 0.7);
	      GroupScene2.add(mesh);
	
	      new TWEEN.Tween(mesh.rotation).to({ z: 0 - Math.PI / 12 }, 3200).onComplete(function () {
	        new TWEEN.Tween(mesh.rotation).to({ z: 0 - Math.PI * 3 / 2 }, 400).start();
	        new TWEEN.Tween(materail).to({ opacity: 0 }, 400).start();
	      }).start();
	    });
	  }
	
	  function create33b() {
	    loader.load(window.ResourceS1.s33b, function (texture) {
	      var geom = void 0,
	          materail = void 0,
	          mesh = void 0;
	      geom = new THREE.PlaneGeometry(232, 232);
	      materail = new THREE.MeshLambertMaterial({ map: texture });
	      materail.transparent = true;
	      materail.opacity = 0;
	      mesh = new THREE.Mesh(geom, materail);
	      mesh.name = 'S2_SM33B';
	      mesh.position.set(5, -5, -395);
	      mesh.scale.set(0.7, 0.7, 0.7);
	      mesh.rotation.set(0, 0, 0);
	      GroupScene2.add(mesh);
	
	      new TWEEN.Tween(materail).delay(3600).to({ opacity: 1 }, 200).start();
	
	      new TWEEN.Tween(mesh.rotation).delay(3600).to({ z: 0 - Math.PI / 2 }, 16000).start();
	    });
	  }
	
	  var twistMesh = [];
	  function createTwistArc() {
	    var shape = new THREE.Shape();
	    (0, _Shape.twistArc)(shape);
	    var materail = new THREE.MeshLambertMaterial({ color: 0xffffff });
	    materail.transparent = true;
	    var geom = new THREE.ShapeGeometry(shape);
	    geom.applyMatrix(new THREE.Matrix4().makeTranslation(-726.5, 0, 0));
	    var mesh = new THREE.Mesh(geom, materail);
	    mesh.position.set(0, 0, -405);
	    mesh.visible = false;
	
	    for (var i = 0; i < 12; i++) {
	      var cloneMesh = mesh.clone();
	      twistMesh.push(cloneMesh);
	      GroupScene2.add(cloneMesh);
	    }
	  }
	
	  function animateTwistMesh() {
	    twistMesh.forEach(function (m, i) {
	      m.visible = true;
	      new TWEEN.Tween(m.rotation).to({ z: 0 - Math.PI / 12 * i }, 2000).start();
	    });
	  }
	
	  function createMerry() {
	    loader.load(window.ResourceS1.merry, function (texture) {
	      var geom = new THREE.PlaneGeometry(256, 64);
	      var materail = new THREE.MeshLambertMaterial({ map: texture });
	      materail.transparent = true;
	      materail.opacity = 0;
	      var mesh = new THREE.Mesh(geom, materail);
	      mesh.position.set(65, 200, -390);
	      mesh.rotation.set(0, 0, -0.26);
	      mesh.name = 'S2_Merry';
	
	      new TWEEN.Tween(materail).to({ opacity: 1 }, 1200).start();
	
	      new TWEEN.Tween(mesh.position).to({ x: 58, y: 180, z: -405 }, 1200).easing(TWEEN.Easing.Cubic.Out).start();
	
	      GroupScene2.add(mesh);
	    });
	  }
	
	  function createSnow() {
	    loader.load(window.Resource.snow, function (texture) {
	      var geom = new THREE.PlaneGeometry(32, 32);
	      var materail = new THREE.MeshBasicMaterial({
	        map: texture,
	        side: THREE.DoubleSide
	      });
	      materail.transparent = true;
	      var mesh = new THREE.Mesh(geom, materail);
	      mesh.position.set(100, 0, 40);
	
	      new TWEEN.Tween(mesh.position).to({ x: -180, y: 140, z: -395 }, 3200).onComplete(function () {
	        new TWEEN.Tween(materail).delay(200).to({ opacity: 0 }, 200).start();
	      }).start();
	
	      new TWEEN.Tween(mesh.rotation).to({ x: Math.PI * 2, y: Math.PI * 2 }, 3200).start();
	
	      GroupScene2.add(mesh);
	    });
	  }
	
	  return {
	    create: function create() {
	      createBackground();
	      createBackgroundMask();
	      create22();
	      create33();
	      create33b();
	      createMerry();
	      createSnow();
	      createTwistArc();
	      scene.add(GroupScene2);
	    }
	  };
	};
	
	var _Shape = __webpack_require__(13);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mClock = undefined;
	
	var _mClock = __webpack_require__(3);
	
	var _mClock2 = _interopRequireDefault(_mClock);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.mClock = _mClock2.default;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (text, opt) {
	  // default
	  opt = opt || {};
	  opt.w = opt.w || 32;
	  opt.h = opt.h || 32;
	  opt.font = opt.font || '14px Arial';
	  opt.color = opt.color || '#ffffff';
	
	  var cvs = document.createElement('canvas');
	  cvs.width = opt.w;
	  cvs.height = opt.h;
	  var ctx = cvs.getContext('2d');
	  ctx.font = opt.font;
	  ctx.fillStyle = opt.color;
	  ctx.textAlign = 'center';
	  ctx.textBaseline = 'middle';
	  ctx.fillText(text, opt.w / 2, opt.h / 2);
	  return cvs;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.twistArc = undefined;
	
	var _twistArc = __webpack_require__(8);
	
	var _twistArc2 = _interopRequireDefault(_twistArc);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.twistArc = _twistArc2.default;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map