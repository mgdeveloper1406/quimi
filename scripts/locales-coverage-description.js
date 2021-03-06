const fs = require("fs");

const THRESSHOLD = 85;

const crowdinMap = {
  ar_SA: "en-ar",
  bg_BG: "en-bg",
  ca_ES: "en-ca",
  de: "en-de",
  de_DE: "en-de",
  el_GR: "en-el",
  es: "en-es",
  es_ES: "en-es",
  fa_IR: "en-fa",
  fi_FI: "en-fi",
  fr_FR: "en-fr",
  he_IL: "en-he",
  hi_IN: "en-hi",
  hu_HU: "en-hu",
  id_ID: "en-id",
  it_IT: "en-it",
  ja_JP: "en-ja",
  kab_KAB: "en-kab",
  ko_KR: "en-ko",
  my_MM: "en-my",
  nb_NO: "en-nb",
  nl_NL: "en-nl",
  nn_NO: "en-nnno",
  pa_IN: "en-pain",
  pl_PL: "en-pl",
  pt_BR: "en-ptbr",
  pt_PT: "en-pt",
  ro: "en-ro",
  ro_RO: "en-ro",
  ru_RU: "en-ru",
  sk_SK: "en-sk",
  sv_SE: "en-sv",
  tr_TR: "en-tr",
  uk_UA: "en-uk",
  zh_CN: "en-zhcn",
  zh_TW: "en-zhtw",
};

const flags = {
  ar_SA: "ð¸ð¦",
  bg_BG: "ð§ð¬",
  ca_ES: "ð³",
  de: "ð©ðª",
  de_DE: "ð©ðª",
  el_GR: "ð¬ð·",
  es: "ðªð¸",
  es_ES: "ðªð¸",
  fa_IR: "ð®ð·",
  fi_FI: "ð«ð®",
  fr_FR: "ð«ð·",
  he_IL: "ð®ð±",
  hi_IN: "ð®ð³",
  hu_HU: "ð­ðº",
  id_ID: "ð®ð©",
  it_IT: "ð®ð¹",
  ja_JP: "ð¯ðµ",
  kab_KAB: "ð³",
  ko_KR: "ð°ð·",
  my_MM: "ð²ð²",
  nb_NO: "ð³ð´",
  nl_NL: "ð³ð±",
  nn_NO: "ð³ð´",
  pa_IN: "ð®ð³",
  pl_PL: "ðµð±",
  pt_BR: "ð§ð·",
  pt_PT: "ðµð¹",
  ro: "ð·ð´",
  ro_RO: "ð·ð´",
  ru_RU: "ð·ðº",
  sk_SK: "ð¸ð°",
  sv_SE: "ð¸ðª",
  tr_TR: "ð¹ð·",
  uk_UA: "ðºð¦",
  zh_CN: "ð¨ð³",
  zh_TW: "ð¹ð¼",
};

const languages = {
  ar_SA: "Ø§ÙØ¹Ø±Ø¨ÙØ©",
  bg_BG: "ÐÑÐ»Ð³Ð°ÑÑÐºÐ¸",
  ca_ES: "CatalÃ ",
  de: "Deutsch",
  de_DE: "Deutsch",
  el_GR: "ÎÎ»Î»Î·Î½Î¹ÎºÎ¬",
  es: "EspaÃ±ol",
  es_ES: "EspaÃ±ol",
  fa_IR: "ÙØ§Ø±Ø³Û",
  fi_FI: "Suomi",
  fr_FR: "FranÃ§ais",
  he_IL: "×¢××¨××ª",
  hi_IN: "à¤¹à¤¿à¤¨à¥à¤¦à¥",
  hu_HU: "Magyar",
  id_ID: "Bahasa Indonesia",
  it_IT: "Italiano",
  ja_JP: "æ¥æ¬èª",
  kab_KAB: "Taqbaylit",
  ko_KR: "íêµ­ì´",
  my_MM: "Burmese",
  nb_NO: "Norsk bokmÃ¥l",
  nl_NL: "Nederlands",
  nn_NO: "Norsk nynorsk",
  pa_IN: "à¨ªà©°à¨à¨¾à¨¬à©",
  pl_PL: "Polski",
  pt_BR: "PortuguÃªs Brasileiro",
  pt_PT: "PortuguÃªs",
  ro: "RomÃ¢nÄ",
  ro_RO: "RomÃ¢nÄ",
  ru_RU: "Ð ÑÑÑÐºÐ¸Ð¹",
  sk_SK: "SlovenÄina",
  sv_SE: "Svenska",
  tr_TR: "TÃ¼rkÃ§e",
  uk_UA: "Ð£ÐºÑÐ°ÑÐ½ÑÑÐºÐ°",
  zh_CN: "ç®ä½ä¸­æ",
  zh_TW: "ç¹é«ä¸­æ",
};

const percentages = fs.readFileSync(
  `${__dirname}/../src/locales/percentages.json`
);
const rowData = JSON.parse(percentages);

const coverages = Object.entries(rowData)
  .sort(([, a], [, b]) => b - a)
  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

const boldIf = (text, condition) => (condition ? `**${text}**` : text);

const printHeader = () => {
  let result = "| | Flag | Locale | % |\n";
  result += "| :--: | :--: | -- | :--: |";
  return result;
};

const printRow = (id, locale, coverage) => {
  const isOver = coverage >= THRESSHOLD;
  let result = `| ${isOver ? id : "..."} | `;
  result += `${locale in flags ? flags[locale] : ""} | `;
  const language = locale in languages ? languages[locale] : locale;
  if (locale in crowdinMap && crowdinMap[locale]) {
    result += `[${boldIf(
      language,
      isOver
    )}](https://crowdin.com/translate/atom-periodic-table-quizzes/8/${
      crowdinMap[locale]
    }) | `;
  } else {
    result += `${boldIf(language, isOver)} | `;
  }
  result += `${coverage === 100 ? "ð¯" : boldIf(coverage, isOver)} |`;
  return result;
};

console.info(
  `Each language must be at least **${THRESSHOLD}%** translated in order to appear on Atom. Join us on [Crowdin](https://crowdin.com/project/atom-periodic-table-quizzes) and help us translate your own language. **Can't find yours yet?** Open an [issue](https://github.com/HorusGoul/atom-pwa/issues/new) and we'll add it to the list.`
);
console.info("\n\r");
console.info(printHeader());
let index = 1;
for (const coverage in coverages) {
  if (coverage === "en") {
    continue;
  }
  console.info(printRow(index, coverage, coverages[coverage]));
  index++;
}
console.info("\n\r");
console.info("\\* Languages in **bold** are going to appear on production.");
