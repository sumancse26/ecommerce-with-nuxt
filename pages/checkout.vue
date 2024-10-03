<script setup>
    import { useEcomStore } from '@/store/ecomStore';

    const { $axios } = useNuxtApp();
    const store = useEcomStore();

    const billingDtl = ref({});

    const placeOrderBtnHandler = async () => {
        try {
            const data = {
                ...billingDtl.value,
                cus_state: billingDtl.value.cus_city,
                cus_fax: billingDtl.value.cus_phone,
                ship_name: billingDtl.value.cus_name,
                ship_add: billingDtl.value.cus_add,
                ship_city: billingDtl.value.cus_city,
                ship_state: billingDtl.value.cus_city,
                ship_postcode: billingDtl.value.cus_postcode,
                ship_country: billingDtl.value.cus_country,
                ship_phone: billingDtl.value.cus_phone
            };
            console.log(data);

            await $axios.post('/create-update-profile', data);
            const res = await $axios.post('/create-invoice');
            store.cartList = [];
            store.paymentMethods = res.data.paymentMethods || [];
            navigateTo('/payment');
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
    <FrontendBreadcum title="Checkout" />

    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="heading_s1">
                    <h4>Billing Details</h4>
                </div>
                <form method="post">
                    <div class="form-group mb-3">
                        <input
                            v-model.trim="billingDtl.cus_name"
                            type="text"
                            required
                            class="form-control"
                            name="fname"
                            placeholder="name *" />
                    </div>
                    <!-- <div class="form-group mb-3">
                        <input class="form-control" required type="text" name="cname" placeholder="Company Name" />
                    </div> -->
                    <div class="form-group mb-3">
                        <div class="custom_select">
                            <select class="form-control" v-model="billingDtl.cus_country">
                                <option selected value="null" disabled>Select a Country...</option>
                                <option value="AX">Aland Islands</option>
                                <option value="AF">Afghanistan</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="BD">Bangladesh</option>
                                <option value="CAD">Canada</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <input
                            v-model="billingDtl.cus_add"
                            type="text"
                            class="form-control"
                            name="billing_address"
                            required=""
                            placeholder="Address *" />
                    </div>
                    <div class="form-group mb-3">
                        <input
                            v-model="billingDtl.cus_city"
                            type="text"
                            class="form-control"
                            name="billing_address2"
                            required=""
                            placeholder="City" />
                    </div>
                    <!-- <div class="form-group mb-3">
                        <input class="form-control" required type="text" name="city" placeholder="City / Town *" />
                    </div>
                    <div class="form-group mb-3">
                        <input class="form-control" required type="text" name="state" placeholder="State / County *" />
                    </div> -->
                    <div class="form-group mb-3">
                        <input
                            v-model="billingDtl.cus_postcode"
                            class="form-control"
                            required
                            type="text"
                            name="zipcode"
                            placeholder="Postcode / ZIP *" />
                    </div>
                    <div class="form-group mb-3">
                        <input
                            v-model="billingDtl.cus_phone"
                            class="form-control"
                            required
                            type="text"
                            name="phone"
                            placeholder="Phone *" />
                    </div>
                    <!-- <div class="form-group mb-3">
                        <input class="form-control" required type="text" name="email" placeholder="Email address *" />
                    </div> -->
                    <!-- <div class="form-group mb-3">
                        <div class="chek-form">
                            <div class="custome-checkbox">
                                <input class="form-check-input" type="checkbox" name="checkbox" id="createaccount" />
                                <label class="form-check-label label_info" for="createaccount"
                                    ><span>Create an account?</span></label
                                >
                            </div>
                        </div>
                    </div>
                    <div class="form-group create-account mb-3">
                        <input class="form-control" required type="password" placeholder="Password" name="password" />
                    </div>
                    <div class="ship_detail">
                        <div class="form-group mb-3">
                            <div class="chek-form">
                                <div class="custome-checkbox">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="checkbox"
                                        id="differentaddress" />
                                    <label class="form-check-label label_info" for="differentaddress"
                                        ><span>Ship to a different address?</span></label
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="different_address">
                            <div class="form-group mb-3">
                                <input
                                    type="text"
                                    required
                                    class="form-control"
                                    name="fname"
                                    placeholder="First name *" />
                            </div>
                            <div class="form-group mb-3">
                                <input
                                    type="text"
                                    required
                                    class="form-control"
                                    name="lname"
                                    placeholder="Last name *" />
                            </div>
                            <div class="form-group mb-3">
                                <input
                                    class="form-control"
                                    required
                                    type="text"
                                    name="cname"
                                    placeholder="Company Name" />
                            </div>
                            <div class="form-group mb-3">
                                <div class="custom_select">
                                    <select class="form-control">
                                        <option value="">Select a Country...</option>
                                        <option value="AX">Aland Islands</option>
                                        <option value="AF">Afghanistan</option>
                                        <option value="AL">Albania</option>
                                        <option value="DZ">Algeria</option>
                                        <option value="BD">Bangladesh</option>
                                        <option value="CAD">Canada</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="billing_address"
                                    required=""
                                    placeholder="Address *" />
                            </div>
                            <div class="form-group mb-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="billing_address2"
                                    required=""
                                    placeholder="Address line2" />
                            </div>
                            <div class="form-group mb-3">
                                <input
                                    class="form-control"
                                    required
                                    type="text"
                                    name="city"
                                    placeholder="City / Town *" />
                            </div>
                            <div class="form-group mb-3">
                                <input
                                    class="form-control"
                                    required
                                    type="text"
                                    name="state"
                                    placeholder="State / County *" />
                            </div>
                            <div class="form-group mb-3">
                                <input
                                    class="form-control"
                                    required
                                    type="text"
                                    name="zipcode"
                                    placeholder="Postcode / ZIP *" />
                            </div>
                        </div>
                    </div>
                    <div class="heading_s1">
                        <h4>Additional information</h4>
                    </div> -->
                    <div class="form-group mb-0">
                        <textarea rows="5" class="form-control" placeholder="Order notes"></textarea>
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <div class="order_review">
                    <div class="heading_s1">
                        <h4>Your Orders</h4>
                    </div>
                    <div class="table-responsive order_table">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="cart in getCart" :key="cart.id">
                                    <td>
                                        {{ cart.product?.title }} <span class="product-qty">x {{ cart.qty }}</span>
                                    </td>
                                    <td>${{ cart.price }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>SubTotal</th>
                                    <td class="product-subtotal">${{ subTotal }}</td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td>Free Shipping</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td class="product-subtotal">${{ subTotal }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="payment_method">
                        <div class="heading_s1">
                            <h4>Payment</h4>
                        </div>
                        <div class="payment_option">
                            <div class="custome-radio">
                                <input
                                    class="form-check-input"
                                    required=""
                                    type="radio"
                                    name="payment_option"
                                    id="exampleRadios3"
                                    value="option3"
                                    checked="" />
                                <label class="form-check-label" for="exampleRadios3">Direct Bank Transfer</label>
                                <p data-method="option3" class="payment-text">
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration.
                                </p>
                            </div>
                            <div class="custome-radio">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="payment_option"
                                    id="exampleRadios4"
                                    value="option4" />
                                <label class="form-check-label" for="exampleRadios4">Check Payment</label>
                                <p data-method="option4" class="payment-text">
                                    Please send your cheque to Store Name, Store Street, Store Town, Store State /
                                    County, Store Postcode.
                                </p>
                            </div>
                            <div class="custome-radio">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="payment_option"
                                    id="exampleRadios5"
                                    value="option5" />
                                <label class="form-check-label" for="exampleRadios5">Paypal</label>
                                <p data-method="option5" class="payment-text">
                                    Pay via PayPal; you can pay with your credit card if you don't have a PayPal
                                    account.
                                </p>
                            </div>
                        </div>
                    </div>
                    <a @click="placeOrderBtnHandler" class="btn btn-fill-out btn-block">Place Order</a>
                </div>
            </div>
        </div>
    </div>
</template>
