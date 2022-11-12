import React, {useContext, useState, useEffect} from "react";
import {View, Text, TextInput, StyleSheet, VirtualizedList, FlatList, SafeAreaView} from "react-native";
import { AuthContext } from "../../auth/context/AuthContext";
import { useFetchGet } from "../../hooks/useFetchGet";
import { CardImg } from "../../components/CardImg";
import { urlImg } from "../../Shared/baseUrl";

export const ViewImg = () => {

    const { user } = useContext(AuthContext);
    const { data } = useFetchGet(`get_join_tables_images&parks_user_id=${user.id}&biologic_user_id=${user.id}`);
    const [getImgJoinTable, setImgJoinTable] = useState([]);

    const  uri = 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80';

    useEffect( ()=> {
        try {
            console.log(data);
            setImgJoinTable(JSON.parse(data));
        } catch (err) {
            console.log("This is err: ",err);
        }
    },[data] )

    return (
        <SafeAreaView style={styles.container} >
            <FlatList
                data={getImgJoinTable}
                renderItem={ ({item}) => (<CardImg uri = {`${urlImg}${item.ruta}`} /> ) }
                keyExtractor={ (item, index) => index.toString() }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',

    }
})