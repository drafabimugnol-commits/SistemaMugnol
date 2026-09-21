# Anamnese — Mutirão de Neurodesenvolvimento

Gerador do formulário (Google Forms) de triagem para **Transtorno do Espectro
Autista em todas as idades, inclusive adultos**, **TDAH**, **transtorno do
desenvolvimento intelectual** e **transtornos específicos de aprendizagem**.

## Como gerar o formulário

São cinco passos, uma única vez. O passo 4 é o que costuma interromper quem
nunca usou o Apps Script — leia-o antes de começar.

1. **Copie o código.** Abra `anamnese-mutirao.gs` no GitHub e clique no ícone
   de cópia (*Copy raw file*), no canto superior direito do arquivo. O arquivo
   inteiro vai para a área de transferência de uma vez.

2. **Crie o projeto.** Acesse <https://script.google.com>, clique em
   **Novo projeto**, apague tudo o que estiver em `Código.gs` e cole
   (`Ctrl` + `V`).

3. **Execute.** Clique em **Executar**, na barra superior. A função
   `criarAnamneseMutirao` já vem selecionada por ser a única do arquivo.

4. **Autorize.** Aparece a janela *"Autorização necessária"* → clique em
   **Revisar permissões** e escolha sua conta Google. Muito provavelmente
   surgirá então a tela **"O Google não verificou este app"**, sem nenhum botão
   visível para seguir adiante. É esperado, e não indica problema: o aviso
   aparece para qualquer script pessoal que não tenha passado pela revisão da
   loja de complementos do Google — inclusive um escrito por você mesma, no seu
   próprio projeto. Para prosseguir:

   - clique em **Avançado**, no canto inferior esquerdo;
   - clique em **Acessar Projeto sem título (não seguro)**;
   - confira as permissões pedidas (Formulários, Planilhas e Drive) e clique
     em **Permitir**.

   As permissões são necessárias porque o script cria o formulário, cria a
   planilha de respostas e grava ambos no seu Drive.

5. **Pegue os links.** A execução leva cerca de um minuto. Abra o
   **Registro de execução** (`Ctrl` + `Enter`): ali estão os três links —
   edição, resposta e planilha de respostas.

Cada execução gera um formulário **novo e independente**; executar de novo não
altera os formulários já criados nem as respostas já coletadas.

### Se algo der errado

| O que aparece | O que fazer |
|---|---|
| *"O Google não verificou este app"* | **Avançado** → **Acessar … (não seguro)** → **Permitir**. Ver passo 4. |
| *"Exceção: Limite de tamanho excedido"* ou execução interrompida | Reduza listas no bloco `=== CONTEÚDO EDITÁVEL ===` e execute de novo. |
| Nada aparece no Registro de execução | Abra o menu **Execuções**, na barra lateral esquerda, e veja o estado da última execução. |
| O formulário saiu, mas falta alguma seção | Confira o final do Registro de execução: ele imprime os três links apenas quando o script termina por inteiro. |

## Como editar depois

**Pela interface do Google Forms** — o formulário é seu e fica integralmente
editável: reescrever enunciados, acrescentar e excluir perguntas, reordenar
seções, alterar obrigatoriedade e refazer a lógica de ramificação. É o caminho
para ajustes pontuais e para mudanças durante o próprio mutirão.

**Pelo script** — para mudanças que você queira preservar em futuras gerações,
edite o bloco `=== CONTEÚDO EDITÁVEL ===`, no topo do arquivo. Ali ficam, em
listas nomeadas, todos os itens das triagens (critérios A e B do TEA,
camuflagem, AQ-10, SNAP-IV, ASRS-18, funcionamento adaptativo e aprendizagem).
Acrescentar um item é acrescentar uma linha à lista correspondente.

## Estrutura do instrumento

| Seção | Conteúdo | Preenchimento |
|---|---|---|
| 1 | Identificação civil completa, filiação, endereço, contatos, escolaridade e origem do encaminhamento | Pessoa avaliada / responsável |
| 2 | Motivo da avaliação e sinais de alerta | Pessoa avaliada / responsável |
| 3 | História do desenvolvimento: gestação, período neonatal, marcos e linguagem atual | Pessoa avaliada / responsável |
| 4 | **Rastreio de TEA — critérios A, B, C, D e E do DSM-5-TR**, especificadores, nível de apoio e camuflagem | Pessoa avaliada / responsável |
| 5A | **SNAP-IV** — 18 itens (4 a 17 anos) | Responsável |
| 5B | **AQ-10** — 10 itens (18 anos ou mais) | Pessoa avaliada |
| 5C | **ASRS-18** — 18 itens (18 anos ou mais) | Pessoa avaliada |
| 6 | Funcionamento adaptativo nos domínios conceitual, social e prático | Pessoa avaliada / responsável |
| 7 | Transtornos específicos de aprendizagem: leitura, escrita e matemática; percurso escolar | Pessoa avaliada / responsável |
| 8 | Saúde mental, comorbidades e eventos de vida | Pessoa avaliada / responsável |
| 9 | Sono, alimentação e perfil sensorial | Pessoa avaliada / responsável |
| 10 | Antecedentes clínicos e medicamentos | Pessoa avaliada / responsável |
| 11 | História familiar e consanguinidade | Pessoa avaliada / responsável |
| 12 | Contexto psicossocial, funcionalidade, benefícios, curatela e CIPTEA | Pessoa avaliada / responsável |
| 13 | Terapias e exames prévios | Pessoa avaliada / responsável |
| 14 | Exame físico, dismorfológico e neurológico | **Equipe médica** |
| 15 | Hipótese diagnóstica, CID-10/CIF, classificação de risco e conduta | **Equipe médica** |
| 16 | Consentimento (LGPD) | Pessoa avaliada / responsável |

