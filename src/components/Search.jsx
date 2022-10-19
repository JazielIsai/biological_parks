import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from "react-native";
import CheckBox from '@react-native-community/checkbox';

export const Search = () => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)


    return(
        <View
            style={styles.container}
        >
            <View style={styles.filter}>
                
                <View style={styles.search}>
                    <Text
                        style={styles.searchText}
                    >
                        Buscar
                    </Text>
                    <TextInput
                        placeholder={'Buscar'}  
                        underlineColorAndroid={'blue'}
                        style={styles.searchTextInput}
                    />
                </View>

                <View style={styles.optionFilter} >
                    <Text
                        style={styles.searchText}
                    > 
                        Filtrar:
                    </Text>

                    <View style={styles.filterOption}>
                        <Text> Parque </Text>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                    </View>

                    <View style={styles.filterOption}>
                        <Text> Fauna </Text>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                    </View>
                    
                    <View style={styles.filterOption}>
                        <Text> Aves </Text>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                    </View>

                    <View style={styles.filterOption}>
                        <Text> Parques </Text>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                    </View>

                    <View style={styles.filterOption}>
                        <Text> Parques </Text>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                    </View>

                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filter: {
        margin: 4,
        
    },
    search: {
        flexDirection: 'row',
        margin: 'auto',
        alignItems: 'center',
        marginBottom: 5,
          
    },
    searchText:{
        marginRight: 6,
        marginLeft: 6,
        fontSize: 14,
    },
    searchTextInput: {
        display: 'flex',
        width: 250,
        height: 40,
        fontSize: 14,
    },
    optionFilter: {
        flexDirection: 'row',
        margin: 'auto',
        alignItems: 'center',
        marginBottom: 5,
    },
    filterOption: {
        flexDirection: 'row',
        margin: 'auto',
        alignItems: 'center',
    }
});