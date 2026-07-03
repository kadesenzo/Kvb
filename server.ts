import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database for KVB System to enable true full-stack interactions
const db = {
  services: {
    site: 158,
    automation: 279,
    marketing: 200,
    specialComboFirstMonth: 399,
    specialComboMonthly: 229,
  },
  clients: [
    {
      id: "c1",
      name: "Ana Costa",
      company: "Clínica Sorella",
      phone: "(11) 99876-5432",
      email: "contato@clinicasorella.com",
      instagram: "@clinicasorella",
      niche: "Saúde & Estética",
      plan: "Combo KVB Especial",
      entryDate: "2026-05-10",
      monthlyValue: 229,
      status: "Ativo", // Ativo, Em negociação, Cancelado
      history: [
        { date: "2026-05-10", info: "Contrato assinado e primeiro pagamento de R$399 efetuado." },
        { date: "2026-06-10", info: "Mensalidade de R$229 paga com sucesso." },
        { date: "2026-06-15", info: "Automação de agendamentos no WhatsApp foi entregue e homologada." }
      ]
    },
    {
      id: "c2",
      name: "Roberto Dias",
      company: "Dias Engenharia",
      phone: "(21) 98765-4321",
      email: "roberto@diasengenharia.com.br",
      instagram: "@dias.engenharia",
      niche: "Construção Civil",
      plan: "Automação",
      entryDate: "2026-06-01",
      monthlyValue: 279,
      status: "Ativo",
      history: [
        { date: "2026-06-01", info: "Contratação do plano de Automação de Leads." },
        { date: "2026-06-05", info: "Mapeamento de fluxos no N8N concluído." }
      ]
    },
    {
      id: "c3",
      name: "Juliana Mendes",
      company: "Ju Doces Finos",
      phone: "(31) 99123-4567",
      email: "juliana@judocesfinos.com",
      instagram: "@judoces.marketing",
      niche: "Gastronomia",
      plan: "Assessoria de Marketing",
      entryDate: "2026-04-15",
      monthlyValue: 200,
      status: "Ativo",
      history: [
        { date: "2026-04-15", info: "Assinou assessoria de marketing mensal." },
        { date: "2026-06-15", info: "Aviso de atraso na mensalidade enviado por WhatsApp." }
      ]
    },
    {
      id: "c4",
      name: "Carlos Eduardo",
      company: "FitLife Academia",
      phone: "(41) 99234-5678",
      email: "carlos@fitlife.com",
      instagram: "@fitlife.academia",
      niche: "Fitness",
      plan: "Site",
      entryDate: "2026-02-10",
      monthlyValue: 158,
      status: "Cancelado",
      history: [
        { date: "2026-02-10", info: "Contratação do Site Institucional concluída." },
        { date: "2026-05-12", info: "Cliente solicitou cancelamento devido à reestruturação de custos." }
      ]
    },
    {
      id: "c5",
      name: "Patricia Lima",
      company: "Boutique Glamour",
      phone: "(11) 97766-5544",
      email: "patricia@boutiqueglamour.com",
      instagram: "@glamour.boutique",
      niche: "Varejo de Moda",
      plan: "Combo KVB Especial",
      entryDate: "2026-06-18",
      monthlyValue: 399,
      status: "Em negociação",
      history: [
        { date: "2026-06-18", info: "Reunião de alinhamento e apresentação da proposta de Combo Especial." }
      ]
    }
  ],
  contracts: [
    {
      id: "ctr1",
      clientId: "c1",
      clientName: "Ana Costa",
      document: "45.678.901/0001-23",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      serviceType: "Combo KVB Especial",
      value: "Primeiro mês R$399.00 / Mensalidade R$229.00",
      signature: "Ana Costa",
      signedAt: "2026-05-10T14:35:00Z"
    },
    {
      id: "ctr2",
      clientId: "c2",
      clientName: "Roberto Dias",
      document: "123.456.789-00",
      address: "Rua do Ouvidor, 50 - Centro, Rio de Janeiro - RJ",
      serviceType: "Automação",
      value: "Mensalidade R$279.00",
      signature: "Roberto Dias",
      signedAt: "2026-06-01T10:15:00Z"
    }
  ],
  meetings: [
    {
      id: "m1",
      clientName: "Marcos Souza",
      company: "Souza Corretora",
      phone: "(11) 99999-1111",
      instagram: "@souza_corretores",
      niche: "Imobiliário",
      stage: "Proposta enviada", // Lead, Reunião marcada, Proposta enviada, Fechou, Perdido
      date: "2026-06-25",
      notes: "Apresentado funil de automação imobiliária. Cliente gostou do Combo KVB Especial e está avaliando orçamento.",
      closedValue: 0
    },
    {
      id: "m2",
      clientName: "Boutique Glamour",
      company: "Boutique Glamour",
      phone: "(11) 97766-5544",
      instagram: "@glamour.boutique",
      niche: "Moda",
      stage: "Reunião marcada",
      date: "2026-06-24",
      notes: "Reunião marcada para quarta-feira às 14h sobre reposicionamento de tráfego pago + Instagram.",
      closedValue: 0
    },
    {
      id: "m3",
      clientName: "Renata Abreu",
      company: "Renata Advogados",
      phone: "(19) 98111-2222",
      instagram: "@renata.advocacia",
      niche: "Jurídico",
      stage: "Fechou",
      date: "2026-06-15",
      notes: "Contrato fechado com sucesso para desenvolvimento de landing page + captação no Meta e Google Ads.",
      closedValue: 399
    },
    {
      id: "m4",
      clientName: "Guto Lanches",
      company: "Guto Lanchonete",
      phone: "(21) 97111-4433",
      instagram: "@guto.lanches",
      niche: "Alimentação",
      stage: "Perdido",
      date: "2026-06-10",
      notes: "Sem orçamento no momento. Quer apenas consultoria gratuita.",
      closedValue: 0
    },
    {
      id: "m5",
      clientName: "Sonia Jóias",
      company: "Sonia Jóias",
      phone: "(81) 99122-3344",
      instagram: "@soniajoias",
      niche: "Varejo",
      stage: "Lead",
      date: "2026-06-22",
      notes: "Enviou mensagem pelo formulário do site pedindo orçamento para automação de catálogo no Whatsapp.",
      closedValue: 0
    }
  ],
  tasks: [
    {
      id: "t1",
      title: "Desenvolvimento da Landing Page Sorella",
      description: "Escrever copy direcionada para vendas e programar o design minimalista de marcação de consulta em React.",
      status: "Em desenvolvimento",
      priority: "Alta",
      assignedTo: "Carlos Dev",
      client: "Clínica Sorella",
      category: "Site"
    },
    {
      id: "t2",
      title: "Configuração do Fluxo de Atendimento no N8N",
      description: "Criar as automações de boas-vindas do WhatsApp para a Clínica Sorella e integrar com banco de dados de agendamentos.",
      status: "Concluído",
      priority: "Alta",
      assignedTo: "Beatriz Automação",
      client: "Clínica Sorella",
      category: "Automação"
    },
    {
      id: "t3",
      title: "Calendário Editorial de Posts - Ju Doces Finos",
      description: "Preparar 30 dias de ideias de stories, 3 roteiros de reels e hashtags de alta conversão gastronomia.",
      status: "Em desenvolvimento",
      priority: "Média",
      assignedTo: "Juliana Marketing",
      client: "Ju Doces Finos",
      category: "Marketing"
    },
    {
      id: "t4",
      title: "Criação de Criativos para Campanhas de Tráfego - Renata Advogados",
      description: "Desenvolver 3 variações de criativos estáticos + 1 vídeo roteirizado focado em conversão de consultorias jurídicas.",
      status: "Pendente",
      priority: "Alta",
      assignedTo: "Juliana Marketing",
      client: "Renata Advogados",
      category: "Tráfego"
    },
    {
      id: "t5",
      title: "Configurar Campanha de Tráfego Pago do Zero - FitLife",
      description: "Criar estruturação de públicos frios/quentes e montar conjunto de anúncios no Meta Ads.",
      status: "Concluído",
      priority: "Média",
      assignedTo: "Tiago Tráfego",
      client: "FitLife Academia",
      category: "Tráfego"
    }
  ],
  finance: {
    monthlyGoal: 15000,
    entries: [
      { id: "f1", client: "Clínica Sorella", type: "Mensalidade Combo", amount: 229, date: "2026-06-10", status: "Pago" },
      { id: "f2", client: "Dias Engenharia", type: "Mensalidade Automação", amount: 279, date: "2026-06-01", status: "Pago" },
      { id: "f3", client: "Clínica Sorella", type: "Setup Combo Especial", amount: 399, date: "2026-05-10", status: "Pago" },
      { id: "f4", client: "Renata Advogados", type: "Setup Combo Especial", amount: 399, date: "2026-06-15", status: "Pago" },
      { id: "f5", client: "Boutique Glamour", type: "Sinal de Entrada", amount: 199, date: "2026-06-22", status: "Pago" }
    ],
    exits: [
      { id: "fe1", desc: "Assinatura Servidores Vercel", amount: 100, date: "2026-06-01" },
      { id: "fe2", desc: "Ferramenta de Automação Evolution API", amount: 120, date: "2026-06-05" },
      { id: "fe3", desc: "Plataforma de Disparo de Email", amount: 80, date: "2026-06-10" }
    ],
    commissions: [
      { id: "fc1", representative: "Tiago Gestor", client: "Renata Advogados", amount: 80, date: "2026-06-15" },
      { id: "fc2", representative: "Fernanda Social", client: "Clínica Sorella", amount: 50, date: "2026-06-10" }
    ],
    unpaid: [
      { id: "fu1", client: "Ju Doces Finos", amount: 200, dueDate: "2026-06-15", delayDays: 7 }
    ]
  },
  projects: [
    {
      id: "proj1",
      name: "Clínica Sorella - Dental & Skin",
      niche: "Saúde & Estética",
      clientName: "Ana Costa",
      createdAt: "2026-05-15",
      site: {
        structure: "Home → Quem Somos → Serviços → Depoimentos → Contato",
        colors: ["#FDFBF7 (Pérola)", "#D4AF37 (Dourado Suave)", "#2C3E50 (Azul Profundo)"],
        sections: "Navbar Elegante, Hero com vídeo relaxante, Grade de especialidades médica, Prova social premium, Formulário e CTA WhatsApp.",
        copy: "Recupere sua autoestima com tratamentos personalizados focados na harmonia facial e bem-estar corporal. Agende hoje uma consulta na Clínica Sorella.",
        seo: "clinica de estetica premium sao paulo, harmonizacao facial sp, dermatologista paulista",
        cta: "Falar com Especialista & Agendar Horário"
      },
      marketing: {
        calendar: "Dia 1-5: Mitos vs Verdades Tratamentos; Dia 6-12: Tour pela Clínica nos Stories; Dia 13-20: Reels Antes e Depois; Dia 21-30: CTA Oferta Exclusiva de Inverno.",
        postIdeas: "Ideia 1: 3 erros comuns que aceleram o envelhecimento; Ideia 2: Por trás das câmeras da nossa esterilização; Ideia 3: Feedback espontâneo de paciente feliz.",
        reelsScripts: "Roteiro Reels: Começa apontando pra rugas finas com lettering 'Isso te incomoda?'. Transiciona sorrindo na clínica mostrando o protocolo rápido e seguro de aplicar colágeno. Conclui com chamada pro link da bio.",
        captions: "Legenda: O seu bem-estar merece o melhor investimento. Na Sorella, criamos um espaço acolhedor e técnicas inovadoras para que você se sinta radiante de dentro para fora.",
        hashtags: "#esteticafacial #spa #autoestima #colageno #clinicaesteticasp",
        growthStrategy: "Interagir diariamente por 20 minutos com seguidoras locais de marcas gourmet e salões próximos nas redes sociais da região."
      },
      traffic: {
        target: "Mulheres, 25-55 anos, interessadas em autocuidado, marcas de grife, dermocosméticos, moradoras de bairros nobres num raio de 7km.",
        creatives: "Vídeo 1: Dra mostrando o ambiente clínico premium; Carrossel 2: Detalhamento de tratamentos rápidos no horário de almoço.",
        copy: "Anúncio: Dê à sua pele o cuidado premium que ela merece. Agendamento ágil e discreto por WhatsApp. Clique em Saiba Mais e tire suas dúvidas.",
        strategies: "Campanha de mensagens direta para WhatsApp com direcionadores por proximidade residencial e exclusão de público de estudantes.",
        segmentation: "Meta Ads direcionado: Interesse em Beleza, Clínicas de estética, Cuidados com o cabelo. Geografia: São Paulo + 7km.",
      },
      automation: {
        flowchart: "Lead clica no anúncio → WhatsApp recebe mensagem programada → Menu interativo de especialidades → Se não responder em 2h, follow-up automático com benefício → Confirmação direta na agenda do especialista.",
        funnel: "Atendimento automático receptivo feito via Inteligência Artificial que faz a triagem das queixas do paciente e conecta com recepcionista para pagamento.",
        messages: "Mensagem de Boas-vindas: 'Olá! Que alegria receber você. Deseja agendar sua avaliação facial ou tirar dúvidas sobre nossos tratamentos? Digite o número correspondente...'",
        whatsapp: "Integração via Instance API do Evolution que faz disparo imediato de lembrete de consulta 24 horas e 2 horas antes de cada agendamento.",
        followUp: "Follow-up de leads parados após 48 horas oferecendo um bônus especial de cortesia para a primeira visita.",
        recovery: "Disparo automático após 30 dias do último procedimento sugerindo retorno para manutenção preventiva."
      }
    }
  ],
  supportTickets: [
    { id: "tk1", clientId: "c1", clientName: "Clínica Sorella", subject: "Atualização da logo no rodapé do site", description: "Gostaria de trocar a versão antiga da nossa logo pela nova com detalhes em dourado.", status: "Aberto", createdAt: "2026-06-22" }
  ]
};

