module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2020": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        rules: {
            'no-console': 'off',
            indent: [
                'error',
                'tab',
            ],
            'linebreak-style': [
                'error',
                'unix',
            ],
            quotes: [
                'error',
                'single',
            ],
            semi: [
                'error',
                'never',
            ],
            'no-multiple-empty-lines': [
                "error", 
                {"max": 2}
            ]
        },
    }
};
