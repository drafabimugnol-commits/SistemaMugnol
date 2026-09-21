# Anamnese Neuropediátrica — Mutirão

Gerador automático do formulário de anamnese (Google Forms) para o mutirão de neuropediatria.

## Como gerar o formulário

1. Acesse <https://script.google.com> e crie um novo projeto.
2. Apague o conteúdo padrão do arquivo `Código.gs`.
3. Cole o conteúdo integral de `anamnese-mutirao.gs`.
4. Selecione a função `criarAnamneseMutirao` e clique em **Executar**.
5. Autorize os acessos solicitados (Formulários, Planilhas e Drive).
6. Os três links — edição, resposta e planilha de respostas — aparecem no
   **Registro de execução** (`Ctrl` + `Enter`).

A execução leva cerca de um minuto e pode ser repetida quantas vezes for
necessário; cada execução gera um formulário novo e independente.

## Estrutura do instrumento

| Seção | Conteúdo | Preenchimento |
|---|---|---|
| 1 | Identificação, dados escolares e origem do encaminhamento | Responsável/acolhimento |
| 2 | Queixa principal, história atual e sinais de alarme | Responsável/acolhimento |
| 3 | História gestacional, perinatal e neonatal | Responsável/acolhimento |
| 4 | Marcos do desenvolvimento neuropsicomotor | Responsável/acolhimento |
| 5 | Roteamento automático por faixa etária | Responsável/acolhimento |
| 5A | M-CHAT-R — 20 itens (16 a 30 meses) | Responsável |
| 5B | Sinais nucleares de TEA, domínios A e B (acima de 30 meses) | Responsável |
| 5C | SNAP-IV — 18 itens (a partir de 4 anos) | Responsável |
| 6 | Antecedentes patológicos, medicamentos e vacinação | Responsável/acolhimento |
| 7 | Sono, alimentação e perfil sensorial | Responsável/acolhimento |
| 8 | Escolaridade e aprendizagem | Responsável/acolhimento |
| 9 | Comportamento, saúde mental, telas e eventos de vida | Responsável/acolhimento |
| 10 | História familiar e consanguinidade | Responsável/acolhimento |
| 11 | Contexto familiar e psicossocial | Responsável/acolhimento |
| 12 | Terapias e exames prévios | Responsável/acolhimento |
| 13 | Exame físico, dismorfológico e neurológico | **Equipe médica** |
| 14 | Hipótese diagnóstica, classificação de risco e conduta | **Equipe médica** |
| 15 | Consentimento do responsável (LGPD) | Responsável |

### Ramificação condicional

A seção 5 direciona automaticamente o respondente conforme a faixa etária:

- **0 a 15 meses** → segue direto para a seção 6;
- **16 a 30 meses** → M-CHAT-R (5A) → seção 6;
- **31 meses ou mais** → rastreio de TEA (5B) →
  - com 4 anos ou mais → SNAP-IV (5C) → seção 6;
  - com menos de 4 anos → seção 6.

## Interpretação dos instrumentos de rastreio

### M-CHAT-R (seção 5A)

Pontua-se 1 ponto por resposta de risco. Nos itens **2, 5 e 12** a resposta de
risco é **"Sim"**; em todos os demais, **"Não"**.

| Escore | Risco | Conduta |
|---|---|---|
| 0–2 | Baixo | Rastreio negativo; repetir aos 24 meses se aplicado antes |
| 3–7 | Moderado | Aplicar a entrevista de seguimento (M-CHAT-R/F) |
| 8–20 | Alto | Dispensar a entrevista; encaminhar de imediato para avaliação diagnóstica e intervenção precoce |

### SNAP-IV (seção 5C)

Itens 1–9 avaliam desatenção; itens 10–18, hiperatividade/impulsividade.
Consideram-se positivos os itens respondidos como **"Bastante"** ou **"Demais"**.
O ponto de corte é de **6 ou mais itens positivos** em qualquer um dos domínios,
exigindo ainda prejuízo em pelo menos dois contextos e início antes dos 12 anos
(DSM-5-TR).

> Os dois instrumentos são de **rastreio**, não de diagnóstico. Um resultado
> positivo indica necessidade de avaliação diagnóstica estruturada.

## Proteção de dados

O formulário coleta dados pessoais sensíveis de saúde de crianças e
adolescentes. Recomenda-se:

- hospedar o formulário e a planilha em conta institucional, não pessoal;
- restringir o compartilhamento da planilha de respostas à equipe assistencial;
- não ativar a coleta automática de e-mail sem necessidade assistencial;
- arquivar as respostas segundo o prazo de guarda de prontuário
  (Resolução CFM nº 1.821/2007 e Lei nº 13.787/2018).

Base legal: Lei nº 13.709/2018 (LGPD), art. 5º, II; art. 7º, VIII;
art. 11, II, alínea "f"; e art. 14.

## Referências

1. American Psychiatric Association. *Diagnostic and Statistical Manual of
   Mental Disorders*. 5th ed., text revision (DSM-5-TR). Washington, DC: APA;
   2022.
2. Robins DL, Casagrande K, Barton M, Chen CMA, Dumont-Mathieu T, Fein D.
   Validation of the Modified Checklist for Autism in Toddlers, Revised with
   Follow-up (M-CHAT-R/F). *Pediatrics*. 2014;133(1):37-45.
3. Losapio MF, Pondé MP. Tradução para o português da escala M-CHAT para
   rastreamento precoce de autismo. *Revista de Psiquiatria do Rio Grande do
   Sul*. 2008;30(3):221-229.
4. Hyman SL, Levy SE, Myers SM; AAP Council on Children with Disabilities.
   Identification, Evaluation, and Management of Children With Autism Spectrum
   Disorder. *Pediatrics*. 2020;145(1):e20193447.
5. Mattos P, Serra-Pinheiro MA, Rohde LA, Pinto D. Apresentação de uma versão
   em português para uso no Brasil do instrumento MTA-SNAP-IV de avaliação de
   sintomas de transtorno do déficit de atenção/hiperatividade e sintomas de
   transtorno desafiador e de oposição. *Revista de Psiquiatria do Rio Grande do
   Sul*. 2006;28(3):290-297.
6. Wolraich ML, Hagan JF, Allan C, et al.; AAP Subcommittee on Children and
   Adolescents with ADHD. Clinical Practice Guideline for the Diagnosis,
   Evaluation, and Treatment of ADHD in Children and Adolescents. *Pediatrics*.
   2019;144(4):e20192528.
7. Moeschler JB, Shevell M; AAP Committee on Genetics. Comprehensive Evaluation
   of the Child With Intellectual Disability or Global Developmental Delays.
   *Pediatrics*. 2014;134(3):e903-e918.
8. Srour M, Shevell M. Genetics and the investigation of developmental delay/
   intellectual disability. *Archives of Disease in Childhood*.
   2014;99(4):386-389.
9. Sociedade Brasileira de Pediatria. *Manual de Orientação: Grupo de Trabalho
   Saúde na Era Digital — #MenosTelas #MaisSaúde*. Rio de Janeiro: SBP; 2019.
10. Bromley RL, Weston J, Marson AG. Maternal Use of Antiepileptic Agents During
    Pregnancy and Major Congenital Malformations and Neurodevelopmental
    Outcomes. *JAMA*. 2017;318(17):1700-1701.
11. Brasil. Ministério da Saúde. *Caderneta da Criança*. 3ª ed. Brasília:
    Ministério da Saúde; 2024.
12. World Health Organization. *WHO Child Growth Standards: head
    circumference-for-age*. Geneva: WHO; 2007.
