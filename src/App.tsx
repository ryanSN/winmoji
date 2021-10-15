import './App.css';
import Layout from './components/Layout/Layout';
import Home from './containers/Home';
import { ElectronProvider } from './contexts';

function App() {
  return (
    <ElectronProvider>
      <Layout>
        <Home />
      </Layout>
    </ElectronProvider>
  );
}

export default App;
