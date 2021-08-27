import {StyleSheet, Dimensions} from 'react-native'

const {height, width} = Dimensions.get("window")


export const color={
    primary:'#99e84f',
    second:'#00807b',
    light:'#fff',
    dark:'#000'
}


export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    text: {
      fontSize: 30,
      fontWeight: "700",
      marginBottom:10,
      textAlign:"center"
    },
    header: {
      backgroundColor:color.primary,
      color:color.second,
      alignItems:"center",
      width:width,
    },
    headerTitle:{
      fontSize: 50,
      fontWeight: "700",
    },
    input:{
      marginBottom:10,
      padding:1,
      borderColor:color.dark,
      borderStyle:"solid",
      borderWidth:1,
      width: width/2
    }
  });