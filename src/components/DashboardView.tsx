import React from 'react';
import { Client, Meeting, FinanceState, Project, Task } from '../types';
import { formatCurrency } from '../utils';
import { 
  TrendingUp, 
  Users, 
  UserMinus, 
  DollarSign, 
  Calendar, 
  CheckSquare, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  FileText
} from 'lucide-react';

interface DashboardViewProps {
  clients: Client[];
  meetings: Meeting[];
  finance: FinanceState;
  projects: Project[];
  tasks: Task[];
  onNavigate: (tab: string) => void;
}

export default function DashboardView({
  clients,
  meetings,
  finance,
  projects,
  tasks,
  onNavigate
}: DashboardViewProps) {
  // --- COMPUTATIONS BASED ON STATE ---
  const activeClients = clients.filter(c => c.status === 'Ativo');
  const cancelledClients = clients.filter(c => c.status === 'Cancelado');
  const inNegotiationClients = clients.filter(c => c.status === 'Em negociação');

  // MRR - Monthly Recurrent Revenue (Sum of active clients monthly values)
  const mrr = activeClients.reduce((acc, current) => acc + current.monthlyValue, 0);

  // Total monthly revenue (Sum of all entries, default to June 2026)
  const currentDate = new Date('2026-06-22T19:28:50-07:00');
  const currentMonthStr = "2026-06";
  
  const entriesThisMonth = finance.entries.filter(e => e.date.startsWith(currentMonthStr));
  const totalFaturamento = entriesThisMonth.reduce((acc, curr) => acc + curr.amount, 0);

  const exitsThisMonth = finance.exits.filter(e => e.date.startsWith(currentMonthStr));
  const totalDespesas = exitsThisMonth.reduce((acc, curr) => acc + curr.amount, 0);

  // Profit
  const netProfit = totalFaturamento - totalDespesas;

  // Received Today (Jun 22, 2026 or latest entry in database)
  const todayStr = "2026-06-22";
  const receivedToday = finance.entries
    .filter(e => e.date === todayStr)
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Goal Progress
  const goalPercent = Math.min((totalFaturamento / finance.monthlyGoal) * 100, 100);

  // Open tasks
  const openTasks = tasks.filter(t => t.status !== 'Concluído').length;
  // Upcoming meetings
  const upcomingMeetings = meetings.filter(m => m.stage === 'Reunião marcada' || m.stage === 'Lead');

  // Funnel calculations for conversion rate
  const totalDeals = meetings.length;
  const wonDeals = meetings.filter(m => m.stage === 'Fechou').length;
  const conversionRate = totalDeals > 0 ? ((wonDeals / totalDeals) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6" id="dashboard-tab">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-6 md:p-8 border border-indigo-900/40 relative overflow-hidden shadow-sm" id="welcome-banner">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-medium">
            <Sparkles size={13} />
            WORKSPACE KVB SYSTEM
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">ERP+CRM da KVB System</h1>
          <p className="text-slate-400 max-w-xl text-xs md:text-sm">
            Bem-vindo ao painel de controle operacional da sua agência. Monitore faturamento, converse com consultores de IA, gerencie contratos virtuais e crie briefings automatizados para acelerar entregas.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button 
              onClick={() => onNavigate('generator')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-medium text-xs md:text-sm rounded-lg flex items-center gap-2 cursor-pointer shadow-sm shadow-indigo-900/30"
              id="btn-goto-ai"
            >
              <Sparkles size={15} />
              Criar Novo Projeto com IA
            </button>
            <button 
              onClick={() => onNavigate('crm')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 transition-colors text-slate-200 border border-slate-700 font-medium text-xs md:text-sm rounded-lg flex items-center gap-2 cursor-pointer"
              id="btn-goto-crm"
            >
              <Users size={15} />
              Ver Banco do CRM
            </button>
          </div>
        </div>
      </div>

      {/* Central de Análise Inteligente IA */}
      <div className="bg-gradient-to-r from-emerald-50/60 to-indigo-50/60 border border-indigo-100 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs" id="ai-analytics-center">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs shrink-0">
            <Sparkles size={16} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">Central de Análise Inteligente KVB IA</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              "Você perdeu 1 cliente este mês no funil. Sugiro focar em retenção de saúde e estética. O faturamento está a <b>{goalPercent.toFixed(0)}%</b> da sua meta mensal. O MRR garantido de <b>{formatCurrency(mrr)}</b> dá excelente previsibilidade para investimentos futuros."
            </p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('ai-chat')}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg whitespace-nowrap cursor-pointer shadow-xs"
        >
          Consultar CEO IA
        </button>
      </div>

      {/* Main KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4" id="kpi-grid">
        {/* Faturamento */}
        <div className="stat-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Faturamento Mês</span>
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600"><DollarSign size={15} /></div>
          </div>
          <div className="pt-2">
            <div className="text-lg md:text-xl font-bold text-slate-900">{formatCurrency(totalFaturamento)}</div>
            <div className="text-[10px] text-slate-500 flex items-center gap-0.5 mt-0.5">
              <TrendingUp size={11} className="text-emerald-500" />
              <span className="text-emerald-600 font-bold">+18.5%</span> vs mês ant.
            </div>
          </div>
        </div>

        {/* Lucros */}
        <div className="stat-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Lucro Real</span>
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600"><TrendingUp size={15} /></div>
          </div>
          <div className="pt-2">
            <div className="text-lg md:text-xl font-bold text-slate-900">{formatCurrency(netProfit)}</div>
            <div className="text-[10px] text-slate-500 flex items-center gap-0.5 mt-0.5">
              <span className="text-slate-700 font-bold">{(netProfit / (totalFaturamento || 1) * 100).toFixed(0)}%</span> margem líquida
            </div>
          </div>
        </div>

        {/* MRR */}
        <div className="stat-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Recorrente (MRR)</span>
            <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600"><Target size={15} /></div>
          </div>
          <div className="pt-2">
            <div className="text-lg md:text-xl font-bold text-slate-900">{formatCurrency(mrr)}</div>
            <div className="text-[10px] text-indigo-600 font-semibold flex items-center mt-0.5">
              Fixo assegurado
            </div>
          </div>
        </div>

        {/* Recebido Hoje */}
        <div className="stat-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Recebido Hoje</span>
            <div className="p-1.5 bg-yellow-50 rounded-lg text-yellow-600"><DollarSign size={15} /></div>
          </div>
          <div className="pt-2">
            <div className="text-lg md:text-xl font-bold text-slate-900">{formatCurrency(receivedToday)}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Data de hoje
            </div>
          </div>
        </div>

        {/* Clientes Ativos */}
        <div className="stat-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Clientes Ativos</span>
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600"><Users size={15} /></div>
          </div>
          <div className="pt-2">
            <div className="text-lg md:text-xl font-bold text-slate-900">{activeClients.length}</div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
              <span>{inNegotiationClients.length} em funil</span>
            </div>
          </div>
        </div>

        {/* Clientes Cancelados */}
        <div className="stat-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Cancelados</span>
            <div className="p-1.5 bg-rose-50 rounded-lg text-rose-600"><UserMinus size={15} /></div>
          </div>
          <div className="pt-2">
            <div className="text-lg md:text-xl font-bold text-slate-900">{cancelledClients.length}</div>
            <div className="text-[10px] text-rose-600 font-semibold mt-0.5">
              Churn: {(cancelledClients.length / (clients.length || 1) * 100).toFixed(0)}% total
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Charts & Sales Funnel + Goal Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="charts-and-goals">
        
        {/* Growth Chart Container */}
        <div className="stat-card flex flex-col justify-between lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Histórico de Crescimento & MRR</h3>
              <p className="text-xs text-slate-400">Evolução do faturamento geral da agência nos últimos meses</p>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full py-0.5 px-2.5 font-medium">Junho 2026</span>
          </div>

          {/* Styled SVG Chart representing the Growth Wave */}
          <div className="relative h-44 w-full bg-slate-50/50 rounded-lg border border-slate-100/50 p-2 flex flex-col justify-between">
            {/* Simple Gridlines */}
            <div className="absolute inset-x-0 top-1/4 border-b border-slate-100"></div>
            <div className="absolute inset-x-0 top-2/4 border-b border-slate-100"></div>
            <div className="absolute inset-x-0 top-3/4 border-b border-slate-100"></div>

            {/* SVG line and gradient fill */}
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible absolute inset-0 z-10" id="growth-svg">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              <path 
                d="M 10 120 L 100 105 L 190 90 L 280 80 L 370 65 L 490 40" 
                fill="none" 
                stroke="#4f46e5" 
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path 
                d="M 10 120 L 100 105 L 190 90 L 280 80 L 370 65 L 490 40 L 490 148 L 10 148 Z" 
                fill="url(#chartGradient)"
              />
              {/* Data dots */}
              <circle cx="10" cy="120" r="4" fill="#4f46e5" className="cursor-pointer" />
              <circle cx="100" cy="105" r="4" fill="#4f46e5" />
              <circle cx="190" cy="90" r="4" fill="#4f46e5" />
              <circle cx="280" cy="80" r="4" fill="#4f46e5" />
              <circle cx="370" cy="65" r="4" fill="#4f46e5" />
              <circle cx="490" cy="40" r="5" fill="#4D3E3F" stroke="#4f46e5" strokeWidth="2" />
            </svg>

            {/* Labels aligned below SVG */}
            <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-auto z-20">
              <span>Janeiro (R$3K)</span>
              <span>Fevereiro (R$5K)</span>
              <span>Março (R$6K)</span>
              <span>Abril (R$8K)</span>
              <span>Maio (R$11K)</span>
              <span className="text-indigo-600 font-bold">Junho (R$12.3K)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-slate-50 p-2 rounded-lg">
              <div className="text-[10px] text-slate-400">Faturamento Médio por Cliente</div>
              <div className="text-sm font-bold text-slate-800">{formatCurrency(totalFaturamento / (clients.length || 1))}</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <div className="text-[10px] text-slate-400">Total Faturamento Acumulado</div>
              <div className="text-sm font-bold text-slate-800">R$ 55.480,00</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <div className="text-[10px] text-slate-400">LTV Médio Estimado</div>
              <div className="text-sm font-bold text-slate-800">R$ 3.840,00</div>
            </div>
          </div>
        </div>

        {/* Monthly Target Meter Card */}
        <div className="stat-card flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Acompanhamento de Meta</h3>
              <p className="text-xs text-slate-400">Meta de faturamento comercial KVB para o mês ativo</p>
            </div>

            {/* Circular progress simulated */}
            <div className="flex flex-col items-center justify-center py-3 relative">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-slate-100"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-indigo-600 transition-all duration-500"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={2 * Math.PI * 48 * (1 - goalPercent / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xl font-extrabold text-slate-800">{goalPercent.toFixed(0)}%</span>
                  <p className="text-[8px] text-slate-400 uppercase tracking-widest">Atingido</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Valor Acumulado:</span>
                <span className="text-slate-900">{formatCurrency(totalFaturamento)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Meta do Mês:</span>
                <span className="text-indigo-600 font-bold">{formatCurrency(finance.monthlyGoal)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('finance')}
            className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer mt-4"
          >
            Ajustar Meta & Financeiro
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Grid: Tasks, Client Portal status, and Meetings schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="dashboard-extras">
        
        {/* CRM Funnel and Conversions */}
        <div className="stat-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Próximas Reuniões & Leads de Vendas</h3>
              <p className="text-xs text-slate-400">Negociações ativas no funil comercial</p>
            </div>
            <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold rounded-full border border-yellow-200">
              Taxa de Conversão: {conversionRate}%
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
            {meetings.slice(0, 5).map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50/50 px-1 rounded-lg">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-800">{m.clientName}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono text-[9px]">{m.niche}</span>
                    <span>• {m.company}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                    m.stage === 'Fechou' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    m.stage === 'Perdido' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    m.stage === 'Proposta enviada' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    m.stage === 'Reunião marcada' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {m.stage}
                  </span>
                  <div className="text-[9px] text-slate-400 mt-1">{m.date}</div>
                </div>
              </div>
            ))}
            {meetings.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-400">Nenhuma reunião de vendas registrada.</div>
            )}
          </div>
          
          <button 
            onClick={() => onNavigate('deals')}
            className="w-full py-2 bg-slate-950 text-white hover:bg-slate-850 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            Acessar Funil de Reuniões & Vendas
          </button>
        </div>

        {/* Current Deliveries Roadmap (Tasks / Projects) */}
        <div className="stat-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Entregáveis Ativos do Kanban</h3>
              <p className="text-xs text-slate-400">Status dos cronogramas em andamento na agência</p>
            </div>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-200">
              {openTasks} Pendentes
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
            {tasks.map((t) => (
              <div key={t.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50/50 px-1 rounded-lg">
                <div className="space-y-0.5 pr-2 max-w-[70%]">
                  <div className="text-xs font-bold text-slate-800 truncate">{t.title}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 flex-wrap">
                    <span className="font-medium text-slate-600">{t.assignedTo}</span>
                    <span>•</span>
                    <span className={`inline-flex items-center gap-0.5 px-1 rounded text-[9px] font-bold ${
                      t.priority === 'Alta' ? 'text-rose-600 bg-rose-50' :
                      t.priority === 'Média' ? 'text-amber-600 bg-amber-50' :
                      'text-indigo-600 bg-indigo-50'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    t.status === 'Concluído' ? 'bg-emerald-100 text-emerald-800' :
                    t.status === 'Em desenvolvimento' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onNavigate('kanban')}
            className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Gerenciar Quadro de Tarefas
          </button>
        </div>
      </div>
    </div>
  );
}
