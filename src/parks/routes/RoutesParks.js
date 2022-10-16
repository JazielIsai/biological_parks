import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from "../screens/HomeScreen";
import {RegisterBiologicalScreen} from '../screens/RegisterBiologicalScreen';

const Tab = createBottomTabNavigator();


export const RoutesParks = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Register" component={RegisterBiologicalScreen} />
        </Tab.Navigator>
    );
}