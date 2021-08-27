//import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  Platform,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Import custom hooks and context
import useLogin from "../../hooks/useLogin";
import userContext from "../../context/UserContext";

//Import components and Assets
import logo from "../../assets/logo.png";
import LogOutMessage from "../../components/LogOutMessage";
import AppBoton from "../../components/AppBoton";

//import global Styles
import {globalStyles, color} from '../../lib/styleConstants'

export default function Login({ navigation, route }) {
  // custom hook
  const {
    email,
    password,
    handleEmailInput,
    handlePasswordInput,
    handleLogInSubmit,
    isLoginLoading
  } = useLogin(navigation);
  //context
  const { user, setUser, setUserMail } = useContext(userContext);
  //UseEffect para cargar el email del localStorage, si es que existe haga login automatico
  useEffect(() => {
    AsyncStorage.getItem("@cp_email")
      .then((value) => {
        if (value) {
          setUserMail(value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //UseEffect, si el login automatico sirvió, redirect a la home
  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user]);

//Si el log in funcionó, pero el cliente llega al log in page con un logged in, mostrar pagina de log out
  if (user) {
    return (
      <LogOutMessage
        user={user}
        navigation={navigation}
        setUser={setUser}
        setUserMail={setUserMail}
      />
    )
  }
    //Si no sirvió redirect automatico, Log in page
  return (
    <View style={globalStyles.container}>
      <View  style={globalStyles.header} >
        <Text  style={globalStyles.headerTitle}>Welcome to</Text>
        <Image style={{ width: 192, height: 192 }} source={logo} />
      </View>
      <Text style={globalStyles.text}>Log In</Text>
      <TextInput
        placeholder="example@hostname.com"
        onChangeText={handleEmailInput}
        value={email}
        keyboardType="email-address"
        style={globalStyles.input}
      />
      <TextInput
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={handlePasswordInput}
        style={globalStyles.input}
      />
      <AppBoton
        onPress={handleLogInSubmit}
        disabled={email.length === 0 || password.length === 0 || isLoginLoading}
        text="Log In"
        backgroundColor={color.second}
        fontColor={color.light}
      />
      <View>
        <Text>Or Signup with for a new account</Text>
      </View>
      {
        isLoginLoading
        ? <ActivityIndicator size="large" color={color.second} />
        : <AppBoton
          text="Sign Up"
          onPress={() => {
            navigation.navigate("Signup");
          }}
          backgroundColor={color.primary}
          fontColor={color.second}
        />
      }
    </View>
  );
}

