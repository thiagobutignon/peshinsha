require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"framer-camera-input/CameraInput":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.CameraInput = (function(superClass) {
  extend(CameraInput, superClass);

  function CameraInput(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      ignoreEvents: false
    });
    CameraInput.__super__.constructor.call(this, this.options);
    this.changeHandler = function(event) {
      var file, url;
      if (this.options.callback) {
        file = this._element.files[0];
        url = URL.createObjectURL(file);
        return this.options.callback(url, file.type);
      }
    };
    this.changeHandler = this.changeHandler.bind(this);
    Events.wrap(this._element).addEventListener("change", this.changeHandler);
  }

  CameraInput.prototype._createElement = function() {
    if (this._element != null) {
      return;
    }
    this._element = document.createElement("input");
    this._element.type = "file";
    this._element.capture = true;
    this._element.classList.add("framerLayer");
    this._element.style["-webkit-appearance"] = "none";
    this._element.style["-webkit-text-size-adjust"] = "none";
    this._element.style["outline"] = "none";
    switch (this.options.accept) {
      case "image":
        return this._element.accept = "image/*";
      case "video":
        return this._element.accept = "video/*";
      default:
        return this._element.accept = "image/*,video/*";
    }
  };

  CameraInput.define("accept", {
    get: function() {
      return this._element.accept;
    },
    set: function(value) {
      switch (value) {
        case "image":
          return this._element.accept = "image/*";
        case "video":
          return this._element.accept = "video/*";
        default:
          return this._element.accept = "image/*,video/*";
      }
    }
  });

  return CameraInput;

})(TextLayer);


},{}],"input-framer/input":[function(require,module,exports){
var _inputStyle, calculatePixelRatio, growthRatio, imageHeight,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

_inputStyle = Object.assign({}, Framer.LayerStyle, calculatePixelRatio = function(layer, value) {
  return (value * layer.context.pixelMultiplier) + "px";
}, {
  fontSize: function(layer) {
    return calculatePixelRatio(layer, layer._properties.fontSize);
  },
  lineHeight: function(layer) {
    return layer._properties.lineHeight + "em";
  },
  padding: function(layer) {
    var padding, paddingValue, paddingValues, pixelMultiplier;
    pixelMultiplier = layer.context.pixelMultiplier;
    padding = [];
    paddingValue = layer._properties.padding;
    if (Number.isInteger(paddingValue)) {
      return calculatePixelRatio(layer, paddingValue);
    }
    paddingValues = layer._properties.padding.split(" ");
    switch (paddingValues.length) {
      case 4:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[3]);
        break;
      case 3:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      case 2:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      default:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[0]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[0]);
    }
    return (padding.top * pixelMultiplier) + "px " + (padding.right * pixelMultiplier) + "px " + (padding.bottom * pixelMultiplier) + "px " + (padding.left * pixelMultiplier) + "px";
  }
});

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    if (options.autoCorrect == null) {
      options.autoCorrect = "on";
    }
    if (options.autoComplete == null) {
      options.autoComplete = "on";
    }
    if (options.autoCapitalize == null) {
      options.autoCapitalize = "on";
    }
    if (options.spellCheck == null) {
      options.spellCheck = "on";
    }
    if (options.autofocus == null) {
      options.autofocus = false;
    }
    if (options.textColor == null) {
      options.textColor = "#000";
    }
    if (options.fontFamily == null) {
      options.fontFamily = "-apple-system";
    }
    if (options.fontWeight == null) {
      options.fontWeight = "500";
    }
    if (options.submit == null) {
      options.submit = false;
    }
    if (options.tabIndex == null) {
      options.tabIndex = 0;
    }
    Input.__super__.constructor.call(this, options);
    this._properties.fontSize = options.fontSize;
    this._properties.lineHeight = options.lineHeight;
    this._properties.padding = options.padding;
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement("input");
    this.input.id = "input-" + (_.now());
    this.input.style.width = _inputStyle["width"](this);
    this.input.style.height = _inputStyle["height"](this);
    this.input.style.fontSize = _inputStyle["fontSize"](this);
    this.input.style.lineHeight = _inputStyle["lineHeight"](this);
    this.input.style.outline = "none";
    this.input.style.border = "none";
    this.input.style.backgroundColor = options.backgroundColor;
    this.input.style.padding = _inputStyle["padding"](this);
    this.input.style.fontFamily = options.fontFamily;
    this.input.style.color = options.textColor;
    this.input.style.fontWeight = options.fontWeight;
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.input.setAttribute("tabindex", options.tabindex);
    this.input.setAttribute("autocorrect", options.autoCorrect);
    this.input.setAttribute("autocomplete", options.autoComplete);
    this.input.setAttribute("autocapitalize", options.autoCapitalize);
    if (options.autofocus === true) {
      this.input.setAttribute("autofocus", true);
    }
    this.input.setAttribute("spellcheck", options.spellCheck);
    this.form = document.createElement("form");
    if ((options.goButton && !options.submit) || !options.submit) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.stateCycle();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.animate("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  return Input;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"statusbarlayer/StatusBarLayer":[function(require,module,exports){

/*
	 * USING STATUSBARLAYER

	 * Require the module
	StatusBarLayer = require "StatusBarLayer"

	myStatusBar = new StatusBarLayer
		 * iOS version
		version: <number> (10 || 11)

		 * Text
		carrier: <string>
		time: <string> # if not set, will use local time
		percent: <number>

		 * Show or hide status items
		signal: <boolean>
		wifi: <boolean>
		powered: <boolean>
		showPercentage: <boolean>
		ipod: <boolean> # also affects signal and carrier

		 * Colors
		style: <string> ("light" || "dark")
		foregroundColor: <string> (hex or rgba)
		backgroundColor: <string> (hex or rgba)
		vibrant: <boolean>

		 * Behavior
		hide: <boolean> # initial visibility
		autoHide: <boolean> # hide in landscape where device-appropriate

		 * Simulate call
		myStatusBar.startCall(message, color) # <string>, <string> (hex or rgba)
		myStatusBar.endCall()

		 * Check visibility and call status
		print myStatusBar.hidden
		print myStatusBar.onCall
 */
var StatusBarLayer, defaults,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaults = {
  style: "light",
  powered: false,
  carrier: "Carrier",
  foregroundColor: "",
  backgroundColor: "",
  time: "",
  percent: 100,
  showPercentage: true,
  wifi: true,
  signal: true,
  ipod: false,
  hide: false,
  autoHide: true,
  onCall: false,
  vibrant: false,
  version: 11
};

StatusBarLayer = (function(superClass) {
  var batteryGreen, onCallColor;

  extend(StatusBarLayer, superClass);

  batteryGreen = "#4cd964";

  onCallColor = "#4cd964";

  function StatusBarLayer(options) {
    var alarmMargin, appleSVGCSS, baseFontSize, battery, batteryColor, battery_v10_2x, battery_v10_3x, battery_v11_2x, battery_v11_3x, canvasSVGCSS, carrier, carrierMargin, colorBattery, colorForeground, device, fontWeight, foregroundItems, getBatteryLevel, getBatteryMargin, getBatterySVG, getBatteryWidth, getScreenWidth, getSignalSVG, getTime, i, ipodMargin, isiPhone, isiPhonePlus, layer, len, letterSpacing, locationMargin, onCallBlock, onCallFontSize, onCallLetterSpacing, onCallMargin, onCallMessage, onCallWordSpacing, percentage, percentageMargin, power, powerMargin, powerSVG, ref, selectForegroundColor, signal, signalMargin, signal_v10_2x, signal_v10_3x, signal_v11_2x, signal_v11_3x, statusBarHeight, styleBar, svg, svgCSS, time, timeFontWeight, timeLetterSpacing, topMargin, wifi, wifiMargin, wifiSVG;
    this.options = options != null ? options : {};
    this.options = _.assign({}, defaults, this.options);
    StatusBarLayer.__super__.constructor.call(this, this.options);
    this.isHidden = this.options.hide;
    isiPhone = function() {
      if (_.includes(Framer.Device.deviceType, "iphone")) {
        return true;
      } else {
        return false;
      }
    };
    isiPhonePlus = function() {
      if (_.includes(Framer.Device.deviceType, "plus")) {
        return true;
      } else {
        return false;
      }
    };
    getBatteryMargin = (function(_this) {
      return function() {
        if (_this.options.powered === false) {
          if (isiPhonePlus() && _this.options.version > 10) {
            return 5;
          } else {
            return 5.5;
          }
        } else {
          return 2.5;
        }
      };
    })(this);
    getBatteryWidth = (function(_this) {
      return function() {
        if (_this.options.version > 10 && isiPhonePlus()) {
          return 26;
        } else if (_this.options.version > 10) {
          return 26.5;
        } else {
          return 24.5;
        }
      };
    })(this);
    getBatterySVG = (function(_this) {
      return function() {
        var size;
        size = isiPhonePlus() ? "at3x" : "at2x";
        return svg["battery"]["v" + _this.options.version][size];
      };
    })(this);
    getSignalSVG = (function(_this) {
      return function() {
        var size;
        size = isiPhonePlus() ? "at3x" : "at2x";
        return svg["signal"]["v" + _this.options.version][size];
      };
    })(this);
    getScreenWidth = function() {
      var orientation;
      if (_.includes(Framer.Device.deviceType, "apple")) {
        orientation = 0;
        if (Utils.isMobile()) {
          orientation = window.orientation;
        } else {
          orientation = Math.abs(Framer.Device.orientation);
        }
        if (orientation === 0) {
          return Math.min(Screen.width, Screen.height);
        } else {
          return Math.max(Screen.width, Screen.height);
        }
      } else {
        return Screen.width;
      }
    };
    topMargin = 3;
    onCallMargin = 18;
    statusBarHeight = 20;
    onCallMargin = topMargin + onCallMargin;
    carrierMargin = 4.5;
    signalMargin = isiPhonePlus() ? 6 : 6.5;
    wifiMargin = 4;
    powerMargin = 5.5;
    percentageMargin = 2.5;
    alarmMargin = 6.5;
    locationMargin = 6;
    ipodMargin = 6;
    baseFontSize = 12;
    onCallFontSize = 13.5;
    letterSpacing = 0;
    timeLetterSpacing = isiPhonePlus() ? 1 : 0;
    onCallLetterSpacing = 0;
    onCallWordSpacing = 0;
    fontWeight = isiPhonePlus() ? 300 : 400;
    timeFontWeight = 500;
    this.height = statusBarHeight;
    if (this.options.ipod === true) {
      this.options.carrier = "iPod";
      this.options.signal = false;
    }
    if (this.options.powered === true) {
      batteryColor = batteryGreen;
    } else {
      batteryColor = this.options.foregroundColor;
    }
    getBatteryLevel = (function(_this) {
      return function(defaultBatteryWidth) {
        var percentageWidth;
        percentageWidth = _this.options.percent / 100 * defaultBatteryWidth;
        percentageWidth = Math.round(percentageWidth);
        return percentageWidth;
      };
    })(this);
    appleSVGCSS = ".svgFit {\n  object-fit: contain;\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n}";
    canvasSVGCSS = ".svgFit {\n  object-fit: contain;\n  width: 100%;\n  max-width: 100%;\n  position: absolute;\n  top: 0;\n}";
    svgCSS = _.includes(Framer.Device.deviceType, "apple") ? appleSVGCSS : canvasSVGCSS;
    Utils.insertCSS(svgCSS);
    signal_v10_2x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 34 16'><circle cx='2.75' cy='2.75' r='2.75' fill='" + this.options.foregroundColor + "' /><circle cx='9.75' cy='2.75' r='2.75' fill='" + this.options.foregroundColor + "' /><circle cx='16.75' cy='2.75' r='2.75' fill='" + this.options.foregroundColor + "' /><circle cx='23.75' cy='2.75' r='2.75' fill='" + this.options.foregroundColor + "' /><circle cx='30.75' cy='2.75' r='2.5' stroke='" + this.options.foregroundColor + "' stroke-width='0.5' fill-opacity='0' class='stroked' /></svg>";
    signal_v11_2x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 33 33'><rect x='0' y='11' width='6' height='9' rx='2' fill='" + this.options.foregroundColor + "' /><rect x='9' y='8' width='6' height='12' rx='2' fill='" + this.options.foregroundColor + "' /><rect x='18' y='4' width='6' height='16' rx='2' fill='" + this.options.foregroundColor + "' /><rect x='27' y='0' width='6' height='20' rx='2' fill='" + this.options.foregroundColor + "' /></svg>";
    signal_v10_3x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 67 32'><circle cx='5.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='19.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='33.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><circle cx='47.5' cy='5.5' r='5.5' fill='" + this.options.foregroundColor + "' /><path d='M61.5,1A4.5,4.5,0,1,1,57,5.5,4.51,4.51,0,0,1,61.5,1m0-1A5.5,5.5,0,1,0,67,5.5,5.5,5.5,0,0,0,61.5,0Z' fill='" + this.options.foregroundColor + "' /></svg>";
    signal_v11_3x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 49.5 60'><rect x='0' y='17' width='9' height='13' rx='3' fill='" + this.options.foregroundColor + "' /><rect x='13' y='12' width='9' height='18' rx='3' fill='" + this.options.foregroundColor + "' /><rect x='26' y='6' width='9' height='24' rx='3' fill='" + this.options.foregroundColor + "' /><rect x='39' y='0' width='9' height='30' rx='3' fill='" + this.options.foregroundColor + "' /></svg>";
    wifiSVG = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 24 36'><path d='M 8.085 13.63 L 11.995 18 L 15.905 13.63 C 13.752 11.454 10.238 11.454 8.085 13.63 Z M 4.085 9.16 L 6.085 11.39 C 9.376 8.192 14.614 8.192 17.905 11.39 L 19.905 9.16 C 15.479 4.943 8.521 4.943 4.095 9.16 Z M 11.995 0 C 7.576 0.001 3.322 1.681 0.095 4.7 L 2.095 6.93 C 7.659 1.691 16.341 1.691 21.905 6.93 L 23.905 4.7 C 20.676 1.678 16.418 -0.002 11.995 0 Z' fill='" + this.options.foregroundColor + "' /></svg>";
    battery_v10_2x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 49 32'><rect x='0.5' y='0.5'  width='44' height='18' rx='3' ry='3' stroke='" + this.options.foregroundColor + "' fill-opacity='0' class='stroked' /><rect x='2' y='2' width='" + (getBatteryLevel(41)) + "' height='15' rx='1.5' ry='1.5' fill='" + batteryColor + "' id='batteryFill' /><path d='M46,6v7a3.28,3.28,0,0,0,3-3.5A3.28,3.28,0,0,0,46,6Z' fill='" + this.options.foregroundColor + "'/></svg>";
    battery_v11_2x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 53 32'><rect fill='" + batteryColor + "' id='batteryFill' x='4' y='4' width='" + (getBatteryLevel(40)) + "' height='15' rx='2' /><rect stroke='" + this.options.foregroundColor + "' fill-opacity='0' class='stroked' stroke-width='2' opacity='0.4' x='1' y='1' width='46' height='21' rx='5' /><path d='M50,7.25605856 C51.7477886,7.87381317 53,9.54067176 53,11.5 C53,13.4593282 51.7477886,15.1261868 50,15.7439414 L50,7.25605856 Z' fill='" + this.options.foregroundColor + "' opacity='0.4' /></svg>";
    battery_v10_3x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 73 42'><path d='M62,0H5A5,5,0,0,0,0,5V24a5,5,0,0,0,5,5H62a5,5,0,0,0,5-5V5A5,5,0,0,0,62,0Zm4,24a4,4,0,0,1-4,4H5a4,4,0,0,1-4-4V5A4,4,0,0,1,5,1H62a4,4,0,0,1,4,4Z' fill='" + this.options.foregroundColor + "' /><rect x='2' y='2' width='" + (getBatteryLevel(63)) + "' height='25' rx='3' ry='3' fill='" + batteryColor + "' id='batteryFill' /><path d='M69,10.06v9.89A4.82,4.82,0,0,0,73,15,4.82,4.82,0,0,0,69,10.06Z' fill='" + this.options.foregroundColor + "' /></svg>";
    battery_v11_3x = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 78 42'><rect fill='" + batteryColor + "' id='batteryFill' x='6' y='6' width='" + (getBatteryLevel(59)) + "' height='22' rx='3' /><rect stroke='" + this.options.foregroundColor + "' fill-opacity='0' class='stroked' stroke-width='3' opacity='0.4' x='1.5' y='1.5' width='68' height='31' rx='7.5' /><path d='M 74 10.674 C 76.365 11.797 78 14.208 78 17 C 78 19.792 76.365 22.203 74 23.326 L 74 10.674 Z' fill='" + this.options.foregroundColor + "' opacity='0.4'/></svg>";
    powerSVG = "<svg xmlns='http://www.w3.org/2000/svg' class='svgFit' viewBox='0 0 6 17'><polygon points='6 3.75 3.43 3.75 4.5 0 0.5 5.25 2.98 5.25 1.5 9.5 6 3.75' fill='" + this.options.foregroundColor + "' /></svg>";
    svg = {
      battery: {
        v10: {
          at2x: battery_v10_2x,
          at3x: battery_v10_3x
        },
        v11: {
          at2x: battery_v11_2x,
          at3x: battery_v11_3x
        }
      },
      signal: {
        v10: {
          at2x: signal_v10_2x,
          at3x: signal_v10_3x
        },
        v11: {
          at2x: signal_v11_2x,
          at3x: signal_v11_3x
        }
      },
      wifi: wifiSVG,
      power: powerSVG
    };
    onCallBlock = new Layer({
      parent: this,
      name: "onCallBlock",
      height: statusBarHeight
    });
    this.onCallBlock = onCallBlock;
    onCallMessage = new TextLayer({
      parent: this,
      name: "onCallMessage",
      padding: {
        top: onCallMargin
      },
      text: "",
      fontSize: onCallFontSize,
      fontWeight: fontWeight,
      textAlign: "center",
      color: "white",
      letterSpacing: onCallLetterSpacing,
      wordSpacing: onCallWordSpacing
    });
    this.onCallMessage = onCallMessage;
    carrier = new TextLayer({
      parent: this,
      name: "carrier",
      padding: {
        top: topMargin
      },
      text: this.options.carrier,
      fontSize: baseFontSize,
      fontWeight: fontWeight,
      letterSpacing: letterSpacing
    });
    this.carrier = carrier;
    signal = new Layer({
      parent: this,
      name: "signal",
      width: this.options.version > 10 ? 16.5 : 34,
      height: this.options.version > 10 ? 10 : 6,
      y: Align.center,
      html: getSignalSVG()
    });
    this.signal = signal;
    wifi = new Layer({
      parent: this,
      name: "wifi",
      y: Align.center,
      width: 13,
      height: 9,
      html: wifiSVG
    });
    this.wifi = wifi;
    getTime = (function(_this) {
      return function() {
        var day, hour, minute, second, suffix, today;
        today = new Date;
        day = today.getDay();
        hour = today.getHours();
        minute = today.getMinutes();
        second = today.getSeconds();
        suffix = hour >= 12 ? ' PM' : ' AM';
        hour = hour > 12 ? hour - 12 : hour;
        minute = minute < 10 ? "0" + minute : minute;
        if (_this.options.time === "") {
          return hour + ':' + minute + suffix;
        } else {
          return _this.options.time;
        }
      };
    })(this);
    time = new TextLayer({
      parent: this,
      name: "time",
      width: this.width,
      padding: {
        top: topMargin
      },
      text: getTime(),
      fontSize: baseFontSize,
      fontWeight: timeFontWeight,
      textAlign: "center",
      letterSpacing: timeLetterSpacing
    });
    this.time = time;
    power = new Layer({
      parent: this,
      name: "power",
      y: Align.center,
      width: 5.5,
      height: 9.5,
      html: powerSVG
    });
    this.power = power;
    battery = new Layer({
      parent: this,
      name: "battery",
      y: Align.center,
      width: getBatteryWidth(),
      height: this.options.version > 10 ? 11.5 : 9,
      html: getBatterySVG()
    });
    this.battery = battery;
    percentage = new TextLayer({
      parent: this,
      name: "percentage",
      padding: {
        top: topMargin
      },
      text: this.options.percent + "%",
      fontSize: baseFontSize,
      fontWeight: fontWeight,
      textAlign: "right",
      letterSpacing: letterSpacing
    });
    this.percentage = percentage;
    ref = this.subLayers;
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      layer.backgroundColor = "clear";
    }
    this.hide = (function(_this) {
      return function() {
        _this.isHidden = true;
        return _this.animate({
          properties: {
            y: 0 - statusBarHeight
          },
          time: 0.25
        });
      };
    })(this);
    this.show = (function(_this) {
      return function() {
        _this.isHidden = false;
        return _this.animate({
          properties: {
            y: 0
          },
          time: 0.25
        });
      };
    })(this);
    this.layout = (function(_this) {
      return function(orientation) {
        var layoutWidth;
        if (orientation == null) {
          orientation = 0;
        }
        layoutWidth = getScreenWidth();
        _this.width = layoutWidth;
        if (_this.options.hide === true) {
          _this.hide();
        } else if (_this.options.autoHide === true && orientation > 0 && isiPhone()) {
          _this.hide();
        } else {
          _this.show();
        }
        if (_this.options.carrier === "") {
          carrierMargin = 0;
        }
        if (_this.options.signal === true) {
          signal.visible = true;
          signal.x = signalMargin;
          carrier.x = signal.x + signal.width + carrierMargin;
        } else {
          signal.visible = false;
          carrier.x = ipodMargin;
        }
        if (_this.options.wifi === true) {
          wifi.visible = true;
        } else {
          wifi.visible = false;
        }
        wifi.x = carrier.x + carrier.width + wifiMargin;
        time.width = layoutWidth;
        onCallBlock.width = layoutWidth;
        onCallMessage.width = layoutWidth;
        if (_this.options.powered === true) {
          power.x = Align.right(-powerMargin);
        } else {
          power.x = layoutWidth;
        }
        battery.x = power.x - battery.width - getBatteryMargin();
        if (_this.options.showPercentage === false) {
          percentageMargin = 0;
          percentage.text = "";
        } else {
          percentage.text = _this.options.percent + "%";
        }
        return percentage.maxX = battery.x - percentageMargin;
      };
    })(this);
    getTime();
    this.layout();
    selectForegroundColor = (function(_this) {
      return function() {
        if (_this.options.foregroundColor === "") {
          if (_this.options.style === "dark") {
            return "white";
          } else {
            return "black";
          }
        } else {
          return _this.options.foregroundColor;
        }
      };
    })(this);
    foregroundItems = [percentage, power, time, wifi, signal, carrier, battery];
    colorForeground = (function(_this) {
      return function(color) {
        var SVG, j, k, layerSVG, len1, len2, results, strokedSVG;
        if (color == null) {
          color = "";
        }
        if (color === "") {
          color = selectForegroundColor();
        }
        results = [];
        for (j = 0, len1 = foregroundItems.length; j < len1; j++) {
          layer = foregroundItems[j];
          layer.color = color;
          layerSVG = layer.querySelectorAll('path, circle, rect, polygon');
          strokedSVG = layer.querySelectorAll('.stroked');
          for (k = 0, len2 = layerSVG.length; k < len2; k++) {
            SVG = layerSVG[k];
            SVG.setAttribute('fill', color);
          }
          results.push((function() {
            var l, len3, results1;
            results1 = [];
            for (l = 0, len3 = strokedSVG.length; l < len3; l++) {
              SVG = strokedSVG[l];
              SVG.setAttribute('stroke', color);
              results1.push(SVG.setAttribute('fill-opacity', '0'));
            }
            return results1;
          })());
        }
        return results;
      };
    })(this);
    colorBattery = (function(_this) {
      return function() {
        var SVG, batteryFillSVG, j, k, l, len1, len2, len3, results, results1, results2;
        batteryFillSVG = layer.querySelectorAll('#batteryFill');
        if (_this.options.onCall === true) {
          results = [];
          for (j = 0, len1 = batteryFillSVG.length; j < len1; j++) {
            SVG = batteryFillSVG[j];
            SVG.style.WebkitTransition = 'all 0.25s';
            results.push(SVG.setAttribute('fill', "white"));
          }
          return results;
        } else if (_this.options.powered === true) {
          results1 = [];
          for (k = 0, len2 = batteryFillSVG.length; k < len2; k++) {
            SVG = batteryFillSVG[k];
            SVG.style.WebkitTransition = 'all 0.25s';
            results1.push(SVG.setAttribute('fill', batteryGreen));
          }
          return results1;
        } else {
          results2 = [];
          for (l = 0, len3 = batteryFillSVG.length; l < len3; l++) {
            SVG = batteryFillSVG[l];
            SVG.style.WebkitTransition = 'all 0.25s';
            results2.push(SVG.setAttribute('fill', selectForegroundColor()));
          }
          return results2;
        }
      };
    })(this);
    styleBar = (function(_this) {
      return function(style, backgroundColor) {
        var barColor;
        if (backgroundColor == null) {
          backgroundColor = "";
        }
        if (backgroundColor === "") {
          _this.style = {
            "-webkit-backdrop-filter": "blur(60px)"
          };
          if (style === "dark") {
            _this.backgroundColor = "rgba(0, 0, 0, 0.5)";
          } else {
            _this.backgroundColor = "rgba(255, 255, 255, 0.5)";
          }
        } else {
          _this.backgroundColor = backgroundColor;
        }
        if (_this.options.vibrant === true) {
          barColor = new Color(backgroundColor).alpha(.5);
          _this.backgroundColor = barColor;
          return _this.style = {
            "-webkit-backdrop-filter": "blur(60px)"
          };
        }
      };
    })(this);
    this.applyStyle = (function(_this) {
      return function(style, foregroundColor, backgroundColor) {
        if (style == null) {
          style = _this.options.style;
        }
        if (foregroundColor == null) {
          foregroundColor = _this.options.foregroundColor;
        }
        if (backgroundColor == null) {
          backgroundColor = _this.options.backgroundColor;
        }
        if (style === "light" && foregroundColor === "") {
          foregroundColor = "black";
        }
        if (style === "dark" && foregroundColor === "") {
          foregroundColor = "white";
        }
        styleBar(style, backgroundColor);
        colorForeground();
        return colorBattery();
      };
    })(this);
    this.applyStyle();
    this.startCall = (function(_this) {
      return function(message, color) {
        if (message == null) {
          message = "Touch to return to call 0:30";
        }
        if (color == null) {
          color = onCallColor;
        }
        _this.options.onCall = true;
        colorForeground("white");
        colorBattery();
        onCallBlock.animate({
          properties: {
            backgroundColor: color,
            opacity: 1,
            height: statusBarHeight * 2
          },
          time: 0.25
        });
        return onCallBlock.onAnimationEnd(function() {
          if (_this.options.onCall === true) {
            return onCallMessage.text = message;
          }
        });
      };
    })(this);
    this.endCall = (function(_this) {
      return function() {
        _this.options.onCall = false;
        onCallMessage.text = "";
        onCallBlock.animate({
          properties: {
            opacity: 0,
            height: statusBarHeight
          },
          time: 0.25
        });
        return _this.applyStyle();
      };
    })(this);
    if (Utils.isMobile()) {
      device = "mobile";
      window.addEventListener("orientationchange", (function(_this) {
        return function() {
          return _this.layout(window.orientation);
        };
      })(this));
    } else {
      Framer.Device.on("change:orientation", (function(_this) {
        return function() {
          device = "Framer";
          return _this.layout(Math.abs(Framer.Device.orientation));
        };
      })(this));
    }
  }

  StatusBarLayer.define('hidden', {
    get: function() {
      return this.isHidden;
    }
  });

  StatusBarLayer.define('onCall', {
    get: function() {
      return this.options.onCall;
    }
  });

  return StatusBarLayer;

})(Layer);

