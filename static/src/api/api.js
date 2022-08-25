import { clearUserData, getUserData } from "../util.js";

const host = 'https://parseapi.back4app.com';
const appId = 'f3ZB4nuUyrdx6casREomYpxUN1USPiouzVNYlLao';
const apiKey = '7aUXOfhsAwSfYagq96DU7b2kj8Ldo2o4gHRdOLYd';

 async function request (url, method, data){
     
     const options = {
         method,
         headers: {
             'X-Parse-Application-Id': appId,
             'X-Parse-REST-API-Key': apiKey
            }
        }
        
        if(url.slice(0,6) == '/users' || url.slice(0,6) == '/login') {
            options.headers['X-Parse-Revocable-Session'] = 1;    
        } else {
            url = '/classes' + url;
        }
    if(data != undefined) {
        options.headers['Content-Type'] = 'applications/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if(userData) {
        options.headers['X-Parse-Session-Token'] = userData.sessionToken;
    }

    try {
      const res = await fetch(host + url, options);

    if(res.ok != true) {
        if (res.status == 403) {
            clearUserData();
        }
        const error = await res.json();
        const err = new Error(error.error);
        err.code = error.code;
        throw err;
    }

    if(res.status == 204) {
        return res;
    } else {
        return res.json();
    }  
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function get(url) {
    return (request(url, 'get'));
}

export async function post(url, data) {
    return request(url, 'post', data);
}

export async function put(url, data) {
    return request(url, 'put', data);
}

export async function det(url) {
    return request(url, 'delete');
}