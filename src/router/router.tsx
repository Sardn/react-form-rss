import App from '../App';
import HookForm from '../pages/HookForm';
import UncontrolledForm from '../pages/UncontrolledForm';
import MainPage from '../pages/HomePage';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'uncontrolled-form',
        element: <UncontrolledForm />,
      },
      {
        path: 'hook-form',
        element: <HookForm />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/',
});
export default router;
