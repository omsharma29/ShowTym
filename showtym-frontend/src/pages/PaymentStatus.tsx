import { useEffect, useState } from "react";
import Background from "../assets/Background.jpg"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PaymentStatus() {
    const { myOrderId } = useParams()
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if (!myOrderId) {
                navigate('/');
                return;
            }

            try {
                setIsLoading(true);
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/webhook/verify`, {
                    orderId: myOrderId
                });
                console.log("Raw response:", response.data);

                if (response.data.success) {
                    setPaymentData(response.data.booking);
                } else {
                    setError("Payment verification failed");
                    setTimeout(() => navigate('/'), 3000);
                }
            } catch (error) {
                console.error("Payment verification error:", error);
                setError("Failed to verify payment");
                setTimeout(() => navigate('/'), 3000);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentStatus();
    }, [myOrderId]);



    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
                style={{ backgroundImage: `url(${Background})` }}>
                <div className="absolute bg-blue-900 opacity-50 inset-0 z-0"></div>
                <div className="z-10 text-white text-xl">Verifying payment...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
                style={{ backgroundImage: `url(${Background})` }}>
                <div className="absolute bg-blue-900 opacity-50 inset-0 z-0"></div>
                <div className="z-10 text-white text-xl">{error}</div>
            </div>
        );
    }

    if (!paymentData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
                style={{ backgroundImage: `url(${Background})` }}>
                <div className="absolute bg-blue-900 opacity-50 inset-0 z-0"></div>
                <div className="z-10 text-white text-xl">No payment data found</div>
            </div>
        );
    }

    // Get the seat numbers from the paymentData
    let seats = [];
    try {
        if (paymentData.seatNos) {
            if (typeof paymentData.seatNos === 'string') {
                // Try to parse if it's a JSON string
                seats = JSON.parse(paymentData.seatNos);
            } else if (Array.isArray(paymentData.seatNos)) {
                // If it's already an array, use it directly
                seats = paymentData.seatNos;
            }
        }
    } catch (error) {
        console.error("Error parsing seats:", error);
        // If parsing fails, try to split the string
        if (typeof paymentData.seatNos === 'string') {
            seats = paymentData.seatNos.split(',').map((seat: string) => seat.trim());
        }
    }

    const iso = paymentData.bookingDate;

    // Convert to Date object
    const dateObj = new Date(iso);

    // Convert to IST string
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'  // IST
    };

    const istString = dateObj.toLocaleString('en-GB', options);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
            style={{
                backgroundImage: `url(${Background})`,
            }}
        >
            <div className="absolute bg-blue-900 opacity-50 inset-0 z-0"></div>

            <div className="max-w-md w-full h-full mx-auto z-10 bg-blue-900 rounded-3xl">
                <div className="flex flex-col">
                    <div className="bg-white relative drop-shadow-2xl rounded-3xl p-4 m-4">
                        <div className="flex-none sm:flex">
                            <div className="flex-auto justify-evenly">
                                {/* Airline info */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center my-1">
                                        <span className="mr-3 rounded-full bg-white w-8 h-8"> {/**Logo */}
                                            <img
                                                src="https://image.winudf.com/v2/image1/Y29tLmJldHMuYWlyaW5kaWEudWlfaWNvbl8xNTU0NTM4MzcxXzA0Mw/icon.png?w=&fakeurl=1"
                                                className="h-8 p-1"
                                            />
                                        </span>
                                        <h2 className="font-medium">Showtym</h2>
                                    </div>
                                    <div className="text-blue-800">E-Ticket</div>
                                </div>

                                <div className=" border-dashed border-b-2 my-5"></div>

                                {/* Flight route */}
                                <div className="flex items-center justify-center">
                                    <div className="text-2xl font-extrabold text-center">{paymentData.movieName}</div>
                                </div>

                                <div className=" border-dashed border-b-2 my-5 pt-5">
                                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                                </div>

                                {/* Flight details */}
                                <div className="flex items-center mb-5 p-5 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-sm">Show Date</span>
                                        <div className="font-semibold">3/12/12</div>
                                    </div>
                                    <div className="flex flex-col ml-auto">
                                        <span className="text-sm">Show Time</span>
                                        <div className="font-semibold">{paymentData.ShowTime}</div>
                                    </div>
                                </div>

                                {/* Timing */}
                                <div className="flex flex-col  items-cente mb-4 px-5">
                                    <div className="font-semibold">Venue : </div>
                                    <div className="flex items-start flex-col">
                                        <div className="font-semibold">Place : {paymentData.City}</div>
                                        <div>{paymentData.Address}</div>
                                    </div>
                                </div>

                                <div className=" border-dashed border-b-2 my-5 pt-5">
                                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                                </div>

                                {/* Passenger info */}
                                <div className="flex items-center px-5 pt-3 text-sm">
                                    <div className="flex flex-col">
                                        <span>Person Count</span>
                                        <div className="font-semibold">{paymentData.totalSeat}</div>
                                    </div>
                                    <div className="flex flex-col mx-auto text-center">
                                        <span>Seats</span>
                                        <div className="font-semibold flex flex-wrap justify-center gap-1 mt-1">
                                            {seats.map((seat: string) => (
                                                <span key={seat} className="px-1 py-1 bg-blue-100 rounded-md">
                                                    {seat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                                <div className="flex gap-2 justify-center text-sm mt-5">
                                    <span>Paid: </span>
                                    <div className="font-semibold">{paymentData.totalPaid}</div>
                                </div>

                                {/* Barcode */}
                                <div className="flex flex-col py-5 justify-center text-sm">
                                    <h6 className="font-bold text-center opacity-40">Transaction ID: {myOrderId}</h6>
                                    <h6 className="font-bold text-center opacity-40">User: {paymentData.email}</h6>
                                    <h6 className="font-bold text-center opacity-40">Date: {istString}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
