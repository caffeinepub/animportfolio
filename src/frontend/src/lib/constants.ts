import { PostStatus, ProjectCategory, SkillCategory } from "../backend.d";
import type {
  BlogPost,
  Experience,
  Project,
  Service,
  Skill,
  Testimonial,
} from "../backend.d";

export const DEMO_PROJECTS: Project[] = [
  {
    id: "demo-1",
    title: "NexusDash Analytics",
    featured: true,
    order: BigInt(1),
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    description:
      "A comprehensive real-time analytics dashboard with advanced data visualization, AI-powered insights, and multi-tenant architecture. Built for enterprise teams processing millions of events per day.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/assets/generated/project-dashboard.dim_800x500.jpg",
    shortDesc: "Enterprise real-time analytics with AI insights",
    category: ProjectCategory.web,
  },
  {
    id: "demo-2",
    title: "ShopWave Mobile",
    featured: true,
    order: BigInt(2),
    tags: ["React Native", "TypeScript", "GraphQL", "Stripe"],
    description:
      "A next-generation mobile commerce platform with AR product previews, social shopping features, and lightning-fast checkout. Supporting 50K+ active daily users.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/assets/generated/project-mobile.dim_800x500.jpg",
    shortDesc: "Next-gen mobile commerce with AR previews",
    category: ProjectCategory.mobile,
  },
  {
    id: "demo-3",
    title: "ChainVault DeFi",
    featured: true,
    order: BigInt(3),
    tags: ["Solidity", "Web3.js", "React", "Hardhat"],
    description:
      "Decentralized finance platform enabling cross-chain token swaps, yield farming, and liquidity provision. Audited smart contracts managing $12M+ TVL.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/assets/generated/project-blockchain.dim_800x500.jpg",
    shortDesc: "DeFi platform with $12M+ TVL",
    category: ProjectCategory.web,
  },
  {
    id: "demo-4",
    title: "Artisan AI Studio",
    featured: false,
    order: BigInt(4),
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    description:
      "AI-powered creative suite for generative art, style transfer, and design automation. Integrates with major design tools via plugins, serving 8K+ creative professionals.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/assets/generated/project-ai-design.dim_800x500.jpg",
    shortDesc: "AI creative suite for design professionals",
    category: ProjectCategory.design,
  },
  {
    id: "demo-5",
    title: "CodeForge IDE",
    featured: false,
    order: BigInt(5),
    tags: ["Electron", "Monaco Editor", "Node.js", "WebSockets"],
    description:
      "Collaborative browser-based IDE with real-time pair programming, AI code completion, and integrated CI/CD pipelines. Powers 15K+ developer teams worldwide.",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/assets/generated/project-codeeditor.dim_800x500.jpg",
    shortDesc: "Collaborative IDE for 15K+ developer teams",
    category: ProjectCategory.web,
  },
];

export const DEMO_SERVICES: Service[] = [
  {
    id: "svc-1",
    title: "Full-Stack Web Development",
    icon: "💻",
    description:
      "End-to-end web applications from concept to deployment. I architect scalable systems using modern frameworks, clean APIs, and performance-first engineering.",
    features: [
      "React / Next.js / Vue.js",
      "Node.js / Python backends",
      "PostgreSQL / MongoDB / Redis",
      "AWS / GCP / Vercel deployment",
      "CI/CD & DevOps pipelines",
    ],
    price: "From $3,500",
    order: BigInt(1),
  },
  {
    id: "svc-2",
    title: "Mobile App Development",
    icon: "📱",
    description:
      "Cross-platform mobile experiences that feel native. Beautiful UIs, smooth animations, and seamless backend integration for iOS and Android.",
    features: [
      "React Native & Expo",
      "iOS & Android deployment",
      "Offline-first architecture",
      "Push notifications",
      "App Store optimization",
    ],
    price: "From $4,500",
    order: BigInt(2),
  },
  {
    id: "svc-3",
    title: "UI/UX Design",
    icon: "🎨",
    description:
      "Pixel-perfect interfaces rooted in user psychology. From wireframes to high-fidelity prototypes, I craft designs that convert and delight.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Design systems",
      "Figma / Sketch / Adobe XD",
      "Usability testing",
    ],
    price: "From $1,800",
    order: BigInt(3),
  },
  {
    id: "svc-4",
    title: "Blockchain & Web3",
    icon: "⛓️",
    description:
      "Smart contracts, DeFi protocols, and dApp development on Ethereum, Solana, and ICP. Audited code you can trust with real value.",
    features: [
      "Smart contract development",
      "DeFi protocol design",
      "NFT platforms",
      "Wallet integrations",
      "Security audits",
    ],
    price: "From $5,000",
    order: BigInt(4),
  },
];

