/**
 * ANAMNESE NEUROPSIQUIÁTRICA DO DESENVOLVIMENTO — MUTIRÃO
 * Dra. Fabiana Mugnol — Neuropediatria
 *
 * Instrumento de triagem para TEA (todas as idades, inclusive adultos),
 * TDAH, transtorno do desenvolvimento intelectual e transtornos
 * específicos de aprendizagem.
 *
 * COMO USAR
 *   1. Abra https://script.google.com e crie um projeto.
 *   2. Cole este arquivo inteiro no lugar do conteúdo padrão.
 *   3. Execute a função criarAnamneseMutirao e autorize os acessos.
 *   4. Os links aparecem no Registro de execução (Ctrl + Enter).
 *
 * COMO EDITAR
 *   Depois de gerado, o formulário é seu e pode ser editado livremente pela
 *   interface do Google Forms — arrastar, reescrever, excluir e acrescentar
 *   perguntas, sem mexer em código.
 *   Para mudanças estruturais que você queira preservar entre gerações,
 *   edite os blocos marcados com  === CONTEÚDO EDITÁVEL ===  logo abaixo e
 *   execute a função novamente: cada execução cria um formulário novo e
 *   independente, sem alterar os anteriores.
 */

// =========================================================================
// === CONTEÚDO EDITÁVEL ===================================================
// Listas de itens das triagens. Acrescente, remova ou reescreva à vontade.
// =========================================================================

var CONTEUDO = {

  // --- TEA: critério A do DSM-5-TR (déficits de comunicação e interação) ---
  tea_A1: [ // A1 — reciprocidade socioemocional
    'Dificuldade em iniciar ou responder a interações sociais',
    'Conversa pouco recíproca (monólogo, dificuldade em sustentar troca)',
    'Compartilha pouco interesses, emoções ou afeto com os outros',
    'Dificuldade em perceber o que o outro sente ou pensa',
    'Aproximação social atípica (invasiva, formal demais ou desajustada)'
  ],
  tea_A2: [ // A2 — comunicação não verbal
    'Contato visual reduzido, fugidio ou pouco modulado',
    'Uso limitado de gestos para comunicar',
    'Expressão facial pouco variada ou incongruente com o contexto',
    'Dificuldade em compreender gestos, expressões e tom de voz dos outros',
    'Prosódia atípica (fala monótona, cantada ou com volume mal ajustado)',
    'Linguagem corporal pouco integrada à fala'
  ],
  tea_A3: [ // A3 — desenvolvimento e manutenção de relacionamentos
    'Dificuldade em fazer amizades',
    'Dificuldade em manter amizades ao longo do tempo',
    'Ausência de interesse por pares',
    'Dificuldade em ajustar o comportamento a diferentes contextos sociais',
    'Ausência ou pobreza de brincadeira compartilhada ou de faz de conta',
    'Prefere sistematicamente a companhia de adultos ou de crianças menores',
    'Relacionamentos marcados por ingenuidade social ou vulnerabilidade'
  ],

  // --- TEA: critério B do DSM-5-TR (comportamentos restritos e repetitivos) ---
  tea_B1: [ // B1 — estereotipias motoras, de fala ou de uso de objetos
    'Movimentos repetitivos do corpo (balançar, girar, bater as mãos)',
    'Maneirismos de mãos ou dedos',
    'Ecolalia imediata ou tardia',
    'Uso de frases prontas, falas decoradas ou jargão idiossincrático',
    'Alinhar, enfileirar, empilhar ou girar objetos repetidamente',
    'Manipulação repetitiva de partes de objetos'
  ],
  tea_B2: [ // B2 — insistência em rotinas e inflexibilidade
    'Sofrimento intenso diante de mudanças na rotina',
    'Rituais verbais ou motores obrigatórios',
    'Necessidade de fazer sempre o mesmo percurso ou a mesma sequência',
    'Rigidez de pensamento; dificuldade com imprevistos',
    'Seletividade alimentar por textura, cor, marca ou apresentação',
    'Dificuldade acentuada em transições entre atividades'
  ],
  tea_B3: [ // B3 — interesses restritos e fixos
    'Interesse muito intenso por um tema específico',
    'Interesse por temas incomuns para a idade',
    'Apego incomum a objetos específicos',
    'Fala predominantemente sobre o mesmo assunto',
    'Acúmulo ou colecionismo de informações sobre um tema'
  ],
  tea_B4: [ // B4 — reatividade sensorial
    'Hipersensibilidade a sons',
    'Hipersensibilidade a luzes ou estímulos visuais',
    'Hipersensibilidade a texturas, etiquetas ou tecidos',
    'Hipersensibilidade a cheiros ou sabores',
    'Hiporreatividade à dor, ao frio ou ao calor',
    'Busca de estímulos intensos (girar, pular, apertar, pressão profunda)',
    'Fascínio visual por luzes, movimento ou objetos que giram',
    'Recusa acentuada de cortar cabelo ou unhas, banho ou escovação'
  ],

  // --- TEA: camuflagem / compensação social ---
  tea_camuflagem: [
    'Imita ou ensaia comportamentos sociais observados em outras pessoas',
    'Prepara previamente assuntos, falas ou respostas para interações',
    'Força ou monitora conscientemente o contato visual',
    'Sente exaustão importante após situações sociais',
    'Esconde interesses, estereotipias ou dificuldades em público',
    'Sensação persistente de "atuar um papel" na convivência social'
  ],

  // --- AQ-10 (adultos, 16 anos ou mais) ---
  // Pontuação: itens 1, 7, 8 e 10 pontuam com "concordo";
  //            itens 2, 3, 4, 5, 6 e 9 pontuam com "discordo". Corte: 6 ou mais.
  aq10: [
    {t: 'Frequentemente percebo sons leves que os outros não notam.', inv: false},
    {t: 'Costumo me concentrar mais no quadro geral do que nos pequenos detalhes.', inv: true},
    {t: 'Acho fácil fazer mais de uma coisa ao mesmo tempo.', inv: true},
    {t: 'Se sou interrompido, consigo retomar rapidamente o que estava fazendo.', inv: true},
    {t: 'Acho fácil "ler nas entrelinhas" quando alguém está falando comigo.', inv: true},
    {t: 'Sei perceber quando alguém que me ouve está ficando entediado.', inv: true},
    {t: 'Quando leio uma história, tenho dificuldade em deduzir as intenções dos personagens.', inv: false},
    {t: 'Gosto de reunir informações sobre categorias de coisas (tipos de carro, de ave, de trem, de planta).', inv: false},
    {t: 'Acho fácil perceber o que alguém está pensando ou sentindo apenas olhando para o rosto dele.', inv: true},
    {t: 'Tenho dificuldade em deduzir as intenções das pessoas.', inv: false}
  ],

  // --- SNAP-IV (4 a 17 anos) — itens 1 a 9: desatenção; 10 a 18: hiperatividade/impulsividade ---
  snap: [
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
  ],

  // --- ASRS-18 (18 anos ou mais) — itens 1 a 6: Parte A (rastreio) ---
  asrs: [
    'Com que frequência você tem dificuldade para finalizar os detalhes finais de um projeto, depois que as partes mais difíceis já foram feitas?',
    'Com que frequência você tem dificuldade para colocar as coisas em ordem quando precisa realizar uma tarefa que exige organização?',
    'Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?',
    'Quando tem uma tarefa que exige muita reflexão, com que frequência você evita ou adia o início?',
    'Com que frequência você mexe ou remexe as mãos ou os pés quando precisa ficar sentado(a) por muito tempo?',
    'Com que frequência você se sente ativo(a) demais e compelido(a) a fazer coisas, como se estivesse movido(a) por um motor?',
    'Com que frequência você comete erros por falta de atenção quando precisa trabalhar em um projeto chato ou difícil?',
    'Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?',
    'Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando falam diretamente com você?',
    'Com que frequência você perde ou tem dificuldade para encontrar coisas em casa ou no trabalho?',
    'Com que frequência você se distrai com atividade ou barulho ao seu redor?',
    'Com que frequência você sai do lugar em reuniões ou em outras situações em que se espera que permaneça sentado(a)?',
    'Com que frequência você se sente inquieto(a) ou agitado(a)?',
    'Com que frequência você tem dificuldade para relaxar quando tem tempo livre?',
    'Com que frequência você se pega falando demais em situações sociais?',
    'Em uma conversa, com que frequência você termina as frases das pessoas antes que elas mesmas terminem?',
    'Com que frequência você tem dificuldade para esperar a sua vez em situações que exigem isso?',
    'Com que frequência você interrompe as outras pessoas quando elas estão ocupadas?'
  ],

  // --- Funcionamento adaptativo (transtorno do desenvolvimento intelectual) ---
  adapt_conceitual: [
    'Dificuldade em leitura para a idade/escolaridade',
    'Dificuldade em escrita para a idade/escolaridade',
    'Dificuldade com números, cálculo e noção de quantidade',
    'Dificuldade em lidar com dinheiro e troco',
    'Dificuldade em compreender horas, datas e prazos',
    'Dificuldade em resolver problemas do dia a dia',
    'Memória e aquisição de conhecimento abaixo do esperado',
    'Necessita de apoio para tomar decisões simples'
  ],
  adapt_social: [
    'Linguagem pouco desenvolvida para a idade',
    'Imaturidade nas relações sociais em relação aos pares',
    'Dificuldade em compreender regras sociais',
    'Julgamento social frágil; facilmente influenciável ou enganado(a)',
    'Dificuldade em regular emoções e comportamento em situações sociais',
    'Dificuldade em perceber risco em situações do cotidiano'
  ],
  adapt_pratico: [
    'Necessita de ajuda para higiene pessoal além do esperado para a idade',
    'Necessita de ajuda para vestir-se além do esperado para a idade',
    'Necessita de ajuda para alimentar-se além do esperado para a idade',
    'Não realiza tarefas domésticas compatíveis com a idade',
    'Não se desloca sozinho(a) em trajetos que seriam esperados para a idade',
    'Não consegue usar telefone, transporte ou dinheiro de forma autônoma',
    'Necessita de supervisão para uso de medicamentos',
    'Necessita de apoio para manter atividade laboral ou escolar'
  ],

  // --- Transtornos específicos de aprendizagem (DSM-5-TR) ---
  apre_leitura: [
    'Leitura lenta, silabada ou hesitante',
    'Troca, omite ou acrescenta letras ao ler',
    'Dificuldade em decodificar palavras novas ou pouco frequentes',
    'Perde-se na linha; precisa reler várias vezes',
    'Compreende mal o que leu, mesmo lendo corretamente',
    'Evita atividades que envolvam leitura',
    'Leitura muito abaixo do esperado para a escolaridade'
  ],
  apre_escrita: [
    'Muitos erros de ortografia persistentes',
    'Troca de letras com sons semelhantes (p/b, f/v, t/d)',
    'Omite ou inverte letras e sílabas ao escrever',
    'Letra ilegível ou muito irregular',
    'Dificuldade em organizar ideias por escrito',
    'Texto pobre em relação à fala espontânea',
    'Pontuação e concordância muito abaixo do esperado',
    'Cansaço ou dor ao escrever; lentidão acentuada'
  ],
  apre_matematica: [
    'Dificuldade em reconhecer quantidades e comparar números',
    'Não memoriza fatos aritméticos básicos (tabuada, somas simples)',
    'Conta nos dedos para operações simples além da idade esperada',
    'Confunde sinais e algoritmos das operações',
    'Dificuldade em raciocínio matemático e problemas',
    'Dificuldade em compreender frações, proporções e porcentagens',
    'Dificuldade com medidas, horas e dinheiro'
  ]
};

