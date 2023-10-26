module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true, // Added so ESLint doesn't complain about 'process' and '__dirname' not being defined
    },
    extends: "eslint:recommended",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {},
};
