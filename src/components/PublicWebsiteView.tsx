import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Globe, 
  Layers, 
  Cpu, 
  Compass, 
  Sparkles, 
  Smartphone, 
  User, 
  Key, 
  KeyRound,
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  SmartphoneNfc, 
  LogOut, 
  Clock, 
  MapPin, 
  Mail, 
  MessageSquare,
  Search,
  Check,
  Zap,
  ArrowRight,
  Monitor,
  Menu,
  X,
  Star,
  Award,
  Users,
  DollarSign,
  Languages,
  Signal,
  Wifi,
  BatteryCharging
} from 'lucide-react';

interface PublicWebsiteViewProps {
  onLoginSuccess: (tenant: string, role: string) => void;
}

interface Session {
  id: string;
  device: string;
  ip: string;
  location: string;
  time: string;
  isCurrent: boolean;
}

// Full translation dictionary for PT, EN, and ES
const translations = {
  pt: {
    navHome: "Início",
    navFeatures: "Módulos ERP",
    navProspector: "Business Finder",
    navPricing: "Planos",
    navSecurity: "Segurança 2FA",
    loginBtn: "Entrar no Sistema",
    heroBadge: "⚡ KVB • MULTI-TENANT SEGURO",
    heroTitleFirst: "O único",
    heroTitleHighlight: "Sistema Operacional",
    heroTitleLast: "completo para agências de alta performance.",
    heroDesc: "Uma única plataforma em estilo iOS 26 para controlar toda a sua agência e estender aos seus clientes um Portal White-Label exclusivo. Gestão de leads, CRM, faturamento financeiro, controle de tarefas Kanban e prospecção autônoma integrada.",
    accessAdminBtn: "Acessar Painel KVB Admin",
    viewModulesBtn: "Conhecer Módulos",
    statTenant: "Multi-Tenant Seguro",
    statProtection: "Proteção de Dados",
    statAuto: "Automações WhatsApp",
    authorizedConnection: "Conexão Autorizada iOS 26.0",
    secureSsl: "🟢 SSL Criptografado • TLS v1.3 • Chave Ativa",
    tenantAndRole: "Empresa e Cargo Simulados",
    simulateLoginBtn: "Simular Login Autônomo com 2FA",
    prospectorTitle: "KVB Business Finder",
    prospectorSubtitle: "Encontre leads qualificados e vulneráveis em tempo real",
    prospectorDesc: "O módulo de inteligência artificial de prospecção global varre bases públicas e de mídias sociais autorizadas para localizar comércios que ainda não possuem site, possuem pontuação crítica no Google Maps, ou mídias sociais abandonadas.",
    feature1Title: "Varredura de Segmentos",
    feature1Desc: "Mais de 70 nichos catalogados de forma nativa — restaurantes, academias, clínicas, oficinas, imobiliárias, pet shops e lojas de roupas. Além de suportar buscas customizadas.",
    feature2Title: "Diagnóstico de Vulnerabilidades",
    feature2Desc: "Identifique automaticamente empresas sem site profissional, fichas do Google Maps não-reivindicadas, falta de mídias ativas ou canais de atendimento por chat.",
    feature3Title: "Disparo de Vendas Integrado",
    feature3Desc: "Importe os leads encontrados diretamente para o CRM integrado com um único clique. Gere propostas automáticas baseadas nas falhas de presença digital do cliente.",
    backofficeTitle: "Do Backoffice ao Cliente Final",
    backofficeSubtitle: "Módulos integrados do ERP KVB",
    backofficeDesc: "A KVB separa sua plataforma em dois níveis robustos: a visão administrativa exclusiva da agência e o simulador/portal do cliente de ponta.",
    crmTitle: "CRM Comercial",
    crmDesc: "Registre leads, filtre status contratuais, organize reuniões e marque ganhos no funil de vendas.",
    finTitle: "Controle Financeiro",
    finDesc: "Controle despesas, fluxo de caixa, pagamentos recorrentes e metas brutas mensais da agência.",
    kanbanTitle: "Fila de Produção (Kanban)",
    kanbanDesc: "Planeje, delegue e acompanhe o andamento das demandas de design, tráfego e sites de forma visual.",
    portalTitle: "Portal do Cliente",
    portalDesc: "Painel White-Label onde o cliente final aprova designs, envia comprovantes e abre chamados de suporte.",
    geminiTitle: "Consultoria Gemini IA",
    geminiDesc: "Robôs especializados em copy, design, tráfego e SEO respondendo instantaneamente no painel.",
    whatsappTitle: "Disparador WhatsApp",
    whatsappDesc: "Planeje disparos de e-mail e WhatsApp usando variáveis dinâmicas do banco de dados.",
    universityTitle: "KVB University",
    universityDesc: "Capacite seu time com videoaulas integradas, apostilas PDF, quizzes práticos e certificados.",
    franchiseTitle: "Modo Franquia",
    franchiseDesc: "Controle royalties, faturamento consolidado de sub-unidades e distribua leads comerciais geograficamente.",
    securityTitle: "SEGURANÇA CORPORATIVA",
    securitySubtitle: "Políticas de conformidade em nível de banco comercial",
    securityDesc: "O KVB ERP emprega criptografia militar AES-256 e hashes SHA-256 para assegurar a inviolabilidade de todos os dados multi-tenant salvos. Cada tenant opera em um sandbox lógico isolado.",
    secMfa: "Autenticação Dupla (2FA): Códigos de login únicos dinâmicos via Email ou WhatsApp.",
    secSession: "Gerenciamento de Sessões: Encerre remotamente conexões ativas e monitore IPs e dispositivos.",
    secLockout: "Lockout de Segurança: Bloqueio automático de tentativas repetitivas de senha incorreta.",
    secGeo: "Permissões Geográficas & Horários: Limite o login do colaborador ao horário comercial.",
    secPanelTitle: "Painel de Configuração de Segurança 2FA",
    secRestrictTime: "Restringir acesso por horário comercial:",
    secEnableTime: "Habilitar Bloqueio Diário",
    secRestrictGeo: "Restringir logins por geolocalização:",
    secEnableGeo: "Restringir a Cidades Específicas",
    secSavePolicies: "Salvar Políticas Globais 2FA",
    footerTitle: "Plataforma ERP de controle multi-tenant, CRM com pipeline reativo e varredor inteligente de conformidade digital LGPD.",
    privacy: "Política de Privacidade",
    terms: "Termos de Uso",
    authGateway: "Portal Seguro KVB (Auth Gateway)",
    tenantLabel: "Selecione a Empresa (Tenant):",
    roleLabel: "Selecione o Cargo:",
    userLabel: "Nome de Usuário / E-mail:",
    passLabel: "Senha Exclusiva:",
    forgotPass: "Esqueceu a senha?",
    passHint: "Insira sua senha exclusiva de acesso.",
    validateBtn: "Confirmar Acesso",
    sessionHistoryTitle: "Histórico de Sessões de Login",
    currentSession: "Atual",
    remoteLogout: "Sair Remoto",
    mfaSentTitle: "CÓDIGO DE VERIFICAÇÃO ENVIADO",
    mfaSentDesc: "Um código de verificação de 6 dígitos foi enviado para você.",
    mfaSimulatedCode: "CÓDIGO SIMULADO:",
    enterCodeMfa: "Digite o Código de Verificação (2FA):",
    confirmAccessBtn: "Confirmar Acesso",
    resendBtn: "Reenviar",
    codeExpires: "Código expira em 5 minutos.",
    backToLogin: "Voltar ao login",
    recoveryTitle: "Escolha o Método de Recuperação:",
    viaEmail: "Via E-mail",
    viaWhatsapp: "Via WhatsApp",
    enterEmailReg: "Insira seu E-mail Cadastrado:",
    enterPhoneReg: "Insira seu WhatsApp com DDI:",
    sendRecoveryBtn: "Enviar Link de Redefinição",
    backToLoginBtn: "Voltar ao Portal de Login",
    cryptographyDisclaimer: "Chave de Criptografia Ativa • Em conformidade total com as Leis de Proteção de Dados (LGPD/GDPR)"
  },
  en: {
    navHome: "Home",
    navFeatures: "ERP Modules",
    navProspector: "Business Finder",
    navPricing: "Plans",
    navSecurity: "2FA Security",
    loginBtn: "Sign In",
    heroBadge: "⚡ KVB • SECURE MULTI-TENANT",
    heroTitleFirst: "The only complete",
    heroTitleHighlight: "Operating System",
    heroTitleLast: "for high-performance agencies.",
    heroDesc: "A single platform in iOS 26 style to control your entire agency and extend an exclusive White-Label Portal to your clients. Lead management, CRM, financial billing, Kanban task control, and integrated autonomous prospecting.",
    accessAdminBtn: "Access KVB Admin Panel",
    viewModulesBtn: "Explore Modules",
    statTenant: "Secure Multi-Tenant",
    statProtection: "Data Protection",
    statAuto: "WhatsApp Automation",
    authorizedConnection: "Authorized iOS 26.0 Connection",
    secureSsl: "🟢 Encrypted SSL • TLS v1.3 • Key Active",
    tenantAndRole: "Simulated Company & Role",
    simulateLoginBtn: "Simulate Autonomous Login with 2FA",
    prospectorTitle: "KVB Business Finder",
    prospectorSubtitle: "Find qualified and vulnerable leads in real time",
    prospectorDesc: "The global prospecting artificial intelligence module sweeps authorized public and social media databases to locate businesses that do not yet have a professional website, have low Google Maps ratings, or abandoned social media accounts.",
    feature1Title: "Industry Sweeping",
    feature1Desc: "Over 70 niches natively cataloged — restaurants, gyms, clinics, body shops, real estate, pet shops, and fashion boutiques. Plus custom search support.",
    feature2Title: "Vulnerability Diagnostic",
    feature2Desc: "Automatically detect businesses without professional websites, unclaimed Google Maps listings, missing active social media, or no chat support.",
    feature3Title: "Integrated Sales Launch",
    feature3Desc: "Import found leads directly into the integrated CRM with one click. Generate instant proposals based on the prospect's digital presence weaknesses.",
    backofficeTitle: "From Backoffice to End Client",
    backofficeSubtitle: "Integrated KVB ERP Modules",
    backofficeDesc: "KVB divides its platform into two robust levels: the exclusive administrative agency view and the high-end client simulator/portal.",
    crmTitle: "Commercial CRM",
    crmDesc: "Register leads, filter contract status, organize meetings, and track wins in the sales pipeline.",
    finTitle: "Financial Control",
    finDesc: "Manage expenses, cash flow, recurring billing, and monthly gross targets for the agency.",
    kanbanTitle: "Production Queue (Kanban)",
    kanbanDesc: "Plan, delegate, and visually monitor the progress of design, traffic, and website requests.",
    portalTitle: "Client Portal",
    portalDesc: "White-Label dashboard where the client approves designs, uploads receipts, and opens support tickets.",
    geminiTitle: "Gemini AI Consultancy",
    geminiDesc: "Specialized AI robots for copywriting, design, traffic, and SEO responding instantly inside the panel.",
    whatsappTitle: "WhatsApp Broadcaster",
    whatsappDesc: "Schedule email and WhatsApp broadcasts using dynamic database variables seamlessly.",
    universityTitle: "KVB University",
    universityDesc: "Train your team with integrated video classes, PDF handbooks, practical quizzes, and certifications.",
    franchiseTitle: "Franchise Mode",
    franchiseDesc: "Track royalties, consolidated billing of sub-units, and distribute business leads geographically.",
    securityTitle: "ENTERPRISE SECURITY",
    securitySubtitle: "Bank-level compliance policies",
    securityDesc: "The KVB ERP employs AES-256 military-grade encryption and SHA-256 hashing to secure all multi-tenant data. Each tenant operates in an isolated logical sandbox.",
    secMfa: "Two-Factor Auth (2FA): Dynamic single-use login codes via Email or WhatsApp.",
    secSession: "Session Management: Remotely terminate active sessions and monitor IPs and devices.",
    secLockout: "Security Lockout: Automatic temporary block after consecutive failed password attempts.",
    secGeo: "Geographic & Time Limits: Restrict collaborator login to custom business hours and cities.",
    secPanelTitle: "2FA Security Settings Panel",
    secRestrictTime: "Restrict access by business hours:",
    secEnableTime: "Enable Daily Lockout",
    secRestrictGeo: "Restrict logins by geolocation:",
    secEnableGeo: "Restrict to Specific Cities",
    secSavePolicies: "Save Global 2FA Policies",
    footerTitle: "Multi-tenant control ERP platform, CRM with reactive pipeline, and smart LGPD digital compliance scanner.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    authGateway: "KVB Secure Portal (Auth Gateway)",
    tenantLabel: "Select Company (Tenant):",
    roleLabel: "Select Role:",
    userLabel: "Username / Email:",
    passLabel: "Exclusive Password:",
    forgotPass: "Forgot password?",
    passHint: "Enter your exclusive access password.",
    validateBtn: "Confirm Access",
    sessionHistoryTitle: "Login Sessions History",
    currentSession: "Current",
    remoteLogout: "Remote Sign Out",
    mfaSentTitle: "VERIFICATION CODE SENT",
    mfaSentDesc: "A 6-digit verification code has been sent to you.",
    mfaSimulatedCode: "SIMULATED CODE:",
    enterCodeMfa: "Enter Verification Code (2FA):",
    confirmAccessBtn: "Confirm Access",
    resendBtn: "Resend",
    codeExpires: "Code expires in 5 minutes.",
    backToLogin: "Back to login",
    recoveryTitle: "Choose Recovery Method:",
    viaEmail: "Via Email",
    viaWhatsapp: "Via WhatsApp",
    enterEmailReg: "Enter Registered Email:",
    enterPhoneReg: "Enter Phone Number with Country Code:",
    sendRecoveryBtn: "Send Reset Link",
    backToLoginBtn: "Back to Login Portal",
    cryptographyDisclaimer: "Active Encryption Key • In full compliance with Data Protection Laws (GDPR/LGPD)"
  },
  es: {
    navHome: "Inicio",
    navFeatures: "Módulos ERP",
    navProspector: "Business Finder",
    navPricing: "Planes",
    navSecurity: "Seguridad 2FA",
    loginBtn: "Iniciar Sesión",
    heroBadge: "⚡ KVB • MULTI-TENANT SEGURO",
    heroTitleFirst: "El único",
    heroTitleHighlight: "Sistema Operativo",
    heroTitleLast: "completo para agencias de alto rendimiento.",
    heroDesc: "Una única plataforma con estilo iOS 26 para controlar toda su agencia y extender a sus clientes un Portal White-Label exclusivo. Gestión de leads, CRM, facturación financiera, control de tareas Kanban y prospección autónoma integrada.",
    accessAdminBtn: "Acceder al Panel KVB Admin",
    viewModulesBtn: "Conocer Módulos",
    statTenant: "Multi-Tenant Seguro",
    statProtection: "Protección de Datos",
    statAuto: "Automatización de WhatsApp",
    authorizedConnection: "Conexión Autorizada iOS 26.0",
    secureSsl: "🟢 SSL Encriptado • TLS v1.3 • Clave Activa",
    tenantAndRole: "Empresa y Rol Simulado",
    simulateLoginBtn: "Simular Inicio de Sesión Autónomo con 2FA",
    prospectorTitle: "Buscador de Negocios KVB",
    prospectorSubtitle: "Encuentre leads calificados y vulnerables en tiempo real",
    prospectorDesc: "El módulo de inteligencia artificial de prospección global barre bases públicas y de redes sociales autorizadas para localizar comercios que aún no tienen un sitio web profesional, tienen calificaciones bajas en Google Maps o cuentas abandonadas.",
    feature1Title: "Barrido de Industrias",
    feature1Desc: "Más de 70 nichos catalogados de forma nativa — restaurantes, gimnasios, clínicas, talleres, inmobiliarias, tiendas de mascotas y boutiques. Soporta búsquedas personalizadas.",
    feature2Title: "Diagnóstico de Vulnerabilidades",
    feature2Desc: "Identifique automáticamente empresas sin sitio web profesional, fichas de Google Maps no reclamadas, falta de redes sociales activas o canales de atención.",
    feature3Title: "Lanzamiento de Ventas Integrado",
    feature3Desc: "Importe los clientes potenciales encontrados directamente al CRM integrado con un solo clic. Genere propuestas automáticas basadas en las debilidades digitales del cliente.",
    backofficeTitle: "Desde el Backoffice al Cliente Final",
    backofficeSubtitle: "Módulos ERP KVB Integrados",
    backofficeDesc: "KVB divide su plataforma en dos niveles robustos: la vista administrativa exclusiva de la agencia y el simulador/portal de cliente de gama alta.",
    crmTitle: "CRM Comercial",
    crmDesc: "Registre clientes potenciales, filtre estados de contratos, organice reuniones y rastree ganancias en el pipeline de ventas.",
    finTitle: "Control Financiero",
    finDesc: "Controle gastos, flujo de caixa, facturación recurrente y metas mensuales brutas de la agencia.",
    kanbanTitle: "Cola de Producción (Kanban)",
    kanbanDesc: "Planifique, delegue y supervise visualmente el progreso de solicitudes de diseño, tráfico y sitios web.",
    portalTitle: "Portal del Cliente",
    portalDesc: "Panel de control White-Label donde el cliente final aprueba diseños, sube recibos de pago y abre tickets de soporte.",
    geminiTitle: "Consultoría de IA de Gemini",
    geminiDesc: "Robots de IA especializados en redacción, diseño, tráfico y SEO que responden instantáneamente dentro del panel.",
    whatsappTitle: "Difusor de WhatsApp",
    whatsappDesc: "Planifique envíos masivos de correo electrónico y WhatsApp utilizando variables de base de datos dinámicas.",
    universityTitle: "Universidad KVB",
    universityDesc: "Capacite a su equipo con clases en video integradas, manuales en PDF, cuestionarios prácticos y certificaciones.",
    franchiseTitle: "Modo de Franquicia",
    franchiseDesc: "Siga las regalías, la facturación consolidada de subunidades y distribuya clientes potenciales de forma geográfica.",
    securityTitle: "SEGURANÇA CORPORATIVA",
    securitySubtitle: "Políticas de cumplimiento a nivel de banco comercial",
    securityDesc: "El ERP KVB utiliza cifrado militar AES-256 y hash SHA-256 para garantizar la inviolabilidad de todos los datos multi-tenant. Cada tenant opera en un sandbox lógico aislado.",
    secMfa: "Autenticación de Dos Factores (2FA): Códigos de inicio de sesión únicos dinámicos vía Correo o WhatsApp.",
    secSession: "Gestión de Sesiones: Cierre remotamente conexiones activas y monitoree IPs y dispositivos.",
    secLockout: "Bloqueo de Seguridad: Bloqueo temporal automático tras intentos fallidos de contraseña consecutivos.",
    secGeo: "Límites Geográficos y Horarios: Restrinja el inicio de sesión del colaborador a horarios comerciales y ciudades específicas.",
    secPanelTitle: "Panel de Configuración de Seguridad 2FA",
    secRestrictTime: "Restringir acceso por horario comercial:",
    secEnableTime: "Habilitar Bloqueio Diário",
    secRestrictGeo: "Restringir inicio de sesión por geolocalización:",
    secEnableGeo: "Restringir a Ciudades Específicas",
    secSavePolicies: "Guardar Políticas Globales 2FA",
    footerTitle: "Plataforma ERP de control multi-tenant, CRM con pipeline reactivo y escáner inteligente de cumplimiento digital LGPD.",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    authGateway: "Portal Seguro KVB (Auth Gateway)",
    tenantLabel: "Seleccione Empresa (Tenant):",
    roleLabel: "Seleccione Rol:",
    userLabel: "Usuario / Correo Electrónico:",
    passLabel: "Contraseña Exclusiva:",
    forgotPass: "¿Olvidó su contraseña?",
    passHint: "Introduzca su contraseña exclusiva de acceso.",
    validateBtn: "Confirmar Acceso",
    sessionHistoryTitle: "Historial de Sesiones de Inicio",
    currentSession: "Actual",
    remoteLogout: "Cerrar Remoto",
    mfaSentTitle: "CÓDIGO DE VERIFICACIÓN ENVIADO",
    mfaSentDesc: "Se ha enviado un código de verificación de 6 dígitos para usted.",
    mfaSimulatedCode: "CÓDIGO SIMULADO:",
    enterCodeMfa: "Ingrese el Código de Verificación (2FA):",
    confirmAccessBtn: "Confirmar Acceso",
    resendBtn: "Reenviar",
    codeExpires: "El código expira en 5 minutos.",
    backToLogin: "Volver al inicio",
    recoveryTitle: "Elija el Método de Recuperación:",
    viaEmail: "Vía Correo Electrónico",
    viaWhatsapp: "Vía WhatsApp",
    enterEmailReg: "Ingrese Correo Registrado:",
    enterPhoneReg: "Ingrese Teléfono con Código de País:",
    sendRecoveryBtn: "Enviar Enlace de Restablecimiento",
    backToLoginBtn: "Volver al Portal de Login",
    cryptographyDisclaimer: "Clave de Encriptación Activa • En conformidad total con las Leyes de Protección de Datos (GDPR/LGPD)"
  }
};

