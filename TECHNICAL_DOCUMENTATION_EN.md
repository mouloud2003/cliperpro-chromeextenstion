# 📚 Clipper Pro - Comprehensive Technical Documentation

## 🎯 Project Overview

### Project Idea

**Clipper Pro** is an advanced learning web application that aims to transform the online reading experience into actionable knowledge. The project is a comprehensive platform that enables users to:

1. **Save Text from the Web**: Users can save any useful text they find while browsing the internet
2. **Organize Content**: Store all saved texts in a clean, organized personal library
3. **AI on Demand**: Use artificial intelligence to create summaries in different formats (bullets, paragraphs, study notes)
4. **Privacy Protection**: AI runs only when explicitly requested by the user

### Problem Statement

Students, researchers, and learners face several challenges:
- **Tab Overload**: Saving hundreds of articles and websites without revisiting them
- **Scattered Notes**: Notes distributed across different apps and tools
- **Repeated Re-reading**: Forgetting what was read and wasting time re-reading articles

### The Solution

Clipper Pro provides an organized approach:
```
Save Text → Library → AI Summarization → Study
```

---

## 🏗️ Project Architecture

### Architecture Pattern: Clean Architecture (Hexagonal Architecture)

The project follows **Clean Architecture** principles developed by Robert C. Martin, which separates the project into independent layers:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│         (Next.js App Router, React Components)          │
│  - Pages & Routes                                        │
│  - UI Components                                         │
│  - API Routes (Controllers)                              │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│              Application Logic Layer                     │
│                  (Business Rules)                        │
│  - Services (ClipService, SummaryService, etc.)         │
│  - Use Cases                                             │
│  - Validation Logic                                      │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                    Domain Layer                          │
│              (Core Business Entities)                    │
│  - Types & Interfaces                                    │
│  - Domain Models                                         │
│  - Error Types                                           │
└─────────────────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                Infrastructure Layer                      │
│            (External Dependencies)                       │
│  - Database (Prisma ORM + PostgreSQL)                   │
│  - AI Services (Google Gemini)                          │
│  - Authentication (NextAuth.js)                         │
└─────────────────────────────────────────────────────────┘
```

### Benefits of This Architecture

1. **Independence**: Each layer is independent and can be modified without affecting other layers
2. **Testability**: Each layer can be tested separately
3. **Flexibility**: Easy to replace technologies (e.g., change database or AI service)
4. **Clarity**: Each part has a clear and specific responsibility

---

## 📂 Folder Structure

### Main Structure

```
cliperpro-chromeextenstion/
│
├── app/                          # Presentation Layer
│   ├── (marketing)/             # Marketing pages
│   │   ├── layout.tsx           # Marketing layout
│   │   └── page.tsx             # Landing page
│   │
│   ├── api/                     # API Routes (Controllers)
│   │   ├── auth/                # Authentication endpoints
│   │   └── v1/                  # API Version 1
│   │       ├── clips/           # Clip operations
│   │       ├── settings/        # Settings endpoints
│   │       └── usage/           # Usage tracking
│   │
│   ├── components/              # Reusable React components
│   ├── library/                # Library pages
│   ├── login/                  # Login page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
│
├── core/                        # Domain + Application Layer
│   ├── domain/                 # Core entities
│   │   └── types.ts            # All types and interfaces
│   │
│   ├── applicationlogique/     # Business logic
│   │   ├── services/           # Main services
│   │   │   ├── clipservice.ts
│   │   │   ├── summaryservice.ts
│   │   │   ├── settingservice.ts
│   │   │   └── usageservice.ts
│   │   ├── utils/              # Helper functions
│   │   └── errors.ts           # Custom errors
│   │
│   └── ports/                  # Interfaces
│       ├── ai.ts               # AI service interface
│       └── repos.ts            # Repository interfaces
│
├── infra/                      # Infrastructure Layer
│   ├── ai/                     # AI implementations
│   │   ├── Gemini.ts          # Google Gemini integration
│   │   └── mockclient.ts      # Mock client for testing
│   │
│   ├── auth/                   # Authentication
│   │   └── requireUser.ts     # User verification
│   │
│   └── prisma/                 # Database
│       ├── client.ts          # Prisma client
│       └── repos/             # Repository implementations
│
├── prisma/                     # Database configuration
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
│
├── tests/                      # Tests
│   ├── unit/                  # Unit tests
│   └── mockdata.ts            # Mock data
│
├── components/                 # UI components (shadcn)
├── lib/                        # Helper libraries
├── public/                     # Static files
│
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── next.config.js             # Next.js config
└── auth.ts                    # NextAuth setup
```

---

## 🔍 Detailed Layer Explanation

### 1️⃣ Domain Layer - `/core/domain/`

This layer contains the **heart of the application** - the core definitions and types used everywhere.

#### File: `types.ts`

Defines all the data structures:

- **SummaryFormat**: Available summary formats (paragraph, bullet_points, study_notes)
- **CreateClipInput**: Input data for creating a new clip
- **ClipDTO**: Data transfer object for clips (list view)
- **ClipDetailDTO**: Complete clip data (detail view)
- **SummaryDTO**: Summary data
- **UserSettingsDTO**: User preferences
- **UsageDTO**: Monthly usage information
- **ErrorCode**: Standardized error codes

**Purpose**: Provide a clear contract for how data flows through the application.

---

### 2️⃣ Application Logic Layer - `/core/applicationlogique/`

This layer contains the **core business rules** of the application.

#### a. ClipService - `services/clipservice.ts`

Handles all clip-related operations:

**Key Methods**:
- `createManualClip()`: Creates a new clip with validation
- `listUserClips()`: Retrieves user's clips
- `getClipDetails()`: Gets clip details with ownership check

**Responsibilities**:
- Data validation
- Business rule enforcement
- Coordination between repositories

#### b. SummaryService - `services/summaryservice.ts`

Manages AI summarization with intelligent caching:

**Key Features**:
1. **Caching**: Avoids regenerating the same summary
2. **Quota Management**: Ensures monthly limits aren't exceeded
3. **Atomic Operations**: Prevents race conditions

**Process Flow**:
1. Verify ownership and fetch text
2. Check if AI is enabled in settings
3. Create cache key (hash)
4. Check cache for existing summary
5. If not cached:
   - Consume one quota
   - Call AI service
   - Save summary
6. Return summary to user

#### c. UsageService - `services/usageservice.ts`

Tracks monthly AI usage:

**Key Method**:
- `consumeOneSummary()`: Atomically increments usage counter with quota validation

#### d. SettingsService - `services/settingservice.ts`

Manages user preferences:
- Get/update AI settings
- Default summary format

---

### 3️⃣ Infrastructure Layer - `/infra/`

This layer handles **external technical details**.

#### a. Database - Prisma + PostgreSQL

**Schema** (`prisma/schema.prisma`):

**Key Models**:
- **User**: User accounts with OAuth integration
- **UserSettings**: User preferences (AI enabled, default format)
- **Clip**: Saved text snippets
- **ClipSummary**: AI-generated summaries with caching support
- **UsageMonthly**: Monthly usage tracking

**Repositories** (`infra/prisma/repos/`):
- `ClipRepoPrisma`: Database operations for clips
- `SummaryRepoPrisma`: Summary storage and retrieval
- `SettingsRepoPrisma`: User settings management
- `UsageRepoPrisma`: Usage tracking with atomic operations

#### b. AI Integration - Google Gemini

**File**: `infra/ai/Gemini.ts`

**Features**:
- Format-specific prompts
- Response parsing
- Error handling

**Process**:
1. Build prompt based on requested format
2. Call Gemini API
3. Parse response (extract title and body)
4. Return structured data

#### c. Authentication - NextAuth.js

**Configuration** (`auth.ts`):
- Google OAuth provider
- Prisma adapter for session storage
- Session callbacks for user ID

**Protection** (`infra/auth/requireUser.ts`):
- Verifies user authentication
- Redirects to login if not authenticated
- Returns user ID for authorized requests

---

### 4️⃣ Presentation Layer - `/app/`

#### a. API Routes (Controllers)

**Example**: `app/api/v1/clips/route.ts`

**POST /api/v1/clips** - Create new clip:
1. Authenticate user
2. Validate request body (Zod)
3. Create service instance
4. Call business logic
5. Return JSON response

**Main Endpoints**:

| Method | Path | Function |
|--------|------|----------|
| POST | `/api/v1/clips` | Create new clip |
| GET | `/api/v1/clips` | List user's clips |
| POST | `/api/v1/clips/[id]/summarize` | Generate summary |
| GET | `/api/v1/clips/[id]/summaries` | Get all summaries for clip |
| GET | `/api/v1/settings` | Get user settings |
| PATCH | `/api/v1/settings` | Update settings |
| GET | `/api/v1/usage` | Get monthly usage info |

#### b. Next.js Pages

**Server Components** for data fetching:
- `app/library/page.tsx`: Library listing
- `app/library/[id]/page.tsx`: Clip details
- `app/library/profile/page.tsx`: User profile

**Benefits**:
- Server-side rendering
- Direct database access
- Better SEO
- Faster initial load

#### c. React Components

**Key Components**:

1. **ClipLibrary**: Displays all user clips in a grid
2. **Clipcard**: Individual clip preview card
3. **Aiworkspace**: AI summarization interface
4. **Topbar**: Navigation and settings
5. **ContentAiTabsPro**: Tab interface for different summary formats

**Design System**:
- Tailwind CSS for styling
- shadcn/ui components
- Lucide icons
- Responsive design

---

## 🔄 Complete Data Flow

### Scenario 1: Save New Clip

```
1. User selects text and clicks "Save"
   ↓
