<div align="center">

# 🌤 ClimaView

**Dashboard meteorológico premium com suporte a múltiplos idiomas**

[![Live Demo](https://img.shields.io/badge/🚀_Demo_ao_vivo-clima--view--amber.vercel.app-2FD9F4?style=for-the-badge&logo=vercel&logoColor=white)](https://clima-view-amber.vercel.app/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

</div>

---

## 📌 Sobre o projeto

O **ClimaView** é um dashboard de previsão do tempo moderno e visualmente premium, construído com React 19 e TypeScript. Integra a API do **OpenWeatherMap** para exibir condições meteorológicas em tempo real, previsão horária e previsão de 7 dias, com suporte completo a 6 idiomas.

> 🔗 **Acesse a aplicação:** [https://clima-view-amber.vercel.app/](https://clima-view-amber.vercel.app/)

---

## ✨ Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| 🌡 **Clima atual** | Temperatura, sensação térmica, máxima/mínima, hora local |
| 🕐 **Previsão horária** | Cards de hora em hora com toggle 12h/24h persistente |
| 📅 **Previsão de 7 dias** | Via One Call API 3.0 com sparkilne de tendência de temperatura |
| 🌍 **Multi-idioma** | **PT-BR** (padrão), EN, ES, DE, IT e FR — persistido no localStorage |
| 🌤 **Condições traduzidas** | 47+ condições climáticas da OWM traduzidas nos 6 idiomas |
| 💨 **Métricas detalhadas** | Umidade, vento, índice UV, pressão, visibilidade e qualidade do ar |
| 🔄 **Reload rápido** | Botão de atualização no card principal com animação de rotação |
| 📍 **Geolocalização** | Detecção automática da cidade do usuário ao carregar |
| 🏙 **Cidades salvas** | Pesquisa e seleção de cidades com persistência local |
| 🎨 **Dark mode** | Interface dark com paleta cyan/roxo e glassmorphism |

---

## 🛠 Stack

```
React 19 · TypeScript · Vite 8
Vanilla CSS (Design Tokens + CSS Custom Properties)
Lucide React (ícones)
OpenWeatherMap API (Forecast 5d/3h + One Call 3.0 + Air Pollution)
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20+
- Chave de API do [OpenWeatherMap](https://openweathermap.org/api) (gratuita)
- Assinatura da **One Call API 3.0** (gratuita, 1000 chamadas/dia) para previsão de 7 dias

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/Jaollas/ClimaView.git
cd ClimaView

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env e adicione sua chave da API

# 4. Rode em modo desenvolvimento
npm run dev
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
```

---

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── layout/          # Sidebar, layout geral
│   ├── ui/              # Chip, componentes reutilizáveis
│   └── weather/         # WeatherCard, HourlyForecast, WeeklyForecast,
│                        # WeatherMetrics, DataSparkline
├── contexts/
│   └── LanguageContext.tsx   # Provider de idioma global
├── hooks/
│   └── useWeather.ts         # Estado global do clima + geolocalização
├── i18n/
│   ├── translations.ts       # Strings de UI nos 6 idiomas
│   └── conditionTranslations.ts  # 47+ condições climáticas traduzidas
├── pages/
│   └── Dashboard.tsx
├── services/
│   └── weatherApi.ts    # Integração com OpenWeatherMap
└── types/
    └── weather.ts       # Interfaces TypeScript
```

---

## 🌐 Idiomas suportados

| Código | Idioma |
|--------|--------|
| `pt-BR` | 🇧🇷 Português (Brasil) — **padrão** |
| `en` | 🇺🇸 English |
| `es` | 🇪🇸 Español |
| `de` | 🇩🇪 Deutsch |
| `it` | 🇮🇹 Italiano |
| `fr` | 🇫🇷 Français |

A preferência de idioma é salva automaticamente no `localStorage`.

---

## 🔌 APIs utilizadas

| Endpoint | Descrição | Plano |
|----------|-----------|-------|
| `/data/2.5/weather` | Clima atual | Gratuito |
| `/data/2.5/forecast` | Previsão 5 dias / 3h | Gratuito |
| `/data/3.0/onecall` | Previsão 7 dias diária | Gratuito (1000 req/dia) |
| `/data/2.5/air_pollution` | Qualidade do ar | Gratuito |
| `/geo/1.0/direct` | Geocodificação de cidades | Gratuito |
| `/data/2.5/uvi` | Índice UV atual | Gratuito |

---

## 🏗 Build para produção

```bash
npm run build
```

O artefato de produção é gerado em `dist/` e pode ser servido por qualquer servidor estático (ex: Vercel, Netlify, GitHub Pages).

---