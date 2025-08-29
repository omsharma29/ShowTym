import { Cashfree, CFEnvironment } from "cashfree-pg";

// Create instance with environment, client ID and secret
export const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,                   // or CFEnvironment.PRODUCTION
    process.env.APP_ID as string,
    process.env.SECRET_KEY as string
);

// Example: Creating an order
export const payment = async (c: any) => {

    try {
        const body = await c.req.json()
        const myOrderId = `order_${Date.now()}`;
        const request = {
            order_id: myOrderId,
            order_amount: body.order_amount.toString(),
            order_currency: "INR",
            customer_details: {
                customer_id: body.customer_id,
                customer_email: body.customer_email,
                customer_phone: body.customer_phone || "9876543210",
            },
            order_meta: {
                return_url: `${process.env.FRONTEND_URL}/payment-status/${myOrderId}`,
                
            },
            order_note: `Movie tickets booking - ${myOrderId}`,
        };

        console.log("Sending request to Cashfree:", request);
        const response = await cashfree.PGCreateOrder(request);
        console.log("Cashfree response:", response);

        if (!response.data || !response.data.payment_session_id) {
            throw new Error("No payment session ID received from Cashfree");
        }

        const paymentSessionId = response.data.payment_session_id;
        console.log("Payment Session ID:", paymentSessionId);

        return c.json({
            order_id: myOrderId,
            payment_session_id: paymentSessionId,
            cf_order_id: response.data.cf_order_id,
            order_status: response.data.order_status
        });
    } catch (err: any) {
        console.error("Cashfree error:", err.response?.data || err.message);
        return c.json({ 
            error: true,
            message: err.response?.data?.message || err.message,
            code: err.response?.data?.code || 'unknown_error'
        }, 500);
    }
};
