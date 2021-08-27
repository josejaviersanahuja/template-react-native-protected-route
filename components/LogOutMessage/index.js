import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import {View, Image, Text, Button, StatusBar, ActivityIndicator, StyleSheet, Dimensions, Platform } from 'react-native'
import logo from "../../assets/logo.png";
import { logout } from '../../lib/fetchFunctions';

//Components
import AppBoton from '../../components/AppBoton'

//import global Styles
import {globalStyles, color} from '../../lib/styleConstants'

const { height, width } = Dimensions.get("window");
const os = Platform.OS;

export default function index({user, navigation, setUser, setUserMail}) {

    const handleOnLogOutPress = () => {
        console.log('entra aqui?');
        logout(user.email)
            .then(()=>{
                console.log('then 1 en logout');
                return AsyncStorage.removeItem('@cp_token')
            })
            .then(()=>{
                console.log('then 2 en logout');
                
                return AsyncStorage.removeItem('@cp_email')
            })
            .then(()=>{
                console.log('then 3 en logout');
                setUserMail('')
                setUser(undefined)
                navigation.navigate('Login')
            })
            .catch(err=>{
                console.log('error en logout ', err);
                setUserMail('')
                setUser(undefined)
                AsyncStorage.removeItem('@cp_email')
            })
    }

    return (
        <View style={globalStyles.container}>
          <View style={globalStyles.header}>
            <Image style={{ width: 192, height: 192 }} source={logo} />
          </View>
          <View style={styles.message}>
            <Text style={globalStyles.text}>You are currently Logged In as {user.userName}</Text>
            <Text style={globalStyles.text}>If you want to log in with a different account, please Log out first.</Text>
          </View>
        
        <AppBoton 
          text="Log Out"
          onPress={handleOnLogOutPress}
          backgroundColor={color.second}
          fontColor={color.light}
        />
        <Text>Or go back to the Home page</Text>
        <AppBoton 
          text="Home"
          onPress={()=>{navigation.navigate('Home')}}
          backgroundColor={color.second}
          fontColor={color.light}
        />
        
      </View>
    )
}

const styles = StyleSheet.create({
    message:{
      width:width*0.8,
      marginTop:20,
      marginBottom:20
    }
  });
  