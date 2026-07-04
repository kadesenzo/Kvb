import React, { useState, useEffect } from 'react';
import { 
  Client, 
  Contract, 
  Meeting, 
  Task, 
  FinanceState, 
  KvbServices, 
  Project, 
  Ticket 
} from './types';

// Subcomponents
import DashboardView from './components/DashboardView';
import CrmView from './components/CrmView';
import AiGeneratorView from './components/AiGeneratorView';
import LibraryView from './components/LibraryView';
import AiChatView from './components/AiChatView';
import FinanceView from './components/FinanceView';
import DealsView from './components/DealsView';
import KanbanView from './components/KanbanView';
import ClientPortalView from './components/ClientPortalView';
import KvbAdminView from './components/KvbAdminView';
import NotificationView from './components/NotificationView';

// Added Subcomponents for premium KVB Enterprise modules
import UniversityView from './components/UniversityView';
import SignaturesView from './components/SignaturesView';
import InternalChatView from './components/InternalChatView';
import DesignView from './components/DesignView';
import TrafficView from './components/TrafficView';
import AutomationView from './components/AutomationView';
import StoreView from './components/StoreView';
import FranchiseView from './components/FranchiseView';
import AprenderView from './components/AprenderView';
import IntelligenceView from './components/IntelligenceView';
import PublicWebsiteView from './components/PublicWebsiteView';
import BackupView from './components/BackupView';

// Standard layout assets
import { 
  BarChart3, 
  Users, 
  Sparkles, 
  FolderLock, 
  Bot, 
  DollarSign, 
  Briefcase, 
  ListTodo, 
  ShieldCheck, 
  Laptop, 
  MessageSquare, 
  Menu, 
  X,
  Compass,
  GraduationCap,
  Key,
  Palette,
  TrendingUp,
  Cpu,
  Database,
  ShoppingBag,
  Network,
  BookOpen,
  HelpCircle,
  Play,
  Lock,
  Unlock,
  LogOut
} from 'lucide-react';

