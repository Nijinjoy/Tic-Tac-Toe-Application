import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import ContactScreen from '../screens/ContactScreen'

const Stack = createNativeStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='ContactScreen' component={ContactScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes