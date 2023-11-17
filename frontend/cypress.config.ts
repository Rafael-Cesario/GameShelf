import { defineConfig } from "cypress";

export default defineConfig({
	env: {
		devURI: "http://localhost:8080/graphql",
	},

	component: {
		viewportWidth: 1280,
		viewportHeight: 720,
		watchForFileChanges: false,
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
	},

	e2e: {
		watchForFileChanges: false,
		baseUrl: "http://localhost:3000/",
	},
});
