<script setup>
    const { $axios } = useNuxtApp();
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

    onMounted(() => {
        getProducts();
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
        </div>

        <a href="#" class="scrollup" style="display: none"><i class="ion-ios-arrow-up"></i></a>
    </div>
</template>
