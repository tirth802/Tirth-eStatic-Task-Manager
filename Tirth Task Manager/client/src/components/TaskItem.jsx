import { CheckCircle, Circle, Trash2, Edit } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 mb-4 flex justify-between items-center transition-all hover:shadow-md ${task.completed ? 'border-green-500 bg-gray-50' : 'border-blue-500'}`}>
            <div className="flex-1">
                <h4 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                </h4>
                <p className={`text-gray-600 mt-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.description}
                </p>
            </div>
            <div className="flex items-center gap-3 ml-4">
                <button
                    onClick={() => onToggleComplete(task.id, !task.completed)}
                    className={`p-2 rounded-full transition-colors ${task.completed ? 'text-green-500 hover:bg-green-100' : 'text-gray-400 hover:text-green-500 hover:bg-gray-100'}`}
                    title={task.completed ? "Mark as Incomplete" : "Mark as Completed"}
                >
                    {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>
                <button
                    onClick={() => onEdit(task)}
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors"
                    title="Edit Task"
                >
                    <Edit size={20} />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                    title="Delete Task"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
