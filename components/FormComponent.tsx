import React, { FC } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView ,
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

interface IProps {
  toggleTheme: any;
}

interface IState {
  fullName: string;
  email: string;
  password: string;
  errors: {
    fullName: string;
    email: string;
    password: string;
  };
}

type TStateKeys = "fullName" | "email" | "password";

export const FormComponent: FC<IProps> = ({ toggleTheme }) => {
  const state = useReactive({
    fullName: "",
    email: "",
    password: "",
    errors: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const isNotEmpty = () => {
    const { fullName, email, password } = state;
    let isNoError = true;

    if (!fullName) {
      state.errors.fullName = "Full Name is required.";
      isNoError = false;
    }
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

  const handlePress = () => {
    if (isNotEmpty()) {
      if (validateForm(state.errors)) {
        Keyboard.dismiss();
        alert("Created successfully.");
      }
    } else {
      validateForm(state.errors);
    }
  };

  const handleChange = (field: TStateKeys, value: string) => {
    let errors = state.errors;

    switch (field) {
      case "fullName":
        errors.fullName =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
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
          <ScrollView  >
            <Input
              key={Math.random()}
              value={state.fullName}
              label="Full Name"
              caption={
                state.errors.fullName.length > 0 ? state.errors.fullName : ""
              }
              status={state.errors.fullName.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("fullName", value)}
            />
            <Input
              key={Math.random()}
              value={state.email}
              label="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              caption={state.errors.email.length > 0 ? state.errors.email : ""}
              status={state.errors.email.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("email", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Input
              key={Math.random()}
              value={state.password}
              label="Password"
              secureTextEntry
              caption={
                state.errors.password.length > 0 ? state.errors.password : ""
              }
              status={state.errors.password.length > 0 ? "danger" : ""}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Button
              key={Math.random()}
              style={styles.btn}
              onPress={handlePress}
            >
              Submit
            </Button>
            <Button
              key={Math.random()}
              style={styles.btn}
              onPress={() => toggleTheme()}
            >
              Change Theme
            </Button>
          </ScrollView >
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
    marginVertical: 5,
  },
});