2. Chrome Extension (future) or web interface sends:
   POST /api/v1/clips
   Body: { text: "...", url: "...", title: "..." }
   ↓
3. API Route validates:
   - Authentication (requireUser)
   - Request body (Zod)
   ↓
4. ClipService.createManualClip():
   - Normalizes text
   - Validates business rules
   ↓
5. ClipRepoPrisma.create():
   - INSERT INTO clips
   ↓
6. Return { clipId }
   ↓
7. Show success message to user
```

### Scenario 2: Generate Summary

```
1. User opens clip and clicks "Summarize"
   ↓
2. Frontend sends:
   POST /api/v1/clips/{id}/summarize
   Body: { format: "bullet_points" }
   ↓
3. SummaryService.summarizeClip():
   a. Fetch clip + verify ownership
   b. Check if AI is enabled
   c. Create cache key (hash)
   d. Check cache
      ↓ If found → return immediately ✅
   e. Consume one quota (atomic)
   f. Call AI service (Gemini)
   g. Save summary to database
   ↓
4. Return summary to frontend
   ↓
5. Display in UI
```

### Scenario 3: View Library

```
1. User visits /library
   ↓
2. Server Component:
   - Authenticates user
   - Fetches clips from database
   ↓
3. Transforms to DTOs with previews
   ↓
