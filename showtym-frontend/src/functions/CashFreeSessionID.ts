import axios from "axios";

interface OrderDetails {
    order_amount: number;
    customer_id: string | undefined;
    customer_email: string | undefined;
    customer_phone?: string;
}

interface PaymentResponse {
    order_id: string;
    payment_session_id: string;
    cf_order_id: string;
    order_status: string;
    error?: boolean;
    message?: string;
    code?: string;
}

export const sessionId = async (OrderDetails: OrderDetails): Promise<PaymentResponse> => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/payment`,
            OrderDetails
        );
        
        console.log("Payment Session Response:", data);
        
        if (data.error) {
            throw new Error(data.message || 'Payment session creation failed');
        }
        
        if (!data.payment_session_id) {
            throw new Error('No payment session ID received');
        }
        
        return data;
    } catch (error: any) {
        console.error("Payment Session Error:", error.response?.data || error.message);
        throw error;
    }
}



{/*
    
 onSuccess: async (paymentData: any) => {
              console.log("Payment success:", paymentData);
              try {
                const putData = await axios.post(
                  `${import.meta.env.VITE_API_BASE_URL}/api/booking`,

                  bookingDetails,


                );

                if (putData.status === 201) {
                  alert("Booking successful! Check your email for details.");
                  console.log("Booking successful:", putData.data);
                  navigate('/payment-success'); // Redirect to success page
                }
              } catch (error) {
                console.error("Error in booking:", error);
                alert("Error in booking, please try again");
              }
            },
            onFailure: (error: any) => {
              console.error("Payment failed:", error);
              alert("Payment failed. Please try again.");
            }*/}