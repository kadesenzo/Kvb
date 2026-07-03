import React, { useState } from 'react';
import { Client, Ticket } from '../types';
import { formatCurrency, formatDateString } from '../utils';
import { 
  Building, 
  User, 
  Laptop, 
  HelpCircle, 
  Compass, 
  MessageSquare, 
  CheckCircle, 
  Plus, 
  Clock, 
  ArrowRight,
  X,
  Lock,
  Zap,
  Globe,
  Radio
} from 'lucide-react';

interface ClientPortalViewProps {
  clients: Client[];
  tickets: Ticket[];
  onAddTicket: (ticket: any) => Promise<void>;
  onUpdateTicketStatus: (id: string, status: string) => Promise<void>;
}

export default function ClientPortalView({
  clients,
  tickets,
  onAddTicket,
  onUpdateTicketStatus
}: ClientPortalViewProps) {
  // Simulator authentication state
  const [selectedClientPortalId, setSelectedClientPortalId] = useState<string>('');
  
  // Ticket forms
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');

  // Active client object
  const activeClient = clients.find(c => c.id === selectedClientPortalId);

  // Active client tickets
  const clientTickets = tickets.filter(t => t.clientId === selectedClientPortalId);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeClient) return;
    
    await onAddTicket({
      clientId: activeClient.id,
      clientName: activeClient.company,
      subject: newTicketSubject,
      description: newTicketDesc,
      status: 'Aberto'
    });

    setIsNewTicketOpen(false);
    setNewTicketSubject('');
    setNewTicketDesc('');
  };

  return (
    <div className="space-y-6 animate-fade-in" id="client-portal-tab">
      
      {/* Simulation Bar */}
      <div className="bg-indigo-900 text-white p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-950 shadow-md">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">PORTAL DE MARCA EXCLUSIVA DO CLIENTE</span>
          </div>
          <h3 className="text-sm md:text-md font-bold">Portal do Cliente (Simulação KVB Area)</h3>
          <p className="text-xs text-indigo-300">Escolha um cliente cadastrado abaixo para acessar instantaneamente a área dele de entregas, faturas e chamados.</p>
        </div>

        {/* Client selector trigger */}
        <div className="flex items-center gap-3">
          <Building size={16} className="text-indigo-300 shrink-0" />
          <select
            value={selectedClientPortalId}
            onChange={(e) => setSelectedClientPortalId(e.target.value)}
            className="bg-indigo-950 border border-indigo-800 text-xs md:text-sm font-semibold rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-400 transition-colors cursor-pointer"
          >
            <option value="">-- Selecione uma marca cadastrada --</option>
            {clients.map(cl => (
              <option key={cl.id} value={cl.id}>{cl.company} ({cl.name})</option>
            ))}
          </select>
        </div>
      </div>

      {activeClient ? (
        /* PORTAL BODY CONTAINER */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="client-active-workspace">
          
          {/* Main workspace (Milestones and deliveries) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Greetings card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] text-indigo-600 font-extrabold uppercase">ÁREA DO PARCEIRO</span>
                  <h3 className="text-lg font-extrabold text-slate-800">Bem-vindo, {activeClient.name}!</h3>
                  <p className="text-xs text-slate-500">Acompanhe as fases de desenvolvimento do seu Website, Automação do Funil e Tráfego Pago cadastrados na KVB.</p>
                </div>
                
                <span className="px-3 py-1 font-bold font-mono text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg">
                  KVB Partner Nível 1
                </span>
              </div>

              {/* Grid of standard contract services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                
                {/* Website deliverable card */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold">
                    <Globe size={14} />
                    <span>Hospedagem & Site</span>
                  </div>
                  <p className="text-xs text-slate-500">Desenvolvimento com Design Responsivo e otimização SEO concluídos.</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
                    Aprovado & Ativo
                  </span>
                </div>

                {/* Automation deliverable card */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold">
                    <Zap size={14} />
                    <span>Automações WhatsApp</span>
                  </div>
                  <p className="text-xs text-slate-500">Configuração de funis inteligentes N8N para captação local.</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
                    Ativo Homologado
                  </span>
                </div>

                {/* Marketing deliverable card */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold">
                    <Radio size={14} />
                    <span>Planejamento Marketing</span>
                  </div>
                  <p className="text-xs text-slate-500">Estratégia comercial e calendário de Reels trimestrais.</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-extrabold bg-yellow-100 text-yellow-800">
                    Em Produção
                  </span>
                </div>

              </div>
            </div>

            {/* TICKETS GESTURE COMPONENT */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <MessageSquare size={16} className="text-indigo-600" />
                    Chamados de Suporte e Dúvidas
                  </h3>
                  <p className="text-xs text-slate-400">Abra chamados para reportar correções ou pedir novas alterações de site e anúncios.</p>
                </div>
                
                <button
                  onClick={() => setIsNewTicketOpen(true)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                  id="btn-client-open-ticket"
                >
                  <Plus size={14} />
                  Abrir Chamado
                </button>
              </div>

              {/* Tickets timeline mapped */}
              <div className="space-y-3">
                {clientTickets.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-slate-200/60 font-mono text-slate-500 px-1 font-bold rounded">#CH-{t.id}</span>
                        <h4 className="text-xs font-bold text-slate-800">{t.subject}</h4>
                      </div>
                      <p className="text-xs text-slate-500">{t.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border ${
                        t.status === 'Aberto' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        Status: {t.status}
                      </span>

                      {t.status === 'Aberto' && (
                        <button
                          onClick={() => onUpdateTicketStatus(t.id, 'Resolvido')}
                          className="px-2.5 py-1 text-[10px] font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                        >
                          Marcar Resolvido
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {clientTickets.length === 0 && (
                  <div className="py-12 text-center text-xs text-slate-400">
                    Você ainda não possui nenhum chamado aberto. Tudo funcionando perfeitamente!
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Side card parameters (Faturamento / Contatos) */}
          <div className="space-y-6">
            
            {/* Contact and Service dossier summary */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 space-y-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">EXTRATO DA CONTRATAÇÃO</span>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">PLANO ATIVO</span>
                  <p className="text-xs font-bold text-indigo-600">{activeClient.plan}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">VALOR COBRADO</span>
                  <p className="text-xs font-mono font-bold text-slate-800">{formatCurrency(activeClient.monthlyValue)}/mês</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">SITUAÇÃO COMERCIAL</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {activeClient.status}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">DATA ASSINATURA</span>
                  <p className="text-xs text-slate-600 font-mono font-semibold">{formatDateString(activeClient.entryDate)}</p>
                </div>
              </div>
            </div>

            {/* Support hotline contact */}
            <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-3.5">
              <span className="text-[9px] text-indigo-400 font-extrabold uppercase tracking-widest">KVB SUPPORT CENTER</span>
              <h4 className="text-xs md:text-sm font-bold leading-tight">Precisa de suporte urgente ou ligação emergencial?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nossos consultores estão disponíveis de Segunda a Sexta das 9h às 18h no WhatsApp integrado.
              </p>
              
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={`https://wa.me/${activeClient.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-indigo-600 text-center hover:bg-indigo-500 rounded-lg text-xs font-bold block transition-colors"
                >
                  Falar no Whatsapp Suporte
                </a>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* DISENGAGED STATE INFO */
        <div className="bg-white rounded-2xl border border-slate-100 p-16 flex flex-col items-center justify-center text-center space-y-3 min-h-[300px]" id="client-idle-viewport">
          <Lock size={32} className="text-slate-300 animate-bounce" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">Selecione uma Empresa</h4>
            <p className="text-xs text-slate-500 max-w-sm">No topo da tela, selecione um cliente registrado para carregar a simulação exata que o cliente vê em sua própria área restrita de suporte.</p>
          </div>
        </div>
      )}

      {/* --- OPEN TICKET COMPREHENSIVE MODAL --- */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 border border-slate-100 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-bold text-slate-800">Abrir Novo Chamado de Atendimento</h3>
              <button onClick={() => setIsNewTicketOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Assunto / Título do Chamado *</label>
                <input
                  type="text" required
                  placeholder="Ex: Corrigir cor do formulário de contato"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:border-indigo-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Descritivo Detalhado / Erro encontrado *</label>
                <textarea
                  required
                  placeholder="Ex: No celular, o botão de agendamento está cortando o texto. Gostaria de reduzir o tamanho da fonte para mobile..."
                  value={newTicketDesc}
                  onChange={(e) => setNewTicketDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded h-24 resize-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsNewTicketOpen(false)} className="px-4 py-2 border border-slate-200 rounded font-bold cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded cursor-pointer shadow-sm">Abrir Chamado KVB</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
