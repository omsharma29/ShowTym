import { Cashfree, CFEnvironment } from "cashfree-pg";

export const payment = async (c: any) => {
  try {
    const body = await c.req.json();
    const myOrderId = `order_${Date.now()}`;

    // ✅ Initialize Cashfree with Worker env variables
    const cashfree = new Cashfree(
      CFEnvironment.SANDBOX, // or PRODUCTION
      c.env.APP_ID,
      c.env.SECRET_KEY
    );

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
        return_url: `${c.env.FRONTEND_URL}/payment-status/${myOrderId}`,
      },
      order_note: `Movie tickets booking - ${myOrderId}`,
    };

    const response = await cashfree.PGCreateOrder(request);

    if (!response.data?.payment_session_id) {
      throw new Error("No payment session ID received from Cashfree");
    }

    return c.json({
      order_id: myOrderId,
      payment_session_id: response.data.payment_session_id,
      cf_order_id: response.data.cf_order_id,
      order_status: response.data.order_status,
    });
  } catch (err: any) {
    return c.json(
      {
        error: true,
        message: err.response?.data?.message || err.message,
        code: err.response?.data?.code || "unknown_error",
      },
      500
    );
  }
};
