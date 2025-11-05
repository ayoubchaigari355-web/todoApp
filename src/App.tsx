import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { ListTodo } from 'lucide-react';
import { Task } from './lib/supabase';
import { taskService } from './services/taskService';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setError(null);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (title: string) => {
    try {
      const newTask = await taskService.createTask(title);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const handleToggleTask = async (id: string, isDone: boolean) => {
    try {
      const updatedTask = await taskService.toggleTask(id, isDone);
      setTasks(
        tasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error toggling task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', paddingTop: '3rem', paddingBottom: '3rem' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Header
                className="text-white text-center py-4"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <ListTodo size={32} />
                  <h2 className="mb-0">Todo List</h2>
                </div>
                <p className="mb-0 mt-2 opacity-90">
                  Stay organized and productive
                </p>
              </Card.Header>
              <Card.Body className="p-4">
                {error && (
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setError(null)}
                    className="mb-3"
                  >
                    {error}
                  </Alert>
                )}

                <TaskForm onSubmit={handleCreateTask} />

                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading tasks...</p>
                  </div>
                ) : (
                  <TaskList
                    tasks={tasks}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                )}
              </Card.Body>
            </Card>

            <div className="text-center text-muted">
              <small>
                Total: {tasks.length} |
                Active: {tasks.filter(t => !t.is_done).length} |
                Completed: {tasks.filter(t => t.is_done).length}
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
