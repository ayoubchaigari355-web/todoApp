import { supabase, Task } from '../lib/supabase';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createTask(title: string): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, is_done: false }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async toggleTask(id: string, is_done: boolean): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_done, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
