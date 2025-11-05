import { useState } from 'react';
import { ListGroup, Form, Button, Badge } from 'react-bootstrap';
import { Trash2, Calendar } from 'lucide-react';
import { Task } from '../lib/supabase';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, isDone: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await onToggle(task.id, !task.is_done);
    } catch (error) {
      console.error('Error toggling task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ListGroup.Item
      className="d-flex align-items-center gap-3 py-3"
      style={{
        backgroundColor: task.is_done ? '#f8f9fa' : 'white',
        transition: 'all 0.3s ease',
      }}
    >
      <Form.Check
        type="checkbox"
        checked={task.is_done}
        onChange={handleToggle}
        disabled={isUpdating}
        style={{ transform: 'scale(1.2)' }}
      />

      <div className="flex-grow-1">
        <div
          style={{
            textDecoration: task.is_done ? 'line-through' : 'none',
            color: task.is_done ? '#6c757d' : '#212529',
            fontSize: '1.1rem',
            fontWeight: task.is_done ? 'normal' : '500',
            transition: 'all 0.3s ease',
          }}
        >
          {task.title}
        </div>
        <div className="d-flex align-items-center gap-2 mt-1">
          <Calendar size={14} color="#6c757d" />
          <small className="text-muted">{formatDate(task.created_at)}</small>
          {task.is_done && (
            <Badge bg="success" className="ms-2">
              Completed
            </Badge>
          )}
        </div>
      </div>

      <Button
        variant="outline-danger"
        size="sm"
        onClick={handleDelete}
        className="d-flex align-items-center gap-1"
      >
        <Trash2 size={16} />
      </Button>
    </ListGroup.Item>
  );
}
