import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  RefreshCw, 
  BellRing, 
  Calendar, 
  AlertTriangle, 
  DollarSign, 
  FileText, 
  Download, 
  Users, 
  CheckCircle2, 
  ExternalLink,
  Plus
} from 'lucide-react';

interface Subscription {
  id: string;
  clientName: string;
  planName: string;
  value: number;
  paymentMethod: 'PIX' | 'Cartão' | 'Boleto';
  status: 'Ativa' | 'Pendente' | 'Vencida' | 'Cancelada';
  renewalDate: string;
  automaticRenewal: boolean;
}

export default function SignaturesView() {
  const [activeTab, setActiveTab] = useState<'manager' | 'subscriber' | 'config'>('manager');
  const [selectedSubId, setSelectedSubId] = useState<string>('sub1');
  const [pixAmount, setPixAmount] = useState<number>(399);
  const [pixQrCode, setPixQrCode] = useState<string>('');
  const [isGeneratingPix, setIsGeneratingPix] = useState(false);

  // Gateway credentials states
  const [stripeKey, setStripeKey] = useState('sk_live_51Mv...');
  const [mpToken, setMpToken] = useState('APP_USR-7819...');
  const [isSaved, setIsSaved] = useState(false);

  // Mock initial subscriptions database list
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: 'sub1', clientName: 'Clínica Sorella', planName: 'Combo Especial Premium (Vendas + Automação)', value: 399, paymentMethod: 'PIX', status: 'Ativa', renewalDate: '2026-07-15', automaticRenewal: true },
    { id: 'sub2', clientName: 'FitLife Academia', planName: 'Marketing de Conteúdo & Criativos', value: 200, paymentMethod: 'Cartão', status: 'Ativa', renewalDate: '2026-07-01', automaticRenewal: true },
    { id: 'sub3', clientName: 'Ju Doces Finos', planName: 'Gestão de Mídia Paga Trimestral', value: 279, paymentMethod: 'Cartão', status: 'Ativa', renewalDate: '2026-06-28', automaticRenewal: true },
    { id: 'sub4', clientName: 'Renata Advogados', planName: 'Suporte de TI e SEO Local', value: 158, paymentMethod: 'Boleto', status: 'Pendente', renewalDate: '2026-06-24', automaticRenewal: false },
    { id: 'sub5', clientName: 'Macedo Contabilidade', planName: 'Automação Operacional Completa', value: 229, paymentMethod: 'PIX', status: 'Vencida', renewalDate: '2026-06-20', automaticRenewal: false }
  ]);

  const activeSub = subscriptions.find(s => s.id === selectedSubId) || subscriptions[0];

  const handleGeneratePix = () => {
    setIsGeneratingPix(true);
    setTimeout(() => {
      setPixQrCode(`00020101021126580014br.gov.bcb.pix0136automecanicakaen@gmail.com5204000053039865405${pixAmount}.005802BR5914KVB_SYSTEM_OS6009Sao_Paulo62070503***6304FC3C`);
      setIsGeneratingPix(false);
    }, 800);
  };

  const handleToggleAutoRenewal = (id: string) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return { ...s, automaticRenewal: !s.automaticRenewal };
    }));
  };

  const handleUpdateStatus = (id: string, newStatus: Subscription['status']) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return { ...s, status: newStatus };
    }));
  };

  const handleSendWarning = (sub: Subscription) => {
    const message = `*Aviso de Vencimento KVB OS*\nOlá, ${sub.clientName}!\nLembramos que sua assinatura do plano *${sub.planName}* no valor de R$ ${sub.value.toFixed(2)} vence em ${sub.renewalDate}.\nPara garantir o funcionamento ininterrupto das suas campanhas, códigos e integrações do N8N, faça o pagamento via PIX ou atualize seu cartão.\nAtenciosamente,\nSuporte KVB OS.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://web.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleSaveGateways = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6" id="signatures-view">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-xs">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            <CreditCard size={18} className="text-indigo-600" />
            Sistema de Cobranças & Assinaturas
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Gerencie cobranças recorrentes via Stripe, Mercado Pago e gere chaves PIX de forma integrada.</p>
        </div>

        {/* Tab switch buttons */}
        <div className="bg-slate-50 p-1 rounded-xl flex gap-1 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('manager')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'manager' ? 'bg-white text-indigo-700 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Gestão de Contratos
          </button>
          <button
            onClick={() => setActiveTab('subscriber')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'subscriber' ? 'bg-white text-indigo-700 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Área do Assinante
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'config' ? 'bg-white text-indigo-700 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Gateways APIs
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'manager' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/40 flex justify-between items-center">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider font-mono">Assinaturas Recorrentes do ERP</span>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 font-mono font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                  Total Ativos: {subscriptions.filter(s => s.status === 'Ativa').length}
                </span>
              </div>

              <div className="divide-y divide-slate-100 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/20 text-slate-400 font-bold border-b border-slate-100">
                      <th className="p-3.5 pl-5">CLIENTE</th>
                      <th className="p-3.5">PLANO / VALOR</th>
                      <th className="p-3.5">MÉTODO</th>
                      <th className="p-3.5">STATUS</th>
                      <th className="p-3.5">PRÓXIMO VENC.</th>
                      <th className="p-3.5 text-right pr-5">AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {subscriptions.map((sub) => {
                      const isSelected = selectedSubId === sub.id;
                      return (
                        <tr 
                          key={sub.id} 
                          onClick={() => setSelectedSubId(sub.id)}
                          className={`hover:bg-slate-50/50 cursor-pointer transition-colors ${
                            isSelected ? 'bg-indigo-50/10' : ''
                          }`}
                        >
                          <td className="p-3.5 pl-5">
                            <span className="font-extrabold text-slate-800 block">{sub.clientName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: SUB-{sub.id}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-slate-600 block line-clamp-1 max-w-[180px]">{sub.planName}</span>
                            <span className="text-slate-800 font-mono font-bold text-[11px]">R$ {sub.value.toFixed(2)}/mês</span>
                          </td>
                          <td className="p-3.5 text-slate-500 font-mono text-[10px] font-bold">
                            {sub.paymentMethod}
                          </td>
                          <td className="p-3.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              sub.status === 'Ativa' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                              sub.status === 'Pendente' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                              sub.status === 'Vencida' ? 'bg-rose-50 text-rose-700 border-rose-100 animate-pulse' :
                              'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                            {sub.renewalDate}
                          </td>
                          <td className="p-3.5 text-right pr-5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2 justify-end">
                              <button 
                                onClick={() => handleSendWarning(sub)}
                                className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg"
                                title="Enviar Aviso de Cobrança"
                              >
                                <BellRing size={13} />
                              </button>
                              <button 
                                onClick={() => handleToggleAutoRenewal(sub.id)}
                                className={`p-1.5 rounded-lg ${
                                  sub.automaticRenewal ? 'text-indigo-600 bg-indigo-50/40 hover:bg-indigo-100/50' : 'text-slate-400 hover:bg-slate-100'
                                }`}
                                title="Renovação Automática"
                              >
                                <RefreshCw size={13} className={sub.automaticRenewal ? 'animate-spin-slow' : ''} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Details column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono">Detalhes da Assinatura</span>
                <span className="text-[10px] text-slate-400 font-mono">#SUB-{activeSub.id}</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Assinante</span>
                  <p className="text-xs font-extrabold text-slate-800">{activeSub.clientName}</p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Plano Contratado</span>
                  <p className="text-xs text-slate-600 font-semibold">{activeSub.planName}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-400 font-mono uppercase">Valor Mensal</span>
                    <p className="text-xs font-bold text-slate-800 font-mono">R$ {activeSub.value.toFixed(2)}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-400 font-mono uppercase">Vencimento</span>
                    <p className="text-xs font-bold text-slate-800 font-mono">{activeSub.renewalDate}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-600 bg-indigo-50/20 border border-indigo-100/50 p-2.5 rounded-lg">
                  <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-indigo-600" /> Renovação Automática</span>
                  <span className={`font-mono font-bold ${activeSub.automaticRenewal ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {activeSub.automaticRenewal ? 'ATIVA' : 'DESATIVA'}
                  </span>
                </div>
              </div>

              {/* Modify actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">Alterar Situação de Cobrança</span>
                <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                  <button 
                    onClick={() => handleUpdateStatus(activeSub.id, 'Ativa')}
                    className="p-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg text-center cursor-pointer"
                  >
                    Ativa
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(activeSub.id, 'Pendente')}
                    className="p-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-lg text-center cursor-pointer"
                  >
                    Pendente
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(activeSub.id, 'Vencida')}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg text-center cursor-pointer"
                  >
                    Vencida
                  </button>
                </div>

                <button 
                  onClick={() => handleSendWarning(activeSub)}
                  className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <BellRing size={13} />
                  Enviar Alerta Cobrança WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'subscriber' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left panel */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-slate-800 shadow-lg space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold font-mono tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded text-indigo-300 uppercase">Simulação Área de Assinantes</span>
                  <h3 className="text-lg font-extrabold text-slate-100">Seu Plano Ativo: Premium Combo</h3>
                  <p className="text-xs text-slate-400">Assinante: {activeSub.clientName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">VALOR DO PLANO</span>
                  <p className="text-lg font-mono font-extrabold text-white">R$ {activeSub.value.toFixed(2)}<span className="text-xs font-medium text-slate-400">/mês</span></p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-xs font-medium">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">STATUS DA CONTA</span>
                  <span className="inline-flex items-center gap-1 mt-1 font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Conta em Dia
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">RENOVAÇÃO EM:</span>
                  <p className="text-slate-200 mt-1 font-mono font-bold">{activeSub.renewalDate}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">MÉTODO COBRANÇA</span>
                  <p className="text-slate-200 mt-1 flex items-center gap-1 font-mono font-bold">
                    <CreditCard size={12} /> {activeSub.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">Faturas Anteriores & Comprovantes</h4>
              <div className="space-y-2">
                <div className="p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <FileText size={15} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Fatura Referência Junho 2026</p>
                      <p className="text-[10px] text-slate-400 font-mono">Pago em 15/06/2026 • PIX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800 text-[11px]">R$ {activeSub.value.toFixed(2)}</span>
                    <button onClick={() => alert("Comprovante baixado com sucesso.")} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                      <Download size={13} />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <FileText size={15} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Fatura Referência Maio 2026</p>
                      <p className="text-[10px] text-slate-400 font-mono">Pago em 15/05/2026 • PIX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800 text-[11px]">R$ {activeSub.value.toFixed(2)}</span>
                    <button onClick={() => alert("Comprovante baixado com sucesso.")} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                      <Download size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PIX sandbox right column */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-4">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono pb-2 border-b border-slate-100">Simulador de Pagamento PIX</h4>
              
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Digitar valor para simulação (R$)</label>
                  <input 
                    type="number" 
                    value={pixAmount} 
                    onChange={(e) => setPixAmount(Number(e.target.value))} 
                    className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:outline-none focus:border-indigo-500"
                    placeholder="Ex: 399"
                  />
                </div>

                <button 
                  onClick={handleGeneratePix}
                  disabled={isGeneratingPix}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                >
                  {isGeneratingPix ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <QrCode size={14} />
                      Gerar QR Code PIX Estático
                    </>
                  )}
                </button>

                {pixQrCode && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center space-y-3 animate-fade-in">
                    {/* Visual QR Simulator */}
                    <div className="w-32 h-32 bg-slate-800 rounded-lg flex items-center justify-center text-white relative border border-slate-700">
                      <QrCode size={80} className="text-white/90" />
                      {/* Pix logo center icon */}
                      <div className="absolute inset-center bg-white p-1 rounded-md shadow-md">
                        <div className="w-5 h-5 bg-indigo-600 text-white text-[7px] font-extrabold flex items-center justify-center rounded">PIX</div>
                      </div>
                    </div>

                    <div className="space-y-1 w-full">
                      <span className="text-[10px] text-slate-400 font-mono uppercase">Chave Copia e Cola</span>
                      <textarea 
                        readOnly
                        value={pixQrCode}
                        className="w-full text-[9px] font-mono text-slate-500 bg-white p-2 border border-slate-200 rounded-md focus:outline-none h-14"
                        onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                        title="Clique para selecionar e copiar"
                      />
                      <span className="text-[9px] text-slate-400 font-medium block mt-1">Clique para selecionar tudo e simular pagamento no banco corporativo.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs max-w-xl">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono mb-4 pb-2 border-b border-slate-100">Credenciais & Integrações de Gateway</h3>
          
          <form onSubmit={handleSaveGateways} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-600 block">Chave Privada Stripe API</label>
              <input 
                type="password" 
                value={stripeKey} 
                onChange={(e) => setStripeKey(e.target.value)} 
                className="w-full p-2.5 border border-slate-200 text-xs font-mono rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[10px] text-slate-400 leading-tight block">Utilizada para acionar callbacks de faturamento e assinaturas automaticamente no N8N.</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-600 block">Access Token Mercado Pago (PIX/Cartão)</label>
              <input 
                type="password" 
                value={mpToken} 
                onChange={(e) => setMpToken(e.target.value)} 
                className="w-full p-2.5 border border-slate-200 text-xs font-mono rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[10px] text-slate-400 leading-tight block">Utilizado para gerar boletos com código de barras, PIX instantâneo e receber Webhooks ativos.</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-indigo-600" /> Criptografado ponta-a-ponta.
              </span>
              <button 
                type="submit"
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                {isSaved ? <CheckCircle2 size={13} /> : <Plus size={13} />}
                {isSaved ? 'Credenciais Salvas!' : 'Salvar Gateways'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
