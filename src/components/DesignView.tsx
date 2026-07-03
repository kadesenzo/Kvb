import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Type, 
  Image as ImageIcon, 
  Layers, 
  Download, 
  RefreshCw, 
  Eye, 
  CheckCircle2, 
  Play,
  Scissors
} from 'lucide-react';

interface DesignTemplate {
  id: string;
  title: string;
  type: 'Logo' | 'Banner' | 'Post' | 'Stories' | 'Thumbnail';
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  text: string;
  description: string;
}

export default function DesignView() {
  const [designType, setDesignType] = useState<'Logo' | 'Banner' | 'Post' | 'Stories' | 'Thumbnail'>('Post');
  const [designTheme, setDesignTheme] = useState<string>('Minimalist');
  const [customText, setCustomText] = useState('KVB OS CLÍNICA');
  const [primaryColor, setPrimaryColor] = useState('#6366f1'); // Indigo
  const [secondaryColor, setSecondaryColor] = useState('#0f172a'); // Slate 900
  const [textColor, setTextColor] = useState('#ffffff');
  const [isGenerating, setIsGenerating] = useState(false);

  // Ready templates state
  const [templates, setTemplates] = useState<DesignTemplate[]>([
    { id: 'dt1', title: 'Logo Sorella', type: 'Logo', theme: 'Minimalist', primaryColor: '#ec4899', secondaryColor: '#fafafa', textColor: '#1e293b', text: 'S', description: 'Marcação de saúde e estética sofisticada.' },
    { id: 'dt2', title: 'Banner FitLife Meta Ads', type: 'Banner', theme: 'Bold', primaryColor: '#10b981', secondaryColor: '#0f172a', textColor: '#ffffff', text: 'TREINE HOJE', description: 'Criativo estático focado em conversão de matrículas.' },
    { id: 'dt3', title: 'Post Ju Doces Finos', type: 'Post', theme: 'Elegant', primaryColor: '#f43f5e', secondaryColor: '#fff1f2', textColor: '#881337', text: 'Doce Felicidade', description: 'Arranjo de posts de gastronomia artesanal.' }
  ]);

  const handleCreatePreset = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newTemplate: DesignTemplate = {
        id: 'dt' + (templates.length + 1),
        title: `Design Gerado - ${designType}`,
        type: designType,
        theme: designTheme,
        primaryColor,
        secondaryColor,
        textColor,
        text: customText,
        description: `Criado de forma inteligente com IA sob estilo ${designTheme}.`
      };
      setTemplates(prev => [newTemplate, ...prev]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleExport = (title: string) => {
    alert(`Exportando design: "${title}" para formato PNG/SVG de alta qualidade. (Arquivo exportado com sucesso no sandbox)`);
  };

  return (
    <div className="space-y-6" id="design-view">
      {/* Banner introduction */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            <Palette size={18} className="text-indigo-600 animate-pulse" />
            Criador de Criativos e Design IA
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Gere designs de alto engajamento, logotipos minimalistas e banners de anúncios otimizados para Meta Ads e Reels usando IA.
          </p>
        </div>
      </div>

      {/* Grid Canvas & Config Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left config board column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono block">Painel Criativo</span>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Type selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Tipo de Peça</label>
                <select 
                  value={designType} 
                  onChange={(e) => setDesignType(e.target.value as any)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-500 font-bold"
                >
                  <option value="Logo">Logotipo Conceitual</option>
                  <option value="Banner">Banner / Criativo de Anúncio</option>
                  <option value="Post">Post Instagram Quadrado (1:1)</option>
                  <option value="Stories">Stories Instagram / Reels (9:16)</option>
                  <option value="Thumbnail">Thumbnail YouTube (16:9)</option>
                </select>
              </div>

              {/* Style Theme selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Estilo Estético</label>
                <select 
                  value={designTheme} 
                  onChange={(e) => setDesignTheme(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-500 font-bold"
                >
                  <option value="Minimalist">Minimalista Moderno</option>
                  <option value="Cyberpunk">Cyberpunk Neon</option>
                  <option value="Elegant">Editorial & Elegante</option>
                  <option value="Bold">Brutalista / Negrito</option>
                  <option value="Corporate">Corporativo Corporativo</option>
                </select>
              </div>

              {/* Headline title */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Texto Principal (Headline)</label>
                <input 
                  type="text" 
                  value={customText} 
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={25}
                  className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-indigo-500 font-bold"
                  placeholder="Digite o texto de destaque"
                />
              </div>

              {/* Color configurations */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] text-slate-400 block mb-1 uppercase font-mono">Primária</label>
                  <div className="flex items-center gap-1.5 border border-slate-200 p-1 rounded-lg">
                    <input 
                      type="color" 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)} 
                      className="w-6 h-6 border-0 cursor-pointer rounded-md p-0"
                    />
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">{primaryColor.substring(1, 4)}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-slate-400 block mb-1 uppercase font-mono">Secundária</label>
                  <div className="flex items-center gap-1.5 border border-slate-200 p-1 rounded-lg">
                    <input 
                      type="color" 
                      value={secondaryColor} 
                      onChange={(e) => setSecondaryColor(e.target.value)} 
                      className="w-6 h-6 border-0 cursor-pointer rounded-md p-0"
                    />
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">{secondaryColor.substring(1, 4)}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-slate-400 block mb-1 uppercase font-mono">Texto</label>
                  <div className="flex items-center gap-1.5 border border-slate-200 p-1 rounded-lg">
                    <input 
                      type="color" 
                      value={textColor} 
                      onChange={(e) => setTextColor(e.target.value)} 
                      className="w-6 h-6 border-0 cursor-pointer rounded-md p-0"
                    />
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">{textColor.substring(1, 4)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreatePreset}
                disabled={isGenerating}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
              >
                {isGenerating ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <>
                    <Sparkles size={14} />
                    Gerar Criativo Inteligente IA
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Board & Library Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Canvas Board Render */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Eye size={13} className="text-slate-400" />
              Simulação de Renderização em Tempo Real (Canvas)
            </span>

            {/* Simulated Live Stage container */}
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <div 
                className={`shadow-lg border border-slate-200/40 rounded-xl flex flex-col items-center justify-center text-center p-6 relative overflow-hidden transition-all duration-300 ${
                  designType === 'Logo' ? 'w-48 h-48 rounded-full' :
                  designType === 'Banner' ? 'w-full h-44' :
                  designType === 'Post' ? 'w-64 h-64' :
                  designType === 'Stories' ? 'w-48 h-80' :
                  'w-full h-48 aspect-video'
                }`}
                style={{ backgroundColor: secondaryColor }}
              >
                {/* Visual backdrops overlays under theme choices */}
                {designTheme === 'Cyberpunk' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none"></div>
                )}
                {designTheme === 'Elegant' && (
                  <div className="absolute inset-4 border border-white/10 pointer-events-none"></div>
                )}
                {designTheme === 'Minimalist' && (
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/20"></div>
                )}

                {/* Main dynamic elements */}
                <div className="space-y-4 z-10 p-4">
                  {designType === 'Logo' ? (
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-serif font-extrabold mx-auto shadow-inner"
                      style={{ backgroundColor: primaryColor, color: textColor }}
                    >
                      {customText.substring(0, 2).toUpperCase()}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded" style={{ backgroundColor: primaryColor, color: textColor }}>
                        {designTheme} Style
                      </span>
                      <h3 className="text-sm md:text-base font-extrabold tracking-tight" style={{ color: textColor }}>
                        {customText}
                      </h3>
                      <p className="text-[9px] opacity-70" style={{ color: textColor }}>
                        Design otimizado para campanhas corporativas de alta performance.
                      </p>
                    </div>
                  )}
                </div>

                {/* Stage controls watermark */}
                <span className="absolute bottom-2 right-2 text-[8px] font-mono text-white/20">KVB OS PRO</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] text-slate-400 font-mono">Largura: Autocompensadora (Vetor)</span>
              <button
                onClick={() => handleExport(`Design Custom ${designType}`)}
                className="py-1.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Download size={13} />
                Baixar Criativo PNG
              </button>
            </div>
          </div>

          {/* Library generated items */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">Sua Galeria Criativa</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((tmpl) => (
                <div key={tmpl.id} className="p-3 rounded-xl border border-slate-100 flex flex-col justify-between space-y-3 bg-slate-50/20">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {tmpl.type}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">{tmpl.theme}</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-800 truncate">{tmpl.title}</h4>
                    <p className="text-[10px] text-slate-400 font-sans line-clamp-1">{tmpl.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100/50 pt-2.5">
                    <div className="flex gap-1">
                      <span className="w-3.5 h-3.5 rounded-full inline-block border border-slate-200" style={{ backgroundColor: tmpl.primaryColor }}></span>
                      <span className="w-3.5 h-3.5 rounded-full inline-block border border-slate-200" style={{ backgroundColor: tmpl.secondaryColor }}></span>
                    </div>
                    <button 
                      onClick={() => handleExport(tmpl.title)}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
                    >
                      Exportar <Download size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
