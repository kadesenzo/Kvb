import React, { useState } from 'react';
import { 
  GitFork, 
  Play, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Zap, 
  MessageSquare, 
  Mail, 
  Database, 
  Clock, 
  Compass, 
  Cpu,
  X
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'Trigger' | 'WhatsApp' | 'Email' | 'CRM' | 'Delay';
  title: string;
  status: 'idle' | 'success' | 'error' | 'running';
  config: string;
}

export default function AutomationView() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 'n1', type: 'Trigger', title: 'Webhook Recebido (Stripe / Pix)', status: 'success', config: 'Endpoint: /api/webhook/pagamento' },
    { id: 'n2', type: 'WhatsApp', title: 'Disparo de Boas-Vindas WhatsApp', status: 'success', config: 'Template: Boas-Vindas Completo' },
    { id: 'n3', type: 'CRM', title: 'Adicionar Cliente no KVB CRM', status: 'idle', config: 'Status: Onboarding Inicial' },
    { id: 'n4', type: 'Email', title: 'Enviar Contrato de Assinatura Eletrônica', status: 'idle', config: 'Template: Anexo Proposta PDF' }
  ]);

  const [activeLogs, setActiveLogs] = useState<string[]>([
    "[09:00:00] Sistema Operacional KVB OS ativo.",
    "[09:00:01] Monitorando portas de Webhook Stripe na porta 3000..."
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddNode = (type: WorkflowNode['type']) => {
    const titles = {
      Trigger: 'Webhook de Entrada customizado',
      WhatsApp: 'Notificação Reativa WhatsApp',
      Email: 'Disparo de E-mail Corporativo',
      CRM: 'Criar ou Editar Entrada de Negócio',
      Delay: 'Aguardar período de tempo (Delay)'
    };

    const newN: WorkflowNode = {
      id: 'node_' + Math.random().toString(36).substr(2, 4),
      type,
      title: titles[type],
      status: 'idle',
      config: 'Configuração padrão de módulo'
    };
    setNodes(prev => [...prev, newN]);
    setActiveLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Bloco [${type}] adicionado ao fluxo.`]);
  };

  const handleDeleteNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
  };

  const handleTestWorkflow = () => {
    setIsRunning(true);
    setActiveLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Iniciando teste automatizado de fluxo...`]);

    let nodeIndex = 0;
    
    const runNextNode = () => {
      if (nodeIndex >= nodes.length) {
        setIsRunning(false);
        setActiveLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Fluxo executado com 100% de sucesso operacional! 🎉`]);
        return;
      }

      const currentNode = nodes[nodeIndex];
      setNodes(prev => prev.map((n, idx) => {
        if (idx === nodeIndex) return { ...n, status: 'running' };
        return n;
      }));

      setTimeout(() => {
        setNodes(prev => prev.map((n, idx) => {
          if (idx === nodeIndex) return { ...n, status: 'success' };
          return n;
        }));
        
        setActiveLogs(prev => [
          ...prev, 
          `[${new Date().toLocaleTimeString()}] Módulo [${currentNode.title}] executou com sucesso.`
        ]);
        
        nodeIndex++;
        runNextNode();
      }, 1000);
    };

    runNextNode();
  };

  return (
    <div className="space-y-6" id="automation-view">
      {/* Upper info description bar */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            <Cpu size={18} className="text-indigo-600 animate-pulse" />
            Central de Automações Visuais (Estilo N8N & Make)
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Crie fluxogramas operacionais sem escrever uma única linha de código. Integre pagamentos, CRMs, WhatsApp e alertas de faturas.
          </p>
        </div>

        <button
          onClick={handleTestWorkflow}
          disabled={isRunning || nodes.length === 0}
          className="py-2 px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <Play size={13} className="fill-white" />
          Executar Teste de Fluxo
        </button>
      </div>

      {/* Grid: Canvas visual designer and active log output console */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Toolbox panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">Adicionar Conectores</h3>
            <p className="text-[10px] text-slate-400">Arraste ou clique para adicionar novos gatilhos e ações operacionais ao fluxo ativo.</p>
            
            <div className="space-y-1.5">
              <button 
                onClick={() => handleAddNode('Trigger')}
                className="w-full p-2 bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <Zap size={14} className="text-amber-500" />
                Webhook Gatilho (Trigger)
              </button>
              
              <button 
                onClick={() => handleAddNode('WhatsApp')}
                className="w-full p-2 bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <MessageSquare size={14} className="text-emerald-500" />
                Módulo WhatsApp API
              </button>

              <button 
                onClick={() => handleAddNode('Email')}
                className="w-full p-2 bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <Mail size={14} className="text-sky-500" />
                Módulo E-mail Corporativo
              </button>

              <button 
                onClick={() => handleAddNode('CRM')}
                className="w-full p-2 bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <Database size={14} className="text-indigo-500" />
                Ação Integrada CRM
              </button>

              <button 
                onClick={() => handleAddNode('Delay')}
                className="w-full p-2 bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <Clock size={14} className="text-slate-500" />
                Aguardar Tempo (Delay)
              </button>
            </div>
          </div>
        </div>

        {/* Node visual graph space */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[320px] relative overflow-hidden flex flex-col items-center justify-center space-y-4">
            {/* Blueprint Grid mesh background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            {nodes.length === 0 ? (
              <div className="text-center p-8 space-y-2 z-10">
                <p className="text-xs font-bold text-slate-500">Nenhum conector adicionado</p>
                <p className="text-[10px] text-slate-400">Clique nos botões laterais para montar sua primeira automação integrada.</p>
              </div>
            ) : (
              <div className="w-full max-w-xl space-y-4 z-10">
                {nodes.map((node, index) => (
                  <div key={node.id} className="relative flex flex-col items-center">
                    {/* Visual connection pipe */}
                    {index > 0 && (
                      <div className="w-1.5 h-6 bg-indigo-200 -mt-2 mb-2"></div>
                    )}

                    <div className="w-full bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-2xs hover:border-indigo-400 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg text-white font-bold ${
                          node.type === 'Trigger' ? 'bg-amber-500' :
                          node.type === 'WhatsApp' ? 'bg-emerald-500' :
                          node.type === 'Email' ? 'bg-sky-500' :
                          node.type === 'CRM' ? 'bg-indigo-600' :
                          'bg-slate-500'
                        }`}>
                          {node.type === 'Trigger' ? <Zap size={15} /> :
                           node.type === 'WhatsApp' ? <MessageSquare size={15} /> :
                           node.type === 'Email' ? <Mail size={15} /> :
                           node.type === 'CRM' ? <Database size={15} /> :
                           <Clock size={15} />}
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-800">{node.title}</h4>
                          <span className="text-[9px] font-mono text-slate-400">{node.config}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Status visual signal */}
                        <span className={`w-2.5 h-2.5 rounded-full inline-block ${
                          node.status === 'success' ? 'bg-emerald-500' :
                          node.status === 'running' ? 'bg-indigo-500 animate-ping' :
                          node.status === 'error' ? 'bg-rose-500' :
                          'bg-slate-300'
                        }`}></span>
                        
                        <button 
                          onClick={() => handleDeleteNode(node.id)}
                          className="p-1 hover:bg-slate-50 text-slate-400 hover:text-rose-600 rounded"
                          title="Excluir módulo"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active logs output terminal console */}
          <div className="bg-slate-950 text-emerald-400 font-mono text-[11px] p-4 rounded-2xl border border-slate-900 space-y-2 shadow-inner">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Console de Execução e Logs</span>
              <button 
                onClick={() => setActiveLogs([])}
                className="text-slate-600 hover:text-slate-400 text-[9px] font-bold uppercase cursor-pointer"
              >
                Limpar Console
              </button>
            </div>
            
            <div className="max-h-[120px] overflow-y-auto space-y-1">
              {activeLogs.length === 0 ? (
                <p className="text-slate-500">Console vazio. Execute um teste de fluxo.</p>
              ) : (
                activeLogs.map((log, index) => (
                  <p key={index}>{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
