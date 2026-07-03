import React, { useState } from 'react';
import { Project } from '../types';
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  Globe, 
  Megaphone, 
  Percent, 
  Cpu, 
  Check, 
  Bookmark, 
  Layers,
  Palette,
  FileSearch2,
  BookmarkCheck
} from 'lucide-react';

interface AiGeneratorViewProps {
  onSaveToLibrary: (projectData: any) => Promise<void>;
}

export default function AiGeneratorView({ onSaveToLibrary }: AiGeneratorViewProps) {
  // Question states
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    niche: '',
    companyName: '',
    objective: '',
    vendasOuAutoridade: 'Mais Vendas', // Mais vendas ou autoridade
    hasInstagram: '',
    hasVisualIdentity: '',
    favColors: '',
    competitors: '',
    hasSite: '',
    targetAudience: '',
    offeredServices: '',
    toneOfVoice: 'Profissional e Convincente',
    references: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState('');
  const [generatedProject, setGeneratedProject] = useState<any | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'site' | 'marketing' | 'traffic' | 'automation'>('site');

  // Total steps to progress
  const totalSteps = 13;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectOption = (field: string, value: string) => {
    setAnswers({ ...answers, [field]: value });
  };

  const handleTextChange = (field: string, value: string) => {
    setAnswers({ ...answers, [field]: value });
  };

  // Orchestrating staging alerts
  const runGenerationMeters = () => {
    const stages = [
      "Mapeando nicho de atuação e público-alvo...",
      "Estruturando wireframe e copy do site institucional...",
      "Criando calendário editorial de 30 dias para Marketing Digital...",
      "Configurando segmentação otimizada para Meta/Google Ads...",
      "Desenvolvendo fluxogramas e roteiros de follow-up no WhatsApp...",
      "Consolidando relatório comercial executivo..."
    ];
    
    let currentIdx = 0;
    setGenerationStage(stages[0]);

    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < stages.length) {
        setGenerationStage(stages[currentIdx]);
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return interval;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsSaved(false);
    const interval = runGenerationMeters();

    try {
      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      
      const data = await response.json();
      setGeneratedProject(data);
    } catch (err) {
      console.error("AI Generation failed:", err);
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const handleSaveProject = async () => {
    if (!generatedProject) return;
    
    const payload = {
      name: generatedProject.name,
      niche: generatedProject.niche,
      clientName: answers.companyName || "Briefing Avulso",
      site: generatedProject.site,
      marketing: generatedProject.marketing,
      traffic: generatedProject.traffic,
      automation: generatedProject.automation
    };

    await onSaveToLibrary(payload);
    setIsSaved(true);
  };

  const startNewBriefing = () => {
    setGeneratedProject(null);
    setCurrentStep(1);
    setIsSaved(false);
    setAnswers({
      niche: '',
      companyName: '',
      objective: '',
      vendasOuAutoridade: 'Mais Vendas',
      hasInstagram: '',
      hasVisualIdentity: '',
      favColors: '',
      competitors: '',
      hasSite: '',
      targetAudience: '',
      offeredServices: '',
      toneOfVoice: 'Profissional e Convincente',
      references: ''
    });
  };

  return (
    <div className="space-y-6" id="ai-generator-tab">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="text-indigo-600 animate-pulse" size={18} />
            Gerador de Projetos Inteligente
          </h2>
          <p className="text-xs text-slate-400">Preencha o briefing do cliente para gerar estratégias completas via Inteligência Artificial.</p>
        </div>
        {generatedProject && (
          <button 
            onClick={startNewBriefing}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 border border-indigo-100 rounded-lg cursor-pointer"
          >
            Novo Briefing
          </button>
        )}
      </div>

      {isGenerating ? (
        /* LOADING STATE */
        <div className="bg-white rounded-xl border border-slate-100 shadow-xs p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-96">
          <Loader2 size={40} className="text-indigo-600 animate-spin" />
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800">Cozinhando briefing estratégico KVB...</h3>
            <p className="text-xs text-slate-500 font-medium font-mono bg-slate-50 px-3 py-1 rounded border border-slate-100">
              {generationStage}
            </p>
          </div>
          <p className="text-[11px] text-slate-400 max-w-sm">Aguarde. Nossa IA especializada em Sites, Marketing, Tráfego Pago e Automações está consolidando as melhores práticas do nicho.</p>
        </div>
      ) : generatedProject ? (
        /* GENERATION OUTPUT TABS VIEW */
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">PLANEJAMENTO GERADO COM SUCESSO</span>
              <h3 className="text-lg font-bold">{generatedProject.name || `Planejamento para ${answers.companyName}`}</h3>
              <p className="text-xs text-slate-400">Segmentação inteligente focada no nicho de <strong>{generatedProject.niche}</strong></p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveProject}
                disabled={isSaved}
                className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  isSaved 
                    ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
                id="btn-save-draft"
              >
                {isSaved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                {isSaved ? 'Salvo na Biblioteca!' : 'Salvar na Biblioteca KVB'}
              </button>
            </div>
          </div>

          {/* Tab Selector for segments */}
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveResultTab('site')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                activeResultTab === 'site' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe size={14} />
              Website & SEO
            </button>
            <button
              onClick={() => setActiveResultTab('marketing')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                activeResultTab === 'marketing' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Megaphone size={14} />
              Marketing Social
            </button>
            <button
              onClick={() => setActiveResultTab('traffic')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                activeResultTab === 'traffic' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent size={14} />
              Tráfego Pago
            </button>
            <button
              onClick={() => setActiveResultTab('automation')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                activeResultTab === 'automation' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu size={14} />
              Automações & WhatsApp
            </button>
          </div>

          {/* Grid of Results depending on Active Tab */}
          <div className="p-1">
            
            {/* SITE DETAILS TAB */}
            {activeResultTab === 'site' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-100" id="site-result-pane">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Arquitetura Recomendada</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Estrutura de Seções do Site</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1 font-mono p-3 bg-slate-50 border border-slate-100 rounded">{generatedProject.site.structure}</p>
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Design e Identidade</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Sugestão de Cores e Estilos</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{generatedProject.site.colors}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Diferenciais e Suportes</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Orientação de Textos Secundários</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{generatedProject.site.textos}</p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50/60 p-5 rounded-xl border border-slate-100/50">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-100 px-2 py-0.5 rounded">Vendas & Persuasão</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-2">Destaque de Copywriting de Vendas</h4>
                    <p className="text-xs text-slate-700 italic border-l-4 border-indigo-400 pl-3 leading-relaxed mt-1.5">"{generatedProject.site.copy}"</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase">Estrutura de CTA (Chamada para Ação)</span>
                    <p className="text-xs text-indigo-800 font-bold leading-relaxed mt-1">🏷️ Botão Destaque: "{generatedProject.site.cta}"</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase">Indexação SEO (Palavras-Chaves Requisitadas)</span>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1 bg-slate-100 p-2.5 rounded font-mono text-[11px] font-bold">{generatedProject.site.seo}</p>
                  </div>
                </div>
              </div>
            )}

            {/* MARKETING & COPY TABS */}
            {activeResultTab === 'marketing' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-100" id="mkt-result-pane">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Planejamento Editorial</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Cronograma de Conteúdos (30 dias)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5 whitespace-pre-line bg-slate-50 p-3.5 border border-slate-100 rounded">{generatedProject.marketing.calendar}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Roteiro para Vídeos</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Script Reels & Stories de Conversão</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5 whitespace-pre-line bg-slate-50 p-3.5 border border-slate-100 rounded">{generatedProject.marketing.reelsScripts}</p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50/60 p-5 rounded-xl border border-slate-100/50">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-100 px-2 py-0.5 rounded">Legenda de Exemplo de Publicação</span>
                    <p className="text-xs text-slate-700 leading-relaxed mt-2 whitespace-pre-line bg-white p-3.5 rounded border border-slate-200">
                      {generatedProject.marketing.captions}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase">Hashtag de Nicho Recomendadas</span>
                    <p className="text-xs text-slate-500 mt-1 font-mono font-bold leading-relaxed">{generatedProject.marketing.hashtags}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Estratégias de Crescimento</span>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{generatedProject.marketing.growthStrategy}</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAID TRAFFIC VIEW TAB */}
            {activeResultTab === 'traffic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-100" id="traffic-result-pane">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Estrutura Comercial</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Estratégias de Campanhas de Anúncio</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5 bg-slate-50 p-3.5 border border-slate-100 rounded">{generatedProject.traffic.strategies}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Mapeamento de Interesse</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Segmentação e Interesses recomendados (Meta Ads)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5 bg-slate-50 p-3.5 border border-slate-100 rounded">{generatedProject.traffic.segmentation}</p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50/60 p-5 rounded-xl border border-slate-100/50">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-100 px-2 py-0.5 rounded">Copywriting de Alta Conversão</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-2">Texto de Criativo para Anúncio</h4>
                    <p className="text-xs text-slate-700 leading-relaxed mt-1.5 italic border-l-4 border-indigo-400 pl-3">"{generatedProject.traffic.copy}"</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase">Ideias Gerais de Criativos Visuais</span>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{generatedProject.traffic.creatives}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase">Público Alvo Demográfico Primário</span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-white p-2 border border-slate-100 rounded font-bold font-mono text-[11px]">{generatedProject.traffic.target}</p>
                  </div>
                </div>
              </div>
            )}

            {/* AUTOMATION DETAILS */}
            {activeResultTab === 'automation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-100" id="automation-result-pane">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Fluxo Operacional</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Fluxograma Detalhado (N8N / Make)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-mono bg-slate-50 p-3.5 border border-slate-100 rounded">{generatedProject.automation.flowchart}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-50 px-2 py-0.5 rounded">Modelo de Respostas</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1.5">Mensagem Inicial de Boas-Vindas no WhatsApp</h4>
                    <p className="text-xs text-slate-700 leading-relaxed mt-1.5 whitespace-pre-line bg-white p-3.5 rounded border border-slate-200">
                      {generatedProject.automation.messages}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50/60 p-5 rounded-xl border border-slate-100/50">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-extrabold uppercase bg-indigo-100 px-2 py-0.5 rounded">Gestão de Funis</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-2">Dicionário do Funil de Atendimento</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{generatedProject.automation.funnel}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase">Lembretes Automáticos Cadastrados</span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{generatedProject.automation.whatsapp}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase">Roteiro e Mensagem de Follow-up (24h)</span>
                    <p className="text-xs text-slate-700 leading-relaxed mt-1.5 p-3 bg-white border border-slate-200 rounded italic">"{generatedProject.automation.followUp}"</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase">Recuperação de Oportunidades Perdidas</span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{generatedProject.automation.recovery}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      ) : (
        /* BRIEFING QUESTIONNAIRE VIEWER STEP BY STEP */
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden" id="briefing-wizard">
          
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-1.5">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono">ETAPA {currentStep} de {totalSteps}</span>
              <span className="text-xs font-semibold text-slate-500">{Math.round((currentStep / totalSteps) * 100)}% concluído</span>
            </div>

            {/* Questions Switcher */}
            <div className="min-h-36 flex flex-col justify-center space-y-4" id="questions-viewport">
              
              {/* Q1: Nicho */}
              {currentStep === 1 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">1. Qual o nicho de mercado do negócio do cliente?</h3>
                  <input
                    type="text"
                    placeholder="Ex: Medicina Estética, Advocacia Trabalhista, Hamburgueria Gourmet..."
                    value={answers.niche}
                    onChange={(e) => handleTextChange('niche', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                  <p className="text-[10px] text-slate-400">Isso ajuda a calibrar a densidade semântica da IA para os concorrentes específicos.</p>
                </div>
              )}

              {/* Q2: Empresa */}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">2. Qual o nome oficial da empresa / marca?</h3>
                  <input
                    type="text"
                    placeholder="Ex: Prime Odonto, Mendes & Advogados Associados..."
                    value={answers.companyName}
                    onChange={(e) => handleTextChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q3: Objetivo */}
              {currentStep === 3 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">3. Qual o objetivo principal a curto prazo?</h3>
                  <input
                    type="text"
                    placeholder="Ex: Escalar captação de leads pelo WhatsApp, otimizar autoridade orgânica local..."
                    value={answers.objective}
                    onChange={(e) => handleTextChange('objective', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q4: Foco */}
              {currentStep === 4 && (
                <div className="space-y-3">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">4. Você quer foco em Vendas (Conversão Direta) ou Autoridade de Marca (Branding)?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelectOption('vendasOuAutoridade', 'Mais Vendas')}
                      className={`p-4 border rounded-xl text-center font-bold text-xs md:text-sm cursor-pointer transition-all ${
                        answers.vendasOuAutoridade === 'Mais Vendas' 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Mais Vendas & Leads
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectOption('vendasOuAutoridade', 'Forte Autoridade')}
                      className={`p-4 border rounded-xl text-center font-bold text-xs md:text-sm cursor-pointer transition-all ${
                        answers.vendasOuAutoridade === 'Forte Autoridade' 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Forte Autoridade (Branding)
                    </button>
                  </div>
                </div>
              )}

              {/* Q5: Instagram */}
              {currentStep === 5 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">5. A empresa já possui Instagram ativo? Se sim, qual?</h3>
                  <input
                    type="text"
                    placeholder="Ex: @clinicasorella ou 'Ainda não possui'"
                    value={answers.hasInstagram}
                    onChange={(e) => handleTextChange('hasInstagram', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q6: Identidade Visual */}
              {currentStep === 6 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">6. Possui Identidade Visual (Logotipo, Tipografias definidas)?</h3>
                  <input
                    type="text"
                    placeholder="Ex: 'Sim, completa', 'Apenas logo rudimentar' ou 'Precisa criar do zero'"
                    value={answers.hasVisualIdentity}
                    onChange={(e) => handleTextChange('hasVisualIdentity', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q7: Cores Preferidas */}
              {currentStep === 7 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">7. Quais são suas Cores preferidas ou paletas desejadas?</h3>
                  <input
                    type="text"
                    placeholder="Ex: Azul marinho com dourado metálico, Off-white com verde floresta e minimalista..."
                    value={answers.favColors}
                    onChange={(e) => handleTextChange('favColors', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q8: Concorrentes */}
              {currentStep === 8 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">8. Quais são os principais concorrentes diretos ou do setor?</h3>
                  <input
                    type="text"
                    placeholder="Ex: Clínica Odontológica XYZ de Pinheiros, Consultório Dr. André..."
                    value={answers.competitors}
                    onChange={(e) => handleTextChange('competitors', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q9: Site */}
              {currentStep === 9 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">9. A empresa já possui algum site institucional ativo?</h3>
                  <input
                    type="text"
                    placeholder="Ex: 'Sim, www.empresa.com.br' ou 'Não, precisa desenvolver do zero'"
                    value={answers.hasSite}
                    onChange={(e) => handleTextChange('hasSite', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q10: Público-Alvo */}
              {currentStep === 10 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">10. Qual o perfil de Público-Alvo ideal?</h3>
                  <input
                    type="text"
                    placeholder="Ex: Mulheres, 25-45 anos, classe A/B que residem no ABC Paulista, focadas em rejuvenescimento..."
                    value={answers.targetAudience}
                    onChange={(e) => handleTextChange('targetAudience', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q11: Serviços */}
              {currentStep === 11 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">11. Quais são os serviços ou produtos ofertados de alta margem?</h3>
                  <input
                    type="text"
                    placeholder="Ex: Preenchimento labial, Alinhamento dental transparente invisalign, pacotes de clareamento..."
                    value={answers.offeredServices}
                    onChange={(e) => handleTextChange('offeredServices', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

              {/* Q12: Tom da Comunicação */}
              {currentStep === 12 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">12. Qual o tom de voz comercial mais adequado?</h3>
                  <select
                    value={answers.toneOfVoice}
                    onChange={(e) => handleTextChange('toneOfVoice', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm bg-white"
                  >
                    <option value="Profissional, Sóbrio e Convincente">Profissional, Sóbrio e Convincente</option>
                    <option value="Acolhedor, Empático e Atencioso">Acolhedor, Empático e Atencioso</option>
                    <option value="Moderno, Descontraído e Inovador">Moderno, Descontraído e Inovador</option>
                    <option value="Sofisticado, Exclusivo e de Alto Padrão">Sofisticado, Exclusivo e de Alto Padrão</option>
                  </select>
                </div>
              )}

              {/* Q13: Referências */}
              {currentStep === 13 && (
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800">13. Possui alguma referência de design, marcas que admira?</h3>
                  <input
                    type="text"
                    placeholder="Ex: Notion pela clareza, Apple pelo minimalismo estético, ou 'Nenhuma em mente'..."
                    value={answers.references}
                    onChange={(e) => handleTextChange('references', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs md:text-sm"
                  />
                </div>
              )}

            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-5">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={handlePrev}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 disabled:opacity-30 flex items-center gap-1 cursor-pointer text-xs md:text-sm"
              >
                <ArrowLeft size={14} />
                Voltar
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer text-xs md:text-sm"
                >
                  Continuar
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer text-xs md:text-sm shadow-xs shadow-indigo-600/10"
                  id="btn-trigger-generation"
                >
                  <Sparkles size={16} />
                  Gerar Plano com IA
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