### Ramificação automática por idade

A seção 4 termina com uma pergunta de faixa etária que direciona o respondente:

- **Menos de 4 anos** → segue direto para a seção 6;
- **4 a 17 anos** → SNAP-IV (5A) → seção 6;
- **18 anos ou mais** → AQ-10 (5B) → ASRS-18 (5C) → seção 6.

O rastreio de TEA da seção 4 é **universal**: aplica-se a todas as idades, por
ser construído diretamente sobre os critérios diagnósticos, e não sobre um
instrumento com faixa etária restrita.

## Interpretação das triagens

### Seção 4 — TEA (DSM-5-TR)

Não é uma escala com escore. O diagnóstico exige:

- **critério A** — comprometimento nos **três** domínios (A1, A2 e A3);
- **critério B** — pelo menos **dois** dos quatro domínios (B1 a B4);
- **critério C** — sinais presentes desde o período inicial do desenvolvimento,
  ainda que só se manifestem plenamente quando as demandas sociais excedem a
  capacidade de compensação;
- **critério D** — prejuízo clinicamente significativo;
- **critério E** — não mais bem explicado por transtorno do desenvolvimento
  intelectual isolado.

### Seção 5A — SNAP-IV

Itens 1 a 9: desatenção. Itens 10 a 18: hiperatividade/impulsividade.
Contam-se como positivos os itens respondidos como **"Bastante"** ou
**"Demais"**. Corte: **6 ou mais itens positivos** em qualquer um dos domínios,
somados à exigência de prejuízo em pelo menos dois contextos e início antes dos
12 anos.

### Seção 5B — AQ-10

Corte: **6 pontos ou mais**. Pontuam 1 ponto:

- os itens **1, 7, 8 e 10** quando respondidos com *concordo totalmente* ou
  *concordo um pouco*;
- os itens **2, 3, 4, 5, 6 e 9** quando respondidos com *discordo totalmente*
  ou *discordo um pouco*.

### Seção 5C — ASRS-18

A **Parte A** (itens 1 a 6) é o bloco de rastreio. Contam-se como positivos:

- itens **1, 2 e 3** — *às vezes*, *frequentemente* ou *muito frequentemente*;
- itens **4, 5 e 6** — *frequentemente* ou *muito frequentemente*.

**4 ou mais** itens positivos na Parte A indicam sintomatologia altamente
compatível com TDAH no adulto. A Parte B (itens 7 a 18) não tem ponto de corte
e serve à caracterização do perfil sintomático.

### Seção 6 — Funcionamento adaptativo

Sem escore. O transtorno do desenvolvimento intelectual exige déficit
**simultâneo** em funções intelectuais e em funcionamento adaptativo, com
início no período do desenvolvimento. A gravidade é definida pelo
funcionamento adaptativo, não pelo QI.

### Seção 7 — Transtornos específicos de aprendizagem

Sem escore. Exige-se dificuldade persistente por pelo menos 6 meses apesar de
intervenção dirigida, desempenho substancialmente abaixo do esperado para a
idade, início na idade escolar e ausência de explicação melhor por deficiência
intelectual, déficit sensorial não corrigido, adversidade psicossocial ou
ensino inadequado — razão pela qual a seção inclui os itens de acuidade visual,
acuidade auditiva e frequência escolar.

> Todos os instrumentos acima são de **rastreio**, não de diagnóstico. Resultado
> positivo indica necessidade de avaliação diagnóstica estruturada.

## Sobre a redação dos itens

Os itens do SNAP-IV, do ASRS-18 e do AQ-10 reproduzem o conteúdo dos
instrumentos originais em redação de trabalho em português. O SNAP-IV e o
ASRS-18 possuem adaptação transcultural publicada para o português do Brasil
(Mattos et al., 2006); o AQ-10 é aqui apresentado em tradução livre, de valor
orientativo. Para uso em pesquisa, perícia ou qualquer contexto que exija
escore formalmente comparável, confira os itens contra as versões publicadas
antes de aplicar.

