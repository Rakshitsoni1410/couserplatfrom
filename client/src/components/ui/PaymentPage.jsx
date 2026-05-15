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

const handlePayment = async () => {
  const { cardNumber, expiryDate, cvv } = cardDetails;

  // Card validation
  if (cardNumber.length !== 16) {
    toast.error("Card number must be 16 digits.");
    return;
  }

  if (!isValidExpiryDate(expiryDate)) {
    toast.error("Your card is expired or expiry date is invalid.");
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
    toast.success(res?.message || "Payment successful!");

    // Redirect to course progress
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

    // If already purchased
    if (errorMessage.toLowerCase().includes("already purchased")) {
      setTimeout(() => {
        navigate(`/course-progress/${course._id}`);
      }, 1500);
    }

  } finally {
    setLoading(false);
  }
};
export default PaymentPage;
// continue button work not proper 