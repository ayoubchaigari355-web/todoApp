import { ListGroup, Alert } from 'react-bootstrap';
import { CheckCircle2 } from 'lucide-react';
import { Task } from '../lib/supabase';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, isDone: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Alert variant="info" className="text-center py-5">
        <CheckCircle2 size={48} className="mb-3" />
        <h5>No tasks yet!</h5>
        <p className="mb-0">Add your first task to get started.</p>
      </Alert>
    );
  }

  const activeTasks = tasks.filter((task) => !task.is_done);
  const completedTasks = tasks.filter((task) => task.is_done);

  return (
    <div>
      {activeTasks.length > 0 && (
        <div className="mb-4">
          <h6 className="text-muted mb-3">Active Tasks ({activeTasks.length})</h6>
          <ListGroup>
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ListGroup>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h6 className="text-muted mb-3">
            Completed Tasks ({completedTasks.length})
          </h6>
          <ListGroup>
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
}