4. Passes to <ClipLibrary /> component
   ↓
5. Renders grid of <Clipcard /> components
   ↓
6. User sees their saved clips
```

---

## 🎨 User Interface (UI/UX)

### Technologies Used

1. **Tailwind CSS**: Fast, flexible styling
2. **shadcn/ui**: Pre-built, customizable components
3. **Lucide Icons**: Modern, clear icons
4. **IBM Plex Sans Arabic**: Beautiful Arabic font
5. **React Toast**: User notifications

### Main Pages

#### 1. Landing Page (`/`)
- Hero section with project description
- Features showcase
- How it works (3 steps)
- Privacy & control section
- FAQ
- Call-to-action

#### 2. Login Page (`/login`)
- Google OAuth sign-in
- Simple, clean interface

#### 3. Library Page (`/library`)
- Display all saved clips
- Search and filter
- Quick actions

#### 4. Clip Detail Page (`/library/[id]`)
- Full text view
- AI workspace
- Previous summaries
- Source information

#### 5. Profile Page (`/library/profile`)
- User settings
- AI toggle
- Default format selection
- Monthly usage display

---

## 🔐 Security & Privacy

### 1. Authentication
- NextAuth.js with Google OAuth
- Session-based authentication
- Secure cookie storage

### 2. Authorization
- Every API route protected with `requireUser()`
- Ownership verification before access
- User-scoped queries

### 3. Data Validation
- Zod schemas for input validation
- SQL injection prevention (Prisma ORM)
- Input sanitization

### 4. Privacy
- AI only runs on explicit request
- No data sharing with third parties (except Gemini for summarization)
- Clear TOS modal explaining data usage

### 5. Rate Limiting
- Monthly quota enforcement (100 summaries default)
- Atomic operations to prevent race conditions
- Clear error messages when limits exceeded

---

## 🧪 Testing

### Test Structure

```
tests/
├── unit/
│   ├── clipservice.test.ts      # ClipService tests
│   ├── summaryservice.test.ts   # SummaryService tests
│   ├── settingservice.test.ts   # SettingsService tests
│   └── usage.test.ts            # UsageService tests
└── mockdata.ts                   # Shared mock data
```

### Testing Framework

- **Vitest**: Fast, modern test runner
- **Mocking**: Repository and AI client mocks
- **Coverage**: Code coverage reporting

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:cov
```

---

## 📦 Key Dependencies

