import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {RegisterCardBiological} from "./RegisterCardBiological";
import {RegisterImg} from "./RegisterImg";
import {RegisterPark} from "./RegisterPark";
import { RegisterJoinTables } from "./RegisterJoinTables";

const Tab = createMaterialTopTabNavigator();


export const RegisterBiologicalScreen = () => {

    return (
        <>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Parks" component={RegisterPark} options={{title: 'Parques'}} />
                <Tab.Screen name="CardBiological" component={RegisterCardBiological} options={{title: 'Ficha'}} />
                <Tab.Screen name="ImgBiological" component={RegisterImg} options={{title: 'Imagen'}} />
                <Tab.Screen name="RegisterJoinTables" component={RegisterJoinTables} options={{title: 'Relación'}} />
            </Tab.Navigator>
        </>
    )
};
