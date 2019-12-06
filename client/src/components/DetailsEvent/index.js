import React, { Component } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import axios from "axios";
import "./detailsevent.css";

class DetailsEvent extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    const id = this.props.history.location.event.id;
    axios
      .get(`/event/${id}`)
      .then(({ data }) => {
        this.setState({
          role: data.userRole,
          event_details: data.event,
          coffee_details: data.coffee,
          lunch_details: data.lunch,
          equipment_details: data.equipment,
          status: data.event.status,
          loading: true
        });
      })
      .catch(() => {
        const { history } = this.props;
        history.push("/error");
      });
  }

  handleSubmitForm = event => {
    event.preventDefault();
    const { history } = this.props;
    const { serviceId } = this.state.event_details;
    const { id } = this.props.history.location.event;
    axios
      .put(`/event/${id}`)
      .then(data => {
        history.push(`/events-calendar/${serviceId}`);
      })
      .catch(() => {
        history.push("/error");
      });
  };

  close = () => {
    const { serviceId } = this.state.event_details;
    const { history } = this.props;
    history.push(`/events-calendar/${serviceId}`);
  };

  render() {
    if (this.state.loading === true) {
      const {
        title = "event-title",
        start_date = "",
        end_date = "",
        org_name = "",
        price = "",
        capacity = "",
        note = ""
      } = this.state.event_details || {};

      const coffee_note = "" || this.state.coffee_details.note;
      const coffee_price = "" || this.state.coffee_details.price;
      const coffee_time = "" || this.state.coffee_details.time;

      const lunch_note = "" || this.state.lunch_details.note;
      const lunch_price = "" || this.state.lunch_details.price;
      const lunch_time = "" || this.state.lunch_details.time;

      const equipment_price = "" || this.state.equipment_details.price;
      const equipment_note = "" || this.state.equipment_details.note;
      let start_ddmmyyyy = new Date(start_date);

      start_ddmmyyyy =
        start_ddmmyyyy.getDate() +
        "-" +
        start_ddmmyyyy.getMonth() +
        "-" +
        start_ddmmyyyy.getFullYear();

      let end_ddmmyyyy = new Date(end_date);

      end_ddmmyyyy =
        end_ddmmyyyy.getDate() +
        "-" +
        end_ddmmyyyy.getMonth() +
        "-" +
        end_ddmmyyyy.getFullYear();

      let needApprove = false;
      if (this.state.role === "admin" && this.state.status === 0) {
        needApprove = true;
      } else {
        needApprove = false;
      }

      let totalcost =
        price + capacity * (lunch_price + coffee_price) + equipment_price;

      const id = this.state.event_details.serviceId;

      return (
        <div className="page">
          <div>
            <NavBar {...this.props} />
          </div>
          <div className="both">
            <SideBar id={id} />
            <div className="detailsEvent">
              <form onSubmit={this.handleSubmitForm}>
                <h2 className="h22">General</h2>
                <div className="labels_container">
                  <label className="title">Event Name:</label>
                  <label className="answer">{title}</label>
                  <label className="Organization">Organization Name:</label>
                  <label className="answer">{org_name}</label>
                </div>
                <div className="labels_container">
                  <label className="title">Start Date:</label>
                  <label className="answer">{start_ddmmyyyy}</label>
                  <label className="EndDate">End Date:</label>
                  <label className="answer">{end_ddmmyyyy}</label>
                </div>
                <div className="labels_container">
                  <label className="title">Hall cost:</label>
                  <label className="answer">{price}</label>
                  <label className="persons">Number of persons:</label>
                  <label className="answer">{capacity}</label>
                </div>
                <div className="note-description">
                  <label className="Note">Note:</label>
                  <div className="discrp">{note}</div>
                </div>

                <h2 className="h22">Lunch</h2>

                <div className="labels_container">
                  <label className="title">Time:</label>
                  <label className="answer">{lunch_time}</label>
                </div>
                <div className="labels_container">
                  <label className="title">Price Per Person:</label>
                  <label className="answer">{lunch_price}</label>
                </div>
                <div className="note-description ">
                  <label className="title">Description:</label>
                  <div className="discrp">{lunch_note}</div>
                </div>
                <h2 className="h22">Coffee</h2>
                <div className="labels_container">
                  <label className="title">Time:</label>
                  <label className="answer">{coffee_time}</label>
                </div>
                <div className="labels_container">
                  <label className="title">Price Per Person:</label>
                  <label className="answer">{coffee_price}</label>
                </div>
                <div className="note-description">
                  <label className="title">Description:</label>
                  <label className="discrp">{coffee_note}</label>
                </div>
                <h2 className="h22">Equipment</h2>
                <div className="labels_container">
                  <label className="title">Price:</label>
                  <label className="answer">{equipment_price}</label>
                </div>
                <div className="note-description">
                  <label className="title">Description:</label>
                  <div className="discrp">{equipment_note}</div>
                </div>
                <div className="outer">
                  <div className="total-cost">
                    <p>Total Cost: </p>
                    <p className="h21">{totalcost}</p>
                  </div>
                </div>
                <div className="button">
                  {needApprove && (
                    <input type="submit" value="Approve" className="Approve" />
                  )}
                  <input
                    type="button"
                    value="Close"
                    className="Cancel"
                    onClick={this.close}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return <h1>loading..</h1>;
  }
}
export default DetailsEvent;
