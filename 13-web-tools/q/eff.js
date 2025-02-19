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

	function encode(string) {
		// URL-encode some more characters to avoid issues when using permalink URLs in Markdown
		return encodeURIComponent(string).replace(/['()_*]/g, function(character) {
			return '%' + character.charCodeAt().toString(16);
		});
	}

	function update() {
		var shouldDecode = this == encoded;
		var value;
		if (shouldDecode) {
			value = utf8.decode(q.decode(encoded.value));
			decoded.value = value;
		} else {
			value = q.encode(utf8.encode(decoded.value));
			encoded.value = value;
		}
		value = decoded.value;
		permalink.hash = encode(value);
		storage && (storage.q = value);
	};

	// https://web-dev-resource-hub.netlify.app/notes/oninput
	decoded.onkeyup = encoded.onkeyup = update;
	decoded.oninput = encoded.oninput = function() {
		decoded.onkeyup = encoded.onkeyup = null;
		update.call(this);
	};

	if (storage) {
		storage.q && (decoded.value = storage.q);
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
