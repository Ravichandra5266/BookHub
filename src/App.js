import { Route, Switch, Redirect } from "react-router-dom";

import LoginPage from "./components/LoginPage";

import HomePage from "./components/HomePage";

import BooksPage from "./components/BooksPage";

import BookItemDetail from "./components/BookItemDetail";

import PageNotFound from "./components/PageNotFound";

import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoutes exact path="/" component={HomePage} />
      <ProtectedRoutes exact path="/bookshelves" component={BooksPage} />
      <ProtectedRoutes
        exact
        path="/bookshelves/:id"
        component={BookItemDetail}
      />
      <Route exact path="/not-found" component={PageNotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default App;
