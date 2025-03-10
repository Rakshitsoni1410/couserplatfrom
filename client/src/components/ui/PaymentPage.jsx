import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  // Dummy course details (replace with API call if needed)
  const course = {
    title: "React Fundamentals",
    creator: "Rakshit",
    price: 999,
    description:
      "Learn the basics of React.js with hands-on projects and real-world examples.",
    image: "https://source.unsplash.com/400x300/?coding,react",
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Payment Successful ✅");
      navigate(`/course-progress/${courseId}`);
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-6 space-y-6 lg:space-y-0 lg:space-x-10">
      {/* Left Side - Course Details */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3 space-y-4">
        <img src={course.image} alt="Course" className="w-full rounded-lg" />
        <h2 className="text-2xl font-semibold">{course.title}</h2>
        <p className="text-gray-600">By {course.creator}</p>
        <p className="text-lg font-bold">Price: ₹{course.price}</p>
        <p className="text-sm text-gray-500">{course.description}</p>
      </div>

      {/* Right Side - Payment Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3 space-y-4">
        <h2 className="text-2xl font-semibold text-center">
          Payment for Course {courseId}
        </h2>

        {/* Payment Method Selection */}
        <label className="block font-semibold">Select Payment Method:</label>
        <select
          className="w-full p-2 border rounded mt-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="card">Credit / Debit Card</option>
          <option value="upi">UPI</option>
        </select>

        {/* Card Payment Section */}
        {paymentMethod === "card" && (
          <div className="mt-3 space-y-3">
            {/* Payment Icons */}
            <div className="flex justify-center space-x-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                alt="Visa"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                alt="MasterCard"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/10/Rupay-Logo.png"
                alt="RuPay"
                className="h-8"
              />
            </div>

            {/* Card Input Fields */}
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 border rounded"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
              }
              maxLength="16"
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="w-1/2 p-2 border rounded"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                }
                maxLength="5"
              />
              <input
                type="password"
                placeholder="CVV"
                className="w-1/2 p-2 border rounded"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
                maxLength="3"
              />
            </div>
          </div>
        )}

        {/* UPI Payment Section */}
        {paymentMethod === "upi" && (
          <div className="mt-3 space-y-3">
            {/* UPI Icons */}
            <div className="flex justify-center space-x-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Pay_Logo.svg"
                alt="Google Pay"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/16/PhonePe_Logo.svg"
                alt="PhonePe"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Paytm_logo_new.svg"
                alt="Paytm"
                className="h-8"
              />
            </div>

            <input
              type="text"
              placeholder="Enter UPI ID"
              className="w-full p-2 border rounded"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
