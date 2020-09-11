/* global customElements, Headers, Request, fetch */
import { LitElement } from "lit-element";

const tagName = "data-provider";
export class DataProvider extends LitElement {
	static get properties() {
		return {
			host: { attribute: "host" },
			path: { type: String },
			method: { type: String },
			params: { type: Object },
			headers: { type: Object },
		};
	}

	constructor() {
		super();
		this.resetData();
	}
	request(data) {
		this._initData(data);

		const myInit = this._createMyInit();
		let url = this._createUrl();
		if (!url) {
			return new Promise((resolve, reject) => {
				reject({ message: "url not valid" });
			});
		}

		return fetch(new Request(url, myInit))
			.then(this._handleStatus)
			.then((res) => res.json());
	}
	resetData() {
		this.host = "";
		this.path = "";
		this.params = {};
		this.headers = [["Access-Control-Allow-Origin", "*"]];
		this.method = "GET";
		this.body = undefined;
	}
	_initData(data) {
		Object.keys(data).forEach((key) => (this[key] = data[key]));
	}
	_createMyInit() {
		return {
			method: this.method,
			headers: new Headers(this.headers),
			mode: "cors",
			cache: "default",
			body: JSON.stringify(this.body),
		};
	}
	_createUrl() {
		let url;
		try {
			url = new URL(this.path, this.host);
			url = this._addParamsUrl(url);
		} catch (error) {
			return null;
		}
		return url;
	}
	_addParamsUrl(url) {
		Object.keys(this.params).forEach((key) =>
			url.searchParams.append(key, this.params[key])
		);
		return url;
	}
	_handleStatus(res) {
		if (!res.ok) {
			throw new Error(res.statusText);
		}
		return res;
	}
}

customElements.define(tagName, DataProvider);
