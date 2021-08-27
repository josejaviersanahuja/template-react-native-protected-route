import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Platform, Dimensions } from 'react-native';
//Custom Components
import Menu from '../../components/Menu'
//CONTEXT
import userContext from '../../context/UserContext'
import MenuContext from "../../context/MenuContext";

// global Styles
import {globalStyles, color} from '../../lib/styleConstants'
const {height, width} = Dimensions.get("window")
const os = Platform.OS

export default function About({navigation, route}) {
/* Context */
    const {user, userMail,setUser, setUserMail, onError, isUserLoading } =useContext(userContext)
    const {isMenuOpen, setIsMenuOpen} =useContext(MenuContext)

    /* useEffect if no user, protected route will redirect you to Login  */
    useEffect(() => {
        if (!user && !isUserLoading) {
            navigation.navigate('Login')
        }
    }, [])
    
    /* On error TODO */
  if(onError) return <View style={globalStyles.container}><Text>Error en userContext. log out y push login</Text></View>
  /* is user loading, we wait */
  if(isUserLoading) return <View style={globalStyles.container}><Text>Loading...</Text><ActivityIndicator size="large" /></View>
  /* Main component */
  return (
    <View style={globalStyles.container}>
      {/* Menu desplegable */}
      {isMenuOpen 
      ? <Menu navigation={navigation} currentPage="Home" setIsMenuOpen={setIsMenuOpen} /> 
      : null}

      <Text style={globalStyles.text}>Home Home! {}</Text>
      <StatusBar style="auto" />
      <ActivityIndicator size="small" color="#aaa"/>
      <Button title="Log in PAGE" onPress={()=>navigation.push('Login')}/>
      <Text>Alto: {height}px</Text>
      <Text>Ancho: {width}px</Text>
      <Text>SO: {os}</Text>
      <Button title="PSHING TO About PAGE" onPress={()=>navigation.push('About')}/>
    </View>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:50,
    fontWeight:'700',
  }
});
 */