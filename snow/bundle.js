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
	
	var _scene = __webpack_require__(6);
	
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
	
	var _Math = __webpack_require__(2);
	
	var _Text = __webpack_require__(4);
	
	var _Text2 = _interopRequireDefault(_Text);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
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
/* 4 */
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
/* 5 */,
/* 6 */
/***/ function(module, exports) {

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
	      mesh.position.set(-120, 140, -405);
	      mesh.rotation.set(0, 0, 0.2);
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
	
	      new TWEEN.Tween(mesh.rotation).to({ z: 0 - Math.PI / 6 }, 4000).onComplete(function () {
	        new TWEEN.Tween(mesh.rotation).to({ z: 0 - Math.PI * 2 }, 600).start();
	        new TWEEN.Tween(materail).delay(400).to({ opacity: 0 }, 200).start();
	      }).start();
	    });
	  }
	
	  function create33Big() {
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
	
	      new TWEEN.Tween(mesh.rotation).to({ z: 0 - Math.PI / 6 }, 4000).onComplete(function () {
	        new TWEEN.Tween(mesh.rotation).to({ z: 0 - Math.PI * 2 }, 600).start();
	      }).start();
	    });
	  }
	
	  return {
	    create: function create() {
	      createBackground();
	      createBackgroundMask();
	      create22();
	      create33();
	      scene.add(GroupScene2);
	    }
	  };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map