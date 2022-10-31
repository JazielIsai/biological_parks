import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
import {RegisterBiologicalScreen} from '../screens/RegisterBiologicalScreen';
import {Profile} from '../screens/Profile';
import {ViewsScreen} from '../screens/ViewsScreen';


const Tab = createBottomTabNavigator();


export const RoutesParks = () => {

    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{ headerShown: false, tabBarActiveTintColor: '#e91e63', }}
        >
            <Tab.Screen
                name={'View'}
                component={ViewsScreen}
                options={{
                    title: 'Vista',
                }}
            />
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    title: 'Inicio',
                }}
            />
            <Tab.Screen 
                name="Register" 
                component={RegisterBiologicalScreen}
                options={{
                    title: 'Registrar',
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    title: 'Perfil',
                }} 
            />
        </Tab.Navigator>
    );
};