// Lazy initialization helper for Gemini
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Falling back to AI design engine simulations.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// Robust retry and model-fallback helper to handle 503 UNAVAILABLE errors gracefully
async function generateContentWithRetryAndFallback(
  gemini: any, 
  params: any, 
  retries = 2, 
  delay = 500
): Promise<any> {
  const originalModel = params.model || "gemini-3.5-flash";
  const modelsToTry = [originalModel, "gemini-3.1-flash-lite", "gemini-flash-latest"];
  
  for (const modelName of modelsToTry) {
    let attempt = 0;
    while (attempt <= retries) {
      try {
        console.log(`Attempting Gemini generateContent with model: ${modelName} (attempt ${attempt + 1}/${retries + 1})`);
        const response = await gemini.models.generateContent({
          ...params,
          model: modelName,
        });
        return response;
      } catch (err: any) {
        attempt++;
        const errMsg = err?.message || String(err);
        const isUnavailable = err?.status === "UNAVAILABLE" || errMsg.includes("503") || errMsg.includes("temp") || errMsg.includes("high demand") || errMsg.includes("unavailable");
        
        console.log(`Gemini status for model ${modelName}: ${errMsg.substring(0, 100)}`);
        
        if (isUnavailable && attempt <= retries) {
          // Wait with exponential backoff and retry
          const backoffDelay = delay * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          continue;
        }
        
        // If it's a persistent error or we have exhausted retries for this model, break and try the next fallback model
        break;
      }
    }
  }
  
  throw new Error("Todas as tentativas com os modelos do Gemini falharam devido a alta demanda ou indisponibilidade temporária.");
}

