/**
 * ANAMNESE NEUROPEDIÁTRICA — MUTIRÃO
 * Dra. Fabiana Mugnol — Neuropediatria
 *
 * Gera automaticamente o Google Forms completo, com:
 *  - ramificação condicional por faixa etária;
 *  - M-CHAT-R/F (20 itens) para 16-30 meses;
 *  - rastreio de sinais nucleares de TEA (DSM-5-TR) acima de 30 meses;
 *  - SNAP-IV (18 itens, versão MTA) a partir dos 4 anos;
 *  - seções de exame físico/neurológico e desfecho para a equipe;
 *  - planilha de respostas vinculada automaticamente.
 *
 * COMO USAR: menu Executar > criarAnamneseMutirao. Autorize quando solicitado.
 * Os links do formulário aparecem no Registro de execução (Ctrl+Enter).
 */

function criarAnamneseMutirao() {

  var form = FormApp.create('Anamnese Neuropediátrica — Mutirão');

  form.setTitle('Anamnese Neuropediátrica — Mutirão')
      .setDescription(
        'Instrumento estruturado de triagem e registro clínico para atendimento em mutirão de neuropediatria.\n\n' +
        'As seções 1 a 12 podem ser preenchidas pelo responsável ou pela equipe de acolhimento. ' +
        'As seções 13 e 14 são de preenchimento exclusivo da equipe médica.\n\n' +
        'PROTEÇÃO DE DADOS — Este formulário coleta dados pessoais sensíveis de saúde de criança ou adolescente ' +
        '(LGPD, Lei 13.709/2018, art. 5º, II; art. 11; art. 14). O preenchimento pressupõe consentimento ' +
        'do responsável legal, registrado ao final. Guarde o arquivo de respostas em conta institucional com acesso restrito.'
      )
      .setProgressBar(true)
      .setAllowResponseEdits(true)
      .setConfirmationMessage('Anamnese registrada com sucesso. Obrigada pela colaboração.');

  // ----------------------------------------------------------------------
  // Funções auxiliares
  // ----------------------------------------------------------------------
  function texto(t, ajuda, obrig) {
    var i = form.addTextItem().setTitle(t);
    if (ajuda) i.setHelpText(ajuda);
    i.setRequired(obrig === true);
    return i;
  }
  function paragrafo(t, ajuda, obrig) {
    var i = form.addParagraphTextItem().setTitle(t);
    if (ajuda) i.setHelpText(ajuda);
    i.setRequired(obrig === true);
    return i;
  }
  function data(t, obrig) {
    var i = form.addDateItem().setTitle(t);
    i.setRequired(obrig === true);
    return i;
  }
  function escolha(t, opcoes, ajuda, obrig, outro) {
    var i = form.addMultipleChoiceItem().setTitle(t).setChoiceValues(opcoes);
    if (outro === true) i.showOtherOption(true);
    if (ajuda) i.setHelpText(ajuda);
    i.setRequired(obrig === true);
    return i;
  }
  function multipla(t, opcoes, ajuda, obrig, outro) {
    var i = form.addCheckboxItem().setTitle(t).setChoiceValues(opcoes);
    if (outro === true) i.showOtherOption(true);
    if (ajuda) i.setHelpText(ajuda);
    i.setRequired(obrig === true);
    return i;
  }
  function grade(t, linhas, colunas, ajuda, obrig) {
    var i = form.addGridItem().setTitle(t).setRows(linhas).setColumns(colunas);
    if (ajuda) i.setHelpText(ajuda);
    i.setRequired(obrig === true);
    return i;
  }
  function cabecalho(t, d) {
    var i = form.addSectionHeaderItem().setTitle(t);
    if (d) i.setHelpText(d);
    return i;
  }
  function secao(t, d) {
    var i = form.addPageBreakItem().setTitle(t);
    if (d) i.setHelpText(d);
    return i;
  }

  var SIM_NAO = ['Sim', 'Não', 'Não sei informar'];
  var LIKERT_SNAP = ['Nem um pouco', 'Só um pouco', 'Bastante', 'Demais'];

  // ======================================================================
  // SEÇÃO 1 — IDENTIFICAÇÃO
  // ======================================================================
  cabecalho('1. Identificação', 'Dados de identificação da criança/adolescente e do responsável.');

  data('Data do atendimento', true);
  texto('Nome completo da criança/adolescente', null, true);
  data('Data de nascimento', true);
  texto('Idade atual (anos e meses)', 'Ex.: 3 anos e 7 meses', true);
  escolha('Sexo atribuído ao nascimento', ['Feminino', 'Masculino'], null, true);
  texto('Nome completo do responsável', null, true);
  escolha('Grau de parentesco do responsável',
    ['Mãe', 'Pai', 'Avó/Avô', 'Tia/Tio', 'Guardião legal', 'Família acolhedora/Instituição'],
    null, true, true);
  texto('Telefone / WhatsApp de contato', 'Com DDD', true);
  texto('Município e bairro de residência', null, true);
  texto('Cartão Nacional de Saúde (CNS) ou CPF da criança', 'Se disponível', false);

  cabecalho('Dados escolares');
  texto('Escola em que está matriculado(a)', 'Escreva "não frequenta" se for o caso', true);
  escolha('Rede de ensino', ['Pública municipal', 'Pública estadual', 'Privada', 'Não frequenta escola'], null, true);
  texto('Ano/série e turno', 'Ex.: 2º ano — tarde', false);

  cabecalho('Origem do encaminhamento');
  escolha('Quem encaminhou para o mutirão?',
    ['Escola', 'Unidade Básica de Saúde (UBS)', 'CAPS/CAPSi', 'Pediatra', 'Demanda espontânea',
     'CRAS/CREAS', 'Conselho Tutelar', 'Determinação judicial'],
    null, true, true);
  texto('Unidade de saúde de referência', null, false);

  // ======================================================================
  // SEÇÃO 2 — QUEIXA PRINCIPAL
  // ======================================================================
  secao('2. Queixa principal e história da doença atual',
        'Descreva o motivo que trouxe a criança ao mutirão.');

  multipla('Motivo principal da consulta (pode marcar mais de um)',
    ['Atraso de fala / linguagem',
     'Atraso motor',
     'Suspeita de Transtorno do Espectro Autista (TEA)',
     'Desatenção, agitação ou impulsividade',
     'Dificuldade escolar / de aprendizagem',
     'Crises epilépticas ou eventos paroxísticos',
     'Cefaleia (dor de cabeça)',
     'Alteração de comportamento / agressividade',
     'Tiques ou movimentos involuntários',
     'Perda de habilidades já adquiridas (regressão)',
     'Alteração do tamanho da cabeça (macro ou microcefalia)',
     'Distúrbio do sono',
     'Atraso global do desenvolvimento',
     'Segunda opinião / revisão de diagnóstico'],
    null, true, true);

  paragrafo('Descreva a queixa com as suas próprias palavras',
    'Conte o que preocupa, desde quando, e o que já foi tentado.', true);

  escolha('Há quanto tempo o problema está presente?',
    ['Menos de 6 meses', '6 a 12 meses', '1 a 2 anos', 'Mais de 2 anos', 'Desde que nasceu'],
    null, true);

  cabecalho('Sinais de alerta', 'Estas respostas orientam a priorização do atendimento.');

  escolha('A criança PERDEU habilidades que já tinha (fala, marcha, contato visual, controle de esfíncteres)?',
    SIM_NAO, 'Regressão de marcos é sinal de alarme e exige investigação imediata.', true);
  paragrafo('Se sim, descreva quais habilidades foram perdidas e com que idade', null, false);
  escolha('Apresenta ou apresentou crises convulsivas?', SIM_NAO, null, true);
  escolha('Existe alguma preocupação com risco de vida, autolesão ou violência no momento?',
    ['Não', 'Sim — autolesão', 'Sim — agressividade grave', 'Sim — suspeita de violência/negligência'],
    null, true, true);

  // ======================================================================
  // SEÇÃO 3 — GESTAÇÃO, PARTO E PERÍODO NEONATAL
  // ======================================================================
  secao('3. História gestacional, perinatal e neonatal',
        'Se não souber alguma informação, responda "Não sei informar".');

  texto('Idade da mãe na gestação (anos)', null, false);
  escolha('Fez pré-natal?', ['Sim, 6 consultas ou mais', 'Sim, menos de 6 consultas', 'Não fez', 'Não sei informar'], null, true);

  multipla('Intercorrências durante a gestação',
    ['Nenhuma',
     'Hipertensão / pré-eclâmpsia',
     'Diabetes gestacional',
     'Infecção urinária de repetição',
     'Sífilis',
     'Toxoplasmose',
     'Rubéola',
     'Citomegalovírus',
     'HIV',
     'Zika vírus',
     'Sangramento / ameaça de aborto',
     'Ameaça de parto prematuro',
     'Restrição de crescimento intrauterino',
     'Alteração em ultrassonografia fetal',
     'Depressão ou ansiedade materna',
     'Não sei informar'],
    null, true, true);

  multipla('Exposições durante a gestação',
    ['Nenhuma',
     'Tabaco',
     'Álcool',
     'Drogas ilícitas',
     'Ácido valproico ou outro anticonvulsivante',
     'Antidepressivos',
     'Outros medicamentos de uso contínuo',
     'Não sei informar'],
    'A exposição pré-natal ao ácido valproico associa-se a risco elevado de comprometimento do neurodesenvolvimento.',
    true, true);

  escolha('Tipo de parto', ['Vaginal', 'Cesariana', 'Vaginal com fórceps/vácuo', 'Não sei informar'], null, true);
  texto('Idade gestacional ao nascer (semanas)', 'Ex.: 38 semanas', true);
  texto('Peso ao nascer (gramas)', 'Ex.: 3200', true);
  texto('Comprimento ao nascer (cm)', null, false);
  texto('Perímetro cefálico ao nascer (cm)', null, false);
  texto('Apgar no 1º e no 5º minuto', 'Ex.: 8/9', false);

  multipla('Intercorrências no período neonatal',
    ['Nenhuma',
     'Necessitou de reanimação na sala de parto',
     'Internação em UTI neonatal',
     'Ventilação mecânica',
     'Icterícia com necessidade de fototerapia',
     'Icterícia com necessidade de exsanguineotransfusão',
     'Hipoglicemia',
     'Sepse / infecção neonatal',
     'Convulsão neonatal',
     'Encefalopatia hipóxico-isquêmica',
     'Hipotermia terapêutica',
     'Hemorragia intracraniana',
     'Malformação congênita',
     'Não sei informar'],
    null, true, true);

  texto('Se houve internação neonatal, por quantos dias?', null, false);

  grade('Resultado das triagens neonatais',
    ['Teste do pezinho', 'Teste da orelhinha (EOA/PEATE)', 'Teste do olhinho', 'Teste do coraçãozinho', 'Teste da linguinha'],
    ['Normal', 'Alterado', 'Não realizado', 'Não sei informar'],
    null, false);

  paragrafo('Se alguma triagem foi alterada, descreva o resultado e a conduta tomada', null, false);

  // ======================================================================
  // SEÇÃO 4 — DESENVOLVIMENTO NEUROPSICOMOTOR
  // ======================================================================
  secao('4. Marcos do desenvolvimento neuropsicomotor',
        'Informe a idade aproximada, em meses, em que a criança alcançou cada marco. ' +
        'Se ainda não alcançou, escreva "ainda não".');

  texto('Sustentou a cabeça (idade em meses)', 'Esperado: até 3 meses', false);
  texto('Sentou sem apoio (idade em meses)', 'Esperado: até 9 meses', false);
  texto('Engatinhou (idade em meses)', 'Marco não obrigatório', false);
  texto('Andou sem apoio (idade em meses)', 'Esperado: até 18 meses', false);
  texto('Falou as primeiras palavras com significado (idade em meses)', 'Esperado: até 15 meses', false);
  texto('Juntou duas palavras em frase (idade em meses)', 'Esperado: até 24 meses', false);
  texto('Controle de esfíncter diurno (idade em meses)', null, false);
  texto('Controle de esfíncter noturno (idade em meses)', null, false);

  escolha('Comparando com outras crianças da mesma idade, o desenvolvimento do seu filho(a) está:',
    ['Igual ou adiantado', 'Um pouco atrasado', 'Muito atrasado', 'Não sei avaliar'], null, true);

  escolha('Como está a linguagem atualmente?',
    ['Fala frases completas e é compreendido(a) por estranhos',
     'Fala frases, mas é difícil de entender',
     'Fala apenas palavras soltas',
     'Não fala, mas se comunica por gestos',
     'Não fala e não se comunica por gestos',
     'Fala, mas repete falas prontas (ecolalia)'],
    null, true);

  // ======================================================================
  // SEÇÃO 5 — ROTEAMENTO DA TRIAGEM
  // ======================================================================
  var pbRota = secao('5. Triagem específica',
    'A próxima pergunta direciona automaticamente para o instrumento de rastreio adequado à idade.');

  var pbMchat = secao('5A. M-CHAT-R — Rastreio de TEA (16 a 30 meses)',
    'Modified Checklist for Autism in Toddlers, Revised (Robins, Fein & Barton, 2009). ' +
    'Responda pensando no comportamento habitual da criança. Se o comportamento ocorreu poucas vezes, responda "Não".');

  var pbTea = secao('5B. Rastreio de sinais nucleares de TEA (acima de 30 meses)',
    'Itens construídos a partir dos domínios diagnósticos do DSM-5-TR (APA, 2022). Não substitui avaliação diagnóstica.');

  var pbSnap = secao('5C. SNAP-IV — Rastreio de TDAH (a partir dos 4 anos)',
    'Swanson, Nolan and Pelham Questionnaire, versão IV (18 itens do MTA), validada para o português por Mattos et al. (2006). ' +
    'Responda considerando o comportamento nos últimos 6 meses, comparado a crianças da mesma idade.');

  var pbAntecedentes = secao('6. Antecedentes patológicos e medicamentos', null);

  // --- Pergunta de roteamento (fica na seção 5) ---------------------------
  // Reposiciona a pergunta de faixa etária para dentro da seção 5:
  var qFaixa = form.addMultipleChoiceItem();
  qFaixa.setTitle('Faixa etária da criança/adolescente')
        .setHelpText('Selecione a faixa correspondente à idade atual para abrir a triagem adequada.')
        .setRequired(true)
        .setChoices([
          qFaixa.createChoice('0 a 15 meses', pbAntecedentes),
          qFaixa.createChoice('16 a 30 meses', pbMchat),
          qFaixa.createChoice('31 meses ou mais', pbTea)
        ]);
  form.moveItem(form.getItems().length - 1, form.getItemById(pbMchat.getId()).getIndex());

  // Ao terminar o M-CHAT-R, pular direto para os antecedentes:
  pbTea.setGoToPage(pbAntecedentes);

  // ======================================================================
  // SEÇÃO 5A — M-CHAT-R (20 itens)
  // ======================================================================
  var MCHAT = [
    'Se você aponta para algo do outro lado do ambiente, seu filho(a) olha para o objeto?',
    'Você já se perguntou se seu filho(a) é surdo(a)?',
    'Seu filho(a) brinca de faz de conta? (Ex.: fingir que bebe de um copo vazio, falar ao telefone, dar comida a uma boneca.)',
    'Seu filho(a) gosta de subir em coisas? (Ex.: móveis, escadas, escorregador.)',
    'Seu filho(a) faz movimentos incomuns com os dedos perto dos olhos? (Ex.: mexer os dedos perto dos olhos.)',
    'Seu filho(a) aponta com um dedo para PEDIR alguma coisa ou para pedir ajuda?',
    'Seu filho(a) aponta com um dedo para MOSTRAR a você algo interessante?',
    'Seu filho(a) se interessa por outras crianças? (Ex.: observa, sorri, aproxima-se.)',
    'Seu filho(a) MOSTRA coisas a você, trazendo ou levantando o objeto apenas para compartilhar, e não para pedir ajuda?',
    'Seu filho(a) responde quando você o(a) chama pelo nome?',
    'Quando você sorri para seu filho(a), ele(a) sorri de volta?',
    'Seu filho(a) fica incomodado(a) com ruídos do dia a dia? (Ex.: aspirador de pó, música alta.)',
    'Seu filho(a) anda sozinho(a)?',
    'Seu filho(a) olha nos seus olhos quando você fala com ele(a), brinca ou o(a) veste?',
    'Seu filho(a) tenta imitar o que você faz? (Ex.: dar tchau, bater palmas, fazer barulhos engraçados.)',
    'Se você virar a cabeça para olhar alguma coisa, seu filho(a) olha em volta para ver o que você está olhando?',
    'Seu filho(a) tenta fazer você olhar para ele(a)? (Ex.: busca elogios, diz "olha" ou "olha para mim".)',
    'Seu filho(a) entende quando você manda fazer alguma coisa? (Ex.: "põe o livro na cadeira", "traz o cobertor".)',
    'Se algo novo acontece, seu filho(a) olha para o seu rosto para ver como você reage?',
    'Seu filho(a) gosta de atividades com movimento? (Ex.: ser balançado, pular no seu joelho.)'
  ];

  for (var m = 0; m < MCHAT.length; m++) {
    var numero = m + 1;
    var critico = (numero === 2 || numero === 5 || numero === 12);
    var it = form.addMultipleChoiceItem()
                 .setTitle(numero + '. ' + MCHAT[m])
                 .setChoiceValues(['Sim', 'Não'])
                 .setRequired(true);
    if (critico) {
      it.setHelpText('Item de pontuação invertida: a resposta "SIM" indica risco.');
    }
    form.moveItem(form.getItems().length - 1, pbTea.getIndex());
  }

  // ======================================================================
  // SEÇÃO 5B — SINAIS NUCLEARES DE TEA (> 30 meses)
  // ======================================================================
  var TEA_SOCIAL = [
    'Dificuldade em iniciar ou manter conversa recíproca',
    'Contato visual reduzido, fugidio ou pouco modulado',
    'Uso limitado de gestos, expressões faciais e linguagem corporal',
    'Dificuldade em compartilhar interesses, emoções ou afeto',
    'Dificuldade em fazer ou manter amizades com pares da mesma idade',
    'Dificuldade em ajustar o comportamento a diferentes contextos sociais',
    'Ausência ou pobreza de brincadeira de faz de conta / imaginativa'
  ];
  var TEA_RRB = [
    'Movimentos repetitivos (balançar o corpo, bater as mãos, girar)',
    'Ecolalia, uso de frases prontas ou fala peculiar/robotizada',
    'Alinhar, enfileirar ou girar objetos de forma repetitiva',
    'Insistência em rotinas, sofrimento intenso com mudanças',
    'Interesses restritos, muito intensos ou incomuns',
    'Hiper ou hiporreatividade sensorial (sons, texturas, luzes, dor, cheiros)',
    'Seletividade alimentar acentuada por textura, cor ou marca'
  ];

  var itTeaA = form.addCheckboxItem()
    .setTitle('Marque os comportamentos observados na COMUNICAÇÃO E INTERAÇÃO SOCIAL')
    .setChoiceValues(TEA_SOCIAL.concat(['Nenhum dos acima']))
    .setHelpText('Domínio A do DSM-5-TR. Marque todos os que se aplicam de forma persistente.')
    .setRequired(true);
  form.moveItem(form.getItems().length - 1, pbSnap.getIndex());

  var itTeaB = form.addCheckboxItem()
    .setTitle('Marque os comportamentos REPETITIVOS, RESTRITOS OU SENSORIAIS observados')
    .setChoiceValues(TEA_RRB.concat(['Nenhum dos acima']))
    .setHelpText('Domínio B do DSM-5-TR. Marque todos os que se aplicam de forma persistente.')
    .setRequired(true);
  form.moveItem(form.getItems().length - 1, pbSnap.getIndex());

  var itTeaC = form.addMultipleChoiceItem()
    .setTitle('Desde quando estes comportamentos estão presentes?')
    .setChoiceValues(['Desde antes dos 3 anos', 'Surgiram após os 3 anos', 'Sempre estiveram presentes', 'Não sei informar'])
    .setRequired(true);
  form.moveItem(form.getItems().length - 1, pbSnap.getIndex());

  var itTeaD = form.addMultipleChoiceItem()
    .setTitle('Estes comportamentos prejudicam a vida da criança (escola, casa, convívio social)?')
    .setChoiceValues(['Não prejudicam', 'Prejuízo leve', 'Prejuízo moderado', 'Prejuízo grave'])
    .setRequired(true);
  form.moveItem(form.getItems().length - 1, pbSnap.getIndex());

  // Roteamento de saída da seção 5B
  var qIdade4 = form.addMultipleChoiceItem();
  qIdade4.setTitle('A criança/adolescente tem 4 anos completos ou mais?')
         .setHelpText('O rastreio de TDAH (SNAP-IV) é aplicável a partir dos 4 anos de idade.')
         .setRequired(true)
         .setChoices([
           qIdade4.createChoice('Sim', pbSnap),
           qIdade4.createChoice('Não', pbAntecedentes)
         ]);
  form.moveItem(form.getItems().length - 1, pbSnap.getIndex());

  // ======================================================================
  // SEÇÃO 5C — SNAP-IV (18 itens)
  // ======================================================================
  var SNAP = [
    'Não consegue prestar muita atenção a detalhes ou comete erros por descuido nos trabalhos da escola ou tarefas',
    'Tem dificuldade de manter a atenção em tarefas ou atividades de lazer',
    'Parece não estar ouvindo quando se fala diretamente com ele(a)',
    'Não segue instruções até o fim e não termina deveres de escola, tarefas ou obrigações',
    'Tem dificuldade para organizar tarefas e atividades',
    'Evita, não gosta ou se envolve contra a vontade em tarefas que exigem esforço mental prolongado',
    'Perde coisas necessárias para atividades (brinquedos, deveres, lápis, livros)',
    'Distrai-se com facilidade com estímulos externos',
    'É esquecido(a) em atividades do dia a dia',
    'Mexe as mãos ou os pés ou se remexe na cadeira',
    'Sai do lugar na sala de aula ou em outras situações em que se espera que fique sentado(a)',
    'Corre de um lado para outro ou sobe demais nas coisas em situações inapropriadas',
    'Tem dificuldade em brincar ou envolver-se em atividades de lazer de forma calma',
    'Não para ou frequentemente está a "mil por hora"',
    'Fala em excesso',
    'Responde às perguntas de forma precipitada, antes de elas terem sido terminadas',
    'Tem dificuldade de esperar a sua vez',
    'Interrompe os outros ou se intromete em conversas ou jogos'
  ];

  for (var s = 0; s < SNAP.length; s++) {
    var n = s + 1;
    var dominio = (n <= 9) ? 'Desatenção' : 'Hiperatividade/Impulsividade';
    var itS = form.addMultipleChoiceItem()
                  .setTitle(n + '. ' + SNAP[s])
                  .setChoiceValues(LIKERT_SNAP)
                  .setHelpText(dominio)
                  .setRequired(true);
    form.moveItem(form.getItems().length - 1, pbAntecedentes.getIndex());
  }

  var itCtx = form.addCheckboxItem()
    .setTitle('Em quais ambientes estes comportamentos causam prejuízo?')
    .setChoiceValues(['Em casa', 'Na escola', 'Em atividades sociais / com amigos', 'Em nenhum ambiente'])
    .setHelpText('O diagnóstico de TDAH exige prejuízo em pelo menos dois contextos (DSM-5-TR).')
    .setRequired(true);
  form.moveItem(form.getItems().length - 1, pbAntecedentes.getIndex());

  var itIdadeInicio = form.addMultipleChoiceItem()
    .setTitle('Estes comportamentos já estavam presentes antes dos 12 anos de idade?')
    .setChoiceValues(SIM_NAO)
    .setRequired(true);
  form.moveItem(form.getItems().length - 1, pbAntecedentes.getIndex());

  // ======================================================================
  // SEÇÃO 6 — ANTECEDENTES PATOLÓGICOS
  // ======================================================================
  multipla('Antecedentes patológicos relevantes',
    ['Nenhum',
     'Crises epilépticas / epilepsia',
     'Crise febril',
     'Meningite ou encefalite',
     'Traumatismo cranioencefálico com perda de consciência',
     'Acidente vascular cerebral',
     'Neurocirurgia prévia',
     'Prematuridade com sequelas',
     'Paralisia cerebral',
     'Doença genética confirmada',
     'Erro inato do metabolismo',
     'Cardiopatia congênita',
     'Asma / doença respiratória crônica',
     'Anemia ferropriva',
     'Hipotireoidismo',
     'Deficiência auditiva',
     'Deficiência visual',
     'Internações hospitalares prévias'],
    null, true, true);

  paragrafo('Detalhe os antecedentes marcados acima (datas, diagnósticos, hospital)', null, false);

  escolha('Faz uso de medicamentos atualmente?', ['Sim', 'Não'], null, true);
  paragrafo('Liste os medicamentos em uso, com dose e horário',
    'Ex.: Metilfenidato 10 mg — 1 comprimido às 7h e às 12h', false);
  texto('Alergias medicamentosas ou alimentares', 'Escreva "nega" se não houver', false);
  escolha('Situação vacinal', ['Em dia', 'Atrasada', 'Não sei informar'], null, true);

  // ======================================================================
  // SEÇÃO 7 — SONO, ALIMENTAÇÃO E SENSORIALIDADE
  // ======================================================================
  secao('7. Sono, alimentação e perfil sensorial', null);

  escolha('Quantas horas a criança dorme por noite, em média?',
    ['Menos de 6 horas', '6 a 8 horas', '8 a 10 horas', '10 a 12 horas', 'Mais de 12 horas'], null, true);
  multipla('Problemas de sono presentes',
    ['Nenhum',
     'Dificuldade para iniciar o sono',
     'Despertares noturnos frequentes',
     'Ronco alto ou pausas respiratórias',
     'Respira pela boca ao dormir',
     'Sonambulismo',
     'Terror noturno',
     'Pesadelos frequentes',
     'Movimentos de pernas / inquietação ao dormir',
     'Bruxismo',
     'Enurese noturna',
     'Sonolência diurna excessiva'],
    'Distúrbios respiratórios do sono podem mimetizar ou agravar sintomas de desatenção e hiperatividade.',
    true, true);

  escolha('Como é a alimentação da criança?',
    ['Come de tudo, sem restrições',
     'Recusa alguns alimentos, mas tem dieta variada',
     'Seletividade importante — come menos de 20 alimentos',
     'Seletividade extrema — come menos de 10 alimentos',
     'Depende de suplemento ou sonda'],
    null, true);

  multipla('Alterações sensoriais observadas',
    ['Nenhuma',
     'Incomoda-se muito com sons',
     'Incomoda-se com etiquetas, texturas de roupa',
     'Incomoda-se com luzes fortes',
     'Não parece sentir dor ou sente pouco',
     'Busca estímulos intensos (girar, pular, apertar)',
     'Cheira ou lambe objetos',
     'Recusa cortar cabelo ou unhas'],
    null, false, true);

  // ======================================================================
  // SEÇÃO 8 — ESCOLARIDADE E APRENDIZAGEM
  // ======================================================================
  secao('8. Escolaridade e aprendizagem', 'Preencher a partir da idade escolar.');

  escolha('Idade de entrada na escola/creche',
    ['Antes de 1 ano', '1 a 2 anos', '3 a 4 anos', '5 a 6 anos', 'Após os 6 anos', 'Não frequenta'], null, false);
  escolha('Já repetiu algum ano escolar?', ['Não', 'Sim, uma vez', 'Sim, duas ou mais vezes'], null, false);

  multipla('Dificuldades escolares relatadas',
    ['Nenhuma',
     'Dificuldade para aprender a ler',
     'Leitura lenta, silabada ou com muitos erros',
     'Dificuldade para compreender o que lê',
     'Muitos erros de ortografia',
     'Letra ilegível / dificuldade motora para escrever',
     'Dificuldade com números e cálculo',
     'Dificuldade para copiar do quadro',
     'Não consegue permanecer sentado em aula',
     'Não interage com os colegas',
     'Comportamento opositor com professores',
     'Recusa em ir à escola'],
    null, false, true);

  escolha('Recebe apoio educacional especializado?',
    ['Não recebe',
     'Atendimento Educacional Especializado (AEE) / sala de recursos',
     'Profissional de apoio escolar (monitor/mediador)',
     'Plano Educacional Individualizado (PEI)',
     'Adaptação curricular',
     'Não sei informar'],
    null, false, true);

  escolha('A escola enviou relatório escrito?', ['Sim, anexado ao prontuário', 'Sim, mas não trouxe hoje', 'Não'], null, false);

  // ======================================================================
  // SEÇÃO 9 — COMPORTAMENTO E SAÚDE MENTAL
  // ======================================================================
  secao('9. Comportamento e saúde mental', null);

  multipla('Sintomas comportamentais e emocionais presentes',
    ['Nenhum',
     'Ansiedade excessiva / preocupações',
     'Medos intensos ou fobias',
     'Tristeza persistente / choro fácil',
     'Irritabilidade frequente',
     'Crises de birra desproporcionais para a idade',
     'Agressividade contra pessoas ou objetos',
     'Comportamento opositor e desafiador',
     'Autolesão (bater a cabeça, morder-se, cortar-se)',
     'Ideação de morte ou suicídio',
     'Tiques motores ou vocais',
     'Rituais ou compulsões',
     'Isolamento social',
     'Mentiras ou furtos frequentes'],
    null, true, true);

  escolha('Tempo diário de exposição a telas',
    ['Menos de 1 hora', '1 a 2 horas', '2 a 4 horas', '4 a 6 horas', 'Mais de 6 horas'],
    'A Sociedade Brasileira de Pediatria desaconselha telas antes dos 2 anos e recomenda limite de 1 hora/dia entre 2 e 5 anos.',
    true);

  multipla('Eventos de vida significativos',
    ['Nenhum',
     'Separação dos pais',
     'Falecimento de pessoa próxima',
     'Mudança de cidade ou escola',
     'Histórico de acolhimento institucional ou adoção',
     'Exposição à violência doméstica',
     'Suspeita ou confirmação de violência física',
     'Suspeita ou confirmação de violência sexual',
     'Negligência',
     'Insegurança alimentar em casa'],
    'Informações desta natureza exigem notificação compulsória quando confirmadas (Lei 13.431/2017).',
    false, true);

  // ======================================================================
  // SEÇÃO 10 — HISTÓRIA FAMILIAR
  // ======================================================================
  secao('10. História familiar', null);

  escolha('Os pais são parentes entre si (primos, tios)?', SIM_NAO,
    'Consanguinidade aumenta a probabilidade de condições autossômicas recessivas.', true);

  multipla('Há familiares com alguma destas condições?',
    ['Nenhuma',
     'Transtorno do Espectro Autista',
     'TDAH',
     'Deficiência intelectual',
     'Atraso de fala',
     'Dislexia ou dificuldade de aprendizagem',
     'Epilepsia',
     'Enxaqueca',
     'Depressão',
     'Transtorno bipolar',
     'Esquizofrenia',
     'Transtorno de ansiedade',
     'Doença neuromuscular',
     'Síndrome genética confirmada',
     'Doença neurodegenerativa'],
    null, true, true);

  paragrafo('Especifique o grau de parentesco dos familiares acometidos',
    'Ex.: tio materno com TEA; avó paterna com epilepsia', false);

  escolha('Houve abortos de repetição ou óbito de crianças na família?', SIM_NAO, null, false);

  // ======================================================================
  // SEÇÃO 11 — CONTEXTO PSICOSSOCIAL
  // ======================================================================
  secao('11. Contexto familiar e psicossocial', null);

  texto('Com quem a criança mora?', 'Ex.: mãe, padrasto e dois irmãos', true);
  texto('Número de irmãos', null, false);
  escolha('Escolaridade da mãe/responsável principal',
    ['Fundamental incompleto', 'Fundamental completo', 'Médio incompleto', 'Médio completo',
     'Superior incompleto', 'Superior completo'], null, false);
  escolha('Renda familiar mensal aproximada',
    ['Até 1 salário mínimo', '1 a 2 salários mínimos', '2 a 3 salários mínimos',
     '3 a 5 salários mínimos', 'Mais de 5 salários mínimos', 'Prefiro não informar'], null, false);
  multipla('A família recebe algum benefício?',
    ['Nenhum', 'Bolsa Família', 'BPC/LOAS', 'Auxílio-doença', 'Outro'], null, false, true);
  escolha('Principal cuidador durante o dia',
    ['Mãe', 'Pai', 'Avós', 'Escola/creche em tempo integral', 'Babá ou cuidador contratado'], null, false, true);

  // ======================================================================
  // SEÇÃO 12 — TERAPIAS E EXAMES PRÉVIOS
  // ======================================================================
  secao('12. Terapias e exames já realizados', null);

  multipla('Terapias em andamento ou já realizadas',
    ['Nenhuma',
     'Fonoaudiologia',
     'Terapia ocupacional',
     'Terapia ocupacional com integração sensorial',
     'Psicologia',
     'Psicologia com abordagem ABA',
     'Psicopedagogia',
     'Fisioterapia',
     'Musicoterapia',
     'Equoterapia',
     'Natação / atividade física terapêutica'],
    null, true, true);

  texto('Frequência semanal total de terapias', 'Ex.: 4 sessões por semana', false);

  multipla('Exames complementares já realizados',
    ['Nenhum',
     'Eletroencefalograma (EEG)',
     'Ressonância magnética de encéfalo',
     'Tomografia de crânio',
     'Cariótipo',
     'CGH-array (microarranjo cromossômico)',
     'Pesquisa de X-Frágil (FMR1)',
     'Exoma / painel genético',
     'Triagem metabólica',
     'PEATE / BERA (audiometria de tronco encefálico)',
     'Audiometria',
     'Avaliação oftalmológica',
     'Avaliação neuropsicológica',
     'Polissonografia',
     'Dosagens laboratoriais (hemograma, ferritina, TSH, vitamina D)'],
    null, true, true);

  paragrafo('Resultados relevantes dos exames acima', 'Traga os laudos no dia do mutirão.', false);

  escolha('Já possui diagnóstico neurológico ou psiquiátrico formal?', ['Não', 'Sim'], null, true);
  texto('Se sim, qual diagnóstico e quem o estabeleceu?', null, false);

  // ======================================================================
  // SEÇÃO 13 — EXAME FÍSICO E NEUROLÓGICO (EQUIPE)
  // ======================================================================
  secao('13. Exame físico e neurológico — PREENCHIMENTO DA EQUIPE',
    'Seção de uso exclusivo do profissional médico durante o atendimento.');

  texto('Profissional responsável pelo atendimento', 'Nome e CRM/RQE', true);

  cabecalho('Antropometria');
  texto('Peso (kg)', null, false);
  texto('Estatura (cm)', null, false);
  texto('Perímetro cefálico (cm)', null, false);
  escolha('Classificação do perímetro cefálico',
    ['Normocefalia (entre -2 e +2 DP)', 'Microcefalia (< -2 DP)', 'Macrocefalia (> +2 DP)'],
    'Utilizar curvas da OMS ou INTERGROWTH-21st conforme a idade gestacional corrigida.', false);
  escolha('Estado nutricional (escore-z IMC/idade)',
    ['Eutrófico', 'Magreza', 'Magreza acentuada', 'Risco de sobrepeso', 'Sobrepeso', 'Obesidade'], null, false);

  cabecalho('Exame dismorfológico e cutâneo');
  multipla('Achados dismórficos e cutâneos',
    ['Sem achados',
     'Fácies sindrômica',
     'Manchas café com leite (≥ 6, > 5 mm)',
     'Efélides axilares ou inguinais',
     'Manchas hipocrômicas (lâmpada de Wood)',
     'Angiofibromas faciais',
     'Mancha em vinho do porto (território trigeminal)',
     'Nevo/lesão de linha média em dorso',
     'Hipertricose lombossacra',
     'Alterações de mãos/pés (clinodactilia, prega única)',
     'Alterações auriculares',
     'Hipoplasia de esmalte dentário'],
    'A pesquisa de estigmas neurocutâneos é mandatória na avaliação neuropediátrica.', false, true);

  cabecalho('Exame neurológico');
  escolha('Nível de consciência e interação', ['Alerta e interativo', 'Alerta com interação reduzida', 'Sonolento', 'Não avaliável'], null, false);
  escolha('Tônus muscular', ['Normal', 'Hipotonia axial', 'Hipotonia global', 'Hipertonia espástica', 'Hipertonia distônica', 'Misto'], null, false);
  escolha('Força muscular', ['Preservada e simétrica', 'Déficit focal', 'Déficit proximal', 'Déficit distal', 'Não avaliável'], null, false);
  escolha('Reflexos osteotendinosos', ['Normorreflexia', 'Hiporreflexia', 'Arreflexia', 'Hiperreflexia', 'Assimétricos'], null, false);
  escolha('Sinal de Babinski', ['Ausente (flexor)', 'Presente unilateral', 'Presente bilateral', 'Fisiológico para a idade'], null, false);
  escolha('Marcha', ['Normal', 'Atáxica', 'Espástica / em tesoura', 'Escarvante', 'Anserina (miopática)', 'Em pontas de pé', 'Ainda não deambula'], null, false);
  escolha('Coordenação e equilíbrio', ['Adequados para a idade', 'Dismetria', 'Tremor de intenção', 'Disdiadococinesia', 'Romberg positivo', 'Não avaliável'], null, false);
  escolha('Nervos cranianos', ['Sem alterações', 'Com alterações'], null, false);
  texto('Se alterados, especifique quais nervos cranianos', null, false);
  multipla('Movimentos involuntários observados',
    ['Ausentes', 'Tiques motores', 'Tiques vocais', 'Estereotipias', 'Coreia', 'Distonia', 'Mioclonias', 'Tremor'], null, false, true);
  escolha('Fundo de olho', ['Normal', 'Papiledema', 'Atrofia óptica', 'Alteração retiniana', 'Não realizado'], null, false);
  paragrafo('Observações adicionais do exame', null, false);

  // ======================================================================
  // SEÇÃO 14 — HIPÓTESE DIAGNÓSTICA E CONDUTA (EQUIPE)
  // ======================================================================
  secao('14. Hipótese diagnóstica e conduta — PREENCHIMENTO DA EQUIPE', null);

  multipla('Hipóteses diagnósticas',
    ['Desenvolvimento dentro da normalidade',
     'Atraso global do desenvolvimento',
     'Transtorno do Espectro Autista (a confirmar)',
     'Transtorno do Espectro Autista (confirmado)',
     'TDAH',
     'Deficiência intelectual',
     'Transtorno específico da aprendizagem',
     'Transtorno do desenvolvimento da linguagem',
     'Transtorno do desenvolvimento da coordenação',
     'Epilepsia',
     'Paralisia cerebral',
     'Cefaleia primária (enxaqueca ou tensional)',
     'Transtorno de tiques / Tourette',
     'Transtorno de ansiedade',
     'Distúrbio respiratório do sono',
     'Suspeita de síndrome genética',
     'Suspeita de doença neuromuscular',
     'Queixa de origem psicossocial / contextual'],
    null, true, true);

  texto('CID-10 principal', 'Ex.: F84.0', false);
  texto('CID-10 secundários', null, false);

  escolha('Classificação de risco / prioridade',
    ['Verde — acompanhamento na atenção básica',
     'Amarelo — reavaliação ambulatorial em até 90 dias',
     'Laranja — avaliação especializada em até 30 dias',
     'Vermelho — encaminhamento imediato / urgência'],
    null, true);

  multipla('Exames solicitados hoje',
    ['Nenhum', 'EEG', 'Ressonância magnética de encéfalo', 'Cariótipo', 'CGH-array', 'X-Frágil (FMR1)',
     'Painel genético / exoma', 'Triagem metabólica', 'PEATE/BERA', 'Audiometria', 'Avaliação oftalmológica',
     'Polissonografia', 'Hemograma, ferritina, TSH, vitamina D', 'Avaliação neuropsicológica'],
    null, false, true);

  multipla('Encaminhamentos realizados',
    ['Nenhum', 'Fonoaudiologia', 'Terapia ocupacional', 'Psicologia', 'Psicopedagogia', 'Fisioterapia',
     'Neuropediatria — seguimento', 'Psiquiatria da infância e adolescência', 'Genética médica',
     'Oftalmologia', 'Otorrinolaringologia', 'Ortopedia', 'Nutrição', 'CAPSi', 'AEE / sala de recursos',
     'Serviço social', 'Conselho Tutelar (notificação)'],
    null, false, true);

  escolha('Foi iniciada ou ajustada medicação?', ['Não', 'Sim'], null, true);
  paragrafo('Se sim, descreva a prescrição (fármaco, dose, posologia e orientações)', null, false);

  multipla('Documentos emitidos no atendimento',
    ['Nenhum', 'Relatório médico circunstanciado', 'Relatório escolar / de inclusão', 'Receituário',
     'Solicitação de exames', 'Laudo para BPC/LOAS', 'Laudo para plano de saúde', 'Atestado'],
    null, false, true);

  escolha('Desfecho do atendimento',
    ['Alta com orientações',
     'Retorno ao mutirão para reavaliação',
     'Seguimento ambulatorial em neuropediatria',
     'Contrarreferência à atenção básica',
     'Encaminhamento para serviço de urgência'],
    null, true);

  paragrafo('Orientações fornecidas à família', null, false);
  paragrafo('Observações finais da equipe', null, false);

  // ======================================================================
  // SEÇÃO 15 — CONSENTIMENTO
  // ======================================================================
  secao('15. Consentimento do responsável', null);

  escolha('Declaro que as informações prestadas são verdadeiras e autorizo o registro dos dados de saúde ' +
          'da criança/adolescente para fins de assistência, conforme a Lei Geral de Proteção de Dados ' +
          '(Lei 13.709/2018, arts. 7º, VIII; 11, II, "f"; e 14).',
          ['Sim, autorizo'], null, true);

  escolha('Autorizo o uso dos dados, de forma anonimizada, para fins epidemiológicos e de planejamento em saúde.',
          ['Sim, autorizo', 'Não autorizo'], null, true);

  texto('Nome completo de quem preencheu este formulário', null, true);

  // ----------------------------------------------------------------------
  // Planilha de respostas
  // ----------------------------------------------------------------------
  var planilha = SpreadsheetApp.create('Anamnese Neuropediátrica — Mutirão (respostas)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

  // ----------------------------------------------------------------------
  // Saída
  // ----------------------------------------------------------------------
  var msg =
    '\n=============================================================\n' +
    'FORMULÁRIO CRIADO COM SUCESSO\n' +
    '=============================================================\n' +
    'Editar:     ' + form.getEditUrl() + '\n' +
    'Responder:  ' + form.getPublishedUrl() + '\n' +
    'Respostas:  ' + planilha.getUrl() + '\n' +
    '=============================================================\n';
  Logger.log(msg);
  return msg;
}
