import React, { FC } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useReactive } from "ahooks";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { banks } from "../data";

interface IState {
  selectedIndex: IndexPath | IndexPath[];
}

export const Home: FC = ({ navigation }) => {
  const state = useReactive<IState>({
    selectedIndex: new IndexPath(0),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.container}>
          <Select
            selectedIndex={state.selectedIndex}
            onSelect={(index) => (state.selectedIndex = index)}
            value={
              banks.find((bank) => bank.value === state.selectedIndex.row)
                ?.title
            }
          >
            {banks.map((bank) => (
              <SelectItem title={bank.title} key={bank.value} />
            ))}
          </Select>
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
  captionTextStyle: {
    color: "red",
  },
  btn: {
    marginVertical: 10,
  },
});
