module.exports = {
	testEnvironment: "node",
	moduleNameMapper: {
		"^(\\.{1,2}/.+)\\.js$": "$1",
		"^multer$": "<rootDir>/src/__mocks__/multer.ts",
	},
	testMatch: ["**/src/**/__tests__/**/*.test.ts"],
	transform: {
		"^.+\\.ts$": [
			"ts-jest",
			{
				tsconfig: {
					module: "commonjs",
				},
			},
		],
	},
};
