import React from "react";
import {View, Text, TextInput, StyleSheet, VirtualizedList, SafeAreaView} from "react-native";

export const ViewParks = () => {


    return (
        <SafeAreaView>
            <VirtualizedList
                data={[]}
                renderItem={({item}) => <Text>{item}</Text>}
                keyExtractor={item => item}
                
            />
        </SafeAreaView>
    );
};
