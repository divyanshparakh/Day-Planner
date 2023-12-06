import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import React, { useState, useEffect } from 'react';

function ViewCalendar(todos) {
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        setEvents(todos.todos);
        // console.log(todos.todos);
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