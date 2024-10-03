<script setup>
    import { useEcomStore } from '~/store/ecomStore';

    const { $axios } = useNuxtApp();
    const store = useEcomStore();

    const removeFromWishList = async (id) => {
        try {
            if (!id) return;
            await $axios.delete(`/delete-wish-list/${id}`);
            getWishList();
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

    const addToCartHandler = async (wish) => {
        try {
            const data = {
                id: null,
                product_id: wish.product_id,
                color: '',
                size: '',
                qty: null
            };
            await $axios.post('/create-update-cart', [data]);
            removeFromWishList(wish.id);
            getCart();
        } catch (e) {
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

    const wishList = computed(() => {
        return store.wishList;
    });
</script>

<template>
    <FrontendBreadcum title="Wish List" />

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="table-responsive wishlist_table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="product-thumbnail">&nbsp;</th>
                                <th class="product-name">Product</th>
                                <th class="product-price">Price</th>
                                <th class="product-stock-status">Stock Status</th>
                                <th class="product-add-to-cart"></th>
                                <th class="product-remove">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="wish in wishList" :key="wish.id">
                                <td class="product-thumbnail">
                                    <NuxtLink :to="`product-details/${wish.id}`"
                                        ><img :src="wish.product?.image" alt="product1"
                                    /></NuxtLink>
                                </td>
                                <td class="product-name" data-title="Product">
                                    <NuxtLink :to="`product-details/${wish.id}`">{{ wish.product?.title }}</NuxtLink>
                                </td>
                                <td class="product-price" data-title="Price">${{ wish.product?.price }}</td>
                                <td class="product-stock-status" data-title="Stock Status">
                                    <span class="badge rounded-pill text-bg-success">{{ wish.product?.stock }}</span>
                                </td>
                                <td class="product-add-to-cart">
                                    <a @click="addToCartHandler(wish)" class="btn btn-fill-out"
                                        ><i class="icon-basket-loaded"></i> Add to Cart</a
                                    >
                                </td>
                                <td class="product-remove" data-title="Remove">
                                    <a @click="removeFromWishList(wish.id)"><i class="ti-close"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