export default function PublicWebsiteView({ onLoginSuccess }: PublicWebsiteViewProps) {
  // Navigation & Page states
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'pt' | 'en' | 'es'>('pt');
  
  // iOS 26 Theme Toggle (Dark vs Light Glassmorphism)
  const [isIosDark, setIsIosDark] = useState(true);
  
  // Real-time ticking time for iOS Status Bar
  const [currentTime, setCurrentTime] = useState('12:00 PM');
  
  // Auth Form State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUsername] = useState('admin@kvb.com');
  const [password, setPassword] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('KVB');
  const [selectedRole, setSelectedRole] = useState('Administrador');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockoutCountdown, setLockoutCountdown] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  
  // 2FA Auth State
  const [authState, setAuthState] = useState<'credentials' | 'two-factor' | 'recovery' | 'security-settings'>('credentials');
  const [verificationCode, setVerificationCode] = useState('');
  const [generated2FA, setGenerated2FA] = useState('');
  const [mfaChannel, setMfaChannel] = useState<'email' | 'whatsapp'>('email');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'whatsapp'>('email');
  const [recoveryContact, setRecoveryContact] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  // Advanced Security Settings
  const [restrictByTime, setRestrictByTime] = useState(false);
  const [restrictByLocation, setRestrictByLocation] = useState(false);
  const [allowedLocations, setAllowedLocations] = useState('São Paulo, SP');
  const [allowedTimeRange, setAllowedTimeRange] = useState({ start: '08:00', end: '18:00' });
  
  // Session States
  const [activeSessions, setActiveSessions] = useState<Session[]>([
    { id: 'sess-1', device: 'Chrome / Windows (São Paulo, BR)', ip: '189.120.45.62', location: 'São Paulo, SP', time: 'Ativo agora', isCurrent: true }
  ]);

  const [loginHistory, setLoginHistory] = useState([
    { status: 'Sucesso', ip: '189.120.45.62', device: 'Chrome / Windows', date: '03/07/2026 11:30', location: 'São Paulo, SP' }
  ]);

  // Update real-time ticking clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      let hours = d.getHours();
      const minutes = d.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minStr = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTime(`${hours}:${minStr} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Lockout countdown timer effect
  useEffect(() => {
    if (lockoutCountdown > 0) {
      const timer = setTimeout(() => setLockoutCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutCountdown]);

  // Simulate generation of code
  const handleTrigger2FA = (channel: 'email' | 'whatsapp') => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGenerated2FA(code);
    setMfaChannel(channel);
    setAuthState('two-factor');
    console.log(`[KVB SECURITY] Seu código 2FA de verificação enviado por ${channel.toUpperCase()} é: ${code}`);
  };

  const handlePasswordRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryContact) return;
    setRecoverySent(true);
    setTimeout(() => {
      setRecoverySent(false);
      setAuthState('credentials');
      alert(`Código de recuperação temporário enviado com sucesso para ${recoveryContact} via ${recoveryMethod.toUpperCase()}! Use-o para redefinir sua senha.`);
    }, 1500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutCountdown > 0) {
      setLoginError(`Sistema bloqueado. Aguarde ${lockoutCountdown} segundos.`);
      return;
    }

    setIsSubmitting(true);
    setLoginError('');

    setTimeout(() => {
      if (password === 'enZo1234') {
        setIsSubmitting(false);
        setFailedAttempts(0);
        
        if (restrictByTime) {
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();
          const [startH, startM] = allowedTimeRange.start.split(':').map(Number);
          const [endH, endM] = allowedTimeRange.end.split(':').map(Number);
          
          const nowMinutes = currentHour * 60 + currentMinute;
          const startMinutes = startH * 60 + startM;
          const endMinutes = endH * 60 + endM;

          if (nowMinutes < startMinutes || nowMinutes > endMinutes) {
            setLoginError(`Acesso negado: Horário de trabalho restrito (${allowedTimeRange.start} às ${allowedTimeRange.end}).`);
            return;
          }
        }

        setIsLoginModalOpen(false);
        onLoginSuccess(selectedTenant, selectedRole);
      } else {
        setIsSubmitting(false);
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        
        const newHist = {
          status: 'Falhou (Senha Incorreta)',
          ip: '189.120.45.62',
          device: 'Chrome / Windows',
          date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
          location: 'São Paulo, SP'
        };
        setLoginHistory(prev => [newHist, ...prev]);

        if (nextAttempts >= 3) {
          setLockoutCountdown(30);
          setLoginError('Múltiplas tentativas incorretas. Login bloqueado por 30 segundos.');
        } else {
          setLoginError(`Senha incorreta! Tentativa ${nextAttempts} de 3.`);
        }
      }
    }, 1200);
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');

    setTimeout(() => {
      setIsSubmitting(false);
      if (verificationCode === '123456' || verificationCode === 'enZo1234' || verificationCode.length >= 4) {
        setIsLoginModalOpen(false);
        onLoginSuccess(selectedTenant, selectedRole);
      } else {
        setLoginError('Código de autenticação incorreto!');
      }
    }, 1000);
  };

  const terminateSession = (id: string) => {
    setActiveSessions(prev => prev.filter(s => s.id !== id));
    const newHist = {
      status: 'Sessão Encerrada Remotamente',
      ip: '189.120.45.62',
      device: 'Encerramento Remoto',
      date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
      location: 'São Paulo, SP'
    };
    setLoginHistory(prev => [newHist, ...prev]);
  };

  // Safe helper to grab translated keys
  const t = (key: keyof typeof translations['pt']) => {
    return translations[lang][key] || translations['pt'][key];
  };

  return (
    <div className={`min-h-screen font-sans antialiased w-full transition-colors duration-500 ${
      isIosDark 
        ? 'bg-slate-950 text-slate-100 selection:bg-indigo-500/30' 
        : 'bg-slate-100 text-slate-900 selection:bg-indigo-500/20'
    }`}>

      {/* MAIN WEBSITE HEADER & NAVIGATION BAR */}
      <nav className={`sticky top-0 z-40 border-b backdrop-blur-md shadow-xs transition-colors ${
        isIosDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Brand Logo with Apple Rounded Icon Style */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-[11px] flex items-center justify-center text-white font-black text-xl shadow-md transform hover:rotate-6 transition-transform">
                K
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight leading-none">KVB System</h1>
                <span className={`text-[8px] font-mono font-bold uppercase tracking-widest block mt-0.5 ${
                  isIosDark ? 'text-slate-400' : 'text-slate-500'
                }`}>iOS 26 Architecture</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-extrabold">
              <a href="#home" onClick={() => setActiveSection('home')} className="hover:text-indigo-500 transition-colors">{t('navHome')}</a>
              <a href="#features" onClick={() => setActiveSection('features')} className="hover:text-indigo-500 transition-colors">{t('navFeatures')}</a>
              <a href="#prospector" onClick={() => setActiveSection('prospector')} className="hover:text-indigo-500 transition-colors">{t('navProspector')}</a>
              <a href="#security" className="hover:text-indigo-500 transition-colors flex items-center gap-1 font-black">
                <Shield size={12} /> {t('navSecurity')}
              </a>
            </div>

            {/* Quick Controllers: Language switcher, iOS dark/light mode toggle */}
            <div className="flex items-center gap-4">
              
              {/* Language Switcher Button Group */}
              <div className={`flex items-center rounded-xl p-1 border ${
                isIosDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/60 border-slate-300'
              }`}>
                <Languages size={14} className="mx-1.5 text-indigo-500" />
                <button 
                  onClick={() => setLang('pt')} 
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                    lang === 'pt' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-indigo-500'
                  }`}
                >
                  PT
                </button>
                <button 
                  onClick={() => setLang('en')} 
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                    lang === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-indigo-500'
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLang('es')} 
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                    lang === 'es' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-indigo-500'
                  }`}
                >
                  ES
                </button>
              </div>

              {/* iOS Theme Switcher Style Slider */}
              <button 
                onClick={() => setIsIosDark(!isIosDark)}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                  isIosDark 
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300' 
                    : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                }`}
                title="Toggle iOS 26 Light/Dark glassmorphism"
              >
                <span>{isIosDark ? '🌙 Dark iOS' : '☀️ Light iOS'}</span>
              </button>

              {/* Access Button */}
              <button 
                onClick={() => {
                  setAuthState('credentials');
                  setVerificationCode('');
                  setLoginError('');
                  setIsLoginModalOpen(true);
                }}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                id="btn-login-public"
              >
                <Lock size={12} />
                <span className="hidden sm:inline">{t('loginBtn')}</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-1 rounded-lg transition-all ${isIosDark ? 'hover:bg-slate-900 text-white' : 'hover:bg-slate-200 text-black'}`}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-4 py-4 space-y-3 shadow-md border-t ${
            isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-xs py-1 hover:text-indigo-600">{t('navHome')}</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-xs py-1 hover:text-indigo-600">{t('navFeatures')}</a>
            <a href="#prospector" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-xs py-1 hover:text-indigo-600">{t('navProspector')}</a>
            <a href="#security" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-xs py-1 hover:text-indigo-600">{t('navSecurity')}</a>
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button 
                onClick={() => { setIsIosDark(!isIosDark); setMobileMenuOpen(false); }}
                className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg text-center"
              >
                {isIosDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsLoginModalOpen(true); }}
                className="w-full py-2.5 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl block cursor-pointer"
              >
                {t('loginBtn')}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO HERO SECTION WITH HIGH-FIDELITY iOS 26 AMBIENT GRAPHICS */}
      <header className="relative overflow-hidden py-16 lg:py-24" id="home">
        
        {/* Apple Premium Glowing Gradients in background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-[-200px] left-[10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 transition-colors ${
            isIosDark ? 'bg-indigo-700' : 'bg-indigo-400'
          }`}></div>
          <div className={`absolute bottom-[-100px] right-[5%] w-[400px] h-[400px] rounded-full blur-[140px] opacity-20 transition-colors ${
            isIosDark ? 'bg-fuchsia-700' : 'bg-fuchsia-300'
          }`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-7 text-left">
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black border transition-colors ${
              isIosDark 
                ? 'bg-slate-900/80 text-indigo-300 border-indigo-500/20' 
                : 'bg-white/80 text-indigo-700 border-indigo-200'
            }`}>
              <Sparkles size={11} className="text-amber-400 animate-spin" />
              {t('heroBadge')}
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t('heroTitleFirst')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 animate-pulse">{t('heroTitleHighlight')}</span> {t('heroTitleLast')}
            </h2>
            
            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl transition-colors ${
              isIosDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('heroDesc')}
            </p>

            {/* Apple style CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{t('accessAdminBtn')}</span>
                <ArrowRight size={14} />
              </button>
              <a 
                href="#features"
                className={`py-3 px-6 font-bold text-xs rounded-xl transition-all block text-center border ${
                  isIosDark 
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800' 
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                }`}
              >
                {t('viewModulesBtn')}
              </a>
            </div>

            {/* Real Stats in beautiful Glass widgets */}
            <div className="grid grid-cols-3 gap-3.5 pt-4">
              {[
                { title: '100% Secure', label: t('statTenant') },
                { title: 'AES-256', label: t('statProtection') },
                { title: '< 10s Trigger', label: t('statAuto') }
              ].map((st, idx) => (
                <div key={idx} className={`p-3.5 rounded-2xl border transition-all ${
                  isIosDark 
                    ? 'bg-slate-900/60 border-slate-800/80 backdrop-blur-md' 
                    : 'bg-white/60 border-slate-200/80 backdrop-blur-md'
                }`}>
                  <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-400 block font-mono">{st.title}</span>
                  <span className="text-[10px] font-bold block uppercase tracking-wide opacity-75 mt-0.5">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* iOS 26 DEVICE PREVIEW PANEL (Simulation Card) */}
          <div className="lg:col-span-5 relative">
            <div className={`p-6 rounded-[2rem] border shadow-2xl transition-all duration-500 ${
              isIosDark 
                ? 'bg-black/90 border-slate-800 text-slate-100 shadow-indigo-950/20' 
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50'
            }`}>
              
              {/* Device Upper Bezel & Island */}
              <div className="flex justify-between items-center border-b pb-4 mb-4 transition-colors">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-mono font-black ${
                  isIosDark ? 'bg-indigo-950 text-indigo-300' : 'bg-indigo-50 text-indigo-700'
                }`}>
                  🔒 SECURE TENANT MATRIX
                </div>
              </div>

              {/* Authorized Connection Teaser block */}
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border transition-all ${
                  isIosDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-[9px] text-slate-500 font-mono uppercase font-bold block">{t('authorizedConnection')}</span>
                  <span className="text-xs font-black text-emerald-500 flex items-center gap-1 mt-1">
                    <Shield size={12} />
                    {t('secureSsl')}
                  </span>
                </div>

                {/* Tenant & Role quick select parameters */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider block opacity-75">{t('tenantAndRole')}:</label>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className={`p-3 rounded-xl border ${
                      isIosDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <span className="text-[8px] text-slate-500 block">TENANT</span>
                      <strong className="block truncate mt-0.5">🏢 {selectedTenant}</strong>
                    </div>
                    <div className={`p-3 rounded-xl border ${
                      isIosDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <span className="text-[8px] text-slate-500 block">ROLE</span>
                      <strong className="text-indigo-500 block truncate mt-0.5">👑 {selectedRole}</strong>
                    </div>
                  </div>
                </div>

                {/* Active Dynamic iOS 26 Widget simulation block */}
                <div className={`p-4 rounded-2xl border text-[10px] space-y-2 ${
                  isIosDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100/80 border-slate-200'
                }`}>
                  <div className="flex justify-between items-center text-indigo-500 font-black">
                    <span>📡 INTERACTIVE TELEMETRY WIDGET</span>
                    <span className="animate-pulse">ONLINE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-400 font-mono">
                    <div>
                      <span>CPU STACK:</span>
                      <strong className="text-slate-200 block">4.12% LOAD</strong>
                    </div>
                    <div>
                      <span>ACTIVE GATEWAYS:</span>
                      <strong className="text-slate-200 block">256 CHANNELS</strong>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setAuthState('credentials');
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Key size={12} /> {t('simulateLoginBtn')}
                </button>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* INTELLIGENT PROSPECTOR FEATURES PANEL */}
      <section className="py-16 bg-white text-slate-900" id="prospector">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          
          <div className="text-center space-y-2.5 max-w-3xl mx-auto">
            <span className="text-xs text-indigo-600 font-black tracking-widest uppercase font-mono block">
              {t('prospectorTitle')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              {t('prospectorSubtitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {t('prospectorDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl hover:border-indigo-200 transition-colors space-y-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-xs">
                <Search size={18} />
              </div>
              <h4 className="text-sm font-black text-slate-900">{t('feature1Title')}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t('feature1Desc')}</p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl hover:border-indigo-200 transition-colors space-y-4">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 shadow-xs">
                <AlertTriangle size={18} />
              </div>
              <h4 className="text-sm font-black text-slate-900">{t('feature2Title')}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t('feature2Desc')}</p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl hover:border-indigo-200 transition-colors space-y-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shadow-xs">
                <CheckCircle size={18} />
              </div>
              <h4 className="text-sm font-black text-slate-900">{t('feature3Title')}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t('feature3Desc')}</p>
            </div>

          </div>

        </div>
      </section>

      {/* DETAILED CORE MÓDULOS IN GRID */}
      <section className={`py-16 border-t ${
        isIosDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
      }`} id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs text-indigo-500 font-black tracking-widest uppercase font-mono block">{t('backofficeTitle')}</span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                {t('backofficeSubtitle')}
              </h3>
            </div>
            <p className={`text-xs max-w-md ${isIosDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t('backofficeDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('crmTitle'), desc: t('crmDesc'), icon: <Users size={16} />, color: 'bg-indigo-500/10 text-indigo-500' },
              { title: t('finTitle'), desc: t('finDesc'), icon: <DollarSign size={16} />, color: 'bg-emerald-500/10 text-emerald-500' },
              { title: t('kanbanTitle'), desc: t('kanbanDesc'), icon: <Clock size={16} />, color: 'bg-amber-500/10 text-amber-500' },
              { title: t('portalTitle'), desc: t('portalDesc'), icon: <Monitor size={16} />, color: 'bg-indigo-500/10 text-indigo-500' },
              { title: t('geminiTitle'), desc: t('geminiDesc'), icon: <Sparkles size={16} />, color: 'bg-purple-500/10 text-purple-500' },
              { title: t('whatsappTitle'), desc: t('whatsappDesc'), icon: <MessageSquare size={16} />, color: 'bg-cyan-500/10 text-cyan-500' },
              { title: t('universityTitle'), desc: t('universityDesc'), icon: <Award size={16} />, color: 'bg-rose-500/10 text-rose-500' },
              { title: t('franchiseTitle'), desc: t('franchiseDesc'), icon: <Layers size={16} />, color: 'bg-indigo-500/10 text-indigo-500' }
            ].map((mod, i) => (
              <div key={i} className={`p-6 rounded-2xl border transition-all ${
                isIosDark 
                  ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/30 shadow-xs' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
              }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${mod.color} mb-4`}>
                  {mod.icon}
                </div>
                <h4 className="text-xs font-black uppercase font-mono tracking-wider mb-2">{mod.title}</h4>
                <p className={`text-[11px] leading-relaxed ${isIosDark ? 'text-slate-400' : 'text-slate-500'}`}>{mod.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECURITY, GEOLOCATION & COMMERICAL ACCESS RULES */}
      <section className={`py-16 ${isIosDark ? 'bg-slate-950' : 'bg-slate-100'}`} id="security">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs text-amber-500 font-mono font-black uppercase tracking-widest block">
              {t('securityTitle')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {t('securitySubtitle')}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isIosDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t('securityDesc')}
            </p>

            <ul className="space-y-3.5 text-xs">
              <li className="flex gap-2.5 items-start">
                <span className="p-0.5 bg-emerald-500/10 text-emerald-500 rounded-full mt-0.5"><Check size={12} /></span>
                <span>{t('secMfa')}</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="p-0.5 bg-emerald-500/10 text-emerald-500 rounded-full mt-0.5"><Check size={12} /></span>
                <span>{t('secSession')}</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="p-0.5 bg-emerald-500/10 text-emerald-500 rounded-full mt-0.5"><Check size={12} /></span>
                <span>{t('secLockout')}</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="p-0.5 bg-emerald-500/10 text-emerald-500 rounded-full mt-0.5"><Check size={12} /></span>
                <span>{t('secGeo')}</span>
              </li>
            </ul>
          </div>

          <div className={`lg:col-span-6 p-6 rounded-[2rem] border transition-all ${
            isIosDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-2 border-b pb-4 mb-4 transition-colors">
              <Shield className="text-emerald-500" size={18} />
              <h4 className="text-xs font-mono font-black uppercase tracking-wider">{t('secPanelTitle')}</h4>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-bold block opacity-85">{t('secRestrictTime')}</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="checkbox" 
                    checked={restrictByTime} 
                    onChange={e => setRestrictByTime(e.target.checked)}
                    className="rounded border-slate-800 text-indigo-600 scale-100"
                  />
                  <span>{t('secEnableTime')}</span>
                </div>
                {restrictByTime && (
                  <div className="grid grid-cols-2 gap-2 pt-1.5">
                    <input 
                      type="time" 
                      value={allowedTimeRange.start} 
                      onChange={e => setAllowedTimeRange(prev => ({ ...prev, start: e.target.value }))}
                      className={`p-2 border rounded font-mono text-center ${
                        isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                      }`}
                    />
                    <input 
                      type="time" 
                      value={allowedTimeRange.end} 
                      onChange={e => setAllowedTimeRange(prev => ({ ...prev, end: e.target.value }))}
                      className={`p-2 border rounded font-mono text-center ${
                        isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                      }`}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="font-bold block opacity-85">{t('secRestrictGeo')}</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="checkbox" 
                    checked={restrictByLocation} 
                    onChange={e => setRestrictByLocation(e.target.checked)}
                    className="rounded border-slate-800 text-indigo-600 scale-100"
                  />
                  <span>{t('secEnableGeo')}</span>
                </div>
                {restrictByLocation && (
                  <input 
                    type="text" 
                    value={allowedLocations} 
                    onChange={e => setAllowedLocations(e.target.value)}
                    placeholder="Ex: São Paulo, SP"
                    className={`w-full p-2.5 border rounded-xl font-bold text-xs mt-1.5 ${
                      isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                    }`}
                  />
                )}
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => alert('Políticas salvas!')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl transition-colors cursor-pointer"
                >
                  {t('secSavePolicies')}
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-12 text-xs transition-colors ${
        isIosDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center gap-2 items-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-[8px] flex items-center justify-center text-white font-bold text-sm">K</div>
            <span className="font-mono font-black uppercase tracking-widest text-xs">KVB Corporate</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed">
            {t('footerTitle')}
          </p>
          <div className="flex justify-center gap-4 font-semibold text-[11px] opacity-75">
            <span>© 2026 KVB Group Corp.</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{t('privacy')}</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{t('terms')}</span>
          </div>
        </div>
      </footer>

      {/* --- AUTH GATEWAY MODAL OVERLAY --- */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className={`rounded-3xl border max-w-lg w-full shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            isIosDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-indigo-950 to-indigo-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="text-amber-400 animate-pulse" size={18} />
                <h4 className="text-xs font-black uppercase tracking-wider font-mono text-amber-400">{t('authGateway')}</h4>
              </div>
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="p-1 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Error alerts */}
            {loginError && (
              <div className="p-4 bg-rose-500/10 text-rose-500 border-b border-rose-500/20 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle size={15} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Scrollable contents */}
            <div className="p-6 overflow-y-auto max-h-[75vh] space-y-5 text-xs">
              
              {/* STAGE 1: ENTER CREDENTIALS */}
              {authState === 'credentials' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold block opacity-75">{t('tenantLabel')}</label>
                    <select 
                      value={selectedTenant}
                      onChange={e => setSelectedTenant(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border font-bold text-xs ${
                        isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                      }`}
                    >
                      <option value="KVB">🏢 KVB (Admin)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold block opacity-75">{t('roleLabel')}</label>
                    <select 
                      value={selectedRole}
                      onChange={e => setSelectedRole(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border font-bold text-xs ${
                        isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                      }`}
                    >
                      <option value="Administrador">👑 Administrador (Acesso Total)</option>
                      <option value="Sócio">🤝 Sócio (Negócios & Financ.)</option>
                      <option value="Gerente">💼 Gerente (Operação/CRM)</option>
                      <option value="Marketing">📣 Marketing (Ativos/Post)</option>
                      <option value="Vendedor">💰 Vendedor (Leads/Deal)</option>
                      <option value="Funcionário">👷 Funcionário (Tarefas/Portal)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold block opacity-75">{t('userLabel')}</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-3.5 text-slate-400" />
                      <input 
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="admin@kvb.com"
                        className={`w-full p-2.5 pl-9 rounded-xl border font-bold text-xs ${
                          isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-bold block opacity-75">{t('passLabel')}</label>
                      <button 
                        type="button"
                        onClick={() => {
                          setRecoverySent(false);
                          setAuthState('recovery');
                        }}
                        className="text-[10px] text-indigo-500 font-bold hover:underline"
                      >
                        {t('forgotPass')}
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound size={14} className="absolute left-3 top-3.5 text-slate-400" />
                      <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full p-2.5 pl-9 rounded-xl border font-mono font-bold text-xs ${
                          isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                        }`}
                        required
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">{t('passHint')}</p>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting || lockoutCountdown > 0}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                  >
                    {isSubmitting ? <RefreshCw className="animate-spin" size={14} /> : <Unlock size={14} />}
                    {lockoutCountdown > 0 ? `Locked ${lockoutCountdown}s` : t('validateBtn')}
                  </button>

                  {/* Sessions fast list */}
                  <div className="border-t border-slate-800 pt-4 space-y-2.5">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block tracking-wider">{t('sessionHistoryTitle')}</span>
                    <div className="space-y-1.5 text-[10px]">
                      {activeSessions.map(sess => (
                        <div key={sess.id} className={`flex justify-between items-center p-2.5 border rounded-xl ${
                          isIosDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div>
                            <span className="font-bold block">{sess.device}</span>
                            <span className="text-slate-400 font-mono">IP: {sess.ip} • {sess.time}</span>
                          </div>
                          {sess.isCurrent ? (
                            <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono uppercase shrink-0">{t('currentSession')}</span>
                          ) : (
                            <button 
                              type="button"
                              onClick={() => terminateSession(sess.id)}
                              className="text-[8px] font-black bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 px-1.5 py-0.5 rounded font-mono uppercase cursor-pointer shrink-0"
                            >
                              {t('remoteLogout')}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              )}

              {/* STAGE 2: TWO FACTOR AUTHENTICATION (2FA) */}
              {authState === 'two-factor' && (
                <form onSubmit={handleVerify2FA} className="space-y-4">
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    isIosDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block leading-none">{t('mfaSentTitle')}</span>
                    <p className="text-[11px] leading-relaxed">
                      {t('mfaSentDesc')}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold block opacity-75">{t('enterCodeMfa')}</label>
                    <input 
                      type="text"
                      maxLength={6}
                      placeholder="Ex: 123456"
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value)}
                      className={`w-full p-2.5 rounded-xl text-center font-mono font-black text-lg tracking-widest ${
                        isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                      }`}
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? <RefreshCw className="animate-spin" size={14} /> : <CheckCircle size={14} />}
                      {t('confirmAccessBtn')}
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleTrigger2FA(mfaChannel)}
                      className={`py-3 px-4 rounded-xl font-bold text-xs ${
                        isIosDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {t('resendBtn')}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                    <span>{t('codeExpires')}</span>
                    <button 
                      type="button"
                      onClick={() => setAuthState('credentials')}
                      className="text-indigo-500 font-bold hover:underline"
                    >
                      {t('backToLogin')}
                    </button>
                  </div>
                </form>
              )}

              {/* STAGE 3: PASSWORD RECOVERY */}
              {authState === 'recovery' && (
                <form onSubmit={handlePasswordRecovery} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold block opacity-75">{t('recoveryTitle')}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => { setRecoveryMethod('email'); setRecoveryContact(''); }}
                        className={`p-2.5 rounded-xl border font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          recoveryMethod === 'email' 
                            ? 'bg-indigo-600/15 border-indigo-500 text-indigo-500' 
                            : 'bg-transparent border-slate-800 text-slate-400'
                        }`}
                      >
                        <Mail size={13} /> {t('viaEmail')}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setRecoveryMethod('whatsapp'); setRecoveryContact(''); }}
                        className={`p-2.5 rounded-xl border font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          recoveryMethod === 'whatsapp' 
                            ? 'bg-emerald-600/15 border-emerald-500 text-emerald-500' 
                            : 'bg-transparent border-slate-800 text-slate-400'
                        }`}
                      >
                        <MessageSquare size={13} /> {t('viaWhatsapp')}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold block opacity-75">
                      {recoveryMethod === 'email' ? t('enterEmailReg') : t('enterPhoneReg')}
                    </label>
                    <input 
                      type="text"
                      placeholder={recoveryMethod === 'email' ? 'exemplo@empresa.com' : '+55 (11) 99999-9999'}
                      value={recoveryContact}
                      onChange={e => setRecoveryContact(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border font-bold text-xs ${
                        isIosDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'
                      }`}
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={recoverySent}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-black rounded-xl transition-all text-center block cursor-pointer shadow-md"
                  >
                    {recoverySent ? 'Token...' : t('sendRecoveryBtn')}
                  </button>

                  <div className="text-center pt-2">
                    <button 
                      type="button"
                      onClick={() => setAuthState('credentials')}
                      className="text-[10px] text-slate-400 hover:text-slate-100 font-bold uppercase tracking-wider"
                    >
                      {t('backToLoginBtn')}
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* Modal footer disclaimer */}
            <div className="p-4 bg-slate-950 text-center font-mono text-[9px] text-slate-400 border-t border-slate-800">
              {t('cryptographyDisclaimer')}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
