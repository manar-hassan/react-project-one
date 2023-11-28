import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from './pages/Root';
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Profile from "./pages/profile/Profile";
import Setting from "./pages/setting/Setting";
import Logout from "./pages/logout/Logout";
import NotFound from "./pages/NotFound";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route path="/" element={<Home/>} />
      <Route path="create" element={<Create/>} />
      <Route path="*" element={<NotFound/>} />
      {/* ... etc. */}
    </Route>
  )
);


function App() {
  return (
    
      <RouterProvider router={router}/>
      
  );
}

export default App;
