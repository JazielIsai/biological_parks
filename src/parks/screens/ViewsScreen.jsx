import React from 'react';
import {View, Text, TextInput, StyleSheet, VirtualizedList} from "react-native";
import { Search } from '../../components/Search';

export const ViewsScreen = () => {


    return (
        <View
            style={styles.container}
        >
            <Search />
            
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});