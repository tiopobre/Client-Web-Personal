import { basePath, apiVersion}  from "./config";

export function getMenusApi() {
    const url = `${ basePath }/${ apiVersion }/get-menus`;

    return fetch ( url )
    .then( response => response.json() )
    .then( result => result )
    .catch( err => err.message );
}

export function updateMenuApi( token, menuid, data ) {
    const url = `${ basePath }/${ apiVersion }/update-menu/${ menuid }`; 
    const params = {
        method : "PUT",
        body : JSON.stringify( data ),
        headers : {
            "Content-type": "application/json",
            Authorization : token
        }
    }

    return fetch( url, params )
        .then ( response => response.json() )
        .then( result => result.message )
        .catch( err =>  err )
}

export function activateMenuApi( token, menuid, status ) {
    const url = `${ basePath }/${ apiVersion }/activate-menu/${ menuid }`; 
    const params = {
        method : "PUT",
        body : JSON.stringify({ active : status }),
        headers : {
            "Content-type": "application/json",
            Authorization : token
        }
    }
   
    return fetch( url, params )
        .then ( response => response.json() )
        .then( result => result.message )
        .catch( err => console.log( err ) );
}

export function addMenuApi( token, menu ){
    const url = `${ basePath }/${ apiVersion }/add-menu/`; 
    const params = {
        method : "Post",
        body : JSON.stringify( menu ),
        headers : {
            "Content-type": "application/json",
            Authorization : token
        }
    }

    return fetch( url, params )
        .then( response => response.json() )
        .then( result => result.message )
        .catch( err => console.log( err ) );
} 


export function deleteMenuApi( token, menuid ) {
    const url = `${ basePath }/${ apiVersion }/delete-menu/${ menuid }`;
    const params = {
        method : "DELETE",
        headers : {
            "Content-type": "application/json",
            Authorization : token
        }
    } 
    return fetch( url, params )
        .then( response => { return response.json() } )
        .then( result => { return result.message } )
        .catch( err => { return console.log(err) });

}