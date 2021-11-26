export type Options = { title: string; value: string };

export const enum BankNames {
  ABB,
  ATB,
  KB,
}
export type Bank = { title: string; value: BankNames };
export const banks: Bank[] = [
  { title: "International Bank of Azerbaijan", value: BankNames.ABB },
];

export const enum CurrencyNames {
  EUR,
  USD,
  GBP,
}
export const currencyNames: ("EUR" | "USD" | "GBP")[] = ["EUR", "USD", "GBP"];
export type Currency = { title: string; value: CurrencyNames };
export const currencies: Currency[] = [
  { title: "Euro", value: CurrencyNames.EUR },
  { title: "Dollar", value: CurrencyNames.USD },
  { title: "Pound", value: CurrencyNames.GBP },
];
