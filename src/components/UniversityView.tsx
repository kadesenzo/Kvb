import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Award, 
  CheckCircle2, 
  Play, 
  Download, 
  ChevronRight, 
  Trophy, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'pdf' | 'quiz';
  completed: boolean;
  contentUrl?: string;
  description: string;
}

interface Course {
  id: string;
  title: string;
  category: 'Vendas' | 'Tráfego' | 'Programação' | 'Automação' | 'Marketing';
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  lessonsCount: number;
  lessons: Lesson[];
  instructor: string;
}

export default function UniversityView() {
  const [userName, setUserName] = useState('Erick Dev');
  const [activeCourseId, setActiveCourseId] = useState('c_prog');
  const [activeLessonId, setActiveLessonId] = useState('l_prog_1');
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certCourseTitle, setCertCourseTitle] = useState('');

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'c_vendas',
      title: 'Máquina de Vendas High-Ticket',
      category: 'Vendas',
      description: 'Como estruturar propostas comerciais irresistíveis, contornar objeções de diretores e fechar contratos de mais de R$ 10.000 recorrentes.',
      difficulty: 'Avançado',
      instructor: 'Carlos Comercial',
      lessonsCount: 4,
      lessons: [
        { id: 'l_vend_1', title: 'Fundamentos de Negociação Consultiva (BANT)', duration: '15 min', type: 'video', completed: true, description: 'Como qualificar leads em 10 minutos de reunião usando a metodologia Budget, Authority, Need e Timeline.' },
        { id: 'l_vend_2', title: 'Anatomia da Proposta Comercial de Alta Conversão', duration: '12 min', type: 'video', completed: true, description: 'Passo a passo visual de como montar uma proposta que tira o foco do custo e eleva o valor agregado.' },
        { id: 'l_vend_3', title: 'Planilha de Precificação Dinâmica para Projetos', duration: '5 min', type: 'pdf', completed: false, description: 'Material didático para calcular o custo operacional e margem líquida de lucro em projetos de Software.' },
        { id: 'l_vend_4', title: 'Quiz: Contorno de Objeções de Diretores Financeiros', duration: '10 min', type: 'quiz', completed: false, description: 'Avaliação prática com respostas ideais para negociar descontos e reter valores de contrato.' }
      ]
    },
    {
      id: 'c_traf',
      title: 'Gestão de Mídia e Tráfego de Alta Escala',
      category: 'Tráfego',
      description: 'Estruturação avançada de públicos no Facebook Business Suite e Google Ads para maximizar CTR e reter ROI elevado para e-commerces e clínicas de estética.',
      difficulty: 'Intermediário',
      instructor: 'Tiago Performance',
      lessonsCount: 4,
      lessons: [
        { id: 'l_traf_1', title: 'Estruturando Públicos de Lookalike e Whitelists', duration: '18 min', type: 'video', completed: true, description: 'Como usar a lista de clientes atuais do CRM para criar audiências frias extremamente responsivas.' },
        { id: 'l_traf_2', title: 'Otimização de CPC e CTR em Campanhas de Conversão', duration: '14 min', type: 'video', completed: true, description: 'Táticas de teste A/B para criativos e títulos que diminuem o custo de aquisição (CPA) pela metade.' },
        { id: 'l_traf_3', title: 'Manual Completo de Rastreamento com Pixel e CAPI', duration: '8 min', type: 'pdf', completed: true, description: 'Instruções para configurar a API de Conversão do Meta em servidores de nuvem de forma resiliente.' },
        { id: 'l_traf_4', title: 'Quiz de Métricas e Análise de Planilhas de ROI', duration: '8 min', type: 'quiz', completed: true, description: 'Teste sua habilidade para diagnosticar gargalos na jornada do usuário a partir dos dados do painel.' }
      ]
    },
    {
      id: 'c_prog',
      title: 'Desenvolvedor Fullstack React & Node.js KVB',
      category: 'Programação',
      description: 'Domine a arquitetura interna do KVB System. Aprenda a programar componentes performáticos com Vite, Tailwind CSS e integrar APIs em Express.',
      difficulty: 'Avançado',
      instructor: 'Erick Dev Sênior',
      lessonsCount: 4,
      lessons: [
        { id: 'l_prog_1', title: 'Introdução ao Ecossistema KVB System e Vite', duration: '20 min', type: 'video', completed: true, description: 'Uma visão geral de como o applet é estruturado no container, usando Nginx reverso e bundles de build.' },
        { id: 'l_prog_2', title: 'Desenhando com Tailwind CSS e UI Consistente', duration: '15 min', type: 'video', completed: true, description: 'Uso de tokens, espaçamentos assimétricos, tipografia e bordas elegantes para criar design de alta sofisticação.' },
        { id: 'l_prog_3', title: 'Guia Completo de Otimização de SEO e Velocidade', duration: '12 min', type: 'pdf', completed: true, description: 'Configuração de meta tags, compressão de imagens de forma reativa e pré-carregamento crítico.' },
        { id: 'l_prog_4', title: 'Quiz: Gerenciamento de Estados Globais e Efeitos', duration: '10 min', type: 'quiz', completed: true, description: 'Descubra como evitar re-renderizações infinitas e vazamentos de memória usando useEffect e useState.' }
      ]
    },
    {
      id: 'c_auto',
      title: 'Mestre em Integrações Automatizadas (N8N & Make)',
      category: 'Automação',
      description: 'Como criar conexões avançadas de bancos de dados com webhook do WhatsApp, automação de e-mails, faturação e lembretes com zero código.',
      difficulty: 'Intermediário',
      instructor: 'Lucas Automações',
      lessonsCount: 4,
      lessons: [
        { id: 'l_auto_1', title: 'Configurando Webhooks de Entrada no N8N', duration: '12 min', type: 'video', completed: false, description: 'Aprenda a interceptar pagamentos confirmados do Stripe ou Mercado Pago e acionar o fluxo de onboard.' },
        { id: 'l_auto_2', title: 'Integração de WhatsApp com CRM de Clientes', duration: '16 min', type: 'video', completed: false, description: 'Como registrar mensagens de suporte vindas do WhatsApp automaticamente na lista de chamados.' },
        { id: 'l_auto_3', title: 'Modelo Pronto de Fluxograma de Boas-Vindas (.json)', duration: '5 min', type: 'pdf', completed: false, description: 'Arquivo JSON para importação direta no N8N para fluxo automatizado de agendamento de reuniões.' },
        { id: 'l_auto_4', title: 'Quiz: Manipulação de Dados Complexos com JavaScript', duration: '10 min', type: 'quiz', completed: false, description: 'Teste sua proficiência em transformar objetos JSON complexos em estruturas de dados limpas.' }
      ]
    },
    {
      id: 'c_mkt',
      title: 'Copywriting e Estratégias de Marketing Viral',
      category: 'Marketing',
      description: 'Aprenda as fórmulas mentais que prendem a atenção nos primeiros 3 segundos, crie calendários de 30 dias de conteúdo e domine Reels/Stories de alta retenção.',
      difficulty: 'Iniciante',
      instructor: 'Juliana Marketing',
      lessonsCount: 4,
      lessons: [
        { id: 'l_mkt_1', title: 'Fórmulas Clássicas de Copy (AIDA & PAS)', duration: '10 min', type: 'video', completed: true, description: 'Como guiar o leitor desde o problema inicial até a chamada para ação do formulário de agendamento.' },
        { id: 'l_mkt_2', title: 'Estruturação de Roteiros Magnéticos para Vídeos Curtos', duration: '12 min', type: 'video', completed: false, description: 'Como organizar ganchos mentais, transições visuais e quebras de padrão para viralizar reels e TikToks.' },
        { id: 'l_mkt_3', title: 'Calendário Estruturado de 30 Dias para Redes Sociais', duration: '8 min', type: 'pdf', completed: false, description: 'Checklist com ideias de Stories diários, roteiros e chamadas para ações direcionadas para serviços.' },
        { id: 'l_mkt_4', title: 'Quiz: Análise Psicológica de Títulos e Chamadas', duration: '7 min', type: 'quiz', completed: false, description: 'Escolha os gatilhos mentais perfeitos para incentivar cliques e converter tráfego em potenciais clientes.' }
      ]
    }
  ]);

  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];
  const activeLesson = activeCourse.lessons.find(l => l.id === activeLessonId) || activeCourse.lessons[0];

  const handleToggleLessonComplete = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id !== courseId) return course;
      return {
        ...course,
        lessons: course.lessons.map(lesson => {
          if (lesson.id !== lessonId) return lesson;
          return { ...lesson, completed: !lesson.completed };
        })
      };
    }));
  };

  const handleDownloadMaterial = (title: string) => {
    alert(`Fazendo download do material didático: "${title}" (Arquivo PDF simulado com sucesso)`);
  };

  const checkCourseCompletion = (course: Course) => {
    return course.lessons.every(l => l.completed);
  };

  const handleOpenCertificate = (course: Course) => {
    setCertCourseTitle(course.title);
    setIsCertificateModalOpen(true);
  };

  return (
    <div className="space-y-6" id="university-view">
      {/* Top Banner section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/15 border border-indigo-500/30 rounded-full text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
            <GraduationCap size={13} />
            KVB University
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Capacitação Profissional de Elite</h2>
          <p className="text-xs text-slate-300 max-w-xl font-medium">
            Estude as metodologias de desenvolvimento, tráfego, design, vendas e automações utilizadas para gerar faturamentos milionários em agências corporativas de alta performance.
          </p>
        </div>

        {/* User configuration */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-w-[240px] z-10 flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase tracking-wider">Perfil do Estudante</span>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm border border-indigo-400">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                className="bg-transparent border-b border-transparent hover:border-slate-500 focus:border-indigo-400 focus:outline-none text-xs font-bold text-white py-0.5"
                placeholder="Seu nome"
                title="Clique para editar seu nome"
              />
              <p className="text-[10px] text-slate-400">Função: Aluno Executivo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Courses List & Active Lesson Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Courses list */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono mb-3">Seus Cursos Disponíveis</h3>
            <div className="space-y-2.5">
              {courses.map((course) => {
                const isCompleted = checkCourseCompletion(course);
                const isActive = course.id === activeCourseId;
                const completedCount = course.lessons.filter(l => l.completed).length;
                const progressPercent = Math.round((completedCount / course.lessonsCount) * 100);

                return (
                  <div 
                    key={course.id}
                    onClick={() => {
                      setActiveCourseId(course.id);
                      setActiveLessonId(course.lessons[0].id);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50/20 shadow-xs' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        course.category === 'Programação' ? 'bg-indigo-50 text-indigo-700' :
                        course.category === 'Vendas' ? 'bg-emerald-50 text-emerald-700' :
                        course.category === 'Tráfego' ? 'bg-rose-50 text-rose-700' :
                        course.category === 'Automação' ? 'bg-cyan-50 text-cyan-700' :
                        'bg-pink-50 text-pink-700'
                      }`}>
                        {course.category}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 font-bold">{course.difficulty}</span>
                    </div>

                    <h4 className="text-xs font-extrabold text-slate-800 leading-snug line-clamp-1">{course.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium font-sans line-clamp-1">Instrutor: {course.instructor}</p>

                    {/* Progress tracking */}
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400">
                        <span>Progresso: {completedCount}/{course.lessonsCount} aulas</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Certificate Action */}
                    {isCompleted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCertificate(course);
                        }}
                        className="mt-3.5 w-full py-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-all border border-slate-800"
                      >
                        <Award size={12} className="text-amber-400" />
                        Gerar Certificado KVB
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Interactive Lesson Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs">
            {/* Active lesson title & category bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-[9px] font-bold font-mono tracking-widest text-indigo-600 uppercase">Curso Ativo: {activeCourse.title}</span>
                <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  {activeLesson.type === 'video' ? <Video size={15} className="text-slate-500" /> :
                   activeLesson.type === 'pdf' ? <FileText size={15} className="text-slate-500" /> :
                   <Trophy size={15} className="text-slate-500" />}
                  {activeLesson.title}
                </h3>
              </div>
              
              <button
                onClick={() => handleToggleLessonComplete(activeCourse.id, activeLesson.id)}
                className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all border ${
                  activeLesson.completed 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-700 shadow-xs'
                }`}
              >
                <CheckCircle2 size={13} />
                {activeLesson.completed ? 'Concluída' : 'Marcar como Concluída'}
              </button>
            </div>

            {/* Simulated Player Box */}
            <div className="p-5 space-y-4">
              {activeLesson.type === 'video' && (
                <div className="aspect-video w-full bg-slate-950 rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-white border border-slate-800 shadow-inner group">
                  {/* Subtle Grid backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                  
                  {/* Watermark */}
                  <span className="absolute top-4 right-4 text-[9px] font-bold font-mono tracking-widest uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/30 select-none">
                    KVB UNIVERSITY - HD
                  </span>

                  {/* Play Interface overlay */}
                  <div className="z-10 flex flex-col items-center text-center px-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center border border-indigo-400/40 cursor-pointer shadow-lg hover:scale-105 hover:bg-indigo-500 transition-all">
                      <Play size={24} className="fill-white ml-1 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-sans">AULA EM VÍDEO COMPLETA</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">Duração da aula: {activeLesson.duration} • Ministrado por {activeCourse.instructor}</p>
                    </div>
                  </div>

                  {/* Player Controls simulation */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 to-transparent p-3 flex items-center justify-between text-[10px] font-mono text-slate-300">
                    <div className="flex items-center gap-3">
                      <Play size={12} />
                      <span>00:00 / {activeLesson.duration}</span>
                    </div>
                    <div className="w-2/5 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-1/12 h-full bg-indigo-500"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/25 px-1.5 py-0.5 rounded">1080p</span>
                    </div>
                  </div>
                </div>
              )}

              {activeLesson.type === 'pdf' && (
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shrink-0">
                      <FileText size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-slate-800">Apostila em PDF & Roteiros de Ação</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                        Este material contém exemplos práticos de redação comercial, links de referência essenciais, planilhas estruturadas e códigos prontos para copiar e colar diretamente no painel operacional de produção.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-2xs">
                    <h5 className="text-[10px] font-extrabold text-slate-700 uppercase tracking-widest font-mono mb-2">Resumo Operacional</h5>
                    <ul className="space-y-1.5 text-[11px] text-slate-500 list-disc list-inside">
                      <li>Modelos de scripts validados com taxas de conversão de 14%+</li>
                      <li>Checklist para evitar falhas de codificação no deploy</li>
                      <li>Tabela de referências de preços para orçamentos de tráfego</li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleDownloadMaterial(activeLesson.title)}
                    className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Download size={14} />
                    Download Apostila de Apoio (.pdf)
                  </button>
                </div>
              )}

              {activeLesson.type === 'quiz' && (
                <div className="p-6 bg-indigo-50/30 border border-indigo-100/50 rounded-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs">
                      <Trophy size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800">Avaliação do Módulo</h4>
                      <p className="text-[10px] text-slate-400">Verifique seu nível de compreensão técnica</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-100 shadow-2xs">
                    <p className="font-bold">Pergunta Técnica: Qual dessas táticas reduz de forma expressiva o bounce rate em landing pages no celular?</p>
                    <div className="space-y-1.5 mt-3">
                      <label className="flex items-center gap-2 p-2 rounded border border-slate-100 hover:bg-slate-50 cursor-pointer">
                        <input type="radio" name="quiz_opt" value="a" className="text-indigo-600" />
                        <span>A) Adicionar mais scripts de inteligência artificial de animação pesada.</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded border border-indigo-600 bg-indigo-50/20 cursor-pointer">
                        <input type="radio" name="quiz_opt" value="b" defaultChecked className="text-indigo-600" />
                        <span className="font-bold text-indigo-700">B) Otimizar o tempo de primeiro byte (TTFB) comprimindo imagens e postergando scripts não críticos.</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded border border-slate-100 hover:bg-slate-50 cursor-pointer">
                        <input type="radio" name="quiz_opt" value="c" className="text-indigo-600" />
                        <span>C) Inserir múltiplos pop-ups de chamados na página.</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      alert("Excelente! Você respondeu corretamente à pergunta prática de avaliação.");
                      handleToggleLessonComplete(activeCourse.id, activeLesson.id);
                    }}
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                  >
                    <span>Enviar Resposta de Avaliação</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Lesson Description */}
              <div className="border-t border-slate-100 pt-4 space-y-1.5">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">Descrição Detalhada</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{activeLesson.description}</p>
              </div>
            </div>

            {/* List of lessons of active course */}
            <div className="border-t border-slate-100 bg-slate-50/30 p-4">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono mb-2.5">Sumário do Curso ({activeCourse.lessons.length} aulas)</h4>
              <div className="space-y-1.5">
                {activeCourse.lessons.map((lesson) => {
                  const isCurrent = lesson.id === activeLessonId;
                  return (
                    <div 
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isCurrent 
                          ? 'border-indigo-600 bg-indigo-50/20 shadow-2xs font-bold' 
                          : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {lesson.completed ? (
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        ) : (
                          <div className={`w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 ${isCurrent ? 'border-indigo-500 bg-indigo-100' : ''}`}></div>
                        )}
                        <span className="text-[11px] text-slate-700 line-clamp-1">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 font-bold">
                        <span>{lesson.duration}</span>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full border border-slate-100 shadow-2xl relative space-y-6">
            <button 
              onClick={() => setIsCertificateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-full hover:bg-slate-50"
            >
              <ChevronRight size={20} className="rotate-90" />
            </button>

            {/* Official style Certificate Box */}
            <div className="p-8 border-8 border-indigo-950 bg-amber-50/20 rounded-xl relative flex flex-col items-center text-center space-y-6 overflow-hidden">
              {/* Gold badge ornament background overlay */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-900/5 rounded-full border border-indigo-900/10 pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-900/5 rounded-full border border-indigo-900/10 pointer-events-none"></div>
              
              <div className="w-12 h-12 bg-indigo-950 rounded-full flex items-center justify-center text-amber-400 border border-amber-300/40">
                <Trophy size={20} />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-serif font-extrabold text-indigo-950 uppercase tracking-widest">CERTIFICADO DE CAPACITAÇÃO</h2>
                <p className="text-[10px] font-sans font-bold tracking-widest text-indigo-600 uppercase">KVB SYSTEM & AGENCY UNIVERSITY</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-500 font-serif italic">Concedemos solenemente este certificado profissional a:</p>
                <h3 className="text-lg font-bold text-slate-800 underline decoration-indigo-500 decoration-2 underline-offset-4">{userName}</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Por ter concluído com excelência e máximo aproveitamento todos os módulos teóricos, apostilas de apoio e avaliações práticas do curso corporativo:
                </p>
                <h4 className="text-xs font-bold text-indigo-900 font-mono tracking-wide">{certCourseTitle}</h4>
              </div>

              {/* Digital signature lines */}
              <div className="grid grid-cols-2 gap-8 pt-6 w-full max-w-md text-[9px] font-mono text-slate-400 border-t border-slate-200">
                <div>
                  <div className="font-serif italic text-slate-600 text-xs mb-1">Erick Dev Sênior</div>
                  <div className="border-t border-slate-300 pt-1 font-bold">DIRETOR DE TECNOLOGIA</div>
                </div>
                <div>
                  <div className="font-serif italic text-slate-600 text-xs mb-1">Carlos Comercial</div>
                  <div className="border-t border-slate-300 pt-1 font-bold">CHIEF EXECUTIVE OFFICER (CEO)</div>
                </div>
              </div>

              <p className="text-[8px] text-slate-300 font-mono pt-2">Código de Autenticidade Única: KVB-CERT-{Math.floor(Math.random() * 89999 + 10000)}</p>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => setIsCertificateModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold cursor-pointer"
              >
                Fechar janela
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
              >
                <Award size={13} />
                Imprimir Certificado (.pdf)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
