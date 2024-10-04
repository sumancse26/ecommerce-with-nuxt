<script setup>
    const { $axios } = useNuxtApp();

    const orders = ref([]);
    const invProds = ref([]);
    const selectedInvoice = ref({});
    const getOrders = async () => {
        try {
            orders.value = [];
            const res = await $axios.get('/get-invoice');
            orders.value = res.data.invoiceList || [];
        } catch (e) {
            orders.value = [];
            console.log(e);
        }
    };

    const openInvProdModal = async (order) => {
        try {
            invProds.value = [];
            selectedInvoice.value = order;
            const res = await $axios.get(`get-invoice-product/${order.id}`);
            invProds.value = res.data.invoiceProducts || [];
        } catch (e) {
            invProds.value = [];
            console.log(e);
        }
    };

    onMounted(() => {
        getOrders();
    });
</script>

<template>
    <div class="container">
        <h2>Your Orders</h2>
        <!-- <template>
            <UProgress animation="carousel" />
        </template> -->
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Payable Amount</th>
                    <th>Shipping Details</th>
                    <th>Delivery Status</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" :key="order.id">
                    <td>{{ index + 1 }}</td>
                    <td>${{ order.payable }}</td>
                    <td>{{ order.ship_details }}</td>
                    <td>{{ order.delivery_status }}</td>
                    <td>{{ order.payment_status }}</td>
                    <td>
                        <div class="d-flex">
                            <a
                                data-bs-toggle="modal"
                                data-bs-target="#invoiceModal"
                                class="btn"
                                @click="openInvProdModal(order)"
                                >More</a
                            >

                            <NuxtLink
                                v-if="order.payment_status === 'Pending'"
                                :to="{ name: 'payment', query: { inv_id: order.id } }"
                                class="btn"
                                >Pay</NuxtLink
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="modal fade" id="invoiceModal" tabindex="-1" aria-labelledby="invoiceModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="invoiceModalLabel">Invoice Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Invoice ID</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="prod in invProds" :key="prod.id">
                                <td>{{ prod.product.title }}</td>
                                <td>{{ selectedInvoice.id }}</td>
                                <td>{{ prod.qty }}</td>
                                <td>{{ prod.sale_price }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        max-width: 1200px;
        margin: 50px auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    h2 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    table,
    th,
    td {
        border: 1px solid #ddd;
    }

    th,
    td {
        padding: 12px;
        text-align: center;
    }

    th {
        background-color: #333;
        color: white;
    }

    td {
        background-color: #f9f9f9;
    }

    .btn {
        display: inline-block;
        padding: 8px 12px;
        background-color: #d9534f;
        color: white;
        border: none;
        border-radius: 4px;
        text-decoration: none;
        font-size: 14px;
    }

    .btn:hover {
        background-color: #c9302c;
    }

    .modal-body {
        max-height: 500px;
        overflow-y: scroll;
    }
    .modal-content {
        width: 700px !important;
    }
</style>
