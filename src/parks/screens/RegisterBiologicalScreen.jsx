import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {RegisterCardBiological} from "./RegisterCardBiological";
import {RegisterImg} from "./RegisterImg";
import {RegisterPark} from "./RegisterPark";

const Tab = createMaterialTopTabNavigator();


export const RegisterBiologicalScreen = () => {

    return (
        <>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Parks" component={RegisterPark} />
                <Tab.Screen name="CardBiological" component={RegisterCardBiological} />
                <Tab.Screen name="ImgBiological" component={RegisterImg} />
            </Tab.Navigator>
        </>
    )
};
