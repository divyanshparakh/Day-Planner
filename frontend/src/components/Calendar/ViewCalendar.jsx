import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks/index.ts';

function ViewCalendar() {
    const todos = useAppSelector((state) => state.todos);
    const forecast = useAppSelector((state) => state.forecast);

    const [events, setEvents] = useState([]);
    
    useEffect(() => {

        if (events.length === 0) {
            let combinedEvents = [...todos];
            // console.log(forecast);
            for (let index = 0; index < forecast.length; index++) {
                const element = forecast[index];
    
                const newEvent = {
                    start: element.date,
                    imageurl: element.day.condition.icon,
                };
    
                combinedEvents.push(newEvent);
            }
            console.log(combinedEvents);
            setEvents(combinedEvents);
        }
    });

    function renderEventContent(eventInfo) {
        // console.log(eventInfo.event);
        if (eventInfo.event.extendedProps.completed) {
            return (
                <>
                    <strong><strike>{ eventInfo.event.title }</strike></strong>
                </>
            )
        }
        else {
            return (
                <>
                    {/* <b>{eventInfo.timeText}</b> */}
                    <strong>{ eventInfo.event.title }</strong>
                </>
            )
        }
    }

    return (
        <div className='calendar'>
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
                    end: 'prev,next',
                }}
                titleFormat={{ year: 'numeric', month: 'long' }}
                buttonText={{today: 'Today'}}
                eventContent={renderEventContent}
                // height={'100%'}
                themeSystem='bootstrap5'
                navLinks={true}
            />
        </div>
    );
}

export default ViewCalendar;