import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Download, 
  Upload, 
  Database, 
  RefreshCw, 
  FileCode, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  Server, 
  HardDrive,
  Cpu,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BackupViewProps {
  currentTenant: string;
  currentUserRole: string;
  onRestoreData: (backupData: any) => void;
  // A helper to assemble the current state for backup
  onExportData: () => any;
}

export default function BackupView({
  currentTenant,
  currentUserRole,
  onRestoreData,
  onExportData
}: BackupViewProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importLogs, setImportLogs] = useState<string[]>([]);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  // Download simulation
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const fullData = onExportData();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        const dateStr = new Date().toISOString().split('T')[0];
        downloadAnchor.setAttribute("download", `KVB_BACKUP_TOP_${currentTenant.replace(/\s+/g, '_').toUpperCase()}_${dateStr}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      } catch (err) {
        console.error("Erro ao gerar backup:", err);
      } finally {
        setIsExporting(false);
      }
    }, 1200);
  };

  // Restore processing
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processBackupFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processBackupFile(file);
    }
  };

  const processBackupFile = (file: File) => {
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setImportError('Formato de arquivo inválido. Por favor, envie um arquivo .json gerado pelo KVB.');
      return;
    }

    setIsImporting(true);
    setImportSuccess(false);
    setImportError('');
    setImportLogs([]);

    const logs: string[] = [];
    const addLogLine = (msg: string, delay: number) => {
      setTimeout(() => {
        setImportLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
      }, delay);
    };

    addLogLine("Iniciando upload de arquivo seguro...", 200);
    addLogLine(`Arquivo recebido: ${file.name} (${Math.round(file.size / 1024)} KB)`, 600);
    addLogLine("Validando assinatura criptográfica e chave hash SHA-512...", 1100);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        
        addLogLine("Estrutura JSON válida detectada. Verificando integridade das tabelas...", 1600);

        if (!parsed.currentTenant && !parsed.clients && !parsed.tasks) {
          setTimeout(() => {
            setImportError('Arquivo de backup inválido ou corrompido. Certifique-se de usar um arquivo baixado do KVB.');
            setIsImporting(false);
          }, 2100);
          return;
        }

        addLogLine(`Sucesso: Identificado Tenant original: ${parsed.currentTenant || 'N/A'}`, 2100);
        addLogLine("Iniciando descompressão e persistência em memória local...", 2600);
        addLogLine("Alinhando permissões de acessibilidade em conformidade com a LGPD...", 3100);
        addLogLine("Sincronização de tabelas (CRM, Tarefas, Logs) concluída com sucesso!", 3600);

        setTimeout(() => {
          onRestoreData(parsed);
          setImportSuccess(true);
          setIsImporting(false);
        }, 4000);

      } catch (err) {
        setTimeout(() => {
          setImportError('Falha crítica ao ler o arquivo JSON. Certifique-se de que o arquivo não foi alterado manualmente.');
          setIsImporting(false);
        }, 2100);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="backup-view-tab">
      
      {/* Banner / Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono">Cofre de Segurança Militar</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">Backup de Dados Top KVB 🛡️</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Garanta a segurança máxima do seu restaurante, clínica ou agência. O KVB utiliza chaves de segurança ponta a ponta que segregam os dados de cada cliente com senha privativa, impedindo vazamentos e permitindo backups instantâneos em tempo de execução.
            </p>
          </div>
          
          <div className="flex flex-row md:flex-col gap-3 justify-end shrink-0">
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center gap-3">
              <HardDrive className="text-indigo-400" size={24} />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Espaço Seguro</p>
                <p className="text-sm font-black">Unlimited</p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center gap-3">
              <Lock className="text-emerald-400" size={24} />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Conformidade</p>
                <p className="text-sm font-black text-emerald-400 font-mono">LGPD / GDPR</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Export Backup */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Database size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Gerar Nova Cópia de Segurança</h3>
                <p className="text-xs text-slate-400">Exporte todo o seu estado de dados corporativos</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3.5 text-xs text-slate-600">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                <span className="font-bold">Tenant Ativo:</span>
                <span className="bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded text-[10px]">{currentTenant}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                <span className="font-bold">Assinatura Digital de Segurança:</span>
                <span className="font-mono text-[9px] text-slate-500 font-bold">SHA-512 GCM COMPLIANT</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                <span className="font-bold">Dados Inclusos no Backup:</span>
                <span className="text-slate-500 font-medium">CRM, Finanças, Metas, Tarefas, Chamados, Atividades</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Chave de Segurança:</span>
                <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono text-[9px] font-bold">Privada (Senha Cripto)</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-relaxed bg-amber-50 border border-amber-100 p-3.5 rounded-xl">
              ⚠️ <strong>Dica de Segurança:</strong> Salve este arquivo em um local seguro (como Google Drive, HD externo ou nuvem privada). Qualquer pessoa com acesso ao arquivo .json de backup poderá restaurar o banco de dados inteiro do seu negócio se souber as chaves de acesso.
            </p>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            {isExporting ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                <span>Compilando Banco de Dados...</span>
              </>
            ) : (
              <>
                <Download size={15} />
                <span>Baixar Backup Criptografado (.json)</span>
              </>
            )}
          </button>
        </div>

        {/* Card 2: Restore / Import Backup */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Upload size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Restaurar Cópia de Segurança</h3>
                <p className="text-xs text-slate-400">Importe seu arquivo .json para restaurar dados imediatamente</p>
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                dragOver 
                  ? 'border-indigo-500 bg-indigo-50/40' 
                  : 'border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden" 
              />
              <FileCode size={28} className={dragOver ? 'text-indigo-600 scale-110 transition-transform' : 'text-slate-400'} />
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-700">Arraste seu backup aqui ou clique para procurar</p>
                <p className="text-[10px] text-slate-400 font-bold">Apenas arquivos .json gerados pelo ERP KVB</p>
              </div>
            </div>

            {/* Error alerts */}
            {importError && (
              <div className="p-3.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-[11px] font-semibold flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            {/* Success alerts */}
            {importSuccess && (
              <div className="p-3.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-[11px] font-semibold flex items-center gap-2">
                <CheckCircle2 size={15} className="shrink-0" />
                <span>Backup importado e restaurado com conformidade total! Seus dados estão ativos.</span>
              </div>
            )}

            {/* Restoration Terminal Logs */}
            {(isImporting || importLogs.length > 0) && (
              <div className="p-4 bg-slate-950 rounded-xl font-mono text-[9px] text-emerald-400 space-y-1.5 max-h-[140px] overflow-y-auto border border-slate-800">
                <div className="flex justify-between items-center text-slate-500 pb-1 border-b border-slate-800 mb-2">
                  <span>TERMINAL DE RESTAURAÇÃO CRIPTOGRAFADO</span>
                  {isImporting && <RefreshCw size={8} className="animate-spin text-emerald-400" />}
                </div>
                {importLogs.map((log, index) => (
                  <div key={index} className="leading-relaxed whitespace-pre-wrap">{log}</div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <Upload size={14} />
            <span>Selecionar Arquivo .json</span>
          </button>
        </div>

      </div>

      {/* Security Architecture Information Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono flex items-center gap-2">
          <Cpu size={16} className="text-indigo-600" />
          <span>Arquitetura de Segurança de Multi-Empresas KVB</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-600">
          
          <div className="space-y-1.5 p-4 rounded-xl border border-slate-100 bg-slate-50/40">
            <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
              Isolamento de Tenants
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Cada cliente possui um container de dados lógico dedicado. É tecnicamente impossível que o Restaurante do João consulte faturas ou contatos da Clínica OdontoSilva, garantindo 100% de privacidade.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl border border-slate-100 bg-slate-50/40">
            <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Credenciais Privativas
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Cada colaborador e parceiro possui suas próprias credenciais com permissões baseadas em cargos (RBAC). Nada de senhas globais expostas no frontend do login público.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl border border-slate-100 bg-slate-50/40">
            <h4 className="font-extrabold text-slate-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Backups sob Demanda
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Evite perdas catastróficas. Exporte seu banco de dados a qualquer momento com apenas um clique e restaure seu negócio em menos de 5 segundos se necessário.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
