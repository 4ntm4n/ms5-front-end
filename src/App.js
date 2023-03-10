// replace this logo laterz. import logo from './logo.svg';
import './App.css';
import CustomButton from './components/CustomButton';
import Header from './components/Header';

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
        <Header />
        <CustomButton variant={'light'} text={'warning button'} className={"btn btn-outline-primary"}/>
        <CustomButton variant={'dark'} text={'dark button'} />
        
    </div>
  );
}

export default App;