module.exports = StatusBarLayer;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvc3RhdHVzYmFybGF5ZXIvU3RhdHVzQmFyTGF5ZXIuY29mZmVlIiwiLi4vbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi9tb2R1bGVzL2lucHV0LWZyYW1lci9pbnB1dC5jb2ZmZWUiLCIuLi9tb2R1bGVzL2ZyYW1lci1jYW1lcmEtaW5wdXQvQ2FtZXJhSW5wdXQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcblx0IyBVU0lORyBTVEFUVVNCQVJMQVlFUlxuXG5cdCMgUmVxdWlyZSB0aGUgbW9kdWxlXG5cdFN0YXR1c0JhckxheWVyID0gcmVxdWlyZSBcIlN0YXR1c0JhckxheWVyXCJcblxuXHRteVN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXJMYXllclxuXHRcdCMgaU9TIHZlcnNpb25cblx0XHR2ZXJzaW9uOiA8bnVtYmVyPiAoMTAgfHwgMTEpXG5cblx0XHQjIFRleHRcblx0XHRjYXJyaWVyOiA8c3RyaW5nPlxuXHRcdHRpbWU6IDxzdHJpbmc+ICMgaWYgbm90IHNldCwgd2lsbCB1c2UgbG9jYWwgdGltZVxuXHRcdHBlcmNlbnQ6IDxudW1iZXI+XG5cblx0XHQjIFNob3cgb3IgaGlkZSBzdGF0dXMgaXRlbXNcblx0XHRzaWduYWw6IDxib29sZWFuPlxuXHRcdHdpZmk6IDxib29sZWFuPlxuXHRcdHBvd2VyZWQ6IDxib29sZWFuPlxuXHRcdHNob3dQZXJjZW50YWdlOiA8Ym9vbGVhbj5cblx0XHRpcG9kOiA8Ym9vbGVhbj4gIyBhbHNvIGFmZmVjdHMgc2lnbmFsIGFuZCBjYXJyaWVyXG5cblx0XHQjIENvbG9yc1xuXHRcdHN0eWxlOiA8c3RyaW5nPiAoXCJsaWdodFwiIHx8IFwiZGFya1wiKVxuXHRcdGZvcmVncm91bmRDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdGJhY2tncm91bmRDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdHZpYnJhbnQ6IDxib29sZWFuPlxuXG5cdFx0IyBCZWhhdmlvclxuXHRcdGhpZGU6IDxib29sZWFuPiAjIGluaXRpYWwgdmlzaWJpbGl0eVxuXHRcdGF1dG9IaWRlOiA8Ym9vbGVhbj4gIyBoaWRlIGluIGxhbmRzY2FwZSB3aGVyZSBkZXZpY2UtYXBwcm9wcmlhdGVcblxuXHRcdCMgU2ltdWxhdGUgY2FsbFxuXHRcdG15U3RhdHVzQmFyLnN0YXJ0Q2FsbChtZXNzYWdlLCBjb2xvcikgIyA8c3RyaW5nPiwgPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdG15U3RhdHVzQmFyLmVuZENhbGwoKVxuXG5cdFx0IyBDaGVjayB2aXNpYmlsaXR5IGFuZCBjYWxsIHN0YXR1c1xuXHRcdHByaW50IG15U3RhdHVzQmFyLmhpZGRlblxuXHRcdHByaW50IG15U3RhdHVzQmFyLm9uQ2FsbFxuIyMjXG5cbmRlZmF1bHRzID1cblx0c3R5bGU6IFwibGlnaHRcIlxuXHRwb3dlcmVkOiBmYWxzZVxuXHRjYXJyaWVyOiBcIkNhcnJpZXJcIlxuXHRmb3JlZ3JvdW5kQ29sb3I6IFwiXCJcblx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdHRpbWU6IFwiXCJcblx0cGVyY2VudDogMTAwXG5cdHNob3dQZXJjZW50YWdlOiB0cnVlXG5cdHdpZmk6IHRydWVcblx0c2lnbmFsOiB0cnVlXG5cdGlwb2Q6IGZhbHNlXG5cdGhpZGU6IGZhbHNlXG5cdGF1dG9IaWRlOiB0cnVlXG5cdG9uQ2FsbDogZmFsc2Vcblx0dmlicmFudDogZmFsc2Vcblx0dmVyc2lvbjogMTFcblxuIyBpT1MgMTEgdW5maWxsZWQgc2lnbmFsIGJhciBpcyAyNSVcbiMgaU9TIDExIGJhdHRlcnkgc3Ryb2tlIGlzIDM1JVxuXG5jbGFzcyBTdGF0dXNCYXJMYXllciBleHRlbmRzIExheWVyXG5cblx0YmF0dGVyeUdyZWVuID0gXCIjNGNkOTY0XCJcblx0b25DYWxsQ29sb3IgPSBcIiM0Y2Q5NjRcIlxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMgPSBfLmFzc2lnbih7fSwgZGVmYXVsdHMsIEBvcHRpb25zKVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEAuaXNIaWRkZW4gPSBAb3B0aW9ucy5oaWRlXG5cblx0XHRpc2lQaG9uZSA9ICgpIC0+XG5cdFx0XHRpZiBfLmluY2x1ZGVzKEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSwgXCJpcGhvbmVcIilcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRpc2lQaG9uZVBsdXMgPSAoKSAtPlxuXHRcdFx0aWYgXy5pbmNsdWRlcyhGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUsIFwicGx1c1wiKVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRcdGdldEJhdHRlcnlNYXJnaW4gPSAoKSA9PlxuXHRcdFx0aWYgQG9wdGlvbnMucG93ZXJlZCA9PSBmYWxzZVxuXHRcdFx0XHRpZiBpc2lQaG9uZVBsdXMoKSBhbmQgQG9wdGlvbnMudmVyc2lvbiA+IDEwXG5cdFx0XHRcdFx0cmV0dXJuIDVcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJldHVybiA1LjVcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIDIuNVxuXG5cdFx0Z2V0QmF0dGVyeVdpZHRoID0gKCkgPT5cblx0XHRcdGlmIEBvcHRpb25zLnZlcnNpb24gPiAxMCBhbmQgaXNpUGhvbmVQbHVzKClcblx0XHRcdFx0cmV0dXJuIDI2XG5cdFx0XHRlbHNlIGlmIEBvcHRpb25zLnZlcnNpb24gPiAxMFxuXHRcdFx0XHRyZXR1cm4gMjYuNVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gMjQuNVxuXG5cdFx0Z2V0QmF0dGVyeVNWRyA9ICgpID0+XG5cdFx0XHRzaXplID0gaWYgaXNpUGhvbmVQbHVzKCkgdGhlbiBcImF0M3hcIiBlbHNlIFwiYXQyeFwiXG5cdFx0XHRyZXR1cm4gc3ZnW1wiYmF0dGVyeVwiXVtcInZcIiArIEBvcHRpb25zLnZlcnNpb25dW3NpemVdXG5cblx0XHRnZXRTaWduYWxTVkcgPSAoKSA9PlxuXHRcdFx0c2l6ZSA9IGlmIGlzaVBob25lUGx1cygpIHRoZW4gXCJhdDN4XCIgZWxzZSBcImF0MnhcIlxuXHRcdFx0cmV0dXJuIHN2Z1tcInNpZ25hbFwiXVtcInZcIiArIEBvcHRpb25zLnZlcnNpb25dW3NpemVdXG5cblx0XHRnZXRTY3JlZW5XaWR0aCA9ICgpIC0+XG5cdFx0XHRpZiBfLmluY2x1ZGVzKEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSwgXCJhcHBsZVwiKVxuXHRcdFx0XHRvcmllbnRhdGlvbiA9IDBcblx0XHRcdFx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdFx0XHRcdG9yaWVudGF0aW9uID0gd2luZG93Lm9yaWVudGF0aW9uXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRvcmllbnRhdGlvbiA9IE1hdGguYWJzKEZyYW1lci5EZXZpY2Uub3JpZW50YXRpb24pXG5cdFx0XHRcdGlmIG9yaWVudGF0aW9uID09IDBcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5taW4oU2NyZWVuLndpZHRoLCBTY3JlZW4uaGVpZ2h0KVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KFNjcmVlbi53aWR0aCwgU2NyZWVuLmhlaWdodClcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIFNjcmVlbi53aWR0aFxuXG5cdFx0dG9wTWFyZ2luID0gM1xuXHRcdG9uQ2FsbE1hcmdpbiA9IDE4XG5cdFx0c3RhdHVzQmFySGVpZ2h0ID0gMjBcblx0XHRvbkNhbGxNYXJnaW4gPSB0b3BNYXJnaW4gKyBvbkNhbGxNYXJnaW5cblx0XHRjYXJyaWVyTWFyZ2luID0gNC41XG5cdFx0c2lnbmFsTWFyZ2luID0gaWYgaXNpUGhvbmVQbHVzKCkgdGhlbiA2IGVsc2UgNi41XG5cdFx0d2lmaU1hcmdpbiA9IDRcblx0XHRwb3dlck1hcmdpbiA9IDUuNVxuXHRcdHBlcmNlbnRhZ2VNYXJnaW4gPSAyLjVcblx0XHRhbGFybU1hcmdpbiA9IDYuNVxuXHRcdGxvY2F0aW9uTWFyZ2luID0gNlxuXHRcdGlwb2RNYXJnaW4gPSA2XG5cdFx0YmFzZUZvbnRTaXplID0gMTJcblx0XHRvbkNhbGxGb250U2l6ZSA9IDEzLjVcblx0XHRsZXR0ZXJTcGFjaW5nID0gMFxuXHRcdHRpbWVMZXR0ZXJTcGFjaW5nID0gaWYgaXNpUGhvbmVQbHVzKCkgdGhlbiAxIGVsc2UgMFxuXHRcdG9uQ2FsbExldHRlclNwYWNpbmcgPSAwXG5cdFx0b25DYWxsV29yZFNwYWNpbmcgPSAwXG5cdFx0Zm9udFdlaWdodCA9IGlmIGlzaVBob25lUGx1cygpIHRoZW4gMzAwIGVsc2UgNDAwXG5cdFx0dGltZUZvbnRXZWlnaHQgPSA1MDBcblxuXHRcdEAuaGVpZ2h0ID0gc3RhdHVzQmFySGVpZ2h0XG5cblx0XHRpZiBAb3B0aW9ucy5pcG9kID09IHRydWVcblx0XHRcdEBvcHRpb25zLmNhcnJpZXIgPSBcImlQb2RcIlxuXHRcdFx0QG9wdGlvbnMuc2lnbmFsID0gZmFsc2VcblxuXHRcdGlmIEBvcHRpb25zLnBvd2VyZWQgPT0gdHJ1ZVxuXHRcdFx0YmF0dGVyeUNvbG9yID0gYmF0dGVyeUdyZWVuXG5cdFx0ZWxzZVxuXHRcdFx0YmF0dGVyeUNvbG9yID0gQG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yXG5cblx0XHRnZXRCYXR0ZXJ5TGV2ZWwgPSAoZGVmYXVsdEJhdHRlcnlXaWR0aCkgPT5cblx0XHRcdHBlcmNlbnRhZ2VXaWR0aCA9IEBvcHRpb25zLnBlcmNlbnQgLyAxMDAgKiBkZWZhdWx0QmF0dGVyeVdpZHRoXG5cdFx0XHRwZXJjZW50YWdlV2lkdGggPSBNYXRoLnJvdW5kKHBlcmNlbnRhZ2VXaWR0aClcblx0XHRcdHJldHVybiBwZXJjZW50YWdlV2lkdGhcblxuXHRcdGFwcGxlU1ZHQ1NTID0gXCJcIlwiXG5cdFx0XHQuc3ZnRml0IHtcblx0XHRcdCAgb2JqZWN0LWZpdDogY29udGFpbjtcblx0XHRcdCAgd2lkdGg6IDEwMCU7XG5cdFx0XHQgIGhlaWdodDogMTAwJTtcblx0XHRcdCAgbWF4LXdpZHRoOiAxMDAlO1xuXHRcdFx0ICBtYXgtaGVpZ2h0OiAxMDAlO1xuXHRcdFx0fVxuXHRcdFx0XCJcIlwiXG5cblx0XHRjYW52YXNTVkdDU1MgPSBcIlwiXCJcblx0XHRcdC5zdmdGaXQge1xuXHRcdFx0ICBvYmplY3QtZml0OiBjb250YWluO1xuXHRcdFx0ICB3aWR0aDogMTAwJTtcblx0XHRcdCAgbWF4LXdpZHRoOiAxMDAlO1xuXHRcdFx0ICBwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHQgIHRvcDogMDtcblx0XHRcdH1cblx0XHRcdFwiXCJcIlxuXHRcdHN2Z0NTUyA9IGlmIF8uaW5jbHVkZXMoRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlLCBcImFwcGxlXCIpIHRoZW4gYXBwbGVTVkdDU1MgZWxzZSBjYW52YXNTVkdDU1Ncblx0XHRcblx0XHRVdGlscy5pbnNlcnRDU1Moc3ZnQ1NTKVxuXHRcdHNpZ25hbF92MTBfMnggPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgMzQgMTYnPjxjaXJjbGUgY3g9JzIuNzUnIGN5PScyLjc1JyByPScyLjc1JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PGNpcmNsZSBjeD0nOS43NScgY3k9JzIuNzUnIHI9JzIuNzUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48Y2lyY2xlIGN4PScxNi43NScgY3k9JzIuNzUnIHI9JzIuNzUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48Y2lyY2xlIGN4PScyMy43NScgY3k9JzIuNzUnIHI9JzIuNzUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48Y2lyY2xlIGN4PSczMC43NScgY3k9JzIuNzUnIHI9JzIuNScgc3Ryb2tlPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIHN0cm9rZS13aWR0aD0nMC41JyBmaWxsLW9wYWNpdHk9JzAnIGNsYXNzPSdzdHJva2VkJyAvPjwvc3ZnPlwiXG5cdFx0c2lnbmFsX3YxMV8yeCA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdzdmdGaXQnIHZpZXdCb3g9JzAgMCAzMyAzMyc+PHJlY3QgeD0nMCcgeT0nMTEnIHdpZHRoPSc2JyBoZWlnaHQ9JzknIHJ4PScyJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHJlY3QgeD0nOScgeT0nOCcgd2lkdGg9JzYnIGhlaWdodD0nMTInIHJ4PScyJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHJlY3QgeD0nMTgnIHk9JzQnIHdpZHRoPSc2JyBoZWlnaHQ9JzE2JyByeD0nMicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjxyZWN0IHg9JzI3JyB5PScwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzInIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48L3N2Zz5cIlxuXHRcdHNpZ25hbF92MTBfM3ggPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgNjcgMzInPjxjaXJjbGUgY3g9JzUuNScgY3k9JzUuNScgcj0nNS41JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PGNpcmNsZSBjeD0nMTkuNScgY3k9JzUuNScgcj0nNS41JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PGNpcmNsZSBjeD0nMzMuNScgY3k9JzUuNScgcj0nNS41JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PGNpcmNsZSBjeD0nNDcuNScgY3k9JzUuNScgcj0nNS41JyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHBhdGggZD0nTTYxLjUsMUE0LjUsNC41LDAsMSwxLDU3LDUuNSw0LjUxLDQuNTEsMCwwLDEsNjEuNSwxbTAtMUE1LjUsNS41LDAsMSwwLDY3LDUuNSw1LjUsNS41LDAsMCwwLDYxLjUsMFonIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48L3N2Zz5cIlxuXHRcdHNpZ25hbF92MTFfM3ggPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgNDkuNSA2MCc+PHJlY3QgeD0nMCcgeT0nMTcnIHdpZHRoPSc5JyBoZWlnaHQ9JzEzJyByeD0nMycgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjxyZWN0IHg9JzEzJyB5PScxMicgd2lkdGg9JzknIGhlaWdodD0nMTgnIHJ4PSczJyBmaWxsPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIC8+PHJlY3QgeD0nMjYnIHk9JzYnIHdpZHRoPSc5JyBoZWlnaHQ9JzI0JyByeD0nMycgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjxyZWN0IHg9JzM5JyB5PScwJyB3aWR0aD0nOScgaGVpZ2h0PSczMCcgcng9JzMnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48L3N2Zz5cIlxuXHRcdHdpZmlTVkcgPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgMjQgMzYnPjxwYXRoIGQ9J00gOC4wODUgMTMuNjMgTCAxMS45OTUgMTggTCAxNS45MDUgMTMuNjMgQyAxMy43NTIgMTEuNDU0IDEwLjIzOCAxMS40NTQgOC4wODUgMTMuNjMgWiBNIDQuMDg1IDkuMTYgTCA2LjA4NSAxMS4zOSBDIDkuMzc2IDguMTkyIDE0LjYxNCA4LjE5MiAxNy45MDUgMTEuMzkgTCAxOS45MDUgOS4xNiBDIDE1LjQ3OSA0Ljk0MyA4LjUyMSA0Ljk0MyA0LjA5NSA5LjE2IFogTSAxMS45OTUgMCBDIDcuNTc2IDAuMDAxIDMuMzIyIDEuNjgxIDAuMDk1IDQuNyBMIDIuMDk1IDYuOTMgQyA3LjY1OSAxLjY5MSAxNi4zNDEgMS42OTEgMjEuOTA1IDYuOTMgTCAyMy45MDUgNC43IEMgMjAuNjc2IDEuNjc4IDE2LjQxOCAtMC4wMDIgMTEuOTk1IDAgWicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjwvc3ZnPlwiXG5cdFx0YmF0dGVyeV92MTBfMnggPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgNDkgMzInPjxyZWN0IHg9JzAuNScgeT0nMC41JyAgd2lkdGg9JzQ0JyBoZWlnaHQ9JzE4JyByeD0nMycgcnk9JzMnIHN0cm9rZT0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyBmaWxsLW9wYWNpdHk9JzAnIGNsYXNzPSdzdHJva2VkJyAvPjxyZWN0IHg9JzInIHk9JzInIHdpZHRoPScje2dldEJhdHRlcnlMZXZlbCg0MSl9JyBoZWlnaHQ9JzE1JyByeD0nMS41JyByeT0nMS41JyBmaWxsPScje2JhdHRlcnlDb2xvcn0nIGlkPSdiYXR0ZXJ5RmlsbCcgLz48cGF0aCBkPSdNNDYsNnY3YTMuMjgsMy4yOCwwLDAsMCwzLTMuNUEzLjI4LDMuMjgsMCwwLDAsNDYsNlonIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScvPjwvc3ZnPlwiXG5cdFx0YmF0dGVyeV92MTFfMnggPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgNTMgMzInPjxyZWN0IGZpbGw9JyN7YmF0dGVyeUNvbG9yfScgaWQ9J2JhdHRlcnlGaWxsJyB4PSc0JyB5PSc0JyB3aWR0aD0nI3tnZXRCYXR0ZXJ5TGV2ZWwoNDApfScgaGVpZ2h0PScxNScgcng9JzInIC8+PHJlY3Qgc3Ryb2tlPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIGZpbGwtb3BhY2l0eT0nMCcgY2xhc3M9J3N0cm9rZWQnIHN0cm9rZS13aWR0aD0nMicgb3BhY2l0eT0nMC40JyB4PScxJyB5PScxJyB3aWR0aD0nNDYnIGhlaWdodD0nMjEnIHJ4PSc1JyAvPjxwYXRoIGQ9J001MCw3LjI1NjA1ODU2IEM1MS43NDc3ODg2LDcuODczODEzMTcgNTMsOS41NDA2NzE3NiA1MywxMS41IEM1MywxMy40NTkzMjgyIDUxLjc0Nzc4ODYsMTUuMTI2MTg2OCA1MCwxNS43NDM5NDE0IEw1MCw3LjI1NjA1ODU2IFonIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgb3BhY2l0eT0nMC40JyAvPjwvc3ZnPlwiXG5cdFx0YmF0dGVyeV92MTBfM3ggPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgNzMgNDInPjxwYXRoIGQ9J002MiwwSDVBNSw1LDAsMCwwLDAsNVYyNGE1LDUsMCwwLDAsNSw1SDYyYTUsNSwwLDAsMCw1LTVWNUE1LDUsMCwwLDAsNjIsMFptNCwyNGE0LDQsMCwwLDEtNCw0SDVhNCw0LDAsMCwxLTQtNFY1QTQsNCwwLDAsMSw1LDFINjJhNCw0LDAsMCwxLDQsNFonIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48cmVjdCB4PScyJyB5PScyJyB3aWR0aD0nI3tnZXRCYXR0ZXJ5TGV2ZWwoNjMpfScgaGVpZ2h0PScyNScgcng9JzMnIHJ5PSczJyBmaWxsPScje2JhdHRlcnlDb2xvcn0nIGlkPSdiYXR0ZXJ5RmlsbCcgLz48cGF0aCBkPSdNNjksMTAuMDZ2OS44OUE0LjgyLDQuODIsMCwwLDAsNzMsMTUsNC44Miw0LjgyLDAsMCwwLDY5LDEwLjA2WicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyAvPjwvc3ZnPlwiXG5cdFx0YmF0dGVyeV92MTFfM3ggPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzcz0nc3ZnRml0JyB2aWV3Qm94PScwIDAgNzggNDInPjxyZWN0IGZpbGw9JyN7YmF0dGVyeUNvbG9yfScgaWQ9J2JhdHRlcnlGaWxsJyB4PSc2JyB5PSc2JyB3aWR0aD0nI3tnZXRCYXR0ZXJ5TGV2ZWwoNTkpfScgaGVpZ2h0PScyMicgcng9JzMnIC8+PHJlY3Qgc3Ryb2tlPScje0BvcHRpb25zLmZvcmVncm91bmRDb2xvcn0nIGZpbGwtb3BhY2l0eT0nMCcgY2xhc3M9J3N0cm9rZWQnIHN0cm9rZS13aWR0aD0nMycgb3BhY2l0eT0nMC40JyB4PScxLjUnIHk9JzEuNScgd2lkdGg9JzY4JyBoZWlnaHQ9JzMxJyByeD0nNy41JyAvPjxwYXRoIGQ9J00gNzQgMTAuNjc0IEMgNzYuMzY1IDExLjc5NyA3OCAxNC4yMDggNzggMTcgQyA3OCAxOS43OTIgNzYuMzY1IDIyLjIwMyA3NCAyMy4zMjYgTCA3NCAxMC42NzQgWicgZmlsbD0nI3tAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3J9JyBvcGFjaXR5PScwLjQnLz48L3N2Zz5cIlxuXHRcdHBvd2VyU1ZHID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgY2xhc3M9J3N2Z0ZpdCcgdmlld0JveD0nMCAwIDYgMTcnPjxwb2x5Z29uIHBvaW50cz0nNiAzLjc1IDMuNDMgMy43NSA0LjUgMCAwLjUgNS4yNSAyLjk4IDUuMjUgMS41IDkuNSA2IDMuNzUnIGZpbGw9JyN7QG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yfScgLz48L3N2Zz5cIlxuXG5cdFx0c3ZnID1cblx0XHRcdGJhdHRlcnk6XG5cdFx0XHRcdHYxMDpcblx0XHRcdFx0XHRhdDJ4OiBiYXR0ZXJ5X3YxMF8yeFxuXHRcdFx0XHRcdGF0M3g6IGJhdHRlcnlfdjEwXzN4XG5cdFx0XHRcdHYxMTpcblx0XHRcdFx0XHRhdDJ4OiBiYXR0ZXJ5X3YxMV8yeFxuXHRcdFx0XHRcdGF0M3g6IGJhdHRlcnlfdjExXzN4XG5cdFx0XHRzaWduYWw6XG5cdFx0XHRcdHYxMDpcblx0XHRcdFx0XHRhdDJ4OiBzaWduYWxfdjEwXzJ4XG5cdFx0XHRcdFx0YXQzeDogc2lnbmFsX3YxMF8zeFxuXHRcdFx0XHR2MTE6XG5cdFx0XHRcdFx0YXQyeDogc2lnbmFsX3YxMV8yeFxuXHRcdFx0XHRcdGF0M3g6IHNpZ25hbF92MTFfM3hcblx0XHRcdHdpZmk6IHdpZmlTVkdcblx0XHRcdHBvd2VyOiBwb3dlclNWR1xuXG5cdFx0b25DYWxsQmxvY2sgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJvbkNhbGxCbG9ja1wiXG5cdFx0XHRoZWlnaHQ6IHN0YXR1c0JhckhlaWdodFxuXG5cdFx0QC5vbkNhbGxCbG9jayA9IG9uQ2FsbEJsb2NrXG5cblx0XHRvbkNhbGxNZXNzYWdlID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcIm9uQ2FsbE1lc3NhZ2VcIlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiBvbkNhbGxNYXJnaW5cblx0XHRcdHRleHQ6IFwiXCJcblx0XHRcdGZvbnRTaXplOiBvbkNhbGxGb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogZm9udFdlaWdodFxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBvbkNhbGxMZXR0ZXJTcGFjaW5nXG5cdFx0XHR3b3JkU3BhY2luZzogb25DYWxsV29yZFNwYWNpbmdcblxuXHRcdEAub25DYWxsTWVzc2FnZSA9IG9uQ2FsbE1lc3NhZ2VcblxuXHRcdGNhcnJpZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwiY2FycmllclwiXG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IHRvcE1hcmdpblxuXHRcdFx0dGV4dDogQG9wdGlvbnMuY2FycmllclxuXHRcdFx0Zm9udFNpemU6IGJhc2VGb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogZm9udFdlaWdodFxuXHRcdFx0bGV0dGVyU3BhY2luZzogbGV0dGVyU3BhY2luZ1xuXG5cdFx0QC5jYXJyaWVyID0gY2FycmllclxuXG5cdFx0c2lnbmFsID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwic2lnbmFsXCJcblx0XHRcdHdpZHRoOiBpZiBAb3B0aW9ucy52ZXJzaW9uID4gMTAgdGhlbiAxNi41IGVsc2UgMzRcblx0XHRcdGhlaWdodDogaWYgQG9wdGlvbnMudmVyc2lvbiA+IDEwIHRoZW4gMTAgZWxzZSA2XG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGh0bWw6IGdldFNpZ25hbFNWRygpXG5cblx0XHRALnNpZ25hbCA9IHNpZ25hbFxuXG5cdFx0d2lmaSA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcIndpZmlcIlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogMTNcblx0XHRcdGhlaWdodDogOVxuXHRcdFx0aHRtbDogd2lmaVNWR1xuXG5cdFx0QC53aWZpID0gd2lmaVxuXG5cdFx0Z2V0VGltZSA9ICgpID0+XG5cdFx0XHR0b2RheSA9IG5ldyBEYXRlXG5cdFx0XHRkYXkgPSB0b2RheS5nZXREYXkoKVxuXHRcdFx0aG91ciA9IHRvZGF5LmdldEhvdXJzKClcblx0XHRcdG1pbnV0ZSA9IHRvZGF5LmdldE1pbnV0ZXMoKVxuXHRcdFx0c2Vjb25kID0gdG9kYXkuZ2V0U2Vjb25kcygpXG5cdFx0XHRzdWZmaXggPSBpZiBob3VyID49IDEyIHRoZW4gJyBQTScgZWxzZSAnIEFNJ1xuXHRcdFx0aG91ciA9IGlmIGhvdXIgPiAxMiB0aGVuIGhvdXIgLSAxMiBlbHNlIGhvdXJcblx0XHRcdG1pbnV0ZSA9IGlmIG1pbnV0ZSA8IDEwIHRoZW4gXCIwXCIgKyBtaW51dGUgZWxzZSBtaW51dGVcblx0XHRcdGlmIEBvcHRpb25zLnRpbWUgPT0gXCJcIlxuXHRcdFx0XHRyZXR1cm4gaG91ciArICc6JyArIG1pbnV0ZSArIHN1ZmZpeFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gQG9wdGlvbnMudGltZVxuXG5cdFx0dGltZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJ0aW1lXCJcblx0XHRcdHdpZHRoOiBALndpZHRoXG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IHRvcE1hcmdpblxuXHRcdFx0dGV4dDogZ2V0VGltZSgpXG5cdFx0XHRmb250U2l6ZTogYmFzZUZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiB0aW1lRm9udFdlaWdodFxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiB0aW1lTGV0dGVyU3BhY2luZ1xuXG5cdFx0QC50aW1lID0gdGltZVxuXG5cdFx0cG93ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0bmFtZTogXCJwb3dlclwiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiA1LjVcblx0XHRcdGhlaWdodDogOS41XG5cdFx0XHRodG1sOiBwb3dlclNWR1xuXG5cdFx0QC5wb3dlciA9IHBvd2VyXG5cblx0XHRiYXR0ZXJ5ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwiYmF0dGVyeVwiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiBnZXRCYXR0ZXJ5V2lkdGgoKVxuXHRcdFx0aGVpZ2h0OiBpZiBAb3B0aW9ucy52ZXJzaW9uID4gMTAgdGhlbiAxMS41IGVsc2UgOVxuXHRcdFx0aHRtbDogZ2V0QmF0dGVyeVNWRygpXG5cblx0XHRALmJhdHRlcnkgPSBiYXR0ZXJ5XG5cblx0XHRwZXJjZW50YWdlID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcInBlcmNlbnRhZ2VcIlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiB0b3BNYXJnaW5cblx0XHRcdHRleHQ6IEBvcHRpb25zLnBlcmNlbnQgKyBcIiVcIlxuXHRcdFx0Zm9udFNpemU6IGJhc2VGb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogZm9udFdlaWdodFxuXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdGxldHRlclNwYWNpbmc6IGxldHRlclNwYWNpbmdcblxuXHRcdEAucGVyY2VudGFnZSA9IHBlcmNlbnRhZ2VcblxuXHRcdGZvciBsYXllciBpbiBALnN1YkxheWVyc1xuXHRcdFx0bGF5ZXIuYmFja2dyb3VuZENvbG9yID0gXCJjbGVhclwiXG5cblx0XHRAaGlkZSA9ICgpID0+XG5cdFx0XHRALmlzSGlkZGVuID0gdHJ1ZVxuXHRcdFx0QC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0eTogMCAtIHN0YXR1c0JhckhlaWdodFxuXHRcdFx0XHR0aW1lOlxuXHRcdFx0XHRcdDAuMjVcblxuXHRcdEBzaG93ID0gKCkgPT5cblx0XHRcdEAuaXNIaWRkZW4gPSBmYWxzZVxuXHRcdFx0QC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0eTogMFxuXHRcdFx0XHR0aW1lOlxuXHRcdFx0XHRcdDAuMjVcblxuXHRcdEBsYXlvdXQgPSAob3JpZW50YXRpb24gPSAwKSA9PlxuXHRcdFx0bGF5b3V0V2lkdGggPSBnZXRTY3JlZW5XaWR0aCgpXG5cdFx0XHRALndpZHRoID0gbGF5b3V0V2lkdGhcblx0XHRcdGlmIEBvcHRpb25zLmhpZGUgPT0gdHJ1ZVxuXHRcdFx0XHRAaGlkZSgpXG5cdFx0XHRlbHNlIGlmIEBvcHRpb25zLmF1dG9IaWRlID09IHRydWUgJiYgb3JpZW50YXRpb24gPiAwICYmIGlzaVBob25lKClcblx0XHRcdFx0QGhpZGUoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2hvdygpXG5cdFx0XHQjIExlZnQtc2lkZSBpdGVtc1xuXHRcdFx0aWYgQG9wdGlvbnMuY2FycmllciA9PSBcIlwiXG5cdFx0XHRcdGNhcnJpZXJNYXJnaW4gPSAwXG5cdFx0XHRpZiBAb3B0aW9ucy5zaWduYWwgPT0gdHJ1ZVxuXHRcdFx0XHRzaWduYWwudmlzaWJsZSA9IHRydWVcblx0XHRcdFx0c2lnbmFsLnggPSBzaWduYWxNYXJnaW5cblx0XHRcdFx0Y2Fycmllci54ID0gc2lnbmFsLnggKyBzaWduYWwud2lkdGggKyBjYXJyaWVyTWFyZ2luXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHNpZ25hbC52aXNpYmxlID0gZmFsc2Vcblx0XHRcdFx0Y2Fycmllci54ID0gaXBvZE1hcmdpblxuXHRcdFx0aWYgQG9wdGlvbnMud2lmaSA9PSB0cnVlXG5cdFx0XHRcdHdpZmkudmlzaWJsZSA9IHRydWVcblx0XHRcdGVsc2Vcblx0XHRcdFx0d2lmaS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdHdpZmkueCA9IGNhcnJpZXIueCArIGNhcnJpZXIud2lkdGggKyB3aWZpTWFyZ2luXG5cdFx0XHQjIENlbnRlciBjdXJyZW50IHRpbWUgYW5kIG9uLWNhbGxcblx0XHRcdHRpbWUud2lkdGggPSBsYXlvdXRXaWR0aFxuXHRcdFx0b25DYWxsQmxvY2sud2lkdGggPSBsYXlvdXRXaWR0aFxuXHRcdFx0b25DYWxsTWVzc2FnZS53aWR0aCA9IGxheW91dFdpZHRoXG5cdFx0XHQjIFJpZ2h0LXNpZGUgaXRlbXNcblx0XHRcdGlmIEBvcHRpb25zLnBvd2VyZWQgPT0gdHJ1ZVxuXHRcdFx0XHRwb3dlci54ID0gQWxpZ24ucmlnaHQoLXBvd2VyTWFyZ2luKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRwb3dlci54ID0gbGF5b3V0V2lkdGhcblx0XHRcdGJhdHRlcnkueCA9IHBvd2VyLnggLSBiYXR0ZXJ5LndpZHRoIC0gZ2V0QmF0dGVyeU1hcmdpbigpXG5cdFx0XHRpZiBAb3B0aW9ucy5zaG93UGVyY2VudGFnZSA9PSBmYWxzZVxuXHRcdFx0XHRwZXJjZW50YWdlTWFyZ2luID0gMFxuXHRcdFx0XHRwZXJjZW50YWdlLnRleHQgPSBcIlwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHBlcmNlbnRhZ2UudGV4dCA9IEBvcHRpb25zLnBlcmNlbnQgKyBcIiVcIlxuXHRcdFx0cGVyY2VudGFnZS5tYXhYID0gYmF0dGVyeS54IC0gcGVyY2VudGFnZU1hcmdpblxuXG5cdFx0Z2V0VGltZSgpXG5cdFx0QGxheW91dCgpXG5cblx0XHQjIGVuZCBsYXlvdXQoKVxuXG5cdFx0c2VsZWN0Rm9yZWdyb3VuZENvbG9yID0gKCkgPT5cblx0XHRcdGlmIEBvcHRpb25zLmZvcmVncm91bmRDb2xvciA9PSBcIlwiXG5cdFx0XHRcdGlmIEBvcHRpb25zLnN0eWxlID09IFwiZGFya1wiXG5cdFx0XHRcdFx0cmV0dXJuIFwid2hpdGVcIlxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIFwiYmxhY2tcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gQG9wdGlvbnMuZm9yZWdyb3VuZENvbG9yXG5cblx0XHRmb3JlZ3JvdW5kSXRlbXMgPSBbcGVyY2VudGFnZSwgcG93ZXIsIHRpbWUsIHdpZmksIHNpZ25hbCwgY2FycmllciwgYmF0dGVyeV1cblxuXHRcdGNvbG9yRm9yZWdyb3VuZCA9IChjb2xvciA9IFwiXCIpID0+XG5cdFx0XHRpZiBjb2xvciA9PSBcIlwiIHRoZW4gY29sb3IgPSBzZWxlY3RGb3JlZ3JvdW5kQ29sb3IoKVxuXHRcdFx0Zm9yIGxheWVyIGluIGZvcmVncm91bmRJdGVtc1xuXHRcdFx0XHRsYXllci5jb2xvciA9IGNvbG9yXG5cdFx0XHRcdGxheWVyU1ZHID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbCgncGF0aCwgY2lyY2xlLCByZWN0LCBwb2x5Z29uJylcblx0XHRcdFx0c3Ryb2tlZFNWRyA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdHJva2VkJylcblx0XHRcdFx0Zm9yIFNWRyBpbiBsYXllclNWR1xuXHRcdFx0XHRcdFNWRy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBjb2xvcilcblx0XHRcdFx0Zm9yIFNWRyBpbiBzdHJva2VkU1ZHXG5cdFx0XHRcdFx0U1ZHLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgY29sb3IpXG5cdFx0XHRcdFx0U1ZHLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgJzAnKVxuXG5cdFx0Y29sb3JCYXR0ZXJ5ID0gKCkgPT5cblx0XHRcdGJhdHRlcnlGaWxsU1ZHID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbCgnI2JhdHRlcnlGaWxsJylcblx0XHRcdGlmIEBvcHRpb25zLm9uQ2FsbCA9PSB0cnVlXG5cdFx0XHRcdGZvciBTVkcgaW4gYmF0dGVyeUZpbGxTVkdcblx0XHRcdFx0XHRTVkcuc3R5bGUuV2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMC4yNXMnO1xuXHRcdFx0XHRcdFNWRy5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBcIndoaXRlXCIpXG5cdFx0XHRlbHNlIGlmIEBvcHRpb25zLnBvd2VyZWQgPT0gdHJ1ZVxuXHRcdFx0XHRmb3IgU1ZHIGluIGJhdHRlcnlGaWxsU1ZHXG5cdFx0XHRcdFx0U1ZHLnN0eWxlLldlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDAuMjVzJztcblx0XHRcdFx0XHRTVkcuc2V0QXR0cmlidXRlKCdmaWxsJywgYmF0dGVyeUdyZWVuKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRmb3IgU1ZHIGluIGJhdHRlcnlGaWxsU1ZHXG5cdFx0XHRcdFx0U1ZHLnN0eWxlLldlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDAuMjVzJztcblx0XHRcdFx0XHRTVkcuc2V0QXR0cmlidXRlKCdmaWxsJywgc2VsZWN0Rm9yZWdyb3VuZENvbG9yKCkpXG5cblx0XHRzdHlsZUJhciA9IChzdHlsZSwgYmFja2dyb3VuZENvbG9yID0gXCJcIikgPT5cblx0XHRcdGlmIGJhY2tncm91bmRDb2xvciA9PSBcIlwiXG5cdFx0XHRcdEAuc3R5bGUgPVxuXHRcdFx0XHRcdFwiLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXJcIjogXCJibHVyKDYwcHgpXCJcblx0XHRcdFx0aWYgc3R5bGUgPT0gXCJkYXJrXCJcblx0XHRcdFx0XHRALmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjUpXCJcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSlcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRALmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvclxuXHRcdFx0aWYgQG9wdGlvbnMudmlicmFudCA9PSB0cnVlXG5cdFx0XHRcdGJhckNvbG9yID0gbmV3IENvbG9yKGJhY2tncm91bmRDb2xvcikuYWxwaGEoLjUpXG5cdFx0XHRcdEAuYmFja2dyb3VuZENvbG9yID0gYmFyQ29sb3Jcblx0XHRcdFx0QC5zdHlsZSA9XG5cdFx0XHRcdFx0XCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiOiBcImJsdXIoNjBweClcIlxuXG5cblx0XHRAYXBwbHlTdHlsZSA9IChzdHlsZSA9IEBvcHRpb25zLnN0eWxlLCBmb3JlZ3JvdW5kQ29sb3IgPSBAb3B0aW9ucy5mb3JlZ3JvdW5kQ29sb3IsIGJhY2tncm91bmRDb2xvciA9IEBvcHRpb25zLmJhY2tncm91bmRDb2xvcikgPT5cblx0XHRcdGlmIHN0eWxlID09IFwibGlnaHRcIiAmJiBmb3JlZ3JvdW5kQ29sb3IgPT0gXCJcIlxuXHRcdFx0XHRmb3JlZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCJcblx0XHRcdGlmIHN0eWxlID09IFwiZGFya1wiICYmIGZvcmVncm91bmRDb2xvciA9PSBcIlwiXG5cdFx0XHRcdGZvcmVncm91bmRDb2xvciA9IFwid2hpdGVcIlxuXHRcdFx0c3R5bGVCYXIoc3R5bGUsIGJhY2tncm91bmRDb2xvcilcblx0XHRcdGNvbG9yRm9yZWdyb3VuZCgpXG5cdFx0XHRjb2xvckJhdHRlcnkoKVxuXG5cdFx0QGFwcGx5U3R5bGUoKVxuXG5cdFx0QHN0YXJ0Q2FsbCA9IChtZXNzYWdlID0gXCJUb3VjaCB0byByZXR1cm4gdG8gY2FsbCAwOjMwXCIsIGNvbG9yID0gb25DYWxsQ29sb3IpID0+XG5cdFx0XHRAb3B0aW9ucy5vbkNhbGwgPSB0cnVlXG5cdFx0XHRjb2xvckZvcmVncm91bmQoXCJ3aGl0ZVwiKVxuXHRcdFx0Y29sb3JCYXR0ZXJ5KClcblx0XHRcdG9uQ2FsbEJsb2NrLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG5cdFx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRcdGhlaWdodDogc3RhdHVzQmFySGVpZ2h0ICogMlxuXHRcdFx0XHR0aW1lOlxuXHRcdFx0XHRcdDAuMjVcblx0XHRcdG9uQ2FsbEJsb2NrLm9uQW5pbWF0aW9uRW5kID0+XG5cdFx0XHRcdGlmIEBvcHRpb25zLm9uQ2FsbCA9PSB0cnVlXG5cdFx0XHRcdFx0b25DYWxsTWVzc2FnZS50ZXh0ID0gbWVzc2FnZVxuXG5cdFx0QGVuZENhbGwgPSAoKSA9PlxuXHRcdFx0QG9wdGlvbnMub25DYWxsID0gZmFsc2Vcblx0XHRcdG9uQ2FsbE1lc3NhZ2UudGV4dCA9IFwiXCJcblx0XHRcdG9uQ2FsbEJsb2NrLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0aGVpZ2h0OiBzdGF0dXNCYXJIZWlnaHRcblx0XHRcdFx0dGltZTpcblx0XHRcdFx0XHQwLjI1XG5cdFx0XHRAYXBwbHlTdHlsZSgpXG5cblx0XHQjIENoZWNrIHdoZXRoZXIgdGhlIGRldmljZSBpcyBtb2JpbGUgb3Igbm90ICh2ZXJzdXMgRnJhbWVyKVxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKClcblx0XHRcdCMgU2V0IHR5cGVcblx0XHRcdGRldmljZSA9IFwibW9iaWxlXCJcblx0XHRcdCMgQWRkIGV2ZW50IGxpc3RlbmVyIG9uIG9yaWVudGF0aW9uIGNoYW5nZVxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJvcmllbnRhdGlvbmNoYW5nZVwiLCA9PlxuXHRcdFx0XHQjIFNlbmQgZXZlbnQgaGFuZGxpbmcgdG8gZnVuY3Rpb24gYWxvbmcgd2l0aCBkZXZpY2UgdHlwZVxuXHRcdFx0XHRAbGF5b3V0KHdpbmRvdy5vcmllbnRhdGlvbilcblx0XHRlbHNlXG5cdFx0XHQjIExpc3RlbiBmb3Igb3JpZW50YXRpb24gY2hhbmdlcyBvbiB0aGUgZGV2aWNlIHZpZXdcblx0XHRcdEZyYW1lci5EZXZpY2Uub24gXCJjaGFuZ2U6b3JpZW50YXRpb25cIiwgPT5cblx0XHRcdFx0IyBTZXQgdHlwZVxuXHRcdFx0XHRkZXZpY2UgPSBcIkZyYW1lclwiXG5cdFx0XHRcdCMgU2VuZCBldmVudCBoYW5kbGluZyB0byBmdW5jdGlvbiB3aXRoIGRldmljZSB0eXBlXG5cdFx0XHRcdEBsYXlvdXQoTWF0aC5hYnMoRnJhbWVyLkRldmljZS5vcmllbnRhdGlvbikpXG5cblx0QGRlZmluZSAnaGlkZGVuJywgZ2V0OiAoKSAtPiBALmlzSGlkZGVuXG5cdEBkZWZpbmUgJ29uQ2FsbCcsIGdldDogKCkgLT4gQG9wdGlvbnMub25DYWxsXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdHVzQmFyTGF5ZXJcbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCJleHBvcnRzLmtleWJvYXJkTGF5ZXIgPSBuZXcgTGF5ZXJcblx0eDowLCB5OlNjcmVlbi5oZWlnaHQsIHdpZHRoOlNjcmVlbi53aWR0aCwgaGVpZ2h0OjQzMlxuXHRodG1sOlwiPGltZyBzdHlsZT0nd2lkdGg6IDEwMCU7JyBzcmM9J21vZHVsZXMva2V5Ym9hcmQucG5nJy8+XCJcblxuI3NjcmVlbiB3aWR0aCB2cy4gc2l6ZSBvZiBpbWFnZSB3aWR0aFxuZ3Jvd3RoUmF0aW8gPSBTY3JlZW4ud2lkdGggLyA3MzJcbmltYWdlSGVpZ2h0ID0gZ3Jvd3RoUmF0aW8gKiA0MzJcblxuIyBFeHRlbmRzIHRoZSBMYXllclN0eWxlIGNsYXNzIHdoaWNoIGRvZXMgdGhlIHBpeGVsIHJhdGlvIGNhbGN1bGF0aW9ucyBpbiBmcmFtZXJcbl9pbnB1dFN0eWxlID1cblx0T2JqZWN0LmFzc2lnbih7fSwgRnJhbWVyLkxheWVyU3R5bGUsXG5cdFx0Y2FsY3VsYXRlUGl4ZWxSYXRpbyA9IChsYXllciwgdmFsdWUpIC0+XG5cdFx0XHQodmFsdWUgKiBsYXllci5jb250ZXh0LnBpeGVsTXVsdGlwbGllcikgKyBcInB4XCJcblxuXHRcdGZvbnRTaXplOiAobGF5ZXIpIC0+XG5cdFx0XHRjYWxjdWxhdGVQaXhlbFJhdGlvKGxheWVyLCBsYXllci5fcHJvcGVydGllcy5mb250U2l6ZSlcblxuXHRcdGxpbmVIZWlnaHQ6IChsYXllcikgLT5cblx0XHRcdChsYXllci5fcHJvcGVydGllcy5saW5lSGVpZ2h0KSArIFwiZW1cIlxuXG5cdFx0cGFkZGluZzogKGxheWVyKSAtPlxuXHRcdFx0eyBwaXhlbE11bHRpcGxpZXIgfSA9IGxheWVyLmNvbnRleHRcblx0XHRcdHBhZGRpbmcgPSBbXVxuXHRcdFx0cGFkZGluZ1ZhbHVlID0gbGF5ZXIuX3Byb3BlcnRpZXMucGFkZGluZ1xuXG5cdFx0XHQjIENoZWNrIGlmIHdlIGhhdmUgYSBzaW5nbGUgbnVtYmVyIGFzIGludGVnZXJcblx0XHRcdGlmIE51bWJlci5pc0ludGVnZXIocGFkZGluZ1ZhbHVlKVxuXHRcdFx0XHRyZXR1cm4gY2FsY3VsYXRlUGl4ZWxSYXRpbyhsYXllciwgcGFkZGluZ1ZhbHVlKVxuXG5cdFx0XHQjIElmIHdlIGhhdmUgbXVsdGlwbGUgdmFsdWVzIHRoZXkgY29tZSBhcyBzdHJpbmcgKGUuZy4gXCIxIDIgMyA0XCIpXG5cdFx0XHRwYWRkaW5nVmFsdWVzID0gbGF5ZXIuX3Byb3BlcnRpZXMucGFkZGluZy5zcGxpdChcIiBcIilcblxuXHRcdFx0c3dpdGNoIHBhZGRpbmdWYWx1ZXMubGVuZ3RoXG5cdFx0XHRcdHdoZW4gNFxuXHRcdFx0XHRcdHBhZGRpbmcudG9wID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcucmlnaHQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cdFx0XHRcdFx0cGFkZGluZy5ib3R0b20gPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMl0pXG5cdFx0XHRcdFx0cGFkZGluZy5sZWZ0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzNdKVxuXG5cdFx0XHRcdHdoZW4gM1xuXHRcdFx0XHRcdHBhZGRpbmcudG9wID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcucmlnaHQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cdFx0XHRcdFx0cGFkZGluZy5ib3R0b20gPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMl0pXG5cdFx0XHRcdFx0cGFkZGluZy5sZWZ0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXG5cdFx0XHRcdHdoZW4gMlxuXHRcdFx0XHRcdHBhZGRpbmcudG9wID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcucmlnaHQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cdFx0XHRcdFx0cGFkZGluZy5ib3R0b20gPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5sZWZ0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblxuXHRcdFx0IyBSZXR1cm4gYXMgNC12YWx1ZSBzdHJpbmcgKGUuZyBcIjFweCAycHggM3B4IDRweFwiKVxuXHRcdFx0XCIje3BhZGRpbmcudG9wICogcGl4ZWxNdWx0aXBsaWVyfXB4ICN7cGFkZGluZy5yaWdodCAqIHBpeGVsTXVsdGlwbGllcn1weCAje3BhZGRpbmcuYm90dG9tICogcGl4ZWxNdWx0aXBsaWVyfXB4ICN7cGFkZGluZy5sZWZ0ICogcGl4ZWxNdWx0aXBsaWVyfXB4XCJcblx0KVxuXG5leHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVzID1cblx0c2hvd246XG5cdFx0eTogU2NyZWVuLmhlaWdodCAtIGltYWdlSGVpZ2h0XG5cbmV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdGN1cnZlOiBcInNwcmluZyg1MDAsNTAsMTUpXCJcblxuY2xhc3MgZXhwb3J0cy5JbnB1dCBleHRlbmRzIExheWVyXG5cdEBkZWZpbmUgXCJzdHlsZVwiLFxuXHRcdGdldDogLT4gQGlucHV0LnN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRfLmV4dGVuZCBAaW5wdXQuc3R5bGUsIHZhbHVlXG5cblx0QGRlZmluZSBcInZhbHVlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQudmFsdWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBpbnB1dC52YWx1ZSA9IHZhbHVlXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucy5zZXR1cCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMud2lkdGggPz0gU2NyZWVuLndpZHRoXG5cdFx0b3B0aW9ucy5jbGlwID89IGZhbHNlXG5cdFx0b3B0aW9ucy5oZWlnaHQgPz0gNjBcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBpZiBvcHRpb25zLnNldHVwIHRoZW4gXCJyZ2JhKDI1NSwgNjAsIDQ3LCAuNSlcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMuZm9udFNpemUgPz0gMzBcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMVxuXHRcdG9wdGlvbnMucGFkZGluZyA/PSAxMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlwiXG5cdFx0b3B0aW9ucy5wbGFjZWhvbGRlciA/PSBcIlwiXG5cdFx0b3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgPz0gaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIGZhbHNlIGVsc2UgdHJ1ZVxuXHRcdG9wdGlvbnMudHlwZSA/PSBcInRleHRcIlxuXHRcdG9wdGlvbnMuZ29CdXR0b24gPz0gZmFsc2Vcblx0XHRvcHRpb25zLmF1dG9Db3JyZWN0ID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b0NvbXBsZXRlID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b0NhcGl0YWxpemUgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5zcGVsbENoZWNrID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b2ZvY3VzID89IGZhbHNlXG5cdFx0b3B0aW9ucy50ZXh0Q29sb3IgPz0gXCIjMDAwXCJcblx0XHRvcHRpb25zLmZvbnRGYW1pbHkgPz0gXCItYXBwbGUtc3lzdGVtXCJcblx0XHRvcHRpb25zLmZvbnRXZWlnaHQgPz0gXCI1MDBcIlxuXHRcdG9wdGlvbnMuc3VibWl0ID89IGZhbHNlXG5cdFx0b3B0aW9ucy50YWJJbmRleCA/PSAwXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjIEFkZCBhZGRpdGlvbmFsIHByb3BlcnRpZXNcblx0XHRAX3Byb3BlcnRpZXMuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplXG5cdFx0QF9wcm9wZXJ0aWVzLmxpbmVIZWlnaHQgPSBvcHRpb25zLmxpbmVIZWlnaHRcblx0XHRAX3Byb3BlcnRpZXMucGFkZGluZyA9IG9wdGlvbnMucGFkZGluZ1xuXG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yP1xuXHRcdEBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJpbnB1dFwiXG5cdFx0QGlucHV0LmlkID0gXCJpbnB1dC0je18ubm93KCl9XCJcblxuXHRcdCMgQWRkIHN0eWxpbmcgdG8gdGhlIGlucHV0IGVsZW1lbnRcblx0XHRAaW5wdXQuc3R5bGUud2lkdGggPSBfaW5wdXRTdHlsZVtcIndpZHRoXCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmhlaWdodCA9IF9pbnB1dFN0eWxlW1wiaGVpZ2h0XCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmZvbnRTaXplID0gX2lucHV0U3R5bGVbXCJmb250U2l6ZVwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5saW5lSGVpZ2h0ID0gX2lucHV0U3R5bGVbXCJsaW5lSGVpZ2h0XCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIlxuXHRcdEBpbnB1dC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIlxuXHRcdEBpbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuXHRcdEBpbnB1dC5zdHlsZS5wYWRkaW5nID0gX2lucHV0U3R5bGVbXCJwYWRkaW5nXCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmZvbnRGYW1pbHkgPSBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRAaW5wdXQuc3R5bGUuY29sb3IgPSBvcHRpb25zLnRleHRDb2xvclxuXHRcdEBpbnB1dC5zdHlsZS5mb250V2VpZ2h0ID0gb3B0aW9ucy5mb250V2VpZ2h0XG5cblx0XHRAaW5wdXQudmFsdWUgPSBvcHRpb25zLnRleHRcblx0XHRAaW5wdXQudHlwZSA9IG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXJcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwidGFiaW5kZXhcIiwgb3B0aW9ucy50YWJpbmRleFxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29ycmVjdFwiLCBvcHRpb25zLmF1dG9Db3JyZWN0XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jb21wbGV0ZVwiLCBvcHRpb25zLmF1dG9Db21wbGV0ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY2FwaXRhbGl6ZVwiLCBvcHRpb25zLmF1dG9DYXBpdGFsaXplXG5cdFx0aWYgb3B0aW9ucy5hdXRvZm9jdXMgPT0gdHJ1ZVxuXHRcdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9mb2N1c1wiLCB0cnVlXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcInNwZWxsY2hlY2tcIiwgb3B0aW9ucy5zcGVsbENoZWNrXG5cdFx0QGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZm9ybVwiXG5cblx0XHRpZiAob3B0aW9ucy5nb0J1dHRvbiAmJiAhb3B0aW9ucy5zdWJtaXQpIHx8ICFvcHRpb25zLnN1Ym1pdFxuXHRcdFx0QGZvcm0uYWN0aW9uID0gXCIjXCJcblx0XHRcdEBmb3JtLmFkZEV2ZW50TGlzdGVuZXIgXCJzdWJtaXRcIiwgKGV2ZW50KSAtPlxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRAZm9ybS5hcHBlbmRDaGlsZCBAaW5wdXRcblx0XHRAX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQGZvcm1cblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblx0XHRAdXBkYXRlUGxhY2Vob2xkZXJDb2xvciBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgQHBsYWNlaG9sZGVyQ29sb3JcblxuXHRcdCNvbmx5IHNob3cgaG9ub3IgdmlydHVhbCBrZXlib2FyZCBvcHRpb24gd2hlbiBub3Qgb24gbW9iaWxlLFxuXHRcdCNvdGhlcndpc2UgaWdub3JlXG5cdFx0aWYgIVV0aWxzLmlzTW9iaWxlKCkgJiYgb3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgaXMgdHJ1ZVxuXHRcdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYnJpbmdUb0Zyb250KClcblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlQ3ljbGUoKVxuXHRcdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXG5cdHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3I6IChjb2xvcikgLT5cblx0XHRAcGxhY2Vob2xkZXJDb2xvciA9IGNvbG9yXG5cdFx0aWYgQHBhZ2VTdHlsZT9cblx0XHRcdGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQgQHBhZ2VTdHlsZVxuXHRcdEBwYWdlU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwic3R5bGVcIlxuXHRcdEBwYWdlU3R5bGUudHlwZSA9IFwidGV4dC9jc3NcIlxuXHRcdGNzcyA9IFwiIyN7QGlucHV0LmlkfTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BwbGFjZWhvbGRlckNvbG9yfTsgfVwiXG5cdFx0QHBhZ2VTdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSBjc3MpXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCBAcGFnZVN0eWxlXG5cblx0Zm9jdXM6ICgpIC0+XG5cdFx0QGlucHV0LmZvY3VzKClcblxuXHRvbkZvY3VzOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCAtPlxuXHRcdFx0Y2IuYXBwbHkoQClcblxuXHRvbkJsdXI6IChjYikgLT5cblx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG4iLCJjbGFzcyBleHBvcnRzLkNhbWVyYUlucHV0IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGlnbm9yZUV2ZW50czogZmFsc2Vcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNoYW5nZUhhbmRsZXIgPSAoZXZlbnQpIC0+XG5cdFx0XHRpZihAb3B0aW9ucy5jYWxsYmFjaylcblx0XHRcdFx0ZmlsZSA9IEBfZWxlbWVudC5maWxlc1swXVxuXHRcdFx0XHR1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpXG5cdFx0XHRcdEBvcHRpb25zLmNhbGxiYWNrKHVybCwgZmlsZS50eXBlKVxuXG5cdFx0QGNoYW5nZUhhbmRsZXIgPSBAY2hhbmdlSGFuZGxlci5iaW5kIEBcblx0XHRFdmVudHMud3JhcChAX2VsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgQGNoYW5nZUhhbmRsZXJcblxuXHRfY3JlYXRlRWxlbWVudDogLT5cblx0XHRyZXR1cm4gaWYgQF9lbGVtZW50P1xuXHRcdEBfZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJpbnB1dFwiXG5cdFx0QF9lbGVtZW50LnR5cGUgPSBcImZpbGVcIlxuXHRcdEBfZWxlbWVudC5jYXB0dXJlID0gdHJ1ZVxuXHRcdEBfZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZnJhbWVyTGF5ZXJcIilcblx0XHRAX2VsZW1lbnQuc3R5bGVbXCItd2Via2l0LWFwcGVhcmFuY2VcIl0gPSBcIm5vbmVcIlxuXHRcdEBfZWxlbWVudC5zdHlsZVtcIi13ZWJraXQtdGV4dC1zaXplLWFkanVzdFwiXSA9IFwibm9uZVwiXG5cdFx0QF9lbGVtZW50LnN0eWxlW1wib3V0bGluZVwiXSA9IFwibm9uZVwiXG5cdFx0c3dpdGNoIEBvcHRpb25zLmFjY2VwdFxuXHRcdFx0d2hlbiBcImltYWdlXCIgdGhlbiBAX2VsZW1lbnQuYWNjZXB0ID0gXCJpbWFnZS8qXCJcblx0XHRcdHdoZW4gXCJ2aWRlb1wiIHRoZW4gQF9lbGVtZW50LmFjY2VwdCA9IFwidmlkZW8vKlwiXG5cdFx0XHRlbHNlIEBfZWxlbWVudC5hY2NlcHQgPSBcImltYWdlLyosdmlkZW8vKlwiXG5cblx0QGRlZmluZSBcImFjY2VwdFwiLFxuXHRcdGdldDogLT5cblx0XHRcdEBfZWxlbWVudC5hY2NlcHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdHN3aXRjaCB2YWx1ZVxuXHRcdFx0XHR3aGVuIFwiaW1hZ2VcIiB0aGVuIEBfZWxlbWVudC5hY2NlcHQgPSBcImltYWdlLypcIlxuXHRcdFx0XHR3aGVuIFwidmlkZW9cIiB0aGVuIEBfZWxlbWVudC5hY2NlcHQgPSBcInZpZGVvLypcIlxuXHRcdFx0XHRlbHNlIEBfZWxlbWVudC5hY2NlcHQgPSBcImltYWdlLyosdmlkZW8vKlwiIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJt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
