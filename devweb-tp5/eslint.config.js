/** @type {import('eslint').Linter.FlatConfig} */
const config = [
    // Include the recommended ESLint rules directly
    {
      files: ['**/*.js', '**/*.mjs'], // Adjust this pattern according to your project
      languageOptions: {
        parserOptions: {
          ecmaVersion: 2020, // Adjust according to your project
          sourceType: 'module', // For ES modules
        },
      },
      rules: {
        // Add your custom rules here
        // Example: 'no-console': 'warn',
      },
    },
  ];
  
  module.exports = config;
  