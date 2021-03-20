import { BrowserRouter, Switch, Route } from "react-router-dom";
import SideBar from "../components/sidebar";
import TopBar from "../components/topbar";

import Dashboard from "../source/dashboard";

export default function DashboardRouter() {
  document.body.classList.add("npc-default");
  document.body.classList.add("has-sidebar");
  return (
    <BrowserRouter>
      <div className="nk-app-root">
        <div className="nk-main">
          <SideBar />
          <div className="nk-wrap ">
            <TopBar />
            <div className="nk-content ">
              <div className="container-fluid">
                <div className="nk-content-inner">
                  <Switch>
                    <Route path="/" component={Dashboard} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
