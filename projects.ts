export interface Project {
  name: string;
  description: string;
  type: string;
  stack: string[];
  tags: string[];
  links: string[];
  animeBackground: string;
  accentColor: string;
  bgAnimation: string;
}

export const projects: Project[] = [
  {
    name: "TerminalOS",
    description: "A custom Unix-like operating system with kernel-level process management and virtual filesystem.",
    type: "OS",
    stack: ["C", "Assembly", "QEMU"],
    tags: ["Systems", "Low-Level", "C"],
    links: ["https://github.com"],
    animeBackground: "cyber",
    accentColor: "#00ffcc",
    bgAnimation: "matrix"
  },
  {
    name: "NeuralMesh",
    description: "Full-stack neural network visualizer with real-time training metrics and layer inspection.",
    type: "Full Stack",
    stack: ["React", "Python", "TensorFlow", "WebSockets"],
    tags: ["AI", "React", "Python"],
    links: ["https://github.com"],
    animeBackground: "neural",
    accentColor: "#a855f7",
    bgAnimation: "pulse"
  },
  {
    name: "AetherCLI",
    description: "A blazing-fast CLI toolkit for automating dev workflows with plugin architecture.",
    type: "CLI Tool",
    stack: ["Rust", "TOML", "Shell"],
    tags: ["CLI", "Rust", "DevTools"],
    links: ["https://github.com"],
    animeBackground: "space",
    accentColor: "#f97316",
    bgAnimation: "stars"
  },
  {
    name: "PixelForge",
    description: "Browser-based pixel art editor with layers, animation frames, and export tools.",
    type: "Web App",
    stack: ["TypeScript", "Canvas API", "IndexedDB"],
    tags: ["Creative", "TypeScript", "Canvas"],
    links: ["https://github.com"],
    animeBackground: "sakura",
    accentColor: "#ec4899",
    bgAnimation: "petals"
  },
  {
    name: "ChronoQuest",
    description: "Top-down RPG with time-manipulation mechanics built in a custom ECS game engine.",
    type: "Game Dev",
    stack: ["C++", "SFML", "Lua"],
    tags: ["Game", "C++", "ECS"],
    links: ["https://github.com"],
    animeBackground: "dungeon",
    accentColor: "#eab308",
    bgAnimation: "fire"
  },
  {
    name: "DataWeave",
    description: "Visual ETL pipeline builder with drag-and-drop nodes and real-time data preview.",
    type: "Full Stack",
    stack: ["React", "Node.js", "PostgreSQL", "D3.js"],
    tags: ["Data", "React", "Node.js"],
    links: ["https://github.com"],
    animeBackground: "ocean",
    accentColor: "#06b6d4",
    bgAnimation: "waves"
  },
  {
    name: "HexCompiler",
    description: "A toy programming language compiler that targets x86 assembly with LLVM backend.",
    type: "System Software",
    stack: ["Haskell", "LLVM", "x86"],
    tags: ["Compilers", "Haskell", "LLVM"],
    links: ["https://github.com"],
    animeBackground: "cyber",
    accentColor: "#22d3ee",
    bgAnimation: "grid"
  },
  {
    name: "VaultSync",
    description: "End-to-end encrypted file sync service with conflict resolution and version history.",
    type: "Full Stack",
    stack: ["Go", "React", "SQLite", "AES-256"],
    tags: ["Security", "Go", "React"],
    links: ["https://github.com"],
    animeBackground: "storm",
    accentColor: "#4ade80",
    bgAnimation: "lightning"
  }
];
