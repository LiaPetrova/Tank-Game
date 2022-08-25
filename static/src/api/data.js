import { getUserData } from "../util.js";

export function createPointer (classname, objectId) {
     return {
        '__type': 'Pointer',
        className: classname,
        objectId
     }
}

export function addOwner(item) {
    const userData = getUserData();
    item.owner = createPointer('_User', userData.id);
}

// {
//     "__type": "Pointer",
//     "className": "_User",
//     "objectId": "gQGlQlFQD1"
// }