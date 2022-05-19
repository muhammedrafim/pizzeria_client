import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { logoutAction } from "../actions/authActions";

function Header() {
  // cartItemCount is to store number of items in cart this comes from redux store
  const cartItemCount = useSelector(state => state.cartReducer.items.length);

  // user is to store  details of currently logged in user
  const user = useSelector(state => state.authReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // To handle logout this function is used
  let logoutHandler = () => {
    dispatch(logoutAction());

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg py-1 navbar-dark  bg-black ">
      <div className="container-fluid">
        <Link className="navbar-brand text-white-50 fs-4" to="/">
          Pizzeria
          <img
            className="ms-3"
            src="images/logo.png"
            alt=""
            width="60"
            height="50"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink active="active" className="nav-link" to="/orderpizza">
                Order Pizza
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink active="active" className="nav-link" to="/buildpizza">
                Build Ur Pizza
              </NavLink>
            </li>
          </ul>
          {user
            ? <>
                <div className="text-white me-2">
                  Hi, {user.name}
                </div>

                <button
                  onClick={logoutHandler}
                  className="btn btn-black text-white  me-1"
                >
                  {" "}<i className="fas fa-sign-out-alt" /> Logout
                </button>
                <Link
                  active="active"
                  to="/cart"
                  className="btn btn-warning text-white position-relative me-1"
                >
                  <i className="fas fa-shopping-cart" />Shopping cart
                  {cartItemCount > 0 &&
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      {cartItemCount}
                      <span className="visually-hidden">
                        Items in your cart{" "}
                      </span>
                    </span>}
                </Link>
              </>
            : <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink active="active" className=" nav-link" to="/login">
                    <i className="fas fa-sign-in-alt" /> Login
                  </NavLink>
                </li>{" "}
                <li className="nav-item">
                  <NavLink active="active" className=" nav-link" to="/signup">
                    <i className="fas fa-user-plus" /> Signup
                  </NavLink>
                </li>{" "}
              </ul>}
        </div>
      </div>
    </nav>
  );
}

export default Header;
