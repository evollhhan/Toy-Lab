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
	
	var _scene = __webpack_require__(2);
	
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
	  var s1 = new _scene2.default(scene);
	  s1.create();
	
	  // -- Render
	  renderer = new THREE.WebGLRenderer({
	    alpha: true
	  });
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
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($scene) {
	  var scene = $scene;
	  var loader = new THREE.TextureLoader();
	
	  function createSnow() {
	    loader.load(window.Resource.snow, function (texture) {
	      var geom = new THREE.PlaneGeometry(64, 64);
	      var materail = new THREE.MeshBasicMaterial({
	        map: texture
	      });
	      materail.transparent = true;
	      var mesh = new THREE.Mesh(geom, materail);
	      mesh.position.set(0, 0, -600);
	      scene.add(mesh);
	    });
	  }
	
	  return {
	    create: function create() {
	      createSnow();
	    }
	  };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map