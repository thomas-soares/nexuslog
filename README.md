# NexusLog HUB

NexusLog HUB é uma aplicação Next.js para acompanhar partidas competitivas de League of Legends. A home lista partidas próximas, em andamento e recentes usando a agenda oficial do LoL Esports.

## Estado atual

- A home (`/`) usa dados reais da API oficial do LoL Esports.
- A aba **Próximas** inclui partidas futuras e partidas cujo horário começou há no máximo uma hora.
- Quando o horário já começou, mas a API ainda não confirmou `inProgress`, a partida aparece como **Aguardando atualização**.
- Quando a API confirma `inProgress`, a partida aparece como **Ao vivo**.
- A aba **Recentes** lista séries finalizadas.
- A rota `/lives/[id]` ainda é um protótipo: os detalhes são mockados e só estão habilitados para o confronto JDG x IG usado no mock.

## Stack

- Next.js 16 com App Router e Server Components
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- Vitest para testes unitários
- pnpm 10

## Como executar

Instale as dependências:

```bash
pnpm install
```

Inicie o ambiente de desenvolvimento:

```bash
pnpm dev
```

Abra `http://localhost:3000`.

Comandos de validação:

```bash
pnpm test
pnpm test:coverage
pnpm lint
pnpm build
```

## Configuração

A integração usa a variável opcional `LOL_ESPORTS_API_KEY`:

```env
LOL_ESPORTS_API_KEY=sua-chave
```

Se a variável não estiver definida, o código usa uma chave pública de fallback configurada em `lib/lolesports/config.ts`. Em produção, prefira sempre configurar a variável de ambiente.

## Fluxo de dados

### Home

1. `app/page.tsx` lê `tab` e `page` dos parâmetros da URL.
2. `lib/lolesports/client.ts` chama `getSchedule` da API persistida do LoL Esports.
3. `lib/lolesports/series.ts` identifica séries completas e em andamento.
4. `lib/lolesports/schedule.ts` filtra e ordena as partidas.
5. `lib/lolesports/mappers.ts` converte o payload externo para o modelo `HomeMatch`.
6. Os componentes em `app/_components` renderizam abas, tabela e paginação.

A agenda é revalidada a cada 60 segundos. A página da home permanece dinâmica para refletir o horário atual e aplicar a janela de tolerância das partidas.

### Janela de tolerância

Uma partida não é removida imediatamente quando passa do horário agendado. Ela permanece na lista até `startTime + 1 hora`, a menos que já esteja concluída. Essa regra está em `lib/lolesports/schedule-window.ts`.

O estado visual é separado do estado original da API:

- `inProgress`: API confirmou que a série está em andamento.
- `pending`: horário começou, mas a API ainda não confirmou o início.
- demais estados: partida ainda não começou.

### Detalhes da partida

`app/lives/[id]` atualmente usa dados estáticos de `app/lives/[id]/data/mock-match.ts`. Os componentes dessa tela já representam resumo da série, jogos, objetivos, bans, jogadores, itens e widgets laterais, mas ainda não consomem `getEventDetails` nem o feed de live stats.

## Estrutura principal

```text
app/
├── page.tsx                         # Home e paginação
├── layout.tsx                       # Layout global e metadata
├── globals.css                      # Tokens e estilos globais
├── _components/                     # Componentes da home
└── lives/[id]/                       # Protótipo de detalhes da partida
    ├── page.tsx
    ├── data/mock-match.ts
    └── _components/
lib/
├── lolesports/                      # Cliente, tipos, filtros e mapeadores
└── datadragon/                      # URLs de imagens de campeões e itens
public/images/                       # Ícones locais de dragões e objetivos
```

## APIs e fontes

As fontes e o fluxo de integração estão detalhados em:

- `LIVE_LOL_ESPORTS_DATA_FLOW.md`
- `HUB_MAISESPORTS_DATA_FLOW.md`
- `VICTTI_TOURNAMENT_STATS_DATA_FLOW.md`

A integração atual da home usa:

```text
GET https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US
```

Para tornar a tela de detalhes real, o próximo passo é integrar `getEventDetails`, `getStandings`, `livestats/v1/window`, `livestats/v1/details` e os assets do Data Dragon no servidor.

## Testes

Os testes usam Vitest e ficam próximos da regra que verificam. Para executar uma vez:

```bash
pnpm test
```

O teste atual cobre a janela de uma hora e o estado intermediário `pending` antes da confirmação de partida ao vivo pela API.

O comando `pnpm test:coverage` usa o provider V8 e aplica threshold global de 80% ao código em `app/` e `lib/`. Como as demais áreas do projeto ainda não possuem testes automatizados, a cobertura global poderá ficar abaixo do threshold até que esses testes sejam adicionados.
