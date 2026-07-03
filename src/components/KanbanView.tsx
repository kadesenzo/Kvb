import React, { useState } from 'react';
import { Task } from '../types';
import { 
  Plus, 
  User, 
  Tag, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Edit,
  X,
  AlertTriangle
} from 'lucide-react';

interface KanbanViewProps {
  tasks: Task[];
  onAddTask: (task: any) => Promise<void>;
  onUpdateTask: (id: string, updatedData: any) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

export default function KanbanView({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask
}: KanbanViewProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formTask, setFormTask] = useState({
    title: '',
    client: '',
    assignedTo: 'Carlos Dev',
    priority: 'Média',
    status: 'Pendente',
    category: 'Site'
  });

  const columns = [
    { id: 'Pendente', label: 'Pendente / A Fazer', color: 'bg-slate-200/50 text-slate-800' },
    { id: 'Em desenvolvimento', label: 'Em Desenvolvimento', color: 'bg-amber-100 text-amber-800' },
    { id: 'Concluído', label: 'Concluído / Aprovado', color: 'bg-emerald-100 text-emerald-800' }
  ];

  const staffOptions = ['Carlos Dev', 'Beatriz Automação', 'Tiago Tráfego', 'Juliana Marketing'];
  const categories = ['Site', 'Automação', 'Marketing', 'Tráfego', 'Geral'];

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddTask(formTask);
    setIsAddOpen(false);
    setFormTask({
      title: '',
      client: '',
      assignedTo: 'Carlos Dev',
      priority: 'Média',
      status: 'Pendente',
      category: 'Site'
    });
  };

  const handleMoveTask = async (id: string, currentStatus: string) => {
    let nextStatus = 'Em desenvolvimento';
    if (currentStatus === 'Em desenvolvimento') nextStatus = 'Concluído';
    await onUpdateTask(id, { status: nextStatus });
  };

  const handleUpdateAssigned = async (id: string, staffName: string) => {
    await onUpdateTask(id, { assignedTo: staffName });
  };

  const handleUpdatePriority = async (id: string, priority: string) => {
    await onUpdateTask(id, { priority });
  };

  return (
    <div className="space-y-6" id="kanban-tab">
      
      {/* Header tools */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-slate-800">Quadro de Tarefas Ativas (Kanban)</h3>
          <p className="text-xs text-slate-400">Gerencie a fila de produção e delegue funções para a equipe interna de desenvolvimento.</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs md:text-sm rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
          id="btn-add-task-kanban"
        >
          <Plus size={15} />
          Criar Nova Tarefa
        </button>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl space-y-4 flex flex-col min-h-[400px]">
              {/* Header column */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${col.color}`}>
                  {col.label}
                </span>
                <span className="font-mono text-xs text-slate-500 font-bold">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks mapping items */}
              <div className="space-y-3 flex-grow overflow-y-auto">
                {colTasks.map((task) => (
                  <div key={task.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-xs hover:border-slate-300 transition-all space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                          task.category === 'Site' ? 'bg-indigo-50 text-indigo-700' :
                          task.category === 'Automação' ? 'bg-cyan-50 text-cyan-700' :
                          task.category === 'Marketing' ? 'bg-pink-50 text-pink-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`}>
                          {task.category}
                        </span>
                        
                        {/* Priority Badge */}
                        <span className={`text-[8px] font-bold px-1.5 rounded-sm ${
                          task.priority === 'Alta' ? 'bg-rose-50 text-rose-600' :
                          task.priority === 'Urgente' ? 'bg-rose-100 text-rose-700 font-extrabold animate-pulse' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-extrabold text-slate-800 leading-tight">{task.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium font-sans">Cliente: <b>{task.client}</b></p>
                    </div>

                    {/* Footer card parameters */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      {/* Person selection */}
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        <select
                          value={task.assignedTo}
                          onChange={(e) => handleUpdateAssigned(task.id, e.target.value)}
                          className="bg-transparent text-[10px] text-slate-600 hover:text-slate-900 outline-none cursor-pointer font-bold"
                        >
                          {staffOptions.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      {/* Moving or delete actions */}
                      <div className="flex items-center gap-1.5">
                        {task.status !== 'Concluído' ? (
                          <button
                            onClick={() => handleMoveTask(task.id, task.status)}
                            title="Avançar Tarefa"
                            className="p-1 hover:bg-slate-50 border border-slate-200 text-indigo-600 hover:text-indigo-700 rounded cursor-pointer"
                          >
                            <ArrowRight size={12} />
                          </button>
                        ) : (
                          <span className="p-1 text-emerald-600 font-bold text-[10px]">✓ Finalizado</span>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja apagar a tarefa "${task.title}"?`)) {
                              onDeleteTask(task.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div className="py-16 text-center text-[11px] text-slate-400 border-2 border-dashed border-slate-300/30 rounded-lg">
                    Célula vazia no momento
                  </div>
                )}
              </div>
            </div>
          );
        })}

      </div>

      {/* --- ADD TASK BOX MODAL --- */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 border border-slate-100 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-bold text-slate-800">Criar Novo Registro de Produção</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">TÍTULO DA TAREFA / ESCOPO *</label>
                <input
                  type="text" required
                  placeholder="Ex: Layout Pixel Perfect do Figma"
                  value={formTask.title}
                  onChange={(e) => setFormTask({ ...formTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">CLIENTE / PROJETO ASSOCIADO *</label>
                <input
                  type="text" required
                  placeholder="Ex: Barbearia Centro"
                  value={formTask.client}
                  onChange={(e) => setFormTask({ ...formTask, client: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">DELEGAR PARA</label>
                  <select
                    value={formTask.assignedTo}
                    onChange={(e) => setFormTask({ ...formTask, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-white font-semibold text-slate-700"
                  >
                    {staffOptions.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">MÓDULO / CATEGORIA</label>
                  <select
                    value={formTask.category}
                    onChange={(e) => setFormTask({ ...formTask, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-white font-semibold text-slate-700"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">PRIORIDADE</label>
                  <select
                    value={formTask.priority}
                    onChange={(e) => setFormTask({ ...formTask, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-white"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente ⚠️</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">STAGING LOCAL</label>
                  <select
                    value={formTask.status}
                    onChange={(e) => setFormTask({ ...formTask, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-white"
                  >
                    <option value="Pendente">A Fazer</option>
                    <option value="Em desenvolvimento">Em Desenvolvimento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border border-slate-200 rounded font-bold cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded cursor-pointer shadow-sm">Criar Tarefa</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
