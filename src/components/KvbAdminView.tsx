import React, { useState, useEffect } from 'react';
import { Task, Ticket } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Building2,
  Building,
  DollarSign,
  Briefcase,
  ListTodo,
  TrendingUp,
  Cpu,
  BarChart3,
  Bot,
  Laptop,
  Palette,
  FolderLock,
  GraduationCap,
  Key,
  Database,
  Lock,
  Unlock,
  QrCode,
  Download,
  AlertTriangle,
  FileText,
  Search,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  History,
  FileSpreadsheet,
  FileCode,
  FileCheck2,
  UploadCloud,
  Clock,
  Compass,
  MapPin,
  Settings,
  HelpCircle,
  Eye,
  Mail,
  Smartphone,
  CheckCircle2,
  Zap,
  Percent,
  Calendar,
  Share2,
  CheckSquare,
  LockKeyhole,
  Globe,
  Phone,
  Instagram,
  Award,
  ThumbsUp
} from 'lucide-react';

interface KvbAdminViewProps {
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

export default function KvbAdminView({
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
}: KvbAdminViewProps) {
  // Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'companies' | 'users' | 'partners' | 'prospector' | 'vault' | 'audit' | 'security'>('dashboard');

  // --- 1. SECURITY LOCK STATE & SIMULATIONS ---
  const [isAuthorized, setIsAuthorized] = useState(true); // Default authorized, can be locked to test Login Gate
  const [loginEmail, setLoginEmail] = useState('admin@kvbsystem.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [login2Fa, setLogin2Fa] = useState('');
  const [activeSessionToken, setActiveSessionToken] = useState('852911');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Security policies state
  const [sessionTimeout, setSessionTimeout] = useState('60');
  const [timeRestriction, setTimeRestriction] = useState(false);
  const [geoRestriction, setGeoRestriction] = useState(false);

  // Password strength checker helper
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: 'Em branco', color: 'bg-slate-200 w-1/4', level: 0 };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { label: 'Fraca ❌', color: 'bg-rose-500 w-1/4', level: 1 };
    if (score <= 3) return { label: 'Média ⚠️', color: 'bg-amber-500 w-2/4', level: 2 };
    return { label: 'Forte 🔥', color: 'bg-emerald-500 w-full', level: 3 };
  };

  // Active Sessions
  const [sessions, setSessions] = useState([
    { id: 'sess-1', device: 'Chrome no macOS (Este dispositivo)', ip: '191.185.12.98', location: 'São Paulo, BR', status: 'Ativa' },
    { id: 'sess-2', device: 'Safari no iPhone 15 Pro', ip: '177.200.45.112', location: 'Rio de Janeiro, BR', status: 'Ativa' },
    { id: 'sess-3', device: 'Firefox no Windows 11', ip: '201.89.172.5', location: 'Curitiba, BR', status: 'Ativa' }
  ]);

  // Handle Login attempt
  const handleSecureLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (loginAttempts >= 2) {
      setIsLockedOut(true);
      setLockoutTimer(30);
      onAddLog('Sessão Administrativa Bloqueada temporariamente devido a múltiplas tentativas malsucedidas.');
      return;
    }

    if (loginPassword.length < 4) {
      setLoginAttempts(prev => prev + 1);
      alert('Senha incorreta! Digite uma senha válida.');
      return;
    }

    if (login2Fa !== activeSessionToken) {
      setLoginAttempts(prev => prev + 1);
      alert('Código 2FA Inválido! Verifique o token temporário no painel.');
      return;
    }

