const dataFetch = {
	getPost1: {
		host: "https://jsonplaceholder.typicode.com/",
		path: "/posts/1",
		method: "GET",
	},
	getPost: {
		host: "https://jsonplaceholder.typicode.com/",
		path: "/posts",
		method: "GET",
	},
	createPost: {
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
	},
	putPost1: {
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
	},
	patchPost1: {
		host: "https://jsonplaceholder.typicode.com/",
		path: "/posts/1",
		method: "PATCH",
		body: {
			title: "My custom title",
		},
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	},
	deletePost1: {
		host: "https://jsonplaceholder.typicode.com/",
		path: "/posts/1",
		method: "DELETE",
	},
	findUserID: {
		host: "https://jsonplaceholder.typicode.com/",
		path: "/posts",
		params: {
			userId: 10,
		},
	},
};

export default dataFetch;
