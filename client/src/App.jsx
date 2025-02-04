
import'./App.css'
import Navbar from './components/ui/Navbar'; // Ensure this path is correct
import Login from './pages/Login'; // Ensure this path is correct
import HeroSection from './pages/student/HeroSection';

function App() {
  return (
    <main> 
      <Navbar/>
      <HeroSection />
      <Login/>
    </main>
  );
}

export default App;