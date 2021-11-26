import React, { FC } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useReactive } from "ahooks";
import { Layout, Input, Button } from "@ui-kitten/components";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (errors: IState["errors"]) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

interface IState {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
}

type TStateKeys = "email" | "password";

export const Login: FC = ({ navigation }) => {
  const state = useReactive({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const isNotEmpty = () => {
    const { email, password } = state;
    let isNoError = true;

    if (!email) {
      state.errors.email = "Email Address is required.";
      isNoError = false;
    }
    if (!password) {
      state.errors.password = "Password is required.";
      isNoError = false;
    }

    return isNoError;
  };

  const validateCredentials = (field: TStateKeys, value: string) => {
    let valid = false;
    if (
      (field === "email" && value !== "admin@admin.com") ||
      (field === "password" && value !== "admin")
    ) {
      state.errors.email = "Invalid Credentials";
      state.errors.password = "Invalid Credentials";
      return valid;
    }
    return (valid = true);
  };

  const handlePress = () => {
    if (!isNotEmpty()) return;
    if (
      !validateCredentials("email", state.email) ||
      !validateCredentials("password", state.password)
    )
      return;
    if (validateForm(state.errors)) {
      Keyboard.dismiss();
      navigation.navigate("Home");
    } else {
      validateForm(state.errors);
    }
  };

  const handleChange = (field: TStateKeys, value: string) => {
    let errors = state.errors;

    switch (field) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 5 ? "Password must be 5 characters long!" : "";
        break;
      default:
        break;
    }

    state[field] = value;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.container}>
          <Input
            value={state.email}
            label="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            caption={state.errors.email.length > 0 ? state.errors.email : ""}
            status={state.errors.email.length > 0 ? "danger" : ""}
            onChangeText={(value) => handleChange("email", value)}
          />

          <Input
            value={state.password}
            label="Password"
            secureTextEntry
            caption={
              state.errors.password.length > 0 ? state.errors.password : ""
            }
            status={state.errors.password.length > 0 ? "danger" : ""}
            onChangeText={(value) => handleChange("password", value)}
          />

          <Button style={styles.btn} onPress={handlePress}>
            Submit
          </Button>
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