## Proteção de dados

Este formulário reúne identificação civil (CPF, RG, filiação, endereço) e dados
pessoais sensíveis de saúde — combinação que eleva o impacto de um eventual
incidente. Recomenda-se:

- hospedar formulário e planilha em conta institucional, nunca pessoal;
- restringir o compartilhamento da planilha à equipe assistencial nominalmente;
- não ativar a coleta automática de e-mail do respondente sem necessidade;
- definir prazo de guarda conforme a legislação de prontuário
  (Resolução CFM nº 1.821/2007 e Lei nº 13.787/2018);
- registrar a operação no inventário de tratamento de dados da instituição.

Base legal: Lei nº 13.709/2018 (LGPD), art. 5º, II; art. 7º, VIII;
art. 11, II, alínea "f"; e art. 14.

## Referências

1. American Psychiatric Association. *Diagnostic and Statistical Manual of
   Mental Disorders*. 5th ed., text revision (DSM-5-TR). Washington, DC: APA;
   2022.
2. Allison C, Auyeung B, Baron-Cohen S. Toward brief "red flags" for autism
   screening: the Short Autism Spectrum Quotient and the Short Quantitative
   Checklist in 1,000 cases and 3,000 controls. *Journal of the American Academy
   of Child & Adolescent Psychiatry*. 2012;51(2):202-212.
3. Baron-Cohen S, Wheelwright S, Skinner R, Martin J, Clubley E. The
   Autism-Spectrum Quotient (AQ): evidence from Asperger syndrome/high-functioning
   autism, males and females, scientists and mathematicians. *Journal of Autism
   and Developmental Disorders*. 2001;31(1):5-17.
4. National Institute for Health and Care Excellence. *Autism spectrum disorder
   in adults: diagnosis and management*. Clinical guideline CG142. London: NICE;
   2012 (atualizada em 2021).
5. Kessler RC, Adler L, Ames M, et al. The World Health Organization Adult ADHD
   Self-Report Scale (ASRS): a short screening scale for use in the general
   population. *Psychological Medicine*. 2005;35(2):245-256.
6. Mattos P, Segenreich D, Saboya E, Louzã M, Dias G, Romano M. Adaptação
   transcultural para o português da escala Adult Self-Report Scale para
   avaliação do transtorno de déficit de atenção/hiperatividade em adultos.
   *Revista de Psiquiatria Clínica*. 2006;33(4):188-194.
7. Mattos P, Serra-Pinheiro MA, Rohde LA, Pinto D. Apresentação de uma versão em
   português para uso no Brasil do instrumento MTA-SNAP-IV. *Revista de
   Psiquiatria do Rio Grande do Sul*. 2006;28(3):290-297.
8. Hull L, Petrides KV, Allison C, et al. "Putting on my best normal": social
   camouflaging in adults with autism spectrum conditions. *Journal of Autism and
   Developmental Disorders*. 2017;47(8):2519-2534.
9. Lai MC, Lombardo MV, Ruigrok AN, et al. Quantifying and exploring
   camouflaging in men and women with autism. *Autism*. 2017;21(6):690-702.
10. Hyman SL, Levy SE, Myers SM; AAP Council on Children with Disabilities.
    Identification, Evaluation, and Management of Children With Autism Spectrum
    Disorder. *Pediatrics*. 2020;145(1):e20193447.
11. Wolraich ML, Hagan JF, Allan C, et al.; AAP Subcommittee on Children and
    Adolescents with ADHD. Clinical Practice Guideline for the Diagnosis,
    Evaluation, and Treatment of ADHD in Children and Adolescents. *Pediatrics*.
    2019;144(4):e20192528.
12. Schalock RL, Luckasson R, Tassé MJ. *Intellectual Disability: Definition,
    Diagnosis, Classification, and Systems of Supports*. 12th ed. Washington, DC:
    AAIDD; 2021.
13. Moeschler JB, Shevell M; AAP Committee on Genetics. Comprehensive Evaluation
    of the Child With Intellectual Disability or Global Developmental Delays.
    *Pediatrics*. 2014;134(3):e903-e918.
14. Peterson RL, Pennington BF. Developmental dyslexia. *Annual Review of
    Clinical Psychology*. 2015;11:283-307.
15. Bromley RL, Weston J, Marson AG. Maternal Use of Antiepileptic Agents During
    Pregnancy and Major Congenital Malformations and Neurodevelopmental Outcomes.
    *JAMA*. 2017;318(17):1700-1701.
16. Brasil. Lei nº 13.977, de 8 de janeiro de 2020 (Lei Romeo Mion) — institui a
    Carteira de Identificação da Pessoa com Transtorno do Espectro Autista.
