import React from "react";
import {Pressable, Text, StyleSheet, Dimensions} from 'react-native'

const { height, width } = Dimensions.get("window");

export default function index({backgroundColor, fontColor, onPress, disabled=false, text }) {

    const styles = StyleSheet.create({
        boton:{
          margin:15,
          padding:7,
          backgroundColor: backgroundColor,
          opacity: disabled? 0.5:1,
          width:width/2,
          borderRadius:5
        },
        botonText:{
          color: fontColor,
          textAlign:"center",
          fontWeight:"700",
          fontSize:20
        }
      });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={styles.boton}
    >
      <Text style={styles.botonText}>{text}</Text>
    </Pressable>
  );
}

