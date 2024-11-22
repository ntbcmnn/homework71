import { NavLink, useLocation } from 'react-router-dom';

const Toolbar = () => {
  const {pathname} = useLocation();

  const toolbar = () => {
    if (pathname.startsWith('/admin')) {
      return (
        <>
          <NavLink className="d-inline-flex gap-2 navbar-brand fw-bold fs-4 text-white" to="/admin">
            <i className="bi bi-shop"></i>
            Chef's Pizza
          </NavLink>
          <div className="ms-auto d-flex gap-4 align-items-center">
            <NavLink to="/admin/pizzas" className="text-white text-decoration-none pe-4 border-end">Dishes</NavLink>
            <NavLink to="/admin/orders" className="text-white text-decoration-none">Orders</NavLink>
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavLink className="d-inline-flex gap-2 navbar-brand fw-bold fs-4 text-white" to="/">
            <i className="bi bi-shop"></i>
            Chef's Pizza
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav className="navbar bg-dark">
      <div className="container py-2">
        {toolbar()}
      </div>
    </nav>
  );
};

export default Toolbar;