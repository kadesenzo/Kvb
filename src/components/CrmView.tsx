import React, { useState } from 'react';
import { Client, KvbServices } from '../types';
import { formatCurrency, formatDateString } from '../utils';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  FolderOpen, 
  History, 
  Save, 
  X, 
  UserPlus, 
  Briefcase, 
  DollarSign, 
  Settings, 
  Sliders,
  CheckCircle,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

interface CrmViewProps {
  clients: Client[];
  services: KvbServices;
  onAddClient: (clientData: any) => Promise<void>;
  onEditClient: (id: string, updatedData: any) => Promise<void>;
  onDeleteClient: (id: string) => Promise<void>;
  onSaveServices: (updatedServices: KvbServices) => Promise<void>;
}

export default function CrmView({
  clients,
  services,
  onAddClient,
  onEditClient,
  onDeleteClient,
  onSaveServices
}: CrmViewProps) {
  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'Todos' | 'Ativo' | 'Em negociação' | 'Cancelado'>('Todos');
  
  // Modals / Panels
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [historyNote, setHistoryNote] = useState('');
  
  // Pricing Panel Open Toggle
  const [isPricingPanelOpen, setIsPricingPanelOpen] = useState(false);

  // Editable services local state
  const [priceSite, setPriceSite] = useState(services.site);
  const [priceAuto, setPriceAuto] = useState(services.automation);
  const [priceMkt, setPriceMkt] = useState(services.marketing);
  const [priceComboFirst, setPriceComboFirst] = useState(services.specialComboFirstMonth);
  const [priceComboMonthly, setPriceComboMonthly] = useState(services.specialComboMonthly);

  // New client form state
  const [newClient, setNewClient] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    instagram: '',
    niche: '',
    plan: 'Combo KVB Especial',
    entryDate: new Date().toISOString().split('T')[0],
    monthlyValue: services.specialComboMonthly,
    status: 'Ativo'
  });

  // Edit client form state
  const [editingClientId, setEditingClientId] = useState('');
  const [editClientData, setEditClientData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    instagram: '',
    niche: '',
    plan: '',
    entryDate: '',
    monthlyValue: 0,
    status: 'Ativo'
  });

  // Filter clients based on search & tab selection
  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.niche.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'Todos' || c.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Handle plan change to auto-fill prices for new clients
  const handleNewPlanChange = (plan: string) => {
    let price = services.site;
    if (plan === 'Automação') price = services.automation;
    if (plan === 'Assessoria de Marketing') price = services.marketing;
    if (plan === 'Combo KVB Especial') price = services.specialComboMonthly;
    setNewClient({ ...newClient, plan, monthlyValue: price });
  };

  const handleEditPlanChange = (plan: string) => {
    let price = services.site;
    if (plan === 'Automação') price = services.automation;
    if (plan === 'Assessoria de Marketing') price = services.marketing;
    if (plan === 'Combo KVB Especial') price = services.specialComboMonthly;
    setEditClientData({ ...editClientData, plan, monthlyValue: price });
  };

  // Submits
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddClient(newClient);
    setIsAddModalOpen(false);
    // Reset
    setNewClient({
      name: '',
      company: '',
      phone: '',
      email: '',
      instagram: '',
      niche: '',
      plan: 'Combo KVB Especial',
      entryDate: new Date().toISOString().split('T')[0],
      monthlyValue: services.specialComboMonthly,
      status: 'Ativo'
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onEditClient(editingClientId, editClientData);
    setIsEditModalOpen(false);
    // If we're looking at the modified client's fiche, refresh selectedClient
    if (selectedClient?.id === editingClientId) {
      const refreshed = clients.find(c => c.id === editingClientId);
      if (refreshed) {
        setSelectedClient(refreshed);
      }
    }
  };

  const handleAddHistoryNote = async () => {
    if (!selectedClient || !historyNote.trim()) return;
    await onEditClient(selectedClient.id, { addHistory: historyNote });
    setHistoryNote('');
    // Refresh selectedClient view
    const updated = clients.find(c => c.id === selectedClient.id);
    if (updated) setSelectedClient(updated);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClientId(client.id);
    setEditClientData({
      name: client.name,
      company: client.company,
      phone: client.phone,
      email: client.email,
      instagram: client.instagram,
      niche: client.niche,
      plan: client.plan,
      entryDate: client.entryDate,
      monthlyValue: client.monthlyValue,
      status: client.status
    });
    setIsEditModalOpen(true);
  };

  const handleSaveServicesSubmit = async () => {
    await onSaveServices({
      site: Number(priceSite),
      automation: Number(priceAuto),
      marketing: Number(priceMkt),
      specialComboFirstMonth: Number(priceComboFirst),
      specialComboMonthly: Number(priceComboMonthly)
    });
    setIsPricingPanelOpen(false);
  };

  return (
    <div className="space-y-6" id="crm-tab">
      
      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar por cliente, empresa ou nicho..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Services Setup Trigger */}
          <button
            onClick={() => setIsPricingPanelOpen(true)}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100 md:text-sm text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
            id="btn-settings-services"
          >
            <Settings size={14} className="text-slate-500" />
            Configurar Preços de Planos
          </button>

          {/* Quick Stats Indicator */}
          <span className="text-xs font-semibold text-slate-500 bg-slate-100/60 rounded-full py-1 px-3">
            Total {clients.length} no banco
          </span>

          {/* Add client button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-xs md:text-sm font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs shadow-indigo-600/10"
            id="btn-add-client"
          >
            <UserPlus size={15} />
            Cadastrar Cliente
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-100 overflow-x-auto pb-px">
        {(['Todos', 'Ativo', 'Em negociação', 'Cancelado'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 border-b-2 text-xs md:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === status 
                ? 'border-indigo-600 text-indigo-600 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {status} ({status === 'Todos' ? clients.length : clients.filter(c => c.status === status).length})
          </button>
        ))}
      </div>

      {/* Main Grid: Client Table + Selected Fiche side component */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CRM Database Table Container */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Empresa / Contato</th>
                  <th className="py-3 px-4">Instagram / Nicho</th>
                  <th className="py-3 px-4">Plano / Valor</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                {filteredClients.map((client) => (
                  <tr 
                    key={client.id}
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                      selectedClient?.id === client.id ? 'bg-indigo-50/40' : ''
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    {/* Company and Person Name */}
                    <td className="py-3.5 px-4 space-y-1">
                      <div className="font-bold text-slate-900">{client.company}</div>
                      <div className="text-[11px] text-slate-500 flex flex-col">
                        <span>{client.name}</span>
                        <span>{client.phone}</span>
                      </div>
                    </td>

                    {/* Meta Details */}
                    <td className="py-3.5 px-4 space-y-1">
                      <div className="font-medium text-indigo-600 font-mono text-[11px]">{client.instagram}</div>
                      <span className="inline-block bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">
                        {client.niche}
                      </span>
                    </td>

                    {/* Plan Details */}
                    <td className="py-3.5 px-4 space-y-1">
                      <div className="font-bold text-slate-800 text-[11px]">{client.plan}</div>
                      <div className="text-slate-500 text-[10px] font-mono font-semibold">
                        {formatCurrency(client.monthlyValue)}/mês
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                        client.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        client.status === 'Em negociação' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-rose-50 text-rose-700 border-rose-100'
                      }`}>
                        {client.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {/* Open dossier button */}
                        <button
                          onClick={() => setSelectedClient(client)}
                          title="Abrir Ficha"
                          className="p-1 text-slate-600 hover:text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
                        >
                          <FolderOpen size={14} />
                        </button>
                        {/* Edit button */}
                        <button
                          onClick={() => handleOpenEdit(client)}
                          title="Editar"
                          className="p-1 text-slate-600 hover:text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                        {/* Delete button */}
                        <button
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja excluir o cliente ${client.name} da KVB System?`)) {
                              onDeleteClient(client.id);
                              if (selectedClient?.id === client.id) setSelectedClient(null);
                            }
                          }}
                          title="Excluir"
                          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      Nenhum registro de cliente foi encontrado para esta pesquisa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Dossier Panel ("Ficha do Cliente / Histórico Completo") */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between space-y-4">
          {selectedClient ? (
            <div className="space-y-4 h-full flex flex-col justify-between" id="client-ficha-panel">
              {/* Header */}
              <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">FICHA DO CLIENTE</div>
                  <h3 className="text-sm font-extrabold text-slate-800">{selectedClient.company}</h3>
                  <p className="text-[11px] text-slate-500">{selectedClient.name}</p>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400"
                >
                  <X size={14} />
                </button>
              </div>

              {/* CRM Key Metrics in Fiche */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50/60 p-2.5 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 font-semibold text-[10px] block">CONTATO</span>
                  <p className="text-slate-700 truncate">{selectedClient.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold text-[10px] block">SITE / INDICAÇÃO</span>
                  <p className="text-slate-700 truncate">{selectedClient.email || 'Não informado'}</p>
                </div>
                <div className="mt-1">
                  <span className="text-slate-400 font-semibold text-[10px] block">VALOR PACTUADO</span>
                  <p className="text-slate-800 font-bold">{formatCurrency(selectedClient.monthlyValue)}</p>
                </div>
                <div className="mt-1">
                  <span className="text-slate-400 font-semibold text-[10px] block">DATA INICIAL</span>
                  <p className="text-slate-700">{formatDateString(selectedClient.entryDate)}</p>
                </div>
              </div>

              {/* History Timeline Logs list */}
              <div className="space-y-2 flex-grow">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <History size={13} className="text-indigo-600" />
                  Histórico Completo de Interações
                </div>
                <div className="border-l border-slate-200 ml-1.5 pl-3.5 space-y-3.5 max-h-56 overflow-y-auto pt-1 py-2">
                  {selectedClient.history.map((hist, index) => (
                    <div key={index} className="relative text-[11px] text-slate-600 space-y-0.5">
                      <div className="absolute -left-[20.5px] top-1 w-2 h-2 rounded-full bg-indigo-500 border-2 border-white"></div>
                      <span className="font-mono text-[9px] text-slate-400 block font-semibold">{formatDateString(hist.date)}</span>
                      <p className="leading-tight text-slate-700 pr-1">{hist.info}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add interaction note quick action */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Registrar Novo Acontecimento</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Ligação feita, alinhamos escopo..."
                    value={historyNote}
                    onChange={(e) => setHistoryNote(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleAddHistoryNote}
                    className="px-3 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white rounded text-xs font-bold flex items-center justify-center cursor-pointer"
                  >
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 space-y-2">
              <FolderOpen size={30} className="mx-auto text-slate-300" />
              <p className="text-xs">Clique em qualquer linha de cliente para carregar a ficha completa, interações históricas e controle operacional.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- ADD CLIENT MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto" id="add-client-modal">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <UserPlus size={16} className="text-indigo-600" />
                Cadastrar Novo Cliente Corporativo
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="grid grid-cols-2 gap-3.5 text-xs md:text-sm">
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 mb-1">CRACHÁ / EMPRESA CONTRATANTE *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Barbearia do Centro Ltda"
                  value={newClient.company}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">NOME DO RESPONSÁVEL *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">NICHO / CATEGORIA DE ATUAÇÃO</label>
                <input
                  type="text"
                  placeholder="Ex: Saúde, Varejo, Moda, etc"
                  value={newClient.niche}
                  onChange={(e) => setNewClient({ ...newClient, niche: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">WHATSAPP / TELEFONE *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: (11) 99876-5432"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">EMAIL INSTITUCIONAL</label>
                <input
                  type="email"
                  placeholder="contato@empresa.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">INSTAGRAM DA EMPRESA</label>
                <input
                  type="text"
                  placeholder="@empresa_oficial"
                  value={newClient.instagram}
                  onChange={(e) => setNewClient({ ...newClient, instagram: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">PLANO CONTRATADO</label>
                <select
                  value={newClient.plan}
                  onChange={(e) => handleNewPlanChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                >
                  <option value="Site">Site (R$158/mês)</option>
                  <option value="Automação">Automação (R$279/mês)</option>
                  <option value="Assessoria de Marketing">Assessoria de Marketing (R$200/mês)</option>
                  <option value="Combo KVB Especial">Combo KVB Especial (R$229/mês)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">VALOR DA MENSALIDADE (R$)</label>
                <input
                  type="number"
                  placeholder="158"
                  value={newClient.monthlyValue}
                  onChange={(e) => setNewClient({ ...newClient, monthlyValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">DATA DE ENTRADA *</label>
                <input
                  type="date"
                  required
                  value={newClient.entryDate}
                  onChange={(e) => setNewClient({ ...newClient, entryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">SITUAÇÃO COMERCIAL</label>
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Em negociação">Em negociação</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div className="col-span-2 pt-3 flex justify-end gap-3.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-xs flex items-center gap-1 cursor-pointer"
                >
                  Salvar Cliente no ERP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT CLIENT MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto" id="edit-client-modal">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Edit3 size={16} className="text-indigo-600" />
                Atualizar Cadastro de Cliente
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-3.5 text-xs md:text-sm">
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 mb-1">EMPRESA / CONTRATANTE *</label>
                <input
                  type="text"
                  required
                  value={editClientData.company}
                  onChange={(e) => setEditClientData({ ...editClientData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">NOME DO RESPONSÁVEL *</label>
                <input
                  type="text"
                  required
                  value={editClientData.name}
                  onChange={(e) => setEditClientData({ ...editClientData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">NICHO / CATEGORIA</label>
                <input
                  type="text"
                  value={editClientData.niche}
                  onChange={(e) => setEditClientData({ ...editClientData, niche: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">TELEFONE WHATSAPP</label>
                <input
                  type="text"
                  required
                  value={editClientData.phone}
                  onChange={(e) => setEditClientData({ ...editClientData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">EMAIL CONTATO</label>
                <input
                  type="email"
                  value={editClientData.email}
                  onChange={(e) => setEditClientData({ ...editClientData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">INSTAGRAM</label>
                <input
                  type="text"
                  value={editClientData.instagram}
                  onChange={(e) => setEditClientData({ ...editClientData, instagram: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">PLANO ATIVO</label>
                <select
                  value={editClientData.plan}
                  onChange={(e) => handleEditPlanChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                >
                  <option value="Site">Site</option>
                  <option value="Automação">Automação</option>
                  <option value="Assessoria de Marketing">Assessoria de Marketing</option>
                  <option value="Combo KVB Especial">Combo KVB Especial</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">VALOR MENSAL (R$)</label>
                <input
                  type="number"
                  value={editClientData.monthlyValue}
                  onChange={(e) => setEditClientData({ ...editClientData, monthlyValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">DATA DE ENTRADA</label>
                <input
                  type="date"
                  value={editClientData.entryDate}
                  onChange={(e) => setEditClientData({ ...editClientData, entryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">ATIVO NO CRM/SIS *</label>
                <select
                  value={editClientData.status}
                  onChange={(e) => setEditClientData({ ...editClientData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Em negociação">Em negociação</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div className="col-span-2 pt-3 flex justify-end gap-3.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-xs flex items-center gap-1 cursor-pointer"
                >
                  Confirmar Correção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CORE SERVICES PRICING SETUP MODAL (ADMIN CONTROL) --- */}
      {isPricingPanelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto" id="prices-panel-modal">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sliders size={16} className="text-indigo-600" />
                  Painel Administrativo de Valores
                </h3>
                <p className="text-[10px] text-slate-400">Edite os preços base. Todos os novos cadastros herdarão este valor padrão.</p>
              </div>
              <button onClick={() => setIsPricingPanelOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              
              {/* Site Base Price */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Preço Inicial Site (R$)</label>
                <input
                  type="number"
                  value={priceSite}
                  onChange={(e) => setPriceSite(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500 text-slate-700 font-mono font-bold"
                />
              </div>

              {/* Automation Base Price */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Preço Inicial Automação (R$)</label>
                <input
                  type="number"
                  value={priceAuto}
                  onChange={(e) => setPriceAuto(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500 text-slate-700 font-mono font-bold"
                />
              </div>

              {/* Marketing Base Price */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Preço Assessoria Marketing (R$)</label>
                <input
                  type="number"
                  value={priceMkt}
                  onChange={(e) => setPriceMkt(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500 text-slate-700 font-mono font-bold"
                />
              </div>

              {/* Special KVB Combo - Month 1 */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Combo KVB - Taxa Setup Inicial (R$)</label>
                <input
                  type="number"
                  value={priceComboFirst}
                  onChange={(e) => setPriceComboFirst(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500 text-slate-700 font-mono font-bold"
                />
              </div>

              {/* Special KVB Combo - Months Recurring */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Combo KVB - Mensalidade Recorrente (R$)</label>
                <input
                  type="number"
                  value={priceComboMonthly}
                  onChange={(e) => setPriceComboMonthly(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-indigo-500 text-slate-700 font-mono font-bold"
                />
              </div>

              <div className="pt-3.5 flex justify-end gap-3.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPricingPanelOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleSaveServicesSubmit}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save size={14} />
                  Salvar Mudanças base
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
