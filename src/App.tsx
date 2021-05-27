import { Switch, Route } from "react-router-dom";
import { StoredIssuesProvider } from "./context/Issues";
import { SearchProvider } from "./context/Search";
import Home from "./pages/home";
import Issue from "./pages/issue";

function App() {
  return (
    <SearchProvider>
      <StoredIssuesProvider>
        <Switch>
          <Route path="/:organization/:repository/issues/:id">
            <Issue />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </StoredIssuesProvider>
    </SearchProvider>
  );
}

export default App;