export default function App() {
  // All states
  const [viewMode, setViewMode] = useState<'website' | 'app'>('website');
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<KvbServices>({
    site: 158,
    automation: 279,
    marketing: 200,
    specialComboFirstMonth: 399,
    specialComboMonthly: 229
  });
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [finance, setFinance] = useState<FinanceState>({
    monthlyGoal: 5000,
    entries: [],
    exits: [],
    commissions: [],
    unpaid: []
  });

  const [activeTab, setActiveTab] = useState<string>('intelligence');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- Multi-Tenant and User Permissions simulation states ---
  const [currentTenant, setCurrentTenant] = useState<string>('KVB');
  const [currentUserRole, setCurrentUserRole] = useState<string>('Administrador');
  const [currentDomain, setCurrentDomain] = useState<string>('app.kvbsystem.com.br');
  const [currentLoggedUser, setCurrentLoggedUser] = useState<string>('Carlos Dev');

  const [companies, setCompanies] = useState([
    { id: 'tenant-4', name: 'KVB', tradeName: 'KVB', legalName: 'KVB Negócios Digitais e Software LTDA', cnpj: '10.222.333/0001-00', niche: 'Empresas de tecnologia', email: 'contato@kvbsystem.com.br', whatsapp: '(11) 90000-0000', phone: '(11) 4004-0000', address: 'Faria Lima, 3500', city: 'São Paulo', state: 'SP', cep: '04538-133', website: 'www.kvbsystem.com.br', socialMedia: '@kvb.system', plan: 'Enterprise', createdAt: '01/01/2026', status: 'Ativo' },
    { id: 'tenant-1', name: 'Restaurante do João', tradeName: 'Restaurante do João', legalName: 'João Alimentação LTDA', cnpj: '20.111.222/0001-33', niche: 'Alimentação / Restaurantes', email: 'joao@restaurantejoao.com', whatsapp: '(11) 98888-8888', phone: '(11) 3333-4444', address: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP', cep: '01311-100', website: 'www.saboresdojoao.com.br', socialMedia: '@saboresdojoao', plan: 'Business', createdAt: '15/03/2026', status: 'Ativo' },
    { id: 'tenant-2', name: 'Clínica OdontoSilva', tradeName: 'OdontoSilva', legalName: 'Odonto Silva Serviços Médicos S/S', cnpj: '30.444.555/0001-44', niche: 'Saúde & Estética', email: 'contato@odontosilva.com.br', whatsapp: '(21) 97777-7777', phone: '(21) 2222-3333', address: 'Rua das Flores, 500', city: 'Rio de Janeiro', state: 'RJ', cep: '22000-000', website: 'www.odontosilva.com.br', socialMedia: '@odontosilva', plan: 'Pro', createdAt: '10/04/2026', status: 'Ativo' },
    { id: 'tenant-3', name: 'Academia FitLife', tradeName: 'FitLife', legalName: 'FitLife Fitness Center LTDA', cnpj: '40.666.777/0001-55', niche: 'Fitness & Bem-Estar', email: 'contato@fitlife.com.br', whatsapp: '(31) 96666-6666', phone: '(31) 5555-6666', address: 'Av. do Contorno, 8000', city: 'Belo Horizonte', state: 'MG', cep: '30110-010', website: 'www.fitlife.com.br', socialMedia: '@fitlife.academia', plan: 'Starter', createdAt: '05/05/2026', status: 'Ativo' }
  ]);

  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Carlos Dev', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', role: 'Administrador', department: 'Tecnologia', email: 'admin@kvb.com', phone: '(11) 91111-2222', login: 'carlos.dev', password: 'enZo1234', lastAccess: 'Hoje às 18:22', status: 'Ativo', companyId: 'tenant-4' },
    { id: 'usr-2', name: 'João Admin', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', role: 'Administrador', department: 'Gestão', email: 'joao@saboresdojoao.com', phone: '(11) 98888-8888', login: 'joao.admin', password: 'joaoPassword123', lastAccess: 'Nunca', status: 'Ativo', companyId: 'tenant-1' },
    { id: 'usr-3', name: 'Dra. Ana Silva', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', role: 'Administrador', department: 'Clínica', email: 'ana@odontosilva.com.br', phone: '(21) 97777-7777', login: 'ana.silva', password: 'anaPassword123', lastAccess: 'Nunca', status: 'Ativo', companyId: 'tenant-2' },
    { id: 'usr-4', name: 'Rodrigo Fit', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', role: 'Administrador', department: 'Treino', email: 'contato@fitlife.com.br', phone: '(31) 96666-6666', login: 'rodrigo.fit', password: 'rodrigoPassword123', lastAccess: 'Nunca', status: 'Ativo', companyId: 'tenant-3' }
  ]);

  const [tenantModules, setTenantModules] = useState<Record<string, string[]>>({
    'KVB': ['intelligence', 'dashboard', 'crm', 'deals', 'finance', 'kanban', 'staff', 'franchise', 'internal-chat', 'portal', 'generator', 'chat', 'design', 'traffic', 'automation', 'notif', 'university', 'aprender', 'store', 'signatures', 'library'],
    'Restaurante do João': ['dashboard', 'crm', 'deals', 'finance', 'kanban', 'staff', 'internal-chat', 'portal', 'generator', 'chat', 'design', 'traffic', 'automation', 'notif', 'university', 'aprender', 'store', 'signatures', 'library'],
    'Clínica OdontoSilva': ['dashboard', 'crm', 'deals', 'finance', 'kanban', 'staff', 'internal-chat', 'portal', 'generator', 'chat', 'design', 'traffic', 'automation', 'notif', 'university', 'aprender', 'store', 'signatures', 'library'],
    'Academia FitLife': ['dashboard', 'crm', 'deals', 'finance', 'kanban', 'staff', 'internal-chat', 'portal', 'generator', 'chat', 'design', 'traffic', 'automation', 'notif', 'university', 'aprender', 'store', 'signatures', 'library']
  });

  const [tenantPlans, setTenantPlans] = useState<Record<string, 'Starter' | 'Pro' | 'Business' | 'Enterprise'>>({
    'KVB': 'Enterprise',
    'Restaurante do João': 'Business',
    'Clínica OdontoSilva': 'Pro',
    'Academia FitLife': 'Starter'
  });

  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({
    Administrador: ['intelligence', 'dashboard', 'crm', 'deals', 'finance', 'kanban', 'staff', 'franchise', 'internal-chat', 'portal', 'generator', 'chat', 'design', 'traffic', 'automation', 'notif', 'university', 'aprender', 'store', 'signatures', 'library', 'backup'],
    Sócio: ['dashboard', 'crm', 'deals', 'finance', 'kanban', 'staff', 'internal-chat', 'portal', 'generator', 'chat', 'design', 'traffic', 'automation', 'notif', 'university', 'aprender', 'store', 'library', 'backup'],
    Gerente: ['crm', 'deals', 'kanban', 'internal-chat', 'portal', 'generator', 'chat', 'design', 'traffic', 'automation', 'notif', 'university', 'aprender', 'store', 'library', 'backup'],
    Funcionário: ['kanban', 'internal-chat', 'portal', 'university', 'aprender', 'store', 'library'],
    Marketing: ['generator', 'chat', 'design', 'traffic', 'automation', 'notif', 'internal-chat', 'portal', 'university', 'aprender', 'store', 'library'],
    Vendedor: ['crm', 'deals', 'internal-chat', 'portal', 'university', 'aprender', 'store', 'library']
  });

  interface ActivityLog {
    id: string;
    user: string;
    role: string;
    company: string;
    action: string;
    timestamp: string;
  }

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: '1', user: 'Carlos Dev', role: 'Administrador', company: 'KVB', action: 'Iniciou varredura autônoma KVB Intelligence para conformidade corporativa', timestamp: '30/06/2026 18:30' },
    { id: '2', user: 'Carlos Dev', role: 'Administrador', company: 'KVB', action: 'Ativou o ecossistema multi-tenant com 2FA de segurança militar', timestamp: '30/06/2026 18:15' }
  ]);

  const addLog = (actionText: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      user: currentTenant === 'KVB' ? 'Carlos Dev' : 'João Admin',
      role: currentUserRole,
      company: currentTenant,
      action: actionText,
      timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const canAccessTab = (tabId: string, role: string, tenant: string) => {
    // If tenant is not KVB, they cannot access internal KVB exclusive areas (e.g. KVB Intelligence, Franchise Mode)
    const isKvbExclusive = ['intelligence', 'franchise'].includes(tabId);
    if (tenant !== 'KVB' && isKvbExclusive) {
      return false;
    }

    // Check if the tenant has this module active
    if (tenant !== 'KVB') {
      const activeModules = tenantModules[tenant] || [];
      // Some tabs are core and always active for management/operations
      const coreTabs = ['staff', 'dashboard', 'portal', 'university', 'aprender', 'backup'];
      if (!coreTabs.includes(tabId) && !activeModules.includes(tabId)) {
        return false;
      }
    }
    
    // Admins always have access
    if (role === 'Administrador') {
      return true;
    }

    const allowed = rolePermissions[role] || [];
    return allowed.includes(tabId);
  };

  // Sync with Express fullstack backend initially
  const fetchAllData = async () => {
    try {
      const res = await fetch('/api/all-data');
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
        setServices(data.services || services);
        setMeetings(data.meetings || []);
        setContracts(data.contracts || []);
        setTasks(data.tasks || []);
        setTickets(data.tickets || []);
        setProjects(data.projects || []);
        setFinance(data.finance || finance);
      }
    } catch (err) {
      console.error("Could not sync with backend database onport 3000:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleExportData = () => {
    return {
      currentTenant,
      currentUserRole,
      currentLoggedUser,
      clients,
      services,
      meetings,
      contracts,
      tasks,
      tickets,
      projects,
      finance,
      activityLogs,
      companies,
      users
    };
  };

  const handleRestoreData = (backupData: any) => {
    if (backupData.clients) setClients(backupData.clients);
    if (backupData.services) setServices(backupData.services);
    if (backupData.meetings) setMeetings(backupData.meetings);
    if (backupData.contracts) setContracts(backupData.contracts);
    if (backupData.tasks) setTasks(backupData.tasks);
    if (backupData.tickets) setTickets(backupData.tickets);
    if (backupData.projects) setProjects(backupData.projects);
    if (backupData.finance) setFinance(backupData.finance);
    if (backupData.activityLogs) setActivityLogs(backupData.activityLogs);
    if (backupData.companies) setCompanies(backupData.companies);
    if (backupData.users) setUsers(backupData.users);
    
    addLog(`Restaurou banco de dados completo via Backup Seguro.`);
  };

  // --- RECTIVE HANDLERS SYNCING DIRECTLY ON CONTROLLERS ENDPOINTS ---

  // CLIENTS ACTIONS
  const handleAddClient = async (clientData: any) => {
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });
      if (res.ok) {
        addLog(`Criou o cliente ${clientData.name} (${clientData.company}) no CRM`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClient = async (id: string, updatedData: any) => {
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        addLog(`Atualizou dados do cliente: ${updatedData.name}`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      addLog(`Excluiu cliente com ID ${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // SERVICE PRICE ACTIONS
  const handleSaveServices = async (updatedServices: KvbServices) => {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedServices)
      });
      if (res.ok) {
        addLog(`Alterou a precificação base de serviços na KVB Store`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // MEETINGS/DEALS FUNNEL ACTIONS
  const handleAddMeeting = async (meetingData: any) => {
    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingData)
      });
      if (res.ok) {
        addLog(`Agendou reunião/oportunidade com ${meetingData.clientName} (${meetingData.company})`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMeetingStage = async (id: string, stage: string, closedValue?: number) => {
    try {
      const res = await fetch(`/api/meetings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage, closedValue })
      });
      if (res.ok) {
        addLog(`Atualizou estágio de oportunidade no funil para: ${stage}`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CONTRACTS ACTIONS
  const handleAddContract = async (contractData: any) => {
    try {
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractData)
      });
      if (res.ok) {
        addLog(`Cadastrou novo contrato para o cliente ${contractData.clientName} no valor de R$ ${contractData.value}`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContract = async (id: string) => {
    try {
      await fetch(`/api/contracts/${id}`, { method: 'DELETE' });
      addLog(`Removeu contrato ID ${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // KANBAN TASKS ACTIONS
  const handleAddTask = async (taskData: any) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (res.ok) {
        addLog(`Criou nova tarefa "${taskData.title}" delegada para ${taskData.assignedTo}`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTask = async (id: string, updatedData: any) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // FINANCE ACTIONS
  const handleAddEntry = async (entry: any) => {
    try {
      const res = await fetch('/api/finance/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddExit = async (exit: any) => {
    try {
      const res = await fetch('/api/finance/exit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exit)
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCommission = async (comm: any) => {
    try {
      const res = await fetch('/api/finance/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comm)
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateGoal = async (goal: number) => {
    try {
      const res = await fetch('/api/finance/goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal })
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // CLIENT PORTAL TICKETS
  const handleAddTicket = async (ticketData: any) => {
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTicketStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // AI BRIEFING PROJECTS LIBRARY
  const handleSaveToLibrary = async (projectData: any) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // Grouped Navigation Sections according to KVB Ecosystem Architecture
  const navigationSections = [
    {
      title: "KVB ADMIN (Interno)",
      items: [
        { id: 'intelligence', label: 'KVB Intelligence', icon: <Compass size={15} />, isAi: true },
        { id: 'dashboard', label: 'Painel Geral', icon: <BarChart3 size={15} /> },
        { id: 'crm', label: 'CRM de Clientes', icon: <Users size={15} /> },
        { id: 'deals', label: 'Escritório Comercial', icon: <Briefcase size={15} /> },
        { id: 'finance', label: 'Controle Financeiro', icon: <DollarSign size={15} /> },
        { id: 'kanban', label: 'Fila de Produção', icon: <ListTodo size={15} /> },
        { id: 'staff', label: 'KVB Admin (Central)', icon: <ShieldCheck size={15} /> },
        { id: 'franchise', label: 'Modo Franquia', icon: <Network size={15} /> },
        { id: 'internal-chat', label: 'Chat Interno', icon: <MessageSquare size={15} /> },
      ]
    },
    {
      title: "KVB CLIENTES (Externo)",
      items: [
        { id: 'portal', label: 'Área do Cliente (Simulador)', icon: <Laptop size={15} /> },
        { id: 'backup', label: 'Cofre de Backups 🛡️', icon: <Database size={15} /> },
        { id: 'generator', label: 'Gerador IA', icon: <Sparkles size={15} />, isAi: true },
        { id: 'chat', label: 'Consultores IA', icon: <Bot size={15} />, isAi: true },
        { id: 'design', label: 'Área de Design', icon: <Palette size={15} /> },
        { id: 'traffic', label: 'Painel de Tráfego', icon: <TrendingUp size={15} /> },
        { id: 'automation', label: 'Automações', icon: <Cpu size={15} />, isAi: true },
        { id: 'notif', label: 'Disparador WhatsApp', icon: <MessageSquare size={15} /> },
      ]
    },
    {
      title: "EDUCAÇÃO & ATIVOS",
      items: [
        { id: 'university', label: 'KVB University', icon: <GraduationCap size={15} /> },
        { id: 'aprender', label: 'Aprender', icon: <BookOpen size={15} /> },
        { id: 'store', label: 'KVB Store', icon: <ShoppingBag size={15} /> },
        { id: 'signatures', label: 'Assinaturas & Club', icon: <Key size={15} /> },
        { id: 'library', label: 'Biblioteca KVB', icon: <FolderLock size={15} /> },
      ]
    }
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Sincronizando Banco de Dados KVB System...</p>
      </div>
    );
  }

  if (viewMode === 'website') {
    return (
      <PublicWebsiteView 
        users={users}
        companies={companies}
        onLoginSuccess={(tenant, role, userName) => {
          setCurrentTenant(tenant);
          setCurrentUserRole(role);
          setCurrentLoggedUser(userName);
          setViewMode('app');
          // Set active tab default based on company type
          if (tenant !== 'KVB') {
            setActiveTab('portal');
          } else {
            setActiveTab('intelligence');
          }
          addLog(`Usuário ${userName} realizou login com sucesso no Tenant ${tenant} como ${role}`);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen grid-bg flex flex-col md:flex-row relative">
      
      {/* Mobile Top Header */}
      <header className="md:hidden bg-white border-b border-slate-200 text-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-sm">K</div>
          <span className="text-xs font-bold text-slate-800 font-sans tracking-wide">KVB System ERP</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 hover:bg-slate-100 text-slate-700 rounded transition-colors cursor-pointer"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Side Navigation Rail */}
      <aside 
        className={`bg-white border-r border-slate-200 text-slate-600 w-64 p-5 flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen z-35 transition-transform duration-300 fixed md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0 inset-y-0 left-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-4">
          {/* Logo Brand Header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-sans font-bold">
              K
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-slate-800 tracking-tight">KVB</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ERP + CRM Agency</p>
            </div>
          </div>

          {/* Tenant Selector & Role Impersonator Block */}
          {currentTenant === 'KVB' ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5 shadow-xs">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider font-mono block mb-1">Empresa Ativa (Tenant)</label>
                <select 
                  value={currentTenant}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCurrentTenant(val);
                    addLog(`Alternou ambiente de dados para o Tenant: ${val}`);
                    if (val === 'Restaurante do João') {
                      setCurrentDomain('saboresdojoao.kvb.com');
                    } else if (val === 'Clínica OdontoSilva') {
                      setCurrentDomain('odontosilva.kvb.com');
                    } else if (val === 'Academia FitLife') {
                      setCurrentDomain('fitlife.kvb.com');
                    } else {
                      setCurrentDomain('app.kvbsystem.com.br');
                    }
                  }}
                  className="w-full text-[10px] p-2 bg-white border border-slate-200 rounded-lg font-extrabold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="KVB">🏢 KVB (Admin)</option>
                  <option value="Restaurante do João">🍔 Restaurante do João</option>
                  <option value="Clínica OdontoSilva">🦷 Clínica OdontoSilva</option>
                  <option value="Academia FitLife">🏋️ Academia FitLife</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider font-mono block mb-1">Simular Perfil / Permissão</label>
                <select 
                  value={currentUserRole}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCurrentUserRole(val);
                    addLog(`Alternou perfil de usuário logado para: ${val}`);
                  }}
                  className="w-full text-[10px] p-2 bg-white border border-slate-200 rounded-lg font-extrabold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="Administrador">👑 Administrador (Acesso Total)</option>
                  <option value="Sócio">🤝 Sócio (Negócios & Financ.)</option>
                  <option value="Gerente">💼 Gerente (Operação/CRM)</option>
                  <option value="Marketing">📣 Marketing (Ativos/Post)</option>
                  <option value="Vendedor">💰 Vendedor (Leads/Deal)</option>
                  <option value="Funcionário">👷 Funcionário (Tarefas/Portal)</option>
                </select>
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 border-t border-slate-200 pt-1.5">
                <span className="truncate max-w-[120px]" title={currentDomain}>{currentDomain}</span>
                <span className="bg-indigo-50 text-indigo-600 px-1 py-0.5 rounded font-black scale-90">MULTI-TENANT</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 text-white rounded-xl p-3.5 space-y-2 border border-slate-800 shadow-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[9px] font-black uppercase tracking-wider font-mono text-slate-400">Sessão Criptografada</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-black tracking-tight">{currentTenant}</p>
                <p className="text-[9px] text-indigo-300 font-bold">{currentUserRole} • {currentLoggedUser}</p>
              </div>
              <div className="text-[8px] font-mono text-slate-400 border-t border-slate-800 pt-1.5 flex justify-between">
                <span className="truncate max-w-[150px]">Host: {currentTenant === 'Restaurante do João' ? 'saboresdojoao.kvb.com' : currentTenant === 'Clínica OdontoSilva' ? 'odontosilva.kvb.com' : 'fitlife.kvb.com'}</span>
                <span className="text-[7px] text-emerald-400 font-bold font-mono">LGPD</span>
              </div>
            </div>
          )}

          {/* Secure Logout / Return Button */}
          <button
            onClick={() => {
              setViewMode('website');
              addLog(`Usuário realizou logout seguro do sistema.`);
            }}
            className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold rounded-xl text-[10px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs"
            id="btn-logout"
          >
            <LogOut size={12} />
            Sair e Bloquear Painel
          </button>

          {/* Navigation Menu Links */}
          <nav className="space-y-4 max-h-[calc(100vh-365px)] overflow-y-auto pr-1">
            {navigationSections.map((section) => {
              const visibleItems = section.items.filter((item) => {
                // Check if this module is enabled for the tenant
                const isTenantModuleActive = currentTenant === 'KVB Group HQ' || (tenantModules[currentTenant] || []).includes(item.id);
                
                // Keep core management items always visible for setup/operational support
                const coreTabs = ['staff', 'dashboard', 'portal', 'university', 'aprender'];
                if (coreTabs.includes(item.id)) {
                  return canAccessTab(item.id, currentUserRole, currentTenant);
                }

                if (!isTenantModuleActive) return false;

                // Also check if user has permission
                return canAccessTab(item.id, currentUserRole, currentTenant);
              });

              if (visibleItems.length === 0) return null;

              return (
                <div key={section.title} className="space-y-1">
                  <span className="text-[9px] font-black tracking-wider text-slate-400 font-mono block px-2 uppercase mb-1">
                    {section.title}
                  </span>
                  {visibleItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const isAiFeature = item.isAi;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsSidebarOpen(false); // Close sidebar on click inside mobile
                        }}
                        className={`w-full p-2 rounded-lg text-[11px] font-bold flex items-center gap-2 justify-start cursor-pointer transition-all ${
                          isActive 
                            ? 'bg-slate-100 text-slate-900 font-extrabold md:translate-x-1 duration-150' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                        {isAiFeature && (
                          <span className="ml-auto ai-badge scale-90">IA</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Legal Regulatory Compliance Disclaimer footer */}
        <div className="border-t border-slate-100 pt-4 space-y-1">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">CONFORMIDADE DIGITAL</p>
          <p className="text-[10px] text-slate-500 leading-tight">Chaves de Criptografia Ativas.</p>
          <span className="text-[10px] text-slate-600 font-bold flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            Online (Porta 3000)
          </span>
        </div>
      </aside>

      {/* Main Sandbox Iframe View Content wrapper */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-(screen-xl) mx-auto w-full">
        
        {/* Dynamic renders conditional active tabs with Permission Gate */}
        {!canAccessTab(activeTab, currentUserRole, currentTenant) ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-2xl mx-auto shadow-xs space-y-6 text-center mt-8" id="restricted-view">
            <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600 shadow-xs">
              <Lock size={28} className="animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[9px] font-black tracking-widest text-rose-600 font-mono uppercase bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                ACESSO RESTRITO POR POLÍTICA DE SEGURANÇA (TENANT)
              </span>
              <h3 className="text-xl font-black text-slate-800 tracking-tight font-sans">
                Acesso Restrito - Permissão Insuficiente
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                Você está logado na empresa <strong className="text-slate-800">{currentTenant}</strong> com o perfil de <strong className="text-indigo-600">{currentUserRole}</strong>.
                Este módulo está restrito conforme as diretrizes de acesso do seu cargo e regras Multi-Tenant de isolamento lógico.
              </p>
            </div>

            {/* Matrix details */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 max-w-md mx-auto">
              <span className="text-[8px] font-bold text-slate-400 uppercase font-mono tracking-wider block">Matriz de Permissão Requerida:</span>
              <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                <span>Módulo: <span className="font-mono text-indigo-600">{activeTab.toUpperCase()}</span></span>
                <span className="text-rose-600 font-bold">Bloqueado ❌</span>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                Apenas Administradores ou perfis autorizados pelo Painel de Controle de Usuários têm acesso a este painel administrativo.
              </p>
            </div>

            {/* Interactive demo bypass to show user how easy it is to change permissions */}
            <div className="pt-2">
              <button 
                onClick={() => {
                  const allowedList = rolePermissions[currentUserRole] || [];
                  const updatedList = [...allowedList, activeTab];
                  setRolePermissions(prev => ({
                    ...prev,
                    [currentUserRole]: updatedList
                  }));
                  addLog(`Adicionou permissão temporária do módulo ${activeTab} ao perfil ${currentUserRole}`);
                }}
                className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-all shadow-xs hover:shadow-sm cursor-pointer inline-flex items-center gap-2"
              >
                <Unlock size={14} />
                Liberar este Módulo Temporariamente (Override Admin)
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'intelligence' && (
              <IntelligenceView 
                onAddClient={handleAddClient}
                onAddMeeting={handleAddMeeting}
                onAddTask={handleAddTask}
              />
            )}

            {activeTab === 'dashboard' && (
              <DashboardView 
                clients={clients.filter(c => currentTenant === 'KVB Group HQ' || c.company === currentTenant || !c.company)} 
                finance={finance} 
                meetings={meetings.filter(m => currentTenant === 'KVB Group HQ' || m.company === currentTenant)} 
                projects={projects}
                tasks={tasks.filter(t => currentTenant === 'KVB Group HQ' || t.client === currentTenant)}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'crm' && (
              <CrmView 
                clients={clients.filter(c => currentTenant === 'KVB Group HQ' || c.company === currentTenant || !c.company)} 
                services={services}
                onAddClient={handleAddClient}
                onEditClient={handleEditClient}
                onDeleteClient={handleDeleteClient}
                onSaveServices={handleSaveServices}
              />
            )}

            {activeTab === 'deals' && (
              <DealsView
                meetings={meetings.filter(m => currentTenant === 'KVB Group HQ' || m.company === currentTenant)}
                contracts={contracts.filter(c => currentTenant === 'KVB Group HQ' || c.company === currentTenant)}
                clients={clients.filter(c => currentTenant === 'KVB Group HQ' || c.company === currentTenant || !c.company)}
                onAddMeeting={handleAddMeeting}
                onUpdateMeetingStage={handleUpdateMeetingStage}
                onAddContract={handleAddContract}
                onDeleteContract={handleDeleteContract}
              />
            )}

            {activeTab === 'generator' && (
              <AiGeneratorView 
                onSaveToLibrary={handleSaveToLibrary}
              />
            )}

            {activeTab === 'library' && (
              <LibraryView 
                projects={projects} 
              />
            )}

            {activeTab === 'chat' && (
              <AiChatView />
            )}

            {activeTab === 'finance' && (
              <FinanceView
                finance={finance}
                onAddEntry={handleAddEntry}
                onAddExit={handleAddExit}
                onAddCommission={handleAddCommission}
                onUpdateGoal={handleUpdateGoal}
              />
            )}

            {activeTab === 'kanban' && (
              <KanbanView
                tasks={tasks.filter(t => currentTenant === 'KVB' || currentTenant === 'KVB Group HQ' || t.client === currentTenant)}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            )}

            {activeTab === 'portal' && (
              <ClientPortalView
                clients={clients.filter(c => currentTenant === 'KVB' || currentTenant === 'KVB Group HQ' || c.company === currentTenant || !c.company)}
                tickets={tickets}
                onAddTicket={handleAddTicket}
                onUpdateTicketStatus={handleUpdateTicketStatus}
              />
            )}

            {activeTab === 'backup' && (
              <BackupView
                currentTenant={currentTenant}
                currentUserRole={currentUserRole}
                onExportData={handleExportData}
                onRestoreData={handleRestoreData}
              />
            )}

            {activeTab === 'staff' && (
              <KvbAdminView
                tasks={tasks}
                tickets={tickets}
                activityLogs={activityLogs}
                onAddLog={addLog}
                currentTenant={currentTenant}
                currentUserRole={currentUserRole}
                rolePermissions={rolePermissions}
                onUpdatePermissions={setRolePermissions}
                tenantModules={tenantModules}
                onUpdateTenantModules={setTenantModules}
                tenantPlans={tenantPlans}
                onUpdateTenantPlans={setTenantPlans}
              />
            )}

            {activeTab === 'notif' && (
              <NotificationView />
            )}

            {activeTab === 'university' && (
              <UniversityView />
            )}

            {activeTab === 'aprender' && (
              <AprenderView />
            )}

            {activeTab === 'signatures' && (
              <SignaturesView />
            )}

            {activeTab === 'internal-chat' && (
              <InternalChatView />
            )}

            {activeTab === 'design' && (
              <DesignView />
            )}

            {activeTab === 'traffic' && (
              <TrafficView />
            )}

            {activeTab === 'automation' && (
              <AutomationView />
            )}

            {activeTab === 'store' && (
              <StoreView />
            )}

            {activeTab === 'franchise' && (
              <FranchiseView />
            )}
          </>
        )}

      </main>

      {/* Persistent "Me explique" Floating Assistant Button for Beginners */}
      <button
        onClick={() => setIsExplainModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-150 text-xs flex items-center gap-2 border border-amber-400 select-none cursor-pointer"
        id="btn-me-explique"
      >
        <HelpCircle size={15} className="animate-bounce" />
        <span>Me explique esta tela 🤔</span>
      </button>

      {/* "Me explique" (Modo Iniciante) Modal Overlay */}
      {isExplainModalOpen && (() => {
        const activeExp = tabExplanations[activeTab] || {
          title: "Funcionalidade do KVB",
          whatIs: "Uma tela integrada ao ecossistema do ERP/CRM KVB.",
          whatFor: "Serve para facilitar seus fluxos técnicos e operacionais de escala.",
          howWorks: "Funciona de forma integrada, sincronizando dados no container em nuvem.",
          howToUse: "Explore as abas e interações disponíveis na página atual para realizar suas tarefas.",
          practicalExample: "Utilizar este módulo para acompanhar o andamento ou gerar relatórios em tempo real.",
          recommendedVideo: "Guia Geral de Primeiros Passos no ERP KVB System (10 min)",
          commonErrors: "Não salvar os dados preenchidos antes de navegar para outras abas."
        };

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <HelpCircle size={20} className="stroke-slate-950 font-bold" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider font-mono">Modo Iniciante: Me Explique</h3>
                    <p className="text-[10px] font-bold text-slate-900/80">Explicando como se você fosse iniciante • {activeExp.title}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsExplainModalOpen(false)}
                  className="bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 font-bold p-1 rounded-full text-xs cursor-pointer transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed max-h-[calc(90vh-140px)]">
                
                {/* 1. O que é e para que serve */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-600 uppercase block">🤔 O que é isso?</span>
                    <p className="text-[11px] text-slate-700 font-medium">{activeExp.whatIs}</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-600 uppercase block">🎯 Para que serve?</span>
                    <p className="text-[11px] text-slate-700 font-medium">{activeExp.whatFor}</p>
                  </div>
                </div>

                {/* 2. Como funciona */}
                <div className="p-4 bg-amber-50/10 border border-amber-100 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">⚙️ Como funciona?</span>
                  <p className="text-[11px] text-slate-700">{activeExp.howWorks}</p>
                </div>

                {/* 3. Como usar */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase block">🚀 Como usar?</span>
                  <p className="text-[11px] text-slate-700">{activeExp.howToUse}</p>
                </div>

                {/* 4. Exemplo prático */}
                <div className="p-4 bg-indigo-50/15 border border-indigo-100/50 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase block">💡 Exemplo Prático de Uso</span>
                  <p className="text-[11px] text-indigo-900 font-bold">{activeExp.practicalExample}</p>
                </div>

                {/* 5. Erros comuns */}
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-rose-700 uppercase block">⚠️ Erros Comuns de Iniciantes</span>
                  <p className="text-[11px] text-rose-800">{activeExp.commonErrors}</p>
                </div>

                {/* 6. Vídeo recomendado */}
                <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest block">🎥 Vídeo Recomendado</span>
                    <p className="text-[11px] font-bold">{activeExp.recommendedVideo}</p>
                    <p className="text-[9px] text-slate-400">Assista ao tutorial oficial para acelerar seu domínio técnico.</p>
                  </div>
                  <button 
                    onClick={() => alert('Iniciando player de vídeo simulado para o tutorial... (HD)')}
                    className="py-1.5 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-[10px] font-black cursor-pointer transition-all flex items-center gap-1 shrink-0"
                  >
                    <Play size={11} className="fill-slate-950 text-slate-950" />
                    Assistir Vídeo
                  </button>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
                <button
                  onClick={() => setIsExplainModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-all shadow-2xs"
                >
                  Entendi Tudo!
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}

// -------------------------------------------------------------
// DATA DICTIONARY FOR MODO INICIANTE ("ME EXPLIQUE") EXPLANATIONS
// -------------------------------------------------------------
const tabExplanations: { [key: string]: {
  title: string;
  whatIs: string;
  whatFor: string;
  howWorks: string;
  howToUse: string;
  practicalExample: string;
  recommendedVideo: string;
  commonErrors: string;
} } = {
  dashboard: {
    title: "Painel Geral (Dashboard)",
    whatIs: "Uma central inteligente que consolida todos os dados estratégicos da sua agência em um único lugar.",
    whatFor: "Serve para dar ao dono da agência e gestores uma visão 360° imediata de faturamento, metas comerciais e fila de entregas técnicas.",
    howWorks: "Sincroniza automaticamente os dados cadastrados no CRM de Clientes, os contratos fechados no Comercial e os lançamentos de fluxo de caixa no módulo Financeiro.",
    howToUse: "Monitore os indicadores mensais no topo, veja os próximos agendamentos na lista central e analise o progresso das metas financeiras para calibrar suas decisões.",
    practicalExample: "Analisar em segundos se a meta de faturamento bruto mensal de R$ 50.000 está próxima de ser batida hoje.",
    recommendedVideo: "Como gerenciar métricas e metas em agências de alta performance (10 min)",
    commonErrors: "Não atualizar o status dos contratos no painel comercial, fazendo com que o faturamento total do dashboard pareça menor ou desatualizado."
  },
  crm: {
    title: "CRM de Clientes",
    whatIs: "O gerenciador de relacionamento com clientes (Customer Relationship Management) da KVB.",
    whatFor: "Serve para centralizar o histórico, dados de contato, status contratual e demandas de todos os seus leads e clientes ativos.",
    howWorks: "Armazena informações básicas de forma estruturada e permite categorizar os clientes como 'Lead', 'Ativo' ou 'Pendente'.",
    howToUse: "Clique no botão 'Novo Cliente' para registrar um prospect, altere o status para 'Ativo' ao fechar contrato e preencha as tabelas de serviços para controle de recorrência.",
    practicalExample: "Cadastrar a 'Clínica Glow Estética' de forma organizada para que toda a equipe técnica saiba os telefones de contato e quais serviços foram comprados.",
    recommendedVideo: "Como organizar um CRM de agência de ponta para aumentar a retenção (12 min)",
    commonErrors: "Esquecer de cadastrar o telefone com o código de área do país (+55), quebrando os disparos de webhooks de mensagens do WhatsApp."
  },
  deals: {
    title: "Escritório Comercial",
    whatIs: "A central de pré-vendas e gestão contratual.",
    whatFor: "Serve para acompanhar as reuniões de vendas agendadas e validar os contratos fechados de recorrência mensal.",
    howWorks: "Organiza as etapas das negociações comerciais (Apenas agendada, Proposta enviada, Fechado, Perdido) e calcula os valores anuais projetados.",
    howToUse: "Registre novas reuniões com prospects, mova as etapas de negociação conforme o lead avança e crie contratos preenchendo as parcelas mensais.",
    practicalExample: "Registrar que você tem uma reunião com o Dr. Marcos às 15h para fechar um contrato recorrente de R$ 4.000/mês para tráfego e design.",
    recommendedVideo: "A anatomia de uma reunião comercial fechadora de contratos high-ticket (15 min)",
    commonErrors: "Não marcar a negociação como 'Fechada' no funil antes de emitir o termo de contrato, gerando duplicidade ou falha de sincronia nas metas."
  },
  generator: {
    title: "Gerador IA de Briefings",
    whatIs: "Um gerador estratégico de briefings de negócios impulsionado por Inteligência Artificial.",
    whatFor: "Serve para criar instantaneamente cópias de vendas, estruturas de websites, ideias de posts e rotinas de automação personalizadas para cada nicho.",
    howWorks: "Usa o Gemini API do servidor para ler o nicho e nome do cliente, aplicando engenharia de prompt para devolver estratégias corporativas de alta conversão.",
    howToUse: "Digite o nome da empresa do cliente, selecione o nicho de mercado e clique em 'Gerar Planejamento Completo'. Em seguida, salve diretamente na Biblioteca KVB.",
    practicalExample: "Inserir 'Imobiliária VIP' e em 5 segundos receber copies prontas para a Landing Page e uma paleta de cores elegantes sugerida pela IA.",
    recommendedVideo: "Uso prático de Inteligência Artificial para acelerar entregas de agências em 10x (8 min)",
    commonErrors: "Digitar informações muito genéricas no campo de nicho. Seja específico para que a IA crie copys muito mais focadas e assertivas."
  },
  library: {
    title: "Biblioteca KVB",
    whatIs: "O repositório oficial de referências e briefings gerados pelo sistema.",
    whatFor: "Serve para salvar e consultar facilmente todos os planejamentos estratégicos criados pela IA para posterior cópia e execução.",
    howWorks: "Lista todos os planejamentos em formato de gaveta lateral flexível, com botões rápidos de cópia de texto para área de transferência.",
    howToUse: "Selecione o projeto salvo na lista à esquerda e clique em 'Copiar Copy' ou 'Copiar Fluxos' para enviar direto para o seu cliente ou desenvolvedor.",
    practicalExample: "Acessar a biblioteca técnica para copiar o roteiro do Reels gerado no mês passado para o seu cliente de odontologia.",
    recommendedVideo: "Como organizar sua biblioteca de referências para otimizar o tempo de produção (6 min)",
    commonErrors: "Não apagar projetos antigos de teste, o que pode congestionar a busca rápida quando você tiver muitos clientes reais cadastrados."
  },
  chat: {
    title: "Consultores de IA",
    whatIs: "Um hub de consultores especializados e autônomos prontos para atuar na sua agência.",
    whatFor: "Serve para dar respostas técnicas imediatas sobre design, tráfego pago, redação comercial e estratégias de SEO.",
    howWorks: "Conecta prompts de sistema ultra-sofisticados ao Gemini API, simulando personalidades altamente profissionais de cada departamento.",
    howToUse: "Escolha o profissional que você deseja consultar (ex: Gestor de Tráfego), faça sua pergunta técnica e receba uma orientação precisa em segundos.",
    practicalExample: "Perguntar ao Especialista em SEO: 'Quais as meta tags de cabeçalho obrigatórias para otimizar uma Landing Page institucional?'",
    recommendedVideo: "Engenharia de prompts para consultores de IA no dia a dia operacional (9 min)",
    commonErrors: "Fazer perguntas de design visual para o consultor de tráfego. Pergunte sempre ao especialista correto para obter a melhor resposta."
  },
  design: {
    title: "Área de Design",
    whatIs: "O estúdio visual e de identidade da agência.",
    whatFor: "Serve para criar paletas de cores harmônicas, inspecionar fontes corporativas legíveis e simular logotipos.",
    howWorks: "Disponibiliza geradores de paletas de cores complementares com códigos hexadecimais prontos para copiar e colar no Tailwind.",
    howToUse: "Navegue pelas combinações sugeridas de cores, use o testador de contrastes para garantir acessibilidade e escolha tipografias elegantes.",
    practicalExample: "Escolher uma paleta de azul escuro e dourado fosco para o site de um escritório de advocacia de alto padrão.",
    recommendedVideo: "Teoria das cores aplicada a conversão de interfaces digitais (11 min)",
    commonErrors: "Utilizar cores de texto com pouco contraste em relação ao fundo, quebrando as regras básicas de acessibilidade digital."
  },
  traffic: {
    title: "Painel de Tráfego Ads",
    whatIs: "O cockpit de controle e cálculo de anúncios online.",
    whatFor: "Serve para simular o retorno sobre investimento (ROI), monitorar custos de cliques (CPC) e cadastrar o faturamento vindo de tráfego pago.",
    howWorks: "Recebe dados de custo de mídia e faturamento gerado para calcular automaticamente o ROAS (Retorno Sobre Gasto em Anúncios).",
    howToUse: "Insira os investimentos diários/mensais do seu cliente em anúncios e registre as vendas geradas para tener relatórios de performance elegantes.",
    practicalExample: "Lançar que seu cliente investiu R$ 2.000 em Meta Ads e faturou R$ 10.000 em consultas, alcançando um ROAS excelente de 5.0x.",
    recommendedVideo: "Como interpretar as principais métricas do Meta Ads e do Google Ads (14 min)",
    commonErrors: "Não considerar as oscilações de custos de leilão de mídia em datas festivas ao simular o ROI anual de um cliente."
  },
  automation: {
    title: "Automações ERP",
    whatIs: "A central de automações de processos e integração de softwares.",
    whatFor: "Serve para eliminar tarefas manuais e repetitivas, integrando o CRM KVB a plataformas como N8N, Zapier e WhatsApp.",
    howWorks: "Utiliza rotas de Webhooks e chamadas HTTP para enviar dados de um sistema para o outro assim que um evento ocorre.",
    howToUse: "Copie os templates de fluxos JSON prontos, ative webhooks de captura de leads e configure respostas automatizadas.",
    practicalExample: "Criar uma automação que adiciona o lead em uma planilha do Google Sheets assim que ele se cadastra no site.",
    recommendedVideo: "Como estruturar automações robustas e à prova de falhas com N8N (15 min)",
    commonErrors: "Esquecer de realizar testes com dados simulados, fazendo com que erros de digitação de chaves travem o fluxo operacional."
  },
  finance: {
    title: "Controle Financeiro",
    whatIs: "O livro caixa e fluxo de caixa corporativo da sua agência.",
    whatFor: "Serve para manter o faturamento previsível, controlando mensalidades recorrentes, despesas de servidores e comissões da equipe.",
    howWorks: "Calcula a receita bruta, diminui as despesas fixas/variáveis e plota gráficos interativos de lucro líquido e batimento de metas.",
    howToUse: "Lance toda entrada de dinheiro (mensalidades) e saída (custos, freelancers) para ter um controle absoluto do lucro líquido da agência.",
    practicalExample: "Adicionar o recebimento de R$ 2.500 da mensalidade de SEO de um cliente e deduzir R$ 200 de custo de ferramentas.",
    recommendedVideo: "Gestão financeira e faturamento recorrente para empresas de serviços digitais (12 min)",
    commonErrors: "Deixar de cadastrar pequenas taxas recorrentes de ferramentas, distorcendo o saldo líquido real no final do mês."
  },
  kanban: {
    title: "Fila de Produção (Kanban)",
    whatIs: "O gerenciador de tarefas ágil e visual da agência.",
    whatFor: "Serve para organizar quem está fazendo o quê, garantindo que os sites, criativos e automações sejam entregues rigorosamente no prazo.",
    howWorks: "Divide as tarefas técnicas em cartões móveis organizados em colunas de progresso reativas (Pendente, Em Produção, Concluído).",
    howToUse: "Arraste os cartões de tarefas conforme avança no desenvolvimento e crie novas tarefas definindo o responsável e prazo.",
    practicalExample: "Arrastar o cartão 'Desenvolver formulário de contato' de 'Em Produção' para 'Concluído' para sinalizar a entrega.",
    recommendedVideo: "Metodologia Ágil Kanban para acelerar entregas técnicas em equipes (10 min)",
    commonErrors: "Acumular dezenas de tarefas na coluna 'Em Produção' simultaneamente. Foque em concluir as tarefas antes de abrir novas."
  },
  portal: {
    title: "Simulador Cliente",
    whatIs: "O portal do cliente (White-Label) exclusivo de atendimento.",
    whatFor: "Serve para dar ao cliente final um painel onde ele acompanha entregas, faturas e abre chamados de suporte técnico de forma profissional.",
    howWorks: "Reflete os dados operacionais da agência em uma interface limpa, segura e amigável para o cliente final usar no navegador.",
    howToUse: "Use a simulação para visualizar como o cliente vê o andamento da Landing Page, abre novos tickets ou faz downloads de relatórios.",
    practicalExample: "O cliente final entra no portal e aprova o design do site institucional enviado pela agência com apenas um clique.",
    recommendedVideo: "Como o portal do cliente profissional melhora a retenção da agência em 40% (10 min)",
    commonErrors: "Não responder aos chamados dentro do portal, fazendo com que o cliente use o WhatsApp pessoal e quebre o fluxo do ERP."
  },
  staff: {
    title: "Área de Colaboradores",
    whatIs: "A central de delegação de chamados e controle de produtividade da equipe.",
    whatFor: "Serve para gerenciar o time interno de desenvolvedores, designers, redatores e freelancers da agência.",
    howWorks: "Mapeia os chamados de suporte vindos do portal do cliente e permite atribuir responsáveis técnicos para cada ticket.",
    howToUse: "Monitore o ranking de chamados resolvidos, distribua novas tarefas para o time e avalie a produtividade operacional.",
    practicalExample: "Atribuir o chamado 'Erro no formulário de contato' para o desenvolvedor júnior da agência resolver imediatamente.",
    recommendedVideo: "Como gerenciar e liderar equipes técnicas de forma ágil e eficiente (12 min)",
    commonErrors: "Atribuir chamados complexos para freelancers sem antes anexar um briefing detalhado do erro."
  },
  notif: {
    title: "Disparador WhatsApp",
    whatIs: "Central de templates de mensagens operacionais automáticas.",
    whatFor: "Serve para testar e planejar mensagens de cobrança amigável, boas-vindas para novos clientes e alertas de reuniões comerciais.",
    howWorks: "Preenche variáveis do CRM de forma dinâmica e simula o envio formatado direto para o número do cliente.",
    howToUse: "Selecione o template (ex: Lembrete de Reunião), preencha o celular com DDI e simule o disparo para visualizar a mensagem final.",
    practicalExample: "Enviar um lembrete automático com o link do Zoom 30 minutos antes de uma reunião comercial estratégica.",
    recommendedVideo: "Estratégias de notificações ativas para reduzir cancelamentos e aumentar presença (8 min)",
    commonErrors: "Mandar mensagens spam sem consentimento prévio do usuário, correndo o risco de ter o número banido pelo WhatsApp."
  },
  university: {
    title: "KVB University",
    whatIs: "O centro de treinamento e capacitação profissional da sua empresa.",
    whatFor: "Serve para treinar sua equipe de vendas, tráfego, desenvolvimento e marketing nos exatos processos validados da agência.",
    howWorks: "Organiza cursos com videoaulas completas, apostilas teóricas em formato PDF para download, avaliações práticas e emissão de certificados.",
    howToUse: "Clique nos cursos à esquerda, assista aos vídeos e faça o download dos materiais complementares para estudar off-line.",
    practicalExample: "Seu novo redator faz o curso de Copywriting para aprender a escrever na linguagem exigida pelos clientes da agência.",
    recommendedVideo: "Como construir uma universidade corporativa para acelerar o treinamento do seu time (10 min)",
    commonErrors: "Tentar responder ao quiz técnico de avaliação sem antes assistir à videoaula e ler a apostila em PDF recomendada."
  },
  aprender: {
    title: "Central de Aprendizado",
    whatIs: "O portal educacional interativo focado em tecnologia, marketing e inteligência artificial.",
    whatFor: "Serve para capacitar qualquer pessoa a programar códigos complexos, criar automações avançadas e dominar ferramentas digitais modernas do mercado.",
    howWorks: "Unifica o Modo Tutor de IA, desafios de código reativos, guias interativos de 'Faça para mim' e um dicionário técnico com soluções para erros.",
    howToUse: "Selecione a área técnica que quer aprender, faça perguntas diretamente para o Tutor no chat e use o assistente 'Fazer ou Ensinar' para qualquer tarefa técnica.",
    practicalExample: "Digitar 'Criar uma automação no Make de leads' e escolher o modo 'Me ensinar passo a passo' para receber um roteiro visual estruturado.",
    recommendedVideo: "Como acelerar seu aprendizado técnico usando a Inteligência Artificial como parceira (11 min)",
    commonErrors: "Apenas copiar os códigos sem responder aos quizzes de fixação."
  },
  signatures: {
    title: "Assinaturas & Club",
    whatIs: "A central de recorrências e programas de benefícios recorrentes.",
    whatFor: "Serve para controlar as cobranças recorrentes dos seus serviços recorrentes (ex: manutenção, hospedagem) de forma profissional.",
    howWorks: "Organiza os contratos ativos em planos, calcula faturamentos futuros e sinaliza clientes que estão em atraso.",
    howToUse: "Configure as taxas de planos mensais e controle quem está ativo ou inadimplente.",
    practicalExample: "Cobrar R$ 250 por mês de manutenção técnica e hospedagem estável do site de um cliente de contabilidade.",
    recommendedVideo: "Como faturar recorrentemente com planos de manutenção e hospedagem (13 min)",
    commonErrors: "Deixar de reajustar o valor da mensalidade recorrente anualmente de acordo com os reajustes de preços de servidores em nuvem."
  },
  "internal-chat": {
    title: "Chat Interno",
    whatIs: "A central de comunicação segura para sua equipe interna.",
    whatFor: "Serve para alinhar demandas operacionais em canais específicos, reduzindo a poluição do WhatsApp pessoal dos colaboradores.",
    howWorks: "Organiza conversas divididas em canais por departamentos (Comercial, Design, Tecnologia) e chats privados de um para um.",
    howToUse: "Selecione o canal correto à esquerda, envie links de referência, marque colegas de equipe e compartilhe o andamento dos projetos.",
    practicalExample: "Mandar um link do site homologado no canal #tecnologia para que a equipe técnica realize o deploy definitivo na Vercel.",
    recommendedVideo: "Comunicação assíncrona eficaz para times remotos de alto rendimento (9 min)",
    commonErrors: "Mandar piadas ou assuntos não profissionais em canais sérios de entregas, gerando distrações operacionais no time."
  },
  store: {
    title: "KVB Store",
    whatIs: "O marketplace corporativo interno de templates e ativos digitais.",
    whatFor: "Serve para resgatar códigos prontos, landing pages de alta conversão e fluxogramas do N8N com apenas 1 clique usando moedas de produtividade.",
    howWorks: "Simula uma loja interna onde colaboradores ganham moedas virtuais (KVB Coins) por metas batidas e trocam por ativos que aceleram as entregas.",
    howToUse: "Navegue pelo catálogo de templates, verifique os requisitos técnicos de cada item e clique em 'Adquirir' para obter o código-fonte.",
    practicalExample: "Adquirir um robô de recuperação de leads inativos pelo WhatsApp por 50 KVB Coins e instalar no N8N em segundos.",
    recommendedVideo: "Como criar uma biblioteca interna de assets para acelerar a produção em até 5x (10 min)",
    commonErrors: "Adquirir um template sem antes verificar se possui as dependências necessárias instaladas no servidor local."
  },
  franchise: {
    title: "Modo Franquia",
    whatIs: "O painel de expansão, controle e governança de sub-unidades da agência.",
    whatFor: "Serve para consolidar faturamentos de filiais de franquia e distribuir leads comerciais de forma justa e otimizada por geolocalização.",
    howWorks: "Mostra relatórios de desempenho individuais por franqueado e calcula royalties operacionais automáticos devidos à matriz.",
    howToUse: "Monitore o ranking de franquias que mais faturam no mês, avalie a satisfação de clientes locais e direcione novos leads que chegam na região.",
    practicalExample: "Direcionar automaticamente um lead interessado localizado em Curitiba para o franqueado da unidade KVB de Curitiba atender.",
    recommendedVideo: "Modelo de Franquia de Agências: Como escalar a marca mantendo qualidade técnica (16 min)",
    commonErrors: "Não auditar com frequência as entregas das franquias regionais, permitindo que falhas técnicas de uma unidade afetem toda a rede nacional."
  }
};
