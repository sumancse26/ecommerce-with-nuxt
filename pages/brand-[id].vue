<script setup>
    const { $axios } = useNuxtApp();

    const route = useRoute();
    const id = route.params.id;
    const brandName = route.query.name;
    const products = ref([]);
    const tagInfo = ref({ tagName: 'brand', tagValue: brandName });

    const getProductByBrand = async (brandId) => {
        try {
            products.value = [];
            const res = await $axios.get(`/product-list-by-brand/${brandId}`);
            products.value = res.data.productList;
        } catch (e) {
            products.value = [];
            console.log(e);
        }
    };

    getProductByBrand(id);
</script>

<template>
    <div>
        <div class="main_content">
            <FrontendProducts :tag="tagInfo" :products="products" />
            <FrontendPolicy />
        </div>

        <a href="#" class="scrollup" style="display: none"><i class="ion-ios-arrow-up"></i></a>
    </div>
</template>
