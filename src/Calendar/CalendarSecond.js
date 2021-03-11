import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default class CalendarSecond extends Component {
    constructor() {
      super();
      //const now = new Date();
      const events = [
        {
            id: 0,
            title: '30% DESIGN COMPLETE ',
            allDay: true,
            start: new Date(2020, 9, 27),
            end: new Date(2020, 9, 27),
        },
        {
            id: 1,
            title: '60% DESIGN COMPLETE ',
            start: new Date(2021, 0, 2),
            end: new Date(2021, 0, 2),
        },
        {
            id: 2,
            title: '100% DESIGN DOCUMENTS COMPLETE ',
            start: new Date(2021, 1, 21),
            end: new Date(2021, 1, 21),
        },
        {
          id: 3,
          title: 'Paver Replacement Package',
          start: new Date(2020, 10, 1),
          end: new Date(2021, 3, 1),
      },
      {
        id: 4,
        title: 'Signage Package',
        start: new Date(2021, 0, 1),
        end: new Date(2021, 1, 1),
      },
      {
        id: 5,
        title: 'All other work',
        start: new Date(2021, 2, 1),
        end: new Date(2021, 7, 1),
      },
      ]

      const events2 = [
        {
            id: 0,
            title: 'SCHEMATIC DESIGN (30%) COMPLETE',
            allDay: true,
            start: new Date(2021, 0, 21),
            end: new Date(2021, 0, 21),
        },
        {
            id: 1,
            title: 'DESIGN DEVELOPMENT (60%) COMPLETE',
            start: new Date(2021, 2, 5),
            end: new Date(2021, 2, 5),
        },
        {
            id: 2,
            title: 'CONSTRUCTION DOCUMENTS (100%) COMPLETE',
            start: new Date(2021, 3, 30),
            end: new Date(2021, 3, 30),
        }
      ]

      this.state = {
        events,
        events2
      };
    }

    render() {
        return (
            <div style={{ height: '500pt'}}>
              <Calendar
                events={this.state.events2}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                localizer={localizer}
              />
            </div>
        );
      }
    }