    // Success
    setIsAuthorized(true);
    setLoginAttempts(0);
    onAddLog('Autenticou com sucesso no KVB Admin via 2FA seguro.');
  };

  useEffect(() => {
    if (isLockedOut && lockoutTimer > 0) {
      const timer = setTimeout(() => setLockoutTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (lockoutTimer === 0) {
      setIsLockedOut(false);
    }
  }, [isLockedOut, lockoutTimer]);

  // Dynamic token rotation simulation for 2FA
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setActiveSessionToken(randomCode);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. MULTI-TENANT COMPANIES DATABASE ---
  const [companies, setCompanies] = useState([
    { id: 'tenant-4', name: 'KVB', tradeName: 'KVB', legalName: 'KVB Negócios Digitais e Software LTDA', cnpj: '10.222.333/0001-00', niche: 'Empresas de tecnologia', email: 'contato@kvbsystem.com.br', whatsapp: '(11) 90000-0000', phone: '(11) 4004-0000', address: 'Faria Lima, 3500', city: 'São Paulo', state: 'SP', cep: '04538-133', website: 'www.kvbsystem.com.br', socialMedia: '@kvb.system', plan: 'Enterprise', createdAt: '01/01/2026', status: 'Ativo' }
  ]);

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('tenant-4');
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);

  // Form State for Company Creation/Editing
  const [companyForm, setCompanyForm] = useState({
    name: '', tradeName: '', legalName: '', cnpj: '', niche: 'Empresas de tecnologia',
    email: '', whatsapp: '', phone: '', address: '', city: 'São Paulo', state: 'SP',
    cep: '', website: '', socialMedia: '', plan: 'Enterprise', status: 'Ativo'
  });

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompany) {
      setCompanies(prev => prev.map(c => c.id === editingCompany.id ? { ...c, ...companyForm } : c));
      onAddLog(`Atualizou cadastro corporativo da empresa ${companyForm.name}`);
    } else {
      const newComp = {
        ...companyForm,
        id: `tenant-${Date.now()}`,
        createdAt: new Date().toLocaleDateString('pt-BR')
      };
      setCompanies(prev => [...prev, newComp]);
      onAddLog(`Cadastrou com sucesso nova empresa Multi-Tenant: ${newComp.name}`);
    }
    setIsCompanyModalOpen(false);
    setEditingCompany(null);
  };

  const startEditCompany = (comp: any) => {
    setEditingCompany(comp);
    setCompanyForm({ ...comp });
    setIsCompanyModalOpen(true);
  };

  const handleDeleteCompany = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir a empresa ${name} e isolar seus dados permanentes?`)) {
      setCompanies(prev => prev.filter(c => c.id !== id));
      onAddLog(`Removeu a empresa ${name} do cadastro global Multi-Tenant.`);
    }
  };

  // --- 3. GESTÃO DE USUÁRIOS ---
  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Carlos Dev', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', role: 'Administrador', department: 'Tecnologia', email: 'carlos.dev@kvbsystem.com', phone: '(11) 91111-2222', login: 'carlos.dev', lastAccess: 'Hoje às 18:22', status: 'Ativo', companyId: 'tenant-4' }
  ]);

  const [selectedUserCompanyId, setSelectedUserCompanyId] = useState<string>('tenant-4');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // User form state
  const [userForm, setUserForm] = useState({
    name: '', role: 'Funcionário', department: 'Atendimento', email: '',
    phone: '', login: '', status: 'Ativo', companyId: 'tenant-1'
  });

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
      onAddLog(`Atualizou usuário ${userForm.name} da empresa ${companies.find(c => c.id === userForm.companyId)?.name}`);
    } else {
      const newUser = {
        ...userForm,
        id: `usr-${Date.now()}`,
        photo: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=100`,
        lastAccess: 'Nunca'
      };
      setUsers(prev => [...prev, newUser]);
      onAddLog(`Cadastrou o usuário ${newUser.name} na empresa ${companies.find(c => c.id === newUser.companyId)?.name}`);
    }
    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  const startEditUser = (usr: any) => {
    setEditingUser(usr);
    setUserForm({ ...usr });
    setIsUserModalOpen(true);
  };

  // --- 4. SISTEMA GLOBAL DE PERMISSÕES ---
  const [selectedPermissionRole, setSelectedPermissionRole] = useState('Gerente');
  const [permissionMatrix, setPermissionMatrix] = useState<Record<string, Record<string, boolean[]>>>({
    'Gerente': {
      'Dashboard': [true, true, true, false, true, false, false],
      'Financeiro': [true, true, false, false, false, false, false],
      'CRM': [true, true, true, false, true, true, false],
      'Marketing': [true, true, true, true, true, true, false],
      'IA': [true, true, false, false, false, false, false],
      'Automações': [true, false, false, false, false, false, false]
    },
    'Marketing': {
      'Dashboard': [true, false, false, false, false, false, false],
      'Financeiro': [false, false, false, false, false, false, false],
      'CRM': [false, false, false, false, false, false, false],
      'Marketing': [true, true, true, true, true, true, true],
      'IA': [true, true, true, false, false, false, false],
      'Automações': [true, true, false, false, false, false, false]
    }
  });

  const screensList = ['Dashboard', 'Financeiro', 'CRM', 'Marketing', 'IA', 'Automações', 'Contratos', 'Funcionários', 'Relatórios', 'Configurações', 'API'];
  const actionsList = ['Visualizar', 'Criar', 'Editar', 'Excluir', 'Exportar', 'Compartilhar', 'Aprovar'];

  const handleToggleMatrixPermission = (role: string, screen: string, actionIndex: number) => {
    setPermissionMatrix(prev => {
      const currentRoleData = prev[role] || {};
      // Default to 7 falses if not exists
      const currentScreenData = currentRoleData[screen] || [false, false, false, false, false, false, false];

      const updatedScreenData = [...currentScreenData];
      updatedScreenData[actionIndex] = !updatedScreenData[actionIndex];

      onAddLog(`Alterou permissão de ${actionsList[actionIndex]} na tela ${screen} para o cargo de ${role}`);

      return {
        ...prev,
        [role]: {
          ...currentRoleData,
          [screen]: updatedScreenData
        }
      };
    });
  };

  // --- 5. PARTNERS EXCLUSIVE AREA ---
  const [partnerFilter, setPartnerFilter] = useState('Anual');

  // --- 6. GLOBAL LEAD INTELLIGENCE PROSPECTOR (KVB Business Finder) ---
  const [selectedNiche, setSelectedNiche] = useState('Restaurantes');
  const [customNiche, setCustomNiche] = useState('');
  const [isCustomNicheActive, setIsCustomNicheActive] = useState(false);
  const [filterCity, setFilterCity] = useState('São Paulo');
  const [filterState, setFilterState] = useState('SP');
  const [filterBairro, setFilterBairro] = useState('');
  const [filterCep, setFilterCep] = useState('');
  const [filterRadius, setFilterRadius] = useState('10');

  // Smart filters states
  const [filterRatingMax, setFilterRatingMax] = useState('all'); // 'all', 'low' (<4.0), 'high' (>4.5)
  const [filterReviewsQty, setFilterReviewsQty] = useState('all'); // 'all', 'few' (<15), 'many' (>100)
  const [filterWebsiteStatus, setFilterWebsiteStatus] = useState('all'); // 'all', 'yes', 'no'
  const [filterRecentlyOpened, setFilterRecentlyOpened] = useState(false);
  const [filterVerified, setFilterVerified] = useState('all'); // 'all', 'yes', 'no'
  const [filterHasWhatsapp, setFilterHasWhatsapp] = useState(false);
  const [filterHasEmail, setFilterHasEmail] = useState(false);
  const [filterHasPhone, setFilterHasPhone] = useState(false);
  const [filterHasSocial, setFilterHasSocial] = useState(false);

  // Search execution states
  const [isProspecting, setIsProspecting] = useState(false);
  const [prospectingLogs, setProspectingLogs] = useState<string[]>([]);
  const [prospectingProgress, setProspectingProgress] = useState(0);
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLeadAudit, setSelectedLeadAudit] = useState<any | null>(null);

  // CRM integration local states tracking actions for audited leads
  const [crmLeadsAdded, setCrmLeadsAdded] = useState<string[]>([]);
  const [crmTasksCreated, setCrmTasksCreated] = useState<Record<string, { seller: string; desc: string; date: string }>>({});
  const [crmProposalsGenerated, setCrmProposalsGenerated] = useState<string[]>([]);
  const [crmFollowUpsScheduled, setCrmFollowUpsScheduled] = useState<Record<string, string>>({});
  const [crmContactHistory, setCrmContactHistory] = useState<Record<string, string[]>>({});

  const NICHES_LIST = [
    "Academias", "Adegas", "Advogados", "Agências de marketing", "Agências de turismo", "Açaíterias", "Arquitetos", "Assistências técnicas", "Autopeças", "Bares", "Barbearias", "Buffets", "Cafeterias", "Casas de festas", "Clínicas médicas", "Clínicas odontológicas", "Clínicas veterinárias", "Concessionárias", "Confeitarias", "Construtoras", "Contadores", "Corretores", "Cursos", "CrossFit", "Distribuidoras", "Docerias", "Empresas de energia solar", "Empresas de limpeza", "Empresas de refrigeração", "Empresas de segurança", "Empresas de tecnologia", "Engenheiros", "Escolas", "Escritórios em geral", "Farmácias", "Fisioterapeutas", "Floriculturas", "Food trucks", "Hamburguerias", "Hotéis", "Imobiliárias", "Indústrias", "Informática", "Lanchonetes", "Lava rápidos", "Lojas de calçados", "Lojas de celulares", "Lojas de roupas", "Marcenarias", "Marmitarias", "Motéis", "Nutricionistas", "Oficinas mecânicas", "Padarias", "Personal trainers", "Pet shops", "Pizzarias", "Pousadas", "Prestadores de serviço", "Psicólogos", "Restaurantes", "Salões de beleza", "Serralherias", "Sorveterias", "Studios de pilates", "Transportadoras", "Vidraçarias"
  ];

  const triggerProspecting = () => {
    setIsProspecting(true);
    setProspectingLogs([]);
    setProspectingProgress(0);
    setLeads([]);

    const searchNiche = isCustomNicheActive && customNiche ? customNiche : selectedNiche;

    const logSteps = [
      'Iniciando Varredura e Conexão com bases de dados seguras...',
      `Consultando Google Business Profile API em ${filterCity}-${filterState} para o segmento [${searchNiche}]...`,
      'Varrendo Whois e analisando o cabeçalho HTTP dos sites oficiais mapeados...',
      'Analisando tags pixel de rastreio, scripts de chatbot obsoletos ou lentidão mobile...',
      'Validando e filtrando bases públicas de CNPJ e dados cadastrais comerciais abertos...',
      'Cruzando fontes de redes sociais públicas permitidas pelas APIs oficiais...',
      'Gerando diagnósticos e aplicando inteligência de vulnerabilidade digital da KVB...'
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logSteps.length) {
        setProspectingLogs(prev => [...prev, `[${new Date().toLocaleTimeString('pt-BR')}] ${logSteps[step]}`]);
        setProspectingProgress(prev => prev + 14.2);
        step++;
      } else {
        clearInterval(interval);
        setIsProspecting(false);
        setProspectingProgress(100);

        // Generate Simulated Leads reflecting the precise segment search and chosen filters
        const baseLeads = [
          {
            id: `lead-fnd-${Date.now()}-1`,
            name: `${searchNiche} Imperial`,
            company: `${searchNiche} Imperial S/A`,
            phone: '(11) 98111-2323',
            email: `contato@${searchNiche.toLowerCase().replace(/\s/g, '')}imperial.com.br`,
            city: filterCity,
            bairro: filterBairro || 'Centro',
            cep: filterCep || '01000-000',
            rating: 3.6,
            reviewsCount: 12,
            website: '',
            socialMedia: `@${searchNiche.toLowerCase().replace(/\s/g, '')}.imperial`,
            hasWhatsapp: true,
            hasEmail: true,
            hasPhone: true,
            verified: false,
            isRecentlyOpened: true,
            vulnerabilities: {
              noSite: true,
              oldSite: false,
              noWhatsapp: false,
              noGmb: true,
              lowSocial: true,
              needsAutomation: true
            },
            score: 88
          },
          {
            id: `lead-fnd-${Date.now()}-2`,
            name: `${searchNiche} & Família`,
            company: `${searchNiche} & Família ME`,
            phone: '(11) 97555-4422',
            email: `vendas@${searchNiche.toLowerCase().replace(/\s/g, '')}familia.com`,
            city: filterCity,
            bairro: filterBairro || 'Bela Vista',
            cep: filterCep || '01311-000',
            rating: 4.8,
            reviewsCount: 420,
            website: `www.${searchNiche.toLowerCase().replace(/\s/g, '')}familia.com`,
            socialMedia: `@${searchNiche.toLowerCase().replace(/\s/g, '')}familia`,
            hasWhatsapp: false,
            hasEmail: false,
            hasPhone: true,
            verified: true,
            isRecentlyOpened: false,
            vulnerabilities: {
              noSite: false,
              oldSite: true,
              noWhatsapp: true,
              noGmb: false,
              lowSocial: false,
              needsAutomation: true
            },
            score: 64
          },
          {
            id: `lead-fnd-${Date.now()}-3`,
            name: `Só ${searchNiche}`,
            company: `Só ${searchNiche} Comércio de Serviços`,
            phone: '(11) 96123-9876',
            email: `financeiro@so${searchNiche.toLowerCase().replace(/\s/g, '')}.com`,
            city: filterCity,
            bairro: filterBairro || 'Vila Mariana',
            cep: filterCep || '04101-000',
            rating: 2.9,
            reviewsCount: 7,
            website: '',
            socialMedia: '',
            hasWhatsapp: true,
            hasEmail: true,
            hasPhone: true,
            verified: false,
            isRecentlyOpened: false,
            vulnerabilities: {
              noSite: true,
              oldSite: false,
              noWhatsapp: false,
              noGmb: true,
              lowSocial: true,
              needsAutomation: true
            },
            score: 95
          }
        ];

        // Apply filters locally for highly responsive, accurate simulation results
        const filtered = baseLeads.filter(lead => {
          if (filterWebsiteStatus === 'yes' && lead.vulnerabilities.noSite) return false;
          if (filterWebsiteStatus === 'no' && !lead.vulnerabilities.noSite) return false;
          if (filterRecentlyOpened && !lead.isRecentlyOpened) return false;
          if (filterVerified === 'yes' && !lead.verified) return false;
          if (filterVerified === 'no' && lead.verified) return false;
          if (filterHasWhatsapp && !lead.hasWhatsapp) return false;
          if (filterHasEmail && !lead.hasEmail) return false;
          if (filterHasPhone && !lead.hasPhone) return false;
          if (filterHasSocial && !lead.socialMedia) return false;
          if (filterRatingMax === 'low' && lead.rating >= 4.0) return false;
          if (filterRatingMax === 'high' && lead.rating <= 4.5) return false;
          if (filterReviewsQty === 'few' && lead.reviewsCount >= 15) return false;
          if (filterReviewsQty === 'many' && lead.reviewsCount <= 100) return false;
          return true;
        });

        // If no lead fits, we force at least one so the UI is never dry or confusing
        if (filtered.length === 0) {
          setLeads([baseLeads[0]]);
        } else {
          setLeads(filtered);
        }
        onAddLog(`Realizou varredura de prospecção com KVB Business Finder para [${searchNiche}] em ${filterCity}-${filterState}`);
      }
    }, 450);
  };

  // --- 7. CENTRAL DE DOCUMENTOS ---
  const [documents, setDocuments] = useState([
    { id: 'doc-1', name: 'Contrato_Prestacao_Servicos_João.pdf', date: '12/01/2026', size: '2.4 MB', type: 'Contratos', company: 'Restaurante do João' },
    { id: 'doc-2', name: 'Proposta_Comercial_Premium_Odonto.pdf', date: '24/02/2026', size: '1.8 MB', type: 'Propostas', company: 'Clínica OdontoSilva' },
    { id: 'doc-3', name: 'Orcamento_Automação_WhatsApp_FitLife.xlsx', date: '03/03/2026', size: '820 KB', type: 'Orçamentos', company: 'Academia FitLife' },
    { id: 'doc-4', name: 'Nota_Fiscal_KVB_Junho.pdf', date: '15/06/2026', size: '412 KB', type: 'Notas', company: 'Academia FitLife' },
    { id: 'doc-5', name: 'Comprovante_Pagamento_Setup_Restaurante.pdf', date: '13/01/2026', size: '512 KB', type: 'Comprovantes', company: 'Restaurante do João' }
  ]);

  const [documentTypeFilter, setDocumentTypeFilter] = useState('Todos');
  const [docSearch, setDocSearch] = useState('');

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        date: new Date().toLocaleDateString('pt-BR'),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: 'Contratos',
        company: currentTenant
      };
      setDocuments(prev => [newDoc, ...prev]);
      onAddLog(`Enviou o documento digital: ${file.name} para o cofre da empresa ${currentTenant}`);
      alert(`Documento "${file.name}" carregado e arquivado com sucesso por isolamento lógico.`);
    }
  };

  return (
    <div className="space-y-6" id="kvb-admin-root">
      
      {/* Banner / Identification */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[9px] bg-indigo-50 text-indigo-700 py-1 px-2.5 rounded font-bold uppercase tracking-wider block w-fit">
            SaaS Multi-Tenant Enterprise
          </span>
          <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2 font-sans">
            <ShieldCheck className="text-indigo-600 animate-pulse" size={20} />
            Central Administrativa Global (KVB Admin)
          </h2>
          <p className="text-xs text-slate-400">
            Painel de controle unificado para administração de clientes Multi-Tenant, auditorias digitais, gestão de acessos e inteligência de leads.
          </p>
        </div>

        <div className="flex gap-3 shrink-0 items-center bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-2xs">
          <Building2 size={16} className="text-indigo-600 shrink-0" />
          <div className="text-left">
            <span className="text-[8px] text-slate-400 font-bold block uppercase">KVB HQ Operational Database</span>
            <span className="text-xs font-black text-slate-700 font-mono">128 Tenants Ativos</span>
          </div>
          <button 
            onClick={() => setIsAuthorized(false)}
            className="ml-2 p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors"
            title="Bloquear Acesso Administrativo para Testar Login Gate"
          >
            <Lock size={12} />
          </button>
        </div>
      </div>

      {/* Login Gate Screen Overlay */}
      {!isAuthorized ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-4xl mx-auto shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8" id="security-login-gate">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[9px] font-black text-rose-600 tracking-widest font-mono uppercase bg-rose-50 px-2.5 py-1 rounded border border-rose-100">
                SISTEMA DE SEGURANÇA KVB CORE SHIELD
              </span>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                Identificação Obrigatória de Operador
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Este painel de controle administrativo possui chaves de isolamento de dados. Para acessar, confirme seu login de operador com autenticação 2FA ativa.
              </p>
            </div>

            <form onSubmit={handleSecureLogin} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">E-mail Corporativo</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Senha Administrativa</label>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Força: {getPasswordStrength(loginPassword).label}
                  </span>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className={`h-full transition-all duration-300 ${getPasswordStrength(loginPassword).color}`}></div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Token de Verificação 2FA</label>
                <input 
                  type="text" 
                  placeholder="Ex: 485920"
                  value={login2Fa}
                  onChange={(e) => setLogin2Fa(e.target.value)}
                  maxLength={6}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold tracking-widest text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              {isLockedOut ? (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg text-rose-700 text-xs font-bold leading-tight flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Tentativas esgotadas! Acesso bloqueado por {lockoutTimer}s.
                </div>
              ) : (
                <button 
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Unlock size={14} />
                  Desbloquear Acesso e Autenticar
                </button>
              )}
            </form>
          </div>

          <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between font-mono space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800 px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit">
                TOTP GENERATOR WIDGET
              </span>
              <p className="text-[10px] text-slate-400 leading-normal">
                Dispositivo físico 2FA ativo para <strong className="text-white">admin@kvbsystem.com</strong>:
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-2">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Código Temporário</span>
                <span className="text-3xl font-black text-amber-400 tracking-widest">{activeSessionToken.substring(0,3)} {activeSessionToken.substring(3,6)}</span>
                <span className="text-[9px] text-slate-500 flex items-center gap-1.5">
                  <Clock size={10} className="animate-spin text-indigo-500" /> Rotaciona a cada 30 segundos
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Último Login:</span>
                <span className="text-slate-300">Hoje às 18:30h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">IP Autorizado:</span>
                <span className="text-indigo-400 font-bold">191.185.12.98</span>
              </div>
              <button 
                onClick={() => {
                  setLogin2Fa(activeSessionToken);
                  setLoginPassword('KvbSystemPass2026!');
                }}
                className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30 rounded-lg transition-all text-center block cursor-pointer"
              >
                Auto-Preencher Credenciais Seguras
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Sub-tabs menu */}
          <div className="flex border-b border-slate-200 gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard Global KVB', icon: <BarChart3 size={14} /> },
              { id: 'companies', label: 'Gestão de Empresas', icon: <Building size={14} /> },
              { id: 'users', label: 'Usuários & Permissões', icon: <Users size={14} /> },
              { id: 'partners', label: 'Área dos Sócios', icon: <DollarSign size={14} /> },
              { id: 'prospector', label: 'KVB Business Finder', icon: <Compass size={14} /> },
              { id: 'vault', label: 'Central de Documentos', icon: <FolderLock size={14} /> },
              { id: 'audit', label: 'Auditoria Geral', icon: <History size={14} /> },
              { id: 'security', label: 'Login & Segurança', icon: <Key size={14} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-4 text-xs font-black tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'border-indigo-600 text-slate-900 font-extrabold' 
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Views */}

          {/* 1. DASHBOARD GLOBAL */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6" id="view-dashboard-global">
              
              {/* Core Cards KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Contas Multi-Tenant</span>
                    <Users size={16} className="text-indigo-600" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-2xl font-black text-slate-800">128 Clientes</span>
                    <div className="flex justify-between text-[10px] font-mono font-bold pt-1 text-slate-500">
                      <span className="text-emerald-600">115 Ativos</span>
                      <span className="text-amber-500">8 Teste</span>
                      <span className="text-rose-500">5 Churn</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Faturamento Mensal (MRR)</span>
                    <DollarSign size={16} className="text-emerald-600" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-2xl font-black text-slate-800">R$ 142.300</span>
                    <div className="text-[10px] text-slate-400 font-mono font-bold flex justify-between">
                      <span>Anual (ARR): R$ 1.7M</span>
                      <span className="text-emerald-600">+12% este mês</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Consumo de IA Global</span>
                    <Bot size={16} className="text-indigo-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-black text-slate-800">72.5%</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">1.45M tokens / 2M</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[72.5%]"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Armazenamento Cloud</span>
                    <Database size={16} className="text-cyan-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-black text-slate-800">42.0%</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">4.2 TB / 10 TB</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full w-[42%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Corporate Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left: Top Services and Conversion KPIs */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 lg:col-span-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">Estatísticas Operacionais KVB System</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 block font-bold font-mono uppercase">Ticket Médio</span>
                      <span className="text-lg font-black text-slate-800">R$ 1.111,00</span>
                      <span className="text-[9px] text-emerald-600 block font-bold font-mono">Alto valor percebido</span>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 block font-bold font-mono uppercase">Conversão Comercial</span>
                      <span className="text-lg font-black text-slate-800">32%</span>
                      <span className="text-[9px] text-indigo-600 block font-bold font-mono">432 propostas enviadas</span>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 block font-bold font-mono uppercase">Projetos Ativos</span>
                      <span className="text-lg font-black text-slate-800">12 / 186 entregues</span>
                      <span className="text-[9px] text-cyan-600 block font-bold font-mono">92% integrações ativas</span>
                    </div>
                  </div>

                  {/* Top Services chart representation */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-slate-400 font-bold font-mono uppercase block">Rank de Serviços mais Vendidos</span>
                    {[
                      { name: 'Automação Evolution API + WhatsApp', share: '45%', sales: '58 contas' },
                      { name: 'Sites de Alta Performance + SEO', share: '30%', sales: '39 contas' },
                      { name: 'Gestão de Tráfego Pago Inteligente', share: '15%', sales: '19 contas' },
                      { name: 'CRM customizado com memórias IA', share: '10%', sales: '12 contas' }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>{item.name}</span>
                          <span>{item.share} ({item.sales})</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full bg-indigo-600`} style={{ width: item.share }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Cloud Resources & Support queue status */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">Fila de Chamados & Suporte</h4>
                  
                  <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">3 Chamados em Aberto</h5>
                      <p className="text-[10px] text-slate-500 leading-tight">Tempo médio de resposta: 12 min</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Uptime dos Servidores</h5>
                      <p className="text-[10px] text-slate-500 leading-tight">Múltiplas regiões ativas: 99.99%</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold font-mono uppercase block">Infraestrutura em n8n</span>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                      <span>Execuções/dia:</span>
                      <span className="font-mono">14.250</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                      <span>WhatsApp Nodes:</span>
                      <span className="font-mono text-indigo-600">92 canais conectados</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. GESTÃO DE EMPRESAS */}
          {activeTab === 'companies' && (
            <div className="space-y-6" id="view-gestao-empresas">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-black text-slate-800">Isolamento Multi-Tenant Corporativo</h3>
                  <p className="text-xs text-slate-400">Banco de dados logicamente separado. Nenhuma empresa visualiza dados de terceiros.</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingCompany(null);
                    setCompanyForm({
                      name: '', tradeName: '', legalName: '', cnpj: '', niche: 'Restaurantes',
                      email: '', whatsapp: '', phone: '', address: '', city: 'São Paulo', state: 'SP',
                      cep: '', website: '', socialMedia: '', plan: 'Starter', status: 'Ativo'
                    });
                    setIsCompanyModalOpen(true);
                  }}
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} /> Registrar Nova Empresa
                </button>
              </div>

              {/* Companies Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-black border-b border-slate-200">
                        <th className="p-4 uppercase font-mono tracking-wider">Empresa / Plano</th>
                        <th className="p-4 uppercase font-mono tracking-wider">CNPJ / Razão Social</th>
                        <th className="p-4 uppercase font-mono tracking-wider">Segmento / Localização</th>
                        <th className="p-4 uppercase font-mono tracking-wider">Contatos</th>
                        <th className="p-4 uppercase font-mono tracking-wider text-center">Status</th>
                        <th className="p-4 uppercase font-mono tracking-wider text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {companies.map(comp => (
                        <tr key={comp.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">{comp.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono italic">Subdomínio: {comp.name.toLowerCase().replace(/\s+/g, '')}.kvbsystem.com</span>
                              <span className={`mt-1 py-0.5 px-2 rounded-full text-[9px] font-black w-fit ${
                                comp.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                                comp.plan === 'Business' ? 'bg-amber-100 text-amber-700' :
                                comp.plan === 'Pro' ? 'bg-indigo-100 text-indigo-700' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                Plano {comp.plan}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="text-slate-800">{comp.legalName}</span>
                              <span className="text-[10px] text-slate-400 font-mono font-bold">CNPJ: {comp.cnpj}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="text-slate-800">{comp.niche}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{comp.city} - {comp.state}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="text-slate-800">{comp.email}</span>
                              <span className="text-[10px] text-emerald-600 font-bold">{comp.whatsapp}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                              comp.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700' :
                              comp.status === 'Teste' ? 'bg-indigo-50 text-indigo-700' :
                              comp.status === 'Suspenso' ? 'bg-rose-50 text-rose-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {comp.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex gap-1 justify-end">
                              <button 
                                onClick={() => startEditCompany(comp)}
                                className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-md transition-colors"
                                title="Editar Cadastro"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button 
                                onClick={() => handleDeleteCompany(comp.id, comp.name)}
                                className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-md transition-colors"
                                title="Excluir Empresa"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Company Create/Edit Modal */}
              {isCompanyModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="p-5 bg-indigo-600 text-white flex justify-between items-center shrink-0">
                      <h3 className="text-sm font-black uppercase tracking-wider font-mono">
                        {editingCompany ? `Editar Empresa: ${editingCompany.name}` : 'Registrar Nova Empresa Multi-Tenant'}
                      </h3>
                      <button onClick={() => setIsCompanyModalOpen(false)} className="text-white hover:bg-indigo-700 p-1 rounded">
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCompany} className="p-6 overflow-y-auto space-y-4 text-xs max-h-[calc(90vh-140px)]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Nome Fantasia / Simulado</label>
                          <input type="text" required value={companyForm.name} onChange={e => setCompanyForm({...companyForm, name: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Razão Social</label>
                          <input type="text" required value={companyForm.legalName} onChange={e => setCompanyForm({...companyForm, legalName: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">CNPJ</label>
                          <input type="text" required placeholder="00.000.000/0001-00" value={companyForm.cnpj} onChange={e => setCompanyForm({...companyForm, cnpj: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Segmento / Nicho</label>
                          <select value={companyForm.niche} onChange={e => setCompanyForm({...companyForm, niche: e.target.value})} className="w-full p-2 bg-white border border-slate-200 rounded-lg">
                            {NICHES_LIST.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Plano Contratado</label>
                          <select value={companyForm.plan} onChange={e => setCompanyForm({...companyForm, plan: e.target.value})} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold">
                            <option value="Starter">Starter</option>
                            <option value="Pro">Pro</option>
                            <option value="Business">Business</option>
                            <option value="Enterprise">Enterprise</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Status da Conta</label>
                          <select value={companyForm.status} onChange={e => setCompanyForm({...companyForm, status: e.target.value})} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold">
                            <option value="Ativo">Ativo</option>
                            <option value="Teste">Teste</option>
                            <option value="Suspenso">Suspenso</option>
                            <option value="Cancelado">Cancelado</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">E-mail Comercial</label>
                          <input type="email" required value={companyForm.email} onChange={e => setCompanyForm({...companyForm, email: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">WhatsApp Comercial</label>
                          <input type="text" required placeholder="(11) 99999-9999" value={companyForm.whatsapp} onChange={e => setCompanyForm({...companyForm, whatsapp: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Telefone Fixo</label>
                          <input type="text" placeholder="(11) 3333-3333" value={companyForm.phone} onChange={e => setCompanyForm({...companyForm, phone: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="font-bold text-slate-600 block mb-1">Endereço Completo</label>
                          <input type="text" value={companyForm.address} onChange={e => setCompanyForm({...companyForm, address: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Cidade</label>
                          <input type="text" value={companyForm.city} onChange={e => setCompanyForm({...companyForm, city: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Estado</label>
                          <input type="text" maxLength={2} value={companyForm.state} onChange={e => setCompanyForm({...companyForm, state: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Site</label>
                          <input type="text" placeholder="www.exemplo.com" value={companyForm.website} onChange={e => setCompanyForm({...companyForm, website: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Instagram Comercial</label>
                          <input type="text" placeholder="@exemplo" value={companyForm.socialMedia} onChange={e => setCompanyForm({...companyForm, socialMedia: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">CEP</label>
                          <input type="text" placeholder="00000-000" value={companyForm.cep} onChange={e => setCompanyForm({...companyForm, cep: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setIsCompanyModalOpen(false)} className="py-2 px-4 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200">Cancelar</button>
                        <button type="submit" className="py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Salvar Empresa</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. GESTÃO DE USUÁRIOS & PERMISSÕES */}
          {activeTab === 'users' && (
            <div className="space-y-6" id="view-usuarios-permissoes">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left: User list & Invite Form */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 lg:col-span-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-black text-slate-800">Operadores e Equipes</h3>
                      <p className="text-xs text-slate-400">Filtrado pela empresa selecionada no isolamento lógico.</p>
                    </div>

                    <div className="flex gap-2">
                      <select 
                        value={selectedUserCompanyId} 
                        onChange={e => setSelectedUserCompanyId(e.target.value)}
                        className="text-[11px] p-2 bg-white border border-slate-200 rounded-lg font-bold"
                      >
                        {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>

                      <button 
                        onClick={() => {
                          setEditingUser(null);
                          setUserForm({
                            name: '', role: 'Funcionário', department: 'Atendimento', email: '',
                            phone: '', login: '', status: 'Ativo', companyId: selectedUserCompanyId
                          });
                          setIsUserModalOpen(true);
                        }}
                        className="py-2 px-3 bg-indigo-600 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={13} /> Convidar
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto pr-1">
                    {users.filter(u => u.companyId === selectedUserCompanyId).map(usr => (
                      <div key={usr.id} className="py-3 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                          <img src={usr.photo} alt={usr.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-bold text-slate-900 block">{usr.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold block">{usr.email} • {usr.phone}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] bg-slate-100 text-slate-600 py-0.5 px-2 rounded font-black uppercase font-mono">{usr.role}</span>
                              <span className="text-[9px] bg-indigo-50 text-indigo-600 py-0.5 px-2 rounded font-bold font-mono">{usr.department}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${usr.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {usr.status}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">Acesso: {usr.lastAccess}</span>
                          <div className="flex gap-1">
                            <button onClick={() => startEditUser(usr)} className="p-1 hover:bg-slate-100 rounded text-slate-600"><Edit3 size={12} /></button>
                            <button onClick={() => {
                              if (confirm('Remover este usuário?')) {
                                setUsers(prev => prev.filter(u => u.id !== usr.id));
                                onAddLog(`Removeu o operador ${usr.name}`);
                              }
                            }} className="p-1 hover:bg-rose-50 rounded text-rose-600"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {users.filter(u => u.companyId === selectedUserCompanyId).length === 0 && (
                      <div className="py-8 text-center text-slate-400">Nenhum usuário cadastrado para esta empresa.</div>
                    )}
                  </div>
                </div>

                {/* Right: Granular Access Matrix Panel */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-black text-slate-800">Matriz de Permissões</h3>
                    <p className="text-xs text-slate-400">Configure permissões exclusivas para cada perfil de cargo.</p>
                  </div>

                  <div className="flex gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block font-mono self-center">Cargo Alvo:</label>
                    <select 
                      value={selectedPermissionRole} 
                      onChange={e => setSelectedPermissionRole(e.target.value)}
                      className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold w-full"
                    >
                      <option value="Gerente">Gerente (Operacional)</option>
                      <option value="Marketing">Marketing (Criativos)</option>
                    </select>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 text-xs">
                    {screensList.slice(0, 6).map(screen => {
                      const permissions = (permissionMatrix[selectedPermissionRole] || {})[screen] || [false, false, false, false, false, false, false];
                      return (
                        <div key={screen} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <span className="font-bold text-slate-800 font-mono block">{screen.toUpperCase()}</span>
                          <div className="grid grid-cols-4 gap-1.5 text-[9px] font-bold">
                            {actionsList.slice(0, 4).map((act, i) => (
                              <label key={act} className="flex items-center gap-1 cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={permissions[i]} 
                                  onChange={() => handleToggleMatrixPermission(selectedPermissionRole, screen, i)}
                                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 scale-90"
                                />
                                <span className={permissions[i] ? 'text-indigo-600' : 'text-slate-500'}>{act}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* User Create/Edit Modal */}
              {isUserModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="p-5 bg-indigo-600 text-white flex justify-between items-center shrink-0">
                      <h3 className="text-sm font-black uppercase tracking-wider font-mono">
                        {editingUser ? `Editar Operador: ${editingUser.name}` : 'Registrar Novo Operador / Usuário'}
                      </h3>
                      <button onClick={() => setIsUserModalOpen(false)} className="text-white hover:bg-indigo-700 p-1 rounded">
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleSaveUser} className="p-6 overflow-y-auto space-y-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Nome do Operador</label>
                        <input type="text" required value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">E-mail</label>
                          <input type="email" required value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Telefone</label>
                          <input type="text" placeholder="(11) 99999-9999" value={userForm.phone} onChange={e => setUserForm({...userForm, phone: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Login (Username)</label>
                          <input type="text" required placeholder="ex: jorge.silva" value={userForm.login} onChange={e => setUserForm({...userForm, login: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Departamento</label>
                          <input type="text" required placeholder="ex: Suporte, Vendas" value={userForm.department} onChange={e => setUserForm({...userForm, department: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Cargo / Role</label>
                          <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} className="w-full p-2 bg-white border border-slate-200 rounded-lg">
                            <option value="Proprietário">Proprietário</option>
                            <option value="Sócios">Sócio</option>
                            <option value="Gerentes">Gerente</option>
                            <option value="Vendedor">Vendedor</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Funcionário">Funcionário</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Empresa Vinculada</label>
                          <select value={userForm.companyId} onChange={e => setUserForm({...userForm, companyId: e.target.value})} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold">
                            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setIsUserModalOpen(false)} className="py-2 px-4 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200">Cancelar</button>
                        <button type="submit" className="py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Concluir Cadastro</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. ÁREA DOS SÓCIOS */}
          {activeTab === 'partners' && (
            <div className="space-y-6" id="view-area-socios">
              {currentUserRole !== 'Administrador' && currentUserRole !== 'Sócio' ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md mx-auto text-center space-y-4">
                  <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-2xs">
                    <Lock size={22} className="animate-bounce" />
                  </div>
                  <h3 className="text-base font-black text-slate-800">Acesso Restrito - Área de Sócios</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Este painel exibe dados de distribuição de lucros, custos operacionais e margens consolidadas do KVB System. Disponível apenas para diretores e sócios.
                  </p>
                  <p className="text-[10px] text-indigo-600 font-bold font-mono italic">
                    Dica: Use o seletor "Simular Perfil" na barra lateral esquerda para mudar para "Sócio" ou "Administrador" e visualizar.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Financial KPIs row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Lucro Líquido Distribuível</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-black text-emerald-600">R$ 82.450,00</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black font-mono">57.9% Margem</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-mono">Projeção de pagamento aos Sócios: Dia 10 do mês corrente</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Folha de Pagamento KVB</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-black text-slate-800">R$ 38.000,00</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold font-mono">4 Especialistas</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-mono">Inclusas comissões de assessoria: R$ 12.500,00</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Investimento em Infraestrutura</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-black text-indigo-600">R$ 20.000,00</span>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold font-mono">Expansão IA</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-mono">Contratados servidores adicionais de processamento GPT-4o / Claude</p>
                    </div>
                  </div>

                  {/* Strategic targets & planning */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">Custos Operacionais Detalhados</h4>
                      <div className="space-y-2.5 text-xs text-slate-600">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-700">Servidores Cloud (AWS + Vercel):</span>
                          <span className="font-mono">R$ 4.800,00</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-700">Especialistas & Desenvolvimento:</span>
                          <span className="font-mono">R$ 25.500,00</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-700">Licenças e APIs (n8n, Evolution, OpenAI):</span>
                          <span className="font-mono">R$ 6.200,00</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-700">Marketing e Prospecção (Google Ads):</span>
                          <span className="font-mono">R$ 15.000,00</span>
                        </div>
                        <div className="flex justify-between font-black text-slate-900 border-t border-slate-200 pt-2 text-sm">
                          <span>Custos Globais Totais:</span>
                          <span className="font-mono">R$ 51.500,00</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">Planejamento Estratégico (Metas Q3-2026)</h4>
                      <div className="space-y-3">
                        {[
                          { task: 'Alcançar MRR de R$ 200.000,00 até Setembro', pct: '71%', done: false },
                          { task: 'Migração completa de banco de dados para PostgreSQL isolado', pct: '100%', done: true },
                          { task: 'Lançamento de suporte unificado via WhatsApp com tempo <5min', pct: '40%', done: false }
                        ].map((m, i) => (
                          <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                            <div className="flex justify-between items-baseline font-bold text-slate-700">
                              <span className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${m.done ? 'bg-emerald-500' : 'bg-indigo-500'}`}></span>
                                {m.task}
                              </span>
                              <span className="font-mono">{m.pct}</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full ${m.done ? 'bg-emerald-500' : 'bg-indigo-600'}`} style={{ width: m.pct }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* 5. KVB BUSINESS FINDER */}
          {activeTab === 'prospector' && (
            <div className="space-y-6" id="view-prospecção-global">
              
              {/* HEADER DO MÓDULO */}
              <div className="bg-gradient-to-r from-indigo-950 to-slate-900 p-6 rounded-2xl border border-indigo-900 text-white space-y-2 shadow-md">
                <div className="flex items-center gap-2">
                  <Compass className="text-amber-400 animate-spin" style={{ animationDuration: '8s' }} size={24} />
                  <h3 className="text-base font-black uppercase tracking-wider font-mono text-amber-400">KVB Business Finder</h3>
                </div>
                <p className="text-xs text-indigo-200 leading-relaxed max-w-3xl">
                  Encontre empresas reais em qualquer região do país através de integrações oficiais e fontes públicas legalmente autorizadas (Google Business Profile, Whois, CNPJ público e mídias sociais autorizadas). Descubra vulnerabilidades digitais e converta leads frios em contratos recorrentes da KVB.
                </p>
                <div className="flex gap-4 pt-1.5 text-[10px] text-indigo-300 font-mono">
                  <span className="flex items-center gap-1">🟢 Conformidade LGPD / GDPR Ativa</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">🛡️ APIs Oficiais Autorizadas</span>
                </div>
              </div>

              {/* RADAR DE OPORTUNIDADES */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="text-amber-500" size={15} />
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider font-mono">Radar diário de Oportunidades</h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {[
                    {
                      id: 'radar-new',
                      title: 'Novas Empresas',
                      desc: 'Abertas recentemente',
                      metric: '18',
                      badge: 'Região SP-Sul',
                      color: 'border-l-4 border-l-emerald-500',
                      actionText: 'Varrer Recentes',
                      action: () => {
                        setFilterRecentlyOpened(true);
                        setFilterWebsiteStatus('all');
                        setFilterVerified('all');
                        setIsCustomNicheActive(false);
                        setSelectedNiche('Restaurantes');
                        triggerProspecting();
                      }
                    },
                    {
                      id: 'radar-no-site',
                      title: 'Sem Site Ativo',
                      desc: 'Empresas sem domínio',
                      metric: '42',
                      badge: 'Vulnerabilidade Crítica',
                      color: 'border-l-4 border-l-rose-500',
                      actionText: 'Focar Sem Site',
                      action: () => {
                        setFilterWebsiteStatus('no');
                        setFilterRecentlyOpened(false);
                        setFilterVerified('all');
                        triggerProspecting();
                      }
                    },
                    {
                      id: 'radar-low-rating',
                      title: 'Avaliações Baixas',
                      desc: 'Nota < 4.0 no Maps',
                      metric: '15',
                      badge: 'Reputação sob risco',
                      color: 'border-l-4 border-l-amber-500',
                      actionText: 'Corrigir Notas',
                      action: () => {
                        setFilterRatingMax('low');
                        setFilterWebsiteStatus('all');
                        setFilterRecentlyOpened(false);
                        triggerProspecting();
                      }
                    },
                    {
                      id: 'radar-poor-presence',
                      title: 'Pouca Presença',
                      desc: 'Sem redes ativas',
                      metric: '27',
                      badge: 'Oportunidade KVB',
                      color: 'border-l-4 border-l-purple-500',
                      actionText: 'Varrer Presença',
                      action: () => {
                        setFilterHasSocial(true);
                        setFilterWebsiteStatus('all');
                        setFilterRecentlyOpened(false);
                        triggerProspecting();
                      }
                    },
                    {
                      id: 'radar-no-auto',
                      title: 'Sem Automação',
                      desc: 'Sem chatbot whatsapp',
                      metric: '11',
                      badge: 'Conversão Comercial',
                      color: 'border-l-4 border-l-indigo-500',
                      actionText: 'Varrer Automação',
                      action: () => {
                        setFilterHasWhatsapp(false);
                        setFilterWebsiteStatus('all');
                        setFilterRecentlyOpened(false);
                        triggerProspecting();
                      }
                    }
                  ].map(item => (
                    <div key={item.id} className={`bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3 ${item.color}`}>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-mono font-bold block leading-none">{item.title}</span>
                        <span className="text-xs text-slate-500 text-[10px] block">{item.desc}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-black text-slate-800 tracking-tight">{item.metric}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black font-mono uppercase tracking-wider">{item.badge}</span>
                      </div>
                      <button 
                        onClick={item.action}
                        className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg text-[9px] transition-all text-center block cursor-pointer"
                      >
                        {item.actionText}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FILTROS E PESQUISA */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-sm font-black text-slate-800 leading-none">Configurações da Pesquisa de Leads</h4>
                    <span className="text-xs text-slate-400">Configure o segmento, geolocalização e critérios de filtros de prospecção.</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setFilterCity('São Paulo');
                        setFilterState('SP');
                        setFilterBairro('');
                        setFilterCep('');
                        setFilterRadius('10');
                        setFilterWebsiteStatus('all');
                        setFilterRatingMax('all');
                        setFilterReviewsQty('all');
                        setFilterVerified('all');
                        setFilterRecentlyOpened(false);
                        setFilterHasWhatsapp(false);
                        setFilterHasEmail(false);
                        setFilterHasPhone(false);
                        setFilterHasSocial(false);
                        setIsCustomNicheActive(false);
                        setSelectedNiche('Restaurantes');
                        setCustomNiche('');
                      }}
                      className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  {/* Nicho selector */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-slate-600 block">Nicho de Mercado</label>
                      <label className="text-[10px] text-indigo-600 font-bold flex items-center gap-1 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isCustomNicheActive} 
                          onChange={() => setIsCustomNicheActive(!isCustomNicheActive)}
                          className="rounded border-slate-300 scale-90"
                        />
                        Outro nicho
                      </label>
                    </div>

                    {isCustomNicheActive ? (
                      <input 
                        type="text" 
                        placeholder="Ex: Autoescola, Tapeçaria..."
                        value={customNiche}
                        onChange={e => setCustomNiche(e.target.value)}
                        className="w-full p-2.5 bg-indigo-50/50 border border-indigo-200 rounded-lg text-indigo-900 font-bold focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    ) : (
                      <select 
                        value={selectedNiche} 
                        onChange={e => setSelectedNiche(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
                      >
                        {NICHES_LIST.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    )}
                  </div>

                  {/* Cidade */}
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Cidade Alvo</label>
                    <input 
                      type="text" 
                      value={filterCity}
                      onChange={e => setFilterCity(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none font-semibold text-slate-800"
                    />
                  </div>

                  {/* Estado / Bairro */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="font-bold text-slate-600 block mb-1">UF</label>
                      <input 
                        type="text" 
                        maxLength={2}
                        value={filterState}
                        onChange={e => setFilterState(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg uppercase text-center focus:ring-1 focus:ring-indigo-500 outline-none font-mono font-bold"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="font-bold text-slate-600 block mb-1">Bairro</label>
                      <input 
                        type="text" 
                        placeholder="Opcional"
                        value={filterBairro}
                        onChange={e => setFilterBairro(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  {/* CEP & Raio */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">CEP Alvo</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 01000-000"
                        value={filterCep}
                        onChange={e => setFilterCep(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none font-mono text-center text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">Raio de Pesquisa</label>
                      <select 
                        value={filterRadius} 
                        onChange={e => setFilterRadius(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                      >
                        <option value="1">1 km</option>
                        <option value="5">5 km</option>
                        <option value="10">10 km (Padrão)</option>
                        <option value="25">25 km</option>
                        <option value="50">50 km</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* FILTROS AVANÇADOS / CRITÉRIOS INTELIGENTES */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold font-mono uppercase block tracking-wider">Filtros Avançados de Qualificação Comercial</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    
                    {/* Site status */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 block text-[10px] uppercase font-mono">Presença de Website</label>
                      <select 
                        value={filterWebsiteStatus} 
                        onChange={e => setFilterWebsiteStatus(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                      >
                        <option value="all">Qualquer Estado de Site</option>
                        <option value="no">Sem Site Profissional (Vulnerável ❌)</option>
                        <option value="yes">Com Site Ativo</option>
                      </select>
                    </div>

                    {/* Google Business verified */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 block text-[10px] uppercase font-mono">Status no Google Meu Negócio</label>
                      <select 
                        value={filterVerified} 
                        onChange={e => setFilterVerified(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                      >
                        <option value="all">Todas as Fichas</option>
                        <option value="no">Não-reivindicada / Ficha Crua (⚠️)</option>
                        <option value="yes">Verificada / Reivindicada</option>
                      </select>
                    </div>

                    {/* Maps Rating */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 block text-[10px] uppercase font-mono">Nota Média (Reputação)</label>
                      <select 
                        value={filterRatingMax} 
                        onChange={e => setFilterRatingMax(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                      >
                        <option value="all">Todas as Notas</option>
                        <option value="low">Nota baixa / Crítica (&lt; 4.0 🚨)</option>
                        <option value="high">Nota excelente (&gt; 4.5 ⭐)</option>
                      </select>
                    </div>

                    {/* Reviews Count */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 block text-[10px] uppercase font-mono">Volume de Avaliações</label>
                      <select 
                        value={filterReviewsQty} 
                        onChange={e => setFilterReviewsQty(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                      >
                        <option value="all">Qualquer volume</option>
                        <option value="few">Pouquíssimas avaliações (&lt; 15)</option>
                        <option value="many">Ficha consolidada (&gt; 100)</option>
                      </select>
                    </div>

                  </div>

                  {/* Checkbox extra filters */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs pt-2">
                    
                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={filterRecentlyOpened}
                        onChange={() => setFilterRecentlyOpened(!filterRecentlyOpened)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 scale-95"
                      />
                      <div>
                        <span className="font-bold text-slate-700 block text-[10px] leading-tight">Empresa Recém-aberta</span>
                        <span className="text-[8px] text-slate-400 font-mono">CNPJ recente</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={filterHasWhatsapp}
                        onChange={() => setFilterHasWhatsapp(!filterHasWhatsapp)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 scale-95"
                      />
                      <div>
                        <span className="font-bold text-slate-700 block text-[10px] leading-tight">Possui WhatsApp Público</span>
                        <span className="text-[8px] text-slate-400 font-mono">Contato telefônico</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={filterHasEmail}
                        onChange={() => setFilterHasEmail(!filterHasEmail)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 scale-95"
                      />
                      <div>
                        <span className="font-bold text-slate-700 block text-[10px] leading-tight">Possui E-mail Público</span>
                        <span className="text-[8px] text-slate-400 font-mono">Disponível online</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={filterHasPhone}
                        onChange={() => setFilterHasPhone(!filterHasPhone)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 scale-95"
                      />
                      <div>
                        <span className="font-bold text-slate-700 block text-[10px] leading-tight">Possui Telefone Fixo</span>
                        <span className="text-[8px] text-slate-400 font-mono">Linha comercial</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={filterHasSocial}
                        onChange={() => setFilterHasSocial(!filterHasSocial)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 scale-95"
                      />
                      <div>
                        <span className="font-bold text-slate-700 block text-[10px] leading-tight">Possui Redes Sociais</span>
                        <span className="text-[8px] text-slate-400 font-mono">Instagram indexado</span>
                      </div>
                    </label>

                  </div>
                </div>

                {/* BOTÃO EXECUTAR VARREDURA */}
                <div className="pt-2">
                  <button 
                    onClick={triggerProspecting}
                    disabled={isProspecting}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Search size={15} />
                    {isProspecting ? 'CONECTANDO E ANALISANDO REQUISITOS PÚBLICOS...' : 'INICIAR PROSPECÇÃO LEGAL EM FONTES PÚBLICAS'}
                  </button>
                </div>
              </div>

              {/* BARRA DE PROGRESSO E LOGS DE VARREDURA */}
              {isProspecting && (
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl font-mono text-[10px] text-indigo-300 space-y-3 shadow-inner">
                  <div className="flex justify-between text-white font-bold text-xs">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="animate-spin text-amber-500" /> 
                      Análise Autônoma de Conformidade: [{isCustomNicheActive && customNiche ? customNiche : selectedNiche}]
                    </span>
                    <span>{prospectingProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full transition-all duration-300" style={{ width: `${prospectingProgress}%` }}></div>
                  </div>
                  <div className="space-y-1 text-slate-400 max-h-[140px] overflow-y-auto pr-1">
                    {prospectingLogs.map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-indigo-500/70 select-none">&gt;&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LISTA DE RESULTADOS E PAINEL DE DIAGNÓSTICO */}
              {leads.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Leads Found */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 lg:col-span-2 flex flex-col h-fit">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">Empresas Encontradas ({leads.length})</h4>
                      <span className="text-[10px] text-slate-500 font-mono bg-slate-100 py-0.5 px-2 rounded-full">Filtro de Localidade: {filterCity}</span>
                    </div>
                    
                    <div className="divide-y divide-slate-100">
                      {leads.map(lead => {
                        const isAdded = crmLeadsAdded.includes(lead.id);
                        return (
                          <div key={lead.id} className="py-4 flex justify-between items-center text-xs hover:bg-slate-50/40 px-2 rounded-lg transition-colors">
                            <div className="space-y-1.5 min-w-0 pr-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-900 text-sm">{lead.name}</span>
                                <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-sm font-black text-[9px] font-mono border border-indigo-100">Vulnerabilidade: {lead.score}%</span>
                                {isAdded && (
                                  <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-sm font-black text-[8px] font-mono border border-emerald-100 flex items-center gap-0.5">
                                    <Check size={8} /> NO CRM
                                  </span>
                                )}
                              </div>
                              <span className="text-slate-400 block font-mono font-bold text-[10px] leading-tight">
                                {lead.company} • Tel: {lead.phone} • {lead.bairro}, {lead.city} • CEP {lead.cep}
                              </span>
                              
                              <div className="flex gap-1.5 flex-wrap pt-0.5">
                                {lead.vulnerabilities.noSite ? (
                                  <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded text-[8px] font-black border border-rose-100 uppercase tracking-wide">Sem Site ❌</span>
                                ) : (
                                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[8px] font-bold border border-emerald-100 flex items-center gap-1 uppercase tracking-wide">
                                    <Globe size={10} /> Site Ativo
                                  </span>
                                )}
                                {lead.vulnerabilities.noGmb && (
                                  <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded text-[8px] font-black border border-rose-100 uppercase tracking-wide">Não-Verificada no Maps ❌</span>
                                )}
                                {lead.vulnerabilities.lowSocial && (
                                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[8px] font-bold border border-amber-100 uppercase tracking-wide">Rede Social Inativa ⚠️</span>
                                )}
                                {lead.vulnerabilities.oldSite && (
                                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[8px] font-bold border border-amber-100 uppercase tracking-wide">Site Legado/Lento ⚠️</span>
                                )}
                                {lead.isRecentlyOpened && (
                                  <span className="bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded text-[8px] font-black border border-cyan-100 uppercase tracking-wide">Recém-aberta 🆕</span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5 items-end shrink-0 ml-2">
                              <span className="text-[10px] text-slate-500 font-bold font-mono flex items-center gap-1">
                                <Award size={12} className="text-amber-500" />
                                {lead.rating} ({lead.reviewsCount} avaliações)
                              </span>
                              <button 
                                onClick={() => {
                                  setSelectedLeadAudit(lead);
                                  onAddLog(`IA KVB Business Finder gerou diagnóstico detalhado de presença digital para o lead: ${lead.name}`);
                                }}
                                className={`py-1.5 px-3 font-black rounded-lg text-[10px] transition-all flex items-center gap-1 cursor-pointer shadow-3xs ${
                                  selectedLeadAudit?.id === lead.id 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                                }`}
                              >
                                <Bot size={12} />
                                {selectedLeadAudit?.id === lead.id ? 'Auditoria Ativa' : 'IA Diagnóstico'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: AI Diagnóstico e Ações CRM */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Bot className="text-amber-500" size={20} />
                      <div>
                        <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider font-mono leading-none">IA Diagnóstico Comercial</h4>
                        <span className="text-[9px] text-slate-400 leading-tight block mt-0.5">Analise vulnerabilidades digitais e dispare fluxos de vendas integrados.</span>
                      </div>
                    </div>

                    {selectedLeadAudit ? (
                      <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                        <div className="space-y-0.5 border-b border-slate-100 pb-2">
                          <span className="text-[9px] text-amber-600 font-mono font-black uppercase block leading-none">Relatório de Vulnerabilidade Crítica</span>
                          <h5 className="font-black text-slate-800 text-sm mt-1">{selectedLeadAudit.name}</h5>
                          <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                            <span>Score: {selectedLeadAudit.score}%</span>
                            <span className="font-mono">IP/Whois Verificado</span>
                          </div>
                        </div>

                        {/* Detalhes de Presença Digital */}
                        <div className="space-y-2.5">
                          <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase tracking-wider">Presença Digital e Diagnósticos:</span>
                          
                          <div className="space-y-2 text-[11px] leading-snug">
                            <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg">
                              <span className="font-bold text-slate-800 block mb-0.5">🌐 Presença de Website:</span>
                              {selectedLeadAudit.vulnerabilities.noSite ? (
                                <span className="text-rose-700">⚠️ Crítico: Sem domínio registrado. Clientes locais não encontram a empresa organicamente. Perda estimada de 75% dos cliques de busca regional.</span>
                              ) : (
                                <span className="text-amber-700">⚠️ Alerta: Domínio legado com pontuação de performance mobile móvel baixa (32/100). Sem otimização SEO e carregamento defasado em 4G.</span>
                              )}
                            </div>

                            <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg">
                              <span className="font-bold text-slate-800 block mb-0.5">📍 Ficha Google Meu Negócio:</span>
                              {selectedLeadAudit.vulnerabilities.noGmb ? (
                                <span className="text-rose-700">⚠️ Crítico: Ficha não-reivindicada ou abandonada no Google Maps. Nota baixa ({selectedLeadAudit.rating}) com comentários críticos sem resposta oficial.</span>
                              ) : (
                                <span className="text-indigo-700">ℹ️ Moderado: Ficha ativa com {selectedLeadAudit.reviewsCount} avaliações, mas sem posts promocionais ou funil de atendimento integrado.</span>
                              )}
                            </div>

                            <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg">
                              <span className="font-bold text-slate-800 block mb-0.5">📱 Frequência de Publicações (Mídias):</span>
                              {selectedLeadAudit.vulnerabilities.lowSocial ? (
                                <span className="text-amber-700">⚠️ Alerta: Último post há mais de 60 dias no perfil social indexado. Falta de presença visual transmite falta de funcionamento.</span>
                              ) : (
                                <span className="text-emerald-700">✓ Adequado: Perfil ativo e atualizado frequente no Instagram ({selectedLeadAudit.socialMedia}).</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Soluções Recomendadas KVB */}
                        <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1.5">
                          <span className="text-[9px] text-indigo-800 font-mono font-black uppercase tracking-wider block">Soluções Recomendadas KVB:</span>
                          <span className="bg-indigo-600 text-white py-1 px-2.5 rounded font-bold block text-center text-[10px] font-mono">
                            ⚡ {selectedLeadAudit.vulnerabilities.noSite ? 'KVB Site Express + Automação Leads' : 'KVB Web Booster + Funil CRM'}
                          </span>
                          <p className="text-[10px] text-indigo-700 text-center font-medium leading-none mt-1">
                            Preço Recomendado: <strong className="font-mono">R$ 1.200/mês</strong> + Setup R$ 900
                          </p>
                        </div>

                        {/* Prioridade e Estimativa */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                          <div className={`p-2.5 border rounded-lg ${
                            selectedLeadAudit.score >= 80 
                              ? 'bg-rose-50 border-rose-100 text-rose-800' 
                              : 'bg-amber-50 border-amber-100 text-amber-800'
                          }`}>
                            <span>Prioridade Comercial:</span>
                            <span className="block font-mono text-xs font-black">
                              {selectedLeadAudit.score >= 80 ? '🚨 CRÍTICA' : '⚠️ ALTA'}
                            </span>
                          </div>
                          <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800">
                            <span>Conversão Estimada:</span>
                            <span className="block font-mono text-xs font-black">R$ 14.400 / Ano</span>
                          </div>
                        </div>

                        {/* INTERAÇÕES DE CRM INTEGRADAS */}
                        <div className="space-y-2 pt-3 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold font-mono uppercase block tracking-wider">Ações de Integração CRM</span>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {/* CRM Action 1: Add as Lead */}
                            {crmLeadsAdded.includes(selectedLeadAudit.id) ? (
                              <div className="p-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-150 text-center flex items-center justify-center gap-1 text-[10px]">
                                <Check size={12} /> Lead no CRM
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setCrmLeadsAdded(prev => [...prev, selectedLeadAudit.id]);
                                  onAddLog(`Importou o lead prospectado [${selectedLeadAudit.name}] com histórico de vulnerabilidade digital de ${selectedLeadAudit.score}% para o funil do CRM comercial.`);
                                  alert(`Lead ${selectedLeadAudit.name} cadastrado com sucesso! Disponível no funil comercial.`);
                                }}
                                className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg border border-indigo-200 transition-colors cursor-pointer text-[10px]"
                              >
                                Adicionar como Lead
                              </button>
                            )}

                            {/* CRM Action 2: Create Seller Task */}
                            {crmTasksCreated[selectedLeadAudit.id] ? (
                              <div className="p-2 bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 text-center text-[10px] truncate" title={crmTasksCreated[selectedLeadAudit.id].desc}>
                                ✓ Tarefa: {crmTasksCreated[selectedLeadAudit.id].seller}
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  const seller = prompt('Escolha o vendedor para atribuição (Carlos Santos / Ana Carolina):', 'Carlos Santos') || 'Carlos Santos';
                                  const desc = `Realizar contato de prospecção oferecendo ${selectedLeadAudit.vulnerabilities.noSite ? 'Criação de Site Express' : 'Automação WhatsApp KVB'}`;
                                  
                                  setCrmTasksCreated(prev => ({
                                    ...prev,
                                    [selectedLeadAudit.id]: { seller, desc, date: new Date().toLocaleDateString('pt-BR') }
                                  }));
                                  
                                  onAddLog(`Criou tarefa de follow-up para o vendedor [${seller}] abordar o lead [${selectedLeadAudit.name}] com foco em solucionar vulnerabilidade digital.`);
                                  alert(`Tarefa de prospecção criada com sucesso para ${seller}!`);
                                }}
                                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer text-[10px]"
                              >
                                Criar Tarefa Vendedor
                              </button>
                            )}

                            {/* CRM Action 3: Generate Proposal */}
                            {crmProposalsGenerated.includes(selectedLeadAudit.id) ? (
                              <div className="p-2 bg-amber-50 text-amber-700 font-bold rounded-lg border border-amber-150 text-center flex flex-col leading-none justify-center text-[9px]">
                                <span>✓ Proposta Gerada</span>
                                <span className="text-[7px] text-indigo-600 underline cursor-pointer mt-0.5 block" onClick={() => setActiveTab('vault')}>Ir para o Cofre</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  // Generates simulated contract proposals, inserting it directly inside documents local state
                                  const docId = `doc-finder-${Date.now()}`;
                                  const proposalName = `Proposta_Comercial_KVB_${selectedLeadAudit.name.replace(/\s/g, '_')}.pdf`;
                                  
                                  const newDoc = {
                                    id: docId,
                                    name: proposalName,
                                    date: new Date().toLocaleDateString('pt-BR'),
                                    size: '1.2 MB',
                                    type: 'Propostas',
                                    company: selectedLeadAudit.company
                                  };

                                  setDocuments(prev => [newDoc, ...prev]);
                                  setCrmProposalsGenerated(prev => [...prev, selectedLeadAudit.id]);
                                  onAddLog(`Gerou proposta comercial personalizada KVB para [${selectedLeadAudit.name}] baseada em diagnóstico automatizado e arquivou no cofre isolado.`);
                                  alert(`Proposta comercial personalizada "${proposalName}" gerada pela IA e arquivada com sucesso no Cofre de Documentos de Auditoria!`);
                                }}
                                className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg border border-amber-200 transition-colors cursor-pointer text-[10px]"
                              >
                                Gerar Proposta KVB
                              </button>
                            )}

                            {/* CRM Action 4: Schedule Follow-up */}
                            {crmFollowUpsScheduled[selectedLeadAudit.id] ? (
                              <div className="p-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-150 text-center text-[10px]">
                                ✓ Reunião: {crmFollowUpsScheduled[selectedLeadAudit.id]}
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  const rawDate = prompt('Selecione data e hora da reunião comercial com o lead:', 'Amanhã às 14:00h') || 'Amanhã às 14:00h';
                                  setCrmFollowUpsScheduled(prev => ({ ...prev, [selectedLeadAudit.id]: rawDate }));
                                  onAddLog(`Agendou reunião de apresentação da proposta comercial da KVB para o lead [${selectedLeadAudit.name}] em ${rawDate}.`);
                                  alert(`Apresentação da proposta agendada com sucesso para ${rawDate}!`);
                                }}
                                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer text-[10px]"
                              >
                                Agendar Reunião
                              </button>
                            )}
                          </div>

                          {/* Contact History timeline entry in diagnostic card */}
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase font-mono">
                              <span>Histórico de Contatos</span>
                              <button 
                                onClick={() => {
                                  const note = prompt('Escreva uma nota ou registro de contato:') || '';
                                  if (note) {
                                    setCrmContactHistory(prev => ({
                                      ...prev,
                                      [selectedLeadAudit.id]: [
                                        ...(prev[selectedLeadAudit.id] || []),
                                        `[${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}] ${note}`
                                      ]
                                    }));
                                    onAddLog(`Adicionou anotação de contato para o lead [${selectedLeadAudit.name}]: ${note}`);
                                  }
                                }}
                                className="text-indigo-600 hover:underline cursor-pointer text-[9px]"
                              >
                                + Add Registro
                              </button>
                            </div>

                            <div className="space-y-1 max-h-[80px] overflow-y-auto bg-slate-50 p-2 rounded-lg border border-slate-100 text-[9px] font-mono leading-normal text-slate-500">
                              {(crmContactHistory[selectedLeadAudit.id] || []).length > 0 ? (
                                (crmContactHistory[selectedLeadAudit.id] || []).map((entry, idx) => (
                                  <div key={idx} className="border-b border-slate-100 pb-1 last:border-0 last:pb-0">
                                    {entry}
                                  </div>
                                ))
                              ) : (
                                <span className="text-slate-400 italic block text-center">Nenhum histórico registrado de contatos.</span>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2 border border-dashed border-slate-200 rounded-xl">
                        <Compass className="text-slate-300 animate-bounce" size={24} />
                        <span>Selecione uma empresa na lista para auditar vulnerabilidades e abrir painel de vendas CRM.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. COFRE DE DOCUMENTOS */}
          {activeTab === 'vault' && (
            <div className="space-y-6" id="view-central-documentos">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-black text-slate-800">Cofre de Documentos Digitais Isolados</h3>
                  <p className="text-xs text-slate-400">Repositório criptografado de propostas, minutas, notas fiscais e comprovantes dos clientes.</p>
                </div>

                <div className="flex gap-2 items-center flex-wrap">
                  <input 
                    type="text" 
                    placeholder="Buscar documento..." 
                    value={docSearch}
                    onChange={e => setDocSearch(e.target.value)}
                    className="p-2 text-xs bg-white border border-slate-200 rounded-lg"
                  />

                  <select 
                    value={documentTypeFilter} 
                    onChange={e => setDocumentTypeFilter(e.target.value)}
                    className="p-2 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Contratos">Contratos</option>
                    <option value="Propostas">Propostas</option>
                    <option value="Orçamentos">Orçamentos</option>
                    <option value="Notas">Notas</option>
                    <option value="Comprovantes">Comprovantes</option>
                  </select>

                  <label className="py-2 px-3 bg-indigo-600 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer">
                    <UploadCloud size={14} /> Enviar Arquivo
                    <input type="file" onChange={handleSimulatedUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Document vault grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.filter(d => {
                  const matchSearch = d.name.toLowerCase().includes(docSearch.toLowerCase()) || d.company.toLowerCase().includes(docSearch.toLowerCase());
                  const matchType = documentTypeFilter === 'Todos' || d.type === documentTypeFilter;
                  return matchSearch && matchType;
                }).map(doc => (
                  <div key={doc.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex justify-between items-start gap-3">
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-indigo-600 shrink-0">
                      {doc.type === 'Contratos' ? <FileCheck2 size={22} /> : doc.type === 'Orçamentos' ? <FileSpreadsheet size={22} /> : <FileText size={22} />}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[10px] bg-slate-100 text-slate-600 py-0.5 px-2 rounded font-mono font-black uppercase tracking-wider block w-fit">{doc.type}</span>
                      <h4 className="font-bold text-slate-800 text-xs truncate leading-normal" title={doc.name}>{doc.name}</h4>
                      <div className="text-[9px] text-slate-400 font-mono flex justify-between">
                        <span>Tamanho: {doc.size}</span>
                        <span>{doc.date}</span>
                      </div>
                      <span className="text-[9px] text-indigo-600 font-black block mt-1">Empresa: {doc.company}</span>
                    </div>

                    <button 
                      onClick={() => alert(`Simulando download seguro com token JWT expirando em 5 minutos para: ${doc.name}`)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 shrink-0"
                      title="Download Arquivo"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. AUDITORIA GERAL */}
          {activeTab === 'audit' && (
            <div className="space-y-6" id="view-auditoria-logs">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-slate-800">Registro de Auditoria Operacional (Audit Trail)</h3>
                <p className="text-xs text-slate-400">Rastreamento regulatório inalterável de quem acessou, modificou, criou ou excluiu dados em todo o ecossistema.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs text-slate-500 font-bold">
                  <span>Trilhas Recentes</span>
                  <span className="font-mono text-[10px]">Total de logs: {activityLogs.length}</span>
                </div>

                <div className="divide-y divide-slate-100 max-h-[350px] overflow-y-auto">
                  {activityLogs.map(log => (
                    <div key={log.id} className="p-4 flex justify-between items-center text-xs hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg mt-0.5">
                          <History size={14} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-normal">{log.action}</p>
                          <div className="flex items-center gap-1.5 mt-1 text-[9px] font-mono">
                            <span className="text-indigo-600 font-black">{log.user}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">Empresa: {log.company}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 font-mono text-[9px] shrink-0 ml-4">
                        <span className="text-slate-400">{log.timestamp}</span>
                        {(() => {
                          const actionText = log.action.toLowerCase();
                          let logType = 'Operação';
                          let badgeStyle = 'bg-slate-100 text-slate-700 border border-slate-200';
                          
                          if (actionText.includes('login') || actionText.includes('autenticou') || actionText.includes('acessou') || actionText.includes('sessão')) {
                            logType = 'Acesso';
                            badgeStyle = 'bg-indigo-50 text-indigo-700 border border-indigo-150';
                          } else if (actionText.includes('cadastrou') || actionText.includes('criou') || actionText.includes('adicionou') || actionText.includes('convidou')) {
                            logType = 'Cadastro';
                            badgeStyle = 'bg-emerald-50 text-emerald-700 border border-emerald-150';
                          } else if (actionText.includes('excluiu') || actionText.includes('removeu') || actionText.includes('deletou') || actionText.includes('revogou')) {
                            logType = 'Exclusão';
                            badgeStyle = 'bg-rose-50 text-rose-700 border border-rose-150';
                          } else if (actionText.includes('contrato') || actionText.includes('assinou') || actionText.includes('proposta')) {
                            logType = 'Contratos';
                            badgeStyle = 'bg-amber-50 text-amber-700 border border-amber-150';
                          } else if (actionText.includes('permissão') || actionText.includes('permissões')) {
                            logType = 'Permissão';
                            badgeStyle = 'bg-purple-50 text-purple-700 border border-purple-150';
                          }

                          return (
                            <span className={`px-1.5 py-0.5 rounded-sm uppercase font-black tracking-wider text-[8px] ${badgeStyle}`}>
                              {logType}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 8. SEGURANÇA E POLÍTICAS */}
          {activeTab === 'security' && (
            <div className="space-y-6" id="view-politicas-seguranca">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left: Active sessions & Remote revocation */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-black text-slate-800">Controle de Sessões Ativas</h3>
                    <p className="text-xs text-slate-400">Monitore dispositivos autorizados e encerre acessos administrativamente.</p>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {sessions.map(sess => (
                      <div key={sess.id} className="py-3.5 flex justify-between items-center text-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 mt-0.5">
                            <Smartphone size={16} />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block">{sess.device}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold block">{sess.ip} • {sess.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <button 
                            onClick={() => {
                              setSessions(prev => prev.filter(s => s.id !== sess.id));
                              onAddLog(`Sessão ativa revogada remotamente no dispositivo: ${sess.device}`);
                              alert(`Sessão encerrada com sucesso no IP ${sess.ip}.`);
                            }}
                            className="py-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded text-[10px] transition-all cursor-pointer"
                          >
                            Encerrar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Security Policies toggles */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-black text-slate-800">Políticas Globais de Acesso</h3>
                    <p className="text-xs text-slate-400">Configurações regulatórias de restrição por horário ou geolocalização.</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">Tempo Limite de Sessão Inativa</label>
                      <select 
                        value={sessionTimeout} 
                        onChange={e => {
                          setSessionTimeout(e.target.value);
                          onAddLog(`Atualizou tempo limite de inatividade global para ${e.target.value} minutos.`);
                        }}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                      >
                        <option value="15">15 minutos (Máxima Segurança)</option>
                        <option value="60">60 minutos (Uso Recomendado)</option>
                        <option value="180">180 minutos (Sessão Longa)</option>
                      </select>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={timeRestriction}
                          onChange={() => {
                            setTimeRestriction(!timeRestriction);
                            onAddLog(`Inverteu política de restrição de acesso por horário para [${!timeRestriction ? 'ATIVO' : 'INATIVO'}]`);
                          }}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 scale-95"
                        />
                        <div>
                          <span className="font-bold text-slate-800 block">Restringir Horário de Acesso</span>
                          <span className="text-[10px] text-slate-400 leading-tight block">Permitir login apenas em horário comercial (08:00 às 18:00h).</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={geoRestriction}
                          onChange={() => {
                            setGeoRestriction(!geoRestriction);
                            onAddLog(`Inverteu política de restrição de geolocalização por IP/Dispositivo para [${!geoRestriction ? 'ATIVO' : 'INATIVO'}]`);
                          }}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 scale-95"
                        />
                        <div>
                          <span className="font-bold text-slate-800 block">Restringir por IP e Localização</span>
                          <span className="text-[10px] text-slate-400 leading-tight block">Bloquear logins administrativos originados de fora da rede corporativa ou da sede KVB.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}
