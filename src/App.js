// replace this logo laterz. import logo from './logo.svg';
import React from 'react';
import './App.css';
//import CustomButton from './components/CustomButton';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom'
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/auth_pages/LoginPage';
import SignupPage from './pages/auth_pages/SignupPage';
import NotFound from './pages/error-pages/NotFound';
import GroupDetail from './pages/GroupDetail';




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

          <Route path='/feed' element={<FeedPage />} />
          <Route path='/groups' element={<GroupsPage />} />
          <Route path='/groups/:id' element={<GroupDetail />} />
          <Route path='/tasks' element={<TasksPage />} />
          
        </Routes>
      </div>
  );
}

export default App;
