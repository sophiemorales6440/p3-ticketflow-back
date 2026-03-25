module.exports = {
	testEnvironment: "node",
	moduleNameMapper: {
		"^(.*)\\.js$": "$1",
	},
	testMatch: ["**/src/__tests__/**/*.test.ts"],
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
