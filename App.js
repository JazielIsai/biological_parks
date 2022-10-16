/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';

import RouterMain from './src/router/Router';
import {AuthProvider} from "./src/auth/context/AuthProvider";

const App = () => {

    return (
        <AuthProvider>
            <RouterMain/>
        </AuthProvider>
  );
};


export default App;
