import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks/index.ts';
import './ViewCalendar.scss';

function ViewCalendar() {
    const todos = useAppSelector((state) => state.todos);
    const forecast = useAppSelector((state) => state.forecast);

    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        if(todos) {
            // console.log(todos);
            let combinedEvents = [...todos];
            // console.log(forecast);
            for (let index = 0; index < forecast.length; index++) {
                const element = forecast[index];
                // console.log(element);

                const newEvent = {
                    start: element.date,
                    imageurl: element.day.condition.icon,
                };

                combinedEvents.push(newEvent);
            }
            // console.log(combinedEvents);
            setEvents(combinedEvents);
        }
    }, [events.length, forecast, todos]);

    function renderEventContent(eventInfo, eventElement) {
        if(eventInfo.event.title) {
            if(eventInfo.event.extendedProps.completed)
                return (
                    <>
                        <strong><strike>{ eventInfo.event.title }</strike></strong>
                    </>
                )
            else
                return (
                    <>
                        <strong>{ eventInfo.event.title }</strong>
                    </>
                )
        }
        else if(eventInfo.event._def.extendedProps.imageurl) {
            const imageUrl = eventInfo.event._def.extendedProps.imageurl;
            return (
                <>
                    <img src={imageUrl} className='fc-event-main-img' alt='' />
                </>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
        // console.log(eventInfo.event);
    }

    return (
        <div className='calendar' id='calendar'>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={events}
                handleWindowResize={true}
                windowResizeDelay={200}
                headerToolbar={{
                    start: 'today',
                    center: 'title',
                    end: 'dayGridMonth',
                }}
                footerToolbar={{
                    end: 'prev,next',
                }}
                /*
                headerToolbar={{
                    start: 'today',
                    center: 'title',
                    end: 'prev,next',
                }}
                */
                titleFormat={{ year: 'numeric', month: 'long' }}
                buttonText={{ today: 'Today', month: 'View' }}
                eventContent={renderEventContent}
                themeSystem='bootstrap5'
                navLinks={true}
            />
        </div>
    );
}

export default ViewCalendar;