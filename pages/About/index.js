import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Platform, Dimensions } from 'react-native';
//CONTEXT
import userContext from '../../context/UserContext'
import MenuContext from '../../context/MenuContext'
//Components
import Menu from '../../components/Menu'
//global styles
import {globalStyles} from '../../lib/styleConstants'

const {height, width} = Dimensions.get("window")
const os = Platform.OS

export default function About({navigation, route}) {

  const {user, userMail,setUser, setUserMail, onError, isUserLoading } =useContext(userContext)
  const {isMenuOpen, setIsMenuOpen} =useContext(MenuContext)

    useEffect(() => {
        if (!user) {
            navigation.navigate('Login')
        }
    }, [])
    

  if(onError) return <View style={globalStyles.container}><Text>Error en userContext. log out y push login</Text></View>
  if(isUserLoading) return <View style={globalStyles.container}><Text>Loading...</Text><ActivityIndicator size="large" /></View>
  return (
    <View style={globalStyles.container}>
      {/* Menu desplegable */}
      {isMenuOpen 
      ? <Menu navigation={navigation} currentPage="About" setIsMenuOpen={setIsMenuOpen} /> 
      : null}

      <Text style={globalStyles.text}>ABOUT ABOUT ABOUT!</Text>
      <StatusBar style="auto" />
      <ActivityIndicator size="small" color="#aaa"/>
      <Button title="HOME PAGE" onPress={()=>navigation.navigate('Home')}/>
      <Text>Alto: {height}px</Text>
      <Text>Ancho: {width}px</Text>
      <Text>SO: {os}</Text>
      <Button title="PSHING TO HOME PAGE" onPress={()=>navigation.push('Home')}/>
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