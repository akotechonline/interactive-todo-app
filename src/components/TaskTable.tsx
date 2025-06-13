import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Edit2, Trash2, Check, X } from 'lucide-react';
import { Task, SortField, SortDirection } from '../types/Task';
import { TaskForm } from './TaskForm';

interface TaskTableProps {
  tasks: Task[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskTable({
  tasks,
  sortField,
  sortDirection,
  onSort,
  onToggle,
  onUpdate,
  onDelete,
}: TaskTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 font-semibold text-gray-700 hover:text-blue-600 transition-colors"
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ChevronUp className="w-4 h-4" /> : 
          <ChevronDown className="w-4 h-4" />
      )}
    </button>
  );

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
  };

  const handleUpdate = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingId) {
      onUpdate(editingId, taskData);
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border p-8 text-center">
        <div className="text-gray-400 mb-2">
          <Check className="w-12 h-12 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No tasks found</h3>
        <p className="text-gray-500">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  readOnly
                />
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="title">Task</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="priority">Priority</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="score">Score</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="createdAt">Created</SortButton>
              </th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <tr className={`hover:bg-gray-50 transition-colors ${task.completed ? 'opacity-60' : ''}`}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggle(task.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </div>
                      {task.description && (
                        <div className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                          {task.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      {task.score} pts
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                        title="Edit task"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                {editingId === task.id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50">
                      <TaskForm
                        onSubmit={handleUpdate}
                        initialData={task}
                        isEditing={true}
                        onCancel={handleCancelEdit}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}