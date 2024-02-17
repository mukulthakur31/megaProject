import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { AuthLayout,Login} from './components/index.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Post from './pages/Post.jsx'
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Allposts from './pages/Allposts.jsx'
import Addpost from './pages/Addpost.jsx'
import Home from './pages/Home.jsx'
// import Login from './pages/Login.jsx'



const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path:'/All-posts',
        element:(
          <AuthLayout authentication>
            {" "}
           <Allposts/>
          </AuthLayout>
        )
      },
      {
        path:'/Add-post',
        element:(
          <AuthLayout authentication>
            {" "}
           <Addpost/>
          </AuthLayout>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <AuthLayout authentication>
            {" "}
           <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:'/post/:slug',
        element:<Post/>
      }

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
