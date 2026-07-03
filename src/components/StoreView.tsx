import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Plus, 
  Globe, 
  Zap, 
  Grid, 
  Terminal,
  Heart
} from 'lucide-react';

interface StoreItem {
  id: string;
  title: string;
  category: 'Sites' | 'Funis' | 'Prompts' | 'Automações';
  description: string;
  price: string;
  previewUrl?: string;
  isPopular?: boolean;
}

export default function StoreView() {
  const [filter, setFilter] = useState<string>('Todos');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [importedIds, setImportedIds] = useState<string[]>([]);

  const [storeItems] = useState<StoreItem[]>([
    { id: 'st1', title: 'Landing Page Advocacia Sênior', category: 'Sites', description: 'Template React + Tailwind extremamente limpo, com agendamento direto e formulário de qualificação jurídica.', price: 'R$ 158', isPopular: true },
    { id: 'st2', title: 'Funil Completo Clínica de Estética', category: 'Funis', description: 'Sequência de criativos, roteiros de stories, estrutura de copy de Whatsapp e segmentações prontas no Meta Ads.', price: 'R$ 279' },
    { id: 'st3', title: 'Script de Triagem Inteligente N8N', category: 'Automações', description: 'Fluxo que recebe mensagens de leads, analisa a prontidão via GPT, qualifica e cadastra diretamente no CRM.', price: 'R$ 229', isPopular: true },
    { id: 'st4', title: 'Super Prompt CEO para Projeção Financeira', category: 'Prompts', description: 'Estruturação avançada de prompt para simular cenários de faturamento anual, metas e gargalos operacionais.', price: 'R$ 49' },
    { id: 'st5', title: 'Site Imobiliário Luxury Living', category: 'Sites', description: 'Design dark premium de alto padrão, integração com filtros de busca e botão direto para corretores.', price: 'R$ 399' },
    { id: 'st6', title: 'Automação de Recorrência e Faturas', category: 'Automações', description: 'Envio automático de alertas de cobrança, renovação de cartões via Stripe e relatórios de inadimplência.', price: 'R$ 158' }
  ]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleImportToMemory = (item: StoreItem) => {
    if (importedIds.includes(item.id)) return;

    // Simulate 1-second loading for import
    setImportedIds(prev => [...prev, item.id]);
    alert(`Sucesso! O projeto "${item.title}" foi importado para sua Central de Memórias com sucesso para referência.`);
  };

  const filteredItems = storeItems.filter(item => {
    const matchesCategory = filter === 'Todos' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6" id="store-view">
      {/* Banner Intro */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/15 border border-indigo-500/30 rounded-full text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
            <ShoppingBag size={13} />
            KVB Store
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Marketplace Interno de Ativos</h2>
          <p className="text-xs text-slate-300 max-w-xl font-medium">
            Economize semanas de trabalho importando templates prontos de Landing Pages, automações avançadas do N8N e copies validadas diretamente na sua Central de Memórias com 1 clique.
          </p>
        </div>
      </div>

      {/* Category filters and Search bar */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto">
          {['Todos', 'Sites', 'Funis', 'Automações', 'Prompts'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === cat ? 'bg-indigo-600 text-white shadow-2xs font-extrabold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search bar input */}
        <div className="relative w-full md:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-slate-800 font-medium"
            placeholder="Buscar ativos prontos..."
          />
        </div>
      </div>

      {/* Grid List layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isFavorited = favorites.includes(item.id);
          const isImported = importedIds.includes(item.id);

          return (
            <div 
              key={item.id} 
              className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    item.category === 'Sites' ? 'bg-indigo-50 text-indigo-700' :
                    item.category === 'Funis' ? 'bg-rose-50 text-rose-700' :
                    item.category === 'Automações' ? 'bg-cyan-50 text-cyan-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {item.category}
                  </span>

                  <div className="flex gap-1.5 items-center">
                    {item.isPopular && (
                      <span className="text-[8px] bg-indigo-600 text-white font-bold px-1.5 py-0.5 rounded uppercase font-mono animate-pulse">POPULAR</span>
                    )}
                    <button 
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-1 rounded-lg ${isFavorited ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500'}`}
                    >
                      <Heart size={13} className={isFavorited ? 'fill-rose-500' : ''} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xs font-extrabold text-slate-800 leading-snug">{item.title}</h3>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed line-clamp-3">{item.description}</p>
              </div>

              <div className="border-t border-slate-100/60 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block">VALOR DE ATIVO</span>
                  <span className="text-xs font-mono font-extrabold text-slate-800">{item.price}</span>
                </div>

                <button
                  onClick={() => handleImportToMemory(item)}
                  disabled={isImported}
                  className={`py-1.5 px-3.5 rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    isImported 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-700 shadow-xs'
                  }`}
                >
                  {isImported ? (
                    <>
                      <CheckCircle2 size={12} />
                      Importado
                    </>
                  ) : (
                    <>
                      <Plus size={12} />
                      Importar para Memória
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