// ---------------- API ENDPOINTS ----------------

app.get("/api/all-data", (req, res) => {
  res.json({
    services: db.services,
    clients: db.clients,
    contracts: db.contracts,
    meetings: db.meetings,
    tasks: db.tasks,
    projects: db.projects,
    finance: db.finance,
    tickets: db.supportTickets
  });
});

// Services API (Values edit layout)
app.get("/api/services", (req, res) => {
  res.json(db.services);
});

app.post("/api/services", (req, res) => {
  const { site, automation, marketing, specialComboFirstMonth, specialComboMonthly } = req.body;
  if (site !== undefined) db.services.site = Number(site);
  if (automation !== undefined) db.services.automation = Number(automation);
  if (marketing !== undefined) db.services.marketing = Number(marketing);
  if (specialComboFirstMonth !== undefined) db.services.specialComboFirstMonth = Number(specialComboFirstMonth);
  if (specialComboMonthly !== undefined) db.services.specialComboMonthly = Number(specialComboMonthly);
  res.json({ success: true, services: db.services });
});

// Clients API (CRM)
app.get("/api/clients", (req, res) => {
  res.json(db.clients);
});

app.post("/api/clients", (req, res) => {
  const { name, company, phone, email, instagram, niche, plan, entryDate, monthlyValue, status } = req.body;
  if (!name || !company) {
    return res.status(400).json({ error: "Nome e Empresa são obrigatórios." });
  }
  const newClient = {
    id: "c" + (db.clients.length + 1),
    name,
    company,
    phone: phone || "",
    email: email || "",
    instagram: instagram || "",
    niche: niche || "Geral",
    plan: plan || "Site",
    entryDate: entryDate || new Date().toISOString().split('T')[0],
    monthlyValue: Number(monthlyValue) || 158,
    status: status || "Ativo",
    history: [
      { date: new Date().toISOString().split('T')[0], info: `Cadastro efetuado no plano ${plan}.` }
    ]
  };
  db.clients.push(newClient);
  res.json(newClient);
});

