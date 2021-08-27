// In App.js in a new project

import React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//CONTEXT
import { UserContextProvider } from "./context/UserContext";
//PAGES
import Login from "./pages/Login";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
// global styles
import { color } from "./lib/styleConstants";
//logo
import logo from "./assets/logo.png";
//Components
import AppBurguerBoton from "./components/AppBurguerBoton";
import { MenuContextProvider } from "./context/MenuContext";
const Stack = createNativeStackNavigator();

function App() {
  
  return (
    /* User context */
    <UserContextProvider>
      {/* Menu context */}
      <MenuContextProvider>
      {/* Navigation container */}
        <NavigationContainer>
          {/* All pages in page */}
          <Stack.Navigator>
            {/* Log in page */}
            <Stack.Screen name="Login" component={Login} />
            {/* Signup page */}
            <Stack.Screen name="Signup" component={Signup} />
            {/* About page */}
            <Stack.Screen 
              name="About" 
              component={About} 
              options={{
                title: "About Color-Palette",
                headerTitleAlign: "center",
                headerTintColor: color.second,
                headerRight: () => (
                  <AppBurguerBoton
                    backgroundColor={color.primary}
                    fontColor={color.second}
                  />
                ),
              }}
            />
            {/* My List page */}
            <Stack.Screen 
              name="MyList" 
              component={MyList} 
              options={{
                title: "My List of Colors",
                headerTitleAlign: "center",
                headerTintColor: color.second,
                headerRight: () => (
                  <AppBurguerBoton
                    backgroundColor={color.primary}
                    fontColor={color.second}
                  />
                ),
              }}
            />
            {/* Home Page */}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "Search for a color",
                headerTitleAlign: "center",
                headerTintColor: color.second,
                headerRight: () => (
                  <AppBurguerBoton
                    backgroundColor={color.primary}
                    fontColor={color.second}
                  />
                ),
              }}
            />
            {/* End and all closing braquets */}
          </Stack.Navigator>
        </NavigationContainer>
      </MenuContextProvider>
    </UserContextProvider>
  );
}

export default App;
