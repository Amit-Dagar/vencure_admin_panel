import React, { PureComponent } from "react";
import Axios from "axios";
import { server, config } from "../.env";
import Alert from "../components/alert";
import Modal from "../components/modal";
import Spinner from "../components/spinner";
import axios from "axios";

export default class Dashboard extends PureComponent {
  state = {
    live_products: 0,
    offline_products: 0,
    products: 0,
    running_agreements: 0,
    expiring_agreements: 0,
    counter_agreements: 0,
    agreements: 0,
    vendors: 0,
    loader: "",
    isLoaded: false,
  };

  componentDidMount = async () => {
    this.setState({
      loader: <Spinner />,
    });
    await axios
      .get(server + "/api/vendor/adminDashboard", config)
      .then((rsp) => {
        this.setState({
          live_products: rsp.data.payload.live_products,
          offline_products: rsp.data.payload.offline_products,
          products: rsp.data.payload.products,
          running_agreements: rsp.data.payload.running_agreements,
          expiring_agreements: rsp.data.payload.expiring_agreements,
          counter_agreements: rsp.data.payload.counter_agreements,
          agreements: rsp.data.payload.agreements,
          vendors: rsp.data.payload.vendors,
          isLoaded: true,
        });
      });
  };

  render() {
    const {
      loader,
      isLoaded,
      products,
      live_products,
      offline_products,
      running_agreements,
      expiring_agreements,
      counter_agreements,
      agreements,
      vendors,
    } = this.state;
    return (
      <div className="nk-content-body">
        <div className="nk-block-head nk-block-head-sm">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h3 className="nk-block-title page-title">Dashboard</h3>
            </div>
            <div className="nk-block-head-content"></div>
          </div>
        </div>
        <div className="nk-block">
          <div className="row">
            {/* Products */}
            <div className="col-md-4 my-3">
              <div className="nk-download">
                <div className="data">
                  <div className="thumb">
                    <img src="./images/icons/product-pp.svg" alt="" />
                  </div>
                  <div className="info">
                    <h6 className="title">
                      <span className="name">Products</span>
                    </h6>
                    <div className="meta">
                      <span className="version">
                        <span className="text-soft">Live: </span>{" "}
                        <span>{isLoaded ? live_products : loader}</span>
                      </span>
                      <span className="release">
                        <span className="text-soft">Total: </span>{" "}
                        <span>{isLoaded ? products : loader}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Agreements */}
            <div className="col-md-4 my-3">
              <div className="nk-download">
                <div className="data">
                  <div className="thumb">
                    <img src="/images/icons/file-type-doc.svg" alt="" />
                  </div>
                  <div className="info">
                    <h6 className="title">
                      <span className="name">Agreements</span>
                    </h6>
                    <div className="meta">
                      <span className="version">
                        <span className="text-soft">Running: </span>{" "}
                        <span>{isLoaded ? running_agreements : loader}</span>
                      </span>
                      <span className="version">
                        <span className="text-soft">Counter: </span>{" "}
                        <span>{isLoaded ? counter_agreements : loader}</span>
                      </span>
                      <span className="version">
                        <span className="text-soft">Expiring Soon: </span>{" "}
                        <span>{isLoaded ? expiring_agreements : loader}</span>
                      </span>
                      <span className="release">
                        <span className="text-soft">Total: </span>{" "}
                        <span>{isLoaded ? agreements : loader}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Vendors */}
            <div className="col-md-4 my-3">
              <div className="nk-download">
                <div className="data">
                  <div className="thumb">
                    <img src="./images/icons/profile.svg" alt="" />
                  </div>
                  <div className="info">
                    <h6 className="title">
                      <span className="name">Vendors</span>
                    </h6>
                    <div className="meta">
                      <span className="release">
                        <span className="text-soft">Total: </span>{" "}
                        <span>{isLoaded ? vendors : loader}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
