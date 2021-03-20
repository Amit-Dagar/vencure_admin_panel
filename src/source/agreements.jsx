import React, { PureComponent } from "react";
import Axios from "axios";
import { server, config } from "../.env";
import Alert from "../components/alert";
import Modal from "../components/modal";
import Spinner from "../components/spinner";

export default class Agreements extends PureComponent {
  state = {
    agreements: [],
    search: "",
    next: null,
    prev: null,
    curr_url: "/api/agreement/read",
    loader: "",
    message: "",
  };

  componentDidMount = () => {
    this.readAgreements(this.state.curr_url);
  };

  search = () => {
    this.readAgreements(this.state.url, this.state.search);
  };

  readAgreements = (url, search = null) => {
    this.setState({
      loader: <Spinner />,
      curr_url: url,
    });

    this.setState({ url });
    url = search == null ? server + url : server + url + "?search=" + search;

    Axios.get(url, config)
      .then((rsp) => {
        this.setState({
          loader: null,
          agreements: rsp.data.results,
          total_agreements: rsp.data.count,
          next:
            rsp.data.next == null
              ? null
              : rsp.data.next.replace(/^.*\/\/[^\/]+/, ""),
          prev:
            rsp.data.previous == null
              ? null
              : rsp.data.previous.replace(/^.*\/\/[^\/]+/, ""),
        });
      })
      .catch((error) => {
        this.setState({
          loader: null,
        });
      });
  };

  render() {
    const { agreements, next, prev, loader, message } = this.state;

    return (
      <div className="nk-content-body">
        <div className="nk-block-head nk-block-head-sm">
          <div className="nk-block-between">
            <div className="nk-block-head-content">
              <h3 className="nk-block-title page-title">Agreements</h3>
            </div>
            <div className="nk-block-head-content">
              <div className="toggle-wrap nk-block-tools-toggle">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-row justify-content-end">
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control pl-1 w-100"
                          onChange={(event) =>
                            this.setState({
                              search: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-4">
                        <button
                          className="btn btn-primary"
                          onClick={this.search}
                        >
                          Search {loader}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nk-block">
          <div className="nk-tb-list is-separate mb-3">
            <div className="nk-tb-item">
              <div className="nk-tb-col">
                <span className="sub-text">Product Name</span>
              </div>
              <div className="nk-tb-col tb-col-md">
                <span className="sub-text">Vendor Email</span>
              </div>
              <div className="nk-tb-col tb-col-md">
                <span className="sub-text">Vendor Name</span>
              </div>
              <div className="nk-tb-col tb-col-md">
                <span className="sub-text">Total Cost</span>
              </div>
              <div className="nk-tb-col tb-col-lg">
                <span className="sub-text">Start Date</span>
              </div>
              <div className="nk-tb-col tb-col-lg">
                <span className="sub-text">End Date</span>
              </div>
              <div className="nk-tb-col tb-col-md">
                <span className="sub-text">Attachment</span>
              </div>
              <div className="nk-tb-col tb-col-md">
                <span className="sub-text">Delivery Type</span>
              </div>
              <div className="nk-tb-col tb-col-md">
                <span className="sub-text">Status</span>
              </div>
              <div className="nk-tb-col nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li>
                    <div className="drodown">
                      <a
                        href="#"
                        className="dropdown-toggle btn btn-icon btn-trigger mr-n1"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <em className="icon ni ni-more-h"></em>
                      </a>
                      {/* <div className="dropdown-menu dropdown-menu-right">
                      <ul className="link-list-opt no-bdr">
                        <li>
                          <a href="#">
                            <em className="icon ni ni-mail"></em>
                            <span>Send Email to All</span>
                          </a>
                        </li>
                      </ul>
                    </div> */}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {agreements.map((data, idx) => (
              <div className="nk-tb-item">
                <div className="nk-tb-col">
                  <span className="tb-product">
                    <img
                      src={server + "/media/" + data.product_banner}
                      alt=""
                      className="thumb"
                    />
                    <span>{data.product_name}</span>
                  </span>
                </div>
                <div className="nk-tb-col">
                  <span className="tb-sub">{data.vendor_email}</span>
                </div>
                <div className="nk-tb-col">
                  <span className="tb-sub">{data.vendor_name}</span>
                </div>
                <div className="nk-tb-col">
                  <span className="tb-sub">₹ {data.price}</span>
                </div>
                <div className="nk-tb-col">
                  <span className="tb-sub">
                    {new Date(data.start_date).toDateString()}
                  </span>
                </div>
                <div className="nk-tb-col">
                  <span className="tb-sub">
                    {new Date(data.end_date).toDateString()}
                  </span>
                </div>
                <div className="nk-tb-col">
                  <span className="tb-sub">
                    {data.attachment !== null ? (
                      <div className="thumb">
                        <a href={server + "/media/" + data.attachment} download>
                          <img
                            src="/images/icons/file-type-doc.svg"
                            height="40"
                            width="40"
                            alt=""
                          />
                        </a>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </div>
                <div className="nk-tb-col">
                  <span className="tb-sub">
                    {data.delivery === 1
                      ? "Pickup By Manufecturer"
                      : "Delivered By Vendor"}
                  </span>
                </div>
                <div className="nk-tb-col">
                  <span className="tb-sub">
                    {data.status === 1 ? (
                      <span className="text-warning">Waiting</span>
                    ) : data.status === 2 ? (
                      <span className="text-success">Running</span>
                    ) : data.status === 3 ? (
                      <span className="text-primary">Counter</span>
                    ) : (
                      <span className="text-danger">Ended</span>
                    )}
                  </span>
                </div>
                <div className="nk-tb-col nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1 my-n1">
                    <li className="mr-n1">
                      <div className="dropdown">
                        <a
                          href="#"
                          className="dropdown-toggle btn btn-icon btn-trigger"
                          data-toggle="dropdown"
                        >
                          <em className="icon ni ni-more-h"></em>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <a href="#">
                                <span>Accept Agreement</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span>Reject Agreement</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span>Counter Agreement</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <nav aria-label="Page navigation example" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={prev === null ? "page-item disabled" : "page-item"}>
              <button
                className="page-link"
                onClick={() => this.readAgreements(prev)}
                disabled={prev === null ? true : false}
              >
                Previous
              </button>
            </li>
            <li className={next === null ? "page-item disabled" : "page-item"}>
              <button
                className="page-link"
                href="#"
                onClick={() => this.readAgreements(next)}
                disabled={next === null ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
