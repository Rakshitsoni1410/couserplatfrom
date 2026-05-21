import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";

import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import {
  IndianRupee,
  ShoppingCart,
  BookOpen,
  TrendingUp,
  Loader2,
} from "lucide-react";

const Dashboard = () => {
  const {
    data,
    isError,
    isLoading,
  } = useGetPurchasedCoursesQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
          <h1 className="text-red-400 text-lg font-semibold">
            Failed to load dashboard data
          </h1>
        </div>
      </div>
    );
  }

  const { purchasedCourse } = data || {
    purchasedCourse: [],
  };

  // Chart Data
  const courseData = purchasedCourse
    .filter((course) => course.courseId)
    .map((course) => ({
      name:
        course.courseId.courseTitle.length > 20
          ? course.courseId.courseTitle.slice(0, 20) + "..."
          : course.courseId.courseTitle,

      price: course.courseId.coursePrice,

      sales: course.amount || 0,
    }));

  // Stats
  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  const totalCourses = new Set(
    purchasedCourse
      .filter((item) => item.courseId)
      .map((item) => item.courseId._id)
  ).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Track your sales, revenue, and course
            performance.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {/* TOTAL SALES */}
          <Card className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">

            <CardContent className="p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    Total Sales
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {totalSales}
                  </h2>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                  <ShoppingCart className="text-indigo-400 w-7 h-7" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TOTAL REVENUE */}
          <Card className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">

            <CardContent className="p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    Total Revenue
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    ₹{totalRevenue}
                  </h2>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <IndianRupee className="text-green-400 w-7 h-7" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TOTAL COURSES */}
          <Card className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">

            <CardContent className="p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    Total Courses
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {totalCourses}
                  </h2>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <BookOpen className="text-purple-400 w-7 h-7" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">

          {/* COURSE PRICE CHART */}
          <Card className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl">

            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="text-indigo-400" />
                Course Prices
              </CardTitle>
            </CardHeader>

            <CardContent>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <LineChart data={courseData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    angle={-15}
                    textAnchor="end"
                    interval={0}
                    height={70}
                  />

                  <YAxis stroke="#94a3b8" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* SALES CHART */}
          <Card className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl">

            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="text-green-400" />
                Revenue Analytics
              </CardTitle>
            </CardHeader>

            <CardContent>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <AreaChart data={courseData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    angle={-15}
                    textAnchor="end"
                    interval={0}
                    height={70}
                  />

                  <YAxis stroke="#94a3b8" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#22c55e"
                    fill="#22c55e33"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;