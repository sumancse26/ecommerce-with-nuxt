<script setup>
    import Cookies from 'js-cookie';
    import { useEcomStore } from '~/store/ecomStore';

    const store = useEcomStore();
    const { $axios } = useNuxtApp();
    const token = Cookies.get('token');
    const products = ref([]);
    const getProducts = async () => {
        try {
            products.value = [];
            const res = await $axios.get('/get-products');
            products.value = res.data.products;
        } catch (e) {
            products.value = [];
            console.log(e);
        }
    };

    const getCart = async () => {
        try {
            const res = await $axios.get('/get-cart-list');
            store.cartList = res.data.cartList || [];
        } catch (e) {
            console.log(e);
        }
    };

    const getWishList = async () => {
        try {
            const res = await $axios.get(`/get-wish-list`);
            store.wishList = res.data.wishList || [];
        } catch (e) {
            console.log(e);
        }
    };
    onMounted(() => {
        getProducts();
        if (token) {
            getCart();
            getWishList();
        }
    });
</script>

<template>
    <div>
        <div class="main_content">
            <FrontendBanner />
            <FrontendProducts :products="products" tag="allProducts" />
            <FrontendNewCollection />
            <FrontendProducts :products="products" tag="exclusiveProducts" />
            <FrontendPolicy />
            <FrontendNewsLetter />
        </div>

        <a href="#" class="scrollup" style="display: none"><i class="ion-ios-arrow-up"></i></a>
    </div>
</template>
