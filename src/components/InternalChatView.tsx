import React, { useState, useEffect, useRef } from 'react';
import { 
  Hash, 
  MessageSquare, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Tv, 
  Paperclip, 
  Send, 
  Smile, 
  Search, 
  Users, 
  Sparkles, 
  PhoneCall,
  Activity
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  description: string;
}

interface DirectMessage {
  id: string;
  userName: string;
  role: string;
  status: 'online' | 'offline' | 'idle';
  avatar: string;
}

interface ChatMessage {
  id: string;
  senderName: string;
  avatar: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

export default function InternalChatView() {
  const [channels] = useState<Channel[]>([
    { id: 'c1', name: 'geral', description: 'Discussão livre para todo o time KVB OS.' },
    { id: 'c2', name: 'vendas', description: 'Briefing comercial, novas propostas e reuniões qualificadas.' },
    { id: 'c3', name: 'design', description: 'Compartilhamento de postagens, logos e layouts de landing pages.' },
    { id: 'c4', name: 'automações', description: 'Novidades de fluxos do N8N e integrações de webhook.' },
    { id: 'c5', name: 'suporte', description: 'Tratativa de chamados abertos via portal do cliente.' }
  ]);

  const [dms] = useState<DirectMessage[]>([
    { id: 'u1', userName: 'Juliana Marketing', role: 'Social Media & Copy', status: 'online', avatar: 'JM' },
    { id: 'u2', userName: 'Erick Dev', role: 'Sênior React Developer', status: 'idle', avatar: 'ED' },
    { id: 'u3', userName: 'Carlos Comercial', role: 'Vendas High-Ticket', status: 'online', avatar: 'CC' },
    { id: 'u4', userName: 'Beatriz Automação', role: 'Arquiteta de Processos', status: 'offline', avatar: 'BA' }
  ]);

  const [activeChannelId, setActiveChannelId] = useState('c1');
  const [activeDmId, setActiveDmId] = useState<string | null>(null);
  
  // Chat feed messages keyed by channel/dm
  const [messages, setMessages] = useState<{ [key: string]: ChatMessage[] }>({
    c1: [
      { id: 'm1_1', senderName: 'Carlos Comercial', avatar: 'CC', text: 'Bom dia time! Fechamos mais um contrato de recorrência com a Clínica Sorella ontem à noite. Proposta aprovada com sucesso!', timestamp: '09:12' },
      { id: 'm1_2', senderName: 'Juliana Marketing', avatar: 'JM', text: 'Sensacional! Já vou preparar os primeiros posts de briefing da marca e organizar o calendário de 30 dias de stories.', timestamp: '09:15' },
      { id: 'm1_3', senderName: 'Erick Dev', avatar: 'ED', text: 'Top demais. O site deles já está na fila de desenvolvimento. Vou subir uma estrutura minimalista com agendamento direto.', timestamp: '09:18' }
    ],
    c2: [
      { id: 'm2_1', senderName: 'Carlos Comercial', avatar: 'CC', text: 'Enviei a proposta para a FitLife Academia. Eles estão analisando o valor de R$ 200 recorrentes. Aguardo resposta até amanhã.', timestamp: '10:45' }
    ],
    c3: [
      { id: 'm3_1', senderName: 'Juliana Marketing', avatar: 'JM', text: 'Pessoal, acabei de postar o design conceitual do feed da Renata Advogados na Área de Design. Podem conferir e dar feedback?', timestamp: '11:22' }
    ],
    c4: [
      { id: 'm4_1', senderName: 'Beatriz Automação', avatar: 'BA', text: 'Acabei de integrar o webhook de pagamentos confirmados do Stripe diretamente no Slack e no CRM. Tudo rodando com sucesso.', timestamp: '13:04' }
    ],
    c5: [
      { id: 'm5_1', senderName: 'Erick Dev', avatar: 'ED', text: 'O cliente Clínica Sorella abriu um chamado pedindo a troca da logo no rodapé. Já estou aplicando a mudança.', timestamp: '14:50' }
    ]
  });

  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<ChatMessage['attachment'] | undefined>(undefined);

  // Call states
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const [deafened, setDeafened] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannelId, activeDmId]);

  const activeKey = activeDmId ? `dm_${activeDmId}` : activeChannelId;
  const currentMessages = messages[activeKey] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedFile) return;

    const newMsg: ChatMessage = {
      id: Math.random().toString(),
      senderName: 'Você (Admin)',
      avatar: 'AD',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment: attachedFile
    };

    setMessages(prev => ({
      ...prev,
      [activeKey]: [...(prev[activeKey] || []), newMsg]
    }));

    setInputText('');
    setAttachedFile(undefined);

    // Simulate reply from team member after 1.5 seconds
    if (!activeDmId) {
      setTimeout(() => {
        const replies = [
          "Show de bola! Já recebi aqui no meu radar corporativo.",
          "Legal, anotei na minha planilha de tarefas.",
          "Obrigado pelo aviso. Vou analisar as métricas e retorno em breve.",
          "Excelente! Vamos para cima fechar essa semana com chave de ouro."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const randomMember = dms[Math.floor(Math.random() * dms.length)];

        const botReply: ChatMessage = {
          id: Math.random().toString(),
          senderName: randomMember.userName,
          avatar: randomMember.avatar,
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
          ...prev,
          [activeKey]: [...(prev[activeKey] || []), botReply]
        }));
      }, 1500);
    }
  };

  const handleSimulateAttachment = () => {
    const files = [
      { name: 'logo_sorella_alta.png', size: '2.4 MB', type: 'image' },
      { name: 'proposta_fitlife.pdf', size: '1.2 MB', type: 'pdf' },
      { name: 'webhook_n8n_flow.json', size: '45 KB', type: 'json' }
    ];
    const picked = files[Math.floor(Math.random() * files.length)];
    setAttachedFile(picked);
  };

  const currentHeaderTitle = activeDmId 
    ? dms.find(d => d.id === activeDmId)?.userName 
    : `#${channels.find(c => c.id === activeChannelId)?.name}`;

  const currentHeaderDesc = activeDmId 
    ? dms.find(d => d.id === activeDmId)?.role 
    : channels.find(c => c.id === activeChannelId)?.description;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 bg-slate-900 rounded-2xl overflow-hidden h-[600px] border border-slate-800 shadow-xl text-slate-300" id="internal-chat-view">
      
      {/* Sidebar: Server List and Channel list */}
      <div className="md:col-span-1 bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between" id="discord-sidebar">
        <div className="space-y-5 overflow-y-auto">
          {/* Header Title */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-extrabold text-slate-100 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Activity size={13} className="text-indigo-400" />
                KVB OS Chat
              </h3>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Canais Internos</p>
            </div>
          </div>

          {/* Channels list */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest font-mono block px-2.5 mb-1.5">Canais de Texto</span>
            {channels.map((ch) => {
              const isActive = activeChannelId === ch.id && !activeDmId;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChannelId(ch.id);
                    setActiveDmId(null);
                  }}
                  className={`w-full p-2 rounded-lg text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-indigo-600/20 text-white border-l-4 border-indigo-500 pl-3' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                  }`}
                >
                  <Hash size={14} className="text-slate-500" />
                  <span>{ch.name}</span>
                </button>
              );
            })}
          </div>

          {/* Direct Messages list */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest font-mono block px-2.5 mb-1.5">Mensagens Diretas</span>
            {dms.map((user) => {
              const isActive = activeDmId === user.id;
              return (
                <button
                  key={user.id}
                  onClick={() => setActiveDmId(user.id)}
                  className={`w-full p-2 rounded-lg text-left text-xs font-bold flex items-center gap-2.5 cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-indigo-600/20 text-white border-l-4 border-indigo-500 pl-3' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-extrabold text-indigo-300 border border-slate-700">
                      {user.avatar}
                    </div>
                    {/* Status indicator badge */}
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-slate-950 ${
                      user.status === 'online' ? 'bg-emerald-500' :
                      user.status === 'idle' ? 'bg-amber-500' :
                      'bg-slate-500'
                    }`}></span>
                  </div>
                  <div className="truncate">
                    <p className="font-extrabold leading-tight text-slate-200">{user.userName}</p>
                    <p className="text-[9px] text-slate-500 font-sans leading-tight">{user.role}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom voice control panel */}
        <div className="border-t border-slate-800 pt-3 mt-3 space-y-2">
          {inCall ? (
            <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-2.5 text-xs space-y-2 animate-pulse">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-indigo-400 font-extrabold font-mono tracking-widest flex items-center gap-1">
                  <PhoneCall size={12} /> VOZ CONECTADA
                </span>
                <span className="text-[9px] text-slate-400 font-mono">Mesa Redonda</span>
              </div>
              
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white">AD</div>
                  <span className="text-[10px] text-slate-200 font-bold">Você</span>
                </div>

                {/* Micro controller buttons */}
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setMuted(!muted)} 
                    className={`p-1.5 rounded-md text-slate-300 hover:bg-slate-800 ${muted ? 'bg-rose-500/30 text-rose-300' : ''}`}
                    title={muted ? "Desmutar microfone" : "Mutar microfone"}
                  >
                    {muted ? <MicOff size={11} /> : <Mic size={11} />}
                  </button>
                  <button 
                    onClick={() => setDeafened(!deafened)} 
                    className={`p-1.5 rounded-md text-slate-300 hover:bg-slate-800 ${deafened ? 'bg-rose-500/30 text-rose-300' : ''}`}
                    title={deafened ? "Ativar Áudio" : "Ensurdecer Áudio"}
                  >
                    {deafened ? <VolumeX size={11} /> : <Volume2 size={11} />}
                  </button>
                  <button 
                    onClick={() => setScreenSharing(!screenSharing)} 
                    className={`p-1.5 rounded-md text-slate-300 hover:bg-slate-800 ${screenSharing ? 'bg-indigo-600 text-white' : ''}`}
                    title="Compartilhar Tela"
                  >
                    <Tv size={11} />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => {
                  setInCall(false);
                  setScreenSharing(false);
                }}
                className="w-full py-1 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-400 text-[10px] font-bold rounded-lg cursor-pointer transition-all"
              >
                Desconectar Chamada
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setInCall(true)}
              className="w-full py-2 bg-slate-800 hover:bg-indigo-600/30 border border-slate-700 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Mic size={13} />
              Entrar em Canal de Voz
            </button>
          )}
        </div>
      </div>

      {/* Conversations active room */}
      <div className="md:col-span-3 flex flex-col justify-between h-full bg-slate-900/60 relative">
        
        {/* Active room header */}
        <div className="border-b border-slate-800 px-5 py-3.5 flex items-center justify-between bg-slate-950/40">
          <div>
            <h3 className="text-xs font-extrabold text-white flex items-center gap-1">
              {activeDmId ? <MessageSquare size={13} className="text-indigo-400" /> : <Hash size={13} className="text-slate-500" />}
              {currentHeaderTitle}
            </h3>
            <p className="text-[10px] text-slate-500 font-sans leading-tight mt-0.5">{currentHeaderDesc}</p>
          </div>
          <Sparkles size={14} className="text-indigo-400 animate-pulse" />
        </div>

        {/* Message logs view timeline */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[460px] scroll-smooth">
          {currentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-12 space-y-2 h-full">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700/60">
                <MessageSquare size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-300">Nenhuma mensagem anterior</p>
                <p className="text-[10px] text-slate-500">Comece a conversa enviando uma mensagem no canal.</p>
              </div>
            </div>
          ) : (
            currentMessages.map((msg) => {
              const isUser = msg.senderName === 'Você (Admin)';
              return (
                <div 
                  key={msg.id}
                  className={`flex items-start gap-3 max-w-[85%] ${
                    isUser ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-extrabold text-indigo-300 border border-slate-700 shrink-0">
                    {msg.avatar}
                  </div>

                  <div className="space-y-1">
                    <div className={`flex items-center gap-2 text-[10px] ${isUser ? 'justify-end' : ''}`}>
                      <span className="font-extrabold text-slate-200">{msg.senderName}</span>
                      <span className="text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>

                    <div className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm ${
                      isUser 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700/40'
                    }`}>
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      
                      {/* Attached File simulator visual card */}
                      {msg.attachment && (
                        <div className="mt-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-700/40 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2">
                            <Paperclip size={13} className="text-indigo-400" />
                            <div>
                              <p className="font-bold text-slate-200 truncate max-w-[150px]">{msg.attachment.name}</p>
                              <p className="text-[9px] text-slate-500 font-mono">{msg.attachment.size}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => alert("Arquivo baixado com sucesso no sandbox.")}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400"
                          >
                            <Tv size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Message editor area */}
        <form onSubmit={handleSendMessage} className="border-t border-slate-800 p-4 bg-slate-950/20 flex flex-col gap-2">
          {attachedFile && (
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs max-w-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <Paperclip size={13} className="text-indigo-400" />
                <span>Pronto para enviar: <b>{attachedFile.name}</b> ({attachedFile.size})</span>
              </div>
              <button 
                type="button" 
                onClick={() => setAttachedFile(undefined)} 
                className="p-1 text-slate-400 hover:text-slate-100"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSimulateAttachment}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-lg cursor-pointer transition-all"
              title="Anexar arquivo"
            >
              <Paperclip size={14} />
            </button>
            
            <input
              type="text"
              required={!attachedFile}
              placeholder={`Enviar mensagem em ${currentHeaderTitle}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-800 text-xs md:text-sm bg-slate-900 rounded-lg focus:outline-none focus:border-indigo-500 text-white disabled:bg-slate-900 disabled:text-slate-600"
            />
            
            <button
              type="submit"
              disabled={!inputText.trim() && !attachedFile}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg cursor-pointer transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}
