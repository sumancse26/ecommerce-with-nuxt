<script setup>
    import { useEcomStore } from '@/store/ecomStore';

    const { $axios } = useNuxtApp();
    const store = useEcomStore();
    const route = useRoute();
    const invId = route.query.inv_id;

    const completeOrder = async () => {
        try {
            const res = await $axios.get(`/complete-order/${invId}`);
            store.paymentMethods = res.data.paymentMethods || [];
        } catch (e) {
            console.log(e);
        }
    };

    completeOrder();

    const paymentMethods = computed(() => {
        return store.paymentMethods;
    });

    const redirectToPayment = (url) => {
        window.location.href = url;
    };
</script>

<template>
    <div class="payment-methods-container">
        <h2>Payment Methods</h2>
        <div class="payment-options">
            <div
                class="payment-option"
                v-for="(method, index) in paymentMethods"
                :key="index"
                @click="redirectToPayment(method.redirectGatewayURL)">
                <img :src="method.logo" :alt="method.name" class="payment-logo" />
                <span>{{ method.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .payment-methods-container {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
    }

    h2 {
        color: #333;
        margin-bottom: 20px;
    }

    .payment-options {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .payment-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px;
        margin: 10px;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        width: 140px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .payment-option:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .payment-logo {
        width: 60px;
        height: 40px;
        margin-bottom: 10px;
    }

    span {
        font-size: 14px;
        color: #555;
    }

    .pay-now-button {
        margin-top: 10px;
        padding: 8px 12px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
    }

    .pay-now-button:hover {
        background-color: #0056b3;
    }
</style>
