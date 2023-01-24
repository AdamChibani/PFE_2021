/* eslint-disable import/no-extraneous-dependencies */
const Purgecss = require("purgecss");
const fs = require("fs");
const path = require("path");

// Custom PurgeCSS extractor for Tailwind that allows special characters in class names.
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
		// eslint-disable-next-line no-useless-escape
		const a = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    return a;
  }
}

const purgecss = new Purgecss({
  content: ["./src/**/*.js", "./src/**/*.jsx"],
  css: ["./src/styles/tailwind.css"],
  whitelist: ["pl-24", "pl-40", "pl-56", "pl-72", "pl-80"],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ["html", "js", "jsx"],
    },
  ],
});

const result = purgecss.purge();

result.forEach((out) => {
  fs.writeFileSync(path.resolve(__dirname, out.file), out.css, "utf-8");
});

console.log("src/styles/tailwind.css Successfully purged.");
