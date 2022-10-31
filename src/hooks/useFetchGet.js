import React, { useState, useEffect } from 'react';
import { urlBD } from '../Shared/baseUrl';

export const useFetchGet = ( nameServices ) =>{

    console.log("The nameServices is: ", urlBD.concat(nameServices));

    const [ stateData, setStateData ] = useState( {
        data: null,
        loading: true,
        error: null
    });


    useEffect( () => {

        setStateData({
            data: null,
            loading: true,
            error: null
        })

        fetch( urlBD.concat(nameServices) )
            .then( resp => resp.text() )
            .then( data => {
                console.log(data);
                setStateData({
                    loading: false,
                    error: null,
                    data: data
                });

            })
            .catch( err => console.log("The error is by: ",err) )

    }, [nameServices] )

    return stateData;
    
}
