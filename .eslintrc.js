module.exports = {
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-essential',
        'prettier',
        'prettier/vue',
        'prettier/@typescript-eslint',
    ],
    rules: {
        'vue/no-unused-vars': 1,
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
}
