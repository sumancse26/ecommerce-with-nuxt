import axios from 'axios';
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const tranId = query.tran_id;
        const response = await axios.post('http://ecommerce.test/api/payment-cancel', { tran_id: tranId });

        return sendRedirect(event, `/payment-cancel?tran_id=${tranId}`);
    } catch (error) {
        return { success: false, error: error.message };
    }
});
