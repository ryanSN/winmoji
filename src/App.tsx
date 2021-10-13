import './App.css';
import Home from './containers/Home';
import { ElectronProvider } from './contexts';

function App() {
  return (
    <ElectronProvider>
      <Home />
    </ElectronProvider>
  );
}

export default App;
