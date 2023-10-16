
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from"./Components/Home";
import Login from "./Components/Login";

import Create from './Components/Create';
import PostDetail from './Components/PostDeatil';
import AllPosts from './Components/Allpost';
import UserProfile from './Components/Userprofile';


// const URL = (mypath)=>{
//   return `http://localhost:4444/${mypath}`
//}

function App() {
  // useEffect(()=>{
  //   axios.get(URL('items'))
  //     .then((data)=>{
  //       console.log(data);
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })
  // },[]);
  return (
    <div className="App">
      {/* <Navbar /> */}
     <Routes>
      <Route path="/authenticate" element={<Login/>}>Log In</Route>
      {/* <Route path="/signup" element={<Signup/>}>Sign Up</Route> */}
      <Route path="/" element={<Home/>}>Home</Route>
      <Route path="/user/profile" element={<UserProfile/>}>Profile</Route>
      <Route path="/posts" element={<Create/>}>Create Posts</Route>
      <Route path="/post/:postId" component={PostDetail} />
      <Route path="/all_posts" component = {AllPosts} />
     </Routes>
    </div>
  );
}

export default App;
