export interface ClientHistory {
  date: string;
  info: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  instagram: string;
  niche: string;
  plan: string;
  entryDate: string;
  monthlyValue: number;
  status: 'Ativo' | 'Em negociação' | 'Cancelado';
  history: ClientHistory[];
}

export interface Contract {
  id: string;
  clientId: string;
  clientName: string;
  document: string;
  address: string;
  serviceType: string;
  value: string;
  signature: string;
  signedAt: string;
}

export interface Meeting {
  id: string;
  clientName: string;
  company: string;
  phone: string;
  instagram: string;
  niche: string;
  stage: 'Lead' | 'Reunião marcada' | 'Proposta enviada' | 'Fechou' | 'Perdido';
  date: string;
  notes: string;
  closedValue: number;
}

export interface Task {
  id: string;
  title: string;
  client: string;
  status: 'Pendente' | 'Em desenvolvimento' | 'Concluído';
  priority: 'Baixa' | 'Média' | 'Alta' | 'Urgente';
  assignedTo: string;
  category: string;
}

export interface Ticket {
  id: string;
  clientId: string;
  clientName: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface FinanceEntry {
  id: string;
  client: string;
  type: string;
  amount: number;
  date: string;
  status: string;
}

export interface FinanceExit {
  id: string;
  desc: string;
  amount: number;
  date: string;
}

export interface FinanceCommission {
  id: string;
  representative: string;
  client: string;
  amount: number;
  date: string;
}

export interface UnpaidClient {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  delayDays: number;
}

export interface FinanceState {
  monthlyGoal: number;
  entries: FinanceEntry[];
  exits: FinanceExit[];
  commissions: FinanceCommission[];
  unpaid: UnpaidClient[];
}

export interface ProjectSection {
  structure: string;
  colors: string;
  sections: string;
  copy: string;
  textos: string;
  seo: string;
  cta: string;
}

export interface MarketingSection {
  calendar: string;
  postIdeas: string;
  reelsScripts: string;
  captions: string;
  hashtags: string;
  growthStrategy: string;
}

export interface TrafficSection {
  target: string;
  creatives: string;
  copy: string;
  strategies: string;
  segmentation: string;
}

export interface AutomationSection {
  flowchart: string;
  funnel: string;
  messages: string;
  whatsapp: string;
  followUp: string;
  recovery: string;
}

export interface Project {
  id: string;
  name: string;
  niche: string;
  clientName: string;
  createdAt: string;
  site: ProjectSection;
  marketing: MarketingSection;
  traffic: TrafficSection;
  automation: AutomationSection;
}

export interface SupportTicket {
  id: string;
  clientName: string;
  title: string;
  message: string;
  status: string;
  date: string;
}

export interface KvbServices {
  site: number;
  automation: number;
  marketing: number;
  specialComboFirstMonth: number;
  specialComboMonthly: number;
}
