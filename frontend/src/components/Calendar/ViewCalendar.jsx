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
        return (
            <>
                {/* <b>{eventInfo.timeText}</b> */}
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    return (
        <div className='calendar'>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={events}
                eventContent={renderEventContent}
                // height={'100%'}
                themeSystem='bootstrap5'
                navLinks={true}
            />
        </div>
    );
}

export default ViewCalendar;