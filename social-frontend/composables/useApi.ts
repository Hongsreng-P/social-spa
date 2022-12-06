import {Post} from '@/constants/types';

export function useApi(endpoint: string) {

    const submit = async <T> (
        method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
        route: string,
        payload?: T
    ) => {
        const authenticationToken = useCookie<string>('jwt');
        const reqOption = {
            initialCache: false,
            headers: {'Authorization': `Bearer ${authenticationToken.value}`},
            key: `${method}${endpoint}`,
        };
        const runTimeConfig = useRuntimeConfig();
        const baseURL = runTimeConfig.public.baseURL;
        const url = `${baseURL}/${endpoint}/${route}`;

        let res;
        if (method === 'GET' || method === 'DELETE') {
            res = await useFetch(url, {
                ...reqOption,
                method: method,
            });
        } else {
            res = await useFetch(url, {
                ...reqOption,
                method: method,
                body: payload
            });
        }
        return res;
    };

    return {
        get: (route: string = '') => submit('GET', route),

        // Template T for body payload type
        post: <T>(route: string = '', payload: T) => submit<T>('POST', route, payload),
        patch: <T>(route:string='', payload: T) => submit<T>('PATCH', route, payload),

        delete: (route:string = '') => submit('DELETE', route),
    };
};