import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (editingTask) {
            onUpdateTask(editingTask.id, { title, description });
        } else {
            onAddTask({ title, description });
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {editingTask ? 'Edit Task' : 'Add New Task'}
            </h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                />
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition duration-300"
                    type="submit"
                >
                    {editingTask ? <Save size={18} /> : <Plus size={18} />}
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                {editingTask && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition duration-300"
                    >
                        <X size={18} /> Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
