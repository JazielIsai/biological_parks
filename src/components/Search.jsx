import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, LogBox, FlatList, StyleSheet} from "react-native";
import { useFetchGet } from '../hooks/useFetchGet';
import { CardImg } from './CardImg';
import { CardText } from './CardText';
import { urlImg } from '../Shared/baseUrl';
import { useNavigation } from '@react-navigation/native';

export const Search = ({getSearch}) => {
    console.log(" This is the search ",getSearch);
    const [search, setSearch] = useState('');
    
    const [searchData, setSearchData] = useState([]);
    const { data } = useFetchGet(`search_data_img_parks_biologic_data&commonName=${search}&namePark=${search}&img1=${search}&img2=${search}`);

    const navigation = useNavigation();

    useEffect ( () => {
        try {
            setSearch(getSearch);
            setSearchData(JSON.parse(data));
            
            LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

        } catch (error) {
            console.log("The error is: ",error);
        }
    }, [data, getSearch] )

    const renderItems = ({item, index}) => {
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

    return(
        <View>
            {
                searchData !== null &&
                searchData !== undefined &&
                    <FlatList 
                        data = {searchData}
                        renderItem = {renderItems}
                        keyExtractor = { (item, index) => index.toString() }
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#000',
    },

});