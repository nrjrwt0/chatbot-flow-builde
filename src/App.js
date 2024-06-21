import { ReactFlowProvider } from 'reactflow';
import './App.css';
import DnDFlow from './Components/DnDFlow';

function App() {
  return (
    <div className='parent-container'>
      <ReactFlowProvider>
        <DnDFlow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
