# \<data-manager>

## Installation

```bash
npm i
```

```bash
yarn install
```

## Demo

```bash
npm start
```

```bash
yarn start
```

## Usage

```html
<data-manager></data-manager>

<script type="module">
	/** Watch the demo for more examples **/
	import "data-manager/data-manager.js";
	const dp = document.querySelector("#dataProvider");

	dp.resetData(); //Reset all properties

	//Request
	const data = {
		host: "https://jsonplaceholder.typicode.com/",
		path: "/posts/1",
		method: "GET",
	};

	//Call request with data
	dp.request(data)
		.then((data) => console.log(data)) //Response - OK
		.catch((error) => console.log(error)); //Response - Error
</script>
```

## Testing with Karma

To run the suite of karma tests, run

```bash
npm run test
```

```bash
yarn test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

```bash
yarn test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
