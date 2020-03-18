module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  parser: "babel-eslint",
  rules: {
    strict: 0,
    "no-param-reassign": 0,
    "arrow-body-style": 0,
    "id-length": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "react/jsx-filename-extension": 0,
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
    "react/no-unused-prop-types": 0,
    "no-plusplus": 0,
    "no-bitwise": [2, { allow: ["~"] }],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/label-has-for": 0,
    "prefer-destructuring": 0,
    "no-class-assign": 0,
    "react/no-array-index-key": 0,
    "react/no-find-dom-node": 0,
    "linebreak-style": 0,
    "no-useless-catch": 0,
    "consistent-return": 0,
    "no-else-return": ["error", { allowElseIf: true }]
  },
  globals: {
    expect: true,
    document: true,
    window: true
  },
  env: {
    jest: true,
    node: true,
    mocha: true
  }
};
