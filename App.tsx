import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { FormComponent } from "./components/FormComponent";

export default function App() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <SafeAreaView>
          <Layout style={styles.container}>
            <FormComponent toggleTheme={toggleTheme} />
          </Layout>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
