import React, { useState } from 'react';
import { Task, Ticket } from '../types';
import { 
  User, 
  CheckCircle, 
  Clock, 
  Award, 
  ShieldCheck, 
  ListTodo,
  Terminal,
  Cpu,
  Coins,
  Megaphone,
  UserPlus,
  Send,
  History,
  Lock,
  Unlock,
  Sliders,
  Mail,
  Smartphone,
  Trash2,
  Check,
  Search,
  Building,
  SlidersHorizontal,
  Layers,
  Database,
  BarChart3,
  Bot,
  Laptop,
  Palette,
  TrendingUp,
  BookOpen,
  GraduationCap,
  FolderLock,
  Key,
  Shield,
  RefreshCw,
  QrCode,
  Download,
  AlertTriangle
} from 'lucide-react';

interface StaffViewProps {
  tasks: Task[];
  tickets: Ticket[];
  activityLogs: { id: string; user: string; role: string; company: string; action: string; timestamp: string }[];
  onAddLog: (action: string) => void;
  currentTenant: string;
  currentUserRole: string;
  rolePermissions: Record<string, string[]>;
  onUpdatePermissions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  tenantModules: Record<string, string[]>;
  onUpdateTenantModules: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  tenantPlans: Record<string, 'Starter' | 'Pro' | 'Business' | 'Enterprise'>;
  onUpdateTenantPlans: React.Dispatch<React.SetStateAction<Record<string, 'Starter' | 'Pro' | 'Business' | 'Enterprise'>>>;
}

