import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
import {RegisterBiologicalScreen} from '../screens/RegisterBiologicalScreen';
import {Profile} from '../screens/Profile';
import {ViewsScreen} from '../screens/ViewsScreen';
import { Image, StatusBar } from 'react-native';


const Tab = createBottomTabNavigator();


export const RoutesParks = () => {

    return (
        <>
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{ 
                headerShown: false, 
                tabBarActiveTintColor: '#0008ff',
                tabBarActiveBackgroundColor: '#e0e0e0',
                tabBarInactiveTintColor: '#fff',
                tabBarInactiveBackgroundColor: '#0093E9',
                tabBarStyle: { backgroundColor: '#0093E9' },
                activeColor:"#f0edf6",
                inactiveColor:"#3e2465",
            }}
            
        >
            <Tab.Screen
                name={'View'}
                component={ViewsScreen}
                options={{
                    title: 'Vista',
                    tabBarIcon: ({ color, size }) => (
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    top: -4
                                }}
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/1091/1091169.png'
                                }}
                            />
                        ),
                }}
            />
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    top: -4
                                }}
                                source={{
                                    uri: 'https://pt.seaicons.com/wp-content/uploads/2015/06/Home-icon.png'
                                }}
                            />
                        ),
                }}
            />
            <Tab.Screen 
                name="Register" 
                component={RegisterBiologicalScreen}
                options={{
                    title: 'Registrar',
                    tabBarIcon: ({ color, size }) => (
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    top: -4
                                }}
                                source={{
                                    uri: 'https://www.projectcounter.org/wp-content/uploads/2016/03/icon-register.png'
                                }}
                            />
                        ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    top: -4
                                }}
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                                }}
                            />
                        ),
                }} 
            />
        </Tab.Navigator>
        </>
    );
};