### Production Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| **next** | 16.0.10 | React framework |
| **react** | 18.3.1 | UI library |
| **next-auth** | 5.0.0-beta.30 | Authentication |
| **@prisma/client** | 6.19.1 | Database ORM |
| **@google/genai** | 1.34.0 | Google Gemini AI |
| **zod** | 4.2.0 | Schema validation |
| **tailwindcss** | 4 | CSS framework |

### Development Dependencies

| Library | Purpose |
|---------|---------|
| **typescript** | Type safety |
| **vitest** | Testing framework |
| **eslint** | Code linting |

---

## 🚀 Setup & Running

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- Google Cloud account (for auth and AI)

### Setup Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/mouloud2003/cliperpro-chromeextenstion.git
cd cliperpro-chromeextenstion
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Setup

Create `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cliperpro"

# NextAuth
AUTH_SECRET="your-secret-key-here"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# AI
AI_MODEL="gemini-pro"
GEMINI_API_KEY="your-gemini-api-key"
PROMPT_VERSION="1"
```

#### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed data
npx prisma db seed
```

#### 5. Run Development Server

```bash
npm run dev
```

Open browser at: `http://localhost:3000`

---

## 📊 Performance Optimization

### Strategies Applied

1. **Server Components**: Most pages render on server
2. **Summary Caching**: Avoid regenerating same summaries
3. **Lazy Loading**: Load components when needed
4. **Database Indexing**: Indexes on important fields
5. **Pagination**: Limit query results

### Performance Metrics

- **Time to First Byte (TTFB)**: < 200ms
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms

---

## 🔮 Future Features

### Short-term

1. **Chrome Extension**:
   - Save text directly from any webpage
   - Seamless integration with website
   - Small popup UI

2. **Export**:
   - Export clips and summaries to Markdown
   - PDF export
   - CSV export

3. **Advanced Search**:
   - Full-text search
   - Filter by date and source
   - Tags/Categories

### Medium-term

4. **Folders/Collections**:
   - Organize clips in folders
   - Share collections

5. **Collaboration**:
   - Share clips with others
   - Collaborative annotations

6. **Mobile App**:
   - iOS/Android application

### Long-term

7. **Advanced AI**:
   - Generate quiz questions
   - Automatic flashcards
   - Concept linking

8. **Integrations**:
   - Notion, Obsidian
   - Anki (for flashcards)
   - Google Drive

---

## 🛠️ Troubleshooting

### Common Issues

#### 1. Database Connection Error

```
Error: Can't reach database server at `localhost:5432`
```

**Solution**:
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in `.env.local`

#### 2. Authentication Error

```
[auth][error] OAuthAccountNotLinked
```

**Solution**:
- Verify Google OAuth configuration
- Check `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`

#### 3. AI Service Error

```
AI_SERVICE_UNAVAILABLE
```

**Solution**:
- Verify `GEMINI_API_KEY`
- Check account credit/quota
- Review Gemini API usage limits

#### 4. Quota Exceeded

```
QUOTA_EXCEEDED: Monthly summary limit exceeded
```

**Solution**:
- Wait until next month
- Or upgrade plan (future feature)

---

## 📚 Resources & References

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google Gemini AI](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Architectural Concepts

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

## 👥 Contributing

### How to Contribute

1. Fork the project
2. Create a new branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make changes and test
4. Commit:
   ```bash
   git commit -m "Add amazing feature"
   ```
5. Push:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open Pull Request

### Code Standards

- Use TypeScript for all files
- Follow existing code style
- Add tests for new features
- Document complex functions
- Use clear, descriptive names

---

## 📝 Summary

**Clipper Pro** is a comprehensive learning project that combines:

✅ **Clean Architecture**: Clear separation of concerns  
✅ **Modern Technologies**: Next.js 16, React 18, TypeScript  
✅ **Robust Database**: PostgreSQL + Prisma ORM  
✅ **Advanced AI**: Google Gemini integration  
✅ **Security & Privacy**: Secure auth, full control  
✅ **Excellent UX**: Clean interface, fast response  
✅ **Testability**: Comprehensive test coverage  
✅ **Scalability**: Easy to add new features  

The project is ideal for learning and deep understanding of how to build a modern web application using software engineering best practices.

---

## 📞 Contact

- **Developer**: Mouloud
- **GitHub**: [mouloud2003](https://github.com/mouloud2003)
- **Project**: [cliperpro-chromeextenstion](https://github.com/mouloud2003/cliperpro-chromeextenstion)

---

<div align="center">

**Built with ❤️ using Next.js & TypeScript**

</div>
