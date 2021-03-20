import React, { PureComponent } from "react";

export default class Topbar extends PureComponent {
  logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("tokenDate");
    window.location.href = "/";
  };

  render() {
    return (
      <div className="nk-header nk-header-fixed is-light">
        <div className="container-fluid">
          <div className="nk-header-wrap">
            <div className="nk-menu-trigger d-xl-none ml-n1">
              <a
                href="#"
                className="nk-nav-toggle nk-quick-nav-icon"
                data-target="sidebarMenu"
              >
                <em className="icon ni ni-menu"></em>
              </a>
            </div>
            <div className="nk-header-brand d-xl-none">
              <a href="html/index.html" className="logo-link">
                <img
                  className="logo-light logo-img"
                  src="/images/logo-dark.png"
                  alt="logo"
                />
                <img
                  className="logo-dark logo-img"
                  src="/images/logo-dark.png"
                  alt="logo-dark"
                />
              </a>
            </div>
            <div className="nk-header-tools">
              <ul className="nk-quick-nav">
                <li className="dropdown user-dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle mr-n1"
                    data-toggle="dropdown"
                  >
                    <div className="user-toggle">
                      <div className="user-avatar sm">
                        <em className="icon ni ni-user-alt"></em>
                      </div>
                      <div className="user-info d-none d-xl-block">
                        <div className="user-name dropdown-indicator">
                          {localStorage.getItem("username")}
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li>
                          <a href="html/user-profile-setting.html">
                            <em className="icon ni ni-setting-alt"></em>
                            <span>Account Setting</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li>
                          <a href="#" onClick={this.logout}>
                            <em className="icon ni ni-signout"></em>
                            <span>Logout</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
