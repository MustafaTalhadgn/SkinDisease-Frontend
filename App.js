import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "./src/screens/Home"; // Home sayfasını import et
import Main from "./src/screens/index"; // Main sayfasını import et
import Login from "./src/screens/Login"; // Login sayfasını import et
import PhotoUpload from "./src/screens/PhotoUpload";
import PredictionScreen from "./src/screens/PredictionScreen";
import Register from "./src/screens/Register";
import Settings from "./src/screens/Settings";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PhotoUpload" component={PhotoUpload} />
        <Stack.Screen name="PredictionScreen" component={PredictionScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
