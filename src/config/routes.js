// Layaout
import LayaoutAdmin from '../layaouts/LayaoutAdmin';
import LayaoutBasic from '../layaouts/LayaoutBasic';
// Admin Pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';
import AdminUsers from '../pages/Admin/Users';
import AdminMenuWeb from '../pages/Admin/MenuWeb';
import AdminCourses from '../pages/Admin/Courses';
import AdminBlog from '../pages/Admin/Blog';
//Basic Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Courses from '../pages/Courses';
// others
import Error404 from '../pages/Error404';
const routes = [
    {
        path: "/admin",
        component: LayaoutAdmin,
        exact: false, // false para que pueda cargar el componente en caso de /admin/contacts
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact : true 
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact : true 
            },
            {
                path: "/admin/courses",
                component: AdminCourses,
                exact : true 
            },
            {
                path: "/admin/blog",
                component: AdminBlog,
                exact : true 
            },
            {
                component: Error404,
            }
        ]
    },
    {
        path: "/",
        component: LayaoutBasic,
        exact: false, // false para que pueda cargar el componente en caso de /admin/contacts
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                path: "/courses",
                component: Courses,
                exact: true
            },
            {
                component: Error404,
            }
        ]
    }
];

export default routes;