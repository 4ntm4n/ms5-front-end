// replace this logo laterz. import logo from './logo.svg';
import './App.css';
import CustomButton from './components/CustomButton';
import NavBar from './components/NavBar';
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home';

/**
 * Custom button component that supports the following variants from Bootstrap:
 * primary, secondary, success, danger, warning, info, light, dark, link
 *
 * Props:
 * - variant: string (one of the supported Bootstrap variants)
 * - text: string (the text to display on the button)
 */

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
