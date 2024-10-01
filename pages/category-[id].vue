<script setup>
    const { $axios } = useNuxtApp();

    const route = useRoute();
    const id = route.params.id;
    const catName = route.query.name;
    const products = ref([]);
    const tagInfo = ref({ tagName: 'category', tagValue: catName });

    const getProductByCategory = async (catId) => {
        try {
            products.value = [];
            const res = await $axios.get(`/product-list-by-category/${catId}`);
            products.value = res.data.productList;
        } catch (e) {
            products.value = [];
            console.log(e);
        }
    };

    getProductByCategory(id);
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
