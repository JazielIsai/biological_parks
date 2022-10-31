import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet} from "react-native";
import { useFetchGet } from '../hooks/useFetchGet';
import { CardText } from './CardText';

export const Search = ({getSearch}) => {
    console.log(" This is the search ",getSearch);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const { data } = useFetchGet(`get_all_biologic_data_by_scientific_data&search_scientific_data=${search}`);

    useEffect ( () => {
        try {
            console.log(JSON.parse(data));
            setSearch(getSearch);
            setSearchData(JSON.parse(data));
        } catch (error) {
            console.log("The error is: ",error);
        }
    }, [data, getSearch] )

    return(
        <View>
            {
                searchData !== null &&
                searchData !== undefined &&
                    searchData.map( (item, index) => (
                        <CardText 
                            key={index}
                            title={item.scientificName}
                            subtitle={item.commonName}
                            description={item.description}
                            link={item.user}

                        />
                    ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});