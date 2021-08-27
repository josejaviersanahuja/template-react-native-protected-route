import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
//Component
import AppBoton from '../AppBoton'
// importing global Styles
import {color} from '../../lib/styleConstants'
// Dimensions
const {height, width} = Dimensions.get("window")

export default function index({navigation, currentPage, setIsMenuOpen}) {

    const handlePress = (page) => {
        setIsMenuOpen(false)
        navigation.push(page)
    }
    return (<>
    {/* Mostrar solo los botones links que no sean del currentPage */}
        {/* Home link */}
        {currentPage!=="Home"  && 
        <View style={styles.header}>
            <AppBoton
                backgroundColor={color.second}
                fontColor={color.light}
                text="Home"
                onPress={()=>handlePress('Home')}
            />
        </View>}
        {/* MyList link */}
        {currentPage!=="MyList"  && 
        <View style={styles.header}>
            <AppBoton
                backgroundColor={color.second}
                fontColor={color.light}
                text="MyList"
                onPress={()=>handlePress('MyList')}
            />
        </View>}
        {/* About link */}        
        {currentPage!=="About"  && 
        <View style={styles.header}>
            <AppBoton
                backgroundColor={color.second}
                fontColor={color.light}
                text="About"
                onPress={()=>handlePress('About')}
            />
        </View>}
        
    </>)
}

const styles = StyleSheet.create({
    header:{
        width: width,
        minHeight:40,
        backgroundColor:color.primary,
        alignItems:"center",
        justifyContent:"center"
    }
})
