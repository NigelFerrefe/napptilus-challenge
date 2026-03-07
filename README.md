# MBST — Napptilus Challenge

A mobile phone catalogue application built with Next.js 15, React 19 and TypeScript. Users can browse phones, view detailed specs, select color and storage options, and manage a persistent shopping cart.

---

## Getting Started

### Requirements

- Node.js >= 18
- npm

### Installation

```bash
git clone https://github.com/NigelFerrefe/napptilus-challenge
cd napptilus-challenge
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_API_KEY=
```

### Development Mode

Serves assets without minification:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Mode

Serves assets concatenated and minified:

```bash
npm run build
npm run start
```

### Run Tests

```bash
npm test
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
napptilus-challenge/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout with Navbar and CartProvider
│   ├── page.tsx                # Home — phone listing (SSR)
│   ├── not-found.tsx           # 404 page
│   ├── loading.tsx             # Loading state
│   ├── cart/
│   │   └── page.tsx            # Cart page
│   └── product/
│       └── [id]/
│           └── page.tsx        # Product detail page (SSR)
├── components/
│   ├── cart/
│   │   └── CartInfo.tsx        # Cart items, total and actions
│   ├── detailPage/
│   │   ├── BackButton.tsx      # Navigation back button
│   │   ├── ProductInfo.tsx     # Image, selectors and add to cart
│   │   ├── SpecsInfo.tsx       # Technical specifications table
│   │   └── SimilarItems.tsx    # Horizontal carousel with scrubber
│   ├── navbar/
│   │   └── Navbar.tsx          # Navigation bar with cart icon
│   ├── phoneCard/
│   │   └── PhoneCard.tsx       # Phone card for the grid
│   ├── phoneList/
│   │   └── PhoneList.tsx       # Grid with search and results count
│   ├── searchBar/
│   │   └── SearchBar.tsx       # Search input with debounce
│   └── ui/
│       ├── Button.tsx          # Reusable button with variants
│       └── InputSearch.tsx     # Reusable search input
├── context/
│   ├── CartContext.tsx         # Cart state provider with localStorage
│   └── cartReducer.ts          # Pure reducer for cart actions
├── hooks/
│   └── useCart.ts              # Custom hook to consume CartContext
├── lib/
│   ├── api/
│   │   ├── api.ts              # API calls with Axios and Zod validation
│   │   └── types.ts            # API response types
│   ├── cart/
│   │   └── types.ts            # CartItem type
│   └── constants/
│       └── index.ts            # App-wide constants
├── __tests__/
│   ├── cartReducer.test.ts     # Unit tests for cart reducer logic
│   ├── CartContext.test.tsx    # Integration tests for localStorage persistence
│   ├── PhoneCard.test.tsx      # Component tests for PhoneCard rendering
│   └── SearchBar.test.tsx      # Component tests for search and results count
├── jest.config.ts
├── jest.setup.ts
└── tsconfig.json
```

---

## Architecture & Technical Decisions

### Framework — Next.js 15 with App Router

Next.js was chosen to fulfil the optional SSR requirement. The App Router enables a clear separation between Server and Client Components.

- **Home page** (`app/page.tsx`) — Server Component that fetches the initial 20 phones on the server. The HTML arrives at the browser already populated, eliminating the initial loading flash.
- **Product detail** (`app/product/[id]/page.tsx`) — Server Component that fetches the full product data and generates dynamic metadata (`generateMetadata`) for SEO.
- **Cart page** — Cannot use SSR because it depends on `localStorage`, which only exists in the browser.

### State Management — React Context + useReducer

Cart state is managed with `CartContext` + `cartReducer`. The reducer handles pure logic (ADD, REMOVE, CLEAR) and the context connects it to React and `localStorage`.

The cart persists across sessions via `localStorage` — it is loaded as the initial reducer state on mount and saved on every state change via `useEffect`.

### API Layer — Axios + Zod

All API calls go through `lib/api/api.ts`. Responses are validated with Zod schemas at runtime, so any unexpected API response is caught early with a typed error rather than failing silently at render time.

### Styling — CSS Modules

Each component has its own `.module.css` file. Global CSS variables are defined in `app/globals.css`

### Responsive Design

The application is mobile-first and follows the Figma designs across three breakpoints:

- **Mobile** — base styles, single column grid
- **Tablet** (`min-width: 768px`) — two column grid, row layout for product detail
- **Desktop** (`min-width: 1024px`) — five column grid, max-width containers centered

### Testing — Jest + React Testing Library

Tests are organised by responsibility:

| File | What it tests |
|------|--------------|
| `cartReducer.test.ts` | Pure reducer logic — ADD, REMOVE, CLEAR, total calculation |
| `CartContext.test.tsx` | localStorage persistence — save on add, load on mount |
| `PhoneCard.test.tsx` | Component renders brand, name, price and correct link |
| `SearchBar.test.tsx` | Results count, input update, URL debounce |

The cart reducer is tested in isolation as a pure function. The `CartContext` is tested separately only for `localStorage` behaviour — the only responsibility the reducer does not cover. Next.js routing hooks (`useRouter`, `useSearchParams`) are mocked with `jest.mock` to test `SearchBar` without a real Next.js runtime.

---

## API Reference

Base URL: `XXXX`

All requests require the header:
```
x-api-key: XXXX
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Returns the full list of phones |
| GET | `/products/{id}` | Returns a single phone by ID |

---

## Error API

Known API issue: The /products endpoint occasionally returns duplicate id entries. To ensure 20 unique results are displayed as required, the request uses limit: 21 with client-side deduplication by id.

## Author

Nigel Ferreres — [Visit page](https://napptilus-challenge.vercel.app/cart)
