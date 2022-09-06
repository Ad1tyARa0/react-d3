const BASE_URL = 'https://gist.githubusercontent.com/Ad1tyARa0';

export const BOEING_COMPANY_DATA = `${BASE_URL}/838f68337cbb9d9a64ecdff114216284/raw/line.csv`;

export const BITCOIN_PRICE_DATA = `${BASE_URL}/098d6579f640f133d0054db0fc635ebc/raw/BTC-USD.csv`;

export const PROGRAMMING_LANGUAGES_DATA = `${BASE_URL}/5f6fa83eaf0eb5dd7b74720e35abd53e/raw/most-popular-lang-2022.csv`;

export const EXPENSES_DATA = `${BASE_URL}/6438b664702dcb34052cb6c761138198/raw/expenses.csv`;

export const DIAMONDS_DATA = `${BASE_URL}/a6981e4cbe19aa043b5300ddc1cc6fc7/raw/acac564a96a965be8f38fb8d49ecd0eb6d8c5644/diamonds2.csv`;

export const OPTION_TO_URL_MAPPING: { [m: string]: string } = {
  btc: BITCOIN_PRICE_DATA,
  ba: BOEING_COMPANY_DATA,
};
