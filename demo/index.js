/*global document*/
import "../data-provider.js";
import syntaxHighlight from "./syntaxHighlight";
import dataFetch from "./dataFetch";

const dp = document.querySelector("#dataProvider");
const pre = document.querySelector("pre");

document.addEventListener("click", (e) => {
	const isButton = e.target.nodeName === "BUTTON";
	const id = e.target.id;
	if (!isButton) return;

	if (dataFetch[id]) {
		pre.innerHTML = "Loading...";
		dp.resetData();
		dp.request(dataFetch[id])
			.then((data) => (pre.innerHTML = syntaxHighlight(data)))
			.catch((error) => (pre.innerHTML = syntaxHighlight(error)));
		return;
	}
	pre.innerHTML = "Error...";
});