app.put("/api/clients/:id", (req, res) => {
  const { id } = req.params;
  const index = db.clients.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Cliente não encontrado" });

  const current = db.clients[index];
  const { name, company, phone, email, instagram, niche, plan, entryDate, monthlyValue, status, addHistory } = req.body;

  if (name !== undefined) current.name = name;
  if (company !== undefined) current.company = company;
  if (phone !== undefined) current.phone = phone;
  if (email !== undefined) current.email = email;
  if (instagram !== undefined) current.instagram = instagram;
  if (niche !== undefined) current.niche = niche;
  if (plan !== undefined) current.plan = plan;
  if (entryDate !== undefined) current.entryDate = entryDate;
  if (monthlyValue !== undefined) current.monthlyValue = Number(monthlyValue);
  if (status !== undefined) {
    if (status !== current.status) {
      current.history.push({
        date: new Date().toISOString().split('T')[0],
        info: `Alteração de status de ${current.status} para ${status}.`
      });
    }
    current.status = status;
  }

  if (addHistory) {
    current.history.push({
      date: new Date().toISOString().split('T')[0],
      info: addHistory
    });
  }

  db.clients[index] = current;
  res.json(current);
});

app.delete("/api/clients/:id", (req, res) => {
  const { id } = req.params;
  const index = db.clients.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Cliente não encontrado" });
  db.clients.splice(index, 1);
  res.json({ success: true });
});

// Contracts API
app.get("/api/contracts", (req, res) => {
  res.json(db.contracts);
});

app.post("/api/contracts", (req, res) => {
  const { clientName, document, address, serviceType, value, signature } = req.body;
  const newContract = {
    id: "ctr" + (db.contracts.length + 1),
    clientId: "c" + (Math.floor(Math.random() * 100)),
    clientName,
    document,
    address,
    serviceType,
    value,
    signature,
    signedAt: new Date().toISOString()
  };
  db.contracts.push(newContract);
  res.json(newContract);
});

app.delete("/api/contracts/:id", (req, res) => {
  const { id } = req.params;
  const index = db.contracts.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Contrato não encontrado" });
  db.contracts.splice(index, 1);
  res.json({ success: true });
});

// Meetings / Sales Funnel API
app.get("/api/meetings", (req, res) => {
  res.json(db.meetings);
});

app.post("/api/meetings", (req, res) => {
  const { clientName, company, phone, instagram, niche, stage, date, notes, closedValue } = req.body;
  const newMeeting = {
    id: "m" + (db.meetings.length + 1),
    clientName,
    company,
    phone: phone || "",
    instagram: instagram || "",
    niche: niche || "Geral",
    stage: stage || "Lead",
    date: date || new Date().toISOString().split('T')[0],
    notes: notes || "",
    closedValue: Number(closedValue) || 0
  };
  db.meetings.push(newMeeting);
  res.json(newMeeting);
});

app.put("/api/meetings/:id", (req, res) => {
  const { id } = req.params;
  const index = db.meetings.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "Negociação não encontrada" });

  const current = db.meetings[index];
  const { stage, notes, closedValue } = req.body;

  if (stage !== undefined) current.stage = stage;
  if (notes !== undefined) current.notes = notes;
  if (closedValue !== undefined) current.closedValue = Number(closedValue);

  db.meetings[index] = current;
  res.json(current);
});

// Tasks Kanpur Kanban API
app.get("/api/tasks", (req, res) => {
  res.json(db.tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, description, status, priority, assignedTo, client, category } = req.body;
  const newTask = {
    id: "t" + (db.tasks.length + 1),
    title,
    description: description || "",
    status: status || "Pendente",
    priority: priority || "Média",
    assignedTo: assignedTo || "Carlos Dev",
    client: client || "Sem cliente",
    category: category || "Geral"
  };
  db.tasks.push(newTask);
  res.json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = db.tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Tarefa não encontrada" });

  const current = db.tasks[index];
  const { status, priority, assignedTo, title, description, client, category } = req.body;

  if (status !== undefined) current.status = status;
  if (priority !== undefined) current.priority = priority;
  if (assignedTo !== undefined) current.assignedTo = assignedTo;
  if (title !== undefined) current.title = title;
  if (description !== undefined) current.description = description;
  if (client !== undefined) current.client = client;
  if (category !== undefined) current.category = category;

  db.tasks[index] = current;
  res.json(current);
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = db.tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Tarefa não encontrada" });
  db.tasks.splice(index, 1);
  res.json({ success: true });
});

