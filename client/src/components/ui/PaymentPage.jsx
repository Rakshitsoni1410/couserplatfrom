import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi"; // Import API hook

const PaymentPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams(); // ✅ Extracted correctly

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch course details
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId, {
    skip: !courseId, // ✅ Prevents calling API if `courseId` is missing
  });

  useEffect(() => {
    if (!courseId) {
      console.error("🚨 Error: Course ID is missing in the URL.");
    }
  }, [courseId]);

  if (!courseId) {
    return <h1 className="text-center text-red-500 font-bold mt-10">Error: Course ID is missing in the URL!</h1>;
  }

  if (isLoading) return <h1>Loading course details...</h1>;
  if (isError || !data?.course) return <h1>Failed to load course details. Please try again later.</h1>;

  const { course } = data;

  const handlePayment = async () => {
    setLoading(true);

    // ✅ Payment Data
    const paymentData = {
      courseId,
      courseTitle: course.courseTitle,
      creator: course.creator.name,
      price: course.coursePrice,
      paymentMethod,
      upiId: paymentMethod === "upi" ? upiId : null,
      cardDetails: paymentMethod === "card" ? cardDetails : null,
    };

    // Simulating API call
    setTimeout(() => {
      alert("✅ Payment Successful!");
      navigate(`/course-progress/${courseId}`);
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-6 space-y-6 lg:space-y-0 lg:space-x-10">
      {/* Left Side - Course Details */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3 space-y-4">
        <img src={course.thumbnailUrl} alt="Course" className="w-full rounded-lg" />
        <h2 className="text-2xl font-semibold">{course.courseTitle}</h2>
        <p className="text-gray-600">By {course.creator.name}</p>
        <p className="text-lg font-bold">Price: ₹{course.coursePrice}</p>
        <p className="text-sm text-gray-500">{course.description}</p>
      </div>

      {/* Right Side - Payment Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Payment for {course.courseTitle}</h2>

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
