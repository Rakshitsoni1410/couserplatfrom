import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

// ✅ Importing pages
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

// ✅ Admin Components
import Sidebar from "./pages/admin/lecture/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";

// ✅ Student Components
import CourseDetail from "./pages/student/CourseDetail";
import PaymentPage from "./components/ui/PaymentPage";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ui/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/ui/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ui/ThemeProvider";

// ✅ Defining Routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 📌 Main layout wrapper
    //errorElement: <ErrorPage />, // Handles route errors (Uncomment if you have an ErrorPage component)
    children: [
      {
        index: true, // ✅ Default route (Home)
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ), // ✅ Login page
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ), // ✅ User's learning section
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ), // ✅ User profile page
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId", // ✅ Course details page
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment/:courseId", // ✅ Payment page for purchasing a course
        element: (
            <PaymentPage />
        ),
      },
      {
        path: "course-progress/:courseId", // ✅ Course details page
        element: (
          <ProtectedRoute>
            <CourseProgress />
          </ProtectedRoute>
        ),
      },
      // 📌 Admin Routes (Requires authentication)
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ), // ✅ Sidebar wrapper for admin panel
        children: [
          {
            path: "dashboard",
            element: <Dashboard />, // ✅ Admin dashboard
          },
          {
            path: "course",
            element: <CourseTable />, // ✅ List of courses
          },
          {
            path: "course/create",
            element: <AddCourse />, // ✅ Add new course
          },
          {
            path: "course/:courseId",
            element: <EditCourse />, // ✅ Edit an existing course
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />, // ✅ Add lectures to a course
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />, // ✅ Edit a specific lecture
          },
        ],
      },
    ],
  },
]);

// ✅ App Component
function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
