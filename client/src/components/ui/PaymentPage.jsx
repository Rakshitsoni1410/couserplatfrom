import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  useGetCourseDetailWithStatusQuery,
  useCreateCheckoutSessionMutation,
} from "@/features/api/purchaseApi";

import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCreditCard,
} from "react-icons/fa";

import { toast } from "sonner";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // ======================
  // Card State
  // ======================

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  // ======================
  // Fetch Course
  // ======================

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId, {
      skip: !courseId,
    });

  const [createCheckoutSession] =
    useCreateCheckoutSessionMutation();

  // ======================
  // Course ID Validation
  // ======================

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing.");
    }
  }, [courseId]);

  // ======================
  // Error States
  // ======================

  if (!courseId) {
    return (
      <h1 className="text-center text-red-500 font-bold mt-10">
        Course ID is missing.
      </h1>
    );
  }

  if (isLoading) {
    return (
      <h1 className="text-center text-xl mt-10">
        Loading course details...
      </h1>
    );
  }

  if (isError || !data?.course) {
    return (
      <h1 className="text-center text-red-500 text-xl mt-10">
        Failed to load course details.
      </h1>
    );
  }

  const { course } = data;

  // ======================
  // Expiry Validation
  // ======================

  const isValidExpiryDate = (expiry) => {
    const regex = /^\d{2}\/\d{2}$/;

    if (!regex.test(expiry)) return false;

    const [monthStr, yearStr] = expiry.split("/");

    const month = parseInt(monthStr, 10);
    const year = parseInt("20" + yearStr, 10);

    if (
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12
    ) {
      return false;
    }

    const now = new Date();
    const expiryDate = new Date(year, month, 0);

    return expiryDate >= now;
  };

  // ======================
  // Form Validation
  // ======================

  const isFormValid =
    cardDetails.cardNumber.length === 16 &&
    isValidExpiryDate(cardDetails.expiryDate) &&
    cardDetails.cvv.length === 3;

  // ======================
  // Payment Handler
  // ======================

  const handlePayment = async () => {
    const { cardNumber, expiryDate, cvv } = cardDetails;

    // Card validation
    if (cardNumber.length !== 16) {
      toast.error("Card number must be 16 digits.");
      return;
    }

    if (!isValidExpiryDate(expiryDate)) {
      toast.error(
        "Your card is expired or expiry date is invalid."
      );
      return;
    }

    if (cvv.length !== 3) {
      toast.error("CVV must be 3 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await createCheckoutSession({
        courseId: course._id,
        paymentMethod: "card",
        cardNumber,
      }).unwrap();

      // Success
      toast.success(
        res?.message || "Payment successful!"
      );

      // Redirect
      setTimeout(() => {
        navigate(`/course-progress/${course._id}`);
      }, 1500);

    } catch (err) {
      console.error(err);

      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Payment failed.";

      toast.error(errorMessage);

      // Already purchased
      if (
        errorMessage
          .toLowerCase()
          .includes("already purchased")
      ) {
        setTimeout(() => {
          navigate(`/course-progress/${course._id}`);
        }, 1500);
      }

    } finally {
      setLoading(false);
    }
  };

  // ======================
  // UI
  // ======================

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-10 space-y-12 lg:space-y-0 lg:space-x-14">

      {/* Left Side */}
      <div className="relative bg-white shadow-xl rounded-2xl p-8 w-full lg:w-2/5 space-y-6">

        <div className="relative flex justify-center items-center rounded-xl overflow-hidden shadow-lg bg-white p-4">

          <img
            src={course.courseThumbnail}
            alt="Course Thumbnail"
            className="w-30 max-w-md h-64 object-cover rounded-lg shadow-md"
          />

          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold px-4 py-2 rounded-xl shadow-md">
            ₹{course.coursePrice}
          </div>
        </div>

        <div className="text-center space-y-4">

          <h2 className="text-3xl font-bold text-gray-900">
            {course.courseTitle}
          </h2>

          <p className="text-lg text-gray-700">
            By{" "}
            <span className="font-medium text-blue-600">
              {course.creator.name}
            </span>
          </p>

          <p className="text-lg text-gray-700 italic">
            {course.subTitle}
          </p>

          <p className="text-md text-gray-600 leading-relaxed">
            {course.description
              .replace(/<\/?[^>]+(>|$)/g, "")
              .slice(0, 150)}
            ...
          </p>
        </div>

        <div className="flex justify-center space-x-6 mt-4">

          <div className="flex flex-col items-center text-blue-600">
            <FaCreditCard className="w-10 h-10" />
            <span className="text-sm font-semibold mt-1">
              Lifetime Access
            </span>
          </div>

          <div className="flex flex-col items-center text-purple-600">
            <FaCcMastercard className="w-10 h-10" />
            <span className="text-sm font-semibold mt-1">
              Certificate
            </span>
          </div>

          <div className="flex flex-col items-center text-green-600">
            <FaCcVisa className="w-10 h-10" />
            <span className="text-sm font-semibold mt-1">
              HD Videos
            </span>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full lg:w-2/5 space-y-8">

        <h2 className="text-3xl font-semibold text-center text-gray-900">
          Complete Your Payment
        </h2>

        <div className="mt-4 space-y-6 p-6 border rounded-lg bg-gray-50">

          <div className="flex justify-center gap-6">
            <FaCcVisa className="text-blue-500" size={45} />
            <FaCcMastercard className="text-red-600" size={45} />
            <FaCcAmex className="text-indigo-500" size={45} />
            <FaCcDiscover className="text-orange-500" size={45} />
          </div>

          {/* Card Number */}
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-4 border rounded-xl text-lg bg-white shadow-md"
            value={cardDetails.cardNumber}
            onChange={(e) =>
              setCardDetails({
                ...cardDetails,
                cardNumber: e.target.value,
              })
            }
            maxLength="16"
          />

          <div className="flex gap-4">

            {/* Expiry */}
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 p-4 border rounded-xl text-lg bg-white shadow-md"
              value={cardDetails.expiryDate}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  expiryDate: e.target.value,
                })
              }
              maxLength="5"
            />

            {/* CVV */}
            <input
              type="password"
              placeholder="CVV"
              className="w-1/2 p-4 border rounded-xl text-lg bg-white shadow-md"
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  cvv: e.target.value,
                })
              }
              maxLength="3"
            />

          </div>
        </div>

        {/* Button */}
        <Button
          onClick={handlePayment}
          disabled={loading || !isFormValid}
          className="w-full bg-blue-600 text-white p-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>

      </div>
    </div>
  );
};

export default PaymentPage;