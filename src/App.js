// replace this logo laterz. import logo from './logo.svg';
import React from 'react';
import './App.css';
//import CustomButton from './components/CustomButton';
import NavBar from './components/NavBar';
import { Route, Routes, outlet, Outlet } from 'react-router-dom'
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/auth_pages/LoginPage';
import SignupPage from './pages/auth_pages/SignupPage';
import NotFound from './pages/error-pages/NotFound';
import GroupDetail from './pages/GroupDetail';
import { TasksProvider } from './contexts/TasksContext';



function App() {
  return (
      <div className="App">
        <NavBar />

        <Routes>
          {/* these paths will be public */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

          {/* these paths needs to be protected paths, "if auth." */}
          {/* adding route to wrap around protected route, use "/" parent route */}
          <Route path="/" element={
            <TasksProvider> 
              <Outlet />  {/* wrapping TaskProvider around outlet since route has to be 1st child of Router. */}
            </TasksProvider>
            } >
            <Route path='/groups' element={<GroupsPage />} />
            <Route path='/groups/:id' element={<GroupDetail />} />
            <Route path='/feed' element={<FeedPage />} />            
            <Route path='/tasks' element={<TasksPage />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
