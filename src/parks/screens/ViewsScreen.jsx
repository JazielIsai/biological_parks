import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, LogBox, FlatList, StyleSheet, ScrollView} from "react-native";
// import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

import { Search } from '../../components/Search';
import { useFetchGet } from '../../hooks/useFetchGet';
import { useForm } from '../../hooks/useForm';
import { requestGet } from '../../helpers/requestGet';
import { CardText } from '../../components/CardText';
import { CardImg } from '../../components/CardImg';
import { urlImg } from '../../Shared/baseUrl';
import { useNavigation } from '@react-navigation/native';

export const ViewsScreen = () => {

    const navigation = useNavigation();

    const [getSearch, setSearch] = useState('');
    const {onChange, onReset, form} = useForm({});

    const {data : getAllCategory} = useFetchGet('get_all_category');

    const [getCategorie, setGetCategorie] = useState([]);
    const [getAllDataImgBiologicDataAndParks, setAllDataImgBiologicDataAndParks] = useState([]);

    useEffect ( () => {
        try {
            
            setGetCategorie(JSON.parse(getAllCategory));
            
            requestGet('get_all_data_img_biologic_data_and_parks')
                .then( resp => {
                    setAllDataImgBiologicDataAndParks(JSON.parse(resp));
                })
                .catch( err => {
                    console.log(err);
                })
            
            LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
            

        } catch (err) {
            console.log(err);
        }

    }, [getAllCategory] )

    const renderItems = ({item, index}) => {
        console.log(item);
        return (
            item.verificate === 'Biologic Data'
                ?
                    <CardText
                        title = {item.names}
                        subtitle = {item.column1}
                        description = {
                            <>
                                <Text> {item.column2} </Text>
                                <Text>  </Text>
                                <Text> {item.column3} </Text>
                                <Text>  </Text>
                                <Text> {item.column4} </Text>
                            </>
                        }
                        onPressLink
                        link
                    />
                : item.verificate === 'Parks Data' ?
                    <CardText
                        title = {item.names}
                        subtitle = {item.column1}
                        description = {
                            <>
                                <Text> {item.column4} </Text>
                                <Text>  </Text>
                                <Text> {item.column5} </Text>
                            </>
                        }
                        onPressLink = {() => navigation.navigate('Parks', {id: item.id})}
                        link = 'See more'
                    />
                : item.verificate === 'img parks data' | item.verificate === 'img biologic data' ?
                    <CardImg
                        uri = {`${urlImg}${item.column2}`}
                    />
                : ''
        )
    }

    return (
        <View
            style={styles.container}
        >

            <View style={styles.filter}>
                
                <View style={styles.search}>
                    <Text
                        style={styles.searchText}
                    >
                        Buscar por nombre de la ficha, nombre del parque o nombre de la imagen
                    </Text>
                    <TextInput
                        placeholder={'Buscar por nombre'}  
                        underlineColorAndroid={'blue'}
                        style={styles.searchTextInput}
                        onChangeText={ (text) => setSearch(text) }
                        value={getSearch}
                    />
                </View>

                {/* <View style={styles.optionFilter} >
                    <Text
                        style={styles.searchText}
                    > 
                        Filtrar por:
                    </Text>

                    <Picker
                        selectedValue={form.format}
                        onValueChange={(itemValue, itemIndex) => onChange(itemValue, 'format')}
                        style={{height: 50, width: 250}}
                    >
                        <Picker.Item label={'Parques, Fichas Biologicas o Imagenes'} value='default' />
                        <Picker.Item label={'Parques'} value='parks' />
                        <Picker.Item label={'Fichas Biologicas'} value='BiologicData' />
                        <Picker.Item label={'Imagenes'} value='Img' />
                    </Picker>
                </View> */}

                {/* <View style={styles.optionFilter} >
                    <Text
                        style={styles.searchText}
                    > 
                        Filtrar por:
                    </Text>

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
                </View> */}


            </View>

            <ScrollView>
                {
                    getSearch !== '' ? (
                        <Search getSearch={getSearch} />
                    ) : (
                            <FlatList
                                data={getAllDataImgBiologicDataAndParks}
                                renderItem={ renderItems }
                                keyExtractor={ (item, index) => index.toString() }
                            />
                    )                    
                }

            </ScrollView>
            
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    filter: {
        margin: 4,
        color: '#000'
        
    },
    search: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center',
        marginBottom: 5,
        color: '#000'
          
    },
    searchText:{
        marginRight: 6,
        marginLeft: 8,
        fontSize: 14,
        color: '#000'
    },
    searchTextInput: {
        display: 'flex',
        width: 250,
        height: 40,
        fontSize: 14,
        color: '#000'
    },
    optionFilter: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 5,
        color: '#000'
        
    },
    filterOption: {
        flexDirection: 'row',
        margin: 'auto',
        alignItems: 'center',
        color: '#000'
    }
});
