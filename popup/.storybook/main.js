module.exports = {
  stories: ["../stories/**/*.[jt]s"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/preset-scss",
    "@storybook/preset-typescript",
    "@storybook/addon-viewport/register",
  ],
  webpackFinal: (config) => {
    const rules = config.module.rules;
    for (let item of rules) {
      if (item.test.test(".svg")) {
        item.test = /\.(ico|jpg|jpeg|png|gif|otf|webp|cur|ani|pdf)(\?.*)?$/;
      }
    }

    rules.push({
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: "url-loader?limit=100000",
    });

    return config;
  },
};
