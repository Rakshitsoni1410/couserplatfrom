import React, {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

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
  FaLock,
} from "react-icons/fa";

import {
  ShieldCheck,
  PlayCircle,
  Award,
  Loader2,
  CreditCard,
  Sparkles,
} from "lucide-react";

import { toast } from "sonner";

const PaymentPage = () => {
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [cardDetails, setCardDetails] =
    useState({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });

  const [loading, setLoading] =
    useState(false);

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(
      courseId,
      {
        skip: !courseId,
      }
    );

  const [createCheckoutSession] =
    useCreateCheckoutSessionMutation();

  useEffect(() => {
    if (!courseId) {
      console.error(
        "Course ID is missing."
      );
    }
  }, [courseId]);

  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400 text-xl font-bold">

        Course ID is missing.

      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />

      </div>
    );
  }

  if (isError || !data?.course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6">

          <h1 className="text-red-400 text-xl font-semibold">
            Failed to load course details.
          </h1>

        </div>
      </div>
    );
  }

  const { course } = data;

  // EXPIRY VALIDATION
  const isValidExpiryDate = (
    expiry
  ) => {
    const regex = /^\d{2}\/\d{2}$/;

    if (!regex.test(expiry))
      return false;

    const [monthStr, yearStr] =
      expiry.split("/");

    const month = parseInt(
      monthStr,
      10
    );

    const year = parseInt(
      "20" + yearStr,
      10
    );

    if (
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12
    ) {
      return false;
    }

    const now = new Date();

    const expiryDate = new Date(
      year,
      month,
      0
    );

    return expiryDate >= now;
  };

  const isFormValid =
    cardDetails.cardNumber.length ===
      16 &&
    isValidExpiryDate(
      cardDetails.expiryDate
    ) &&
    cardDetails.cvv.length === 3;

  // PAYMENT
  const handlePayment = async () => {
    const {
      cardNumber,
      expiryDate,
      cvv,
    } = cardDetails;

    if (
      cardNumber.length !== 16
    ) {
      toast.error(
        "Card number must be 16 digits."
      );

      return;
    }

    if (
      !isValidExpiryDate(
        expiryDate
      )
    ) {
      toast.error(
        "Invalid expiry date."
      );

      return;
    }

    if (cvv.length !== 3) {
      toast.error(
        "CVV must be 3 digits."
      );

      return;
    }

    try {
      setLoading(true);

      const res =
        await createCheckoutSession({
          courseId: course._id,
          paymentMethod: "card",
          cardNumber,
        }).unwrap();

      toast.success(
        res?.message ||
          "Payment successful!"
      );

      setTimeout(() => {
        navigate(
          `/course-progress/${course._id}`
        );
      }, 1500);

    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Payment failed.";

      toast.error(errorMessage);

      if (
        errorMessage
          .toLowerCase()
          .includes(
            "already purchased"
          )
      ) {
        setTimeout(() => {
          navigate(
            `/course-progress/${course._id}`
          );
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-4 py-10 overflow-hidden relative">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">

        {/* LEFT SIDE */}
        <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">

          {/* THUMBNAIL */}
          <div className="relative">

            <img
              src={course.courseThumbnail}
              alt="Course Thumbnail"
              className="w-full h-[320px] object-cover"
            />

            <div className="absolute top-5 right-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold px-5 py-3 rounded-2xl shadow-xl">

              ₹{course.coursePrice}

            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8">

            {/* BADGE */}
            <div className="flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full w-fit text-sm mb-6">

              <Sparkles size={16} />

              Premium Learning Experience

            </div>

            <h1 className="text-4xl font-bold leading-tight">
              {course.courseTitle}
            </h1>

            <p className="text-indigo-400 text-lg mt-3 font-medium">
              By {course.creator.name}
            </p>

            <p className="text-slate-400 mt-5 text-lg leading-relaxed">
              {course.subTitle}
            </p>

            <div className="mt-6 bg-slate-950 border border-slate-800 rounded-2xl p-5">

              <p className="text-slate-400 leading-relaxed">
                {course.description
                  .replace(
                    /<\/?[^>]+(>|$)/g,
                    ""
                  )
                  .slice(0, 180)}
                ...
              </p>

            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-4 mt-8">

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">

                <PlayCircle className="text-indigo-400 w-8 h-8 mb-3" />

                <p className="text-sm text-slate-300">
                  HD Videos
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">

                <Award className="text-green-400 w-8 h-8 mb-3" />

                <p className="text-sm text-slate-300">
                  Certificate
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">

                <ShieldCheck className="text-yellow-400 w-8 h-8 mb-3" />

                <p className="text-sm text-slate-300">
                  Lifetime Access
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT CARD */}
        <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

          {/* HEADER */}
          <div className="text-center mb-8">

            <div className="h-20 w-20 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">

              <CreditCard className="text-indigo-400 w-10 h-10" />

            </div>

            <h2 className="text-4xl font-bold">
              Secure Checkout
            </h2>

            <p className="text-slate-400 mt-3">
              Complete your payment safely and
              securely.
            </p>
          </div>

          {/* PAYMENT METHODS */}
          <div className="flex justify-center gap-6 mb-8">

            <FaCcVisa
              className="text-blue-500"
              size={42}
            />

            <FaCcMastercard
              className="text-red-500"
              size={42}
            />

            <FaCcAmex
              className="text-indigo-400"
              size={42}
            />

            <FaCcDiscover
              className="text-orange-400"
              size={42}
            />

          </div>

          {/* FORM */}
          <div className="space-y-6">

            {/* CARD NUMBER */}
            <div>

              <label className="text-sm text-slate-400 mb-2 block">
                Card Number
              </label>

              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                value={
                  cardDetails.cardNumber
                }
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    cardNumber:
                      e.target.value,
                  })
                }
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-2xl px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* ROW */}
            <div className="grid grid-cols-2 gap-4">

              {/* EXPIRY */}
              <div>

                <label className="text-sm text-slate-400 mb-2 block">
                  Expiry Date
                </label>

                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={
                    cardDetails.expiryDate
                  }
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiryDate:
                        e.target.value,
                    })
                  }
                  className="w-full h-14 bg-slate-950 border border-slate-700 rounded-2xl px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* CVV */}
              <div>

                <label className="text-sm text-slate-400 mb-2 block">
                  CVV
                </label>

                <input
                  type="password"
                  placeholder="123"
                  maxLength="3"
                  value={
                    cardDetails.cvv
                  }
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cvv: e.target.value,
                    })
                  }
                  className="w-full h-14 bg-slate-950 border border-slate-700 rounded-2xl px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* SECURITY */}
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">

              <FaLock className="text-green-400" />

              <p className="text-sm text-green-400">
                Your payment is secured with
                256-bit SSL encryption.
              </p>

            </div>

            {/* BUTTON */}
            <Button
              onClick={handlePayment}
              disabled={
                loading ||
                !isFormValid
              }
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-lg font-semibold shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₹${course.coursePrice}`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;