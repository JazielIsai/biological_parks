import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList, ScrollView} from "react-native";
// import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

import { Search } from '../../components/Search';
import { useFetchGet } from '../../hooks/useFetchGet';
import { useForm } from '../../hooks/useForm';

export const ViewsScreen = () => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [getSearch, setSearch] = useState('');

    const {onChange, onReset, form} = useForm({});

    const {data : getAllCategory} = useFetchGet('get_all_category');

    const [getCategorie, setGetCategorie] = useState([]);

    useEffect ( ( ) => {
        try {
            setGetCategorie(JSON.parse(getAllCategory));
        } catch (err) {
            console.log(err);
        }

    }, [getAllCategory] )

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

                    
                    {/* <View style={styles.filterOption}>
                        <Text> Aves </Text>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                    </View> */}

                    <Picker
                        selectedValue={form.idCategory}
                        onValueChange={(itemValue, itemIndex) => onChange(itemValue, 'idCategory')}
                        style={{height: 50, width: 250}}
                    >
                        <Picker.Item label={'Todas las categorias'} value='default' />
                        {
                            getCategorie !== undefined && 
                            getCategorie !== null && 
                                getCategorie.map( (item, index) => (
                                    <Picker.Item key={index} label={item.description} value={item.id} />
                                ))
                        }
                    </Picker>
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
        marginLeft: 8,
        fontSize: 14,
    },
    searchTextInput: {
        display: 'flex',
        width: 250,
        height: 40,
        fontSize: 14,
    },
    optionFilter: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 5,
        
    },
    filterOption: {
        flexDirection: 'row',
        margin: 'auto',
        alignItems: 'center',
    }
});
