/* global describe, it*/
import { html, fixture, expect, elementUpdated } from "@open-wc/testing";
import fetchMock from "fetch-mock/esm/client";

import "../data-provider.js";

describe("has properties and attributes and functions", () => {
	it("has a type properties", async () => {
		const el = await fixture(html` <data-provider></data-provider> `);

		expect(el.host).to.be.a("string");
		expect(el.path).to.be.an("string");
		expect(el.method).to.be.a("string");
		expect(el.params).to.be.a("object");
		expect(el.headers).to.be.a("array");
		expect(el.body).to.be.a("undefined");

		expect(el.request).to.be.a("function");
		expect(el.resetData).to.be.a("function");
		expect(el._initData).to.be.a("function");
		expect(el._createMyInit).to.be.a("function");
		expect(el._createUrl).to.be.a("function");
		expect(el._addParamsUrl).to.be.a("function");
		expect(el._handleStatus).to.be.a("function");
	});

	it("has a default value properties", async () => {
		const el = await fixture(html` <data-provider></data-provider> `);

		expect(el.host).to.equal("");
		expect(el.path).to.equal("");
		expect(el.method).to.equal("GET");
		expect(el.params).to.be.empty;
		expect(el.headers).to.have.lengthOf(1);
		expect(el.body).to.have.equal(undefined);
	});
});

describe("properties and attributes changed", () => {
	it("has changed properties at the beginning", async () => {
		const el = await fixture(html`
			<data-provider
				.host=${"http://example.com"}
				.path=${"/example"}
				.method=${"POST"}
				.params=${{ id: 100 }}
				.headers=${{ "Content-type": "application/json; charset=UTF-8" }}
				.body=${{ id: 200 }}
			></data-provider>
		`);

		expect(el.host).to.equal("http://example.com");
		expect(el.path).to.equal("/example");
		expect(el.method).to.equal("POST");
		expect(el.params).to.have.property("id", 100);
		expect(el.headers).to.have.property("Content-type");
		expect(el.body).to.have.property("id", 200);
	});

	it("has changed properties", async () => {
		const el = await fixture(html` <data-provider></data-provider> `);
		el.host = "http://example.com";
		el.path = "/example";
		el.method = "POST";
		el.params = { id: 100 };
		el.headers = { "Content-type": "application/json; charset=UTF-8" };
		el.body = { id: 200 };

		await elementUpdated(el);

		expect(el.host).to.equal("http://example.com");
		expect(el.path).to.equal("/example");
		expect(el.method).to.equal("POST");
		expect(el.params).to.have.property("id", 100);
		expect(el.headers).to.have.property("Content-type");
		expect(el.body).to.have.property("id", 200);
	});
});

describe("all request ", () => {
	it("Init request ", async () => {
		const el = await fixture(html` <data-provider></data-provider> `);

		const data = {
			host: "https://jsonplaceholder.typicode.com/",
			path: "/posts/1",
			method: "GET",
			params: { userId: 1 },
		};

		const mock = {
			userId: 1,
			id: 1,
			title: "sunt aut optio reprehenderit",
			body: "quia et ",
		};

		fetchMock.mock("begin:https://jsonplaceholder", mock);

		await el.request(data).then((data) => {
			expect(data).to.have.property("title", "sunt aut optio reprehenderit");
			fetchMock.restore();
		});
	});

	it("Init request - bad url", async () => {
		const el = await fixture(html` <data-provider></data-provider> `);

		const data = {
			host: "ht",
			path: "/posts/1",
			method: "GET",
		};

		await el.request(data).catch((error) => {
			expect(error).to.have.property("message", "url not valid");
		});
	});

	it("Init request - res not ok", async () => {
		const el = await fixture(html` <data-provider></data-provider> `);

		const data = {
			host: "https://jsonplaceholder.typicode.com/1",
			path: "/po/1",
			method: "DELETE",
		};

		await el.request(data).catch((error) => {
			expect(error.name).to.equal("Error");
		});
	});
});
