import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './src/screens/InicioScreen';
import PedidosScreen from './src/screens/PedidosScreen';
import CaixaScreen from './src/screens/CaixaScreen';
import MotoBoy_1 from './src/screens/MotoBoy_1';
import MotoBoy_2 from './src/screens/MotoBoy_2';
import MotoBoy_3 from './src/screens/MotoBoy_3';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const CenteredHeaderTitle = () => (
  <View style={styles.headerTitleContainer}>
    <Text style={styles.headerTitleText}>Marmitex Conventos</Text>
  </View>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Marmitex"
    screenOptions={{
      tabBarActiveTintColor: 'orange',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
      tabBarShowIcon: false,
      tabBarIndicatorStyle: { backgroundColor: 'orange' },
      tabBarStyle: { backgroundColor: 'black' },
    }}
  >
    <Tab.Screen
      name="Marmitex"
      component={InicioScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Pedidos"
      component={PedidosScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="border-color" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Caixa"
      component={CaixaScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="Caixa-color" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator} 
          options={{ headerShown: false }}    
          
        />
        <Stack.Screen 
          name="QUIDO" 
          component={MotoBoy_1}
          options={{ headerShown: false }}          
        />
        <Stack.Screen 
          name="MIOJO" 
          component={MotoBoy_2}
          options={{ headerShown: false }}   
        />
        <Stack.Screen 
          name="UENDER" 
          component={MotoBoy_3}
          options={{ headerShown: false }}   
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent(appName, () => App);

export default App;
