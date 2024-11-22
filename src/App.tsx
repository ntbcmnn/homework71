import './App.css';
import Add from './containers/Add/Add.tsx';
import { Route, Routes } from 'react-router-dom';
import AdminDishes from './containers/AdminDishes/AdminDishes.tsx';
import Edit from './containers/Edit/Edit.tsx';
import Client from './containers/Client/Client.tsx';
import Toolbar from './components/Toolbar/Toolbar.tsx';
import AdminOrders from './containers/AdminOrders/AdminOrders.tsx';

const App = () => {
  return <>
    <Toolbar/>
    <div className="container m-5">
      <Routes>
        <Route path="/" element={<Client/>}/>
        <Route path="/admin" element={<AdminDishes/>}/>
        <Route path="/admin/pizzas" element={<AdminDishes/>}/>
        <Route path="/admin/orders" element={<AdminOrders/>}/>
        <Route path="/admin/add" element={<Add/>}/>
        <Route path="/admin/:pizzaId/edit" element={<Edit/>}/>
        <Route path="*" element={<h2 className="text-center">Page not found</h2>}/>
      </Routes>
    </div>
  </>;
};

export default App;