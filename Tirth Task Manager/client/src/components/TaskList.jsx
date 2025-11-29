import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p className="text-xl">No tasks found. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default TaskList;
