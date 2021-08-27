import React, { useContext } from "react";
import {Pressable, Text, StyleSheet, Dimensions, View} from 'react-native'
//Menu context
import MenuContext from "../../context/MenuContext";

// SVG ICON
import BurguerBtnSVG from '../../UI-Icons/BurguerBtnSVG'
import SVG, {Path} from 'react-native-svg'
import { color } from "../../lib/styleConstants";

const { height, width } = Dimensions.get("window");

export default function index({backgroundColor, fontColor, disabled =false }) {
    const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
    const styles = StyleSheet.create({
        boton:{
          margin:15,
          padding:7,
          backgroundColor: backgroundColor,
          opacity: disabled? 0.5:1, // if its disabled opacity 0.5
          width:30,
          height:30,
          borderRadius:5,
          //
          borderColor:fontColor,
          borderWidth:2,
          borderStyle:"solid"
        },
        botonText:{
          color: fontColor,
          textAlign:"center",
          fontWeight:"700",
          fontSize:20
        },
        burguerContainer: {
            alignItems:"center",
            justifyContent:"center",
            
            transform: isMenuOpen? [{rotate:"90deg"}]:[]
        }
      });

    const toggleMenu = () =>{
        if (isMenuOpen) {
            setIsMenuOpen(false)
        } else {
            setIsMenuOpen(true)
        }
    }

  return (
    <Pressable
      onPress={toggleMenu}
      disabled={disabled}
      style={styles.boton}
    >
      <View style={styles.burguerContainer}>
        <BurguerBtnSVG
            color={fontColor}
            width={15}
            height={15}
        />
      </View>
    </Pressable>
  );
}

