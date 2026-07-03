import React, { useState } from 'react';
import { 
  Megaphone, 
  Copy, 
  MessageSquareOff, 
  Share2, 
  Calendar, 
  User, 
  HelpCircle, 
  Check, 
  Laptop,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

export default function NotificationView() {
  const [selectedTemplate, setSelectedTemplate] = useState<'welcome' | 'meeting' | 'proposal' | 'billing'>('welcome');
  const [copied, setCopied] = useState(false);

  // Form hooks parameters variables
  const [clientName, setClientName] = useState('Carlos Silva');
  const [scheduledTime, setScheduledTime] = useState('Amanhã às 14:00h');
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/kvb-system-call');
  const [outstandingValue, setOutstandingValue] = useState('229');

  const templates = {
    welcome: {
      title: 'Boas-Vindas + Envio do Briefing',
      description: 'Disparador inicial logo após o fechamento da consultoria comercial, para capturar os dados do cliente.',
      getCopy: (name: string) => `Olá, *${name}*! Seja muito bem-vindo à KVB System. 🚀\n\nÉ uma enorme satisfação tê-lo como nosso parceiro para escalar as vendas e processos do seu negócio.\n\nPara iniciarmos o desenvolvimento estratégico do seu Website, Automação do WhatsApp e Planejamento Editorial de Marketing, por favor reserve 5 minutos para preencher nosso briefing interativo inteligente no sistema.\n\nQualquer dúvida, estamos à inteira disposição!`
    },
    meeting: {
      title: 'Lembrete de Reunião (Zoom/Google Meet)',
      description: 'Lembrete automático para reduzir em até 80% as faltas (no-show) em reuniões agendadas.',
      getCopy: (name: string, time: string, url: string) => `Olá, *${name}*! Tudo bem?\n\nPassando rápido para confirmar nosso compromisso estratégico agendado para: 📅 *${time}*.\n\nNesta conferência, apresentaremos o plano estratégico de Sites e campanhas de anúncios elaborados especificamente para o seu nicho.\n\n🔗 *Link de acesso à sala:* ${url}\n\nRecomendamos conectar-se 5 minutos antes. Até mais!`
    },
    proposal: {
      title: 'Acompanhamento (Follow-Up de Proposta)',
      description: 'Mensagem para reengajar clientes em negociação que receberam a proposta e não responderam.',
      getCopy: (name: string) => `Olá, *${name}*! Passando para entender se você conseguiu analisar a proposta do combo especial KVB System que enviamos recentemente?\n\nEstamos prontos para estruturar seus robôs de automação de WhatsApp e sua Landing Page profissional esta semana para acelerar seus leads. 🚀\n\nFicou com alguma dúvida sobre os valores? Vamos alinhar em um rápido bate-papo de 5 minutos hoje?`
    },
    billing: {
      title: 'Aviso de Cobrança (Inadimplência Amigável)',
      description: 'Notificação polida para clientes com mensalidades vencidas no dia sem comprometer o relacionamento.',
      getCopy: (name: string, value: string) => `Prezado parceiro da *${name}*, tudo bem?\n\nIdentificamos em nosso painel ERP KVB System que a mensalidade recorrente no valor de *R$ ${value},00* consta como pendente de compensação em nosso financeiro.\n\nPara manter suas automações ativas no WhatsApp e sua estrutura de Landing Page funcionando sem interrupções, solicitamos por gentileza verificar o pagamento via Pix ou Boleto disponível em sua área do cliente.\n\nCaso já tenha efetuado, por favor desconsidere este aviso e envie o recibo.`
    }
  };

  const handleCopy = () => {
    let textToCopy = '';
    
    if (selectedTemplate === 'welcome') textToCopy = templates.welcome.getCopy(clientName);
    if (selectedTemplate === 'meeting') textToCopy = templates.meeting.getCopy(clientName, scheduledTime, meetingUrl);
    if (selectedTemplate === 'proposal') textToCopy = templates.proposal.getCopy(clientName);
    if (selectedTemplate === 'billing') textToCopy = templates.billing.getCopy(clientName, outstandingValue);

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSendWhatsapp = () => {
    let textToCopy = '';
    if (selectedTemplate === 'welcome') textToCopy = templates.welcome.getCopy(clientName);
    if (selectedTemplate === 'meeting') textToCopy = templates.meeting.getCopy(clientName, scheduledTime, meetingUrl);
    if (selectedTemplate === 'proposal') textToCopy = templates.proposal.getCopy(clientName);
    if (selectedTemplate === 'billing') textToCopy = templates.billing.getCopy(clientName, outstandingValue);

    const encoded = encodeURIComponent(textToCopy);
    window.open(`https://web.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // Live copy previews depending on filters
  const currentCopy = 
    selectedTemplate === 'welcome' ? templates.welcome.getCopy(clientName) :
    selectedTemplate === 'meeting' ? templates.meeting.getCopy(clientName, scheduledTime, meetingUrl) :
    selectedTemplate === 'proposal' ? templates.proposal.getCopy(clientName) :
    templates.billing.getCopy(clientName, outstandingValue);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="notifications-tab">
      
      {/* Template Selectors */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 mb-2">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">Templates de Disparos</h3>
          <p className="text-[10px] text-slate-400">Escolha um template profissional moldado pela KVB para copiar ou disparar direto no Whatsapp do cliente.</p>
        </div>

        <div className="space-y-2">
          
          {/* Welcome button */}
          <button
            onClick={() => setSelectedTemplate('welcome')}
            className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
              selectedTemplate === 'welcome' 
                ? 'border-indigo-600 bg-indigo-50/20' 
                : 'border-slate-100 hover:border-slate-200 bg-white'
            }`}
          >
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <UserCheck size={14} className="text-indigo-600" />
              {templates.welcome.title}
            </h4>
            <p className="text-[10px] text-slate-500 leading-tight">{templates.welcome.description}</p>
          </button>

          {/* Meeting button */}
          <button
            onClick={() => setSelectedTemplate('meeting')}
            className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
              selectedTemplate === 'meeting' 
                ? 'border-indigo-600 bg-indigo-50/20' 
                : 'border-slate-100 hover:border-slate-200 bg-white'
            }`}
          >
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Calendar size={14} className="text-indigo-600" />
              {templates.meeting.title}
            </h4>
            <p className="text-[10px] text-slate-500 leading-tight">{templates.meeting.description}</p>
          </button>

          {/* Proposal button */}
          <button
            onClick={() => setSelectedTemplate('proposal')}
            className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
              selectedTemplate === 'proposal' 
                ? 'border-indigo-600 bg-indigo-50/20' 
                : 'border-slate-100 hover:border-slate-200 bg-white'
            }`}
          >
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <Laptop size={14} className="text-indigo-600" />
              {templates.proposal.title}
            </h4>
            <p className="text-[10px] text-slate-500 leading-tight">{templates.proposal.description}</p>
          </button>

          {/* Billing button */}
          <button
            onClick={() => setSelectedTemplate('billing')}
            className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
              selectedTemplate === 'billing' 
                ? 'border-indigo-600 bg-indigo-50/20' 
                : 'border-slate-100 hover:border-slate-200 bg-white'
            }`}
          >
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <AlertTriangle size={14} className="text-indigo-600" />
              {templates.billing.title}
            </h4>
            <p className="text-[10px] text-slate-500 leading-tight">{templates.billing.description}</p>
          </button>

        </div>
      </div>

      {/* Editor variables and preview panel */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between h-[510px]" id="notifications-dispatcher-editor">
        
        <div className="space-y-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Editor de Variáveis Integradas</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
            {/* Variable: Client Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">VARIÁVEL: NOME DO CLIENTE</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-indigo-500 font-bold"
              />
            </div>

            {/* Variable depending on template active */}
            {selectedTemplate === 'meeting' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">VARIÁVEL: HORÁRIO AGENDADO</label>
                  <input
                    type="text"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">VARIÁVEL: LINK DO MEETING</label>
                  <input
                    type="text"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs font-mono"
                  />
                </div>
              </>
            )}

            {selectedTemplate === 'billing' && (
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">VARIÁVEL: VALOR EM ATRASO (R$)</label>
                <input
                  type="number"
                  value={outstandingValue}
                  onChange={(e) => setOutstandingValue(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs font-semibold"
                />
              </div>
            )}
          </div>

          {/* Formulated copy preview screen */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Pré-Visualização do Texto</span>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
              {currentCopy}
            </div>
          </div>
        </div>

        {/* Dispatch Action buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3.5">
          <button
            onClick={handleCopy}
            className={`px-4 py-2 border text-xs md:text-sm font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
              copied 
                ? 'bg-emerald-550 border-emerald-500 text-emerald-600' 
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
            id="btn-copy-notification-draft"
          >
            <Copy size={14} />
            {copied ? 'Conteúdo Copiado!' : 'Copiar Texto Pronto'}
          </button>

          <button
            onClick={handleSendWhatsapp}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs md:text-sm rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/10"
            id="btn-trigger-whatsapp-dispatch"
          >
            <Share2 size={14} />
            Disparar pelo WhatsApp Web
          </button>
        </div>

      </div>

    </div>
  );
}
