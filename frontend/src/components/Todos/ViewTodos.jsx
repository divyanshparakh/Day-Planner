import React, { useState, useEffect } from 'react';
import './ViewTodos.scss';
import api from '../../index';
import ViewCalendar from '../Calendar/ViewCalendar';


function ViewTodos({decodedToken, logoutButton}) {
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openAddDialog, handleAddTodoDialogOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState({
        id: '0',
        title: '',
        progress: 0, // Assuming progress is a number, change it according to your requirements
    });
    const [newTodo, setNewTodo] = useState({
        id: '0',
        title: '',
        progress: 0, // Assuming progress is a number, change it according to your requirements
        start: '00-00-0000'
    });
    const [searchTerm, setSearchTerm] = useState();

    const getTodos = async () => {
        try {
            const response = await api.get("/todos", {
                decodedToken,
            });
            if(response.status === 200) {
                setTodos(response.data);
            }
            setIsLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error, e.g., redirect to login page
                localStorage.removeItem('token');
            } else {
                console.error("Error fetching todos:", error);
                setIsLoading(true);
            }
        }
    };

    const handleCreateTodo = async () => {
        setEditingTodo(null);
        try {
            const response = await api.post("/todos", {
                ...newTodo,
            });
            setNewTodo({
                id: "0",
                title: "",
                start: "",
                progress: 0,
            });
            handleAddTodoDialogOpen(false);
            getTodos();
        } catch (error) {
            console.log(error.response.data.message.replace(/"/g, ""));
        }
    };

    const handleEditTodo = async () => {
        try {
            await api.put(`/todos/${editingTodo.id}`, {
                title: editingTodo.title,
                progress: editingTodo.progress
            })
            .then(
                setEditingTodo(null)
            );
            getTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };
    
    const handleDeleteTodo = async (todoId) => {
        try {
            setEditingTodo(null);
            await api.delete(`/todos/${todoId}`)
            .then(
                getTodos()
            )
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleDoneTodo = async (todoId) => {
        try {
            // await api.put(`/todos/${todoId}`, { completed: true });
            const completedTodo = todos.find(todo => todo.id === todoId);
            setCompletedTodos(prevCompletedTodos => [...prevCompletedTodos, completedTodo]);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
        } catch (error) {
            console.error("Error marking todo as done:", error);
        }
        var element = document.getElementById('todo-' + todoId);
        if (element.classList.contains('done')) {
            element.classList.remove('done');
        }
        else {
            element.classList.add('done');
        }
    };

    const handleNewTodoDialogClose = () => {
        handleAddTodoDialogOpen(false);
    };

    const handleEditTodoDialogOpen = (todoId) => {
        handleNewTodoDialogClose();
        const editingTodo = todos.find((todo) => todo.id === todoId);
        setEditingTodo(editingTodo);
    };

    const calculateBackground = (progress) => {
        return `linear-gradient(to right, #8d80f6 ${progress}%, #625a69 ${progress}%)`;
    };

    useEffect(() => {
        getTodos();
        // console.log(decodedToken);
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
            // Close the add todo dialog
                handleNewTodoDialogClose();
                setEditingTodo(null);
            // Close the edit todo dialog                
            }
        };
        // Attach the event listener
        window.addEventListener('keydown', handleKeyDown);
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
	}, []);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    const showCompleted = false;

    // const filteredTodos = showCompleted ? completedTodos : todos.filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="scaffold">
            <h1>TODOs</h1>
            <section className='upper-section'>
                <button onClick={() => handleAddTodoDialogOpen(true)}>Add</button>
                { logoutButton }
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </section>
            {
                openAddDialog && (
                    <form className="dialog create-todo" onSubmit={handleNewTodoDialogClose}  style={{ background: calculateBackground(newTodo.progress) }}>
                        <input
                            type="text"
                            value={newTodo.title}
                            className='title'
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                            autoFocus
                        />
                        <div className="range-slider-container">
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={newTodo.progress}
                                className='slider'
                                onChange={(e) => setNewTodo({ ...newTodo, progress: parseInt(e.target.value, 10) })}
                            />
                            <span className="slider-value">{newTodo.progress}</span>
                        </div>
                        <input
                            type="date"
                            value={newTodo.start}
                            className='start'
                            onChange={(e) => setNewTodo({ ...newTodo, start: e.target.value })}
                        />
                        {newTodo.title && <button onClick={handleCreateTodo}>Add</button>}
                        <button type='submit'>Cancel</button>
                    </form>
                )
            }
            <section className="todo-list-section">
                <h2>Incomplete Todos</h2>
                <ul className="todos-list">
                    {todos.length > 0 && todos.map((todo, index) => (
                        <li id={"todo-" + todo.id}  key={todo.id} className="todo-item-card" style={{ background: calculateBackground(editingTodo?.progress || todo.progress) }}>
                            {editingTodo && editingTodo.id === todo.id ? (
                                <form onSubmit={(e) => handleEditTodo(e, todo.id)} className="edit-todo-form">
                                    <input
                                        id={"todo-" + todo.id}
                                        type="text"
                                        value={editingTodo.title}
                                        className='title'
                                        onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                                        autoFocus
                                    />
                                    <div className="range-slider-container">
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            value={editingTodo.progress}
                                            className='slider'
                                            onChange={(e) => setEditingTodo({ ...editingTodo, progress: parseInt(e.target.value, 10) })}
                                        />
                                        <span className="slider-value">{editingTodo.progress}</span>
                                    </div>
                                    {(editingTodo.title !== todo.title || editingTodo.progress !== todo.progress) && <button type='submit'>Save</button>}
                                    <button type='button' onClick={() => { setEditingTodo(null) }}>Cancel</button>
                                </form>
                            ) : (
                                <div className="todo-card-header" onClick={() => handleEditTodoDialogOpen(todo.id)}>
                                    {todo.title}
                                </div>
                            )}
                            <div className="todo-card-options">
                                {/* <button onClick={() => handleEditTodoDialogOpen(todo.id)}>Edit</button> */}
                                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                <button type="button" onClick={() => handleDoneTodo(todo.id)}>Done</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="completed-todos-section todo-list-section">
                <h2>Completed Todos</h2>
                <ul className="completed-todos-list todos-list">
                    {completedTodos.length > 0 && completedTodos.map((todo, index) => (
                        <li id={"todo-" + todo.id}  key={todo.id} className="todo-item-card" style={{ background: calculateBackground(editingTodo?.progress || todo.progress) }}>
                            {editingTodo && editingTodo.id === todo.id ? (
                                <form onSubmit={(e) => handleEditTodo(e, todo.id)} className="edit-todo-form">
                                    <input
                                        id={"todo-" + todo.id}
                                        type="text"
                                        value={editingTodo.title}
                                        className='title'
                                        onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                                        autoFocus
                                    />
                                    <div className="range-slider-container">
                                        <span className="slider-value">{editingTodo.progress}</span>
                                    </div>
                                    {(editingTodo.title !== todo.title || editingTodo.progress !== todo.progress) && <button type='submit'>Save</button>}
                                    <button type='button' onClick={() => { setEditingTodo(null) }}>Cancel</button>
                                </form>
                            ) : (
                                <div className="todo-card-header">
                                    {todo.title}
                                </div>
                            )}
                            <div className="todo-card-options">
                                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                <button type="button" onClick={() => handleDoneTodo(todo.id)}>Done</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <ViewCalendar todos={todos}></ViewCalendar>
        </div>
    );
}

export default ViewTodos;