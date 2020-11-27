import { basePath, apiVersion } from './config';

export function suscribeNwesletterApi( email ){
    const url = `${ basePath }/${ apiVersion }/suscribe-newsletter/${ email.toLowerCase()}`;
    const params = {
        method : 'POST',
    }

    return fetch ( url, params )
        .then( response => response )
        .then( result => result )
        .catch( err => err );
}