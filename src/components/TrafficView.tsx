import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  BarChart2, 
  Percent, 
  DollarSign, 
  Eye, 
  MousePointer, 
  Layers, 
  ExternalLink, 
  RotateCw, 
  PieChart as PieIcon,
  HelpCircle
} from 'lucide-react';

interface MetricState {
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  revenue: number;
  roi: number;
}

export default function TrafficView() {
  const [platform, setPlatform] = useState<'meta' | 'google' | 'tiktok'>('meta');
  const [budget, setBudget] = useState(1500); // R$ 1500/mês
  const [simulatedCpc, setSimulatedCpc] = useState(0.85);
  const [simulatedCtr, setSimulatedCtr] = useState(2.5); // %
  const [conversionRate, setConversionRate] = useState(1.5); // %
  const [avgTicket, setAvgTicket] = useState(350); // Ticket médio R$ 350

  // Real-time calculated metrics simulation
  const impressions = Math.round(budget * 100);
  const clicks = Math.round(impressions * (simulatedCtr / 100));
  const spent = clicks * simulatedCpc;
  const conversions = Math.round(clicks * (conversionRate / 100));
  const revenue = conversions * avgTicket;
  const roi = spent > 0 ? Number(((revenue - spent) / spent).toFixed(2)) : 0;
  const cpm = spent > 0 ? Number(((spent / impressions) * 1000).toFixed(2)) : 0;

  // Presets of real past performance metrics
  const performancePresets = {
    meta: { impressions: 124500, clicks: 3110, ctr: 2.5, cpc: 0.65, cpm: 16.20, conversions: 62, spent: 2021, revenue: 12400, roi: 5.1 },
    google: { impressions: 85200, clicks: 4260, ctr: 5.0, cpc: 1.10, cpm: 55.00, conversions: 106, spent: 4686, revenue: 23800, roi: 4.1 },
    tiktok: { impressions: 245000, clicks: 3675, ctr: 1.5, cpc: 0.45, cpm: 6.75, conversions: 44, spent: 1653, revenue: 9800, roi: 4.9 }
  };

  const activePreset = performancePresets[platform];

  return (
    <div className="space-y-6" id="traffic-view">
      {/* Upper header controls */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            <TrendingUp size={18} className="text-indigo-600" />
            Central de Tráfego de Alta Performance
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Monitore o custo de aquisição de clientes (CAC), simule retornos sobre investimentos (ROI) e estruture orçamentos inteligentes.
          </p>
        </div>

        {/* Platform selection tabs */}
        <div className="bg-slate-50 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setPlatform('meta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              platform === 'meta' ? 'bg-indigo-600 text-white shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Meta Ads
          </button>
          <button
            onClick={() => setPlatform('google')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              platform === 'google' ? 'bg-indigo-600 text-white shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Google Ads
          </button>
          <button
            onClick={() => setPlatform('tiktok')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              platform === 'tiktok' ? 'bg-indigo-600 text-white shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            TikTok Ads
          </button>
        </div>
      </div>

      {/* Grid panels: Active Presets & Real-time Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Historical Stats from platform selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono flex items-center gap-1">
                <Target size={13} className="text-indigo-600" />
                Métricas Ativas na Conta - {platform === 'meta' ? 'Meta Ads' : platform === 'google' ? 'Google Ads' : 'TikTok Ads'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Últimos 30 Dias</span>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">Impressões</span>
                <p className="text-sm font-mono font-extrabold text-slate-800 mt-1">{activePreset.impressions.toLocaleString()}</p>
                <span className="text-[9px] text-slate-400">Alcance de visualização</span>
              </div>

              <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">Cliques Reais</span>
                <p className="text-sm font-mono font-extrabold text-slate-800 mt-1">{activePreset.clicks.toLocaleString()}</p>
                <span className="text-[9px] text-slate-400">Cliques no link da página</span>
              </div>

              <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">CTR Médio</span>
                <p className="text-sm font-mono font-extrabold text-indigo-600 mt-1">{activePreset.ctr}%</p>
                <span className="text-[9px] text-emerald-600 font-bold">Saudável (Ideal &gt; 1.5%)</span>
              </div>

              <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">CPC Médio</span>
                <p className="text-sm font-mono font-extrabold text-slate-800 mt-1">R$ {activePreset.cpc.toFixed(2)}</p>
                <span className="text-[9px] text-slate-400">Custo por clique</span>
              </div>
            </div>

            {/* Financial metrics list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-4 text-xs">
              <div className="flex items-center gap-3 bg-indigo-50/20 border border-indigo-100 p-3 rounded-xl">
                <div className="p-2.5 bg-indigo-600 text-white rounded-lg">
                  <DollarSign size={15} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">ORÇAMENTO INVESTIDO</span>
                  <p className="font-mono font-extrabold text-slate-800">R$ {activePreset.spent.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-emerald-50/20 border border-emerald-100 p-3 rounded-xl">
                <div className="p-2.5 bg-emerald-600 text-white rounded-lg">
                  <TrendingUp size={15} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">FATURAMENTO GERADO</span>
                  <p className="font-mono font-extrabold text-slate-800">R$ {activePreset.revenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-violet-50/20 border border-violet-100 p-3 rounded-xl">
                <div className="p-2.5 bg-violet-600 text-white rounded-lg">
                  <Percent size={15} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">ROI (RETORNO ANÚNCIO)</span>
                  <p className="font-mono font-extrabold text-indigo-700">{activePreset.roi}x</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Bar graph simulation of CTR and CPC */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">Gráfico Comparativo de Conversão Geral</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                  <span>Meta Ads Performance (Taxa Conversão: 2.5%)</span>
                  <span className="font-mono">R$ 12.400 Faturado</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                  <span>Google Ads Pesquisa (Taxa Conversão: 5.0%)</span>
                  <span className="font-mono font-bold">R$ 23.800 Faturado</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                  <span>TikTok Ads Impulso (Taxa Conversão: 1.5%)</span>
                  <span className="font-mono">R$ 9.800 Faturado</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: ROI simulator calculator */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-4">
            <div className="pb-2 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono">Simulador de ROI Futuro</span>
              <HelpCircle size={14} className="text-slate-400" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase block">Orçamento Diário Estimado (R$)</label>
                <input 
                  type="number" 
                  value={budget} 
                  onChange={(e) => setBudget(Number(e.target.value))} 
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase block">CPC Desejado (Custo Clique)</label>
                <input 
                  type="number" 
                  step="0.05"
                  value={simulatedCpc} 
                  onChange={(e) => setSimulatedCpc(Number(e.target.value))} 
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase block">CTR Alvo (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={simulatedCtr} 
                  onChange={(e) => setSimulatedCtr(Number(e.target.value))} 
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase block">Taxa de Conversão de Clientes (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={conversionRate} 
                  onChange={(e) => setConversionRate(Number(e.target.value))} 
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase block">Ticket Médio do Serviço (R$)</label>
                <input 
                  type="number" 
                  value={avgTicket} 
                  onChange={(e) => setAvgTicket(Number(e.target.value))} 
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Calculations outputs card */}
            <div className="bg-indigo-950 text-white rounded-xl p-4 space-y-3 font-mono border border-indigo-900 shadow-md">
              <div className="flex justify-between text-[10px] text-indigo-300 font-bold border-b border-indigo-900 pb-1.5 uppercase">
                <span>Indicadores Calculados</span>
                <span>Projeção</span>
              </div>

              <div className="space-y-2 text-[11px] font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cliques Estimados:</span>
                  <span className="font-bold text-white">{clicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Conversões Esperadas:</span>
                  <span className="font-bold text-emerald-400">{conversions.toLocaleString()} clientes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Investido:</span>
                  <span className="font-bold text-slate-200">R$ {spent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Faturamento Bruto:</span>
                  <span className="font-bold text-slate-100">R$ {revenue.toFixed(2)}</span>
                </div>

                <div className="border-t border-indigo-900 pt-2 flex justify-between items-center text-xs">
                  <span className="text-indigo-300 font-bold">ROI PROJETADO:</span>
                  <span className={`font-extrabold text-sm ${roi > 3 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {roi}x (Retorno)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
