<script setup>
    import { useEcomStore } from '@/store/ecomStore';
    const store = useEcomStore();
    const { $axios } = useNuxtApp();

    const removeCardHandler = async (id) => {
        try {
            await $axios.delete(`/remove-cart/${id}`);
            getCartList();
        } catch (e) {
            console.log(e);
        }
    };

    const getCartList = async () => {
        try {
            const res = await $axios.get('/get-cart-list');
            store.cartList = res.data.cartList || [];
        } catch (e) {
            console.log(e);
        }
    };

    const decrementQty = (cart) => {
        cart.qty > 1 ? cart.qty-- : (cart.qty = 1);
        cart.price = Number(cart.product.price) * Number(cart.qty);

        return cart;
    };

    const incrementQty = (cart) => {
        cart.qty <= cart.product?.stock ? cart.qty++ : (cart.qty = cart.product?.stock);
        cart.price = Number(cart.product.price) * Number(cart.qty);

        return cart;
    };

    const inputQtyHandler = (cart) => {
        if (cart.qty > cart.product?.stock) {
            cart.qty = cart.product?.stock;
        }
        cart.price = Number(cart.product.price) * Number(cart.qty);

        return cart;
    };

    const updateCartHandler = async () => {
        try {
            const carts = getCart.value.map((cart) => {
                return {
                    id: cart.id || null,
                    product_id: cart.product_id,
                    color: cart.color,
                    size: cart.size,
                    qty: cart.qty
                };
            });
            await $axios.post('/create-update-cart', carts);
        } catch (e) {
            console.log(e);
        }
    };

    const checkoutHandler = async () => {
        try {
            await updateCartHandler();

            navigateTo('/checkout');
        } catch (e) {
            console.log(e);
        }
    };

    const getCart = computed(() => {
        return store.cartList;
    });

    const subTotal = computed(() => {
        return getCart.value.reduce((total, item) => {
            return total + Number(item.price);
        }, 0);
    });
</script>

<template>
    <FrontendBreadcum title="Cart List" />

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="table-responsive shop_cart_table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="product-thumbnail">&nbsp;</th>
                                <th class="product-name">Product</th>
                                <th class="product-price">Price</th>
                                <th class="product-quantity">Quantity</th>
                                <th class="product-subtotal">Total</th>
                                <th class="product-remove">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cart in getCart" :key="cart.id">
                                <td class="product-thumbnail">
                                    <NuxtLink :to="`product-details/${cart.product?.id}`"
                                        ><img :src="cart.product?.image" alt="product1"
                                    /></NuxtLink>
                                </td>
                                <td class="product-name" data-title="Product">
                                    <NuxtLink :to="`product-details/${cart.product?.id}`">{{
                                        cart.product?.title
                                    }}</NuxtLink>
                                </td>
                                <td class="product-price" data-title="Price">${{ cart.product?.price }}</td>
                                <td class="product-quantity" data-title="Quantity">
                                    <div class="quantity">
                                        <input type="button" value="-" class="minus" @click="decrementQty(cart)" />
                                        <input
                                            v-model="cart.qty"
                                            type="text"
                                            name="quantity"
                                            title="Qty"
                                            class="qty"
                                            size="4"
                                            @input="inputQtyHandler(cart)" />
                                        <input type="button" value="+" class="plus" @click="incrementQty(cart)" />
                                    </div>
                                </td>
                                <td class="product-subtotal" data-title="Total">${{ cart.price }}</td>
                                <td class="product-remove" data-title="Remove">
                                    <a @click="removeCardHandler(cart.id)"><i class="ti-close"></i></a>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="6" class="px-0">
                                    <div class="row g-0 align-items-center">
                                        <div class="col-lg-4 col-md-6 mb-3 mb-md-0">
                                            <div class="coupon field_form input-group">
                                                <input
                                                    type="text"
                                                    value=""
                                                    class="form-control form-control-sm"
                                                    placeholder="Enter Coupon Code.." />
                                                <div class="input-group-append">
                                                    <button class="btn btn-fill-out btn-sm" type="submit">
                                                        Apply Coupon
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-8 col-md-6 text-start text-md-end">
                                            <button
                                                class="btn btn-line-fill btn-sm"
                                                type="submit"
                                                @click="updateCartHandler">
                                                Update Cart
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="heading_s1 mb-3">
                    <h6>Calculate Shipping</h6>
                </div>
                <form class="field_form shipping_calculator">
                    <div class="form-row">
                        <div class="form-group col-lg-12 mb-3">
                            <div class="custom_select">
                                <select class="form-control">
                                    <option value="">Choose a option...</option>
                                    <option value="AX">Aland Islands</option>
                                    <option value="AF">Afghanistan</option>
                                    <option value="AL">Albania</option>
                                    <option value="DZ">Algeria</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-lg-6 mb-3">
                            <input
                                required="required"
                                placeholder="State / Country"
                                class="form-control"
                                name="name"
                                type="text" />
                        </div>
                        <div class="form-group col-lg-6 mb-3">
                            <input
                                required="required"
                                placeholder="PostCode / ZIP"
                                class="form-control"
                                name="name"
                                type="text" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-lg-12 mb-3">
                            <button class="btn btn-fill-line" type="submit">Update Totals</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <div class="border p-3 p-md-4">
                    <div class="heading_s1 mb-3">
                        <h6>Cart Totals</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td class="cart_total_label">Cart Subtotal</td>
                                    <td class="cart_total_amount">${{ subTotal }}</td>
                                </tr>
                                <tr>
                                    <td class="cart_total_label">Shipping</td>
                                    <td class="cart_total_amount">Free Shipping</td>
                                </tr>
                                <tr>
                                    <td class="cart_total_label">Total</td>
                                    <td class="cart_total_amount">
                                        <strong>${{ subTotal }}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <a @click="checkoutHandler" class="btn btn-fill-out">Proceed To CheckOut</a>
                </div>
            </div>
        </div>
    </div>
</template>
