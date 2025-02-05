import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";

/** @type {import('eslint').Linter.Config[]} */
export default [
	// Recommended configurations for JavaScript and TypeScript
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	// Recommended configuration for Svelte
	...svelte.configs["flat/recommended"],
	// Prettier config to avoid formatting conflicts
	prettier,
	...svelte.configs["flat/prettier"],

	// Globals and other language options
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},

	// Svelte-specific parser settings
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser // Use TypeScript parser for Svelte files
			}
		}
	},

	// Ignore patterns for build and dist folders
	{
		ignores: ["build/", ".svelte-kit/", "dist/"]
	},

	// Custom rules and plugin configuration
	{
		plugins: {
			"sort-destructure-keys": sortDestructureKeys
		},
		rules: {
			"@typescript-eslint/no-unused-vars": "off", // Disable no-unused-vars rule
			"no-undef": "off", // Disable no-undef rule
			"no-unused-vars": "warn", // Disable no-unused-vars rule
			"sort-destructure-keys/sort-destructure-keys": [2, { caseSensitive: true }], // Sort destructure keys rule
			"sort-keys": ["error", "asc", { caseSensitive: true, minKeys: 2, natural: false }],
			yoda: "error" // Yoda conditions rule
		}
	}
];
