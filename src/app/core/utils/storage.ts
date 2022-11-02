export const TOKEN_KEY = 'OAuthToken';
export const PERMISO_KEY = 'Permisos';
export const USER_DATA_KEY = 'UserData';
export const MODULOS_KEY = 'Modulos';


export const getState = (name: string) => {
    try {
        const state = localStorage.getItem(name);
        if (state === null) return undefined;
        const isObject = /^{.{1,}}/;
        return isObject.test(state) ? JSON.parse(state) : state;
    } catch (err) {
        return undefined;
    }
};

export const setState = (name: string, value: any) => {
    try {
        let state = value;
        if (typeof value === 'object') state = JSON.stringify(value);
        localStorage.setItem(name, state);
    } catch (err) {
        console.log('Error saving localStorage');
    }
};

export const clearState = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.log('Error clearing localStorage');
    }
};
