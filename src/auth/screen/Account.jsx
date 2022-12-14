import React, { useContext} from "react";
import {View, Text, StyleSheet} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { EncabezadoProfile } from "../../components/EncabezadoProfile";

export const Account = () => {

    const {user} = useContext(AuthContext);

    const url = 'https://www.bbvaopenmind.com/wp-content/uploads/2013/02/BBVA-OpenMind-Fronteras-9-El-siglo-del-gen-Biologi%CC%81a-molecular-y-gene%CC%81tica-Gines-morata.jpg';
    const uriProfile = 'http://www.ateneo.edu/sites/default/files/2021-11/istockphoto-517998264-612x612.jpeg';

    return (
        <View style={styles.container} >
            <EncabezadoProfile uirBackground={url} uriProfile={uriProfile} userName={`${user.firstname}`} />

            <View >
                <Text style={{color: '#000'}} > Nombre:  { `${user.firstname} ${user.lastname}` }  </Text>
                <Text style={{color: '#000'}} > Titulo Academico: {user.academicTitle} </Text>
                <Text style={{color: '#000'}}> Correo:  {user.email}  </Text>
                <Text style={{color: '#000'}}> Rol:  {user.Rol}  </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    
})