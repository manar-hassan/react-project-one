import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import NotFound from "./pages/NotFound";
import Signup from "./pages/signup/Signup";
import Signin from "pages/signin/Signin";
import Profile from "pages/profile/Profile";
import { useState } from "react";
import EditItem from "pages/edit-item/EditItem";



function App() {
  const [title, settitle] = useState("");

  const [price, setprice] = useState(0);
  


  const [month, setmonth] = useState("");
  
  const [array, setarray] = useState([]);
  const router = createBrowserRouter(
  
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route path="/" element={<Home  {...{title, settitle,price, setprice,month, setmonth,array, setarray}}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/create" element={<Create  {...{title, settitle,price, setprice,month, setmonth,array, setarray}}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-item/:stringId" element={<EditItem/>} />
    
        <Route path="*" element={<NotFound />} />
        {/* ... etc. */}
      </Route>
    )
  );
  

  return <RouterProvider router={router} />;
}

export default App;
