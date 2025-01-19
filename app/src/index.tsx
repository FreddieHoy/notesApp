import dotenv from 'dotenv';
import { createRoot } from 'react-dom/client';
import { AppWrapper } from './App';

dotenv.config();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<AppWrapper />);
