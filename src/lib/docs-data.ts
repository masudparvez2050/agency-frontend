import { DocArticle } from "@/types/docs";

export const DOCS_LIBRARY: DocArticle[] = [
  {
    id: "template-installation",
    category: "Getting Started",
    title: "Template Installation Guidelines",
    description: "Learn how to clone your digital products, set up environmental variables, and boot local Next.js development environments.",
    prerequisites: [
      "Node.js v18.0.0 or higher configured globally",
      "npm, yarn, or pnpm package manager installed",
      "A code editor (VS Code recommended)",
    ],
    steps: [
      {
        instruction: "Extract the downloaded ZIP template file to your active development workspace directory and open your terminal inside it.",
      },
      {
        instruction: "Install dependencies using your preferred package runner command.",
        code: "npm install\n# or\npnpm install\n# or\nyarn install",
      },
      {
        instruction: "Copy the environmental placeholder file to configure local setups.",
        code: "cp .env.example .env.local",
      },
      {
        instruction: "Boot the local development server checking Turbopack configurations.",
        code: "npm run dev",
      },
    ],
    tips: [
      "By default, templates boot on localhost:3000.",
      "Check next.config.ts to verify custom asset host domains settings.",
    ],
  },
  {
    id: "directory-layouts",
    category: "Getting Started",
    title: "Understanding Project Directory Layouts",
    description: "A comprehensive map detailing App Router directories, components structures, and style sheets scopes.",
    prerequisites: [
      "Basic understanding of Next.js App Router folders",
    ],
    steps: [
      {
        instruction: "Open root workspace folder. The main application code resides inside the src/ directory.",
      },
      {
        instruction: "src/app/ contains routing folders. Routes wrapped in parenthesis e.g., (main-layout) group layouts without modifying URLs.",
        code: "src/\n├── app/\n│   ├── (main-layout)/   # Sticky navbar layouts\n│   ├── (auth-layout)/   # Card layouts\n│   └── globals.css\n├── components/          # Reusable UI blocks\n├── lib/                 # DB mock lists & helpers\n└── types/               # TS interface declarations",
      },
      {
        instruction: "src/components/ contains components categorized by modules. Always keep styles scoped within tailwind parameters.",
      },
    ],
    tips: [
      "Avoid writing styling tags directly inside routing files; delegate components to the src/components folder.",
    ],
  },
  {
    id: "bkash-payment-api",
    category: "Products Integration",
    title: "bKash Tokenized Webhook Setup",
    description: "Detailed API parameters verification and callback webhooks setup to securely approve manual transactions.",
    prerequisites: [
      "Active bKash Merchant API account credentials",
      "Node.js server handling callback webhooks requests",
    ],
    steps: [
      {
        instruction: "Fetch the active merchant authorization token from bKash payment handshakes.",
        code: "POST https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/token\nHeaders:\n  username: YOUR_MERCHANT_USER\n  password: YOUR_MERCHANT_PASSWORD\n  app_key: YOUR_MERCHANT_APP_KEY\n  app_secret: YOUR_MERCHANT_APP_SECRET",
      },
      {
        instruction: "Configure payment callbacks. Once transactions are executed, bKash dispatches transaction reference JSON bodies.",
        code: "{\n  \"paymentID\": \"TR0018273618\",\n  \"trxID\": \"BK8273618\",\n  \"amount\": \"1500\",\n  \"transactionStatus\": \"Completed\",\n  \"paymentExecuteTime\": \"2026-07-12T16:00:00 GMT+6\"\n}",
      },
      {
        instruction: "Reconcile logs inside your database ledger tables matching the trxID parameter.",
      },
    ],
    tips: [
      "Always query bKash verification endpoints server-to-server; never trust client redirect parameters alone.",
    ],
  },
  {
    id: "saas-boilerplate-setup",
    category: "Products Integration",
    title: "Prisma Database Schema Setup",
    description: "Configure PostgreSQL connection URLs, generate schema relational client files, and seed mock values.",
    prerequisites: [
      "Active PostgreSQL or MySQL database URI",
      "Prisma CLI configured in package.json",
    ],
    steps: [
      {
        instruction: "Set your database connection URL string in the .env file.",
        code: "DATABASE_URL=\"postgresql://postgres:password@localhost:5432/plaxora_db?schema=public\"",
      },
      {
        instruction: "Define relational models in prisma/schema.prisma. Run migrations to build tables.",
        code: "npx prisma migrate dev --name init_db",
      },
      {
        instruction: "Generate the type-safe Prisma client binaries for query lookups.",
        code: "npx prisma generate",
      },
    ],
    tips: [
      "Run npx prisma studio to open an interactive data browser at localhost:5555.",
    ],
  },
  {
    id: "compile-galaxy-games",
    category: "Native Apps Guide",
    title: "Compiling Galaxy Games Target Packages",
    description: "Learn how to build Android APK binaries and iOS IPA files using Flutter compilation pipelines.",
    prerequisites: [
      "Flutter SDK v3.19.0 or higher configured in environment paths",
      "Xcode configured for iOS ipa packaging (macOS required)",
    ],
    steps: [
      {
        instruction: "Verify environment configurations run compiler check lists.",
        code: "flutter doctor",
      },
      {
        instruction: "Compile release APK targets for Android mobile devices.",
        code: "flutter build apk --release",
      },
      {
        instruction: "Build iOS IPA archives mapping distribution certificates.",
        code: "flutter build ipa --release",
      },
    ],
    tips: [
      "APK output is generated at build/app/outputs/flutter-apk/app-release.apk.",
    ],
  },
  {
    id: "plexora-cli-commands",
    category: "Native Apps Guide",
    title: "Plexora CLI Scaffolding Syntax",
    description: "Complete checklist of command flags, Tailwind component generators, and Git automation hooks.",
    prerequisites: [
      "Node.js active shell runner",
    ],
    steps: [
      {
        instruction: "Run the CLI tool globally to scaffold templates folders.",
        code: "npx plexora-cli init my-app",
      },
      {
        instruction: "Generate a pre-styled landing page section element using templates command.",
        code: "npx plexora-cli generate section hero\n# or\nnpx plexora-cli g s contact",
      },
      {
        instruction: "Execute standard git comment format audits.",
        code: "npx plexora-cli git commit \"feat: configure prisma schemas\"",
      },
    ],
    tips: [
      "Pass --help flag to print commands parameters summary inside console terminals.",
    ],
  },
];
