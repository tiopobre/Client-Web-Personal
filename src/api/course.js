import { basePath, apiVersion}  from "./config";

export  function getCoursesApi ( ){
    const url = `${ basePath }/${ apiVersion }/get-courses`; 
    return fetch( url )
    .then( response => response.json() )
    .then( result => result )
    .catch( error => error ) ;
}

export  function getCourseDataUdemyApi ( id ){
    const baseurl = `https://www.udemy.com/api-2.0/courses/${ id }/`;
    const coursesParams = '?fields[course]=title,headline,url,price,image_480x270';
    const url = baseurl + coursesParams;

    return fetch ( url )
        .then( async response => {
            return { code: response.status, data: await response.json() };
        })
        .then( result => result )
        .catch( error => error );
}

export  function deleteCourseApi ( token, curseId ){
    const url = `${ basePath }/${ apiVersion }/delete-course/${ curseId }`; 
    const params = {
        method  : 'DELETE',
        headers : {
            "Content-type": "application/json",
            Authorization : token
        }
    }
    return fetch( url, params )
        .then ( response => response.json() )
        .then( result => result.message )
        .catch( error =>  error );

}

export  function updateCourseApi ( token, curseId, curseData ){
    const url = `${ basePath }/${ apiVersion }/update-course/${ curseId }`;  
    const params = {
        method  : 'PUT',
        body    : JSON.stringify( curseData ),
        headers :{
            Authorization   : token,
            'Content-type'  : 'application/json'
        }
    }
    return fetch ( url, params )
        .then( response => response.json() ) 
        .then( result => result.message )
        .catch( error =>   error );
}

export  function addCourseApi ( token, curseData ){
    const url = `${ basePath }/${ apiVersion }/add-course`;  
    const params = {
        method  : 'POST',
        body    : JSON.stringify( curseData ),
        headers :{
            Authorization   : token,
            'Content-type'  : 'application/json'
        }
    }
    return fetch ( url, params )
    .then( response => response.json() ) 
    .then( result => result.message )
    .catch( error => error );
}