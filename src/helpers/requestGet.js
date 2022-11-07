import { urlBD } from "../Shared/baseUrl";

export async function requestGet (serviceName) {

    try {
        const responseGet = await fetch(urlBD.concat(serviceName))
        const response = responseGet.text();
        return response;

    }catch (err) {
        console.log(err)
    }
    
}