export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDateString(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

export function exportToCSV(data: any[], headers: string[], keys: string[], filename: string) {
  // Simple Excel-friendly CSV with BOM for special characters (like á, ç, õ, etc.)
  let csvContent = "\uFEFF";
  
  // Headers row
  csvContent += headers.join(";") + "\r\n";
  
  // Data rows
  data.forEach((item) => {
    const row = keys.map(key => {
      let val = item[key];
      if (val === undefined || val === null) {
        return "";
      }
      // If it's an array or object, stringify
      if (typeof val === 'object') {
        return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      }
      
      const valStr = String(val);
      // Escape semicolons and double quotes
      if (valStr.includes(";") || valStr.includes("\n") || valStr.includes('"')) {
        return `"${valStr.replace(/"/g, '""')}"`;
      }
      return valStr;
    });
    csvContent += row.join(";") + "\r\n";
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportContractToHTMLPrint(contract: any) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("O bloqueador de popups impediu a impressão do contrato. Por favor, permita popups neste site.");
    return;
  }
  
  const signedDateStr = contract.signedAt ? new Date(contract.signedAt).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR');
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Contrato KVB System - ${contract.clientName}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 40px;
            color: #333;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            color: #1a2a3a;
            margin: 0;
          }
          .subtitle {
            font-size: 14px;
            color: #666;
            margin-top: 5px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1a2a3a;
            margin-top: 25px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
          }
          .field {
            margin-bottom: 10px;
          }
          .label {
            font-weight: bold;
            color: #555;
          }
          .content-block {
            background: #fbfbfb;
            border: 1px solid #eee;
            padding: 15px;
            font-size: 14px;
            white-space: pre-line;
            border-radius: 4px;
          }
          .signatures {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
          }
          .signature-box {
            width: 45%;
            text-align: center;
            border-top: 1px solid #777;
            padding-top: 10px;
            margin-top: 50px;
          }
          .stamp {
            border: 2px dashed #D4AF37;
            color: #D4AF37;
            padding: 5px 10px;
            display: inline-block;
            font-size: 12px;
            font-weight: bold;
            border-radius: 4px;
            margin-bottom: 10px;
            transform: rotate(-3deg);
          }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="text-align: right;" class="no-print">
          <button onclick="window.print()" style="padding: 8px 16px; background-color: #2563EB; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 14px; margin-bottom: 20px;">
            Imprimir ou Salvar em PDF
          </button>
        </div>
        
        <div class="header">
          <div class="title">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</div>
          <div class="subtitle">KVB System & Tecnologia S/A</div>
        </div>

        <div class="field"><span class="label">Contrato ID:</span> #${contract.id}</div>
        <div class="field"><span class="label">Data de Emissão:</span> ${signedDateStr}</div>

        <div class="section-title">1. AS PARTES CONTRA TANTES</div>
        <div class="field"><span class="label">CONTRATADA:</span> KVB System, inscrita no CNPJ sob o nº 12.345.678/0001-99, com sede na Av. Paulista, São Paulo - SP.</div>
        <div class="field"><span class="label">CONTRATANTE:</span> ${contract.clientName}</div>
        <div class="field"><span class="label">Documento (CPF/CNPJ):</span> ${contract.document || "Não informado"}</div>
        <div class="field"><span class="label">Endereço Comercial:</span> ${contract.address || "Não informado"}</div>

        <div class="section-title">2. OBJETO DO CONTRATO</div>
        <p>O presente contrato tem como objeto a prestação de serviços digitais especializados na categoria de: <strong>${contract.serviceType}</strong> pela Contratada em favor do Contratante, englobando o planejamento estratégico, desenvolvimento técnico e suporte contratual devidamente acordados.</p>

        <div class="section-title">3. DETALHAMENTO DE VALORES E HONORÁRIOS</div>
        <div class="field"><span class="label">Valor Pactuado:</span> <strong>${contract.value}</strong></div>
        <p>O pagamento dar-se-á conforme as datas acordadas e ciclo de faturamento ativo. Eventuais atrasos ensejarão multa de 2% sob o montante inadimplido e juros de mora.</p>

        <div class="section-title">4. ASSINATURA E ACEITE DIGITAL</div>
        <p>Por estarem justos e acordados, as partes assinam o presente instrumento por meio de certificação e validação digital KVB Security, que confere ampla validade jurídica de acordo com a legislação de assinaturas eletrônicas do Brasil (MP 2.200-2/2001).</p>
        
        <div class="signatures">
          <div class="signature-box">
            <div class="stamp">ASSINADO DIGITALMENTE</div>
            <div>KVB System & Tecnologia</div>
            <div style="font-size: 11px; color: #888;">Chave de Autenticidade: kvb_sec_99182390a</div>
          </div>
          <div class="signature-box">
            <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 24px; color: #1e3a8a; margin-bottom: 10px;">
              ${contract.signature}
            </div>
            <div>${contract.clientName}</div>
            <div style="font-size: 11px; color: #888;">Validado via IP e CPF/CNPJ às ${new Date(contract.signedAt || Date.now()).toLocaleTimeString('pt-BR')}</div>
          </div>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
}
