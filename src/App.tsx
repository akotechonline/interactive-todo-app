import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskTable } from './components/TaskTable';
import { StatsCard } from './components/StatsCard';
import { Footer } from './components/Footer';

function App() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    sortField,
    sortDirection,
    handleSort,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    searchQuery,
    setSearchQuery,
    stats,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Interactive To-Do List
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize your tasks with priorities, track your progress with scoring, and stay productive with our sleek task management system.
          </p>
        </div>

        {/* Stats */}
        <StatsCard {...stats} />

        {/* Task Form */}
        <div className="mb-6">
          <TaskForm onSubmit={addTask} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TaskFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
            filterPriority={filterPriority}
            onPriorityChange={setFilterPriority}
          />
        </div>

        {/* Task Table */}
        <TaskTable
          tasks={tasks}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onToggle={toggleTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;