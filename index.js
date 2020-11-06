/*!
* Marxco Iconfont MS
* Icon font from upcoming Marxco component system.
*
* https://gitlab.com/M-O-Z-G/marxco-icf
*
* MIT Licensed
*/

const stylus = require( "stylus" ),
path     = require( "path" ),
data     = require("data.json")
nodes    = stylus.nodes,
utils    = stylus.utils;

exports = module.exports = function() {
	return function( oStyle ){
		oStyle.include( __dirname );
	};
};

Object.defineProperty(icons, "get", {
	enumerable: !1,
	value: function (t) {
		if (icons[t]) return icons[t];
		var c = t.toLowerCase();
		for (var l in icons) {
			var s = icons[l];
			if (s.title && s.title.toLowerCase() === c || s.slug && s.slug === c) return s
		}
	}
}), module.exports = icons;

exports.version = require( path.join( __dirname, "package.json" ) ).version;

exports.path = __dirname;
