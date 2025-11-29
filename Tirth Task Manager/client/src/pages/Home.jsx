import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { LogOut } from 'lucide-react';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const navigate = useNavigate();

    // Check auth
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (taskData) => {
        try {
            const response = await axios.post('/api/tasks', taskData);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleUpdateTask = async (id, updates) => {
        try {
            const response = await axios.put(`/api/tasks/${id}`, updates);
            setTasks(tasks.map(t => (t.id === id ? response.data : t)));
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await axios.delete(`/api/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            const response = await axios.put(`/api/tasks/${id}`, { completed });
            setTasks(tasks.map(t => (t.id === id ? response.data : t)));
        } catch (error) {
            console.error('Error toggling completion:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <TaskForm
                    onAddTask={handleAddTask}
                    onUpdateTask={handleUpdateTask}
                    editingTask={editingTask}
                    onCancelEdit={() => setEditingTask(null)}
                />

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Tasks</h2>
                    <TaskList
                        tasks={tasks}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDeleteTask}
                        onEdit={setEditingTask}
                    />
                </div>
            </main>
        </div>
    );
};

export default Home;
