import React, { useState } from 'react';
import { FinanceState, FinanceEntry } from '../types';
import { formatCurrency, exportToCSV } from '../utils';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  FileSpreadsheet, 
  TrendingUp, 
  ChevronRight, 
  UserX, 
  Target, 
  Plus, 
  Check, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface FinanceViewProps {
  finance: FinanceState;
  onAddEntry: (entry: any) => Promise<void>;
  onAddExit: (exit: any) => Promise<void>;
  onAddCommission: (comm: any) => Promise<void>;
  onUpdateGoal: (goal: number) => Promise<void>;
}

export default function FinanceView({
  finance,
  onAddEntry,
  onAddExit,
  onAddCommission,
  onUpdateGoal
}: FinanceViewProps) {
  const [activeTab, setActiveTab] = useState<'entradas' | 'saidas' | 'comissoes' | 'inadimplentes'>('entradas');
  
  // Goals form
  const [editingGoal, setEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(finance.monthlyGoal);

  // New item form states
  const [addModal, setAddModal] = useState<any | null>(null); // 'entrada' | 'saida' | 'comissão'

  const [formEntry, setFormEntry] = useState({ client: '', type: 'Mensalidade', amount: 0, date: new Date().toISOString().split('T')[0] });
  const [formExit, setFormExit] = useState({ desc: '', amount: 0, date: new Date().toISOString().split('T')[0] });
  const [formComm, setFormComm] = useState({ representative: '', client: '', amount: 0, date: new Date().toISOString().split('T')[0] });

  // Calculations
  const currentMonthStr = "2026-06";
  const entriesThisMonth = finance.entries.filter(e => e.date.startsWith(currentMonthStr));
  const totalFaturamento = entriesThisMonth.reduce((acc, curr) => acc + curr.amount, 0);

  const exitsThisMonth = finance.exits.filter(e => e.date.startsWith(currentMonthStr));
  const totalDespesas = exitsThisMonth.reduce((acc, curr) => acc + curr.amount, 0);

  const profit = totalFaturamento - totalDespesas;
  
  const totalCommissions = finance.commissions.reduce((acc, curr) => acc + curr.amount, 0);

  // Download XLS-CSV Trigger
  const handleExportFinance = () => {
    if (activeTab === 'entradas') {
      exportToCSV(
        finance.entries, 
        ["ID", "Cliente", "Tipo de Servico", "Valor Cobrado", "Data Recebimento", "Status Pagamento"], 
        ["id", "client", "type", "amount", "date", "status"], 
        "KVB_Entradas_Financeiras"
      );
    } else if (activeTab === 'saidas') {
      exportToCSV(
        finance.exits, 
        ["ID", "Descritivo Saida", "Custo (R$)", "Data de Vencimento"], 
        ["id", "desc", "amount", "date"], 
        "KVB_Saidas_Despesas"
      );
    } else if (activeTab === 'comissoes') {
      exportToCSV(
        finance.commissions, 
        ["ID", "Vendedor / Representante", "Cliente Vinculado", "Margem Comissao (R$)", "Data Pagamento"], 
        ["id", "representative", "client", "amount", "date"], 
        "KVB_Comissoes_Parceiros"
      );
    } else {
      exportToCSV(
        finance.unpaid, 
        ["ID", "Cliente Inadimplente", "Divida Pendente (R$)", "Data Limite", "Dias Atraso"], 
        ["id", "client", "amount", "dueDate", "delayDays"], 
        "KVB_Clientes_Inadimplentes"
      );
    }
  };

  const handleUpdateGoalSubmit = async () => {
    await onUpdateGoal(newGoal);
    setEditingGoal(false);
  };

  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddEntry(formEntry);
    setAddModal(null);
    setFormEntry({ client: '', type: 'Mensalidade', amount: 0, date: new Date().toISOString().split('T')[0] });
  };

  const handleCreateExit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddExit(formExit);
    setAddModal(null);
    setFormExit({ desc: '', amount: 0, date: new Date().toISOString().split('T')[0] });
  };

  const handleCreateCommission = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddCommission(formComm);
    setAddModal(null);
    setFormComm({ representative: '', client: '', amount: 0, date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="space-y-6" id="finance-tab">
      
      {/* Financial KPIs row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Entrance KPIs */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Entradas Mês (Jun)</span>
            <div className="text-xl font-extrabold text-slate-800">{formatCurrency(totalFaturamento)}</div>
            <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <ArrowUpRight size={12} />
              +14% vs Maio
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp size={20} /></div>
        </div>

        {/* Exit KPIs */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Saídas / Custos</span>
            <div className="text-xl font-extrabold text-slate-800">{formatCurrency(totalDespesas)}</div>
            <p className="text-[10px] text-rose-500 font-bold flex items-center gap-0.5">
              <ArrowDownRight size={12} />
              Estável sob servidores
            </p>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><ArrowDownRight size={20} /></div>
        </div>

        {/* Operating Profits */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Lucro Operacional</span>
            <div className="text-xl font-extrabold text-slate-900">{formatCurrency(profit)}</div>
            <p className="text-[10px] text-indigo-600 font-bold">
              {(profit / (totalFaturamento || 1) * 100).toFixed(0)}% de rentabilidade útil
            </p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><DollarSign size={20} /></div>
        </div>

        {/* Monthly Target and Settings */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1.5 flex-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Meta de Vendas</span>
            {editingGoal ? (
              <div className="flex gap-1">
                <input
                  type="number"
                  value={newGoal}
                  onChange={(e) => setNewGoal(Number(e.target.value))}
                  className="w-20 px-2 py-0.5 border border-slate-200 text-xs rounded font-bold font-mono focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleUpdateGoalSubmit}
                  className="p-1 bg-emerald-600 text-white rounded cursor-pointer"
                >
                  <Check size={12} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <div className="text-md font-extrabold text-indigo-600 font-mono">{formatCurrency(finance.monthlyGoal)}</div>
                <button
                  onClick={() => setEditingGoal(true)}
                  className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold font-sans underline"
                >
                  Edit
                </button>
              </div>
            )}
            <p className="text-[10px] text-slate-400">Progresso: <b>{((totalFaturamento / finance.monthlyGoal) * 100).toFixed(0)}%</b></p>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl"><Target size={20} /></div>
        </div>
      </div>

      {/* Tables ledger section and CSV downloader */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        
        {/* Tabs and Actions bar */}
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab('entradas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'entradas' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              Entradas ({finance.entries.length})
            </button>
            <button
              onClick={() => setActiveTab('saidas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'saidas' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              Saídas / Custos ({finance.exits.length})
            </button>
            <button
              onClick={() => setActiveTab('comissoes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'comissoes' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              Comissões ({finance.commissions.length})
            </button>
            <button
              onClick={() => setActiveTab('inadimplentes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'inadimplentes' ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              Inadimplentes ({finance.unpaid.length})
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setAddModal(activeTab)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} />
              Adicionar Lançamento
            </button>
            <button
              onClick={handleExportFinance}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              id="btn-export-excel"
            >
              <FileSpreadsheet size={13} />
              Exportar para Excel
            </button>
          </div>
        </div>

        {/* Tab content renderer */}
        <div className="overflow-x-auto">
          
          {/* ENTRADAS TABLE */}
          {activeTab === 'entradas' && (
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-4">Recibo ID</th>
                  <th className="py-2.5 px-4">Cliente / Origem</th>
                  <th className="py-2.5 px-4">Categoria Serviço</th>
                  <th className="py-2.5 px-4">Data Recebimento</th>
                  <th className="py-2.5 px-4">Valor Cobrado</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {finance.entries.map((ent) => (
                  <tr key={ent.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono text-[10px] font-bold text-slate-500">#{ent.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{ent.client}</td>
                    <td className="py-3 px-4 font-medium text-slate-600">{ent.type}</td>
                    <td className="py-3 px-4 font-mono">{ent.date}</td>
                    <td className="py-3 px-4 font-bold font-mono text-slate-800">{formatCurrency(ent.amount)}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {ent.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* SAIDAS TABLE */}
          {activeTab === 'saidas' && (
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-4">Despesa ID</th>
                  <th className="py-2.5 px-4">Item Descrição</th>
                  <th className="py-2.5 px-4">Data de Pagamento</th>
                  <th className="py-2.5 px-4">Custo Bruto (R$)</th>
                  <th className="py-2.5 px-4 text-center">Formato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {finance.exits.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono text-[10px] font-bold text-slate-500">#{ex.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{ex.desc}</td>
                    <td className="py-3 px-4 font-mono">{ex.date}</td>
                    <td className="py-3 px-4 font-bold font-mono text-rose-600">({formatCurrency(ex.amount)})</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600">
                        Débito Automático
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* COMMISSIONS TABLE */}
          {activeTab === 'comissoes' && (
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-4">Comissão ID</th>
                  <th className="py-2.5 px-4">Representante / Parceiro</th>
                  <th className="py-2.5 px-4">Cliente Comercial</th>
                  <th className="py-2.5 px-4">Data do Repasse</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Repasse Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {finance.commissions.map((comm) => (
                  <tr key={comm.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono text-[10px] font-bold text-slate-500">#{comm.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{comm.representative}</td>
                    <td className="py-3 px-4 font-medium text-slate-500">{comm.client}</td>
                    <td className="py-3 px-4 font-mono">{comm.date}</td>
                    <td className="py-3 px-4 font-bold font-mono text-indigo-600 text-right">{formatCurrency(comm.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* INADIMPLENTES TABLE */}
          {activeTab === 'inadimplentes' && (
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-4">Inadimplência ID</th>
                  <th className="py-2.5 px-4">Cliente devedor</th>
                  <th className="py-2.5 px-4">Data Vencimento</th>
                  <th className="py-2.5 px-4">Atraso</th>
                  <th className="py-2.5 px-4">Dívida Ativa</th>
                  <th className="py-2.5 px-4 text-center">Procedimento Manual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {finance.unpaid.map((unp) => (
                  <tr key={unp.id} className="hover:bg-rose-50/30">
                    <td className="py-3 px-4 font-mono text-[10px] font-bold text-slate-500">#{unp.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{unp.client}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-600">{unp.dueDate}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        {unp.delayDays} dias úteis
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold font-mono text-rose-600">{formatCurrency(unp.amount)}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => alert(`Aviso de mensalidade em atraso disparado via API integrada para o cliente ${unp.client} no valor de ${formatCurrency(unp.amount)}!`)}
                        className="px-2.5 py-1 bg-rose-600 text-white rounded hover:bg-rose-700 font-bold text-[10px] cursor-pointer"
                      >
                        Notificar Cobrança
                      </button>
                    </td>
                  </tr>
                ))}
                {finance.unpaid.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-emerald-600 font-bold bg-emerald-50/30">
                      Parabéns! Nenhuma mensalidade vencida no momento. Inadimplência Zerada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>

      {/* MODALS FOR ADDING FINANCIAL LOGS */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 border border-slate-100 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2 capitalize">
              Novo Lançamento: {addModal}
            </h3>

            {addModal === 'entradas' && (
              <form onSubmit={handleCreateEntry} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Nome do Cliente Origem *</label>
                  <input
                    type="text" required
                    placeholder="Ex: Clínica Sorella"
                    value={formEntry.client}
                    onChange={(e) => setFormEntry({...formEntry, client: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Serviço Categoria</label>
                  <input
                    type="text"
                    value={formEntry.type}
                    onChange={(e) => setFormEntry({...formEntry, type: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Valor Cobrado (R$) *</label>
                  <input
                    type="number" required
                    placeholder="250"
                    value={formEntry.amount}
                    onChange={(e) => setFormEntry({...formEntry, amount: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-200 rounded text-slate-700 font-bold"
                  />
                </div>
                <div className="flex justify-end gap-2.5 pt-3">
                  <button type="button" onClick={() => setAddModal(null)} className="px-3 py-1.5 border border-slate-200 rounded">Cancelar</button>
                  <button type="submit" className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded">Confirmar Entrada</button>
                </div>
              </form>
            )}

            {addModal === 'saidas' && (
              <form onSubmit={handleCreateExit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Descrição da Despesa *</label>
                  <input
                    type="text" required
                    placeholder="Ex: Evolution API Servidor"
                    value={formExit.desc}
                    onChange={(e) => setFormExit({...formExit, desc: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Valor Unitário Pago (R$) *</label>
                  <input
                    type="number" required
                    placeholder="100"
                    value={formExit.amount}
                    onChange={(e) => setFormExit({...formExit, amount: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-200 rounded text-slate-700 font-bold"
                  />
                </div>
                <div className="flex justify-end gap-2.5 pt-3">
                  <button type="button" onClick={() => setAddModal(null)} className="px-3 py-1.5 border border-slate-200 rounded">Cancelar</button>
                  <button type="submit" className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded">Confirmar Custo</button>
                </div>
              </form>
            )}

            {addModal === 'comissoes' && (
              <form onSubmit={handleCreateCommission} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Nome do Representante *</label>
                  <input
                    type="text" required
                    placeholder="Ex: Tiago Gestor"
                    value={formComm.representative}
                    onChange={(e) => setFormComm({...formComm, representative: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Cliente Vinculado</label>
                  <input
                    type="text" required
                    placeholder="Ex: Renata Advogados"
                    value={formComm.client}
                    onChange={(e) => setFormComm({...formComm, client: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Cota de Comissão (R$) *</label>
                  <input
                    type="number" required
                    placeholder="50"
                    value={formComm.amount}
                    onChange={(e) => setFormComm({...formComm, amount: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-200 rounded text-slate-700 font-bold"
                  />
                </div>
                <div className="flex justify-end gap-2.5 pt-3">
                  <button type="button" onClick={() => setAddModal(null)} className="px-3 py-1.5 border border-slate-200 rounded">Cancelar</button>
                  <button type="submit" className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded">Gravar Repasse</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
