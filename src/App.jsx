import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import './styles/global.css';

/**
 * App Component
 * Root component that composes all page sections
 */
function App() {
  return (
    <div className="app">
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}

export default App;
