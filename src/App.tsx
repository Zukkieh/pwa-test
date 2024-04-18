import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { List } from './features/list';
import { Menu } from "./features/menu";
import { Register } from './features/register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Menu />}>
      <Route index element={<></>} />
      <Route path="list" element={<List />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
)

function App({ }) {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;