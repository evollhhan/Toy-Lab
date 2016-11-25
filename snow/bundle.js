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
	
	var _clock = __webpack_require__(4);
	
	var _clock2 = _interopRequireDefault(_clock);
	
	var _scene = __webpack_require__(8);
	
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
	  // ck.scene1()
	
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
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
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
	    light.intensity = 0.2;
	    // light.intensity = 1
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
	
	var _Math = __webpack_require__(5);
	
	var _Text = __webpack_require__(7);
	
	var _Text2 = _interopRequireDefault(_Text);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mClock = undefined;
	
	var _mClock = __webpack_require__(6);
	
	var _mClock2 = _interopRequireDefault(_mClock);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.mClock = _mClock2.default;

/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($scene) {
	  var scene = $scene;
	  var loader = new THREE.TextureLoader();
	  var GroupLight = new THREE.Group();
	  GroupLight.name = 'S1_G_Light';
	  var TweenSnow = [];
	  var LightSnow = [];
	
	  // -- SNOW CREATION && ANIMATION
	  // ---- CREATE SNOW
	  function createSnow() {
	    GroupLight.position.set(0, 0, -380);
	    loader.load(window.Resource.snow, function (texture) {
	      (0, _Math.mClock)(200, function (x, y, no, theta) {
	        // light
	        var light = new THREE.PointLight(0xffffff, 1, 100);
	        light.position.set(0, 0, 600);
	        light.name = 'S1_snowLight';
	        light.theta = theta;
	
	        // snow
	        var geom = new THREE.PlaneGeometry(32, 32);
	        var materail = new THREE.MeshLambertMaterial({
	          map: texture,
	          side: THREE.DoubleSide
	        });
	        materail.transparent = true;
	        var mesh = new THREE.Mesh(geom, materail);
	        mesh.position.set(0, 0, -5);
	
	        // Animate
	        new TWEEN.Tween(light.position).delay(no * 500).to({ x: x, y: y, z: 0 }, 4000).start();
	
	        new TWEEN.Tween(light.rotation).delay(no * 500).to({ y: Math.PI * 2, x: Math.PI * 2 }, 4000).onComplete(function () {
	          new TWEEN.Tween(light).to({ intensity: 6 }, 1000).start();
	
	          var t = new TWEEN.Tween(mesh.position).to({ z: -10 }, 800).easing(TWEEN.Easing.Linear.None).yoyo(true).repeat(Infinity);
	
	          TweenSnow.push(t);
	          t.start();
	
	          // dev
	          if (no === 12) {
	            setTimeout(function () {
	              // moveOutSnow()
	            }, 2000);
	          }
	        }).start();
	
	        light.add(mesh);
	        LightSnow.push(light);
	        GroupLight.add(light);
	      });
	    });
	    scene.add(GroupLight);
	  }
	
	  // SNOW OUT
	  function moveOutSnow() {
	    TweenSnow.forEach(function (t) {
	      t.stop();
	    });
	    LightSnow.forEach(function (l, i) {
	      new TWEEN.Tween({ theta: l.theta }).delay(i * 200).to({ theta: l.theta - Math.PI * 2 }, 6000 - i * 200).onUpdate(function () {
	        l.position.x = 200 * Math.cos(this.theta);
	        l.position.y = 200 * Math.sin(this.theta);
	        l.position.z += 1.2;
	      }).start();
	    });
	  }
	
	  // FLOOR
	  function createFloor1() {
	    var geom = void 0,
	        materail = void 0,
	        mesh = void 0;
	    loader.load(window.Resource.f1, function (texture) {
	      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	      texture.repeat.set(50, 50);
	      geom = new THREE.PlaneGeometry(1600, 1600);
	      materail = new THREE.MeshLambertMaterial({ map: texture });
	      mesh = new THREE.Mesh(geom, materail);
	      mesh.position.set(0, 0, -500);
	      mesh.castShadow = true;
	      mesh.receiveShadow = true;
	      scene.add(mesh);
	    });
	  }
	
	  function createFloor2() {
	    var geom = void 0,
	        materail = void 0,
	        mesh = void 0;
	    loader.load(window.Resource.f2, function (texture) {
	      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	      texture.repeat.set(50, 50);
	      geom = new THREE.RingBufferGeometry(200, 600, 64);
	      materail = new THREE.MeshLambertMaterial({ map: texture });
	      mesh = new THREE.Mesh(geom, materail);
	      mesh.position.set(0, 0, -360);
	      mesh.castShadow = true;
	      mesh.receiveShadow = true;
	      scene.add(mesh);
	    });
	  }
	
	  return {
	    create: function create() {
	      createSnow();
	      // createFloor1()
	      // createFloor2()
	    }
	  };
	};
	
	var _Math = __webpack_require__(5);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map