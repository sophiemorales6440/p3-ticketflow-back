module.exports = {
	testEnvironment: "node",
	moduleNameMapper: {
		"^(\\.{1,2}/.+)\\.js$": "$1",
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
