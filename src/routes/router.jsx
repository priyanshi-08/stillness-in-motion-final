import { createBrowserRouter } from "react-router-dom"; 
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import InstructorPage from "../pages/InstructorPage";
import ClassesPage from "../pages/Classes/ClassesPage";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClasses from "../pages/Classes/SingleClasses";
import DashBoardLayout from "../layout/DashBoardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrollClasses from "../pages/Dashboard/Student/EnrollClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import PaymentHistory from "../pages/Dashboard/Student/Payment/PaymentHistory";
import ApplyIntsructor from "../pages/Dashboard/Student/ApplyIntsructor";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import PendingClass from "../pages/Dashboard/Instructor/PendingClass";
import ApprovedClass from "../pages/Dashboard/Instructor/ApprovedClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import AdminCP from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import UpdateUser from "../pages/Dashboard/Admin/UpdateUser";
import ManageApplications from "../pages/Dashboard/Admin/ManageApplications";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout/>,
        children:[
            {
                path:'/',
                element: <HomePage/>
            },
            {
                path:"instructors",
                element:<InstructorPage/>
            },
            {
                path:"classes",
                element:<ClassesPage/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/class/:id",
                element:<SingleClasses/>,
                loader:({params}) => fetch(`https://stillness-in-motion-server.onrender.com/class/${params.id}`)
            }
        ]
    },
    {
        "path": '/dashboard',
        "element": <DashBoardLayout/>,
        children: [
            {
                index:true,
                element: <Dashboard/>
            },
            {
                path:"student-cp",
                element:<StudentCP/>
            },
            {
                path:"enrolled-class",
                element:<EnrollClasses/>
            },
            {
                path:"my-selected",
                element:<SelectedClass/>
            },
            {
                path:"my-payments",
                element:<PaymentHistory/>
            },
            {
                path:"apply-instructor",
                element:<ApplyIntsructor/>
            },
            {
                path:"user/payment",
                element:<Payment/>
            },
            // instructor routes
            {
                path:"instructor-cp",
                element:<InstructorCP/>
            },
            {
                path:"add-classes",
                element:<AddClass/>
            },
            {
                path:"my-classes",
                element:<MyClasses/>
            },
            {
                path:"my-pending",
                element:<PendingClass/>
            },
            {
                path:"my-approved",
                element:<ApprovedClass/>
            },

            //admin routes
            {
                path:"admin-home",
                element:<AdminCP/>
            },
            {
                path:"manage-users",
                element:<ManageUsers/>
            },
            {
                path:"manage-classes",
                element:<ManageClasses/>
            },
            {
                path:"update-user/:id",
                element:<UpdateUser/>,
                loader: ({params}) => fetch(`https://stillness-in-motion-server.onrender.comusers/${params.id}`)
            },
            {
                path:"manage-applications",
                element:<ManageApplications/>
            }
        ]
    }
]);