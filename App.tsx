import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Input, Layout, Button } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <StatusBar style="auto" />
        <Layout style={styles.container} >
          <SafeAreaView>
            <View>
              <Input label="hello" style={{ width: 300 }} />
              <Input label="mello" style={{ width: 300 }} />
              <Button>hello</Button>
            </View>
          </SafeAreaView>
        </Layout>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
//     // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
