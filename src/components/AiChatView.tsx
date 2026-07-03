import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Globe, 
  Megaphone, 
  Percent, 
  Cpu,
  Loader2,
  ListRestart,
  TrendingUp,
  Briefcase,
  Layers,
  Sparkle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
}

type AgentType = 'CEO' | 'Vendedor' | 'Desenvolvedor' | 'Marketing' | 'Tráfego' | 'Automações';

export default function AiChatView() {
  const [activeAgent, setActiveAgent] = useState<AgentType>('CEO');
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Separate conversation history for each agent with highly curated initial high-ticket context
  const [chats, setChats] = useState<{ [key in AgentType]: ChatMessage[] }>({
    CEO: [
      { id: '1', sender: 'agent', text: 'Olá! Sou o CEO IA da KVB OS. Estou calibrado para analisar faturamentos mensais, projetar crescimento de escala para o próximo ano, sugerir metas arrojadas de MRR e identificar gargalos operacionais na agência. O que analisaremos hoje?' }
    ],
    Vendedor: [
      { id: '1', sender: 'agent', text: 'Olá! Sou o Vendedor Executivo IA. Analiso transcrições de reuniões comerciais, sugiro contorno exato de objeções de preço, gero copies de propostas comerciais de alta persuasão e crio rotinas de follow-up automatizado de WhatsApp. Qual negócio estamos fechando hoje?' }
    ],
    Desenvolvedor: [
      { id: '1', sender: 'agent', text: 'Olá! Sou o Desenvolvedor Sênior IA. Escrevo componentes performáticos em React/TypeScript, configuro folhas de estilo Tailwind elegantes, resolvo bugs complexos de gerenciamento de estado e analiso performance e SEO de Landing Pages. Mande seu código ou briefing!' }
    ],
    Marketing: [
      { id: '1', sender: 'agent', text: 'Olá! Sou a Juliana Marketing IA. Vamos desenhar seu calendário de conteúdo de 30 dias para redes sociais, escrever roteiros magnéticos de Reels de alta retenção, planejar carrosséis educacionais ou bolar copies virais de alta conversão.' }
    ],
    Tráfego: [
      { id: '1', sender: 'agent', text: 'Olá! Sou o Gestor de Tráfego de Performance IA. Vamos estruturar campanhas precisas no Meta Ads e Google Ads, modelar públicos lookalikes frios de alta conversão, propor criativos magnéticos e otimizar orçamentos diários para reter ROI máximo.' }
    ],
    Automações: [
      { id: '1', sender: 'agent', text: 'Olá! Sou o Arquiteto de Automação IA. Vamos configurar fluxos integrados no N8N, Make e Zapier, automatizar mensagens de boas-vindas do WhatsApp via API e disparar alertas inteligentes de faturamento recorrente.' }
    ]
  });

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to messages bottom
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeAgent]);

  // Quick action templates configuration
  const agentQuickActions: { [key in AgentType]: { label: string; prompt: string }[] } = {
    CEO: [
      { label: "Analisar Faturamento", prompt: "Por favor, analise nosso faturamento atual de R$ 124.000 recorrentes, sugerindo metas e possíveis gargalos de equipe." },
      { label: "Fazer Projeções de Escala", prompt: "Faça uma projeção de crescimento de faturamento anual considerando um aumento de 15% de MRR ao mês." },
      { label: "Mostrar Gargalos Comuns", prompt: "Quais são os principais gargalos operacionais que agências de desenvolvimento enfrentam ao passar de R$ 50k para R$ 150k de faturamento?" }
    ],
    Vendedor: [
      { label: "Roteiro de Contorno de Objeções", prompt: "Crie um roteiro rápido para contornar a objeção: 'O projeto de automação por R$ 229 está caro'." },
      { label: "Proposta Comercial Copy", prompt: "Escreva uma copy para enviar via WhatsApp apresentando a proposta do Combo Especial (Site + Automação) de R$ 399." },
      { label: "Rotina de Follow-up de WhatsApp", prompt: "Gere uma sequência de 3 mensagens curtas de follow-up pós-reunião para mandar em intervalos de 48h." }
    ],
    Desenvolvedor: [
      { label: "Escrever Código React + Tailwind", prompt: "Crie o código completo de um componente React de botão animado de gradiente usando Tailwind CSS." },
      { label: "Corrigir Bugs de State", prompt: "Como posso evitar que um useEffect que escuta as atualizações de tarefas do Kanban crie loops infinitos de re-render?" },
      { label: "Dicas de SEO de Landing Page", prompt: "Quais metadados e tags críticas devem ser adicionadas ao HTML de uma Landing Page de serviços para rankear no Google?" }
    ],
    Marketing: [
      { label: "Calendário Editorial 30 Dias", prompt: "Desenhe uma tabela simplificada com sugestões de ideias de postagem para 30 dias de conteúdo focados em Automação Empresarial." },
      { label: "Roteiro Reels Alta Conversão", prompt: "Escreva um roteiro completo de 30 segundos para Reels com gancho de 3 segundos sobre: 'Como automatizar os relatórios da sua empresa'." },
      { label: "Estratégia de Stories Magnéticos", prompt: "Crie um roteiro com 4 sequências de Stories para abrir caixinha de perguntas e fechar reuniões." }
    ],
    Tráfego: [
      { label: "Públicos Alvo Meta Ads", prompt: "Quais são as melhores segmentações de público frio para vender automação de WhatsApp para clínicas médicas no Meta Ads?" },
      { label: "Ideias de Criativos de Anúncios", prompt: "Sugira 3 ideias criativas de anúncios em vídeo comparativo mostrando economia de tempo com o KVB OS." },
      { label: "Configurar Orçamento Diário", prompt: "Como dividir um orçamento de R$ 1.500 mensais entre campanhas de captação de leads e remarketing?" }
    ],
    Automações: [
      { label: "Gatilhos Webhook N8N", prompt: "Como configurar um webhook no N8N que recebe avisos de novas faturas pendentes e dispara no Whatsapp?" },
      { label: "WhatsApp Autoresponder", prompt: "Crie um fluxo lógico passo a passo de autoresponder com menu de 3 opções de suporte para clientes." },
      { label: "Automatização de Onboarding", prompt: "Qual a melhor estrutura de integrações (Stripe + Google Sheets + WhatsApp) para dar boas-vindas automáticas?" }
    ]
  };

  const handleSendMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || inputMessage;
    if (!promptToSend.trim() || isSending) return;

    const userText = promptToSend.trim();
    setInputMessage('');
    setIsSending(true);

    const activeHistory = chats[activeAgent];
    const userMessageObj: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: userText
    };

    // Update locally immediately
    setChats(prev => ({
      ...prev,
      [activeAgent]: [...prev[activeAgent], userMessageObj]
    }));

    try {
      const response = await fetch('/api/chat-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: activeAgent,
          message: userText,
          chatHistory: activeHistory.slice(-6) // Send latest 6 messages for context
        })
      });

      const data = await response.json();
      
      const agentMessageObj: ChatMessage = {
        id: Math.random().toString(),
        sender: 'agent',
        text: data.text
      };

      setChats(prev => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent], agentMessageObj]
      }));
    } catch (err) {
      console.error("Agent chat failed:", err);
      
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'agent',
        text: "Desculpe pelo contratempo. Meu canal de comunicação está momentaneamente instável, mas você pode recarregar."
      };
      
      setChats(prev => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent], errorMsg]
      }));
    } finally {
      setIsSending(false);
    }
  };

  const clearChatHistory = () => {
    const defaultGreetings = {
      CEO: 'Olá! Sou o CEO IA da KVB OS. Estou calibrado para analisar faturamentos mensais, projetar crescimento de escala para o próximo ano, sugerir metas arrojadas de MRR e identificar gargalos operacionais na agência. O que analisaremos hoje?',
      Vendedor: 'Olá! Sou o Vendedor Executivo IA. Analiso transcrições de reuniões comerciais, sugiro contorno exato de objeções de preço, gero copies de propostas comerciais de alta persuasão e crio rotinas de follow-up automatizado de WhatsApp. Qual negócio estamos fechando hoje?',
      Desenvolvedor: 'Olá! Sou o Desenvolvedor Sênior IA. Escrevo componentes performáticos em React/TypeScript, configuro folhas de estilo Tailwind elegantes, resolvo bugs complexos de gerenciamento de estado e analiso performance e SEO de Landing Pages. Mande seu código ou briefing!',
      Marketing: 'Olá! Sou a Juliana Marketing IA. Vamos desenhar seu calendário de conteúdo de 30 dias para redes sociais, escrever roteiros magnéticos de Reels de alta retenção, planejar carrosséis educacionais ou bolar copies virais de alta conversão.',
      Tráfego: 'Olá! Sou o Gestor de Tráfego de Performance IA. Vamos estruturar campanhas precisas no Meta Ads e Google Ads, modelar públicos lookalikes frios de alta conversão, propor criativos magnéticos e otimizar orçamentos diários para reter ROI máximo.',
      Automações: 'Olá! Sou o Arquiteto de Automação IA. Vamos configurar fluxos integrados no N8N, Make e Zapier, automatizar mensagens de boas-vindas do WhatsApp via API e disparar alertas inteligentes de faturamento recorrente.'
    };

    setChats(prev => ({
      ...prev,
      [activeAgent]: [
        { id: '1', sender: 'agent', text: defaultGreetings[activeAgent] }
      ]
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px] bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs animate-fade-in" id="ai-chat-tab">
      
      {/* Agents Selection Sidebar */}
      <div className="md:col-span-1 bg-slate-50 border-r border-slate-100 p-4 space-y-4 flex flex-col justify-between" id="agents-sidebar">
        <div className="space-y-3.5">
          <div>
            <h3 className="text-[10px] font-mono font-extrabold text-slate-400 tracking-wider uppercase">KVB CO-PILOTS</h3>
            <h2 className="text-xs font-extrabold text-slate-800">Especialistas Multidisciplinares</h2>
            <p className="text-[10px] text-slate-400">Escolha o especialista adequado para atuar em faturamentos, vendas, codificação ou automação.</p>
          </div>

          <div className="space-y-1">
            {/* CEO Agent button */}
            <button
              onClick={() => setActiveAgent('CEO')}
              className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeAgent === 'CEO' ? 'bg-indigo-600 text-white shadow-sm font-extrabold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp size={13} />
              CEO IA da Agência
            </button>

            {/* Vendedor Agent button */}
            <button
              onClick={() => setActiveAgent('Vendedor')}
              className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeAgent === 'Vendedor' ? 'bg-indigo-600 text-white shadow-sm font-extrabold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Briefcase size={13} />
              Vendedor Executivo
            </button>

            {/* Desenvolvedor Agent button */}
            <button
              onClick={() => setActiveAgent('Desenvolvedor')}
              className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeAgent === 'Desenvolvedor' ? 'bg-indigo-600 text-white shadow-sm font-extrabold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Globe size={13} />
              Desenvolvedor Sênior
            </button>

            {/* Marketing Agent button */}
            <button
              onClick={() => setActiveAgent('Marketing')}
              className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeAgent === 'Marketing' ? 'bg-indigo-600 text-white shadow-sm font-extrabold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Megaphone size={13} />
              Copy & Marketing Viral
            </button>

            {/* Tráfego Agent button */}
            <button
              onClick={() => setActiveAgent('Tráfego')}
              className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeAgent === 'Tráfego' ? 'bg-indigo-600 text-white shadow-sm font-extrabold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Percent size={13} />
              Gestor de Tráfego
            </button>

            {/* Automações Agent button */}
            <button
              onClick={() => setActiveAgent('Automações')}
              className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeAgent === 'Automações' ? 'bg-indigo-600 text-white shadow-sm font-extrabold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Cpu size={13} />
              Arquiteto de Automação
            </button>
          </div>
        </div>

        {/* Action Clear */}
        <button
          onClick={clearChatHistory}
          className="w-full py-1.5 bg-white text-slate-500 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
        >
          <ListRestart size={12} />
          Reiniciar conversa
        </button>
      </div>

      {/* Conversations active room */}
      <div className="md:col-span-3 flex flex-col justify-between h-full bg-white relative">
        
        {/* Agent active badge bar */}
        <div className="border-b border-slate-100 px-5 py-3 flex items-center justify-between bg-slate-50/40">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest font-mono">
              CONECTOR: {activeAgent === 'CEO' ? 'CEO' : activeAgent === 'Vendedor' ? 'VENDEDOR' : activeAgent === 'Desenvolvedor' ? 'DEV SÊNIOR' : activeAgent === 'Marketing' ? 'MARKETING' : activeAgent === 'Tráfego' ? 'TRÁFEGO' : 'AUTOMAÇÃO'} IA
            </span>
          </div>
          <Sparkles size={14} className="text-indigo-600 animate-pulse" />
        </div>

        {/* Message logs view timeline */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[380px] scroll-smooth">
          {chats[activeAgent].map((msg) => (
            <div 
              key={msg.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              {/* Avatar circle */}
              <div className={`p-1.5 rounded-lg shrink-0 ${
                msg.sender === 'user' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-900 text-white'
              }`}>
                {msg.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
              </div>

              {/* Message text block */}
              <div className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none whitespace-pre-line leading-relaxed'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pl-3">
              <Loader2 size={13} className="animate-spin" />
              <span>{activeAgent} IA analisando dados em tempo real...</span>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Quick actions chips section */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto select-none">
          {agentQuickActions[activeAgent].map((act, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(undefined, act.prompt)}
              className="px-3 py-1 bg-white hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 border border-slate-200 hover:border-indigo-200 rounded-full text-[10px] font-bold whitespace-nowrap cursor-pointer transition-all shadow-2xs"
            >
              {act.label}
            </button>
          ))}
        </div>

        {/* Message editor area */}
        <form onSubmit={(e) => handleSendMessage(e)} className="border-t border-slate-100 p-4 bg-white flex gap-2">
          <input
            type="text"
            required
            disabled={isSending}
            placeholder={`Digite o briefing ou comando para o consultor ${activeAgent}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-200 text-xs md:text-sm rounded-lg focus:outline-none focus:border-indigo-500 disabled:bg-slate-50 disabled:text-slate-400 font-medium"
          />
          <button
            type="submit"
            disabled={isSending || !inputMessage.trim()}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg cursor-pointer transition-colors"
          >
            <Send size={15} />
          </button>
        </form>

      </div>

    </div>
  );
}
