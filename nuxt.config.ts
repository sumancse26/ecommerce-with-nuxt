// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: ['~/assets/main.css'],
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
                { src: '/assets/js/jquery-3.7.1.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/popper.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/bootstrap/js/bootstrap.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/owlcarousel/js/owl.carousel.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/magnific-popup.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/waypoints.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/parallax.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/jquery.countdown.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/imagesloaded.pkgd.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/isotope.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/jquery.dd.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/slick.min.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/jquery.elevatezoom.js', type: 'text/javascript', defer: true },
                { src: '/assets/js/scripts.js', type: 'text/javascript', defer: true }
            ]
        }
    }
});