// Projects API (Saved output structures)
app.get("/api/projects", (req, res) => {
  res.json(db.projects);
});

app.post("/api/projects", (req, res) => {
  const { name, niche, clientName, site, marketing, traffic, automation } = req.body;
  const newProject = {
    id: "proj" + (db.projects.length + 1),
    name,
    niche,
    clientName: clientName || "Geral",
    createdAt: new Date().toISOString().split("T")[0],
    site,
    marketing,
    traffic,
    automation
  };
  db.projects.push(newProject);
  res.json(newProject);
});

// Finance API
app.get("/api/finance", (req, res) => {
  res.json(db.finance);
});

app.post("/api/finance/entry", (req, res) => {
  const { client, type, amount, date, status } = req.body;
  const newEntry = {
    id: "f" + (db.finance.entries.length + 1),
    client,
    type,
    amount: Number(amount) || 0,
    date: date || new Date().toISOString().split("T")[0],
    status: status || "Pago"
  };
  db.finance.entries.push(newEntry);
  res.json(newEntry);
});

app.post("/api/finance/exit", (req, res) => {
  const { desc, amount, date } = req.body;
  const newExit = {
    id: "fe" + (db.finance.exits.length + 1),
    desc,
    amount: Number(amount) || 0,
    date: date || new Date().toISOString().split("T")[0],
  };
  db.finance.exits.push(newExit);
  res.json(newExit);
});

app.post("/api/finance/commission", (req, res) => {
  const { representative, client, amount, date } = req.body;
  const newComm = {
    id: "fc" + (db.finance.commissions.length + 1),
    representative,
    client,
    amount: Number(amount) || 0,
    date: date || new Date().toISOString().split("T")[0],
  };
  db.finance.commissions.push(newComm);
  res.json(newComm);
});

app.put("/api/finance/goal", (req, res) => {
  const { monthlyGoal } = req.body;
  if (monthlyGoal !== undefined) {
    db.finance.monthlyGoal = Number(monthlyGoal);
  }
  res.json({ success: true, monthlyGoal: db.finance.monthlyGoal });
});

// Support / Client Tickets API
app.get("/api/tickets", (req, res) => {
  res.json(db.supportTickets);
});

app.post("/api/tickets", (req, res) => {
  const { clientId, clientName, subject, description, status } = req.body;
  const newTicket = {
    id: "tk" + (db.supportTickets.length + 1),
    clientId: clientId || "c1",
    clientName: clientName || "Cliente Geral",
    subject: subject || "Dúvida Geral",
    description: description || "",
    status: status || "Aberto",
    createdAt: new Date().toISOString().split("T")[0]
  };
  db.supportTickets.push(newTicket);
  res.json(newTicket);
});

app.put("/api/tickets/:id", (req, res) => {
  const { id } = req.params;
  const index = db.supportTickets.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Ticket não encontrado" });
  db.supportTickets[index].status = req.body.status || db.supportTickets[index].status;
  res.json(db.supportTickets[index]);
});

// ---------------- INTELLIGENT AI GENERATOR ENDPOINT (GEMINI) ----------------

