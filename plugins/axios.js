import axiosLib from 'axios';
import Cookies from 'js-cookie';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const axios = axiosLib.create({
        baseURL: config.public.apiBaseUrl,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const onRequestHandler = (config) => {
        const token = Cookies.get('token');

        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    };

    const onResponseHandler = (response) => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    };

    const onErrorHandler = (error) => {
        const status = error.response?.status || 500;

        if (!error.config?.url?.endsWith('login') && status == 401) {
            location.reload();
            Cookies.remove('token');
        }
        const messages = {
            400: 'Bad request',
            401: 'Unauthorized request',
            403: 'Access forbidden',
            404: 'URL not exists',
            500: 'Internal server error',
            502: 'Bad gateway'
        };

        console.error(`[${messages[status]}]: `, error.message);
        return Promise.reject(error.response || error.message);
    };

    axios.interceptors.request.use(onRequestHandler, onErrorHandler);
    axios.interceptors.response.use(onResponseHandler, onErrorHandler);

    // Provide axios globally in Nuxt app
    nuxtApp.provide('axios', axios);
});
