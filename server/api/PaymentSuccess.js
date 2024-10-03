import axios from 'axios';
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const tranId = query.tran_id;
        const response = await axios.post('http://ecommerce.test/api/payment-success', { tran_id: tranId });

        return response.data;
    } catch (error) {
        return { success: false, error: error.message };
    }
});
