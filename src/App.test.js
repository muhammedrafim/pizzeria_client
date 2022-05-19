import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./reduxStore/store";
// import axios from "./axios/axios";
// jest.mock("axios");
describe("App Component Testing", () => {
  test("Check For Routing to Login with invalid Token  ", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>{" "}
      </Provider>
    );
    const linkElement = screen.getByText(/New User?/i);
    expect(linkElement).toBeInTheDocument();
  });
});
