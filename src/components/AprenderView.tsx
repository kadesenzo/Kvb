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
  GraduationCap,
  Search,
  Code,
  Cpu,
  Layers,
  Settings,
  HelpCircle,
  Send,
  Terminal,
  ExternalLink,
  FileCode,
  Copy,
  Plus,
  Check,
  Sparkles,
  Share2,
  Printer,
  Clock,
  Layout,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

const PdfIcon = FileText;

// Interfaces for Learn Modules
interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface LearnTopic {
  id: string;
  name: string;
  description: string;
  explanation: string;
  videoUrl: string;
  exercises: string[];
  examples: { title: string; code: string; language: string }[];
  realProjects: { title: string; desc: string; steps: string[] }[];
  quiz: QuizQuestion;
  diagram?: { title: string; nodes: string[]; connections: string[] };
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  topics: LearnTopic[];
}

export default function AprenderView() {
  const [activeCategory, setActiveCategory] = useState<string>('prog');
  const [activeTopicId, setActiveTopicId] = useState<string>('html');
  const [searchQuery, setSearchQuery] = useState('');
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<{ [key: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // MODO TUTOR STATES
  const [tutorMessages, setTutorMessages] = useState([
    { sender: 'tutor', text: 'Olá! Eu sou o seu Tutor Particular de Elite. Qual conceito, automação ou código você quer dominar hoje? Me mande uma dúvida ou peça um desafio!' }
  ]);
  const [tutorInput, setTutorInput] = useState('');
  const [isTutorTyping, setIsTutorTyping] = useState(false);

  // MODO EXECUTAR OU ENSINAR STATES
  const [taskInput, setTaskInput] = useState('Criar um fluxo de agendamento automático de leads pelo WhatsApp');
  const [selectedModes, setSelectedModes] = useState({
    auto: true,
    stepByStep: false,
    openTools: false,
    generateDoc: false,
    generateVideo: false,
    createPdf: false,
  });
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // BASE DE CONHECIMENTO (WIKI) STATE
  const [wikiSearch, setWikiSearch] = useState('');

  // MODO "COMO FOI FEITO" STATE
  const [selectedProjectHow, setSelectedProjectHow] = useState('imobiliaria');

  // Categories & Topics static data
  const categories: Category[] = [
    {
      id: 'prog',
      title: 'Programação de Elite',
      icon: <Code size={16} />,
      topics: [
        {
          id: 'html',
          name: 'HTML5 Moderno',
          description: 'A fundação da web: tags semânticas, acessibilidade e SEO.',
          explanation: 'HTML5 (HyperText Markup Language) é a linguagem de marcação padrão para criar páginas web. Hoje em dia, foca-se muito em semântica (<main>, <article>, <section>) para garantir que mecanismos de busca (SEO) e leitores de tela entendam a página com perfeição.',
          videoUrl: 'https://www.youtube.com/embed/simulated-html',
          exercises: [
            'Crie uma estrutura de Landing Page usando tags semânticas (<header>, <main>, <section>, <footer>).',
            'Adicione atributos alt em todas as imagens e use labels corretas em um formulário de contato.'
          ],
          examples: [
            {
              title: 'Estrutura Semântica Base',
              code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Landing Page KVB</title>
</head>
<body>
  <header>
    <h1>KVB System</h1>
    <nav>
      <a href="#funcionalidades">Recursos</a>
    </nav>
  </header>
  <main>
    <section id="hero">
      <h2>Transforme sua agência com IA</h2>
      <button>Começar Agora</button>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 KVB System. Todos os direitos reservados.</p>
  </footer>
</body>
</html>`,
              language: 'html'
            }
          ],
          realProjects: [
            {
              title: 'Capturador de Leads Semântico',
              desc: 'Formulário altamente focado em conversão e otimizado para celulares.',
              steps: ['Crie o layout com Tailwind', 'Defina os inputs corretos (email, tel)', 'Configure tags meta de OpenGraph para compartilhamento social']
            }
          ],
          quiz: {
            question: 'Qual tag HTML representa a navegação principal de um site de forma semântica?',
            options: ['<navigation>', '<navbar>', '<nav>', '<ul>'],
            correctIndex: 2
          }
        },
        {
          id: 'css',
          name: 'CSS3 & Tailwind CSS',
          description: 'Estilização moderna: Grid, Flexbox, variáveis nativas e utility classes.',
          explanation: 'Tailwind CSS revolucionou o design ao permitir estilização direta nas tags com classes utilitárias. Isso evita arquivos CSS gigantes e melhora drasticamente a consistência do design (espaçamentos, fontes e cores).',
          videoUrl: 'https://www.youtube.com/embed/simulated-css',
          exercises: [
            'Crie um card com efeito hover de zoom e sombra suave usando Tailwind.',
            'Desenvolva um grid responsivo que exibe 1 coluna em mobile e 3 em desktop.'
          ],
          examples: [
            {
              title: 'Bento Grid Responsivo com Tailwind',
              code: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
  <div class="md:col-span-2 bg-indigo-600 text-white p-6 rounded-2xl shadow-md transition-all hover:scale-[1.01]">
    <h2 class="text-xl font-bold">Destaque Principal</h2>
    <p class="text-xs text-indigo-100 mt-2">Maior área para conteúdos de alta relevância.</p>
  </div>
  <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <h3 class="text-sm font-bold text-slate-800">Métrica</h3>
    <p class="text-2xl font-black text-indigo-600 mt-2">99.4%</p>
  </div>
</div>`,
              language: 'html'
            }
          ],
          realProjects: [
            {
              title: 'Dashboard Corporativo Premium',
              desc: 'Recriação do painel KVB usando spacing assimétrico, cores foscas e fontes modernas.',
              steps: ['Instale o Tailwind CSS no projeto Vite', 'Configure o tema no index.css com @import "tailwindcss"', 'Defina as cores customizadas e transições suaves']
            }
          ],
          quiz: {
            question: 'Qual classe Tailwind deve ser usada para aplicar um layout Flexbox com itens alinhados ao centro?',
            options: ['flex items-center', 'display-flex align-center', 'flex justify-center', 'flex flex-row'],
            correctIndex: 0
          }
        },
        {
          id: 'js',
          name: 'JavaScript Moderno (ES6+)',
          description: 'Funções assíncronas, desestruturação, métodos de array e manipulação de DOM.',
          explanation: 'O JavaScript moderno (ES6+) foca em legibilidade e performance. Recursos como Arrow Functions, Promises, async/await e desestruturação de objetos tornam os sistemas muito mais leves e fáceis de dar manutenção.',
          videoUrl: 'https://www.youtube.com/embed/simulated-js',
          exercises: [
            'Crie uma chamada assíncrona usando fetch() e trate os erros com try/catch.',
            'Utilize o método .filter() e .map() para extrair nomes de leads ativos de uma lista.'
          ],
          examples: [
            {
              title: 'Consumo de API com Tratamento de Erros',
              code: `const fetchLeads = async (apiEndpoint) => {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error(\`Erro HTTP: status \${response.status}\`);
    }
    const data = await response.json();
    // Filtra apenas leads qualificados e mapeia seus nomes
    return data
      .filter(lead => lead.qualified === true)
      .map(lead => lead.name.toUpperCase());
  } catch (error) {
    console.error('Falha ao buscar dados:', error.message);
    return [];
  }
};`,
              language: 'javascript'
            }
          ],
          realProjects: [
            {
              title: 'Calculadora de Métricas LTV/CAC',
              desc: 'Widget dinâmico que recebe inputs financeiros e retorna métricas em tempo real.',
              steps: ['Capture os inputs de marketing e custos', 'Calcule as fórmulas de LTV e Churn rate', 'Atualize o DOM de forma reativa']
            }
          ],
          quiz: {
            question: 'Qual método de array retorna um novo array contendo apenas os elementos que atendem a uma condição?',
            options: ['.map()', '.find()', '.filter()', '.reduce()'],
            correctIndex: 2
          }
        },
        {
          id: 'ts',
          name: 'TypeScript Avançado',
          description: 'Tipagem estática, interfaces, generics e enums robustos.',
          explanation: 'TypeScript é uma camada em cima do JavaScript que adiciona tipos. Isso previne bugs comuns em produção (como acessar uma propriedade em algo que está undefined) e melhora absurdamente o autocompletar do editor de código.',
          videoUrl: 'https://www.youtube.com/embed/simulated-ts',
          exercises: [
            'Defina uma interface para um Lead com campos opcionais e obrigatórios.',
            'Crie uma função genérica para buscar dados de qualquer endpoint e retornar o tipo correto.'
          ],
          examples: [
            {
              title: 'Interface e Generics na Prática',
              code: `interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string; // Campo opcional
  status: 'active' | 'inactive';
}

// Função genérica de carregamento de API
async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network error');
  return response.json() as Promise<T>;
}

// Uso prático
const clientList = await apiGet<Client[]>('/api/clients');`,
              language: 'typescript'
            }
          ],
          realProjects: [
            {
              title: 'Gerenciador de Estado Tipado',
              desc: 'Criação de um mini store de estado em TypeScript para simular fluxos de leads.',
              steps: ['Crie o arquivo types.ts', 'Adicione enums de status do funil', 'Defina funções que recebem apenas parâmetros válidos']
            }
          ],
          quiz: {
            question: 'Como definir um tipo que aceita apenas dois valores específicos: "pendente" ou "concluido"?',
            options: ['type Status = "pendente" & "concluido"', 'type Status = "pendente" | "concluido"', 'interface Status { "pendente", "concluido" }', 'enum Status { pendente, concluido }'],
            correctIndex: 1
          }
        },
        {
          id: 'python',
          name: 'Python para Automação',
          description: 'Scripting, manipulação de arquivos, APIs com FastAPI e bots.',
          explanation: 'Python é a linguagem número um para ciência de dados e automação rápida de scripts. Seu ecossistema possui bibliotecas para ler planilhas, mandar mensagens em massa e integrar modelos de Inteligência Artificial facilmente.',
          videoUrl: 'https://www.youtube.com/embed/simulated-py',
          exercises: [
            'Crie um script que lê um arquivo JSON e salva as informações formatadas em uma lista.',
            'Desenvolva uma rota simples usando o framework FastAPI para receber leads via webhook.'
          ],
          examples: [
            {
              title: 'FastAPI Webhook Handler',
              code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class LeadData(BaseModel):
    name: str
    email: str
    phone: str

@app.post("/webhook/lead")
def receive_lead(lead: LeadData):
    if not lead.email:
        raise HTTPException(status_code=400, detail="E-mail é obrigatório")
    
    # Processamento simulado: Salvar no banco de dados
    print(f"Novo Lead Recebido: {lead.name} ({lead.email})")
    return {"status": "success", "message": f"Lead {lead.name} salvo com sucesso"}`,
              language: 'python'
            }
          ],
          realProjects: [
            {
              title: 'Robô de Triagem de Planilhas',
              desc: 'Script que pega uma lista de leads desorganizados em Excel, valida os e-mails e separa os telefones corretos.',
              steps: ['Use a biblioteca pandas', 'Trate strings e remova caracteres especiais de telefones', 'Gere um arquivo CSV limpo para importação no CRM']
            }
          ],
          quiz: {
            question: 'Qual biblioteca Python é amplamente utilizada para manipulação rápida de planilhas e análise de dados?',
            options: ['requests', 'pandas', 'fastapi', 'json'],
            correctIndex: 1
          }
        },
        {
          id: 'react',
          name: 'React.js (Hooks & Estado)',
          description: 'Componentes reativos, hooks como useState, useEffect e manipulação de estados.',
          explanation: 'React.js permite criar componentes de interface isolados e reutilizáveis. O controle de estado faz com que o site mude de forma instantânea sem precisar recarregar a página, entregando uma experiência premium.',
          videoUrl: 'https://www.youtube.com/embed/simulated-react',
          exercises: [
            'Escreva um hook customizado useLocalStorage para manter dados salvos no navegador.',
            'Corrija um useEffect com loop infinito adicionando a array de dependências correta.'
          ],
          examples: [
            {
              title: 'Componente com Contador e Persistência',
              code: `import React, { useState, useEffect } from 'react';

export default function LeadCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('kvb_lead_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('kvb_lead_count', count.toString());
  }, [count]);

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-xs text-center">
      <h3 className="text-xs font-bold text-slate-500">LEADS PROCESSADOS</h3>
      <p className="text-3xl font-black text-indigo-600 mt-1">{count}</p>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
      >
        Registrar Lead +1
      </button>
    </div>
  );
}`,
              language: 'javascript'
            }
          ],
          realProjects: [
            {
              title: 'Sistema de Kanban de Produção',
              desc: 'Fila de arrastar e soltar (drag & drop) reativa de tarefas para agências.',
              steps: ['Defina colunas (A Fazer, Fazendo, Concluído)', 'Gerencie o array de tarefas no estado global', 'Implemente eventos onClick para transição de estágios']
            }
          ],
          quiz: {
            question: 'Qual regra é fundamental ao declarar hooks no React para evitar comportamentos inesperados?',
            options: ['Devem ser declarados dentro de condicionais', 'Devem ser declarados sempre no topo do componente, fora de laços ou condições', 'Devem ser declarados em arquivos .css', 'Devem ser executados de forma assíncrona com await'],
            correctIndex: 1
          }
        }
      ]
    },
    {
      id: 'auto',
      title: 'Automações Sem Código',
      icon: <Cpu size={16} />,
      topics: [
        {
          id: 'n8n',
          name: 'N8N (Workflows)',
          description: 'Criação de fluxos complexos, triggers HTTP, webhooks e manipulação de JSON.',
          explanation: 'N8N é uma ferramenta de automação open-source ultra poderosa. Ao contrário do Zapier, ela permite lógica complexa de ramificações, loops e manipulação direta de código JavaScript em nós específicos, custando uma fração do preço.',
          videoUrl: 'https://www.youtube.com/embed/simulated-n8n',
          exercises: [
            'Crie um nó Webhook de entrada que captura dados de formulário.',
            'Adicione um nó de condição "IF" que separa leads com base no faturamento informado.'
          ],
          examples: [
            {
              title: 'Código JSON do Workflow Base N8N',
              code: `{
  "nodes": [
    {
      "parameters": {
        "path": "lead-webhook",
        "options": {}
      },
      "name": "Webhook Entrada",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{$node[\\"Webhook Entrada\\"].json[\\"body\\"][\\"revenue\\"]}}",
              "operation": "larger",
              "value2": 5000
            }
          ]
        }
      },
      "name": "Filtro High-Ticket",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [450, 300]
    }
  ]
}`,
              language: 'json'
            }
          ],
          realProjects: [
            {
              title: 'Funil Automatizado Whatsapp',
              desc: 'Automação que envia mensagem imediata ao receber lead do formulário e cria um card no CRM.',
              steps: ['Webhook captura lead', 'Módulo de WhatsApp (Evolution API ou similar) envia mensagem', 'Node HTTP adiciona lead na planilha de vendas']
            }
          ],
          diagram: {
            title: 'Fluxo de Aquisição Automatizada',
            nodes: ['Webhook de Lead', 'IF (Faturamento > 5k)', 'WhatsApp Direção', 'WhatsApp Comercial'],
            connections: [
              'Webhook -> IF',
              'IF (Verdadeiro) -> WhatsApp Direção (VIP)',
              'IF (Falso) -> WhatsApp Comercial (Padrão)'
            ]
          },
          quiz: {
            question: 'Como acessar dinamicamente uma propriedade chamada "nome" enviada no Webhook anterior no N8N?',
            options: ['{{ $node["Webhook"].json["body"]["nome"] }}', 'fetch("nome")', 'document.getElementById("nome")', '{{ input.nome }}'],
            correctIndex: 0
          }
        },
        {
          id: 'make',
          name: 'Make (Integromat)',
          description: 'Integrações robustas baseadas em cenários, roteadores e filtros visuais.',
          explanation: 'Make (antigo Integromat) é a plataforma visual mais rica do mercado. Seus cenários em forma de bolhas facilitam o entendimento de fluxos de dados, sendo ideal para integrar CRM, Google Sheets e ferramentas de e-mail marketing sem escrever uma linha de código.',
          videoUrl: 'https://www.youtube.com/embed/simulated-make',
          exercises: [
            'Configure um roteador para enviar dados para duas planilhas diferentes.',
            'Use a função formatDate para converter uma data americana para o formato brasileiro (DD/MM/AAAA).'
          ],
          examples: [
            {
              title: 'Fórmula de Formatação de Data no Make',
              code: `{{formatDate(1.createdAt; "DD/MM/YYYY HH:mm"; "America/Sao_Paulo")}}`,
              language: 'text'
            }
          ],
          realProjects: [
            {
              title: 'Sincronizador Google Calendar',
              desc: 'Integração que cria salas de Meet no Google Agenda ao fechar uma reunião no CRM.',
              steps: ['Crie o trigger de Reunião Agendada', 'Adicione o módulo do Google Calendar', 'Envie o link do Meet de volta para o cliente']
            }
          ],
          quiz: {
            question: 'Qual recurso do Make é usado para dividir o caminho dos dados em múltiplos fluxos independentes baseado em regras?',
            options: ['Filtro', 'Roteador (Router)', 'Iterador', 'Agregador'],
            correctIndex: 1
          }
        }
      ]
    },
    {
      id: 'mkt',
      title: 'Marketing & Tráfego Ads',
      icon: <Layers size={16} />,
      topics: [
        {
          id: 'traffic-ads',
          name: 'Meta Ads & Google Ads',
          description: 'Configuração de Business Manager, Pixel, API de Conversão e campanhas de conversão.',
          explanation: 'Tráfego pago consiste em comprar atenção na internet de forma segmentada. No Meta Ads (Facebook/Instagram), focamos em públicos de interesse e visual (criativo). No Google Ads, focamos em intenção de pesquisa direta.',
          videoUrl: 'https://www.youtube.com/embed/simulated-ads',
          exercises: [
            'Crie um roteiro de criativo A/B focado nas dores de um empresário que fatura 50k/mês.',
            'Defina a hierarquia de uma campanha: Campanha (Orçamento) -> Conjunto de Anúncios (Público) -> Anúncio (Criativo).'
          ],
          examples: [
            {
              title: 'Cópia de Alta Conversão para Meta Ads',
              code: `[Gancho / Atenção]: Empresário, sua agência vive num "efeito sanfona" de faturamento?
[Problema]: Meses bons de fechar contratos, meses ruins de entregar tudo e ver os clientes irem embora por falta de equipe técnica especializada...
[Solução]: A KVB System resolve isso. Nós assumimos toda a produção de sites, tráfego e automações dos seus clientes de forma invisível. Você só vende e colhe o lucro.
[CTA]: Toque em "Saiba Mais" e faça as contas de quanto você vai economizar hoje.`,
              language: 'text'
            }
          ],
          realProjects: [
            {
              title: 'Campanha de Captação de Clientes',
              desc: 'Estrutura completa de campanha de Conversão focando em donos de clínicas estéticas de alto padrão.',
              steps: ['Configure público de Interesses em marcas de luxo', 'Use criativo em vídeo explicando a solução', 'Aponte para WhatsApp qualificado por chatbot']
            }
          ],
          quiz: {
            question: 'Qual métrica representa o custo médio para trazer um cliente que de fato realizou a compra ou agendamento?',
            options: ['CTR', 'CPC', 'CPM', 'CPA / CAC'],
            correctIndex: 3
          }
        }
      ]
    },
    {
      id: 'site-dev',
      title: 'Desenvolvimento de Sites',
      icon: <Layout size={16} />,
      topics: [
        {
          id: 'landing-pages',
          name: 'Landing Pages de Alta Conversão',
          description: 'Copywriting para conversão, velocidade de carregamento (SEO) e design responsivo.',
          explanation: 'Uma Landing Page (página de destino) tem um único objetivo: fazer o usuário realizar uma ação (seja um cadastro ou uma compra). Elas devem carregar em menos de 2 segundos e focar 100% na dor do cliente, sem distrações de links externos.',
          videoUrl: 'https://www.youtube.com/embed/simulated-lp',
          exercises: [
            'Desenvolva a seção "Hero" ideal de uma Landing Page de consultoria de vendas.',
            'Otimize o tamanho das imagens para web usando extensões modernas como WebP.'
          ],
          examples: [
            {
              title: 'Estrutura de Seção Hero Moderna (Tailwind)',
              code: `<section class="relative bg-slate-950 text-white py-24 px-6 overflow-hidden">
  <div class="max-w-4xl mx-auto text-center space-y-6">
    <span class="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
      Novo Sistema Reativo
    </span>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight">
      Sistemas sob Medida para <span class="text-indigo-500">Escalar Operações</span>
    </h1>
    <p class="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
      Criamos soluções de código fechado que automatizam suas vendas e reduzem seu custo de operação em até 40% já no primeiro mês.
    </p>
    <div>
      <button class="bg-indigo-600 hover:bg-indigo-500 py-3 px-8 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30">
        Quero Escalar Minha Empresa
      </button>
    </div>
  </div>
</section>`,
              language: 'html'
            }
          ],
          realProjects: [
            {
              title: 'E-commerce Super Performático',
              desc: 'Arquitetura de catálogo que atualiza os carrinhos instantaneamente usando cache local do navegador.',
              steps: ['Esboce a arquitetura da LP no Figma', 'Implemente no React', 'Verifique a pontuação do Google Lighthouse']
            }
          ],
          quiz: {
            question: 'Qual é o formato de imagem recomendado para web atualmente por carregar muito mais rápido sem perder qualidade?',
            options: ['PNG', 'BMP', 'WebP', 'GIF'],
            correctIndex: 2
          }
        }
      ]
    },
    {
      id: 'ai-tech',
      title: 'Inteligência Artificial',
      icon: <Sparkles size={16} />,
      topics: [
        {
          id: 'gemini-sdk',
          name: 'Gemini & OpenAI API',
          description: 'Integração de APIs de LLM, engenharia de prompt avançada e IA generativa.',
          explanation: 'Modelos de Linguagem de Grande Porte (LLMs) são acessados por meio de APIs oficiais (como a da Google ou OpenAI). Através de RAG (Geração Aumentada por Recuperação) e Engenharia de Prompt, conseguimos fazer a IA responder utilizando dados privados da nossa empresa com segurança.',
          videoUrl: 'https://www.youtube.com/embed/simulated-ai',
          exercises: [
            'Configure uma chamada de chat contínuo com histórico usando a API do Gemini.',
            'Crie um prompt de sistema para que a IA atue estritamente como um auditor de segurança de código.'
          ],
          examples: [
            {
              title: 'Chamada de API do Gemini Server-Side',
              code: `import { GoogleGenAI } from "@google/genai";

// Inicializa a IA usando a chave segura do servidor
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function gerarBriefing(niche: string, clientName: string) {
  const prompt = \`Aja como o Diretor de Criação da KVB. Gere um roteiro comercial detalhado e ideia de site para o cliente \${clientName} no nicho de \${niche}.\`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text;
}`,
              language: 'typescript'
            }
          ],
          realProjects: [
            {
              title: 'Agente de WhatsApp com IA',
              desc: 'Integração que recebe mensagens de leads, processa via Gemini usando uma base de conhecimento em PDF e responde de forma humana.',
              steps: ['Configure o recebimento de mensagem pelo Webhook', 'Gere o prompt enriquecido com dados do lead', 'Dispense respostas mecânicas mantendo tom de vendas']
            }
          ],
          quiz: {
            question: 'O que significa a sigla RAG em Inteligência Artificial?',
            options: ['Rapid Action Generation', 'Retrieval-Augmented Generation', 'Recurrent Agent Grid', 'Redundant Array Generation'],
            correctIndex: 1
          }
        }
      ]
    }
  ];

  // Find active topic
  const activeCategoryData = categories.find(c => c.id === activeCategory) || categories[0];
  const activeTopic = activeCategoryData.topics.find(t => t.id === activeTopicId) || activeCategoryData.topics[0];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectAnswer = (topicId: string, index: number) => {
    setUserAnswers(prev => ({ ...prev, [topicId]: index }));
  };

  const handleSubmitQuiz = (topicId: string) => {
    setQuizSubmitted(prev => ({ ...prev, [topicId]: true }));
  };

  // MODO TUTOR INTERACTION
  const handleSendToTutor = () => {
    if (!tutorInput.trim()) return;
    
    const userMsg = { sender: 'user', text: tutorInput };
    setTutorMessages(prev => [...prev, userMsg]);
    setTutorInput('');
    setIsTutorTyping(true);

    // Simulate Tutor response
    setTimeout(() => {
      let responseText = '';
      const inputLower = userMsg.text.toLowerCase();

      if (inputLower.includes('erro') || inputLower.includes('bug')) {
        responseText = 'Analisando seu código... A maioria dos erros no KVB ocorre devido a imports errados ou falta de tratamento de nulos. Verifique se o objeto que você está renderizando realmente existe antes de tentar acessar suas propriedades (ex: lead?.name ou userAnswers[id]). Quer me passar a linha exata do erro?';
      } else if (inputLower.includes('html') || inputLower.includes('site')) {
        responseText = 'Excelente! Para criar sites de alta conversão, sempre foque na seção Hero. Ela deve conter um título matador (gancho), um parágrafo que descreve a solução em 1 frase e um botão de CTA que chama atenção. Posso te dar um exemplo de código de uma seção hero moderna?';
      } else if (inputLower.includes('automa') || inputLower.includes('n8n') || inputLower.includes('make')) {
        responseText = 'Excelente escolha! Automação é o coração da eficiência. Se você estiver usando o N8N, lembre-se que cada nó gera um JSON de resposta. Use a sintaxe {{ $json.chave }} para acessar os valores no nó seguinte de forma reativa. Deseja um desafio prático de automação para testar sua lógica?';
      } else if (inputLower.includes('desafio') || inputLower.includes('projeto') || inputLower.includes('exercicio')) {
        responseText = 'DESAFIO DE ELITE ACEITO: "Crie uma rota API em Node.js com Express que recebe um lead, valida se ele tem telefone e e-mail preenchidos, e se tiver, responde com status 201 e retorna um JSON com a mensagem de boas-vindas customizada". Escreva o código aqui e eu vou corrigi-lo para você!';
      } else {
        responseText = `Entendido! Explicando de forma direta: no ecossistema KVB System, nós unimos tecnologia de ponta com simplicidade operacional. Para dominar o que você acabou de perguntar ("${userMsg.text}"), eu recomendo seguir o passo a passo com exemplos de código que temos na Wiki e treinar a lógica. Qual o seu próximo passo?`;
      }

      setTutorMessages(prev => [...prev, { sender: 'tutor', text: responseText }]);
      setIsTutorTyping(false);
    }, 1500);
  };

  // MODO EXECUTAR OU ENSINAR ENGINE
  const handleExecuteTask = () => {
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      let steps: string[] = [];
      let codeOutput = '';
      let docContent = '';
      let tools: { name: string; url: string }[] = [];

      // Logic based on input keywords
      if (taskInput.toLowerCase().includes('whatsapp') || taskInput.toLowerCase().includes('automa')) {
        steps = [
          'Passo 1: Acesse sua conta oficial na Evolution API ou WhatsApp Business.',
          'Passo 2: Crie uma nova instância de conexão e leia o QR Code com o celular do comercial.',
          'Passo 3: Abra o N8N, crie um "New Workflow" e adicione um nó de Webhook de Entrada.',
          'Passo 4: Conecte o Webhook à ferramenta de formulário (ex: Typeform ou CRM KVB).',
          'Passo 5: Adicione um nó de "HTTP Request" no N8N configurado como POST apontando para a Evolution API.',
          'Passo 6: No corpo da requisição, envie o texto estruturado com gatilhos de copy para o número capturado.',
          'Passo 7: Teste enviando um lead fictício e valide se a mensagem chegou no celular de teste.'
        ];
        codeOutput = `{
  "action": "send_whatsapp_message",
  "instance": "KVB_Comercial_01",
  "payload": {
    "number": "{{ $json.body.phone }}",
    "message": "Olá {{ $json.body.name }}! Aqui é o Erick da KVB. Vi que você se cadastrou solicitando uma proposta. Vamos conversar?"
  }
}`;
        docContent = `# Documentação Oficial: Automação WhatsApp KVB
Este fluxo visa reduzir o tempo de primeiro contato (lead response time) para menos de 60 segundos.

## Requisitos de Infraestrutura
- Instância ativa na Evolution API ou Zapier.
- N8N ou Make para orquestração de dados.
- Chave de API configurada no arquivo de ambiente \`.env\`.`;
        tools = [
          { name: 'Abrir N8N', url: 'https://n8n.io' },
          { name: 'Abrir Make', url: 'https://make.com' },
          { name: 'Abrir Zapier', url: 'https://zapier.com' }
        ];
      } else if (taskInput.toLowerCase().includes('site') || taskInput.toLowerCase().includes('landing') || taskInput.toLowerCase().includes('html')) {
        steps = [
          'Passo 1: Crie o diretório do projeto e inicialize com Vite + React + Tailwind.',
          'Passo 2: Defina a paleta de cores foscas premium (ex: slate-950, indigo-600, amber-400).',
          'Passo 3: Escreva o componente principal App.tsx contendo uma Hero Section, Seção de Recursos, Depoimentos e Formulário.',
          'Passo 4: Crie o repositório no GitHub.',
          'Passo 5: Conecte o repositório na Vercel ou Netlify.',
          'Passo 6: Ative o deploy automático da branch main.',
          'Passo 7: Configure os registros DNS do domínio no painel de hospedagem.'
        ];
        codeOutput = `// App.tsx - Landing Page Reativa Completa
import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <header className="p-6 border-b border-slate-900 flex justify-between items-center">
        <span className="font-bold text-lg text-indigo-500">KVB Studio</span>
        <button className="bg-indigo-600 px-4 py-2 rounded-lg text-xs font-bold">Contato</button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-12 max-w-2xl mx-auto space-y-6">
        <h1 className="text-5xl font-black tracking-tight leading-none">Acelere a Entrega de Projetos Digitais</h1>
        <p className="text-slate-400 text-sm">Criamos plataformas robustas com foco estrito em conversão e velocidade extrema.</p>
        <button className="bg-white text-slate-950 font-bold py-3 px-8 rounded-xl text-sm">Contratar Agora</button>
      </main>
    </div>
  );
}`;
        docContent = `# Especificação Técnica do Website Reativo
Desenvolvido em React + Vite. Altamente otimizado para celulares e com taxa de rejeição abaixo de 20%.

## Principais Recursos
- Compressão dinâmica de assets.
- Integração nativa com API de leads.
- Carregamento de fontes assíncrono para melhorar o TTFB.`;
        tools = [
          { name: 'Abrir Vercel', url: 'https://vercel.com' },
          { name: 'Abrir Supabase', url: 'https://supabase.com' }
        ];
      } else {
        steps = [
          'Passo 1: Planejar os requisitos e desenhar o fluxo de dados.',
          'Passo 2: Configurar o ambiente com as dependências necessárias.',
          'Passo 3: Codificar a lógica principal utilizando TypeScript/Python.',
          'Passo 4: Integrar com as APIs externas requeridas.',
          'Passo 5: Testar em ambiente de desenvolvimento local.',
          'Passo 6: Documentar o código para fácil manutenção.',
          'Passo 7: Realizar o deploy do script em produção.'
        ];
        codeOutput = `// Código Gerado Automaticamente por IA
const processTask = async (data) => {
  console.log("Executando tarefa:", data);
  return { status: "success", timestamp: Date.now() };
};`;
        docContent = `# Documentação de Integração de Sistemas
Estrutura geral de fluxo criada para otimizar processos comerciais e técnicos.`;
        tools = [
          { name: 'Abrir Google AI Studio', url: 'https://aistudio.google.com' },
          { name: 'Abrir OpenAI', url: 'https://platform.openai.com' }
        ];
      }

      setExecutionResult({
        steps,
        code: codeOutput,
        doc: docContent,
        tools
      });
      setIsExecuting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6" id="aprender-view">
      
      {/* 1. TOP BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/15 border border-indigo-500/30 rounded-full text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
            <GraduationCap size={13} />
            Central de Aprendizado & Automação KVB
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight">KVB Aprendizado de Elite</h2>
          <p className="text-xs text-slate-300 max-w-xl font-medium">
            O ecossistema que não apenas gera ideias. Ele **faz** automaticamente, **ensina** passo a passo, **fornece ferramentas** oficiais e gera documentações completas para sua operação comercial e técnica.
          </p>
        </div>

        {/* Global Stats */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-w-[220px] z-10">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-[10px] font-mono text-indigo-300 block font-bold uppercase">Módulos</span>
              <span className="text-lg font-black block mt-0.5 text-white">5 Grandes Áreas</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-300 block font-bold uppercase">Wiki KVB</span>
              <span className="text-lg font-black block mt-0.5 text-white">50+ Tutoriais</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Learn Modules and Quiz */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* CATEGORIES BUTTONS SELECTOR */}
          <div className="bg-white border border-slate-100 p-2.5 rounded-xl shadow-xs flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveTopicId(cat.topics[0].id);
                }}
                className={`flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {cat.icon}
                {cat.title}
              </button>
            ))}
          </div>

          {/* TOPICS ACCORDION/LIST AND ACTIVE CONTENT DISPLAY */}
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs">
            
            {/* Header Area */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-indigo-600" />
                <span className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase">Módulo: {activeCategoryData.title}</span>
              </div>
              <div className="flex gap-1.5">
                {activeCategoryData.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeTopicId === topic.id 
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                        : 'bg-white hover:bg-slate-100 text-slate-500 border border-slate-100'
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Topic Content */}
            <div className="p-5 space-y-6">
              
              {/* Description & Explanation */}
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 tracking-tight">{activeTopic.name}</h3>
                <p className="text-xs text-slate-400 font-medium font-mono leading-relaxed">{activeTopic.description}</p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed font-sans">
                  <p className="font-bold text-slate-700 mb-1">O que é e Por que importa:</p>
                  {activeTopic.explanation}
                </div>
              </div>

              {/* SIMULATED VIDEO INSTRUCTION */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono flex items-center gap-1.5">
                  <Video size={12} className="text-indigo-500" />
                  Vídeo-Aula Recomendada
                </span>
                <div className="aspect-video w-full bg-slate-950 rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-white border border-slate-800 shadow-inner group">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                  <div className="absolute top-4 right-4 text-[9px] font-bold font-mono tracking-widest uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/30">
                    KVB UNIVERSITY - MASTERCLASS
                  </div>
                  <div className="z-10 flex flex-col items-center text-center px-6 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center border border-indigo-400/40 cursor-pointer shadow-lg hover:scale-105 hover:bg-indigo-500 transition-all">
                      <Play size={20} className="fill-white ml-0.5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-sans">REPLAY DE MINI-AULA: {activeTopic.name.toUpperCase()}</p>
                      <p className="text-[9px] text-slate-400 font-mono">Práticas reais, otimizações e scripts prontos para rodar.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CODE EXAMPLE EXCLUSIVE PREVIEW */}
              {activeTopic.examples && activeTopic.examples.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono flex items-center gap-1.5">
                    <FileCode size={12} className="text-indigo-500" />
                    Exemplo de Código Real e Pronto
                  </span>
                  {activeTopic.examples.map((ex, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                      <div className="bg-slate-900 px-4 py-2 flex justify-between items-center text-xs font-mono text-slate-300">
                        <span className="font-bold">{ex.title}</span>
                        <button 
                          onClick={() => handleCopyCode(ex.code, `code-${activeTopic.id}-${idx}`)}
                          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Copy size={11} />
                          {copiedId === `code-${activeTopic.id}-${idx}` ? 'Copiado!' : 'Copiar Código'}
                        </button>
                      </div>
                      <pre className="p-4 bg-slate-950 overflow-x-auto text-[11px] font-mono text-emerald-400 leading-relaxed max-h-[220px]">
                        <code>{ex.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {/* FLOWCHART / DIAGRAM EXPLAINER FOR AUTOMATIONS */}
              {activeTopic.diagram && (
                <div className="space-y-2 bg-indigo-50/15 border border-indigo-100/50 p-4 rounded-xl">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase font-mono flex items-center gap-1.5">
                    <Layers size={12} className="text-indigo-600" />
                    Diagrama de Fluxo Visual
                  </span>
                  <p className="text-xs text-slate-700 font-bold">{activeTopic.diagram.title}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2 items-center text-center">
                    {activeTopic.diagram.nodes.map((node, i) => (
                      <React.Fragment key={i}>
                        <div className="bg-white p-2.5 rounded-lg border border-indigo-200 text-[10px] font-extrabold text-slate-800 shadow-2xs">
                          {node}
                        </div>
                        {i < activeTopic.diagram!.nodes.length - 1 && (
                          <div className="hidden md:flex justify-center text-indigo-400 font-bold">
                            <ArrowRight size={14} />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="pt-2">
                    <span className="text-[9px] font-bold text-slate-400 block font-mono">Mapeamento de Conexões:</span>
                    <ul className="text-[10px] text-slate-500 space-y-0.5 list-disc list-inside">
                      {activeTopic.diagram.connections.map((conn, i) => (
                        <li key={i}>{conn}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* PRACTICAL EXERCISES */}
              <div className="p-4 bg-indigo-50/10 border border-indigo-50 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-slate-600 uppercase font-mono">Exercícios Práticos</span>
                <ul className="space-y-1.5">
                  {activeTopic.exercises.map((ex, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[9px] shrink-0 mt-0.5">{i+1}</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* INTERACTIVE QUIZ UNIT */}
              <div className="border border-indigo-100 rounded-xl p-4 bg-indigo-50/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="text-amber-500" />
                  <span className="text-xs font-black text-slate-800">Quiz de Fixação Técnica</span>
                </div>
                <p className="text-xs text-slate-700 font-bold">{activeTopic.quiz.question}</p>
                <div className="space-y-1.5">
                  {activeTopic.quiz.options.map((opt, idx) => {
                    const isSelected = userAnswers[activeTopic.id] === idx;
                    const isSubmitted = quizSubmitted[activeTopic.id];
                    const isCorrect = idx === activeTopic.quiz.correctIndex;

                    let optionClass = 'border-slate-100 hover:bg-slate-50 bg-white';
                    if (isSelected) optionClass = 'border-indigo-600 bg-indigo-50/30';
                    if (isSubmitted) {
                      if (isCorrect) optionClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                      else if (isSelected) optionClass = 'border-rose-500 bg-rose-50 text-rose-800';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectAnswer(activeTopic.id, idx)}
                        className={`w-full text-left p-2 rounded-lg border text-xs transition-all cursor-pointer flex justify-between items-center ${optionClass}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && isCorrect && <CheckCircle2 size={12} className="text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted[activeTopic.id] ? (
                  <button
                    disabled={userAnswers[activeTopic.id] === undefined}
                    onClick={() => handleSubmitQuiz(activeTopic.id)}
                    className="mt-2 text-xs py-1.5 px-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-lg font-bold cursor-pointer transition-all disabled:opacity-50"
                  >
                    Enviar Minha Resposta
                  </button>
                ) : (
                  <div className="text-[10px] font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                    {userAnswers[activeTopic.id] === activeTopic.quiz.correctIndex ? (
                      <span className="text-emerald-600">✓ Resposta Correta! Você absorveu bem os fundamentos.</span>
                    ) : (
                      <span className="text-rose-600">✗ Incorreto. Reveja a explicação ou o vídeo-aula recomendado!</span>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* 2. DYNAMIC "FAÇA PARA MIM" & "COMO FOI FEITO" HYBRID ENGINE */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest">Painel Inteligente</span>
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <Sparkles size={15} className="text-indigo-600" />
                  Módulo Executar ou Ensinar (Faça para Mim)
                </h3>
              </div>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-500">
                IA Híbrida v2.5
              </span>
            </div>

            {/* Input task */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">Descreva a tarefa técnica que você deseja executar ou documentar:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs md:text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="Ex: Criar API em Express para leads, Criar automação no N8N..."
                />
                <button
                  onClick={handleExecuteTask}
                  disabled={isExecuting || !taskInput.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold cursor-pointer transition-all shadow-xs flex items-center gap-1"
                >
                  {isExecuting ? 'Gerando...' : 'Processar'}
                  <Sparkles size={12} />
                </button>
              </div>
            </div>

            {/* Checkbox selections of Mode Executar ou Ensinar */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Escolha as saídas desejadas:</span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                <label className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-100 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedModes.auto}
                    onChange={(e) => setSelectedModes(prev => ({ ...prev, auto: e.target.checked }))}
                    className="text-indigo-600"
                  />
                  <span>Fazer automaticamente (Modo 1)</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-100 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedModes.stepByStep}
                    onChange={(e) => setSelectedModes(prev => ({ ...prev, stepByStep: e.target.checked }))}
                    className="text-indigo-600"
                  />
                  <span>Me guiar passo a passo</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-100 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedModes.openTools}
                    onChange={(e) => setSelectedModes(prev => ({ ...prev, openTools: e.target.checked }))}
                    className="text-indigo-600"
                  />
                  <span>Abrir ferramentas necessárias</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-100 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedModes.generateDoc}
                    onChange={(e) => setSelectedModes(prev => ({ ...prev, generateDoc: e.target.checked }))}
                    className="text-indigo-600"
                  />
                  <span>Gerar documentação completa</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-100 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedModes.generateVideo}
                    onChange={(e) => setSelectedModes(prev => ({ ...prev, generateVideo: e.target.checked }))}
                    className="text-indigo-600"
                  />
                  <span>Gerar vídeo explicativo (Simulado)</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-100 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedModes.createPdf}
                    onChange={(e) => setSelectedModes(prev => ({ ...prev, createPdf: e.target.checked }))}
                    className="text-indigo-600"
                  />
                  <span>Criar PDF do tutorial</span>
                </label>
              </div>
            </div>

            {/* Display processing loader or outputs */}
            {isExecuting && (
              <div className="py-6 flex flex-col items-center justify-center gap-2.5">
                <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-widest">IA analisando requisitos e estruturando o melhor caminho...</p>
              </div>
            )}

            {executionResult && !isExecuting && (
              <div className="space-y-4 border-t border-slate-100 pt-4">
                
                {/* 1. AUTO GENERATION OUTPUT (Modo 1) */}
                {selectedModes.auto && (
                  <div className="space-y-2 bg-slate-900 p-4 rounded-xl text-white border border-slate-800">
                    <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">⚡ Saída Automatizada Executada (Modo Faça para Mim)</span>
                    <p className="text-xs text-slate-300">A IA gerou as configurações e estruturas lógicas completas para esta tarefa:</p>
                    <pre className="text-[10px] font-mono text-emerald-400 p-3 bg-slate-950 rounded border border-slate-800/50 overflow-x-auto max-h-[160px]">
                      {executionResult.code}
                    </pre>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                      <span>✓ Deploy simulado efetuado na biblioteca de testes</span>
                      <button 
                        onClick={() => handleCopyCode(executionResult.code, 'auto-gen')}
                        className="text-indigo-300 hover:text-white font-bold"
                      >
                        {copiedId === 'auto-gen' ? '✓ Copiado' : 'Copiar Estrutura'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. STEP BY STEP GUIAR ME (Modo 2) */}
                {selectedModes.stepByStep && (
                  <div className="space-y-2.5 p-4 bg-indigo-50/10 border border-indigo-100 rounded-xl">
                    <span className="text-[9px] font-mono font-bold text-indigo-700 uppercase tracking-wider block">🧭 Guia Passo a Passo Detalhado (Modo Guiar-me)</span>
                    <div className="space-y-1.5">
                      {executionResult.steps.map((step: string, idx: number) => (
                        <div key={idx} className="flex gap-2.5 text-xs text-slate-700 leading-relaxed">
                          <span className="font-mono font-black text-indigo-600 shrink-0">{idx + 1}.</span>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. OPEN TOOLS DIRECT LINKS (Modo 3) */}
                {selectedModes.openTools && (
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block">🔗 Links para Plataformas Oficiais Requeridas</span>
                    <div className="flex flex-wrap gap-2">
                      {executionResult.tools.map((tool: any, idx: number) => (
                        <a
                          key={idx}
                          href={tool.url}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all shadow-2xs"
                        >
                          <ExternalLink size={12} className="text-indigo-600" />
                          {tool.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. CHOOSE MORE META ACTIONS (Doc, Video, PDF) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedModes.generateDoc && (
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1.5 text-xs text-slate-600">
                      <span className="font-bold text-slate-800 flex items-center gap-1"><FileText size={12} className="text-indigo-600" /> Documentação</span>
                      <p className="text-[10px] line-clamp-2">Contém requisitos técnicos, infraestrutura e boas práticas.</p>
                      <button 
                        onClick={() => alert(`Documentação gerada com sucesso:\n\n${executionResult.doc}`)}
                        className="text-[10px] text-indigo-600 hover:underline font-bold block"
                      >
                        Visualizar e Copiar Markdown
                      </button>
                    </div>
                  )}

                  {selectedModes.generateVideo && (
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1.5 text-xs text-slate-600">
                      <span className="font-bold text-slate-800 flex items-center gap-1"><Video size={12} className="text-indigo-600" /> Vídeo Explicativo</span>
                      <p className="text-[10px] line-clamp-2">Assista ao passo a passo em tela simulado em HD.</p>
                      <button 
                        onClick={() => alert('Abrindo reprodução simulada do vídeo explicativo do tutorial... (Voz sintetizada e gravação de tela em 1080p)')}
                        className="text-[10px] text-indigo-600 hover:underline font-bold block"
                      >
                        Iniciar Vídeo Tutorial
                      </button>
                    </div>
                  )}

                  {selectedModes.createPdf && (
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1.5 text-xs text-slate-600">
                      <span className="font-bold text-slate-800 flex items-center gap-1"><PdfIcon size={12} className="text-indigo-600" /> Apostila PDF</span>
                      <p className="text-[10px] line-clamp-2">Gerador automático de apostila imprimível e organizada.</p>
                      <button 
                        onClick={() => {
                          window.print();
                        }}
                        className="text-[10px] text-indigo-600 hover:underline font-bold block"
                      >
                        Imprimir / Criar PDF (.pdf)
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Tutor Chat, Knowledge Wiki & Como foi Feito */}
        <div className="space-y-6">
          
          {/* 3. MODO TUTOR (AI Teacher chat box) */}
          <div className="bg-gradient-to-b from-indigo-950 to-slate-900 rounded-xl p-4 text-white border border-slate-800 shadow-md space-y-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <h4 className="text-xs font-black tracking-tight flex items-center gap-1.5">
                    <GraduationCap size={15} className="text-indigo-400" />
                    Modo Tutor de IA
                  </h4>
                  <p className="text-[9px] text-slate-400 font-mono">Seu professor de Elite particular 24h</p>
                </div>
              </div>
              <button 
                onClick={() => setTutorInput('Me dê um desafio prático de programação!')}
                className="text-[9px] bg-white/10 hover:bg-white/15 px-2 py-1 rounded font-bold transition-all cursor-pointer"
              >
                Solicitar Desafio
              </button>
            </div>

            {/* Chat Body */}
            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1 text-[11px] font-sans">
              {tutorMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-lg max-w-[90%] leading-relaxed ${
                    msg.sender === 'tutor' 
                      ? 'bg-white/5 border border-white/10 text-slate-200 mr-auto' 
                      : 'bg-indigo-600 text-white ml-auto'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTutorTyping && (
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-slate-400 mr-auto flex gap-1.5 max-w-[50px] justify-center items-center">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                </div>
              )}
            </div>

            {/* Send Interface */}
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <input
                type="text"
                value={tutorInput}
                onChange={(e) => setTutorInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendToTutor()}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                placeholder="Dúvidas, correções ou desafios..."
              />
              <button
                onClick={handleSendToTutor}
                className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-pointer transition-all shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* 4. BASE DE CONHECIMENTO (WIKI INTERNA) */}
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">Base de Conhecimento (Wiki)</h4>
              <p className="text-[10px] text-slate-400 leading-snug">Documentações rápidas, soluções de erros comuns e prompts.</p>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por erro, API, webhook..."
                value={wikiSearch}
                onChange={(e) => setWikiSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Simulated filtered wiki items */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {[
                { title: 'Erro: "Missing or insufficient permissions"', cat: 'Firebase', desc: 'Sempre verifique se a regra do Firestore está permitindo leitura/escrita para usuários não autenticados na fase de desenvolvimento.' },
                { title: 'Evolution API: Reconexão de Sessão', cat: 'WhatsApp', desc: 'Se o QR Code cair, mande uma chamada DELETE para /instance/logout e chame a rota de conexão novamente.' },
                { title: 'N8N: Formatando strings complexas', cat: 'Automações', desc: 'Utilize JavaScript inline nos nós de Expressão: .replace() e regex simples para sanitizar dados.' },
                { title: 'Configurando Pixels do Meta no Servidor', cat: 'Tráfego Ads', desc: 'Envie o IP do cliente e User Agent junto ao evento de Conversão para garantir 100% de match rate.' },
                { title: 'Prompt Ideal para Geração de Imagens', cat: 'IA Generativa', desc: 'Sempre adicione especificações de luz, tom, profundidade de campo e remova artefatos indesejados.' }
              ].filter(item => 
                item.title.toLowerCase().includes(wikiSearch.toLowerCase()) || 
                item.cat.toLowerCase().includes(wikiSearch.toLowerCase()) ||
                item.desc.toLowerCase().includes(wikiSearch.toLowerCase())
              ).map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="font-extrabold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">{item.cat}</span>
                    <span className="text-slate-400">Tutorial de Apoio</span>
                  </div>
                  <h5 className="text-[11px] font-bold text-slate-800 leading-snug">{item.title}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. MODO "COMO FOI FEITO" */}
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">Explorador: "Como foi Feito"</h4>
              <p className="text-[10px] text-slate-400">Engenharia reversa dos projetos reais gerados pelo KVB System.</p>
            </div>

            {/* Select Project */}
            <div className="flex gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-100">
              <button
                onClick={() => setSelectedProjectHow('imobiliaria')}
                className={`flex-1 text-[10px] font-bold py-1 px-2 rounded cursor-pointer transition-all ${
                  selectedProjectHow === 'imobiliaria' ? 'bg-white text-indigo-700 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Imobiliária VIP
              </button>
              <button
                onClick={() => setSelectedProjectHow('estetica')}
                className={`flex-1 text-[10px] font-bold py-1 px-2 rounded cursor-pointer transition-all ${
                  selectedProjectHow === 'estetica' ? 'bg-white text-indigo-700 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Clínica Glow
              </button>
            </div>

            {/* Project Details specs */}
            <div className="p-3 bg-indigo-50/15 border border-indigo-50 rounded-xl space-y-3.5 text-[11px] text-slate-600 leading-relaxed font-sans">
              {selectedProjectHow === 'imobiliaria' ? (
                <>
                  <p><strong>📂 Arquivos Utilizados:</strong> <code>/src/App.tsx</code>, <code>/src/index.css</code>, <code>supabase.js</code></p>
                  <p><strong>🔌 APIs Integradas:</strong> Google Maps API (Localização de Imóveis), API WhatsApp (Agendamento rápido).</p>
                  <p><strong>🗄️ Banco de Dados:</strong> PostgreSQL no Supabase com tabelas de <code>imoveis</code>, <code>leads</code> e <code>agendamentos</code>.</p>
                  <p><strong>🛠️ Bibliotecas:</strong> Leaflet para visual de mapas, Framer Motion para transição de slides, Recharts para gráficos de comissão.</p>
                  <p><strong>🧩 Estrutura Lógica:</strong> O lead escolhe o imóvel, clica em agendar, a API dispara webhook no N8N, registra no CRM KVB e avisa o corretor no WhatsApp.</p>
                </>
              ) : (
                <>
                  <p><strong>📂 Arquivos Utilizados:</strong> <code>/src/components/DealsView.tsx</code>, <code>/src/components/CrmView.tsx</code></p>
                  <p><strong>🔌 APIs Integradas:</strong> Meta Conversion API (Rastreamento de Leads), Evolution API (Mensagem ao lead).</p>
                  <p><strong>🗄️ Banco de Dados:</strong> Firestore DB (Coleções: <code>leads_estetica</code>, <code>tratamentos</code>).</p>
                  <p><strong>🛠️ Bibliotecas:</strong> Date-fns para controle de horários, Tailwind CSS para design minimalista focado em luxo.</p>
                  <p><strong>🧩 Estrutura Lógica:</strong> Leads vindos de criativos de Meta Ads preenchem formulário reativo. A IA qualifica e cria lembrete SMS automático 24h antes da consulta.</p>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
