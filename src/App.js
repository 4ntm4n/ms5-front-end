// replace this logo laterz. import logo from './logo.svg';
import './App.css';
import CustomButton from './components/CustomButton';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
        <Header />
        <CustomButton variant={'warning'} text={'warning button'} />
        <CustomButton variant={'large'} text={'large button'} />
        
    </div>
  );
}

export default App;
