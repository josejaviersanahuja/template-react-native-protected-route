//import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import { Text, View, Image, TextInput, ActivityIndicator } from 'react-native';
//Components
import LogOutMessage from '../../components/LogOutMessage';
import AppBoton from '../../components/AppBoton';
//LOGO
import logo from "../../assets/logo.png";
//userContext y custom hook
import useSignup from '../../hooks/useSignup';
import userContext from '../../context/UserContext' 

//import global Styles
import {globalStyles, color} from '../../lib/styleConstants'

export default function Signup({navigation, route}) {
  // CUSTON HOOK
    const {email, handleEmailInput, handleUserNameInput, userName, password, handlePasswordInput, handleSignupSubmit, isSignupLoading} = useSignup(navigation)
    //CONTEXT
    const {user, setUser, setUserMail } = useContext(userContext)

  if (user) {
    return  <LogOutMessage user={user} navigation={navigation} setUser={setUser} setUserMail={setUserMail}/> 
  }
  return (
    <View style={globalStyles.container}>
      <View  style={globalStyles.header} >
        <Image style={{ width: 192, height: 192 }} source={logo} />
      </View>
      <Text  style={globalStyles.text}>Sign up</Text>
        
      <TextInput
        placeholder="example@hostname.com"
        onChangeText={handleEmailInput}
        value={email}
        keyboardType="email-address"
        style={globalStyles.input}
      />
      <TextInput
        placeholder="username"
        onChangeText={handleUserNameInput}
        value={userName}
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
        onPress={handleSignupSubmit}
        disabled={email.length===0 || userName.length===0 || password.length===0 || isSignupLoading}
        text="Sign Up"
        backgroundColor={color.second}
        fontColor={color.light}
      />
      <View>
        <Text>Or Log In if you already have an account</Text>  
      </View>
      { isSignupLoading
        ? <ActivityIndicator size="large" color={color.second} />
        :<AppBoton
          text="Log In"
          onPress={() => {
            navigation.navigate("Login");
          }}
          backgroundColor={color.primary}
          fontColor={color.second}
        />
      }
    </View>
  );
}

