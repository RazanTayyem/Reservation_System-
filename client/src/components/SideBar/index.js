import React, { Component } from "react";
import axios from "axios";
import "./sidebar.css";

class SideBar extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    const { id } = this.props;

    axios
      .get(`/events/${id}`)
      .then(({ data }) => {
        const service = data.service;

        this.setState({
          service,
          loading: true
        });
      })
      .catch(error => {
        const { history } = this.props;
        history.push("/error");
      });
  }

  render() {
    if (this.state.loading === true) {
      const { image, name, capacity, equipment } = this.state.service;

      return (
        <div className="side-bar">
          <div className="card">
            <img src={image} alt="hall" className="imageCard" />
            <h3 className="card-typing">{name}</h3>
            <p className="card-typing">{capacity}</p>
            <p className="card-typing">{equipment}</p>
            <div className="agenda-colors">
              <div className="color-typing">
                <div className="blue" />
                <p className="agenda-prop">approved</p>
              </div>
              <div className="color-typing">
                <div className="yellow" />
                <p className="agenda-prop">pending</p>
              </div>
            </div>
          </div>
          <div className="line" />
        </div>
      );
    } else {
      return <h1>loading..</h1>;
    }
  }
}
export default SideBar;