export default function StaffView({ 
  tasks, 
  tickets, 
  activityLogs, 
  onAddLog, 
  currentTenant, 
  currentUserRole,
  rolePermissions,
  onUpdatePermissions,
  tenantModules,
  onUpdateTenantModules,
  tenantPlans,
  onUpdateTenantPlans
}: StaffViewProps) {
  
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'modules' | 'logs' | 'productivity' | 'security'>('users');
  
  // Simulated invited users state
  const [usersList, setUsersList] = useState([
    { id: '1', name: 'João Silva', contact: 'joao@saboresdojoao.com', type: 'E-mail', role: 'Administrador', tenant: 'Restaurante do João', status: 'Ativo', lastAccess: 'Hoje às 18:22' },
    { id: '2', name: 'Maria Souza', contact: '11988887777', type: 'WhatsApp', role: 'Gerente', tenant: 'Restaurante do João', status: 'Ativo', lastAccess: 'Ontem às 15:40' },
    { id: '3', name: 'Carlos Santos', contact: 'carlos@restaurante.com', type: 'E-mail', role: 'Vendedor', tenant: 'Restaurante do João', status: 'Pendente', lastAccess: 'Nunca' },
    { id: '4', name: 'Dra. Beatriz Santos', contact: 'contato@odontosilva.com', type: 'E-mail', role: 'Administrador', tenant: 'Clínica OdontoSilva', status: 'Ativo', lastAccess: 'Hoje às 19:02' },
    { id: '5', name: 'Ana Carolina', contact: 'ana@odontosilva.com', type: 'E-mail', role: 'Marketing', tenant: 'Clínica OdontoSilva', status: 'Ativo', lastAccess: 'Ontem às 10:11' },
    { id: '6', name: 'Dr. Roberto', contact: '11977776666', type: 'WhatsApp', role: 'Funcionário', tenant: 'Clínica OdontoSilva', status: 'Ativo', lastAccess: 'Há 3 dias' }
  ]);

  // Invite Form States
  const [inviteName, setInviteName] = useState('');
  const [inviteContact, setInviteContact] = useState('');
  const [inviteType, setInviteType] = useState<'E-mail' | 'WhatsApp'>('E-mail');
  const [inviteRole, setInviteRole] = useState('Gerente');
  const [inviteSuccessMessage, setInviteSuccessMessage] = useState('');

  // Logs Search & Filter
  const [logSearch, setLogSearch] = useState('');
  const [logFilterTenant, setLogFilterTenant] = useState('Todos');

  // Security Simulation States
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [totpSuccess, setTotpSuccess] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [rateLimitAttempts, setRateLimitAttempts] = useState('5');
  const [sessionTimeout, setSessionTimeout] = useState('60');

  // Active Sessions state
  const [activeSessions, setActiveSessions] = useState([
    { id: 'sess-1', device: 'Chrome no macOS (Este dispositivo)', ip: '191.185.12.98', location: 'São Paulo, BR', status: 'Ativa' },
    { id: 'sess-2', device: 'Safari no iPhone 15 Pro', ip: '177.200.45.112', location: 'Rio de Janeiro, BR', status: 'Ativa' },
    { id: 'sess-3', device: 'Firefox no Windows 11', ip: '201.89.172.5', location: 'Curitiba, BR', status: 'Ativa' }
  ]);

  // Customizable Granular CRUD Permissions state per Role
  const [granularCrud, setGranularCrud] = useState<Record<string, Record<string, { ver: boolean; criar: boolean; editar: boolean; excluir: boolean }>>>({
    'Gerente': {
      'CRM': { ver: true, criar: true, editar: true, excluir: false },
      'Financeiro': { ver: true, criar: true, editar: false, excluir: false },
      'Marketing': { ver: true, criar: true, editar: true, excluir: false },
      'IA': { ver: true, criar: false, editar: false, excluir: false }
    },
    'Marketing': {
      'CRM': { ver: false, criar: false, editar: false, excluir: false },
      'Financeiro': { ver: false, criar: false, editar: false, excluir: false },
      'Marketing': { ver: true, criar: true, editar: true, excluir: true },
      'IA': { ver: true, criar: true, editar: false, excluir: false }
    },
    'Vendedor': {
      'CRM': { ver: true, criar: true, editar: true, excluir: false },
      'Financeiro': { ver: false, criar: false, editar: false, excluir: false },
      'Marketing': { ver: false, criar: false, editar: false, excluir: false },
      'IA': { ver: true, criar: false, editar: false, excluir: false }
    },
    'Funcionário': {
      'CRM': { ver: false, criar: false, editar: false, excluir: false },
      'Financeiro': { ver: false, criar: false, editar: false, excluir: false },
      'Marketing': { ver: false, criar: false, editar: false, excluir: false },
      'IA': { ver: false, criar: false, editar: false, excluir: false }
    },
    'Sócio': {
      'CRM': { ver: true, criar: true, editar: true, excluir: true },
      'Financeiro': { ver: true, criar: true, editar: true, excluir: false },
      'Marketing': { ver: true, criar: true, editar: true, excluir: true },
      'IA': { ver: true, criar: true, editar: true, excluir: false }
    }
  });

  // Available Modules to toggle in the tenant active modules settings
  const customizableModules = [
    { id: 'crm', label: 'CRM de Clientes', desc: 'Funil de leads corporativos, relatórios e contatos de clientes.', category: 'Vendas' },
    { id: 'deals', label: 'Escritório Comercial', desc: 'Gerenciador de propostas comerciais e contratos digitais.', category: 'Comercial' },
    { id: 'finance', label: 'Controle Financeiro', desc: 'Relatório de lucros, contas a pagar, receber e fluxo de caixa.', category: 'Financeiro' },
    { id: 'kanban', label: 'Fila de Produção (Kanban)', desc: 'Organização de tarefas e entregas das equipes em colunas.', category: 'Projetos' },
    { id: 'generator', label: 'Gerador IA de Posts', desc: 'Geração inteligente de artes, copies e legendas para redes sociais.', category: 'IA & Marketing' },
    { id: 'chat', label: 'Consultores IA', desc: 'Consultores virtuais treinados com dados de vendas e automações.', category: 'IA & Marketing' },
    { id: 'design', label: 'Área de Design', desc: 'Banco de criativos e modelos de criativos prontos para anúncios.', category: 'IA & Marketing' },
    { id: 'traffic', label: 'Painel de Tráfego', desc: 'Simulador de conversão e investimento em Facebook e Google Ads.', category: 'IA & Marketing' },
    { id: 'automation', label: 'Automações Inteligentes', desc: 'Integrações de webhooks, robôs de WhatsApp e fluxos no n8n.', category: 'Automação' },
    { id: 'notif', label: 'Disparador WhatsApp', desc: 'Notificações de cobrança, lembrete de reuniões e relatórios.', category: 'Automação' },
    { id: 'store', label: 'KVB Store (Serviços adicionais)', desc: 'Catálogo de serviços extras contratados avulsos para aceleração.', category: 'Ativos' }
  ];

  // Plans Definitions list
  const plansData = {
    Starter: {
      name: 'Starter',
      price: 'R$ 299 / mês',
      users: 3,
      storage: '10 GB',
      aiTokens: '50.000',
      automations: 5,
      domains: 1,
      color: 'border-slate-200 text-slate-700 bg-slate-50',
      badge: 'bg-slate-100 text-slate-600'
    },
    Pro: {
      name: 'Pro',
      price: 'R$ 599 / mês',
      users: 10,
      storage: '100 GB',
      aiTokens: '500.000',
      automations: 20,
      domains: 3,
      color: 'border-indigo-200 text-indigo-700 bg-indigo-50/50',
      badge: 'bg-indigo-100 text-indigo-700'
    },
    Business: {
      name: 'Business',
      price: 'R$ 1.199 / mês',
      users: 30,
      storage: '500 GB',
      aiTokens: '2.000.000',
      automations: 100,
      domains: 10,
      color: 'border-amber-200 text-amber-700 bg-amber-50/50',
      badge: 'bg-amber-100 text-amber-700'
    },
    Enterprise: {
      name: 'Enterprise',
      price: 'R$ 2.499 / mês',
      users: 999, // Unlimited
      storage: 'Ilimitado',
      aiTokens: 'Ilimitado',
      automations: 999,
      domains: 999,
      color: 'border-purple-200 text-purple-700 bg-purple-50/50',
      badge: 'bg-purple-100 text-purple-700 font-extrabold'
    }
  };

  const activeTenantPlan = tenantPlans[currentTenant] || 'Starter';
  const planLimits = plansData[activeTenantPlan];

  // Static list of technical consultants (Existing team)
  const staffMembers = [
    {
      name: 'Carlos Dev',
      role: 'Desenvolvedor React Sênior',
      category: 'Site',
      icon: <Terminal size={18} className="text-indigo-600" />,
      avatarBg: 'bg-indigo-50',
      description: 'Responsável pela arquitetura de software, UI/UX pixel perfect, landing pages de alta conversão, e-commerces e otimizações de Core Web Vitals.'
    },
    {
      name: 'Beatriz Automação',
      role: 'Arquiteta de Integrações e Funis',
      category: 'Automação',
      icon: <Cpu size={18} className="text-cyan-600" />,
      avatarBg: 'bg-cyan-50',
      description: 'Especialista em fluxos complexos n8n, Make (Integromat), conexões webhook em CRMs (HubSpot, pipefy), e robôs de disparo no WhatsApp (Evolution API).'
    },
    {
      name: 'Tiago Tráfego',
      role: 'Gestor de Performance & ROI',
      category: 'Tráfego',
      icon: <Coins size={18} className="text-yellow-600" />,
      avatarBg: 'bg-yellow-50',
      description: 'Líder de tráfego pago na Meta Ads e Google Ads. Especialista em segmentação por lookalike, orçamentos inteligentes, público-alvo localizado e otimização de CPA.'
    },
    {
      name: 'Juliana Marketing',
      role: 'Copywriter & Social Media Lead',
      category: 'Marketing',
      icon: <Megaphone size={18} className="text-pink-600" />,
      avatarBg: 'bg-pink-50',
      description: 'Mentora de marketing de conteúdo, copies persuasivas para criativos de anúncios, roteiros magnéticos de Reels de retenção absurda e calendários de posts.'
    }
  ];

  // Handlers for role tab-level toggles
  const handleTogglePermission = (role: string, moduleId: string) => {
    const currentAllowed = rolePermissions[role] || [];
    let updated: string[];
    if (currentAllowed.includes(moduleId)) {
      updated = currentAllowed.filter(id => id !== moduleId);
      onAddLog(`Removeu permissão de visualização do módulo "${moduleId}" do perfil "${role}"`);
    } else {
      updated = [...currentAllowed, moduleId];
      onAddLog(`Concedeu permissão de visualização do módulo "${moduleId}" ao perfil "${role}"`);
    }
    
    onUpdatePermissions(prev => ({
      ...prev,
      [role]: updated
    }));
  };

  // Handler for modular CRUD checkboxes
  const handleToggleCrud = (role: string, moduleName: string, op: 'ver' | 'criar' | 'editar' | 'excluir') => {
    setGranularCrud(prev => {
      const currentRoleCrud = prev[role] || {};
      const currentModuleCrud = currentRoleCrud[moduleName] || { ver: false, criar: false, editar: false, excluir: false };
      
      const updatedModule = {
        ...currentModuleCrud,
        [op]: !currentModuleCrud[op]
      };

      onAddLog(`Alterou permissão granular de ${op.toUpperCase()} no módulo "${moduleName}" para o cargo "${role}"`);

      return {
        ...prev,
        [role]: {
          ...currentRoleCrud,
          [moduleName]: updatedModule
        }
      };
    });
  };

  // Handler for toggle active modules for Tenant
  const handleToggleTenantModule = (moduleId: string) => {
    const activeMods = tenantModules[currentTenant] || [];
    let updated: string[];
    if (activeMods.includes(moduleId)) {
      updated = activeMods.filter(id => id !== moduleId);
      onAddLog(`Desativou o módulo de sistema "${moduleId}" para o ambiente de dados da empresa ${currentTenant}`);
    } else {
      updated = [...activeMods, moduleId];
      onAddLog(`Ativou e liberou o módulo de sistema "${moduleId}" para a empresa ${currentTenant}`);
    }

    onUpdateTenantModules(prev => ({
      ...prev,
      [currentTenant]: updated
    }));
  };

  // Handler to toggle ALL tenant modules on/off
  const handleToggleAllTenantModules = (enable: boolean) => {
    const allIds = customizableModules.map(m => m.id);
    onAddLog(`${enable ? 'Ativou' : 'Desativou'} TODOS os módulos contratáveis para a empresa ${currentTenant}`);
    onUpdateTenantModules(prev => ({
      ...prev,
      [currentTenant]: enable ? allIds : []
    }));
  };

  // Switch Active Tenant Plan
  const handleSwitchTenantPlan = (planName: 'Starter' | 'Pro' | 'Business' | 'Enterprise') => {
    onUpdateTenantPlans(prev => ({
      ...prev,
      [currentTenant]: planName
    }));
    onAddLog(`Alterou plano contratado da empresa ${currentTenant} para o plano [${planName.toUpperCase()}]`);
  };

  // Handle Send Invite
  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteContact) return;

    const newUser = {
      id: `user-${Date.now()}`,
      name: inviteName,
      contact: inviteContact,
      type: inviteType,
      role: inviteRole,
      tenant: currentTenant,
      status: 'Pendente',
      lastAccess: 'Nunca'
    };

    setUsersList(prev => [newUser, ...prev]);
    onAddLog(`Convidou o colaborador ${inviteName} (${inviteRole}) via ${inviteType} para fazer parte da empresa ${currentTenant}`);
    
    setInviteSuccessMessage(`Convite oficial enviado com sucesso para ${inviteName}! Link de acesso temporário gerado.`);
    setInviteName('');
    setInviteContact('');
    
    setTimeout(() => {
      setInviteSuccessMessage('');
    }, 4000);
  };

  const handleDeleteUser = (id: string, name: string) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
    onAddLog(`Removeu o usuário convidado ${name} da base de colaboradores da empresa ${currentTenant}`);
  };

  // Filtered users for active tenant list view
  const tenantUsers = usersList.filter(u => currentTenant === 'KVB Group HQ' || u.tenant === currentTenant);

  // Filtered Logs
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(logSearch.toLowerCase()) || 
                          log.user.toLowerCase().includes(logSearch.toLowerCase()) ||
                          log.role.toLowerCase().includes(logSearch.toLowerCase());
    
    const matchesTenant = logFilterTenant === 'Todos' || log.company === logFilterTenant;
    
    return matchesSearch && matchesTenant;
  });

  // Handle Session Termination Simulation
  const handleTerminateSession = (sessionId: string, device: string) => {
    setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
    onAddLog(`Revogou e encerrou remotamente a sessão ativa no dispositivo: ${device}`);
  };

  // Handle TOTP setup simulation
  const handleEnableTotp = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode === '123456') {
      setTotpSuccess(true);
      setTwoFactorEnabled(true);
      setShowQrCode(false);
      onAddLog(`Ativou autenticação em duas etapas (2FA via TOTP) para os logins administrativos da empresa ${currentTenant}`);
    } else {
      alert('Código incorreto! Digite o código simulado "123456" para ativar.');
    }
  };

  // Handle manual backup generation
  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    onAddLog(`Iniciou exportação completa e geração de Backup em Nuvem criptografado AES-256 para o Tenant ${currentTenant}`);
    
    setTimeout(() => {
      setIsBackingUp(false);
      onAddLog(`Backup gerado e armazenado com sucesso no repositório privado para ${currentTenant}. Tamanho: 43.8 MB`);
      alert(`Backup criptografado da empresa ${currentTenant} gerado com sucesso! Arquivo arquivado em nuvem e pronto para download.`);
    }, 1500);
  };

  return (
    <div className="space-y-6" id="staff-tab">
      
      {/* Introduction banner with current Tenant identification */}
      <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-indigo-50 text-indigo-700 py-1 px-2.5 rounded font-bold uppercase tracking-wider mb-2 inline-block">
            SaaS Multi-Tenant & Governança Global
          </span>
          <h2 className="text-base font-black text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" size={18} />
            Central de Empresas, Usuários & Permissões
          </h2>
          <p className="text-xs text-slate-400">
            Administre de forma totalmente isolada o ambiente corporativo de <strong className="text-indigo-600 font-mono font-bold">{currentTenant}</strong>. Controle módulos habilitados, planos, perfis de cargos e relatórios de auditoria.
          </p>
        </div>
        
        <div className="flex gap-2 shrink-0 items-center bg-slate-50 border border-slate-200 rounded-xl p-2">
          <Building size={14} className="text-slate-400 shrink-0" />
          <div className="text-left leading-none">
            <span className="text-[8px] text-slate-400 font-bold block uppercase">Empresa Ativa</span>
            <span className="text-xs font-black text-slate-700 font-mono">{currentTenant}</span>
          </div>
          <span className={`ml-2 text-[9px] px-2 py-0.5 rounded-full font-black ${
            activeTenantPlan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
            activeTenantPlan === 'Business' ? 'bg-amber-100 text-amber-700' :
            activeTenantPlan === 'Pro' ? 'bg-indigo-100 text-indigo-700' :
            'bg-slate-200 text-slate-700'
          }`}>
            Plano {activeTenantPlan}
          </span>
        </div>
      </div>

      {/* Primary Sub-Tabs Horizontal Navigation Menu */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('users')}
          className={`py-2 px-4 text-xs font-black tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'users' 
              ? 'border-indigo-600 text-slate-900' 
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Sliders size={14} />
          Colaboradores & Permissões Granulares
        </button>

        <button
          onClick={() => setActiveSubTab('modules')}
          className={`py-2 px-4 text-xs font-black tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'modules' 
              ? 'border-indigo-600 text-slate-900' 
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Layers size={14} />
          Módulos Globais & Planos
        </button>

        <button
          onClick={() => setActiveSubTab('logs')}
          className={`py-2 px-4 text-xs font-black tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'logs' 
              ? 'border-indigo-600 text-slate-900' 
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <History size={14} />
          Registro de Auditoria (Audit Logs)
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`py-2 px-4 text-xs font-black tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'security' 
              ? 'border-indigo-600 text-slate-900' 
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Shield size={14} />
          Segurança Avançada & 2FA
        </button>

        <button
          onClick={() => setActiveSubTab('productivity')}
          className={`py-2 px-4 text-xs font-black tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'productivity' 
              ? 'border-indigo-600 text-slate-900' 
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <User size={14} />
          Equipe KVB HQ
        </button>
      </div>

      {/* SUBTAB 1: COLLABORATORS & GRANULAR PERMISSIONS */}
      {activeSubTab === 'users' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Invite user form (4 cols) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono text-indigo-600 flex items-center gap-1.5">
                  <UserPlus size={14} />
                  Convidar Novo Colaborador
                </h3>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Dispare um convite imediato de provisionamento para funcionários da empresa <strong className="text-slate-700">{currentTenant}</strong>.
                </p>
              </div>

              {inviteSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg flex items-center gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0" />
                  <span>{inviteSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleSendInvite} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Nome Completo</label>
                  <input 
                    type="text" 
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="Ex: Amanda Lima" 
                    required
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Canal de Contato</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInviteType('E-mail')}
                      className={`p-2 text-xs font-bold rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        inviteType === 'E-mail' 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                          : 'bg-white border-slate-200 text-slate-500'
                      }`}
                    >
                      <Mail size={13} />
                      E-mail
                    </button>
                    <button
                      type="button"
                      onClick={() => setInviteType('WhatsApp')}
                      className={`p-2 text-xs font-bold rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        inviteType === 'WhatsApp' 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                          : 'bg-white border-slate-200 text-slate-500'
                      }`}
                    >
                      <Smartphone size={13} />
                      WhatsApp
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">
                    {inviteType === 'E-mail' ? 'E-mail Corporativo' : 'Celular (WhatsApp)'}
                  </label>
                  <input 
                    type="text" 
                    value={inviteContact}
                    onChange={(e) => setInviteContact(e.target.value)}
                    placeholder={inviteType === 'E-mail' ? 'amanda@suaempresa.com' : '11 99999-0000'} 
                    required
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Cargo Principal</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Sócio">🤝 Sócio</option>
                    <option value="Gerente">💼 Gerente</option>
                    <option value="Marketing">📣 Marketing</option>
                    <option value="Vendedor">💰 Vendedor</option>
                    <option value="Funcionário">👷 Funcionário / Técnico</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <UserPlus size={14} />
                  Enviar Convite Integrado
                </button>
              </form>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 text-[10px] text-slate-500 space-y-1.5">
                <span className="font-extrabold text-indigo-600 block">🔒 Governança Corporativa:</span>
                <p className="leading-relaxed">
                  O convite gera uma chave hash de login isolada. O novo colaborador se conecta via autenticação de domínio privada sem ter qualquer acesso aos dados de outras empresas no SaaS.
                </p>
              </div>
            </div>

            {/* Right Col: Active users list & permissions customizable matrix (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Users list table */}
              <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono">Usuários no Ambiente</h3>
                    <p className="text-[11px] text-slate-400">Logins com acesso direto à empresa <strong className="text-slate-600 font-mono">{currentTenant}</strong>.</p>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 py-0.5 px-2.5 rounded-md font-bold font-mono">
                    {tenantUsers.length} Logins Ativos
                  </span>
                </div>

                {tenantUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead>
                        <tr className="border-b border-slate-100 text-[9px] text-slate-400 font-extrabold uppercase font-mono">
                          <th className="pb-2">Usuário</th>
                          <th className="pb-2">Cargo</th>
                          <th className="pb-2">Método / Contato</th>
                          <th className="pb-2">Último Acesso</th>
                          <th className="pb-2 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {tenantUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-600 uppercase">
                                  {user.name.charAt(0)}
                                </div>
                                <span className="font-bold text-slate-800">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                                user.role === 'Administrador' ? 'bg-indigo-50 text-indigo-700' :
                                user.role === 'Sócio' ? 'bg-amber-50 text-amber-700' :
                                user.role === 'Gerente' ? 'bg-cyan-50 text-cyan-700' :
                                user.role === 'Marketing' ? 'bg-pink-50 text-pink-700' :
                                user.role === 'Vendedor' ? 'bg-teal-50 text-teal-700' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-2.5 font-mono text-[10px] text-slate-500">
                              <span className="flex items-center gap-1">
                                {user.type === 'E-mail' ? <Mail size={11} className="text-slate-400" /> : <Smartphone size={11} className="text-emerald-500" />}
                                {user.contact}
                              </span>
                            </td>
                            <td className="py-2.5 text-[10px] font-medium text-slate-400">{user.lastAccess}</td>
                            <td className="py-2.5 text-right">
                              <button
                                onClick={() => handleDeleteUser(user.id, user.name)}
                                className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded transition-all cursor-pointer"
                                title="Excluir Usuário"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-400">Nenhum colaborador registrado sob esta empresa.</p>
                  </div>
                )}
              </div>

              {/* Advanced Custom Granular CRUD Matrix Controls */}
              <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-indigo-600" />
                    <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono">
                      Personalização Granular de Funções (Permissões CRUD)
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Administre o nível exato de operação de cada perfil no sistema. Marque ou desmarque permissões específicas de gravação, edição e exclusão.
                  </p>
                </div>

                <div className="border border-slate-150 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-[9px] text-slate-400 font-black uppercase font-mono">
                        <th className="p-3">Cargo</th>
                        <th className="p-3">Módulo</th>
                        <th className="p-3 text-center">Ver</th>
                        <th className="p-3 text-center">Criar/Novo</th>
                        <th className="p-3 text-center">Editar</th>
                        <th className="p-3 text-center">Excluir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {Object.keys(granularCrud).map((role) => (
                        <React.Fragment key={role}>
                          {Object.keys(granularCrud[role]).map((moduleName, mIdx) => {
                            const perms = granularCrud[role][moduleName];
                            return (
                              <tr key={moduleName} className="hover:bg-slate-50/50">
                                {mIdx === 0 && (
                                  <td className="p-3 font-black text-slate-800 bg-slate-50/40 w-28 border-r border-slate-100" rowSpan={4}>
                                    {role}
                                  </td>
                                )}
                                <td className="p-2.5 font-bold text-slate-600 text-[11px]">{moduleName}</td>
                                
                                {/* VER */}
                                <td className="p-2.5 text-center">
                                  <input 
                                    type="checkbox" 
                                    checked={perms.ver}
                                    onChange={() => handleToggleCrud(role, moduleName, 'ver')}
                                    className="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                                  />
                                </td>

                                {/* CRIAR */}
                                <td className="p-2.5 text-center">
                                  <input 
                                    type="checkbox" 
                                    checked={perms.criar}
                                    onChange={() => handleToggleCrud(role, moduleName, 'criar')}
                                    className="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                                  />
                                </td>

                                {/* EDITAR */}
                                <td className="p-2.5 text-center">
                                  <input 
                                    type="checkbox" 
                                    checked={perms.editar}
                                    onChange={() => handleToggleCrud(role, moduleName, 'editar')}
                                    className="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                                  />
                                </td>

                                {/* EXCLUIR */}
                                <td className="p-2.5 text-center">
                                  <input 
                                    type="checkbox" 
                                    checked={perms.excluir}
                                    onChange={() => handleToggleCrud(role, moduleName, 'excluir')}
                                    className="w-3.5 h-3.5 text-rose-600 border-slate-300 rounded focus:ring-rose-500 cursor-pointer"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Exclusive areas note */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-1.5 text-[10px] text-slate-500">
                  <p className="leading-relaxed">
                    🌟 <strong className="text-indigo-600">Isolamento de Sócios vs. Funcionários:</strong>
                    <br />
                    - <strong>Sócios:</strong> Têm acesso exclusivo a dados de lucro líquido, receita recorrente, folha de pagamento e metas.
                    <br />- <strong>Funcionários:</strong> Acessam apenas as suas tarefas designadas e filas operacionais, sem visibilidade estratégica financeira.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* SUBTAB 2: GLOBAL MODULES & PLANS SYSTEMS */}
      {activeSubTab === 'modules' && (
        <div className="space-y-6">
          
          {/* Plan subscription details & switcher */}
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-5">
            <div>
              <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono text-indigo-600">
                Sistema Global de Planos & Assinatura do SaaS
              </h3>
              <p className="text-xs text-slate-400">
                O plano contratado define os limites operacionais rígidos e cota de consumo de IA. Selecione um plano para simular as cotas em tempo real.
              </p>
            </div>

            {/* Plans comparison list */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {(Object.keys(plansData) as Array<keyof typeof plansData>).map((pKey) => {
                const plan = plansData[pKey];
                const isActive = activeTenantPlan === pKey;
                return (
                  <button
                    key={pKey}
                    onClick={() => handleSwitchTenantPlan(pKey)}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50/20 ring-2 ring-indigo-600/15 scale-[1.02]' 
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -top-2.5 right-4 text-[8px] bg-indigo-600 text-white font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase">
                        Plano Ativo
                      </span>
                    )}

                    <div className="space-y-1">
                      <span className={`text-[9px] font-black uppercase font-mono px-2 py-0.5 rounded ${plan.badge}`}>
                        {plan.name}
                      </span>
                      <p className="text-base font-black text-slate-800 pt-1 leading-none">{plan.price}</p>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-500 w-full">
                      <div className="flex justify-between border-b border-dashed border-slate-100 py-0.5">
                        <span>Colaboradores:</span>
                        <strong className="text-slate-800">{plan.users === 999 ? 'Ilimitado' : `${plan.users} usuários`}</strong>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-slate-100 py-0.5">
                        <span>Armazenamento:</span>
                        <strong className="text-slate-800">{plan.storage}</strong>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-slate-100 py-0.5">
                        <span>Tokens IA:</span>
                        <strong className="text-slate-800 font-mono">{plan.aiTokens}</strong>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-slate-100 py-0.5">
                        <span>Automações:</span>
                        <strong className="text-slate-800">{plan.automations === 999 ? 'Ilimitado' : `${plan.automations} ativas`}</strong>
                      </div>
                      <div className="flex justify-between py-0.5">
                        <span>Domínios Custom:</span>
                        <strong className="text-slate-800">{plan.domains === 999 ? 'Ilimitado' : plan.domains}</strong>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current plan metrics meter gauges */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-150 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 font-mono">
                  <span>USUÁRIOS CADASTRADOS</span>
                  <span>{tenantUsers.length} / {planLimits.users === 999 ? '∞' : planLimits.users}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(100, (tenantUsers.length / planLimits.users) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 font-mono">
                  <span>ESPAÇO DE ARMAZENAMENTO</span>
                  <span>{planLimits.storage === 'Ilimitado' ? '1.2 GB / ∞' : '1.2 GB / ' + planLimits.storage}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: planLimits.storage === 'Ilimitado' ? '5%' : `${Math.min(100, (1.2 / parseFloat(planLimits.storage)) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 font-mono">
                  <span>TOKENS DE COGNICAO IA</span>
                  <span>{planLimits.aiTokens === 'Ilimitado' ? '4.8k / ∞' : '4.8k / ' + planLimits.aiTokens}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: planLimits.aiTokens === 'Ilimitado' ? '1%' : `${Math.min(100, (4.8 / (parseFloat(planLimits.aiTokens.replace(/\./g, '')) / 1000)) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 font-mono">
                  <span>LINHAS DE AUTOMAÇÃO</span>
                  <span>3 / {planLimits.automations === 999 ? '∞' : planLimits.automations}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: planLimits.automations === 999 ? '1%' : `${Math.min(100, (3 / planLimits.automations) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

          </div>

          {/* Module custom toggles - Enable/Disable modules per Tenant */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono text-indigo-600 flex items-center gap-1.5">
                  <Database size={15} />
                  Módulos de Sistema Contratados (Customização Multi-Tenant)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Desmarque os módulos que deseja ocultar para simplificar a navegação e o menu lateral de seus colaboradores.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleAllTenantModules(true)}
                  className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-[10px] transition-all cursor-pointer"
                >
                  Ativar Todos
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleAllTenantModules(false)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px] transition-all cursor-pointer"
                >
                  Ocultar Todos
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {customizableModules.map((mod) => {
                const isActive = (tenantModules[currentTenant] || []).includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => handleToggleTenantModule(mod.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isActive 
                        ? 'bg-indigo-50/30 border-indigo-200 hover:bg-indigo-50/50' 
                        : 'bg-white border-slate-200 hover:border-slate-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isActive}
                      onChange={() => {}} // Swallowed, handled by parent div click
                      className="mt-1 w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 pointer-events-none"
                    />

                    <div className="space-y-0.5 text-left leading-tight">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black text-slate-800">{mod.label}</span>
                        <span className="text-[8px] bg-slate-100 text-slate-500 px-1 py-0.2 rounded uppercase font-mono font-bold scale-90">
                          {mod.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal">{mod.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-[10px] text-amber-800 leading-relaxed">
              ⚠️ <strong className="text-amber-950 font-black">Nota de Ativação Instantânea:</strong> Ativar ou desativar os módulos acima altera de forma dinâmica o menu lateral esquerdo de navegação em tempo real para os colaboradores da empresa {currentTenant} de acordo com as regras de conformidade corporativa e sem conflitos de cache.
            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 3: AUDIT LOGS */}
      {activeSubTab === 'logs' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono text-indigo-600">Registro de Logs Auditáveis</h3>
              <p className="text-xs text-slate-400">Rastreabilidade completa de todas as alterações feitas no ERP, atendendo a rígidos critérios de conformidade.</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input 
                  type="text"
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  placeholder="Pesquisar ação ou usuário..."
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs w-full sm:w-48 text-slate-700 bg-slate-50 focus:outline-none focus:bg-white"
                />
              </div>

              <select
                value={logFilterTenant}
                onChange={(e) => setLogFilterTenant(e.target.value)}
                className="p-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white cursor-pointer"
              >
                <option value="Todos">Todas as Empresas</option>
                <option value="KVB Group HQ">KVB Group HQ</option>
                <option value="Restaurante do João">Restaurante do João</option>
                <option value="Clínica OdontoSilva">Clínica OdontoSilva</option>
                <option value="Academia FitLife">Academia FitLife</option>
              </select>
            </div>
          </div>

          {/* Audit Logs List */}
          {filteredLogs.length > 0 ? (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="p-3 border border-slate-150 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                    
                    <div className="space-y-1">
                      <p className="text-slate-800 font-semibold">{log.action}</p>
                      
                      <div className="flex flex-wrap gap-1.5 items-center text-[10px] text-slate-400">
                        <span className="font-bold text-slate-600">{log.user}</span>
                        <span className="text-slate-300">|</span>
                        <span className="bg-slate-100 px-1.5 py-0.2 rounded font-black text-slate-500 scale-90">{log.role}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-indigo-600 font-bold bg-indigo-50 px-1 py-0.2 rounded scale-90 flex items-center gap-0.5">
                          <Building size={9} />
                          {log.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 font-bold sm:text-right shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-400">Nenhum log correspondente aos filtros foi encontrado.</p>
            </div>
          )}

        </div>
      )}

      {/* SUBTAB 4: SECURITY CONTROLS */}
      {activeSubTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 2FA Setup & Encryption Settings (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-5">
            <div>
              <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono text-indigo-600 flex items-center gap-1.5">
                <Shield size={16} />
                Políticas de Segurança do Multi-Tenant
              </h3>
              <p className="text-xs text-slate-400">
                Configure os parâmetros de proteção de dados, 2FA e chaves criptográficas ativas.
              </p>
            </div>

            {/* 2FA Card toggler */}
            <div className="p-4 border border-slate-150 rounded-xl bg-slate-50/50 space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-800 block">Autenticação em Duas Etapas (2FA)</span>
                  <p className="text-[10px] text-slate-400">Exige um token temporário do aplicativo autenticador no login corporativo.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (twoFactorEnabled) {
                      setTwoFactorEnabled(false);
                      onAddLog(`Desativou autenticação em duas etapas para a empresa ${currentTenant}`);
                    } else {
                      setShowQrCode(true);
                    }
                  }}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    twoFactorEnabled 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {twoFactorEnabled ? 'Ativado ✓' : 'Ativar 2FA'}
                </button>
              </div>

              {showQrCode && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center gap-4 animate-fadeIn">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <QrCode size={100} className="text-slate-800" />
                  </div>
                  <form onSubmit={handleEnableTotp} className="space-y-2.5 flex-1">
                    <p className="text-[11px] text-slate-500 leading-tight font-semibold">
                      Escaneie o QR Code com o Google Authenticator ou Authy, e digite o código de 6 dígitos gerado:
                    </p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value)}
                        placeholder="Código: digite 123456" 
                        className="p-1.5 border border-slate-200 rounded-lg text-xs w-full text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                      />
                      <button
                        type="submit"
                        className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs cursor-pointer"
                      >
                        Confirmar
                      </button>
                    </div>
                    <span className="text-[9px] text-slate-400 italic block">Simule digitando o código "123456"</span>
                  </form>
                </div>
              )}
            </div>

            {/* Backups & Cloud Encryption Controls */}
            <div className="p-4 border border-slate-150 rounded-xl space-y-3">
              <span className="text-[11px] font-bold text-slate-800 block">Exportação & Backups Criptografados</span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Nossos bancos de dados operam sob isolamento lógico estrito. Você pode exportar ou restaurar o backup de tabelas de forma independente a qualquer momento.
              </p>
              
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleTriggerBackup}
                  disabled={isBackingUp}
                  className="py-2 px-4 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-xs disabled:opacity-50"
                >
                  <RefreshCw size={13} className={isBackingUp ? 'animate-spin' : ''} />
                  {isBackingUp ? 'Criando Backup...' : 'Gerar Backup Manual'}
                </button>
              </div>
            </div>

            {/* Rate Limiting & Protection Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-150 space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Tentativas de Login até Bloqueio</label>
                <select
                  value={rateLimitAttempts}
                  onChange={(e) => {
                    setRateLimitAttempts(e.target.value);
                    onAddLog(`Alterou limite de tentativas de autenticação erradas até bloqueio para: ${e.target.value} tentativas`);
                  }}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="3">3 tentativas (Máxima segurança)</option>
                  <option value="5">5 tentativas (Padrão)</option>
                  <option value="10">10 tentativas (Suave)</option>
                </select>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-150 space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider font-mono">Tempo de Expiração de Sessão (Inativa)</label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => {
                    setSessionTimeout(e.target.value);
                    onAddLog(`Definiu tempo limite de expiração de sessão inativa para: ${e.target.value} minutos`);
                  }}
                  className="w-full text-xs p-2 border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="15">15 minutos (Recomendado)</option>
                  <option value="60">1 hora (Padrão)</option>
                  <option value="240">4 horas (Amplo)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Connected Active Sessions list (5 cols) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <div>
              <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono text-indigo-600 flex items-center gap-1.5">
                <Key size={15} />
                Dispositivos Conectados (Sessões Ativas)
              </h3>
              <p className="text-xs text-slate-400">
                Monitore logins em tempo real sob seu Tenant e encerre conexões remotamente em caso de suspeitas.
              </p>
            </div>

            {activeSessions.length > 0 ? (
              <div className="space-y-3 pt-2">
                {activeSessions.map((sess) => (
                  <div key={sess.id} className="p-3 border border-slate-150 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800">{sess.device}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{sess.ip} • {sess.location}</p>
                      </div>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-black font-mono">
                        {sess.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTerminateSession(sess.id, sess.device)}
                      className="py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-black rounded-lg transition-all w-full text-center cursor-pointer"
                    >
                      Encerrar Sessão Remotamente
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-400">Nenhuma sessão ativa encontrada.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* SUBTAB 5: STAFF PRODUCTIVITY */}
      {activeSubTab === 'productivity' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {staffMembers.map((member) => {
            const memberTasks = tasks.filter(t => t.assignedTo === member.name);
            const tasksDone = memberTasks.filter(t => t.status === 'Concluído').length;
            const tasksPending = memberTasks.filter(t => t.status !== 'Concluído').length;
            const totalTasksCount = memberTasks.length;

            const completionRate = totalTasksCount > 0 ? ((tasksDone / totalTasksCount) * 100).toFixed(0) : "100";

            return (
              <div key={member.name} className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs flex flex-col justify-between space-y-4">
                
                {/* Header profile */}
                <div className="flex items-start gap-3.5 border-b border-slate-100 pb-3">
                  <div className={`p-3 rounded-xl shrink-0 ${member.avatarBg}`}>
                    {member.icon}
                  </div>
                  
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{member.role}</p>
                  </div>
                </div>

                {/* Bio summary description */}
                <p className="text-xs text-slate-500 leading-relaxed">
                  {member.description}
                </p>

                {/* Statistics Counters Grid */}
                <div className="grid grid-cols-3 gap-2.5 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                  
                  {/* Total Done */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Entregas Feitas</span>
                    <div className="text-sm font-extrabold text-emerald-600 flex items-center justify-center gap-1 font-mono">
                      <CheckCircle size={13} />
                      {tasksDone}
                    </div>
                  </div>

                  {/* Backlog */}
                  <div className="space-y-0.5 border-x border-slate-200">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Fila Pendente</span>
                    <div className="text-sm font-extrabold text-amber-500 flex items-center justify-center gap-1 font-mono">
                      <Clock size={13} />
                      {tasksPending}
                    </div>
                  </div>

                  {/* Ratio performance */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Eficiência</span>
                    <div className="text-sm font-extrabold text-indigo-600 flex items-center justify-center gap-0.5 font-mono">
                      <Award size={13} />
                      {completionRate}%
                    </div>
                  </div>

                </div>

                {/* Active assigned duties lists header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    <ListTodo size={11} className="text-indigo-600" />
                    Filas de Trabalho Atribuídas ({memberTasks.length})
                  </div>
                  
                  {memberTasks.length > 0 ? (
                    <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                      {memberTasks.map((t) => (
                        <div key={t.id} className="p-2 border border-slate-100 rounded bg-slate-50/50 flex justify-between items-center text-[11px]">
                          <span className="text-slate-700 font-semibold truncate max-w-[160px]" title={t.title}>
                            {t.title}
                          </span>
                          
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            t.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' :
                            t.status === 'Em desenvolvimento' ? 'bg-amber-50 text-amber-600' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 bg-slate-50 rounded text-[10px] text-slate-400 font-medium">
                       Nenhuma tarefa pendente delegada a {member.name.split(' ')[0]}.
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
