import { RouterProvider } from 'react-router';
import { router } from './routes.jsx';
import '../i18n.js';

export default function App() {
  return <RouterProvider router={router} />;
}
