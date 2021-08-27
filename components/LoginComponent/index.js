import React from 'react'
import {View, Image, TextInput, Text, Button, StatusBar, ActivityIndicator, StyleSheet, Dimensions, Platform } from 'react-native'
import useLogin from '../../hooks/useLogin'
import logo from "../../assets/logo.png";

const { height, width } = Dimensions.get("window");
const os = Platform.OS;

export default function index({navigation}) {

    const {email, password, handleEmailInput, handlePasswordInput, handleLogInSubmit} = useLogin(navigation)

    return (
        <View style={styles.container}>
        <Image style={{ width: 192, height: 192 }} source={logo} />
        <Text style={styles.text}>Log In</Text>
        <TextInput
          placeholder="example@hostname.com"
          onChangeText={handleEmailInput}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="password"
          value={password}
          secureTextEntry={true}
          onChangeText={handlePasswordInput}
        />
        <Button title="Log In" onPress={handleLogInSubmit} />
  
        <StatusBar style="auto" />
        <ActivityIndicator size="small" color="#aaa" />
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate("Signup");
          }}
        />
        <Text>Alto: {height}px</Text>
        <Text>Ancho: {width}px</Text>
        <Text>SO: {os}</Text>
        <Button
          title="PUSHING TO ABOUT PAGE"
          onPress={() => {
            navigation.push("About");
          }}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 50,
      fontWeight: "700",
    },
  });
  