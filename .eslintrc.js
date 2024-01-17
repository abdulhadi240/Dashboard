module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  parser: 'babel-eslint',
  extends: ['next/core-web-vitals', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: './jsconfig.json',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-anonymous-default-export': 'off',

    // add new line above comment
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: false,
        beforeBlockComment: false,
        allowBlockStart: false,
        allowClassStart: false,
        allowObjectStart: false,
        allowArrayStart: false
      }
    ],
  }
}
