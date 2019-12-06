import React, { Component } from "react";
import Calendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import "./calendar.css";
import moment from "moment";
import axios from "axios";

class BigCalendar extends Component {
  state = {
    loading: false
  };
  componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(`/events/${id}`)
      .then(({ data }) => {
        const result = data.events;
        const service = data.service;

        const events = result.map(event => {
          return {
            id: event.id,
            title: event.title,
            start: new Date(event.start_date),
            end: new Date(event.end_date),
            status: event.status,
            price: event.price,
            capacity: event.capacity,
            note: event.note,
            orgName: event.org_name,
            userId: event.eventId,
            serviceId: event.serviceId
          };
        });
        this.setState({
          service,
          events,
          loading: true
        });
      })
      .catch(error => {
        const { history } = this.props;
        history.push("/error");
      });
  }

  bookEvent = event => {
    const { history } = this.props;
    const serviceId = this.state.service.id;
    history.push({ pathname: `/bookevent/${serviceId}`, event });
  };

  detailsEvent = event => {
    const { history } = this.props;
    history.push({ pathname: "/detailsevent", event });
  };

  pendingEventStyle = event => {
    if (event.status === 0) {
      const style = { backgroundColor: "#D4AC0D" };
      return { style: style };
    }
  };

  render() {
    const localizer = Calendar.momentLocalizer(moment);
    const { events, loading } = this.state;
    if (loading) {
      const { id } = this.state.service;
      return (
        <div className="page">
          <div>
            <NavBar {...this.props} />
          </div>
          <div className="both">
            <SideBar id={id} />
            <div className="calendar-container">
              <Calendar
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView={"week"}
                views={["week", "day"]}
                events={events}
                style={{ height: "100vh" }}
                onSelectEvent={this.detailsEvent}
                onSelectSlot={this.bookEvent}
                eventPropGetter={this.pendingEventStyle}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>loading </h1>;
    }
  }
}
export default BigCalendar;
