
import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginScreen} from "../auth/screen/LoginScreen";
import {RegisterScreen} from "../auth/screen/RegisterScreen";
import {AuthContext} from "../auth/context/AuthContext";
import {RoutesParks} from "../parks/routes/RoutesParks";
import { Account } from '../auth/screen/Account';
import { ViewParks } from '../parks/screens/ViewParks';
import { ViewBiological } from '../parks/screens/ViewBiological';
import { ViewImg } from '../parks/screens/ViewImg';
import { DetailScreen } from '../parks/screens/DetailScreen';
import { EditPark } from '../parks/screens/EditParks';
import { EditBiologicData } from '../parks/screens/EditBiologicData';
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
                        backgroundColor: 'white',
                    },
                } }
            >
                {
                    logged ? (
                        <Stack.Group>
                            <Stack.Screen name="BiologicalPark" component={RoutesParks} />
                            <Stack.Screen name="Account" component={Account} />
                            <Stack.Screen name='ViewParks' component={ViewParks} />
                            <Stack.Screen name='ViewBiological' component={ViewBiological} />
                            <Stack.Screen name='ViewImg' component={ViewImg} />
                            <Stack.Screen name='DetailScreen' component={DetailScreen} />
                            <Stack.Screen name='EditPark' component={EditPark} />
                            <Stack.Screen name='EditBiologicData' component={EditBiologicData} />
                            
                        </Stack.Group>
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