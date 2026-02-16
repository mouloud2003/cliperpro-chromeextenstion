# 📚 Clipper Pro

**Your Ultimate Learning Companion** - Transform web reading into actionable knowledge.

Clipper Pro is a modern web application that helps students, researchers, and learners save text from the web, organize it in a personal library, and generate AI-powered summaries on demand.

## 📖 Documentation

For a comprehensive understanding of the project architecture, design patterns, and implementation details, please refer to:

- **[📄 Technical Documentation (English)](./TECHNICAL_DOCUMENTATION_EN.md)** - Complete technical guide
- **[📄 الوثيقة التقنية (عربي)](./TECHNICAL_DOCUMENTATION_AR.md)** - دليل تقني شامل بالعربية

These documents provide:
- Detailed architecture explanation (Clean Architecture)
- Complete folder structure breakdown
- Layer-by-layer code walkthrough
- Data flow scenarios
- Setup and deployment instructions
- Future roadmap

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- Google Cloud account (for OAuth and AI)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mouloud2003/cliperpro-chromeextenstion.git
cd cliperpro-chromeextenstion
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## ✨ Key Features

- 📝 **Save Text from Web**: Capture important content while browsing
- 📚 **Personal Library**: Organize all your saved clips in one place
- 🤖 **AI Summaries**: Generate summaries in multiple formats (bullets, paragraphs, study notes)
- 🔒 **Privacy-First**: AI runs only when you explicitly request it
- 📊 **Usage Tracking**: Monitor your monthly AI usage with clear limits
- 🎨 **Beautiful UI**: Clean, modern interface with dark mode support

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (Google OAuth)
- **AI**: Google Gemini
- **Styling**: Tailwind CSS + shadcn/ui
- **Testing**: Vitest

## 📁 Project Structure

```
cliperpro-chromeextenstion/
├── app/                    # Next.js app directory (Presentation Layer)
├── core/                   # Business logic (Domain + Application Layer)
│   ├── domain/            # Types and interfaces
│   ├── applicationlogique/# Services and use cases
│   └── ports/             # Interfaces for external services
├── infra/                  # Infrastructure (Database, AI, Auth)
├── prisma/                 # Database schema and migrations
├── tests/                  # Unit tests
└── components/             # Reusable UI components
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov
```

## 🤝 Contributing

Contributions are welcome! Please read the [Technical Documentation](./TECHNICAL_DOCUMENTATION_EN.md) to understand the architecture before contributing.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created by [Mouloud](https://github.com/mouloud2003)

## 📚 Additional Resources

- **[Technical Documentation (EN)](./TECHNICAL_DOCUMENTATION_EN.md)** - Comprehensive architecture guide
- **[الوثيقة التقنية (AR)](./TECHNICAL_DOCUMENTATION_AR.md)** - دليل معماري شامل
- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Prisma Documentation](https://www.prisma.io/docs) - Database ORM guide
- [NextAuth.js Documentation](https://next-auth.js.org/) - Authentication guide

---

<div align="center">

**Built with ❤️ using Next.js & TypeScript**

</div>
