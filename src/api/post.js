import { basePath, apiVersion}  from "./config";
export function getPostsApi( limit, page ) {
    const url = `${ basePath }/${ apiVersion }/get-posts?limit=${ limit }&page=${ page }`;

    return fetch ( url )
    .then( response => response.json() )
    .then( result => result )
    .catch( err => err );
}

export function getPostApi( urlPost ){
    const url = `${ basePath }/${ apiVersion }/get-post/${ urlPost }`;
    return fetch ( url )
    .then( response => response.json() )
    .then( result => result )
    .catch( err => err );
}

export function deletePostApi( token, postId ) {
    const url = `${ basePath }/${ apiVersion }/delete-post/${ postId }`;
    const params = {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization : token,
        } 
    }
    return fetch ( url, params )
    .then( response => response.json() )
    .then( result => result )
    .catch( err => err );
}

export function addPostApi( token, post ){
    const url = `${ basePath }/${ apiVersion }/add-post`;
    const params = {
        method : "Post",
        body : JSON.stringify( post ),
        headers : {
            "Content-type": "application/json",
            Authorization : token
        }
    }
    return fetch( url, params )
        .then( response => response.json() )
        .then( result => result )
        .catch( err => console.log( err ) );
}

export function updatePostApi( token, postId, data ){
    const url = `${ basePath }/${ apiVersion }/update-post/${ postId }`;
    const params = {
        method : "PUT",
        body : JSON.stringify( data ),
        headers : {
            "Content-type": "application/json",
            Authorization : token
        }
    }
    return fetch( url, params )
        .then( response => response.json() )
        .then( result => result )
        .catch( err => console.log( err ) );
}