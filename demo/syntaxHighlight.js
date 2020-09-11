/* Ref: https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript*/
const syntaxHighlight = (json) => {
	json = JSON.stringify(json, undefined, 2);
	json = json
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	return json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
		function (match) {
			var cls = "number";
			if (/^"/.test(match)) {
				cls = "string";
				if (/:$/.test(match)) {
					cls = "key";
				}
			} else if (/true|false/.test(match)) {
				cls = "boolean";
			} else if (/null/.test(match)) {
				cls = "null";
			}
			return `<span class="${cls}">${match}</span>`;
		}
	);
};

export default syntaxHighlight;
