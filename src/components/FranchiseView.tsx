import React, { useState } from 'react';
import { 
  Network, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Briefcase, 
  LineChart, 
  BarChart3,
  Building
} from 'lucide-react';

interface FranchiseUnit {
  id: string;
  name: string;
  location: string;
  monthlyBilling: number;
  activeClientsCount: number;
  staffCount: number;
  manager: string;
}

export default function FranchiseView() {
  const [activeUnitId, setActiveUnitId] = useState('u_sp');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUnitName, setNewUnitName] = useState('');
  const [newUnitLoc, setNewUnitLoc] = useState('');
  const [newUnitManager, setNewUnitManager] = useState('');

  // Initial franchise registry list
  const [franchises, setFranchises] = useState<FranchiseUnit[]>([
    { id: 'u_sp', name: 'KVB São Paulo (Sede Central)', location: 'Av. Paulista, SP', monthlyBilling: 124000, activeClientsCount: 48, staffCount: 12, manager: 'Carlos Comercial' },
    { id: 'u_rj', name: 'KVB Rio de Janeiro', location: 'Copacabana, RJ', monthlyBilling: 58000, activeClientsCount: 22, staffCount: 5, manager: 'Juliana Marketing' },
    { id: 'u_lis', name: 'KVB Lisboa Internacional', location: 'Av. Liberdade, PT', monthlyBilling: 92000, activeClientsCount: 31, staffCount: 8, manager: 'Erick Dev Sênior' },
    { id: 'u_ny', name: 'KVB Nova York Hub', location: 'Manhattan, NY', monthlyBilling: 165000, activeClientsCount: 18, staffCount: 6, manager: 'John Partner' }
  ]);

  const activeUnit = franchises.find(f => f.id === activeUnitId) || franchises[0];

  const handleCreateFranchise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitName.trim()) return;

    const newU: FranchiseUnit = {
      id: 'u_' + Math.random().toString(36).substr(2, 4),
      name: newUnitName.trim(),
      location: newUnitLoc.trim() || 'Remoto',
      monthlyBilling: 0,
      activeClientsCount: 0,
      staffCount: 1,
      manager: newUnitManager.trim() || 'Diretor Responsável'
    };

    setFranchises(prev => [...prev, newU]);
    setActiveUnitId(newU.id);
    setNewUnitName('');
    setNewUnitLoc('');
    setNewUnitManager('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6" id="franchise-view">
      {/* Intro section banner */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            <Network size={18} className="text-indigo-600 animate-pulse" />
            Painel Geral do Modo Franquia
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Controle e audite o faturamento, equipe e clientes de múltiplas filiais KVB sob uma única conta administrativa master.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
        >
          <Plus size={13} />
          Cadastrar Nova Unidade
        </button>
      </div>

      {/* Grid: Unit selector tabs list and details metrics summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left selector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">Suas Unidades Ativas</h3>
            
            <div className="space-y-1.5">
              {franchises.map((fran) => {
                const isActive = activeUnitId === fran.id;
                return (
                  <div 
                    key={fran.id}
                    onClick={() => setActiveUnitId(fran.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50/20' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Building size={14} className={isActive ? 'text-indigo-600 mt-0.5' : 'text-slate-400 mt-0.5'} />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-tight">{fran.name}</h4>
                      <span className="text-[9px] font-mono font-bold text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin size={10} /> {fran.location}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right metrics details output */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono">
                Análise Consolidada de Métricas: {activeUnit.name}
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                Unidade Ativa
              </span>
            </div>

            {/* Metrics cards row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                  <DollarSign size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">Faturamento Mensal</span>
                  <p className="text-sm font-mono font-extrabold text-slate-800">R$ {activeUnit.monthlyBilling.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
                  <Users size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">Clientes Registrados</span>
                  <p className="text-sm font-mono font-extrabold text-slate-800">{activeUnit.activeClientsCount} Contas</p>
                </div>
              </div>

              <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
                <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
                  <Briefcase size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">Equipe de Colaboradores</span>
                  <p className="text-sm font-mono font-extrabold text-slate-800">{activeUnit.staffCount} Especialistas</p>
                </div>
              </div>
            </div>

            {/* Branch organizational board detail */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">Gerenciamento Operacional</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">GERENTE REGIONAL RESPONSÁVEL</span>
                  <p className="font-extrabold text-slate-800">{activeUnit.manager}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">COMPLIANCE DE SEGURANÇA</span>
                  <p className="text-emerald-600 font-extrabold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Sistema em conformidade
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Unit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-100 shadow-2xl relative space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest font-mono pb-2 border-b border-slate-100">
              Cadastrar Nova Unidade
            </h3>
            
            <form onSubmit={handleCreateFranchise} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-600 block">Nome da Unidade / Filial</label>
                <input 
                  type="text" 
                  required
                  value={newUnitName}
                  onChange={(e) => setNewUnitName(e.target.value)}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                  placeholder="Ex: KVB Porto"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-600 block">Localização / Endereço</label>
                <input 
                  type="text" 
                  value={newUnitLoc}
                  onChange={(e) => setNewUnitLoc(e.target.value)}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                  placeholder="Ex: Porto, Portugal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-600 block">Gestor da Filial</label>
                <input 
                  type="text" 
                  value={newUnitManager}
                  onChange={(e) => setNewUnitManager(e.target.value)}
                  className="w-full p-2 border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                  placeholder="Ex: Gabriel Moreira"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 size={13} />
                  Criar Unidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
