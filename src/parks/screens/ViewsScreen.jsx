import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, VirtualizedList, ScrollView} from "react-native";
import CheckBox from '@react-native-community/checkbox';

import { Search } from '../../components/Search';

export const ViewsScreen = () => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [getSearch, setSearch] = useState('');

    return (
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
                        onChangeText={ (text) => setSearch(text) }
                        value={getSearch}
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


                </View>

            </View>

            <ScrollView>
                {
                    getSearch !== '' &&
                        <Search getSearch={getSearch} />
                }
            </ScrollView>
            
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
