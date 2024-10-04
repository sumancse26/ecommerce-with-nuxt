<script setup>
    import { useFetch } from '#app';

    const route = useRoute();
    const tranId = route.query.tran_id;

    const invoice = ref(null);

    const { data } = await useFetch(`http://ecommerce.test/api/payment-success`, {
        params: { tran_id: tranId },
        method: 'POST'
    });

    if (data.value?.success) {
        invoice.value = data.value.invoice;
    }
</script>
<template>
    <div class="w-100 d-flex justify-content-center">
        <div class="payment-success-container">
            <h1>Payment Successful</h1>
            <div class="payment-details">
                <p>
                    <span>Transaction ID: {{ invoice.tran_id }}</span>
                </p>
                <p><span>Payable:</span> ${{ invoice.payable }}</p>
                <p><span>VAT:</span> ${{ invoice.vat }}</p>
                <p>
                    <span>Payment Status:</span> <span class="payment-status">{{ invoice.payment_status }}</span>
                </p>
            </div>
            <NuxtLink to="/" class="btn">Back to Home</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
    .payment-success-container {
        background-color: #fff;
        padding: 50px;
        border-radius: 8px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        width: 400px;
        text-align: center;
    }

    .payment-success-container h1 {
        color: #28a745;
        font-size: 28px;
        margin-bottom: 15px;
    }

    .payment-details {
        margin-top: 20px;
        text-align: left;
    }

    .payment-details p {
        font-size: 16px;
        margin: 8px 0;
    }

    .payment-details p span {
        font-weight: bold;
    }

    .payment-status {
        font-size: 18px;
        margin-top: 20px;
        padding: 10px;
        border-radius: 5px;
        color: #28a745;
    }

    .payment-status.failed {
        background-color: #dc3545;
    }

    .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        font-size: 16px;
    }

    .btn:hover {
        background-color: #0056b3;
    }
</style>