export const DEMO_SKILLS: Skill[] = [
  {
    id: "sk-1",
    name: "React / Next.js",
    icon: "⚛️",
    category: SkillCategory.frontend,
    percentage: BigInt(95),
  },
  {
    id: "sk-2",
    name: "TypeScript",
    icon: "🔷",
    category: SkillCategory.frontend,
    percentage: BigInt(92),
  },
  {
    id: "sk-3",
    name: "CSS / Tailwind",
    icon: "🎨",
    category: SkillCategory.frontend,
    percentage: BigInt(90),
  },
  {
    id: "sk-4",
    name: "Node.js",
    icon: "🟢",
    category: SkillCategory.backend,
    percentage: BigInt(88),
  },
  {
    id: "sk-5",
    name: "Python / FastAPI",
    icon: "🐍",
    category: SkillCategory.backend,
    percentage: BigInt(82),
  },
  {
    id: "sk-6",
    name: "PostgreSQL",
    icon: "🐘",
    category: SkillCategory.backend,
    percentage: BigInt(85),
  },
  {
    id: "sk-7",
    name: "Figma",
    icon: "🖼️",
    category: SkillCategory.design,
    percentage: BigInt(88),
  },
  {
    id: "sk-8",
    name: "Motion Design",
    icon: "✨",
    category: SkillCategory.design,
    percentage: BigInt(80),
  },
  {
    id: "sk-9",
    name: "Solidity / Web3",
    icon: "⛓️",
    category: SkillCategory.other,
    percentage: BigInt(75),
  },
  {
    id: "sk-10",
    name: "DevOps / AWS",
    icon: "☁️",
    category: SkillCategory.other,
    percentage: BigInt(78),
  },
];

export const DEMO_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Full-Stack Engineer",
    company: "Quantum Labs",
    location: "San Francisco, CA",
    startDate: "2022-01",
    endDate: undefined,
    current: true,
    order: BigInt(1),
    description:
      "Leading a team of 6 engineers building a next-generation analytics platform. Architected microservices handling 50M+ daily events. Reduced infrastructure costs by 40% through optimization.",
  },
  {
    id: "exp-2",
    role: "Full-Stack Developer",
    company: "Nova Digital Agency",
    location: "New York, NY",
    startDate: "2019-06",
    endDate: "2021-12",
    current: false,
    order: BigInt(2),
    description:
      "Delivered 20+ client projects ranging from e-commerce platforms to SaaS products. Specialized in React, Node.js, and AWS. Mentored 3 junior developers.",
  },
  {
    id: "exp-3",
    role: "Frontend Developer",
    company: "Pixel Studio",
    location: "Austin, TX",
    startDate: "2017-09",
    endDate: "2019-05",
    current: false,
    order: BigInt(3),
    description:
      "Built interactive web experiences for Fortune 500 clients. Created a design system adopted by 50+ team members. Led migration from legacy jQuery to React.",
  },
  {
    id: "exp-4",
    role: "Junior Developer",
    company: "TechStart Inc",
    location: "Remote",
    startDate: "2016-01",
    endDate: "2017-08",
    current: false,
    order: BigInt(4),
    description:
      "First professional role building internal tools and customer portals. Gained expertise in PHP, MySQL, and vanilla JavaScript while shipping features used daily by thousands.",
  },
];

export const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Sarah Chen",
    role: "CTO",
    company: "Quantum Labs",
    text: "Absolutely exceptional work. The analytics dashboard exceeded every expectation. Not only is the code clean and maintainable, but the UX is intuitive enough that our non-technical stakeholders love it too.",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4",
    rating: BigInt(5),
    featured: true,
  },
  {
    id: "t-2",
    name: "Marcus Rodriguez",
    role: "Founder",
    company: "ShopWave",
    text: "Shipped our MVP in 6 weeks — 2 weeks ahead of schedule. The mobile app performance is silky smooth and our conversion rate jumped 34% after launch. Would hire again in a heartbeat.",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus&backgroundColor=d1d4f9",
    rating: BigInt(5),
    featured: true,
  },
  {
    id: "t-3",
    name: "Aisha Patel",
    role: "Product Lead",
    company: "ChainVault",
    text: "The DeFi protocol architecture is rock-solid. Security-first thinking, clean smart contracts, and zero issues post-audit. Rare to find someone who truly understands both the technical and product dimensions.",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha&backgroundColor=c0aede",
    rating: BigInt(5),
    featured: true,
  },
  {
    id: "t-4",
    name: "Tom Larsson",
    role: "Design Director",
    company: "Artisan Creative",
    text: "The UI/UX work transformed our product. Users consistently describe it as 'a breath of fresh air'. The attention to micro-interactions and animation made all the difference.",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=tom&backgroundColor=ffd5dc",
    rating: BigInt(5),
    featured: false,
  },
];

