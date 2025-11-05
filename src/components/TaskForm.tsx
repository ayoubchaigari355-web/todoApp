import { useState, FormEvent } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (title: string) => Promise<void>;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(title.trim());
      setTitle('');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup size="lg">
        <Form.Control
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting || !title.trim()}
        >
          <Plus size={20} />
        </Button>
      </InputGroup>
    </Form>
  );
}
