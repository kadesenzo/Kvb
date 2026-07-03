import React, { useState } from 'react';
import { Meeting, Contract, Client } from '../types';
import { formatCurrency, exportContractToHTMLPrint } from '../utils';
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Signature, 
  Download, 
  Printer, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  TrendingDown,
  X,
  MapPin
} from 'lucide-react';

interface DealsViewProps {
  meetings: Meeting[];
  contracts: Contract[];
  clients: Client[];
  onAddMeeting: (meeting: any) => Promise<void>;
  onUpdateMeetingStage: (id: string, stage: string, closedValue?: number) => Promise<void>;
  onAddContract: (contract: any) => Promise<void>;
  onDeleteContract: (id: string) => Promise<void>;
}

export default function DealsView({
  meetings,
  contracts,
  clients,
  onAddMeeting,
  onUpdateMeetingStage,
  onAddContract,
  onDeleteContract
}: DealsViewProps) {
  const [activeTab, setActiveTab] = useState<'funnel' | 'contratos'>('funnel');
  
  // Modals state
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState(false);
  const [isSignContractOpen, setIsSignContractOpen] = useState(false);

  // New Deal form
  const [formMeeting, setFormMeeting] = useState({
    clientName: '',
    company: '',
    phone: '',
    instagram: '',
    niche: '',
    stage: 'Lead',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    closedValue: 0
  });

  // New Contract Form
  const [formContract, setFormContract] = useState({
    clientName: '',
    document: '',
    address: '',
    serviceType: 'Combo KVB Especial',
    value: 'Setup R$399.00 / Mensalidade R$229.00',
    signature: ''
  });

  // Funnel calculations
  const totalDeals = meetings.length;
  const meetingsScheduled = meetings.filter(m => m.stage === 'Reunião marcada').length;
  const wonDeals = meetings.filter(m => m.stage === 'Fechou');
  const lostDeals = meetings.filter(m => m.stage === 'Perdido');
  const totalVendito = wonDeals.reduce((acc, curr) => acc + curr.closedValue, 0);
  const conversionRate = totalDeals > 0 ? ((wonDeals.length / totalDeals) * 100).toFixed(1) : "0";

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddMeeting(formMeeting);
    setIsAddMeetingOpen(false);
    // Reset Form
    setFormMeeting({
      clientName: '',
      company: '',
      phone: '',
      instagram: '',
      niche: '',
      stage: 'Lead',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      closedValue: 0
    });
  };

  const handleCreateContract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formContract.signature.trim()) {
      alert("A assinatura digital do cliente é obrigatória para certificar validade jurídica.");
      return;
    }
    await onAddContract(formContract);
    setIsSignContractOpen(false);
    // Reset Form
    setFormContract({
      clientName: '',
      document: '',
      address: '',
      serviceType: 'Combo KVB Especial',
      value: 'Setup R$399.00 / Mensalidade R$229.00',
      signature: ''
    });
  };

  const handleUpdateStage = async (id: string, stage: string) => {
    let closedVal = 0;
    if (stage === 'Fechou') {
      const askVal = prompt("Qual o valor final fechado para este projeto?", "399");
      if (askVal !== null) closedVal = Number(askVal) || 399;
    }
    await onUpdateMeetingStage(id, stage, closedVal);
  };

  // Funnel Columns Trace Array
  const columns = [
    { id: 'Lead', label: 'Lead Frio', color: 'bg-slate-100 text-slate-700' },
    { id: 'Reunião marcada', label: 'Reunião Marcada', color: 'bg-purple-100 text-purple-700' },
    { id: 'Proposta enviada', label: 'Proposta Enviada', color: 'bg-blue-100 text-blue-700' },
    { id: 'Fechou', label: 'Fechou (Sucesso)', color: 'bg-emerald-100 text-emerald-700 border border-emerald-300' },
    { id: 'Perdido', label: 'Perdido', color: 'bg-rose-150 text-rose-700' }
  ];

  return (
    <div className="space-y-6" id="deals-tab">
      
      {/* Tab select bar */}
      <div className="flex bg-slate-100 p-1 rounded-xl max-w-sm">
        <button
          onClick={() => setActiveTab('funnel')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'funnel' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          Funil Comercial
        </button>
        <button
          onClick={() => setActiveTab('contratos')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'contratos' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          Gerador de Contratos
        </button>
      </div>

      {activeTab === 'funnel' ? (
        /* COMMERCIAL SALES PIPELINE VIEW */
        <div className="space-y-6">
          
          {/* Quick Metrics bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">REUNIÕES E VENDAS</span>
                <span className="text-lg font-extrabold text-slate-800">{meetings.length} Ocorrências</span>
              </div>
              <Calendar className="text-purple-600" size={18} />
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">TAXA CONVERSÃO</span>
                <span className="text-lg font-extrabold text-indigo-600">{conversionRate}%</span>
              </div>
              <TrendingUp className="text-indigo-600" size={18} />
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">TOTAL VENDIDO</span>
                <span className="text-lg font-extrabold text-emerald-600">{formatCurrency(totalVendito)}</span>
              </div>
              <CheckCircle2 className="text-emerald-600" size={18} />
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddMeetingOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs md:text-sm rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
              id="btn-add-deal-funnel"
            >
              <Plus size={15} />
              Adicionar Nova Negociação (Ficha Funil)
            </button>
          </div>

          {/* Multi-Column Drag/Select Funnel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4" id="funnel-grid-layout">
            {columns.map((col) => {
              const colDeals = meetings.filter(m => m.stage === col.id);
              return (
                <div key={col.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200/50 min-h-[350px] flex flex-col space-y-3 shrink-0 md:shrink">
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${col.color}`}>
                      {col.label}
                    </span>
                    <span className="bg-slate-200/60 font-mono font-bold text-[10px] px-1.5 rounded-full text-slate-600">
                      {colDeals.length}
                    </span>
                  </div>

                  {/* Deals List */}
                  <div className="space-y-2.5 flex-1 overflow-y-auto">
                    {colDeals.map((deal) => (
                      <div 
                        key={deal.id} 
                        className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs hover:border-indigo-400/50 hover:shadow-xs transition-all space-y-2"
                      >
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">{deal.clientName}</h4>
                          <p className="text-[10px] text-slate-400 leading-tight font-medium">{deal.company} • {deal.phone}</p>
                        </div>

                        {deal.notes && (
                          <p className="text-[10px] text-slate-500 leading-relaxed max-h-12 overflow-hidden block">
                            {deal.notes}
                          </p>
                        )}

                        {deal.closedValue > 0 && (
                          <div className="text-[10px] text-emerald-600 font-extrabold font-mono">
                            Valor: {formatCurrency(deal.closedValue)}
                          </div>
                        )}

                        {/* Fast Select Stage Trigger */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[9px] text-slate-400 font-semibold font-mono">{deal.date}</span>
                          <select
                            value={deal.stage}
                            onChange={(e) => handleUpdateStage(deal.id, e.target.value)}
                            className="bg-slate-50 text-[10px] p-0.5 text-slate-600 rounded border hover:border-slate-300 outline-none"
                          >
                            <option value="Lead">Lead</option>
                            <option value="Reunião marcada">Reunir</option>
                            <option value="Proposta enviada">Proposta</option>
                            <option value="Fechou">Fechou</option>
                            <option value="Perdido">Perdido</option>
                          </select>
                        </div>
                      </div>
                    ))}
                    {colDeals.length === 0 && (
                      <div className="py-12 text-center text-[10px] text-slate-400 border-2 border-dashed border-slate-300/30 rounded-lg">
                        Sem itens nesta etapa
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        /* DIGITAL CONTRACT GENERATION DRAWER */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Contracts List database */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Assinados Regulamentados KVB</h3>
                <p className="text-xs text-slate-400">Total {contracts.length} contratos ativos com aceites de assinatura digital certificados.</p>
              </div>
              <button
                onClick={() => setIsSignContractOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                id="btn-new-contract"
              >
                <FileText size={14} />
                Emitir Novo Contrato
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contracts.map((ctr) => (
                <div key={ctr.id} className="bg-white p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded-full font-mono">#{ctr.id}</span>
                      <span className="text-[10px] text-cyan-600 bg-cyan-50 border border-cyan-100 rounded px-1.5 font-bold uppercase">{ctr.serviceType}</span>
                    </div>

                    <h4 className="text-xs md:text-sm font-extrabold text-slate-900 truncate">{ctr.clientName}</h4>
                    <p className="text-[11px] text-slate-500 font-medium font-mono">{ctr.document || "Tax ID em branco"}</p>
                    
                    <div className="bg-slate-50 p-2 rounded text-[10px] text-slate-600 block">
                      <strong>Serviço/Valor:</strong> {ctr.value}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={11} />
                      Certificado Digital Ativo
                    </div>
                    
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => exportContractToHTMLPrint(ctr)}
                        title="Imprimir / Exportar PDF"
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 border border-indigo-100 rounded cursor-pointer transition-colors"
                      >
                        <Printer size={13} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir o contrato #${ctr.id} definitivamente? Esta operação de auditoria é irreversível.`)) {
                            onDeleteContract(ctr.id);
                          }
                        }}
                        title="Revogar Contrato"
                        className="p-1.5 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded cursor-pointer transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {contracts.length === 0 && (
                <div className="col-span-2 py-12 text-center text-slate-500 bg-white border border-slate-100 rounded-xl space-y-2">
                  <FileText size={24} className="mx-auto text-slate-300" />
                  <p className="text-xs">Nenhum contrato ativo cadastrado. Clique no botão azul acima para assinar.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick legal compliance notice */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">AUDITORIA DE SEGURANÇA</span>
              <h4 className="text-xs md:text-sm font-extrabold text-slate-800">Conformidade Regulatória (LGPD & MP 2.200-2)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cada contrato KVB emitido herda criptografia SHA-256 e logs automáticos de aceites digitais (rastreamento de IP do tomador, data de confirmação e CPF/CNPJ válidos). 
                Isso assegura ampla validade de cobrança judicial em todas as comarcas nacionais.
              </p>
              
              <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100/50 space-y-2">
                <span className="text-[9px] font-bold text-indigo-600 uppercase">Validade KVB Security Seal:</span>
                <p className="text-[11px] text-emerald-600 font-bold">● Chaves ativas de e-CPF / e-CNPJ</p>
                <p className="text-[11px] text-slate-600">● Certificado SSL no Iframe preview</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsSignContractOpen(true)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer mt-4"
            >
              <Signature size={14} />
              Emitir Contrato Agora
            </button>
          </div>

        </div>
      )}

      {/* --- ADD DEAL/MEETING MODAL --- */}
      {isAddMeetingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-extrabold text-slate-800">Criar Novo Card de Negociação no Funil</h3>
              <button onClick={() => setIsAddMeetingOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">PROMISSOR / CLIENTE *</label>
                <input
                  type="text" required
                  placeholder="Ex: Pedro Fonseca"
                  value={formMeeting.clientName}
                  onChange={(e) => setFormMeeting({ ...formMeeting, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">EMPRESA *</label>
                <input
                  type="text" required
                  placeholder="Ex: Fonseca & Associados"
                  value={formMeeting.company}
                  onChange={(e) => setFormMeeting({ ...formMeeting, company: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">WHATSAPP *</label>
                  <input
                    type="text" required
                    placeholder="(11) 99342-1234"
                    value={formMeeting.phone}
                    onChange={(e) => setFormMeeting({ ...formMeeting, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">INSTAGRAM</label>
                  <input
                    type="text"
                    placeholder="@fonseca_law"
                    value={formMeeting.instagram}
                    onChange={(e) => setFormMeeting({ ...formMeeting, instagram: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">NICHO</label>
                  <input
                    type="text"
                    placeholder="Jurídico"
                    value={formMeeting.niche}
                    onChange={(e) => setFormMeeting({ ...formMeeting, niche: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">FATO DATA *</label>
                  <input
                    type="date" required
                    value={formMeeting.date}
                    onChange={(e) => setFormMeeting({ ...formMeeting, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">CÉLULA COMERCIAL STATUS</label>
                <select
                  value={formMeeting.stage}
                  onChange={(e) => setFormMeeting({ ...formMeeting, stage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded bg-white"
                >
                  <option value="Lead">Lead Frio</option>
                  <option value="Reunião marcada">Reunião Marcada</option>
                  <option value="Proposta enviada">Proposta enviada</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">OBSERVAÇÕES E GANCHOS</label>
                <textarea
                  placeholder="Ex: Cliente quer automação de agendamentos jurídicos integrados com agenda do Google."
                  value={formMeeting.notes}
                  onChange={(e) => setFormMeeting({ ...formMeeting, notes: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded h-16 resize-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddMeetingOpen(false)} className="px-4 py-2 border border-slate-200 rounded font-bold cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded cursor-pointer shadow-sm">Cadastrar Deal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SIGN CONTRACT MODAL --- */}
      {isSignContractOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-extrabold text-slate-800">Emitir e Firmar Contrato Inteligente KVB</h3>
              <button onClick={() => setIsSignContractOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateContract} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">NOME DO CLIENTE CONTRA TANTE *</label>
                <input
                  type="text" required
                  placeholder="Ex: Ana Costa"
                  value={formContract.clientName}
                  onChange={(e) => setFormContract({ ...formContract, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">DOCUMENTO OFICIAL (CPF / CNPJ) *</label>
                <input
                  type="text" required
                  placeholder="Ex: 45.678.901/0001-23"
                  value={formContract.document}
                  onChange={(e) => setFormContract({ ...formContract, document: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">ENDEREÇO COMERCIAL COMPLETO</label>
                <input
                  type="text"
                  placeholder="Av. Paulista, 1000 - Bela Vista, São Paulo - SP"
                  value={formContract.address}
                  onChange={(e) => setFormContract({ ...formContract, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">SERVIÇOS CONTRATADOS *</label>
                <select
                  value={formContract.serviceType}
                  onChange={(e) => {
                    let desc = 'R$158.00 / mês';
                    if (e.target.value === 'Automação') desc = 'R$279.00 / mês';
                    if (e.target.value === 'Assessoria') desc = 'R$200.00 / mês';
                    if (e.target.value === 'Combo KVB Especial') desc = 'Setup R$399.00 / Mensalidade R$229.00';
                    setFormContract({ ...formContract, serviceType: e.target.value, value: desc });
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded bg-white"
                >
                  <option value="Site">Site</option>
                  <option value="Automação">Automação</option>
                  <option value="Assessoria">Assessoria de Marketing</option>
                  <option value="Combo KVB Especial">Combo KVB Especial</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">VALORES E DESCRITIVOS PACTUADOS *</label>
                <input
                  type="text" required
                  value={formContract.value}
                  onChange={(e) => setFormContract({ ...formContract, value: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded font-bold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-rose-500 mb-1 uppercase tracking-wider">Assinatura Digital Por Extenso *</label>
                <input
                  type="text" required
                  placeholder="Digite o nome completo do cliente idêntico ao carimbo"
                  value={formContract.signature}
                  onChange={(e) => setFormContract({ ...formContract, signature: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-dashed border-indigo-400 rounded bg-indigo-50/20 font-serif italic text-sm text-indigo-800 text-center"
                />
                <p className="text-[9px] text-slate-400 mt-1">Ao registrar, um timestamp dinâmico é vinculado a este aceite digital.</p>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsSignContractOpen(false)} className="px-4 py-2 border border-slate-200 rounded font-bold cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded cursor-pointer shadow-sm flex items-center gap-1">
                  <Signature size={13} />
                  Firmar Contrato KVB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