app.post("/api/generate-project", async (req, res) => {
  const answers = req.body.answers;

  if (!answers) {
    return res.status(400).json({ error: "Enquete incompleta para geração." });
  }

  const promptText = `
Você é uma inteligência artificial especialista integrada ao KVB System. Sua tarefa é criar um planejamento de projeto sob medida para uma agência de tecnologia e marketing com base no seguinte briefing de enquete do cliente:

1. Nicho do negócio: ${answers.niche || "Não informado"}
2. Nome da empresa: ${answers.companyName || "Não informado"}
3. Objetivo principal: ${answers.objective || "Não informado"}
4. Foco: ${answers.vendasOuAutoridade || "Mais vendas"}
5. Tem Instagram?: ${answers.hasInstagram || "Não informado"}
6. Tem identidade visual?: ${answers.hasVisualIdentity || "Não informado"}
7. Cores preferidas: ${answers.favColors || "Neutras"}
8. Concorrentes: ${answers.competitors || "Não informado"}
9. Tem site?: ${answers.hasSite || "Não informado"}
10. Público-alvo: ${answers.targetAudience || "Não informado"}
11. Serviços oferecidos: ${answers.offeredServices || "Não informado"}
12. Tom da comunicação: ${answers.toneOfVoice || "Profissional"}
13. Referências: ${answers.references || "Não informado"}

Com base nisso, por favor, retorne uma resposta estritamente estruturada em JSON contendo as seções requisitadas. 
Use a seguinte estrutura de schema JSON de retorno (Não inclua caracteres extras ou blocos de markdown no início e fim que possam quebrar o parser JSON se possível, ou formate como JSON válido):

{
  "name": "Nome do projeto gerado",
  "niche": "Nicho do cliente",
  "site": {
    "structure": "Exemplo: Home → Quem somos → Nossos planos e depoimentos → Contato",
    "colors": "Cores sugeridas em hexadecimal e nome da cor de acordo com preferência.",
    "sections": "Seções essenciais detalhadas.",
    "copy": "Parágrafo principal impactante de copy de vendas.",
    "textos": "Outras orientações de textos de apoio e diferenciais.",
    "seo": "Palavras-chave de SEO recomendadas para ranqueamento local e geral.",
    "cta": "Frase de Call-to-Action imperativa para direcionar ao WhatsApp."
  },
  "marketing": {
    "calendar": "Cronograma de 30 dias resumido de publicações.",
    "postIdeas": "Lista de 3 a 5 ideias originais de posts em formato texto curto.",
    "reelsScripts": "Roteiro narrativo completo com orientações visuais e áudio para Reels de alta retenção.",
    "captions": "Legendas prontas de exemplo de posts direcionada a vendas.",
    "hashtags": "Hashtags focadas no nicho.",
    "growthStrategy": "Passo a passo prático de tráfego orgânico e crescimento de engajamento."
  },
  "traffic": {
    "target": "Definição clara público alvo no Meta Ads.",
    "creatives": "Ideias de criativos (imagens e vídeos) com copys dedicadas.",
    "copy": "Copy altamente persuasiva para usar no anúncio.",
    "strategies": "Estrutura de campanhas de tráfego recomendada.",
    "segmentation": "Palavras-chave de interesses no Meta Ads e localidade recomendada."
  },
  "automation": {
    "flowchart": "Fluxograma textual lógico passo a passo do fluxo operacional.",
    "funnel": "Como funciona o funil de atendimento e triagem automática.",
    "messages": "Script de mensagem automática de recepção do lead de WhatsApp.",
    "whatsapp": "Lembretes e rotinas automatizadas no WhatsApp.",
    "followUp": "Estratégia e texto de follow-up estruturado após 24h sem resposta.",
    "recovery": "Estratégia prática de recuperação de clientes inativos ou 'perdidos'."
  }
}
Responda exclusivamente em formato JSON válido e em língua portuguesa brasileira.
`;

  const gemini = getGeminiClient();

  if (!gemini) {
    // Elegant and highly detailed local simulated generation for KVB System mock engine when no key is present.
    console.log("No Gemini API client initialized. Serving high-fidelity simulated design strategy.");
    const simulatedResponse = simulateKVBGenerator(answers);
    return res.json(simulatedResponse);
  }

  try {
    const response = await generateContentWithRetryAndFallback(gemini, {
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["name", "niche", "site", "marketing", "traffic", "automation"],
          properties: {
            name: { type: Type.STRING },
            niche: { type: Type.STRING },
            site: {
              type: Type.OBJECT,
              required: ["structure", "colors", "sections", "copy", "textos", "seo", "cta"],
              properties: {
                structure: { type: Type.STRING },
                colors: { type: Type.STRING },
                sections: { type: Type.STRING },
                copy: { type: Type.STRING },
                textos: { type: Type.STRING },
                seo: { type: Type.STRING },
                cta: { type: Type.STRING }
              }
            },
            marketing: {
              type: Type.OBJECT,
              required: ["calendar", "postIdeas", "reelsScripts", "captions", "hashtags", "growthStrategy"],
              properties: {
                calendar: { type: Type.STRING },
                postIdeas: { type: Type.STRING },
                reelsScripts: { type: Type.STRING },
                captions: { type: Type.STRING },
                hashtags: { type: Type.STRING },
                growthStrategy: { type: Type.STRING }
              }
            },
            traffic: {
              type: Type.OBJECT,
              required: ["target", "creatives", "copy", "strategies", "segmentation"],
              properties: {
                target: { type: Type.STRING },
                creatives: { type: Type.STRING },
                copy: { type: Type.STRING },
                strategies: { type: Type.STRING },
                segmentation: { type: Type.STRING }
              }
            },
            automation: {
              type: Type.OBJECT,
              required: ["flowchart", "funnel", "messages", "whatsapp", "followUp", "recovery"],
              properties: {
                flowchart: { type: Type.STRING },
                funnel: { type: Type.STRING },
                messages: { type: Type.STRING },
                whatsapp: { type: Type.STRING },
                followUp: { type: Type.STRING },
                recovery: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    const textOutput = response.text || "{}";
    const parsedData = JSON.parse(textOutput);
    db.projects.push({
      id: "proj" + (db.projects.length + 1),
      createdAt: new Date().toISOString().split("T")[0],
      ...parsedData
    });
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    // Serve fallback simulation but log warning
    const simulatedResponse = simulateKVBGenerator(answers);
    return res.json({
      warn: "Usando inteligência KVB interna devido à falta de credenciais do Gemini no painel.",
      ...simulatedResponse
    });
  }
});

// Specialized Chat Agent Endpoint
app.post("/api/chat-agent", async (req, res) => {
  const { agent, message, chatHistory } = req.body;
  if (!agent) return res.status(400).json({ error: "Agente é obrigatório" });

  const agentInstructions: { [key: string]: string } = {
    Site: `Você é o Especialista em Sites da KVB System. Você projeta e programa as melhores soluções usando HTML, CSS, JavaScript, React e SEO avançado. Responda detalhando códigos de exemplo, ideias de layout modernas, focadas em alta conversão e estética.`,
    Marketing: `Você é o Especialista em Marketing Digital da KVB System. Você desenvolve estratégias de conteúdo imbatíveis, calendários editoriais, ideias de posts, roteiros práticos para Reels altamente magnéticos e Stories que engajam e vendem produtos/serviços.`,
    Tráfego: `Você é o Especialista em Tráfego Pago da KVB System. Seu foco é anúncios em Meta Ads e Google Ads. Você cria estratégias de funis e distribuição de verba, públicos-alvos certeiros, segmentações profissionais, copies persuasivas e orientações de criativos de alta escala para as campanhas de marketing dos clientes.`,
    Automação: `Você é o Especialista em Automações da KVB System. Você desenvolve fluxos operacionais incríveis integrando o WhatsApp aos CRMs, criando funis inteligentes, e-mails automáticos, e rotinas de follow-up que aumentam a conversão do time de vendas. Referencie ferramentas como N8N, Make e Zapier em suas respostas.`
  };

  const instruction = agentInstructions[agent] || "Você é um consultor KVB System especialista no nicho especificado.";
  
  const historyPrompt = chatHistory 
    ? chatHistory.map((h: any) => `${h.sender === "user" ? "Usuário" : "Agente"}: ${h.text}`).join("\n") 
    : "";

  const fullPrompt = `
${instruction}

Histórico da conversa:
${historyPrompt}

Mensagem do usuário:
${message}

Responda diretamente ao usuário em português brasileiro. Seja conciso, prático e muito atencioso, fornecendo insights dignos de um profissional sênior da agência KVB.
`;

  const gemini = getGeminiClient();
  if (!gemini) {
    const fallbackAnswer = simulateAgentResponse(agent, message);
    return res.json({ text: fallbackAnswer });
  }

  try {
    const response = await generateContentWithRetryAndFallback(gemini, {
      model: "gemini-3.5-flash",
      contents: fullPrompt,
    });
    return res.json({ text: response.text });
  } catch (err) {
    console.error("Agent chat Gemini error:", err);
    const fallbackAnswer = simulateAgentResponse(agent, message);
    return res.json({ text: fallbackAnswer + " (Iniciando modo offline local - Sem conexão com Gemini API)" });
  }
});


// ---------------- HELPER SIMULATION FUNCTIONS ----------------

function simulateKVBGenerator(answers: any) {
  const company = answers.companyName || "Sua Empresa";
  const niche = answers.niche || "Serviços";
  const colorsText = answers.favColors || "Neutras com tom dourado suave";
  const tone = answers.toneOfVoice || "Profissional / Convincente";
  const objective = answers.objective || "Aumentar faturamento e leads qualificados";

  return {
    name: `Projeto Scale para ${company}`,
    niche: niche,
    site: {
      structure: "Página Única Landing Page: Hero → Prova Social → Portfólio de Serviços → Benefícios Exclusivos → Seção do Fundador → Rodapé e Widget de WhatsApp flutuante.",
      colors: `Paleta principal baseada em [${colorsText}]. Sugestão de Contraste: Slate Blue (#0B192C) como primária, Off-White (#F9F9F9) para o fundo, e Gold Accent (#F3C623) para as Tags de CTA e Destaques.`,
      sections: "Navbar Fixa Minimalista, Banner Principal com Proposta Única de Valor (UVP), Vídeo institucional integrado, Cards de Especialidades Grid Responsivo, FAQ acordeão com perguntas recorrentes, Rodapé com links de contato e RGPD.",
      copy: `Cansado de perder clientes para concorrentes sem identidade? A KVB System estruturou o método perfeito para a ${company} captar leads automaticamente todo santo dia. Através de um site ultra-veloz focado no público de ${niche}, convertemos meros visitantes em clientes reais de forma incansável. Saiba mais agora.`,
      textos: "Foque nos principais diferenciais informados: agilidade, exclusividade nos atendimentos e processos modernos. Seção de depoimentos deve enfatizar fotos de antes e depois dos clientes satisfeitos.",
      seo: `${niche} premium, onde agendar consultoria de ${niche}, ${company} contatos, servicos de ${niche} em São Paulo`,
      cta: "Quero Falar com um Consultor pelo WhatsApp"
    },
    marketing: {
      calendar: "Semana 1: Conexão e Bastidores (Storytelling); Semana 2: Autoridade e Quebra de Objeções comuns no nicho; Semana 3: Reels Viral focado em curiosidade; Semana 4: Oferta Direta do Combo de Atendimento.",
      postIdeas: `Ideia 1: 3 Segredos sobre ${niche} que seus concorrentes escondem a todo custo!\nIdeia 2: Bastidores de como a ${company} organiza os projetos da semana.\nIdeia 3: Depoimento manuscrito de cliente real contando os resultados da transformação.`,
      reelsScripts: `Vídeo Reels de alta dinâmica: Começa com o gestor apontando pra câmera com texto interativo 'Se você faz isto na área de ${niche}, pare imediatamente!'. Mostre um corte acelerado de um erro comum da concorrência e mude o frame para o jeito certo implementado por você, sorrindo e mostrando elegância no escritório. Áudio: Música eletrônica de alta energia em crescendo.`,
      captions: `Legenda Premium: Economizar tempo no operacional é o segredo para faturar 10x mais. Se você quer de fato transformar a reputação da sua marca hoje, descubra o passo a passo que desenhamos para a ${company}. Fale conosco pelo link na Bio.`,
      hashtags: "#crescimento #negociosdigitais #marketingparaempresas #geracaodeleads #sucesso",
      growthStrategy: "Disparo de carrosséis compartilháveis no LinkedIn focado em decisores corporativos (CEOs e Diretores) e postagens diárias de minitutoriais rápidos em vídeo utilizando Inteligência Artificial."
    },
    traffic: {
      target: "Profissionais liberais, gerentes de compra, empreendedores locais de 30-55 anos com interesses em ferramentas de produtividade, inovação e bem-estar.",
      creatives: "Design minimalista estilo Notion mostrando a tela de agendamentos lotando e texto: 'Menos tarefas repetitivas, mais faturamento em 30 dias para seu estúdio. Conheça a nossa assessoria.'",
      copy: `Automatize o seu fluxo de captação de clientes sem depender da sorte de indicações. Descubra como a ${company} alcançou os melhores leads corporativos através de campanhas programadas de alta performance no Meta Ads. Clique para ver.`,
      strategies: "Campanha em formato de Tráfego Direto para página de captura com retargeting focado de 3 dias no Instagram dos visitantes que acessaram a página mas não converteram.",
      segmentation: "Meta Ads Segmento: Interessados em Negócios locals, Desenvolvimento Web, Finanças Digitais. Localização: Principais capitais brasileiras, excluindo concorrentes do próprio nicho geograficamente."
    },
    automation: {
      flowchart: "Lead chega via Anúncio → Mensagem Inicial automatizada com Menu dinâmico → Seletor inteligente de setor → Envio automático de portfólio PDF → Lembrete automático após 15 minutos caso interrompa o funil.",
      funnel: "Atendimento no Funil de Filtro: O robô solicita o nome e qual o orçamento desejado pelo cliente para separar os curiosos do público de alta renda prioritário.",
      messages: `Olá! Seja muito bem-vindo ao WhatsApp Oficial da ${company}. Sou o assistente virtual inteligente e estou aqui para agilizar seu atendimento. Como posso te apoiar hoje?\n1 - Conhecer nossos Serviços e Preços\n2 - Falar com o Gerente Responsável\n3 - Solicitar Suporte de Contratos`,
      whatsapp: "Roteamento e alertas diretos em tempo real ao time interno da agência KVB via webhook do N8N acionando o canal de Slack com as notas do Lead.",
      followUp: "Sondagem de Follow-up 24h: 'Olá! Notei que ontem estávamos conversando sobre soluções de marketing. Para não atrasar seu planejamento estratégico desta semana, gostaria de fechar uma ligação rápida hoje de 10 minutinhos?'",
      recovery: "Rotina de Reativação Trimestral: Envio de mensagem personalizada oferecendo uma auditoria técnica gratuita dos robôs de atendimento atuais para identificar pontos de desperdício financeiro."
    }
  };
}

function simulateAgentResponse(agent: string, userMessage: string): string {
  const responses: { [key: string]: string[] } = {
    Site: [
      "Compreendo perfeitamente o seu objetivo. Do ponto de vista de desenvolvimento Web, recomendo utilizar componentes React modularizados e Tailwind CSS para obter a melhor performance em dispositivos móveis. Uma boa prática de SEO é otimizar as imagens para o formato WebP e manter as tags H1 e meta-description estritamente alinhadas com palavras-chave de intenção de compra rápida.",
      "Para essa landing page, recomendo o seguinte código CSS/HTML minimalista para estruturar um botão magnético de CTA de alta conversão: utilize uma cor de destaque vibrante que mude o gradiente suave no hover, e aplique um efeito de 'pulse' para prender o olhar do visitante imediatamente no botão.",
    ],
    Marketing: [
      "Excelente ponto. No marketing digital de alta conversão, menos é mais. Recomendo um calendário editorial baseado em 3 pilares: Educação técnica (50%), Bastidores humanos de processos (30%), e Oferta direta persuasiva (20%). O segredo do Reels que viraliza é prender a atenção nos primeiros 3 segundos com um gancho polêmico ou uma pergunta de quebra de crença limitante.",
      "As melhores hashtags no momento para buscar autoridade nacional são mesclar hashtags amplas (como #negociosdigitais) com termos específicos de subnicho geolocalizado. Lembre-se também de que um designer sempre prefere imagens reais com boa luz a vetores prontos de bancos de imagens gratuitos nos Stories.",
    ],
    Tráfego: [
      "Interessante! O erro de 90% das agências é investir tudo em verba rasa para público frio. O recomendável é criar campanhas estruturadas: 60% de orçamento para topo de funil (público de interesses amplos baseados em concorrentes), 20% para Lookalike de clientes efetuados, e 20% exclusivo de remarketing para quem engajou no Instagram nos últimos 7 dias.",
      "No Meta Ads ou Google Ads, o que mais define a taxa de cliques (CTR) é a primeira linha do criativo e o apelo do título na imagem. Utilize copies focadas na dor imediata da perda de tempo ou no desperdício de caixa para fazer com que as empresas cliquem e entrem no WhatsApp ávidas por uma reunião.",
    ],
    Automações: [
      "Para automações robustas, recomendo muito o uso do N8N ou Make atuando como orquestradores de back-end. Você pode usar uma instância de WhatsApp webhooks configurada via Evolution API. O fluxo básico é: ler recepção no webhook → disparar GPT para classificar nicho do lead → salvar no ERP KVB System via HTTP Request → e rotear no CRM para o vendedor ativo.",
      "Não esqueça de configurar condicionais de follow-up automático: se o cliente não responde na etapa de envio de proposta em 24h, o robô dispara uma mensagem humanizada oferecendo flexibilidade de formato de pagamento para desbloquear a negociação sem precisar de intervenção manual do gestor comercial."
    ]
  };

  const selectedList = responses[agent] || responses["Site"];
  const randomIndex = Math.floor(Math.random() * selectedList.length);
  return `[Agente Especialista KVB] Olá! Recebi sua mensagem: "${userMessage}".\n\n${selectedList[randomIndex]}`;
}


// Start Vite and serve files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
