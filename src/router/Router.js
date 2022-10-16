
import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginScreen} from "../auth/screen/LoginScreen";
import {RegisterScreen} from "../auth/screen/RegisterScreen";
import {AuthContext} from "../auth/context/AuthContext";
import {RoutesParks} from "../parks/routes/RoutesParks";
//import RoutesParks from "../parks/routes/RoutesParks";

const Stack = createNativeStackNavigator();


export default function RouterMain() {

    const {logged} = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={ {
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: 'white'
                    }
                } }
            >
                {
                    logged ? (
                        <>
                            <Stack.Screen name="BiologicalPark" component={RoutesParks} />
                        </>
                    )
                        : (
                            <Stack.Group>
                                <Stack.Screen name="Login" component={LoginScreen} />
                                <Stack.Screen name={'Register'} component={RegisterScreen} />
                            </Stack.Group>
                        )
                }



            </Stack.Navigator>

        </NavigationContainer>
    );
}