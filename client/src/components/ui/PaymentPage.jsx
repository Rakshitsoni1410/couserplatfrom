import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCreditCard, FaGooglePay, FaAmazonPay, FaPhoneAlt, FaBuilding, FaPaypal } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [selectedUpiApp, setSelectedUpiApp] = useState("Google Pay");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId, { skip: !courseId });

  useEffect(() => {
    if (!courseId) {
      console.error("🚨 Error: Course ID is missing in the URL.");
    }
  }, [courseId]);

  if (!courseId) {
    return <h1 className="text-center text-red-500 font-bold mt-10">Error: Course ID is missing in the URL!</h1>;
  }

  if (isLoading) return <h1 className="text-center text-gray-600 text-xl">Loading course details...</h1>;
  if (isError || !data?.course) return <h1 className="text-center text-red-500 text-xl">Failed to load course details.</h1>;

  const { course } = data;

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/course-progress/${courseId}`);
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-10 space-y-12 lg:space-y-0 lg:space-x-14">
      {/* Left Side - Course Details */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full lg:w-2/5 space-y-8 transform hover:scale-105 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="relative w-full md:w-1/2 h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden shadow-lg">
            <img src={course.courseThumbnail} alt="Course Thumbnail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900">{course.courseTitle}</h2>
            <p className="text-lg text-gray-700 mt-1">By <span className="font-medium text-blue-600">{course.creator.name}</span></p>
            <p className="text-lg text-gray-700 mt-1">Subtitle: <span className="font-medium text-blue-600">{course.subTitle}</span></p>
            <p className="text-2xl font-bold text-green-600 mt-2">₹{course.coursePrice}</p>
            <p className="text-md text-gray-600 leading-relaxed mt-4">{course.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
          </div>
        </div>
      </div>

      {/* Right Side - Payment Form */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full lg:w-2/5 space-y-8 transform hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-semibold text-center text-gray-900">Complete Your Payment</h2>

        {/* Payment Method Selection */}
        <label className="block text-lg font-semibold text-gray-700">Payment Method:</label>
        <div className="relative flex gap-4">
          <button className={`w-1/2 py-4 text-lg font-semibold rounded-lg transition ${paymentMethod === "card" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setPaymentMethod("card")}>
            💳 Card
          </button>
          <button className={`w-1/2 py-4 text-lg font-semibold rounded-lg transition ${paymentMethod === "upi" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setPaymentMethod("upi")}>
            ⚡ UPI
          </button>
        </div>

        {/* Card Payment Section */}
        {paymentMethod === "card" && (
          <div className="mt-4 space-y-6 p-6 border rounded-lg bg-gray-50">
            <div className="flex justify-center gap-6">
              <FaCcVisa className="text-blue-500" size={45} />
              <FaCcMastercard className="text-red-600" size={45} />
              <FaCcAmex className="text-indigo-500" size={45} />
              <FaCcDiscover className="text-orange-500" size={45} />
            </div>
            <input type="text" placeholder="Card Number" className="w-full p-4 border rounded-xl text-lg bg-white shadow-md" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} maxLength="16" />
            <div className="flex gap-4">
              <input type="text" placeholder="MM/YY" className="w-1/2 p-4 border rounded-xl text-lg bg-white shadow-md" value={cardDetails.expiryDate} onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })} maxLength="5" />
              <input type="password" placeholder="CVV" className="w-1/2 p-4 border rounded-xl text-lg bg-white shadow-md" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} maxLength="3" />
            </div>
          </div>
        )}

        {/* UPI Payment Section */}
        {paymentMethod === "upi" && (
          <div className="mt-4 space-y-6 p-6 border rounded-lg bg-gray-50">
            <div className="flex justify-center gap-6">
              <FaGooglePay className="text-blue-600" size={45} />
              <FaPhoneAlt className="text-purple-600" size={45} />
              <SiPaytm className="text-blue-500" size={45} />
              <FaAmazonPay className="text-yellow-600" size={45} />
            </div>
            <select className="w-full p-4 border rounded-xl text-lg bg-white shadow-md" value={selectedUpiApp} onChange={(e) => setSelectedUpiApp(e.target.value)}>
              <option value="Google Pay">Google Pay</option>
              <option value="PhonePe">PhonePe</option>
              <option value="Paytm">Paytm</option>
              <option value="Amazon Pay">Amazon Pay</option>
              <option value="BHIM UPI">BHIM UPI</option>
            </select>
            <input type="text" placeholder="Enter UPI ID" className="w-full p-4 border rounded-xl text-lg bg-white shadow-md" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
          </div>
        )}

        <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition">
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
