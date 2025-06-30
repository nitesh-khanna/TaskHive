import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListTasksComponent from './components/ListTasksComponent'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import TaskComponent from './components/TaskComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'
import ForgotPasswordComponent from './components/ForgotPasswordComponent'
import ResetPasswordComponent from './components/ResetPasswordComponent'

function App() {

  function AuthenticatedRoute({children}){
    const isAuth = isUserLoggedIn();

    if(isAuth) return children;
    else return <Navigate to='/' />
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          <Route path='/todos' element = {
            <AuthenticatedRoute>
              <ListTasksComponent/>
            </AuthenticatedRoute>
            }></Route>
          <Route path='/add-todo' element = {
            <AuthenticatedRoute>
              <TaskComponent/>
            </AuthenticatedRoute>
            }></Route>
          <Route path='/update-todo/:id' element = {
            <AuthenticatedRoute>
              <TaskComponent/>
            </AuthenticatedRoute>
            }></Route>
          <Route path='/register' element = {<RegisterComponent/>}></Route>
          <Route path='/login' element = {<LoginComponent/>}></Route>
          <Route path='/' element = {<LoginComponent/>}></Route>
          <Route path='/forgot-password' element = {<ForgotPasswordComponent/>}></Route>
          <Route path='/reset-password' element = {<ResetPasswordComponent/>}></Route>
        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
