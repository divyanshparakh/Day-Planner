import React, { useState, useEffect } from 'react';
import './ViewTodos.scss';
import api from '../../index';
import ViewCalendar from '../Calendar/ViewCalendar';
import { useAppSelector, useAppDispatch } from '../../store/hooks/index.ts';
import { addTodo } from '../../store/slices/todos/index.ts';
import Loading from '../Loading/Loading.jsx';


function ViewTodos() {
    const todos = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    // const [todos, setTodos] = useState([]);
    
    const incompletedTodos = useAppSelector(() => {
        if(todos && todos.length > 0) {
            return todos.filter(function(todo) {
                return (todo.completed === false && (todo.title.includes(searchTerm) || todo.start.includes(searchTerm)));
            });
        }
        return [];
    });

    const completedTodos = useAppSelector(() => {
        if(todos && todos.length > 0) {
            return todos.filter(function(todo) {
                return (todo.completed === true && (todo.title.includes(searchTerm) || todo.start.includes(searchTerm)));
            });
        }
        return [];
    });

    const [isLoading, setIsLoading] = useState(true);
    const [openAddDialog, handleAddTodoDialogOpen] = useState(false);

    const [editingTodo, setEditingTodo] = useState({
        id: '0',
        title: '',
        completed: false,
        progress: 0, // Assuming progress is a number, change it according to your requirements
        start: ''
    });

    const [newTodo, setNewTodo] = useState({
        id: '0',
        title: '',
        completed: false,
        progress: 0, // Assuming progress is a number, change it according to your requirements
        start: ''
    });

	const storedToken = localStorage.getItem('token');

    const getTodos = async () => {
        try {
            const response = await api.get("/todos", {
                storedToken,
            });
            if(response.status === 200) {
                // console.log(response.data);
                dispatch(addTodo(response.data));
                // setTodos(response.data);
            }
            setIsLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error, e.g., redirect to login page
                localStorage.removeItem('token');
            } else if(error.response.status === 420) {
                console.log("Too Many Request");
            } else {
                console.error("Error fetching todos:", error);
                setIsLoading(true);
            }
        }
    };

    const handleAddTodoRequest = async () => {
        try {
            await api.post("/todos", {
                ...newTodo,
            });
            setNewTodo({
                id: "0",
                title: "",
                start: "",
                progress: 0,
                completed: false,
            });
            handleAddTodoDialogOpen(false);
            getTodos();
        } catch (error) {
            console.log(error.response.data.message.replace(/"/g, ""));
        }
    };

    const handleEditTodoRequest = async () => {
        try {
            await api.put(`/todos/${editingTodo.id}`, {
                title: editingTodo.title,
                completed: editingTodo.completed,
                progress: editingTodo.progress,
                start: editingTodo.start,
            })
            .then(
                setEditingTodo(null)
            );
            getTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };
    
    const handleDeleteTodoRequest = async (todoId) => {
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

    const handleToggleTodoStatusRequest = async (todo) => {
        try {
            await api.put(`/todos/${todo.id}`, {
                title: todo.title,
                start: todo.start,
                completed: !todo.completed,
                progress: todo.completed ? 0 : 100,
                id: todo.id
            });
            getTodos();
        } catch (error) {
            console.error("Error marking todo as done:", error);
        }
    };

    const handleNewTodoDialogClose = () => {
        handleAddTodoDialogOpen(false);
    };

    const handleEditTodoDialogOpen = (todoId) => {
        handleNewTodoDialogClose();
        const editingTodo = todos.find((todo) => todo.id === todoId);
        setEditingTodo(editingTodo);
        document.getElementById('todo-' + todoId).lastChild.style.display = "none";
    };

    const calculateBackground = (progress) => {
        return `linear-gradient(to right, #8d80f6 ${progress}%, #625a69 ${progress}%)`;
    };

    const makeOptionVisible = () => {
        const elements = document.getElementsByClassName('todo-card-options');
        for(let i = 0; i < elements.length; i++)
            if(elements[i].style.display == 'none')
                elements[i].style.display = 'block';
    }

    useEffect(() => {
        getTodos();
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
            // Close the add todo dialog
                handleNewTodoDialogClose();
                setEditingTodo(null);
                setSearchTerm('');
                makeOptionVisible();
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
        return <Loading></Loading>
    }

    // const filteredTodos = showCompleted ? completedTodos : todos.filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="scaffold">
            <h3 className='title'>Day Schedule</h3>
            <ViewCalendar></ViewCalendar>
            <input
                className='search-todo'
                type="text"
                placeholder="Search Todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => {handleAddTodoDialogOpen(!openAddDialog); setEditingTodo(null);}}>Add</button>
            {
                openAddDialog && (
                    <form className="dialog add-todo" onSubmit={handleNewTodoDialogClose}  style={{ background: calculateBackground(newTodo.progress) }}>
                        <input
                            type="text"
                            value={newTodo.title}
                            className='custom-text-input'
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                            autoFocus
                        />
                        <div className="slider-canvas">
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
                        <span class="custom-date-input-cover">
                            <input
                                type="date"
                                value={newTodo.start}
                                className='custom-date-input'
                                onChange={(e) => setNewTodo({ ...newTodo, start: e.target.value, completed: false })}
                            />
                        </span>
                        <span>
                            {newTodo.title && <button onClick={handleAddTodoRequest}>Add</button>}
                            <button type='submit'>Cancel</button>
                        </span>
                    </form>
                )
            }
            <section className="todo-list-section">
            {incompletedTodos.length > 0 && 
                <h4>Incomplete Todos</h4>}
                <ul className="todos-list">
                    {incompletedTodos.length > 0 && incompletedTodos.map((todo, index) => (
                        <li id={"todo-" + todo.id}  key={todo.id} className="todo-item-card" style={{ background: calculateBackground(editingTodo?.progress || todo.progress) }}>
                            {editingTodo && editingTodo.id === todo.id ? (
                                <form onSubmit={(e) => handleEditTodoRequest(e, todo.id)} className="edit-todo-form">
                                    <input
                                        id={"todo-" + todo.id}
                                        type="text"
                                        value={editingTodo.title}
                                        className='custom-text-input'
                                        onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                                        autoFocus
                                    />
                                    <div className="slider-canvas">
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
                                    <span class="custom-date-input-cover">
                                        <input
                                            type="date"
                                            value={editingTodo.start}
                                            className='custom-date-input'
                                            onChange={(e) => setEditingTodo({ ...editingTodo, start: e.target.value})}
                                        />
                                    </span>
                                    <span>
                                        {(editingTodo.title !== todo.title || editingTodo.progress !== todo.progress) && <button className='custom-button' onClick={() => {document.getElementById('todo-' + todo.id).lastChild.style.display='block'}} type='submit'>Save</button>}
                                        <button type='button' className='custom-button' onClick={() => { setEditingTodo(null); document.getElementById('todo-' + todo.id).lastChild.style.display='block'; }}>Cancel</button>
                                    </span>
                                </form>
                            ) : (
                                <div className="todo-card-header" onClick={() => handleEditTodoDialogOpen(todo.id)}>
                                    {todo.title}
                                </div>
                            )}
                            <div className="todo-card-options">
                                {/* <button onClick={() => handleEditTodoDialogOpen(todo.id)}>Edit</button> */}
                                <button onClick={() => handleDeleteTodoRequest(todo.id)}>Delete</button>
                                <button type="button" onClick={() => handleToggleTodoStatusRequest(todo)}>Done</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="todo-list-section completed-todos-section">
                {completedTodos.length > 0 && 
                <h4>Completed Todos</h4>}
                <ul className="completed-todos-list todos-list">
                    {completedTodos.length > 0 && completedTodos.map((todo, index) => (
                        <li id={"todo-" + todo.id}  key={todo.id} className="todo-item-card" style={{ background: calculateBackground(editingTodo?.progress || todo.progress) }}>
                            <div className="todo-card-header">
                                {todo.title}
                            </div>
                            <div className="todo-card-options">
                                <button onClick={() => handleDeleteTodoRequest(todo.id)}>Delete</button>
                                <button type="button" onClick={() => handleToggleTodoStatusRequest(todo)}>Undone</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default ViewTodos;