// =========================================================================
// === FIM DO CONTEÚDO EDITÁVEL ============================================
// =========================================================================


function criarAnamneseMutirao() {

  var form = FormApp.create('Anamnese — Mutirão de Neurodesenvolvimento');

  form.setTitle('Anamnese — Mutirão de Neurodesenvolvimento')
      .setDescription(
        'Triagem de Transtorno do Espectro Autista (todas as idades), Transtorno de Déficit de Atenção e ' +
        'Hiperatividade, Transtorno do Desenvolvimento Intelectual e Transtornos Específicos de Aprendizagem.\n\n' +
        'As seções 1 a 14 são preenchidas pela pessoa avaliada, por seu responsável ou pela equipe de acolhimento. ' +
        'As seções 15 e 16 são de preenchimento exclusivo da equipe médica.\n\n' +
        'PROTEÇÃO DE DADOS — Este formulário coleta dados de identificação civil e dados pessoais sensíveis de ' +
        'saúde (LGPD, Lei 13.709/2018, art. 5º, II; art. 11; art. 14). O preenchimento pressupõe consentimento ' +
        'da pessoa avaliada ou de seu responsável legal, registrado ao final. Mantenha o formulário e a planilha ' +
        'de respostas em conta institucional, com compartilhamento restrito à equipe assistencial.'
      )
      .setProgressBar(true)
      .setAllowResponseEdits(true)
      .setConfirmationMessage('Anamnese registrada com sucesso. Obrigada pela colaboração.');

  // ----------------------------------------------------------------------
  // Auxiliares
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
  // Acrescenta o último item criado ao final da seção que termina em "antesDe"
  function moverPara(antesDe) {
    form.moveItem(form.getItems().length - 1, antesDe.getIndex());
  }
  function padrao(item, expressao, mensagem) {
    try {
      item.setValidation(
        FormApp.createTextValidation()
               .setHelpText(mensagem)
               .requireTextMatchesPattern(expressao)
               .build());
    } catch (e) {
      Logger.log('Validação não aplicada em "' + item.getTitle() + '": ' + e);
    }
    return item;
  }

  var SIM_NAO   = ['Sim', 'Não', 'Não sei informar'];
  var LIKERT_SNAP = ['Nem um pouco', 'Só um pouco', 'Bastante', 'Demais'];
  var LIKERT_ASRS = ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Muito frequentemente'];
  var LIKERT_AQ   = ['Concordo totalmente', 'Concordo um pouco', 'Discordo um pouco', 'Discordo totalmente'];
  var GRAVIDADE = ['Ausente', 'Leve', 'Moderado', 'Grave'];

  // ======================================================================
  // 1. IDENTIFICAÇÃO
  // ======================================================================
  cabecalho('1. Identificação', 'Dados civis da pessoa a ser avaliada.');

  data('Data do atendimento', true);
  texto('Nome completo', null, true);
  texto('Nome social', 'Preencha apenas se utilizar nome social', false);
  data('Data de nascimento', true);
  texto('Idade atual', 'Em anos; para menores de 2 anos, informe anos e meses', true);
  escolha('Sexo atribuído ao nascimento', ['Feminino', 'Masculino'], null, true);
  escolha('Identidade de gênero',
    ['Mulher cisgênero', 'Homem cisgênero', 'Mulher transgênero', 'Homem transgênero',
     'Pessoa não binária', 'Prefiro não informar'],
    'Campo opcional, relevante para o perfil clínico de pessoas autistas.', false, true);

  padrao(texto('CPF', 'Somente números ou no formato 000.000.000-00', true),
         '^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$',
         'Informe um CPF válido, com 11 dígitos.');
  texto('RG e órgão expedidor', 'Ex.: 1234567890 SSP/RS', true);
  texto('Cartão Nacional de Saúde (CNS)', 'Se disponível', false);

  cabecalho('Filiação');
  texto('Nome completo da mãe', null, true);
  texto('Nome completo do pai', null, false);

  cabecalho('Endereço completo');
  texto('Logradouro (rua, avenida)', null, true);
  texto('Número', null, true);
  texto('Complemento', 'Apartamento, bloco, casa dos fundos', false);
  texto('Bairro', null, true);
  texto('Município', null, true);
  texto('Estado (UF)', 'Ex.: RS', true);
  padrao(texto('CEP', 'Formato 00000-000', false),
         '^\\d{5}-?\\d{3}$',
         'Informe um CEP válido, com 8 dígitos.');

  cabecalho('Contato');
  padrao(texto('Celular (WhatsApp)', 'Com DDD. Ex.: (51) 99999-9999', true),
         '^\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}$',
         'Informe um número de celular válido, com DDD.');
  texto('Telefone alternativo', null, false);
  var eMail = form.addTextItem().setTitle('E-mail').setRequired(false);
  try {
    eMail.setValidation(FormApp.createTextValidation()
      .setHelpText('Informe um endereço de e-mail válido.')
      .requireTextIsEmail().build());
  } catch (e) { Logger.log('Validação de e-mail não aplicada: ' + e); }

  cabecalho('Preenchimento e origem');
  escolha('Quem está preenchendo este formulário?',
    ['A própria pessoa avaliada', 'Mãe', 'Pai', 'Outro responsável legal', 'Cuidador(a)',
     'Cônjuge ou companheiro(a)', 'Equipe de acolhimento do mutirão'], null, true, true);
  texto('Nome de quem preencheu, se diferente da pessoa avaliada', null, false);
  padrao(texto('CPF do responsável legal, quando a pessoa avaliada for menor de idade ou estiver sob curatela',
               'Somente números ou no formato 000.000.000-00', false),
         '^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$',
         'Informe um CPF válido, com 11 dígitos.');

  escolha('Escolaridade atual ou máxima atingida',
    ['Não alfabetizado(a)', 'Educação infantil', 'Fundamental incompleto', 'Fundamental completo',
     'Médio incompleto', 'Médio completo', 'Superior incompleto', 'Superior completo', 'Pós-graduação'],
    null, true);
  texto('Se estuda atualmente, informe a escola/instituição, o ano/semestre e o turno', null, false);
  texto('Ocupação atual', 'Ex.: estudante, do lar, auxiliar administrativo, desempregado(a), aposentado(a)', false);

  escolha('Quem encaminhou para o mutirão?',
    ['Escola ou instituição de ensino', 'Unidade Básica de Saúde (UBS)', 'CAPS / CAPSi',
     'Pediatra', 'Psiquiatra', 'Neurologista', 'Psicólogo(a)', 'Demanda espontânea',
     'CRAS / CREAS', 'Conselho Tutelar', 'Determinação judicial', 'Empregador / medicina do trabalho'],
    null, true, true);

  // ======================================================================
  // 2. MOTIVO DA AVALIAÇÃO
  // ======================================================================
  secao('2. Motivo da avaliação', 'Descreva o que motivou a busca pelo mutirão.');

  multipla('Motivo principal (pode marcar mais de um)',
    ['Suspeita de Transtorno do Espectro Autista (TEA)',
     'Confirmação ou revisão de diagnóstico de TEA já estabelecido',
     'Suspeita de TDAH',
     'Suspeita de transtorno de aprendizagem (leitura, escrita ou matemática)',
     'Suspeita de deficiência intelectual / transtorno do desenvolvimento intelectual',
     'Atraso de fala ou linguagem',
     'Atraso global do desenvolvimento',
     'Dificuldade escolar ou de desempenho no trabalho',
     'Alteração de comportamento',
     'Dificuldades sociais e de relacionamento',
     'Necessidade de laudo para benefício, inclusão escolar ou adaptação no trabalho',
     'Crises epilépticas ou eventos paroxísticos',
     'Tiques ou movimentos involuntários',
     'Perda de habilidades já adquiridas (regressão)'],
    null, true, true);

  paragrafo('Descreva a queixa com as suas próprias palavras',
    'Conte o que preocupa, desde quando, em que situações aparece e o que já foi tentado.', true);

  escolha('Há quanto tempo essas dificuldades estão presentes?',
    ['Menos de 6 meses', '6 a 12 meses', '1 a 2 anos', '2 a 5 anos', 'Mais de 5 anos',
     'Desde a infância', 'Desde sempre / não sei precisar'], null, true);

  cabecalho('Sinais de alerta', 'Estas respostas orientam a priorização do atendimento.');
  escolha('Houve PERDA de habilidades que já estavam adquiridas (fala, contato social, marcha, autonomia)?',
    SIM_NAO, 'A regressão de habilidades é sinal de alarme e exige investigação dirigida.', true);
  paragrafo('Se sim, descreva quais habilidades foram perdidas e em que idade', null, false);
  escolha('Apresenta ou apresentou crises convulsivas?', SIM_NAO, null, true);
  multipla('Há alguma situação de risco no momento?',
    ['Não', 'Autolesão', 'Ideação ou comportamento suicida', 'Agressividade grave',
     'Suspeita de violência ou negligência', 'Situação de rua ou vulnerabilidade extrema'],
    null, true, true);

  // ======================================================================
  // 3. HISTÓRIA DO DESENVOLVIMENTO
  // ======================================================================
  secao('3. História do desenvolvimento',
    'O critério C do DSM-5-TR exige que os sinais de TEA estejam presentes desde o período inicial do ' +
    'desenvolvimento. Para adultos, preencha conforme o relato familiar disponível; se não houver ' +
    'informante, responda "Não sei informar".');

  escolha('Há alguém que possa informar sobre a primeira infância da pessoa avaliada?',
    ['Sim, está presente hoje', 'Sim, mas não está presente', 'Não há informante disponível'], null, true);

  cabecalho('Gestação, parto e período neonatal');
  escolha('Idade gestacional ao nascer',
    ['A termo (37 semanas ou mais)', 'Prematuro tardio (34 a 36 semanas)',
     'Prematuro moderado (32 a 33 semanas)', 'Muito prematuro (28 a 31 semanas)',
     'Prematuro extremo (menos de 28 semanas)', 'Não sei informar'], null, true);
  texto('Peso ao nascer (gramas)', null, false);
  texto('Perímetro cefálico ao nascer (cm)', 'Se disponível na caderneta', false);
  multipla('Intercorrências gestacionais',
    ['Nenhuma', 'Hipertensão / pré-eclâmpsia', 'Diabetes gestacional', 'Infecções congênitas (sífilis, ' +
     'toxoplasmose, rubéola, citomegalovírus, HIV, Zika)', 'Restrição de crescimento intrauterino',
     'Sangramento ou ameaça de aborto', 'Depressão ou ansiedade materna', 'Não sei informar'],
    null, false, true);
  multipla('Exposições durante a gestação',
    ['Nenhuma', 'Tabaco', 'Álcool', 'Drogas ilícitas', 'Ácido valproico ou outro anticonvulsivante',
     'Antidepressivos', 'Outros medicamentos de uso contínuo', 'Não sei informar'],
    'A exposição pré-natal ao ácido valproico associa-se a risco elevado de TEA e de comprometimento cognitivo.',
    false, true);
  multipla('Intercorrências neonatais',
    ['Nenhuma', 'Necessitou de reanimação', 'Internação em UTI neonatal', 'Ventilação mecânica',
     'Icterícia com fototerapia ou exsanguineotransfusão', 'Hipoglicemia', 'Sepse neonatal',
     'Convulsão neonatal', 'Encefalopatia hipóxico-isquêmica', 'Hemorragia intracraniana',
     'Malformação congênita', 'Não sei informar'], null, false, true);
  escolha('Resultado da triagem auditiva neonatal (teste da orelhinha)',
    ['Normal', 'Alterado', 'Não realizado', 'Não sei informar'], null, false);

  cabecalho('Marcos do desenvolvimento',
    'Informe a idade aproximada, em meses. Se o marco não foi alcançado, escreva "não alcançou".');
  texto('Sentou sem apoio (meses)', 'Esperado: até 9 meses', false);
  texto('Andou sem apoio (meses)', 'Esperado: até 18 meses', false);
  texto('Primeiras palavras com significado (meses)', 'Esperado: até 15 meses', false);
  texto('Frases de duas palavras (meses)', 'Esperado: até 24 meses', false);
  texto('Controle de esfíncteres diurno (meses)', null, false);
  escolha('Houve atraso reconhecido no desenvolvimento durante a infância?',
    ['Não', 'Sim, apenas na fala', 'Sim, apenas motor', 'Sim, em várias áreas', 'Não sei informar'],
    null, true);

  cabecalho('Situação atual da linguagem');
  escolha('Como é a comunicação da pessoa avaliada hoje?',
    ['Linguagem oral fluente e funcional',
     'Linguagem oral fluente, porém com uso social atípico',
     'Fala frases simples',
     'Fala apenas palavras isoladas',
     'Não fala, mas se comunica por gestos, imagens ou comunicação alternativa',
     'Não fala e não utiliza comunicação alternativa'], null, true);

  // ======================================================================
  // 4. RASTREIO DE TEA — DSM-5-TR (todas as idades)
  // ======================================================================
  secao('4. Rastreio de Transtorno do Espectro Autista',
    'Itens organizados segundo os critérios diagnósticos do DSM-5-TR (APA, 2022). ' +
    'Marque o que é ou foi persistentemente característico da pessoa avaliada, em qualquer fase da vida. ' +
    'Este é um instrumento de triagem: não substitui a avaliação diagnóstica.');

  cabecalho('Critério A — Comunicação e interação social',
    'O diagnóstico exige que os três domínios abaixo (A1, A2 e A3) estejam comprometidos.');
  multipla('A1. Reciprocidade socioemocional', CONTEUDO.tea_A1.concat(['Nenhum dos acima']), null, true);
  multipla('A2. Comunicação não verbal', CONTEUDO.tea_A2.concat(['Nenhum dos acima']), null, true);
  multipla('A3. Desenvolvimento e manutenção de relacionamentos', CONTEUDO.tea_A3.concat(['Nenhum dos acima']), null, true);

  cabecalho('Critério B — Comportamentos restritos e repetitivos',
    'O diagnóstico exige pelo menos dois dos quatro domínios abaixo.');
  multipla('B1. Movimentos, fala ou uso de objetos estereotipados ou repetitivos', CONTEUDO.tea_B1.concat(['Nenhum dos acima']), null, true);
  multipla('B2. Insistência em rotinas e inflexibilidade', CONTEUDO.tea_B2.concat(['Nenhum dos acima']), null, true);
  multipla('B3. Interesses restritos e fixos', CONTEUDO.tea_B3.concat(['Nenhum dos acima']), null, true);
  multipla('B4. Hiper ou hiporreatividade sensorial', CONTEUDO.tea_B4.concat(['Nenhum dos acima']), null, true);

  cabecalho('Critérios C, D e E');
  escolha('C. Desde quando estes comportamentos estão presentes?',
    ['Desde antes dos 3 anos de idade',
     'Desde a infância, mas tornaram-se evidentes na idade escolar',
     'Tornaram-se evidentes apenas na adolescência ou na vida adulta, quando as demandas sociais aumentaram',
     'Surgiram após um evento específico (doença, trauma, perda)',
     'Não sei informar'],
    'Em pessoas com boa capacidade de compensação, os sinais podem só se manifestar quando as demandas ' +
    'sociais excedem os recursos disponíveis — o que é compatível com o critério C.', true);

  multipla('D. Em quais áreas há prejuízo clinicamente significativo atualmente?',
    ['Não há prejuízo relevante', 'Vida escolar ou acadêmica', 'Vida profissional', 'Relações familiares',
     'Relações de amizade', 'Relação conjugal ou afetiva', 'Autonomia e vida prática',
     'Saúde mental (ansiedade, depressão, esgotamento)', 'Participação social e comunitária'],
    null, true);

  escolha('E. As dificuldades são mais bem explicadas por deficiência intelectual isolada?',
    ['Não — as dificuldades sociais excedem o esperado para o nível de desenvolvimento',
     'Talvez — o nível de desenvolvimento global é muito rebaixado',
     'Não sei avaliar'], null, true);

  cabecalho('Especificadores e nível de apoio',
    'Preenchimento preferencial pela equipe, a partir do conjunto das respostas.');
  escolha('Nível de apoio necessário — comunicação social',
    ['Nível 1 — exige apoio', 'Nível 2 — exige apoio substancial',
     'Nível 3 — exige apoio muito substancial', 'Não se aplica'], null, false);
  escolha('Nível de apoio necessário — comportamentos restritos e repetitivos',
    ['Nível 1 — exige apoio', 'Nível 2 — exige apoio substancial',
     'Nível 3 — exige apoio muito substancial', 'Não se aplica'], null, false);
  escolha('Comprometimento intelectual concomitante', ['Sem comprometimento', 'Com comprometimento', 'A investigar'], null, false);
  escolha('Comprometimento de linguagem concomitante', ['Sem comprometimento', 'Com comprometimento', 'A investigar'], null, false);

  cabecalho('Camuflagem e compensação social',
    'Estratégias de mascaramento retardam o diagnóstico, sobretudo em meninas, mulheres e adultos, ' +
    'e associam-se a maior sofrimento psíquico.');
  multipla('Estratégias de camuflagem observadas ou relatadas',
    CONTEUDO.tea_camuflagem.concat(['Nenhuma das acima']), null, false);

  escolha('Já recebeu diagnóstico formal de TEA anteriormente?',
    ['Não', 'Sim, com laudo', 'Sim, sem laudo formal', 'Diagnóstico foi levantado, mas não confirmado'], null, true);
  texto('Se sim, em que ano e por qual profissional?', null, false);

  // ----------------------------------------------------------------------
  // Seções seguintes e roteamento por idade
  // ----------------------------------------------------------------------
  var pbSnap = secao('5A. SNAP-IV — Rastreio de TDAH (4 a 17 anos)',
    'Swanson, Nolan and Pelham Questionnaire, versão IV (18 itens do estudo MTA), adaptado para o português ' +
    'por Mattos et al. (2006). Responda considerando os últimos 6 meses, em comparação com pessoas da mesma idade.');

  var pbAq = secao('5B. AQ-10 — Rastreio de traços autistas (18 anos ou mais)',
    'Autism-Spectrum Quotient, versão breve de 10 itens (Allison, Auyeung & Baron-Cohen, 2012), recomendada ' +
    'pelo NICE para rastreio em adultos. Tradução livre para uso orientativo. Responda sobre você mesmo(a).');

  var pbAsrs = secao('5C. ASRS-18 — Rastreio de TDAH no adulto (18 anos ou mais)',
    'Adult ADHD Self-Report Scale, versão 1.1 da Organização Mundial da Saúde (Kessler et al., 2005), ' +
    'adaptada para o português por Mattos et al. (2006). Responda considerando os últimos 6 meses.');

  var pbTDI = secao('6. Funcionamento adaptativo — rastreio de transtorno do desenvolvimento intelectual',
    'O diagnóstico de transtorno do desenvolvimento intelectual exige déficits em funções intelectuais E em ' +
    'funcionamento adaptativo, com início no período do desenvolvimento (DSM-5-TR). ' +
    'Compare sempre com pessoas da mesma idade e do mesmo contexto sociocultural.');

  // Pergunta de roteamento, posicionada ao final da seção 4
  var qIdade = form.addMultipleChoiceItem();
  qIdade.setTitle('Faixa etária da pessoa avaliada')
        .setHelpText('Esta resposta direciona automaticamente para os instrumentos de rastreio adequados à idade.')
        .setRequired(true)
        .setChoices([
          qIdade.createChoice('Menos de 4 anos', pbTDI),
          qIdade.createChoice('4 a 17 anos', pbSnap),
          qIdade.createChoice('18 anos ou mais', pbAq)
        ]);
  moverPara(pbSnap);

  // Ao terminar o SNAP-IV, seguir direto para a seção 6
  pbAq.setGoToPage(pbTDI);

  // ======================================================================
  // 5A. SNAP-IV
  // ======================================================================
  for (var s = 0; s < CONTEUDO.snap.length; s++) {
    form.addMultipleChoiceItem()
        .setTitle((s + 1) + '. ' + CONTEUDO.snap[s])
        .setChoiceValues(LIKERT_SNAP)
        .setHelpText(s < 9 ? 'Desatenção' : 'Hiperatividade / impulsividade')
        .setRequired(true);
    moverPara(pbAq);
  }
  form.addCheckboxItem()
      .setTitle('Em quais ambientes estes comportamentos causam prejuízo?')
      .setChoiceValues(['Em casa', 'Na escola', 'Em atividades sociais ou com amigos', 'Em nenhum ambiente'])
      .setHelpText('O diagnóstico de TDAH exige prejuízo em pelo menos dois contextos (DSM-5-TR).')
      .setRequired(true);
  moverPara(pbAq);
  form.addMultipleChoiceItem()
      .setTitle('Estes comportamentos já estavam presentes antes dos 12 anos de idade?')
      .setChoiceValues(SIM_NAO)
      .setRequired(true);
  moverPara(pbAq);

  // ======================================================================
  // 5B. AQ-10
  // ======================================================================
  for (var a = 0; a < CONTEUDO.aq10.length; a++) {
    form.addMultipleChoiceItem()
        .setTitle((a + 1) + '. ' + CONTEUDO.aq10[a].t)
        .setChoiceValues(LIKERT_AQ)
        .setHelpText(CONTEUDO.aq10[a].inv
          ? 'Item de pontuação invertida: DISCORDAR indica traço autista.'
          : 'CONCORDAR indica traço autista.')
        .setRequired(true);
    moverPara(pbAsrs);
  }

  // ======================================================================
  // 5C. ASRS-18
  // ======================================================================
  for (var r = 0; r < CONTEUDO.asrs.length; r++) {
    form.addMultipleChoiceItem()
        .setTitle((r + 1) + '. ' + CONTEUDO.asrs[r])
        .setChoiceValues(LIKERT_ASRS)
        .setHelpText(r < 6 ? 'Parte A — itens de rastreio' : 'Parte B — sintomas complementares')
        .setRequired(true);
    moverPara(pbTDI);
  }
  form.addCheckboxItem()
      .setTitle('Em quais contextos estes sintomas causam prejuízo?')
      .setChoiceValues(['No trabalho', 'Nos estudos', 'Em casa', 'Nas relações sociais ou afetivas',
                        'Na organização financeira', 'Em nenhum contexto'])
      .setRequired(true);
  moverPara(pbTDI);
  form.addMultipleChoiceItem()
      .setTitle('Estes sintomas já estavam presentes antes dos 12 anos de idade?')
      .setChoiceValues(SIM_NAO)
      .setHelpText('Critério de início na infância, exigido pelo DSM-5-TR também no adulto.')
      .setRequired(true);
  moverPara(pbTDI);

  // ======================================================================
  // 6. FUNCIONAMENTO ADAPTATIVO / TDI
  // ======================================================================
  multipla('Domínio conceitual (acadêmico)', CONTEUDO.adapt_conceitual.concat(['Nenhum dos acima']), null, true);
  multipla('Domínio social', CONTEUDO.adapt_social.concat(['Nenhum dos acima']), null, true);
  multipla('Domínio prático (vida diária)', CONTEUDO.adapt_pratico.concat(['Nenhum dos acima']), null, true);

  escolha('Grau de autonomia atual em relação a pessoas da mesma idade',
    ['Totalmente independente',
     'Independente com pequenas adaptações',
     'Necessita de supervisão intermitente',
     'Necessita de supervisão frequente',
     'Necessita de supervisão contínua'], null, true);

  escolha('Já realizou avaliação formal de inteligência (teste de QI)?',
    ['Não', 'Sim, com resultado dentro da média', 'Sim, com resultado limítrofe',
     'Sim, com resultado indicativo de deficiência intelectual', 'Sim, mas não sei o resultado'], null, true);
  texto('Se sim, informe o instrumento, o ano e o resultado',
    'Ex.: WISC-IV, 2022, QI total 68', false);

  escolha('Já recebeu diagnóstico de deficiência intelectual ou atraso global do desenvolvimento?',
    ['Não', 'Sim, com laudo', 'Sim, sem laudo formal'], null, true);

  // ======================================================================
  // 7. TRANSTORNOS ESPECÍFICOS DE APRENDIZAGEM
  // ======================================================================
  secao('7. Rastreio de transtornos específicos de aprendizagem',
    'Itens baseados nos critérios do DSM-5-TR. O diagnóstico exige dificuldade persistente por pelo menos ' +
    '6 meses apesar de intervenção dirigida, desempenho substancialmente abaixo do esperado para a idade, ' +
    'início na idade escolar e ausência de explicação melhor por deficiência intelectual, déficit sensorial ' +
    'não corrigido, adversidade psicossocial ou ensino inadequado.');

  multipla('Dificuldades na LEITURA', CONTEUDO.apre_leitura.concat(['Nenhuma das acima']), null, true);
  multipla('Dificuldades na ESCRITA', CONTEUDO.apre_escrita.concat(['Nenhuma das acima']), null, true);
  multipla('Dificuldades em MATEMÁTICA', CONTEUDO.apre_matematica.concat(['Nenhuma das acima']), null, true);

  escolha('Há quanto tempo estas dificuldades persistem?',
    ['Menos de 6 meses', '6 meses a 1 ano', '1 a 3 anos', 'Mais de 3 anos', 'Desde a alfabetização'], null, true);
  escolha('As dificuldades persistem mesmo após apoio ou reforço escolar dirigido?',
    ['Sim, persistem', 'Melhoraram parcialmente', 'Nunca houve apoio dirigido', 'Não se aplica'], null, true);
  escolha('Em que fase da escolarização as dificuldades apareceram?',
    ['Educação infantil', 'Alfabetização (1º e 2º anos)', 'Anos iniciais (3º ao 5º ano)',
     'Anos finais (6º ao 9º ano)', 'Ensino médio', 'Ensino superior', 'Não sei informar'], null, true);

  cabecalho('Percurso escolar');
  escolha('Já repetiu algum ano escolar?', ['Não', 'Sim, uma vez', 'Sim, duas ou mais vezes'], null, true);
  escolha('Houve abandono ou evasão escolar?', ['Não', 'Sim, temporário', 'Sim, definitivo'], null, true);
  multipla('Apoios educacionais recebidos',
    ['Nenhum', 'Atendimento Educacional Especializado (AEE) / sala de recursos',
     'Profissional de apoio escolar (monitor ou mediador)', 'Plano Educacional Individualizado (PEI)',
     'Adaptação curricular', 'Tempo adicional em provas', 'Reforço escolar',
     'Adaptações no ensino superior ou no trabalho'], null, true, true);
  escolha('Há relatório escolar ou pedagógico disponível?',
    ['Sim, anexado ao prontuário', 'Sim, mas não foi trazido hoje', 'Não há'], null, false);

  cabecalho('Condições que precisam ser afastadas');
  escolha('A acuidade visual foi avaliada e está corrigida, se necessário?', SIM_NAO, null, true);
  escolha('A acuidade auditiva foi avaliada e está corrigida, se necessário?', SIM_NAO, null, true);
  escolha('A frequência escolar foi regular ao longo da escolarização?',
    ['Sim, regular', 'Faltas frequentes', 'Interrupções prolongadas', 'Não sei informar'], null, true);

  // ======================================================================
  // 8. SAÚDE MENTAL E COMPORTAMENTO
  // ======================================================================
  secao('8. Saúde mental e comportamento',
    'Condições psiquiátricas concomitantes são a regra, não a exceção, em pessoas autistas e com TDAH.');

  multipla('Sintomas ou diagnósticos presentes',
    ['Nenhum', 'Ansiedade generalizada', 'Ansiedade social', 'Crises de pânico', 'Fobias específicas',
     'Depressão', 'Ideação suicida atual ou passada', 'Tentativa de suicídio', 'Autolesão',
     'Transtorno obsessivo-compulsivo', 'Transtorno bipolar', 'Transtorno de estresse pós-traumático',
     'Tiques motores ou vocais', 'Síndrome de Tourette', 'Transtorno opositor-desafiador',
     'Transtorno de conduta', 'Transtorno alimentar', 'Uso prejudicial de álcool',
     'Uso prejudicial de outras substâncias', 'Sintomas psicóticos'], null, true, true);

  escolha('Faz ou já fez acompanhamento em saúde mental?',
    ['Nunca fez', 'Fez no passado', 'Faz atualmente'], null, true);
  texto('Se sim, com qual profissional e há quanto tempo?', null, false);

  multipla('Manifestações comportamentais relevantes',
    ['Nenhuma', 'Crises de desregulação emocional ("meltdown")', 'Fechamento e retraimento ("shutdown")',
     'Irritabilidade frequente', 'Agressividade contra pessoas', 'Agressividade contra objetos',
     'Isolamento social progressivo', 'Recusa escolar ou de trabalho', 'Rigidez e oposição a mudanças'],
    null, true, true);

  escolha('Tempo diário de uso de telas',
    ['Menos de 1 hora', '1 a 2 horas', '2 a 4 horas', '4 a 6 horas', 'Mais de 6 horas'], null, false);

  multipla('Eventos de vida significativos',
    ['Nenhum', 'Separação dos pais', 'Falecimento de pessoa próxima', 'Mudanças frequentes de cidade ou escola',
     'Acolhimento institucional ou adoção', 'Exposição a violência doméstica', 'Violência física',
     'Violência sexual', 'Bullying', 'Negligência', 'Insegurança alimentar', 'Desemprego prolongado'],
    'Situações confirmadas de violência contra criança ou adolescente exigem notificação compulsória ' +
    '(Lei 13.431/2017 e Lei 8.069/1990, art. 13).', false, true);

  // ======================================================================
  // 9. SONO, ALIMENTAÇÃO E PERFIL SENSORIAL
  // ======================================================================
  secao('9. Sono, alimentação e perfil sensorial', null);

  escolha('Quantas horas dorme por noite, em média?',
    ['Menos de 5 horas', '5 a 6 horas', '6 a 8 horas', '8 a 10 horas', 'Mais de 10 horas'], null, true);
  multipla('Problemas de sono presentes',
    ['Nenhum', 'Dificuldade para iniciar o sono', 'Despertares noturnos frequentes',
     'Ronco alto ou pausas respiratórias', 'Respira pela boca ao dormir', 'Sonambulismo',
     'Terror noturno', 'Pesadelos frequentes', 'Inquietação ou movimentos de pernas ao dormir',
     'Bruxismo', 'Enurese noturna', 'Sonolência diurna excessiva', 'Inversão do ciclo dia-noite'],
    'Distúrbios respiratórios do sono podem mimetizar ou agravar sintomas de desatenção e hiperatividade.',
    true, true);

  escolha('Como é a alimentação?',
    ['Variada, sem restrições', 'Recusa alguns alimentos, mas a dieta é variada',
     'Seletividade importante — menos de 20 alimentos aceitos',
     'Seletividade extrema — menos de 10 alimentos aceitos',
     'Depende de suplemento nutricional ou de sonda'], null, true);

  escolha('Intensidade global das alterações sensoriais no dia a dia', GRAVIDADE, null, true);

  // ======================================================================
  // 10. ANTECEDENTES CLÍNICOS
  // ======================================================================
  secao('10. Antecedentes clínicos e medicamentos', null);

  multipla('Antecedentes patológicos relevantes',
    ['Nenhum', 'Epilepsia ou crises epilépticas', 'Crise febril', 'Meningite ou encefalite',
     'Traumatismo cranioencefálico com perda de consciência', 'Acidente vascular cerebral',
     'Neurocirurgia prévia', 'Paralisia cerebral', 'Síndrome genética confirmada',
     'Erro inato do metabolismo', 'Cardiopatia congênita', 'Hipotireoidismo', 'Anemia ferropriva',
     'Deficiência auditiva', 'Deficiência visual', 'Prematuridade com sequelas',
     'Internações hospitalares prévias'], null, true, true);
  paragrafo('Detalhe os antecedentes marcados (datas, diagnósticos, serviço)', null, false);

  escolha('Faz uso de medicamentos atualmente?', ['Sim', 'Não'], null, true);
  paragrafo('Liste os medicamentos em uso, com dose e horário',
    'Ex.: Metilfenidato LA 30 mg — 1 cápsula às 7h; Sertralina 50 mg — 1 comprimido à noite', false);
  paragrafo('Medicamentos psicotrópicos já utilizados no passado e motivo da suspensão', null, false);
  texto('Alergias medicamentosas ou alimentares', 'Escreva "nega" se não houver', false);
  escolha('Situação vacinal', ['Em dia', 'Atrasada', 'Não sei informar'], null, false);

  // ======================================================================
  // 11. HISTÓRIA FAMILIAR
  // ======================================================================
  secao('11. História familiar',
    'A herdabilidade do TEA e do TDAH é elevada; a história familiar é dado clínico de peso.');

  escolha('Os pais são parentes consanguíneos (primos, tios)?', SIM_NAO,
    'A consanguinidade aumenta a probabilidade de condições autossômicas recessivas.', true);

  multipla('Familiares com alguma destas condições',
    ['Nenhuma', 'Transtorno do Espectro Autista', 'TDAH', 'Deficiência intelectual',
     'Atraso de fala', 'Dislexia ou outro transtorno de aprendizagem', 'Epilepsia',
     'Depressão', 'Transtorno bipolar', 'Esquizofrenia', 'Transtorno de ansiedade',
     'Transtorno obsessivo-compulsivo', 'Suicídio', 'Uso prejudicial de substâncias',
     'Síndrome genética confirmada', 'Doença neuromuscular', 'Doença neurodegenerativa'],
    null, true, true);
  paragrafo('Especifique o grau de parentesco dos familiares acometidos',
    'Ex.: irmão com TEA nível 2; tio materno com deficiência intelectual', false);
  escolha('Houve abortos de repetição ou óbito de crianças na família?', SIM_NAO, null, false);

  // ======================================================================
  // 12. CONTEXTO PSICOSSOCIAL E FUNCIONALIDADE
  // ======================================================================
  secao('12. Contexto psicossocial e funcionalidade', null);

  texto('Com quem reside atualmente?', 'Ex.: mãe, padrasto e dois irmãos; ou: sozinho(a)', true);
  escolha('Renda familiar mensal aproximada',
    ['Até 1 salário mínimo', '1 a 2 salários mínimos', '2 a 3 salários mínimos',
     '3 a 5 salários mínimos', 'Mais de 5 salários mínimos', 'Prefiro não informar'], null, false);
  multipla('A família ou a pessoa recebe algum benefício?',
    ['Nenhum', 'Bolsa Família', 'BPC / LOAS', 'Auxílio-doença', 'Aposentadoria por invalidez',
     'Passe livre', 'Isenção de impostos'], null, false, true);
  escolha('Situação de trabalho (para adolescentes e adultos)',
    ['Não se aplica', 'Estuda apenas', 'Trabalha formalmente', 'Trabalha informalmente',
     'Desempregado(a)', 'Afastado(a) por saúde', 'Aposentado(a)',
     'Não trabalha nem estuda'], null, false);
  escolha('Existe medida de curatela ou tomada de decisão apoiada?',
    ['Não', 'Sim, curatela', 'Sim, tomada de decisão apoiada', 'Em processo judicial'], null, false);
  escolha('Possui Carteira de Identificação da Pessoa com Transtorno do Espectro Autista (CIPTEA)?',
    ['Não', 'Sim', 'Em processo de solicitação', 'Não se aplica'],
    'Instituída pela Lei 13.977/2020 (Lei Romeo Mion).', false);

  // ======================================================================
  // 13. TERAPIAS E EXAMES PRÉVIOS
  // ======================================================================
  secao('13. Terapias e exames já realizados', null);

  multipla('Terapias em andamento ou já realizadas',
    ['Nenhuma', 'Fonoaudiologia', 'Terapia ocupacional', 'Terapia ocupacional com integração sensorial',
     'Psicologia', 'Psicologia com abordagem ABA', 'Terapia cognitivo-comportamental',
     'Psicopedagogia', 'Fisioterapia', 'Musicoterapia', 'Equoterapia',
     'Treino de habilidades sociais', 'Comunicação alternativa e ampliada'], null, true, true);
  texto('Frequência semanal total de terapias', 'Ex.: 4 sessões por semana', false);

  multipla('Exames complementares já realizados',
    ['Nenhum', 'Eletroencefalograma (EEG)', 'Ressonância magnética de encéfalo', 'Tomografia de crânio',
     'Cariótipo', 'CGH-array (microarranjo cromossômico)', 'Pesquisa de X-Frágil (FMR1)',
     'Exoma ou painel genético', 'Triagem metabólica', 'PEATE / BERA', 'Audiometria',
     'Avaliação oftalmológica', 'Avaliação neuropsicológica', 'Avaliação fonoaudiológica formal',
     'Polissonografia', 'Hemograma, ferritina, TSH e vitamina D'], null, true, true);
  paragrafo('Resultados relevantes dos exames acima',
    'Traga os laudos no dia do mutirão.', false);

  // ======================================================================
  // 14. EXAME FÍSICO E NEUROLÓGICO — EQUIPE
  // ======================================================================
  secao('14. Exame físico e neurológico — PREENCHIMENTO DA EQUIPE',
    'Seção de uso exclusivo do profissional médico durante o atendimento.');

  texto('Profissional responsável pelo atendimento', 'Nome, CRM e RQE', true);

  cabecalho('Antropometria');
  texto('Peso (kg)', null, false);
  texto('Estatura (cm)', null, false);
  texto('Perímetro cefálico (cm)', null, false);
  escolha('Classificação do perímetro cefálico',
    ['Normocefalia (entre -2 e +2 DP)', 'Microcefalia (< -2 DP)', 'Macrocefalia (> +2 DP)', 'Não aferido'],
    'Curvas da OMS ou INTERGROWTH-21st conforme a idade; em adultos, referência populacional.', false);
  escolha('Estado nutricional',
    ['Eutrófico', 'Magreza', 'Magreza acentuada', 'Sobrepeso', 'Obesidade', 'Não avaliado'], null, false);

  cabecalho('Exame dismorfológico e cutâneo');
  multipla('Achados dismórficos e neurocutâneos',
    ['Sem achados', 'Fácies sindrômica', 'Manchas café com leite (6 ou mais, maiores que 5 mm)',
     'Efélides axilares ou inguinais', 'Manchas hipocrômicas à lâmpada de Wood',
     'Angiofibromas faciais', 'Mancha em vinho do porto em território trigeminal',
     'Lesão de linha média em dorso', 'Hipertricose lombossacra', 'Macrocrania familiar',
     'Alterações de mãos ou pés (clinodactilia, prega palmar única)', 'Alterações auriculares',
     'Hiperelasticidade cutânea ou hipermobilidade articular', 'Hipoplasia de esmalte dentário'],
    'A pesquisa de estigmas neurocutâneos é mandatória na avaliação do neurodesenvolvimento.', false, true);

  cabecalho('Exame neurológico');
  escolha('Estado mental e interação',
    ['Alerta e interativo', 'Alerta com interação reduzida', 'Contato social atípico',
     'Sonolento', 'Não avaliável'], null, false);
  escolha('Tônus muscular',
    ['Normal', 'Hipotonia axial', 'Hipotonia global', 'Hipertonia espástica', 'Hipertonia distônica', 'Misto'], null, false);
  escolha('Força muscular',
    ['Preservada e simétrica', 'Déficit focal', 'Déficit proximal', 'Déficit distal', 'Não avaliável'], null, false);
  escolha('Reflexos osteotendinosos',
    ['Normorreflexia', 'Hiporreflexia', 'Arreflexia', 'Hiperreflexia', 'Assimétricos'], null, false);
  escolha('Marcha',
    ['Normal', 'Atáxica', 'Espástica ou em tesoura', 'Escarvante', 'Anserina (miopática)',
     'Em pontas de pé', 'Não deambula'], null, false);
  escolha('Coordenação e equilíbrio',
    ['Adequados', 'Dismetria', 'Tremor de intenção', 'Disdiadococinesia', 'Romberg positivo', 'Não avaliável'], null, false);
  escolha('Nervos cranianos', ['Sem alterações', 'Com alterações', 'Não avaliável'], null, false);
  texto('Se alterados, especifique quais nervos cranianos', null, false);
  multipla('Movimentos involuntários observados',
    ['Ausentes', 'Estereotipias', 'Tiques motores', 'Tiques vocais', 'Coreia', 'Distonia',
     'Mioclonias', 'Tremor'], null, false, true);
  escolha('Fundo de olho',
    ['Normal', 'Papiledema', 'Atrofia óptica', 'Alteração retiniana', 'Não realizado'], null, false);
  paragrafo('Observações do exame e da observação clínica direta da interação', null, false);

  // ======================================================================
  // 15. HIPÓTESE DIAGNÓSTICA E CONDUTA — EQUIPE
  // ======================================================================
  secao('15. Hipótese diagnóstica e conduta — PREENCHIMENTO DA EQUIPE', null);

  multipla('Hipóteses diagnósticas',
    ['Desenvolvimento dentro da normalidade',
     'Transtorno do Espectro Autista — confirmado',
     'Transtorno do Espectro Autista — a confirmar',
     'Transtorno do Espectro Autista — afastado',
     'TDAH — apresentação predominantemente desatenta',
     'TDAH — apresentação predominantemente hiperativa/impulsiva',
     'TDAH — apresentação combinada',
     'Transtorno do desenvolvimento intelectual',
     'Atraso global do desenvolvimento',
     'Transtorno específico da aprendizagem com prejuízo na leitura',
     'Transtorno específico da aprendizagem com prejuízo na expressão escrita',
     'Transtorno específico da aprendizagem com prejuízo na matemática',
     'Transtorno do desenvolvimento da linguagem',
     'Transtorno do desenvolvimento da coordenação',
     'Transtorno de ansiedade',
     'Transtorno depressivo',
     'Transtorno de tiques ou Tourette',
     'Epilepsia',
     'Distúrbio respiratório do sono',
     'Suspeita de síndrome genética',
     'Queixa de origem psicossocial ou contextual'],
    null, true, true);

  texto('CID-10 principal', 'Ex.: F84.0 (TEA), F90.0 (TDAH), F70-F79 (TDI), F81.0 (dislexia)', false);
  texto('CID-10 secundários', null, false);
  texto('Qualificadores da CIF, se utilizados', null, false);

  escolha('Classificação de risco e prioridade',
    ['Verde — acompanhamento na atenção básica',
     'Amarelo — reavaliação ambulatorial em até 90 dias',
     'Laranja — avaliação especializada em até 30 dias',
     'Vermelho — encaminhamento imediato ou urgência'], null, true);

  multipla('Exames solicitados hoje',
    ['Nenhum', 'EEG', 'Ressonância magnética de encéfalo', 'Cariótipo', 'CGH-array',
     'X-Frágil (FMR1)', 'Painel genético ou exoma', 'Triagem metabólica', 'PEATE / BERA',
     'Audiometria', 'Avaliação oftalmológica', 'Polissonografia',
     'Hemograma, ferritina, TSH e vitamina D', 'Avaliação neuropsicológica',
     'Avaliação fonoaudiológica formal', 'Avaliação do funcionamento adaptativo'], null, false, true);

  multipla('Encaminhamentos realizados',
    ['Nenhum', 'Fonoaudiologia', 'Terapia ocupacional', 'Psicologia', 'Psicopedagogia', 'Fisioterapia',
     'Neuropediatria — seguimento', 'Neurologia de adultos', 'Psiquiatria da infância e adolescência',
     'Psiquiatria de adultos', 'Genética médica', 'Oftalmologia', 'Otorrinolaringologia',
     'Nutrição', 'CAPS / CAPSi', 'AEE / sala de recursos', 'Serviço social',
     'Centro Especializado em Reabilitação (CER)', 'Conselho Tutelar (notificação)'], null, false, true);

  escolha('Foi iniciada ou ajustada medicação?', ['Não', 'Sim'], null, true);
  paragrafo('Se sim, descreva a prescrição (fármaco, dose, posologia e orientações)', null, false);

  multipla('Documentos emitidos no atendimento',
    ['Nenhum', 'Relatório médico circunstanciado', 'Relatório escolar ou de inclusão',
     'Laudo para CIPTEA', 'Laudo para BPC / LOAS', 'Laudo para plano de saúde',
     'Relatório para adaptação no trabalho', 'Receituário', 'Solicitação de exames', 'Atestado'],
    null, false, true);

  escolha('Desfecho do atendimento',
    ['Alta com orientações',
     'Retorno ao mutirão para reavaliação',
     'Seguimento ambulatorial especializado',
     'Contrarreferência à atenção básica',
     'Encaminhamento para serviço de urgência'], null, true);

  paragrafo('Orientações fornecidas à pessoa avaliada e à família', null, false);
  paragrafo('Observações finais da equipe', null, false);

  // ======================================================================
  // 16. CONSENTIMENTO
  // ======================================================================
  secao('16. Consentimento', null);

  escolha('Declaro que as informações prestadas são verdadeiras e autorizo o registro e o tratamento dos ' +
          'dados de identificação e de saúde aqui informados, para finalidade assistencial, nos termos da ' +
          'Lei Geral de Proteção de Dados (Lei 13.709/2018, arts. 7º, VIII; 11, II, alínea "f"; e 14).',
          ['Sim, autorizo'], null, true);
  escolha('Autorizo o uso dos dados, de forma anonimizada, para fins epidemiológicos e de planejamento em saúde.',
          ['Sim, autorizo', 'Não autorizo'], null, true);
  texto('Nome completo de quem assina este consentimento', null, true);
  escolha('Quem assina o consentimento?',
          ['A própria pessoa avaliada', 'Responsável legal', 'Curador(a)'], null, true);

  // ----------------------------------------------------------------------
  // Planilha de respostas
  // ----------------------------------------------------------------------
  var planilha = SpreadsheetApp.create('Anamnese — Mutirão de Neurodesenvolvimento (respostas)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

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
