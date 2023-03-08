module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss",
  ],
  plugins: [
    "stylelint-order",
    "stylelint-scss"
  ],
  rules: {
    "string-quotes": "double",
    "block-opening-brace-space-before": "always-multi-line",
    "order/order": [
      "at-rules",
      "dollar-variables",
      "custom-properties",
      "rules",
      "declarations",
    ]
  }
}