export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "The Future of Web Animations: Motion + React in 2025",
    slug: "future-web-animations-2025",
    excerpt:
      "How the Motion library is changing how we think about UI physics, spring animations, and gesture-driven interfaces. A deep dive with real code examples.",
    content: `# The Future of Web Animations: Motion + React in 2025\n\nWeb animation has come a long way. From the dark ages of jQuery slideToggle to the elegant spring physics of Motion, we're in a golden era of interface motion.\n\n## Why Physics-Based Animation Wins\n\nSpring animations feel natural because they mirror how objects behave in the real world. When you move a card on screen, it should feel like it has mass.\n\n\`\`\`tsx\nimport { motion } from 'motion/react'\n\n<motion.div\n  whileHover={{ scale: 1.05, y: -4 }}\n  transition={{ type: 'spring', stiffness: 400, damping: 25 }}\n>\n  Card content\n</motion.div>\n\`\`\`\n\n## Scroll-Triggered Reveals\n\nThe \`whileInView\` prop is one of the most powerful tools in Motion. It lets you trigger animations when elements enter the viewport.\n\n## Conclusion\n\nMotion has made world-class animation accessible to every React developer. Use it wisely, and your interfaces will feel alive.`,
    coverImageUrl: "/assets/generated/project-codeeditor.dim_800x500.jpg",
    tags: ["React", "Animation", "Motion", "Web Dev"],
    status: PostStatus.published,
    publishedAt: "2025-03-10",
  },
  {
    id: "post-2",
    title: "Building Glassmorphism UI That Actually Looks Good",
    slug: "glassmorphism-ui-done-right",
    excerpt:
      "Most glassmorphism implementations look blurry and low-contrast. Here's how to build frosted glass cards that are both beautiful and accessible.",
    content: `# Building Glassmorphism UI That Actually Looks Good\n\nGlassmorphism is everywhere — and most of it looks terrible. The problem isn't the design language, it's the execution.\n\n## The Three Rules of Good Glass\n\n1. **Sufficient contrast** — Your text must pass WCAG AA. Blur doesn't add contrast.\n2. **Meaningful background** — Glass only looks good over rich, colorful backgrounds.\n3. **Subtle borders** — A thin, semi-transparent white border sells the glass effect.\n\n\`\`\`css\n.glass-card {\n  background: oklch(0.12 0.03 290 / 0.6);\n  backdrop-filter: blur(20px);\n  border: 1px solid oklch(0.35 0.08 290 / 0.3);\n}\n\`\`\`\n\n## OKLCH is Perfect for Glass\n\nOKLCH's perceptual uniformity means color adjustments are predictable, making it ideal for semi-transparent glass effects.`,
    coverImageUrl: "/assets/generated/project-dashboard.dim_800x500.jpg",
    tags: ["CSS", "Design", "Glassmorphism", "OKLCH"],
    status: PostStatus.published,
    publishedAt: "2025-02-22",
  },
  {
    id: "post-3",
    title: "DeFi Architecture Patterns: Lessons From $12M in Production",
    slug: "defi-architecture-patterns",
    excerpt:
      "Battle-tested patterns from building and maintaining a DeFi protocol with real money at stake. Security, upgradability, and the governance tradeoffs nobody talks about.",
    content: `# DeFi Architecture Patterns: Lessons From $12M in Production\n\nWhen you're writing code that handles real financial value, every decision carries weight. Here's what I learned shipping ChainVault.\n\n## Security First, Always\n\nThe golden rule: code is not secure until it has been audited by multiple independent parties and battle-tested on testnets for months.\n\n## Upgradability vs Immutability\n\nThe DeFi community is split on upgradable contracts. My view: use proxy patterns with timelocked governance, but design your core logic to rarely need changes.\n\n## Event-Driven Indexing\n\nNever store derived state on-chain if you can help it. Emit events, index them off-chain, and serve from a fast database.`,
    coverImageUrl: "/assets/generated/project-blockchain.dim_800x500.jpg",
    tags: ["Blockchain", "DeFi", "Solidity", "Architecture"],
    status: PostStatus.published,
    publishedAt: "2025-01-15",
  },
];
