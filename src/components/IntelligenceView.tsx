import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  CheckCircle2, 
  X, 
  Share2, 
  Download, 
  Check, 
  Star, 
  AlertTriangle, 
  Flame, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Globe,
  Instagram,
  Phone,
  MessageSquare,
  FileText,
  Compass,
  Briefcase,
  Layers,
  Award,
  MapPin,
  Map,
  Lightbulb,
  ShieldAlert,
  Building,
  Target,
  Users,
  LineChart
} from 'lucide-react';

interface IntelligenceViewProps {
  onAddClient: (clientData: any) => Promise<void>;
  onAddMeeting: (meetingData: any) => Promise<void>;
  onAddTask: (taskData: any) => Promise<void>;
}

interface ScrapedLead {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  instagram: string;
  niche: string;
  location: string;
  bairro: string;
  scores: {
    site: number;
    instagram: number;
    google: number;
    automation: number;
  };
  details: {
    whatsappSpeed: string;
    googleReviews: number;
    instaFollowers: string;
    criticalFlaw: string;
    estimatedLoss: string;
  };
  coordinates: { x: number; y: number }; // Simulated coordinate positions for map pins
  opportunityLevel: 'Alta' | 'Média' | 'Baixa';
}

export default function IntelligenceView({ onAddClient, onAddMeeting, onAddTask }: IntelligenceViewProps) {
  // Top-Level View mode switcher
  const [viewMode, setViewMode] = useState<'hunter' | 'search'>('hunter');

  // Search Filter States
  const [niche, setNiche] = useState('Clínica de Odontologia');
  const [location, setLocation] = useState('São Paulo - SP');
  const [bairro, setBairro] = useState('Pinheiros');
  const [cep, setCep] = useState('05400-000');
  const [searchRadius, setSearchRadius] = useState('5');
  const [minRating, setMinRating] = useState('3.0');
  const [filterNoSite, setFilterNoSite] = useState(false);
  const [filterOldSite, setFilterOldSite] = useState(false);
  const [filterNoWhatsApp, setFilterNoWhatsApp] = useState(false);
  const [filterNoInstagram, setFilterNoInstagram] = useState(false);
  
  // Scanner Execution States
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  // Selected lead for Diagnostic Modal
  const [selectedLead, setSelectedLead] = useState<ScrapedLead | null>(null);
  const [exportedLeadIds, setExportedLeadIds] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [activeDiagnosticTab, setActiveDiagnosticTab] = useState<'audit' | 'pitch' | 'pdf' | 'contract'>('audit');

  // Interactive Map states
  const [hoveredMapPin, setHoveredMapPin] = useState<string | null>(null);

  // Contract proposal states (Simulated contract agreement signature)
  const [contractSigned, setContractSigned] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [isSigning, setIsSigning] = useState(false);

  // Static templates used to generate dynamic leads based on search inputs
  const leadTemplates = [
    {
      name: "Dr. Roberto Silva",
      companySuffix: "Odontologia Integrada",
      phone: "+55 (11) 98765-4321",
      email: "contato@silvaodonto.com.br",
      instaHandle: "dr.robertosilva.odonto",
      bairro: "Pinheiros",
      scores: { site: 2, instagram: 4, google: 3, automation: 1 },
      details: {
        whatsappSpeed: "Demora média: 3.5 horas",
        googleReviews: 8,
        instaFollowers: "1.2k",
        criticalFlaw: "Não possui site otimizado para celulares e o link do Instagram está quebrado.",
        estimatedLoss: "R$ 6.200 / mês"
      },
      coordinates: { x: 35, y: 42 },
      opportunityLevel: 'Alta' as const
    },
    {
      name: "Dra. Beatriz Santos",
      companySuffix: "Estética Avançada",
      phone: "+55 (11) 97654-3210",
      email: "beatriz@santosestetica.com.br",
      instaHandle: "dra.beatrizsantos.estetica",
      bairro: "Jardins",
      scores: { site: 0, instagram: 5, google: 2, automation: 0 },
      details: {
        whatsappSpeed: "Não respondeu no Direct",
        googleReviews: 4,
        instaFollowers: "3.4k",
        criticalFlaw: "Sem site ou Landing Page de agendamento. Captação 100% manual e lenta.",
        estimatedLoss: "R$ 9.400 / mês"
      },
      coordinates: { x: 55, y: 68 },
      opportunityLevel: 'Alta' as const
    },
    {
      name: "Cláudio Ramos",
      companySuffix: "Consultório & Implante",
      phone: "+55 (11) 96543-2109",
      email: "contato@consultorioramos.com.br",
      instaHandle: "ramos.implantes",
      bairro: "Itaim Bibi",
      scores: { site: 3, instagram: 3, google: 5, automation: 1 },
      details: {
        whatsappSpeed: "Demora média: 55 minutos",
        googleReviews: 14,
        instaFollowers: "850",
        criticalFlaw: "Site institucional lento (tempo de carregamento > 6s). Sem pixels de rastreamento de anúncios.",
        estimatedLoss: "R$ 4.800 / mês"
      },
      coordinates: { x: 72, y: 30 },
      opportunityLevel: 'Média' as const
    },
    {
      name: "Dra. Carolina Mendes",
      companySuffix: "Sorriso Kids & Família",
      phone: "+55 (11) 95432-1098",
      email: "kids@mendesodonto.com.br",
      instaHandle: "mendes.sorrisokids",
      bairro: "Vila Mariana",
      scores: { site: 0, instagram: 3, google: 1, automation: 0 },
      details: {
        whatsappSpeed: "Demora média: 1.5 horas",
        googleReviews: 2,
        instaFollowers: "2.1k",
        criticalFlaw: "Ficha do Google Meu Negócio sem horário de atendimento e sem automação de WhatsApp.",
        estimatedLoss: "R$ 7.500 / mês"
      },
      coordinates: { x: 22, y: 75 },
      opportunityLevel: 'Alta' as const
    },
    {
      name: "Dr. Marcos Vinícius",
      companySuffix: "Clínica & Odontopediatria",
      phone: "+55 (11) 94321-0987",
      email: "marcos@odontoestetica.com.br",
      instaHandle: "dr.marcos.odontokids",
      bairro: "Moema",
      scores: { site: 5, instagram: 4, google: 4, automation: 2 },
      details: {
        whatsappSpeed: "Demora média: 2.1 horas",
        googleReviews: 21,
        instaFollowers: "4.8k",
        criticalFlaw: "O site institucional não possui pixel do Meta instalado e está sem formulário ativo.",
        estimatedLoss: "R$ 3.900 / mês"
      },
      coordinates: { x: 48, y: 18 },
      opportunityLevel: 'Média' as const
    },
    {
      name: "Dra. Alice Nogueira",
      companySuffix: "Implantes & Harmonia",
      phone: "+55 (11) 93210-9876",
      email: "contato@alicenogueira.com.br",
      instaHandle: "dra.alicenogueira",
      bairro: "Santana",
      scores: { site: 1, instagram: 2, google: 2, automation: 0 },
      details: {
        whatsappSpeed: "Não possui link na bio do Instagram",
        googleReviews: 1,
        instaFollowers: "410",
        criticalFlaw: "Totalmente ausente de automações. Nota do Google Meu Negócio está desatualizada.",
        estimatedLoss: "R$ 8.100 / mês"
      },
      coordinates: { x: 15, y: 25 },
      opportunityLevel: 'Alta' as const
    }
  ];

  const [leads, setLeads] = useState<ScrapedLead[]>([]);

  // Automatically load initial leads for Hunter Mode simulation
  useEffect(() => {
    const initialLeads = leadTemplates.map((tpl, idx) => ({
      id: `lead-initial-${idx}`,
      name: tpl.name,
      company: `Clínica ${tpl.companySuffix}`,
      phone: tpl.phone,
      email: tpl.email,
      instagram: tpl.instaHandle,
      niche: 'Clínica de Odontologia',
      location: 'São Paulo - SP',
      bairro: tpl.bairro,
      scores: tpl.scores,
      details: tpl.details,
      coordinates: tpl.coordinates,
      opportunityLevel: tpl.opportunityLevel
    }));
    setLeads(initialLeads);
  }, []);

  const runScanner = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([]);
    setShowResults(false);
    setSelectedLead(null);

    const logs = [
      `[0.1s] ⚡ Conectando ao robô KVB AI Crawler Engine v4.0...`,
      `[0.4s] 🔎 Iniciando varredura regional de geolocalização por API...`,
      `[0.9s] 📍 Filtrando bairros vizinhos no raio de ${searchRadius}km de "${location} - ${bairro}" (CEP: ${cep})`,
      `[1.3s] 🔎 Buscando Google Meu Negócio. Filtro: Nota média menor que ${minRating}/5...`,
      `[1.7s] 🌐 Analisando websites e diagnosticando servidores...${filterNoSite ? ' [FILTRO: Sem Site Ativado]' : ''}`,
      `[2.1s] 📱 Mapeando perfis ativos de Instagram e conferindo links na Bio...`,
      `[2.5s] 🤖 Testando canais de triagem automatizada e medindo respostas do WhatsApp...`,
      `[2.9s] 📊 Calculando probabilidade de conversão baseada em perdas de mercado...`,
      `[3.4s] 🧠 Alimentando Sales Learning Brain com dados históricos de vendas da região...`,
      `[3.9s] ✅ Auditoria de mercado concluída! 6 Oportunidades geo-referenciadas geradas com sucesso.`
    ];

    let currentLogIdx = 0;
    const logInterval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setScanLogs(prev => [...prev, logs[currentLogIdx]]);
        setScanProgress(Math.floor(((currentLogIdx + 1) / logs.length) * 100));
        currentLogIdx++;
      } else {
        clearInterval(logInterval);
        
        // Generate actual leads with user's customized niche
        const generatedLeads = leadTemplates.map((tpl, idx) => ({
          id: `lead-scraped-${Date.now()}-${idx}`,
          name: tpl.name,
          company: `${niche} ${tpl.companySuffix}`,
          phone: tpl.phone,
          email: tpl.email,
          instagram: tpl.instaHandle,
          niche: niche,
          location: location,
          bairro: tpl.bairro,
          scores: tpl.scores,
          details: tpl.details,
          coordinates: tpl.coordinates,
          opportunityLevel: tpl.opportunityLevel
        }));

        setLeads(generatedLeads);
        setIsScanning(false);
        setShowResults(true);
      }
    }, 450);
  };

  const calculateAverageScore = (scores: ScrapedLead['scores']) => {
    const sum = scores.site + scores.instagram + scores.google + scores.automation;
    return (sum / 4).toFixed(1);
  };

  const handlePushToCrm = async (lead: ScrapedLead) => {
    setIsExporting(lead.id);
    
    // 1. Add to Client CRM as "Em negociação"
    const clientPayload = {
      name: lead.name,
      company: lead.company,
      phone: lead.phone,
      email: lead.email,
      instagram: `@${lead.instagram}`,
      niche: lead.niche,
      plan: "Combo Inteligente (Site + Automação)",
      monthlyValue: 350,
      status: "Em negociação" as const
    };

    // 2. Add as Meeting in Deals View
    const meetingPayload = {
      clientName: lead.name,
      company: lead.company,
      phone: lead.phone,
      instagram: `@${lead.instagram}`,
      niche: lead.niche,
      stage: "Reunião Agendada" as const,
      date: new Date().toISOString().split('T')[0],
      notes: `Lead prospectado pela KVB Intelligence. Diagnóstico de perda estimada: ${lead.details.estimatedLoss}. Falha Crítica: ${lead.details.criticalFlaw}`,
      closedValue: 0
    };

    // 3. Add task to production kanban
    const taskPayload = {
      title: `Apresentar Proposta Comercial - ${lead.company}`,
      description: `Disparar script de WhatsApp e agendar demonstração técnica da Landing Page + Robô do WhatsApp. Perda estimada: ${lead.details.estimatedLoss}.`,
      status: "Pendente" as const,
      priority: "Alta" as const,
      assignedTo: "Carlos Dev",
      client: lead.company,
      category: "Comercial"
    };

    try {
      await onAddClient(clientPayload);
      await onAddMeeting(meetingPayload);
      await onAddTask(taskPayload);
      
      setExportedLeadIds(prev => [...prev, lead.id]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(null);
    }
  };

  const generatePitchText = (lead: ScrapedLead) => {
    return `Olá, *${lead.name}*! Tudo bem?\n\nMe chamo Carlos e sou Líder Comercial do *KVB Group*.\n\nEstávamos avaliando os canais digitais de *${lead.niche}* em *${lead.location}* utilizando nossa tecnologia de análise proprietária e geramos um diagnóstico técnico de desempenho do *${lead.company}*.\n\nIdentificamos algumas vulnerabilidades graves que podem estar provocando um vazamento de clientes avaliado em cerca de *${lead.details.estimatedLoss}* por mês em agendamentos perdidos:\n\n🚨 *Falhas Críticas Identificadas:*\n- Website / Mobile: Nota ${lead.scores.site}/10 (${lead.details.criticalFlaw})\n- Google Local SEO: Nota ${lead.scores.google}/10 (${lead.details.googleReviews} avaliações)\n- Chatbot de Conversão: Nota ${lead.scores.automation}/10 (Tempo médio de resposta de ${lead.details.whatsappSpeed})\n\nConstruímos uma proposta completa com Landing Page de Alta Performance integrada a um robô inteligente de triagem no WhatsApp.\n\nPosso te encaminhar o arquivo PDF sem compromisso por aqui para você apresentar à sua equipe?`;
  };

  const handleSignContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName) return;
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setContractSigned(true);
      alert('Contrato Simulado assinado eletronicamente e registrado com sucesso no Blockchain da KVB!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Title */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-rose-500/15 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <span className="text-[10px] font-black tracking-wider text-indigo-400 font-mono uppercase bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/20">
              MÓDULO EXCLUSIVO ADMIN - KVB SYSTEM
            </span>
            <h2 className="text-xl md:text-2xl font-black tracking-tight font-sans">
              KVB Intelligence <span className="text-indigo-400 font-medium">| IA de Inteligência Comercial</span>
            </h2>
            <p className="text-xs text-slate-300 font-medium max-w-2xl leading-relaxed">
              O cérebro de prospecção e crescimento autônomo da KVB. Rastreia oportunidades de mercado na região, avalia brechas técnicas nos sites e redes sociais locais e cria pontes de vendas com abordagens automáticas e propostas geradas em tempo recorde.
            </p>
          </div>
          
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setViewMode('hunter')}
              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
                viewMode === 'hunter'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'bg-slate-900 text-slate-400 border border-slate-850 hover:text-white'
              }`}
            >
              <Target size={14} />
              Modo Caça-Oportunidades
            </button>
            <button
              onClick={() => setViewMode('search')}
              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
                viewMode === 'search'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'bg-slate-900 text-slate-400 border border-slate-850 hover:text-white'
              }`}
            >
              <Map size={14} />
              Auditar Mercado & Mapa
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: HUNTER MODE (Overview command center & Sales Learning Brain) */}
      {viewMode === 'hunter' && (
        <div className="space-y-6">
          
          {/* Today's Hunting Statistics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase block">Empresas Monitoradas Hoje</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-sans text-slate-800">92</span>
                <span className="text-[10px] text-indigo-600 font-bold font-mono">100% Autônomo</span>
              </div>
              <p className="text-[10px] text-slate-400">Varredura contínua cobrindo São Paulo e região metropolitana.</p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase block">Alertas de Vazamento Comercial</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-sans text-rose-600">34 <span className="text-xs text-slate-400 font-normal">Pizzarias</span></span>
                <span className="text-[10px] text-slate-400 font-mono">/ 19 Clínicas</span>
              </div>
              <p className="text-[10px] text-slate-400">Total de 53 negócios identificados com notas gerais críticas abaixo de 4/10.</p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase block">Prejuízo de Vazamento Total</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-sans text-amber-600">R$ 382.400</span>
                <span className="text-[9px] text-slate-400 font-bold">/ mensal</span>
              </div>
              <p className="text-[10px] text-slate-400">Soma estimada de receitas perdidas por falta de sites e robôs rápidos.</p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase block">Poder Comercial da KVB</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-sans text-emerald-600">82.3%</span>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">Taxa de Resposta</span>
              </div>
              <p className="text-[10px] text-slate-400">Eficácia dos scripts personalizados de abordagem focados nas falhas.</p>
            </div>
          </div>

          {/* Core Grid: Sales Learning Brain + Top 20 opportunities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sales Learning Brain (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb size={16} className="text-indigo-600 animate-bounce" />
                  <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono">IA Aprende com as Vendas</h3>
                </div>
                <p className="text-[11px] text-slate-400">Insights gerados automaticamente pela inteligência de conversão baseada em negócios fechados.</p>
              </div>

              <div className="space-y-3.5">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-indigo-700 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded">
                      Nicho: Alimentação & Delivery
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">Conversão: 84%</span>
                  </div>
                  <p className="text-xs text-slate-800 font-bold">Tática de Abordagem Altamente Eficaz:</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Pizzarias e restaurantes fecham contratos muito mais rápido quando a abordagem foca na <strong className="text-indigo-600">automação do WhatsApp</strong> para receber pedidos sem cobrar taxa do iFood.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-emerald-700 font-mono uppercase bg-emerald-50 px-2 py-0.5 rounded">
                      Nicho: Clínicas & Saúde
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">Conversão: 79%</span>
                  </div>
                  <p className="text-xs text-slate-800 font-bold">Tática de Abordagem Altamente Eficaz:</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Médicos e dentistas reagem extremamente bem quando oferecemos <strong className="text-emerald-600">Redutor de No-Show (Faltas)</strong> com disparo automático de lembretes integrados ao calendário de consultas.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-pink-700 font-mono uppercase bg-pink-50 px-2 py-0.5 rounded">
                      Nicho: Estética & Beleza
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">Conversão: 72%</span>
                  </div>
                  <p className="text-xs text-slate-800 font-bold">Tática de Abordagem Altamente Eficaz:</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Barbearias e salões fecham melhor demonstrando <strong className="text-pink-600">Agendamento Online Integrado</strong> e automação de posts diários gerados por IA para manter as redes sociais ativas.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-800">
                💡 <strong className="font-bold">Otimização Contínua:</strong> O agente de IA analisa os dados do CRM da KVB diariamente e ajusta as copies e gatilhos mentais dos roteiros de abordagem em tempo real.
              </div>
            </div>

            {/* Top 20 Opportunities list (7 cols) */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-black text-slate-800 tracking-tight uppercase font-mono">Top Oportunidades Críticas</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Filtradas por maior perda comercial estimada na região.</p>
                </div>
                <span className="text-[10px] bg-rose-100 text-rose-700 font-bold py-0.5 px-2 rounded-full uppercase">Crítico 🔥</span>
              </div>

              <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-2">
                {leads.slice(0, 5).map((lead) => {
                  const avg = calculateAverageScore(lead.scores);
                  return (
                    <div 
                      key={lead.id} 
                      className="p-3 border border-slate-150 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] font-black text-slate-400 uppercase font-mono bg-white px-1 rounded border border-slate-100">{lead.bairro}</span>
                          <span className="text-xs font-black text-slate-800">{lead.company}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Médico: {lead.name} • <span className="text-rose-600 font-semibold">Perda estimada: {lead.details.estimatedLoss}</span></p>
                        <p className="text-[10px] text-slate-400 truncate max-w-sm italic">"{lead.details.criticalFlaw}"</p>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="text-right">
                          <span className="text-[8px] font-bold text-slate-400 block font-mono">NOTA</span>
                          <span className="text-xs font-extrabold font-mono text-slate-700">{avg}/10</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setActiveDiagnosticTab('audit');
                          }}
                          className="py-1 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-lg text-[10px] cursor-pointer transition-all"
                        >
                          Auditar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setViewMode('search')}
                  className="py-2 px-4 border border-indigo-200 hover:border-indigo-300 text-indigo-700 font-bold rounded-lg text-xs transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  Ver Painel de Auditoria Completo & Mapa
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: SEARCH & AUDITING PANEL WITH INTERACTIVE MAP */}
      {viewMode === 'search' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Config of Audit (4 cols) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Compass className="text-indigo-600" size={18} />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">Filtros Avançados de Prospecção</h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase font-mono block mb-1">Nicho Comercial</label>
                  <select 
                    value={niche} 
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Clínica de Odontologia">🩺 Clínica de Odontologia</option>
                    <option value="Clínica de Estética">💅 Clínica de Estética</option>
                    <option value="Pizzaria & Delivery">🍕 Pizzaria & Delivery</option>
                    <option value="Escritório de Advocacia">⚖️ Escritório de Advocacia</option>
                    <option value="Hospital Veterinário">🐾 Hospital Veterinário</option>
                    <option value="Academia de Crossfit">🏋️ Academia de Crossfit</option>
                    <option value="Imobiliária Local">🏢 Imobiliária Local</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase font-mono block mb-1">Cidade / Estado</label>
                    <input 
                      type="text" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ex: São Paulo - SP"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase font-mono block mb-1">Bairro Alvo</label>
                    <input 
                      type="text" 
                      value={bairro} 
                      onChange={(e) => setBairro(e.target.value)}
                      placeholder="Ex: Pinheiros"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase font-mono block mb-1">CEP Região</label>
                    <input 
                      type="text" 
                      value={cep} 
                      onChange={(e) => setCep(e.target.value)}
                      placeholder="05400-000"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase font-mono block mb-1">Raio de Busca (km)</label>
                    <select
                      value={searchRadius}
                      onChange={(e) => setSearchRadius(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 cursor-pointer"
                    >
                      <option value="1">1 km (Hiper-local)</option>
                      <option value="3">3 km</option>
                      <option value="5">5 km (Recomendado)</option>
                      <option value="10">10 km</option>
                      <option value="20">20 km (Amplo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase font-mono block mb-1">Avaliação Máxima Google (0 a 5)</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="3.0">Até 3.0 (Altamente Críticas)</option>
                    <option value="4.0">Até 4.0 (Moderadas)</option>
                    <option value="4.5">Até 4.5 (Pequenos ajustes)</option>
                  </select>
                </div>

                {/* Additional checkboxes for granular filters */}
                <div className="space-y-2 pt-2 border-t border-slate-150">
                  <span className="text-[9px] font-black text-slate-400 font-mono uppercase block">Vulnerabilidades Requeridas</span>
                  
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={filterNoSite}
                      onChange={(e) => setFilterNoSite(e.target.checked)}
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-3.5 h-3.5"
                    />
                    <span>Sem site / Landing Page ativa</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={filterOldSite}
                      onChange={(e) => setFilterOldSite(e.target.checked)}
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-3.5 h-3.5"
                    />
                    <span>Site antigo / Lento / Não responsivo</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={filterNoWhatsApp}
                      onChange={(e) => setFilterNoWhatsApp(e.target.checked)}
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-3.5 h-3.5"
                    />
                    <span>Sem bot de resposta rápida WhatsApp</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={filterNoInstagram}
                      onChange={(e) => setFilterNoInstagram(e.target.checked)}
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-3.5 h-3.5"
                    />
                    <span>Sem link de vendas na Bio do Instagram</span>
                  </label>
                </div>

                <button 
                  onClick={runScanner}
                  disabled={isScanning}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-3"
                >
                  <Search size={14} className={isScanning ? 'animate-spin' : ''} />
                  {isScanning ? 'Rastreando Mercado...' : 'Iniciar Auditoria Geolocalizada'}
                </button>
              </div>
            </div>

            {/* Right Column: Interactive map + terminal output (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Map block container */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-terminal-grid opacity-[0.02] pointer-events-none"></div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800 z-10">
                  <div className="flex items-center gap-2">
                    <Map className="text-indigo-400" size={16} />
                    <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider font-mono">Mapa de Oportunidades Críticas</h3>
                  </div>
                  <span className="text-[10px] font-bold font-mono text-slate-500">SÃO PAULO GEOTARGET RAIO DE {searchRadius}KM</span>
                </div>

                {/* Simulated street map grid */}
                <div className="bg-slate-950 rounded-xl h-[280px] w-full border border-slate-850 relative overflow-hidden mt-3 shadow-inner">
                  {/* Styled streets design lines */}
                  <div className="absolute inset-x-0 top-1/4 h-0.5 bg-slate-800/25"></div>
                  <div className="absolute inset-x-0 top-2/3 h-0.5 bg-slate-800/25"></div>
                  <div className="absolute inset-y-0 left-1/3 w-0.5 bg-slate-800/25"></div>
                  <div className="absolute inset-y-0 left-3/4 w-0.5 bg-slate-800/25"></div>
                  <div className="absolute top-10 left-10 w-44 h-44 rounded-full border border-dashed border-slate-800/20"></div>
                  <div className="absolute bottom-5 right-20 w-32 h-32 rounded-full border border-dashed border-slate-800/20"></div>

                  {/* Pin points loops on map */}
                  {leads.map((pin) => {
                    const isHovered = hoveredMapPin === pin.id;
                    return (
                      <div
                        key={pin.id}
                        className="absolute cursor-pointer transition-all duration-150"
                        style={{ left: `${pin.coordinates.x}%`, top: `${pin.coordinates.y}%` }}
                        onMouseEnter={() => setHoveredMapPin(pin.id)}
                        onMouseLeave={() => setHoveredMapPin(null)}
                        onClick={() => {
                          setSelectedLead(pin);
                          setActiveDiagnosticTab('audit');
                        }}
                      >
                        {/* Blinking opportunity radar pulse pin */}
                        <div className="relative flex items-center justify-center">
                          <span className={`absolute inline-flex h-5 w-5 rounded-full opacity-60 animate-ping ${
                            pin.opportunityLevel === 'Alta' ? 'bg-rose-500' : 'bg-amber-400'
                          }`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 border border-slate-950 ${
                            pin.opportunityLevel === 'Alta' ? 'bg-rose-500' : 'bg-amber-400'
                          }`}></span>
                        </div>

                        {/* Hover detailed float card */}
                        {isHovered && (
                          <div className="absolute left-4 bottom-4 bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-xl text-left w-52 z-30 animate-fadeIn">
                            <span className="text-[7px] font-black uppercase font-mono tracking-widest text-indigo-400">{pin.bairro}</span>
                            <p className="text-[10px] font-black text-white truncate">{pin.company}</p>
                            <p className="text-[8px] text-slate-400 font-mono pt-0.5">Vazamento: <span className="text-rose-400 font-bold">{pin.details.estimatedLoss}</span></p>
                            <p className="text-[7px] text-slate-400 pt-1 font-sans truncate">"{pin.details.criticalFlaw}"</p>
                            <span className="text-[7px] font-bold text-indigo-300 block pt-1 font-mono">Clique para Auditar →</span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Map Watermark Legend */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 p-2 rounded text-[8px] font-mono font-bold text-slate-400 space-y-1 z-10">
                    <span className="block text-[7px] uppercase tracking-wider text-slate-500 mb-1">Legenda de Oportunidade</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 block"></span>
                      <span>🟢 Vazamento Crítico (&gt;R$5k)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 block"></span>
                      <span>🟡 Vulnerabilidade Média</span>
                    </div>
                  </div>
                </div>

                {/* Simulated live scanner crawler logs terminal */}
                {isScanning && (
                  <div className="mt-4 p-3 bg-slate-950 border border-slate-850 rounded-xl font-mono text-[10px] text-slate-300 space-y-1">
                    <div className="flex justify-between font-bold text-slate-500 border-b border-slate-850 pb-1 mb-1">
                      <span>CRAWLER LOG OUTPUT</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="max-h-20 overflow-y-auto pr-1">
                      {scanLogs.map((log, index) => (
                        <div key={index} className="flex gap-1.5">
                          <span className="text-indigo-400">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Results section rendered */}
          {leads.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" size={18} />
                    Leads Qualificados em {location}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium font-mono">Filtro: {niche} • Escaneamento Autônomo KVB Intelligence</p>
                </div>
                <div className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 self-start">
                  {leads.length} Empresas Identificadas na Região
                </div>
              </div>

              {/* Grid of Found Leads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map((lead) => {
                  const avgScore = calculateAverageScore(lead.scores);
                  const isExported = exportedLeadIds.includes(lead.id);
                  
                  return (
                    <div 
                      key={lead.id} 
                      className="bg-slate-50 hover:bg-indigo-50/20 border border-slate-200 hover:border-indigo-200 rounded-xl p-4 transition-all flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-3">
                        {/* Header with Title and average score */}
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono bg-white px-1.5 py-0.2 rounded border border-slate-200">
                                {lead.bairro}
                              </span>
                              <span className="text-[9px] font-black text-indigo-600 font-mono uppercase bg-indigo-50 px-1 py-0.2 rounded">
                                {lead.opportunityLevel} Risco
                              </span>
                            </div>
                            <h4 className="text-sm font-black text-slate-800 mt-1 leading-tight">{lead.company}</h4>
                            <p className="text-[10px] text-slate-400 font-medium font-mono">{lead.name}</p>
                          </div>
                          <div className="text-center shrink-0">
                            <span className="text-[9px] font-black text-slate-400 uppercase font-mono block">MÉDIA GERAL</span>
                            <span className={`text-base font-black font-mono px-2 py-0.5 rounded border ${
                              Number(avgScore) <= 2.5 
                                ? 'text-rose-600 bg-rose-50 border-rose-100' 
                                : 'text-amber-600 bg-amber-50 border-amber-100'
                            }`}>
                              {avgScore}/10
                            </span>
                          </div>
                        </div>

                        {/* Channel scores */}
                        <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-200">
                          <div className="text-center bg-white p-1 rounded border border-slate-100">
                            <span className="text-[8px] font-bold text-slate-400 font-mono block">WEBSITE</span>
                            <span className="text-[10px] font-black font-mono text-slate-700">{lead.scores.site}/10</span>
                          </div>
                          <div className="text-center bg-white p-1 rounded border border-slate-100">
                            <span className="text-[8px] font-bold text-slate-400 font-mono block">INSTA</span>
                            <span className="text-[10px] font-black font-mono text-slate-700">{lead.scores.instagram}/10</span>
                          </div>
                          <div className="text-center bg-white p-1 rounded border border-slate-100">
                            <span className="text-[8px] font-bold text-slate-400 font-mono block">GOOGLE</span>
                            <span className="text-[10px] font-black font-mono text-slate-700">{lead.scores.google}/10</span>
                          </div>
                          <div className="text-center bg-white p-1 rounded border border-slate-100">
                            <span className="text-[8px] font-bold text-slate-400 font-mono block">AUTOM.</span>
                            <span className="text-[10px] font-black font-mono text-slate-700">{lead.scores.automation}/10</span>
                          </div>
                        </div>

                        {/* Flaws/estimated loss alert */}
                        <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-lg flex gap-2 items-start">
                          <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={14} />
                          <div className="space-y-0.5">
                            <p className="text-[10px] text-rose-800 font-bold leading-normal">
                              Perda Estimada: <span className="font-black text-rose-900">{lead.details.estimatedLoss}</span>
                            </p>
                            <p className="text-[9px] text-rose-600 font-medium leading-relaxed">
                              {lead.details.criticalFlaw}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions buttons */}
                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            setSelectedLead(lead);
                            setActiveDiagnosticTab('audit');
                          }}
                          className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-lg text-[10px] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <FileText size={12} />
                          Diagnóstico & Proposta
                        </button>
                        <button 
                          onClick={() => handlePushToCrm(lead)}
                          disabled={isExported || isExporting === lead.id}
                          className={`flex-1 py-1.5 px-3 font-bold rounded-lg text-[10px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isExported 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50' 
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md'
                          }`}
                        >
                          {isExporting === lead.id ? (
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : isExported ? (
                            <>
                              <Check size={12} />
                              No CRM & Kanban
                            </>
                          ) : (
                            <>
                              <Briefcase size={12} />
                              Exportar para CRM
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Beautiful Modal Dialog for PDF / Pitch Diagnostics / Contract */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn">
            
            {/* Modal Header */}
            <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase font-mono tracking-widest text-indigo-400">KVB Intelligence Command</h3>
                  <h4 className="text-sm font-black text-white">{selectedLead.company}</h4>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Internal Tabs */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 flex gap-4 overflow-x-auto">
              <button 
                onClick={() => setActiveDiagnosticTab('audit')}
                className={`py-3 text-[11px] font-black uppercase font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeDiagnosticTab === 'audit' 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Auditoria Técnica
              </button>
              <button 
                onClick={() => setActiveDiagnosticTab('pitch')}
                className={`py-3 text-[11px] font-black uppercase font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeDiagnosticTab === 'pitch' 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Script WhatsApp
              </button>
              <button 
                onClick={() => setActiveDiagnosticTab('pdf')}
                className={`py-3 text-[11px] font-black uppercase font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeDiagnosticTab === 'pdf' 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                3. Proposta PDF
              </button>
              <button 
                onClick={() => setActiveDiagnosticTab('contract')}
                className={`py-3 text-[11px] font-black uppercase font-mono border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeDiagnosticTab === 'contract' 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                4. Contrato Digital de Serviços
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-6">
              
              {/* TAB 1: AUDIT */}
              {activeDiagnosticTab === 'audit' && (
                <div className="space-y-6">
                  {/* Performance Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-400 font-mono">WEBSITE</span>
                        <Globe size={14} className="text-slate-400" />
                      </div>
                      <p className="text-xl font-black font-mono text-slate-800">{selectedLead.scores.site}/10</p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        selectedLead.scores.site <= 2 ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {selectedLead.scores.site <= 2 ? 'Crítico/Inexistente' : 'Desatualizado'}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-400 font-mono">INSTAGRAM</span>
                        <Instagram size={14} className="text-slate-400" />
                      </div>
                      <p className="text-xl font-black font-mono text-slate-800">{selectedLead.scores.instagram}/10</p>
                      <span className="text-[9px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
                        Seguidores: {selectedLead.details.instaFollowers}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-400 font-mono">GOOGLE</span>
                        <Star size={14} className="text-slate-400" />
                      </div>
                      <p className="text-xl font-black font-mono text-slate-800">{selectedLead.scores.google}/10</p>
                      <span className="text-[9px] font-bold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">
                        {selectedLead.details.googleReviews} Avaliações
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-400 font-mono">AUTOM.</span>
                        <Phone size={14} className="text-slate-400" />
                      </div>
                      <p className="text-xl font-black font-mono text-slate-800">{selectedLead.scores.automation}/10</p>
                      <span className="text-[9px] font-bold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">
                        {selectedLead.details.whatsappSpeed}
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic Detail Table */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                      <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">Oportunidades de Otimização</h5>
                      <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded">
                        Prejuízo Mensal Projetado: {selectedLead.details.estimatedLoss}
                      </span>
                    </div>
                    
                    <div className="divide-y divide-slate-100 p-4 space-y-3 text-slate-700">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-1.5">
                        <div className="text-[10px] font-extrabold text-slate-500 font-mono uppercase">Funil de Captação</div>
                        <div className="md:col-span-2 text-xs font-semibold">
                          Falta de Landing Page otimizada focada em conversão direta. Hoje dependem de cliques diretos no Instagram sem estruturação de copy.
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-1.5">
                        <div className="text-[10px] font-extrabold text-slate-500 font-mono uppercase">Atendimento Digital</div>
                        <div className="md:col-span-2 text-xs font-semibold">
                          O tempo de resposta atual de {selectedLead.details.whatsappSpeed} gera uma quebra no funil de vendas. 78% dos potenciais clientes compram do concorrente que responde primeiro no WhatsApp.
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-1.5">
                        <div className="text-[10px] font-extrabold text-slate-500 font-mono uppercase">Google Local SEO</div>
                        <div className="md:col-span-2 text-xs font-semibold">
                          Apenas {selectedLead.details.googleReviews} avaliações na ficha do Google Meu Negócio. É necessário disparar uma rotina pós-atendimento incentivando notas 5 estrelas dos clientes atuais.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KVB Proposed Solution Pack */}
                  <div className="bg-indigo-900 text-white rounded-xl p-5 shadow-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-indigo-800">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-indigo-300 font-mono uppercase tracking-widest bg-indigo-950 px-2 py-0.5 rounded">
                        SOLUÇÃO PROPOSTA PELA KVB
                      </span>
                      <h5 className="text-sm font-black tracking-tight">Combo Smart: Landing Page + Automação de WhatsApp</h5>
                      <p className="text-[11px] text-indigo-100 leading-relaxed max-w-xl">
                        Criação de Site Responsivo de Alta Conversão integrado a um Chatbot de Classificação e Agendamento no WhatsApp. Resolve as duas maiores brechas comerciais do Lead de uma vez só.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] text-indigo-200 block font-mono font-bold">VALOR PROPOSTO</span>
                      <span className="text-lg font-black font-sans text-indigo-300">R$ 350,00 <span className="text-xs text-white font-normal">/ mês</span></span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PITCH SCRIPT */}
              {activeDiagnosticTab === 'pitch' && (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-semibold leading-relaxed flex gap-2">
                    <AlertTriangle className="text-amber-500 shrink-0" size={16} />
                    <span>
                      Copie o roteiro comercial de alta conversão abaixo e faça o disparo para o prospect. Este script foi criado e calibrado de acordo com as falhas exclusivas analisadas no {selectedLead.company}.
                    </span>
                  </div>

                  <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 font-mono text-xs relative shadow-inner">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatePitchText(selectedLead));
                        alert('Script de WhatsApp copiado para a área de transferência!');
                      }}
                      className="absolute top-3 right-3 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-[10px] font-bold text-slate-300 transition-colors cursor-pointer"
                    >
                      Copiar Script
                    </button>
                    <pre className="whitespace-pre-wrap leading-relaxed">{generatePitchText(selectedLead)}</pre>
                  </div>
                </div>
              )}

              {/* TAB 3: VISUAL PDF DIAGNOSTIC & PROPOSAL */}
              {activeDiagnosticTab === 'pdf' && (
                <div className="bg-white rounded-xl border border-slate-300 shadow-lg p-8 max-w-2xl mx-auto space-y-6 font-sans text-slate-800">
                  
                  {/* PDF Cover Header */}
                  <div className="flex justify-between items-center border-b-2 border-slate-900 pb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-950 text-white font-bold flex items-center justify-center rounded">K</div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 font-mono tracking-widest block leading-none">DIAGNÓSTICO TÉCNICO</span>
                        <span className="text-xs font-black text-slate-800 font-mono tracking-tight">KVB SYSTEM ANALYTICS</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold font-mono text-slate-400">DATA: {new Date().toLocaleDateString('pt-BR')}</span>
                  </div>

                  {/* Cover Title */}
                  <div className="space-y-2">
                    <span className="text-xs text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full font-black font-mono">RELATÓRIO DE RISCOS COMERCIAIS</span>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                      Vulnerabilidades Digitais de Captação e Perda Financeira Projetada: {selectedLead.company}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Este relatório técnico avalia a eficiência de canais, presença de buscas locais, velocidade de resposta a leads e consistência da experiência digital do usuário final.
                    </p>
                  </div>

                  {/* Middle score details visualizer inside simulated PDF */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="space-y-1.5">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono">AVALIAÇÃO GERAL DA PRESENÇA</h5>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black font-mono text-slate-900">{calculateAverageScore(selectedLead.scores)}</span>
                        <span className="text-xs font-bold text-slate-400">/ 10</span>
                      </div>
                      <p className="text-[10px] text-rose-600 font-bold uppercase tracking-wide">STATUS: PRESENÇA ALTAMENTE VULNERÁVEL</p>
                    </div>

                    <div className="space-y-1 text-right">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono">PERDA POR FALHA DE CONVERSÃO</h5>
                      <p className="text-2xl font-black font-mono text-rose-600 leading-none pt-1">{selectedLead.details.estimatedLoss}</p>
                      <p className="text-[9px] text-slate-400">Projeção conservadora baseada no fluxo de buscas local.</p>
                    </div>
                  </div>

                  {/* Section list */}
                  <div className="space-y-3.5">
                    <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-widest font-mono border-b border-slate-200 pb-1.5">Mapeamento de Falhas Críticas</h5>
                    
                    <div className="space-y-3">
                      <div className="flex gap-2.5 items-start">
                        <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">01</div>
                        <div>
                          <p className="text-xs font-black text-slate-900">Perda de tráfego por ausência de Landing Page Responsiva</p>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            {selectedLead.details.criticalFlaw} Sem pixel de rastreamento do Facebook ou Google para rodar remarketing.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2.5 items-start">
                        <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">02</div>
                        <div>
                          <p className="text-xs font-black text-slate-900">Ausência de automação de lead-to-sale e triagem automática</p>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            O atendimento comercial depende de esforço puramente manual e descentralizado. Tempo médio de resposta atual de {selectedLead.details.whatsappSpeed}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended plan */}
                  <div className="p-4 bg-indigo-50 border border-indigo-150 rounded-xl space-y-2 text-slate-700">
                    <span className="text-[9px] font-extrabold text-indigo-700 font-mono block uppercase">PLANO DE REVERSÃO COMERCIAL</span>
                    <h5 className="text-xs font-black text-slate-900 uppercase">Combo Smart: Landing Page de Elite + Automação de Agendamentos</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Infraestrutura completa de captação operando 24 horas por dia. Landing page ultra-rápida integrada com Evolution API e webhooks customizados no n8n.
                    </p>
                    <div className="flex justify-between items-center pt-2 text-xs font-bold border-t border-indigo-100 mt-1">
                      <span>Mensalidade: R$ 350,00</span>
                      <span>Setup de Implementação: R$ 599,00</span>
                    </div>
                  </div>

                  {/* Cover Footer */}
                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span>Documento Auditado por KVB Intelligence Agent</span>
                    <span>Criptografia de Certificação KVB System</span>
                  </div>

                </div>
              )}

              {/* TAB 4: COMMERCIAL PROPOSAL CONTRACT */}
              {activeDiagnosticTab === 'contract' && (
                <div className="bg-white rounded-xl border border-slate-300 shadow-lg p-8 max-w-2xl mx-auto space-y-6 font-sans text-slate-800 relative">
                  {contractSigned && (
                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] pointer-events-none flex items-center justify-center">
                      <div className="bg-emerald-50 border-2 border-emerald-500 p-4 rounded-xl shadow-xl transform rotate-12 text-center text-emerald-800 max-w-xs font-black uppercase font-mono tracking-widest leading-tight">
                        ✓ CONTRATO ASSINADO E REGISTRADO NO BLOCKCHAIN
                      </div>
                    </div>
                  )}

                  {/* Contract Header */}
                  <div className="text-center border-b border-slate-200 pb-4">
                    <span className="text-[9px] font-black tracking-wider text-slate-400 font-mono uppercase">CONTRATO PRESTACIONAL DE TECNOLOGIA</span>
                    <h4 className="text-sm font-black text-slate-900 uppercase pt-1">Instrumento Particular de Prestação de Serviços Digitais</h4>
                  </div>

                  {/* Contract Body Clause list */}
                  <div className="space-y-4 text-xs text-slate-600 leading-relaxed max-h-[350px] overflow-y-auto pr-2">
                    <div>
                      <strong className="text-slate-850">CLÁUSULA PRIMEIRA - DAS PARTES</strong>
                      <p className="text-[11px] pt-1">
                        De um lado, <strong>KVB SYSTEM S.A.</strong>, inscrita no CNPJ sob o nº 44.555.222/0001-99, sediada em São Paulo/SP, doravante denominada PRESTADORA. De outro lado, a empresa <strong>{selectedLead.company}</strong>, representada por <strong>{selectedLead.name}</strong>, doravante denominada CONTRATANTE.
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-850">CLÁUSULA SEGUNDA - DO OBJETO</strong>
                      <p className="text-[11px] pt-1">
                        O presente contrato tem como objeto a prestação de serviços de desenvolvimento de Landing Page Premium responsiva, implantação de robô de atendimento WhatsApp e integração de funis de agendamento comercial no SaaS Multi-Tenant da Prestadora.
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-850">CLÁUSULA TERCEIRA - DOS VALORES E FORMA DE PAGAMENTO</strong>
                      <p className="text-[11px] pt-1">
                        Como contraprestação pelos serviços, a CONTRATANTE pagará o valor de <strong>R$ 599,00 (quinhentos e noventa e nove reais)</strong> como taxa única de setup e implementação, e mensalidade recorrente de <strong>R$ 350,00 (trezentos e cinquenta reais)</strong> vencendo todo dia 10 de cada mês, via Boleto ou PIX.
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-850">CLÁUSULA QUARTA - DO SLA E SUPORTE</strong>
                      <p className="text-[11px] pt-1">
                        A PRESTADORA garante estabilidade de plataforma e uptime do robô do WhatsApp em 99,9% sob os domínios customizados, prestando suporte de manutenção técnica em até 24h úteis.
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-850">CLÁUSULA QUINTA - DOS PRAZOS</strong>
                      <p className="text-[11px] pt-1">
                        O prazo oficial para entrega de todos os ativos configurados e homologados é de <strong>10 (dez) dias úteis</strong>, contados a partir da assinatura digital deste instrumento.
                      </p>
                    </div>
                  </div>

                  {/* Contract sign footer form */}
                  {!contractSigned ? (
                    <form onSubmit={handleSignContract} className="border-t border-slate-200 pt-4 space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase font-mono">Assinatura do Representante Legal</label>
                        <input 
                          type="text" 
                          value={signerName}
                          onChange={(e) => setSignerName(e.target.value)}
                          placeholder="Digite seu nome completo (Ex: Roberto Silva)" 
                          required
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSigning}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-lg text-xs transition-all shadow cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        <FileText size={14} />
                        {isSigning ? 'Registrando Assinatura...' : 'Assinar Contrato Digitalmente'}
                      </button>
                    </form>
                  ) : (
                    <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-emerald-700 font-bold font-mono">
                      <span>✓ ASSINADO POR: {signerName}</span>
                      <span>HASH: SHA-256-{Date.now().toString(16)}</span>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">KVB Admin Tools v4.0</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="py-1.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Fechar
                </button>
                <button 
                  onClick={() => handlePushToCrm(selectedLead)}
                  disabled={exportedLeadIds.includes(selectedLead.id) || isExporting === selectedLead.id}
                  className={`py-1.5 px-4 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                    exportedLeadIds.includes(selectedLead.id)
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow'
                  }`}
                >
                  {isExporting === selectedLead.id ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : exportedLeadIds.includes(selectedLead.id) ? (
                    <>
                      <Check size={14} />
                      Lead no CRM & Kanban!
                    </>
                  ) : (
                    <>
                      <Briefcase size={14} />
                      Exportar para CRM
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
