/*global document*/
/*eslint no-undef: "error"*/
import "../data-provider.js";
import syntaxHighlight from "./syntaxHighlight";

const dp = document.querySelector("#dataProvider");
const pre = document.querySelector("pre");

document.addEventListener("click", (e) => {
	const isButton = e.target.nodeName === "BUTTON";
	const id = e.target.id;
	let data = null;
	if (!isButton) return;

	dp.resetData();

	switch (id) {
		case "getPost1":
			data = {
				host: "https://jsonplaceholder.typicode.com/",
				path: "/posts/1",
				method: "GET",
			};
			break;
		case "getPost":
			data = {
				host: "https://jsonplaceholder.typicode.com/",
				path: "/posts",
				method: "GET",
			};
			break;
		case "createPost":
			data = {
				host: "https://jsonplaceholder.typicode.com/",
				path: "/posts",
				method: "POST",
				body: {
					title: "My custom title",
					body: "Mauricio García",
					userId: 1,
				},
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			};
			break;
		case "putPost1":
			data = {
				host: "https://jsonplaceholder.typicode.com/",
				path: "/posts/1",
				method: "PUT",
				body: {
					id: 1,
					title: "My custom title",
					body: "Mauricio García",
					userId: 1,
				},
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			};
			break;
		case "patchPost1":
			data = {
				host: "https://jsonplaceholder.typicode.com/",
				path: "/posts/1",
				method: "PATCH",
				body: {
					title: "My custom title",
				},
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			};
			break;
		case "deletePost1":
			data = {
				host: "https://jsonplaceholder.typicode.com/",
				path: "/posts/1",
				method: "DELETE",
			};
			break;
		case "findUserID":
			data = {
				host: "https://jsonplaceholder.typicode.com/",
				path: "/posts",
				params: {
					userId: 10,
				},
			};
			break;

		default:
			pre.innerHTML = "Error...";
			return;
	}
	if (data) {
		pre.innerHTML = "Loading...";
		dp.request(data)
			.then((data) => (pre.innerHTML = syntaxHighlight(data)))
			.catch((error) => (pre.innerHTML = syntaxHighlight(error)));
	}
});
