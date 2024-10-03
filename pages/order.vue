<script setup>
    const { $axios } = useNuxtApp();

    const orders = ref([]);
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

    onMounted(() => {
        getOrders();
    });
</script>

<template>
    <div class="container">
        <h2>Your Orders</h2>
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
                        <div class="flex">
                            <a href="order-details.html?order=101" class="btn">More</a>

                            <NuxtLink :to="{ name: 'payment', query: { inv_id: order.id } }" class="btn">Pay</NuxtLink>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .container {
        max-width: 1000px;
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
</style>
