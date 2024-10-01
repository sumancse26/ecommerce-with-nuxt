// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.VITE_API_URL || 'http://ecommerce.test/api'
        }
    },
    devtools: { enabled: true },
    css: ['~/assets/main.css'],
    modules: ['@pinia/nuxt'],

    app: {
        head: {
            title: 'Nuxt TypeScript',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap'
                }
            ],
            script: [
                { src: '/assets/js/jquery-3.7.1.min.js', type: 'text/javascript' },
                { src: '/assets/js/popper.min.js', type: 'text/javascript' },
                { src: '/assets/bootstrap/js/bootstrap.min.js', type: 'text/javascript' }
            ]
        }
    }
});
