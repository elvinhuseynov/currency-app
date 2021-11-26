import React, { FC } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import axios from "axios";
import { useReactive, useMount } from "ahooks";
import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Button,
  Input,
} from "@ui-kitten/components";
import {
  banks,
  currencies,
  Bank,
  BankNames,
  CurrencyNames,
  currencyNames,
} from "../data";

interface IState {
  fromValue: string;
  convertedValue: string;
  selectedBank: Bank["value"];
  fromCurrency: CurrencyNames;
  toCurrency: CurrencyNames;
  rates: {
    [BankNames.ABB]:
      | Record<
          CurrencyNames,
          { EUR: number; USD: number; GBP: number } | undefined
        >
      | {};
  };
}

const url =
  "https://freecurrencyapi.net/api/v2/latest?apikey=78ff0a00-4e8e-11ec-92df-1fa85790eb14";

export const Home: FC = () => {
  const state = useReactive<IState>({
    convertedValue: "",
    fromValue: "",
    selectedBank: BankNames.ABB,
    fromCurrency: CurrencyNames.EUR,
    toCurrency: CurrencyNames.USD,
    rates: {
      [BankNames.ABB]: {
        [CurrencyNames.EUR]: {},
        [CurrencyNames.USD]: {},
        [CurrencyNames.GBP]: {},
      },
    },
  });

  useMount(() => {
    axios
      .get(`${url}&base_currency=EUR`)
      .then(
        ({
          data: { data: currencies },
        }: {
          data: { data: Record<CurrencyNames, number> };
        }) => {
          state.rates[BankNames.ABB][CurrencyNames.EUR] = currencies;
        }
      );
    axios
      .get(`${url}&base_currency=USD`)
      .then(({ data: { data: currencies } }) => {
        state.rates[BankNames.ABB][CurrencyNames.USD] = currencies;
      });
    axios
      .get(`${url}&base_currency=GBP`)
      .then(({ data: { data: currencies } }) => {
        state.rates[BankNames.ABB][CurrencyNames.GBP] = currencies;
      });
  });

  const convertationHandler = () => {
    state.convertedValue = "";
    if (state.fromCurrency === state.toCurrency)
      return (state.convertedValue = state.fromValue);

    const result: number =
      (state.rates[state.selectedBank][state.fromCurrency][
        currencyNames[state.toCurrency]
      ] ?? 0) * Number(state.fromValue);

    state.convertedValue = String(result.toFixed(2));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.container}>
          <Select
            style={styles.btn}
            selectedIndex={new IndexPath(state.selectedBank)}
            // Library error
            onSelect={({ row }) => (state.selectedBank = row)}
            value={banks[state.selectedBank].title}
          >
            {banks.map((bank) => (
              <SelectItem title={bank.title} key={bank.value} />
            ))}
          </Select>

          <Text style={styles.text}>From</Text>
          <Select
            style={styles.btn}
            selectedIndex={new IndexPath(state.fromCurrency)}
            // Library error
            onSelect={({ row }) => (state.fromCurrency = row)}
            value={currencies[state.fromCurrency].title}
          >
            {currencies.map((currency) => (
              <SelectItem title={currency.title} key={currency.value} />
            ))}
          </Select>
          <Input
            value={state.fromValue}
            keyboardType="numeric"
            autoCapitalize="none"
            maxLength={10}
            onChangeText={(value) =>
              (state.fromValue = value.replace(/[^0-9]/g, ""))
            }
          />

          <Text style={styles.text}>To</Text>
          <Select
            style={styles.btn}
            selectedIndex={new IndexPath(state.toCurrency)}
            // Library error
            onSelect={({ row }) => (state.toCurrency = row)}
            value={currencies[state.toCurrency].title}
          >
            {currencies.map((currency) => (
              <SelectItem title={currency.title} key={currency.value} />
            ))}
          </Select>

          <Button style={styles.btn} onPress={convertationHandler}>
            Convert
          </Button>
          <Input
            value={state.convertedValue}
            keyboardType="numeric"
            disabled
            autoCapitalize="none"
            // onChangeText={(value) => (state.convertedValue = value)}
          />
        </Layout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  center: {
    justifyContent: "center",
  },
  captionTextStyle: {
    color: "red",
  },
  btn: {
    marginVertical: 10,
  },
  text: {
    color: "#fff",
  },
});
