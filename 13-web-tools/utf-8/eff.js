(function(window, document) {

	var textareas = document.getElementsByTagName('textarea');
	var decoded = textareas[0];
	var encoded = textareas[1];
	var permalink = document.getElementById('permalink');
	// https://web-dev-resource-hub.netlify.app/notes/localstorage-pattern
	var storage = (function() {
		var uid = new Date;
		var storage;
		var result;
		try {
			(storage = window.localStorage).setItem(uid, uid);
			result = storage.getItem(uid) == uid;
			storage.removeItem(uid);
			return result && storage;
		} catch (exception) {}
	}());
	var stringFromCharCode = String.fromCharCode;

	function encode(string) {
		// URL-encode some more characters to avoid issues when using permalink URLs in Markdown
		return encodeURIComponent(string).replace(/['()_*]/g, function(character) {
			return '%' + character.charCodeAt().toString(16);
		});
	}

	function hexEscape(string) {
		var length = string.length;
		var index = -1;
		var result = '';
		var hex;
		while (++index < length) {
			hex = string.charCodeAt(index).toString(16).toUpperCase();
			result += '\\x' + ('00' + hex).slice(-2);
		}
		return result;
	}

	function update() {
		var shouldDecode = this == encoded;
		var value;
		if (shouldDecode) {
			try {
				value = utf8.decode(eval('\'' + encoded.value + '\''));
				decoded.value = value;
				decoded.className = encoded.className = '';
			} catch (exception) {
				decoded.value = 'ERROR: invalid input';
				decoded.className = encoded.className = 'invalid';
			}
		} else {
			value = utf8.encode(decoded.value);
			encoded.value = hexEscape(value);
			decoded.className = encoded.className = '';
		}
		value = decoded.value;
		permalink.hash = encode(value);
		storage && (storage.utf8 = value);
	};

	// https://web-dev-resource-hub.netlify.app/notes/oninput
	decoded.onkeyup = encoded.onkeyup = update;
	decoded.oninput = encoded.oninput = function() {
		decoded.onkeyup = encoded.onkeyup = null;
		update.call(this);
	};

	if (storage) {
		storage.utf8 && (decoded.value = storage.utf8);
		update();
	}

	window.onhashchange = function() {
		decoded.value = decodeURIComponent(location.hash.slice(1));
		update();
	};

	if (location.hash) {
		window.onhashchange();
	}

}(this, document));
//-------------------------------
