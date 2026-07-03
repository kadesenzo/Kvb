import React, { useState } from 'react';
import { Project } from '../types';
import { 
  Folder, 
  Search, 
  Globe, 
  Megaphone, 
  Percent, 
  Cpu, 
  Calendar, 
  Copy, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { formatCurrency } from '../utils';

interface LibraryViewProps {
  projects: Project[];
}

export default function LibraryView({ projects }: LibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'Todos' | 'Sites' | 'Marketing' | 'Tráfego' | 'Automações'>('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter projects based on tabs
  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Custom filter logic
    return matchesSearch;
  });

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6" id="library-tab">
      
      {/* Header Info */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar por nome do projeto, nicho ou cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        
        <span className="text-xs bg-indigo-50 text-indigo-700 py-1.5 px-3 rounded-lg border border-indigo-100 font-bold">
          Biblioteca de Referência: {projects.length} Planejamentos salvos
        </span>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Projects Grid List */}
        <div className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`bg-white p-5 rounded-xl border transition-all cursor-pointer hover:shadow-xs flex flex-col justify-between space-y-3 ${
                  selectedProject?.id === proj.id 
                    ? 'border-indigo-600 ring-1 ring-indigo-600/30 bg-indigo-50/10' 
                    : 'border-slate-100'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{proj.createdAt}</span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[9px] font-bold rounded-full border border-indigo-100">
                      {proj.niche}
                    </span>
                  </div>
                  
                  <h3 className="text-xs md:text-sm font-extrabold text-slate-900 mt-2 truncate" title={proj.name}>
                    {proj.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Cliente: {proj.clientName}</p>
                </div>

                <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                  <span>Visualizar Módulos</span>
                  <ChevronRight size={14} className="text-indigo-400" />
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-2 py-12 text-center text-slate-500 bg-white border border-slate-100 rounded-xl space-y-2">
                <Folder size={24} className="mx-auto text-slate-300" />
                <p className="text-xs">Nenhum projeto salvo na biblioteca de referência foi encontrado.</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Project Full Specs Details Drawer */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between space-y-4">
          {selectedProject ? (
            <div className="space-y-4 h-full flex flex-col overflow-hidden">
              
              {/* Header */}
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[9px] font-bold text-indigo-500 uppercase">BIBLIOTECA ATIVA</span>
                <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight">{selectedProject.name}</h3>
                <p className="text-[11px] text-slate-500">Nicho: <strong>{selectedProject.niche}</strong> | Criado em {selectedProject.createdAt}</p>
              </div>

              {/* Module structures details list */}
              <div className="space-y-3.5 flex-1 overflow-y-auto pr-1 max-h-[480px]">
                
                {/* Site Module */}
                <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200/50 pb-1.5 mb-1.5">
                    <span className="flex items-center gap-1.5"><Globe size={13} className="text-indigo-600" />Site Institucional</span>
                    <button 
                      onClick={() => handleCopyText(`Copy de Vendas:\n"${selectedProject.site.copy}"\n\nEstrutura do Site:\n${selectedProject.site.structure}`, `site-${selectedProject.id}`)}
                      className="text-[10px] text-slate-400 hover:text-indigo-600 font-medium"
                    >
                      {copiedId === `site-${selectedProject.id}` ? '✓ Copiado' : 'Copiar Copy'}
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    <p><strong>Cores sugeridas:</strong> {selectedProject.site.colors}</p>
                    <p><strong>Chamada p/ Ação:</strong> {selectedProject.site.cta}</p>
                    <p><strong>SEO Tags:</strong> {selectedProject.site.seo}</p>
                    <blockquote className="mt-1.5 border-l-2 border-indigo-200 pl-2 text-slate-500 bg-white p-1.5 rounded text-[10px] leading-relaxed italic">
                      "{selectedProject.site.copy}"
                    </blockquote>
                  </div>
                </div>

                {/* Marketing Content Module */}
                <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200/50 pb-1.5 mb-1.5">
                    <span className="flex items-center gap-1.5"><Megaphone size={13} className="text-indigo-600" />Marketing Editorial</span>
                    <button 
                      onClick={() => handleCopyText(`Ideias de Posts:\n${selectedProject.marketing.postIdeas}\n\nLegendas:\n${selectedProject.marketing.captions}`, `mkt-${selectedProject.id}`)}
                      className="text-[10px] text-slate-400 hover:text-indigo-600 font-medium"
                    >
                      {copiedId === `mkt-${selectedProject.id}` ? '✓ Copiado' : 'Copiar Posts'}
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    <p><strong>Estratégia de Crescimento:</strong> {selectedProject.marketing.growthStrategy}</p>
                    <p><strong>Roteiro Reels:</strong> {selectedProject.marketing.reelsScripts}</p>
                    <p><strong>Legendas Prontas:</strong> {selectedProject.marketing.captions}</p>
                    <p><strong>Socio Hashtags:</strong> <span className="font-mono text-slate-500">{selectedProject.marketing.hashtags}</span></p>
                  </div>
                </div>

                {/* Meta Traffic Ads Module */}
                <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200/50 pb-1.5 mb-1.5">
                    <span className="flex items-center gap-1.5"><Percent size={13} className="text-indigo-600" />Gestão Tráfego Ads</span>
                    <button 
                      onClick={() => handleCopyText(`Alvo:\n${selectedProject.traffic.target}\n\nCopy do Anúncio:\n"${selectedProject.traffic.copy}"`, `traffic-${selectedProject.id}`)}
                      className="text-[10px] text-slate-400 hover:text-indigo-600 font-medium"
                    >
                      {copiedId === `traffic-${selectedProject.id}` ? '✓ Copiado' : 'Copiar Copy'}
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    <p><strong>Roteiro de Ativos:</strong> {selectedProject.traffic.creatives}</p>
                    <p><strong>Público Alvo Meta:</strong> {selectedProject.traffic.target}</p>
                    <p><strong>Estratégias de Funil:</strong> {selectedProject.traffic.strategies}</p>
                    <p><strong>Segmentação de Interesses:</strong> {selectedProject.traffic.segmentation}</p>
                  </div>
                </div>

                {/* Automation & WhatsApp Flows Module */}
                <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200/50 pb-1.5 mb-1.5">
                    <span className="flex items-center gap-1.5"><Cpu size={13} className="text-indigo-600" />WhatsApp & Automações</span>
                    <button 
                      onClick={() => handleCopyText(`Boas-Vindas:\n${selectedProject.automation.messages}\n\nFluxo:\n${selectedProject.automation.flowchart}`, `auto-${selectedProject.id}`)}
                      className="text-[10px] text-slate-400 hover:text-indigo-600 font-medium"
                    >
                      {copiedId === `auto-${selectedProject.id}` ? '✓ Copiado' : 'Copiar Fluxos'}
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    <p><strong>Atendimento Funil:</strong> {selectedProject.automation.funnel}</p>
                    <p><strong>Disparo de Rotinas:</strong> {selectedProject.automation.whatsapp}</p>
                    <p><strong>Follow-Up Textos (24h):</strong> {selectedProject.automation.followUp}</p>
                    <p><strong>Engajamento Reativação:</strong> {selectedProject.automation.recovery}</p>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="py-24 text-center text-slate-400 space-y-2">
              <Info size={28} className="mx-auto text-slate-300" />
              <p className="text-xs">Selecione um projeto na lista à esquerda para carregar as cópias de segurança de websites, marketing, tráfego pago e automação.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
