import { ReactFlowProvider } from 'reactflow';
import './App.css';
import DnDFlow from './Components/DnDFlow';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className='parent-container'>
      <Navbar />
      <ReactFlowProvider>
        <DnDFlow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
