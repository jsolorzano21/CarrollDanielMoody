import React from "react";
import dateFns from "date-fns";

  const events = [
    {
      id: 0,
      title: 'Board meeting',
      start: new Date(2019, 0, 29, 9, 0, 0),
      end: new Date(2019, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: 'MS training',
      start: new Date(2019, 0, 29, 14, 0, 0),
      end: new Date(2019, 0, 29, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: 'Team lead meeting',
      start: new Date(2019, 0, 29, 8, 30, 0),
      end: new Date(2019, 0, 29, 12, 30, 0),
      resourceId: 3,
    },
    {
      id: 10,
      title: 'Board meeting',
      start: new Date(2019, 0, 30, 23, 0, 0),
      end: new Date(2019, 0, 30, 23, 59, 0),
      resourceId: 1,
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2019, 0, 30, 7, 0, 0),
      end: new Date(2019, 0, 30, 10, 30, 0),
      resourceId: 4,
    },
    {
      id: 12,
      title: 'Board meeting',
      start: new Date(2019, 0, 29, 23, 59, 0),
      end: new Date(2019, 0, 30, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 13,
      title: 'Board meeting',
      start: new Date(2019, 0, 29, 23, 50, 0),
      end: new Date(2019, 0, 30, 13, 0, 0),
      resourceId: 2,
    },
    {
      id: 14,
      title: 'Board meeting',
      start: new Date(2019, 0, 29, 23, 40, 0),
      end: new Date(2019, 0, 30, 13, 0, 0),
      resourceId: 4,
    },
  ]
  
  const resourceMap = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
  ]


class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        events: events,
      };
    
      renderHeader() {
        const dateFormat = "MMMM YYYY";
    
        return (
          <div className="header row flex-middle">
            <div className="col col-start">
              <div className="icon" onClick={this.prevMonth}>
                chevron_left
              </div>
            </div>
            <div className="col col-center">
              <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
            </div>
            <div className="col col-end" onClick={this.nextMonth}>
              <div className="icon">chevron_right</div>
            </div>
          </div>
        );
      }
    
      renderDays() {
        const dateFormat = "dddd";
        const days = [];
    
        let startDate = dateFns.startOfWeek(this.state.currentMonth);
    
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col col-center" key={i}>
              {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
          );
        }
    
        return <div className="days row">{days}</div>;
      }
    
      renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
    
        const dateFormat = "D";
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";
    
        while (day <= endDate) {
          for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;
            days.push(
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                key={day}
                onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
              >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
              </div>
            );
            day = dateFns.addDays(day, 1);
          }
          rows.push(
            <div className="row" key={day}>
              {days}
            </div>
          );
          days = [];
        }
        return <div className="body">{rows}</div>;
      }

      renderData(){
        dateFns.events = events
      }
    
      onDateClick = day => {
        this.setState({
          selectedDate: day
        });
      };
    
      nextMonth = () => {
        this.setState({
          currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
      };
    
      prevMonth = () => {
        this.setState({
          currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
      };
    
      render() {
        return (
          <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
            {this.renderData()}
          </div>
        );
      }
    }

export default Calendar;