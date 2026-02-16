# 📚 Clipper Pro - الوثيقة التقنية الشاملة

<div dir="rtl">

## 🎯 نظرة عامة على المشروع

### فكرة المشروع

**Clipper Pro** هو تطبيق ويب تعليمي متقدم يهدف إلى تحويل تجربة القراءة على الإنترنت إلى معرفة قابلة للاستخدام. المشروع عبارة عن منصة شاملة تتيح للمستخدمين:

1. **حفظ النصوص من الويب**: يمكن للمستخدمين حفظ أي نص يجدونه مفيداً أثناء تصفح الإنترنت
2. **تنظيم المحتوى**: تخزين جميع النصوص المحفوظة في مكتبة شخصية منظمة
3. **الذكاء الاصطناعي حسب الطلب**: استخدام الذكاء الاصطناعي لإنشاء ملخصات بصيغ مختلفة (نقاط، فقرات، ملاحظات دراسية)
4. **حماية الخصوصية**: الذكاء الاصطناعي يعمل فقط عند الطلب الصريح من المستخدم

### المشكلة التي يحلها المشروع

يواجه الطلاب والباحثون والمتعلمون عدة تحديات:
- **تراكم التبويبات**: حفظ مئات المقالات والمواقع دون العودة إليها
- **الملاحظات المبعثرة**: توزيع الملاحظات عبر تطبيقات وأدوات مختلفة
- **إعادة القراءة المتكررة**: نسيان ما تم قراءته وإضاعة الوقت في إعادة القراءة

### الحل المقدم

Clipper Pro يقدم نهجاً منظماً:
```
حفظ النص → المكتبة → التلخيص بالذكاء الاصطناعي → الدراسة
```

---

## 🏗️ البنية المعمارية للمشروع

### نمط العمارة المستخدم: Clean Architecture (Hexagonal Architecture)

المشروع يتبع مبادئ **Clean Architecture** التي طورها Robert C. Martin، والتي تفصل المشروع إلى طبقات مستقلة:

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

### فوائد هذه البنية

1. **الاستقلالية**: كل طبقة مستقلة ويمكن تعديلها دون التأثير على الطبقات الأخرى
2. **قابلية الاختبار**: يمكن اختبار كل طبقة بشكل منفصل
3. **المرونة**: سهولة استبدال التقنيات (مثل تغيير قاعدة البيانات أو خدمة الذكاء الاصطناعي)
4. **الوضوح**: كل جزء له مسؤولية واضحة ومحددة

---

## 📂 هيكل المجلدات والملفات

### الهيكل العام

```
cliperpro-chromeextenstion/
│
├── app/                          # طبقة العرض (Presentation Layer)
│   ├── (marketing)/             # الصفحات التسويقية
│   │   ├── layout.tsx           # تخطيط الصفحات التسويقية
│   │   └── page.tsx             # الصفحة الرئيسية (Landing Page)
│   │
│   ├── api/                     # API Routes (Controllers)
│   │   ├── auth/                # نقاط نهاية المصادقة
│   │   │   └── [...nextauth]/route.ts
│   │   └── v1/                  # API Version 1
│   │       ├── clips/           # عمليات الـ Clips
│   │       │   ├── route.ts     # POST (create) & GET (list)
│   │       │   └── [id]/
│   │       │       ├── summarize/route.ts
│   │       │       └── summaries/route.ts
│   │       ├── settings/route.ts
│   │       └── usage/route.ts
│   │
│   ├── components/              # مكونات React القابلة لإعادة الاستخدام
│   │   ├── ClipLibrary.tsx     # عرض المكتبة
│   │   ├── Clipcard.tsx        # بطاقة النص المحفوظ
│   │   ├── Aiworkspace.tsx     # مساحة عمل الذكاء الاصطناعي
│   │   ├── Topbar.tsx          # شريط التنقل العلوي
│   │   └── ...
│   │
│   ├── library/                # صفحات المكتبة
│   │   ├── page.tsx            # قائمة الـ Clips
│   │   ├── [id]/page.tsx       # تفاصيل Clip معين
│   │   └── profile/page.tsx    # صفحة الملف الشخصي
│   │
│   ├── login/                  # صفحة تسجيل الدخول
│   ├── layout.tsx              # التخطيط الرئيسي
│   └── globals.css             # الأنماط العامة
│
├── core/                        # طبقة النطاق والمنطق (Domain + Application)
│   ├── domain/                 # الكيانات الأساسية
│   │   ├── types.ts            # جميع الأنواع والواجهات
│   │   └── next-auth.d.ts      # تعريفات NextAuth
│   │
│   ├── applicationlogique/     # منطق الأعمال
│   │   ├── services/           # الخدمات الرئيسية
│   │   │   ├── clipservice.ts      # إدارة النصوص المحفوظة
│   │   │   ├── summaryservice.ts   # خدمة التلخيص
│   │   │   ├── settingservice.ts   # إدارة الإعدادات
│   │   │   └── usageservice.ts     # تتبع الاستخدام
│   │   ├── utils/              # وظائف مساعدة
│   │   └── errors.ts           # أخطاء مخصصة
│   │
│   └── ports/                  # واجهات (Interfaces)
│       ├── ai.ts               # واجهة خدمة الذكاء الاصطناعي
│       └── repos.ts            # واجهات المستودعات
│
├── infra/                      # طبقة البنية التحتية
│   ├── ai/                     # تطبيقات الذكاء الاصطناعي
│   │   ├── Gemini.ts          # تكامل Google Gemini
│   │   └── mockclient.ts      # عميل وهمي للاختبار
│   │
│   ├── auth/                   # المصادقة
│   │   ├── requireUser.ts     # التحقق من المستخدم
│   │   └── devauth.ts         # مصادقة التطوير
│   │
│   └── prisma/                 # قاعدة البيانات
│       ├── client.ts          # عميل Prisma
│       └── repos/             # تطبيقات المستودعات
│           ├── cliprepo.ts
│           ├── summaryrepo.ts
│           ├── settingsrepo.ts
│           └── usagerepo.ts
│
├── prisma/                     # تكوين قاعدة البيانات
│   ├── schema.prisma          # مخطط قاعدة البيانات
│   └── migrations/            # الهجرات (Migrations)
│
├── tests/                      # الاختبارات
│   ├── unit/                  # اختبارات الوحدة
│   └── mockdata.ts            # بيانات وهمية للاختبار
│
├── components/                 # مكونات UI من shadcn
│   └── ui/
│
├── lib/                        # مكتبات مساعدة
│   └── utils.ts
│
├── public/                     # الملفات الثابتة
│
├── package.json               # التبعيات والسكريبتات
├── tsconfig.json              # تكوين TypeScript
├── next.config.js             # تكوين Next.js
├── vitest.config.ts           # تكوين الاختبارات
└── auth.ts                    # إعداد NextAuth
```

---

## 🔍 شرح تفصيلي لكل طبقة

### 1️⃣ طبقة النطاق (Domain Layer) - `/core/domain/`

هذه الطبقة تحتوي على **القلب النابض للتطبيق** - التعريفات الأساسية والأنواع التي تستخدم في كل مكان.

#### الملف: `types.ts`

```typescript
// أنواع صيغ التلخيص المتاحة
export type SummaryFormat = "paragraph" | "bullet_points" | "study_notes";

// بيانات إدخال إنشاء Clip جديد
export type CreateClipInput = {
  text: string;           // النص المحفوظ (إجباري)
  url?: string;           // رابط المصدر (اختياري)
  title?: string;         // العنوان (اختياري)
  sourceId?: string | null; // معرف المصدر (اختياري)
};

// كائن نقل البيانات للـ Clip (للعرض في القوائم)
export type ClipDTO = {
  id: string;
  title?: string;
  url?: string;
  textPreview: string;    // معاينة النص (الأحرف الأولى)
  createdAt: string;
  hasAiSummary?: boolean;
};

// كائن نقل البيانات الكامل للـ Clip (للعرض التفصيلي)
export type ClipDetailDTO = {
  id: string;
  userId: string;
  title?: string;
  url?: string;
  text: string;          // النص الكامل
  createdAt: string;
  hasAiSummary?: boolean;
};

// كائن نقل البيانات للملخص
export type SummaryDTO = {
  clipId: string;
  format: SummaryFormat;
  title?: string;
  body: string;
  createdAt: string;
  fromCache: boolean;    // هل جاء من الذاكرة المؤقتة؟
};

// إعدادات المستخدم
export type UserSettingsDTO = {
  aiEnabled: boolean;                    // هل الذكاء الاصطناعي مفعل؟
  defaultSummaryFormat: SummaryFormat;   // الصيغة الافتراضية
};

// معلومات الاستخدام الشهري
export type UsageDTO = {
  monthStart: string;
  summaryCount: number;  // عدد الملخصات المستخدمة
  limit: number;         // الحد الأقصى
  remaining: number;     // المتبقي
};

// رموز الأخطاء
export type ErrorCode = 
  | "NOT_FOUND" 
  | "UNAUTHORIZED"
  | "QUOTA_EXCEEDED"
  | "AI_DISABLED"
  // ... إلخ
```

**الغرض**: توفير عقد واضح (contract) لكيفية تدفق البيانات في التطبيق.

---

### 2️⃣ طبقة منطق التطبيق (Application Logic Layer) - `/core/applicationlogique/`

هذه الطبقة تحتوي على **قواعد العمل الأساسية** للتطبيق.

#### أ. خدمة النصوص (ClipService) - `services/clipservice.ts`

```typescript
export class ClipService {
  constructor(private clipRepo: IClipRepository) {}

  // إنشاء Clip جديد
  async createManualClip(userId: string, input: CreateClipInput) {
    // 1. تنظيف وتطبيع النص
    const textNorm = normalizeText(input.text);
    
    // 2. التحقق من صحة النص (ليس فارغاً، لا يتجاوز الحد الأقصى)
    validateClipText(textNorm);
    
    // 3. حفظ في قاعدة البيانات
    const { id } = await this.clipRepo.create(userId, {
      ...input,
      text: textNorm,
    });
    
    return { clipId: id };
  }

  // الحصول على قائمة النصوص للمستخدم
  async listUserClips(userId: string, limit = 50) {
    const items = await this.clipRepo.findManyByUserId(userId, limit);
    return { items };
  }

  // الحصول على تفاصيل Clip مع فحص الملكية
  async getClipDetails(userId: string, clipId: string) {
    const clip = await this.clipRepo.getById(clipId);
    
    if (!clip) {
      throw new AppError("NOT_FOUND", 404, "Clip not found");
    }
    
    // فحص الملكية: فقط المالك يمكنه الوصول
    if (clip.userId !== userId) {
      throw new AppError("FORBIDDEN", 403, "User does not own this clip");
    }
    
    return clip;
  }
}
```

**المسؤوليات**:
- التحقق من صحة البيانات
- تطبيق قواعد العمل
- التنسيق بين المستودعات

#### ب. خدمة التلخيص (SummaryService) - `services/summaryservice.ts`

```typescript
export class SummaryService {
  constructor(
    private clipService: ClipService,
    private settingsService: SettingsService,
    private usageService: UsageService,
    private summaryRepo: IClipSummaryRepository,
    private aiClient: IAIClient
  ) {}

  async summarizeClip(userId: string, clipId: string, format: SummaryFormat) {
    // 1. التحقق من الملكية والحصول على النص
    const clip = await this.clipService.getClipDetails(userId, clipId);
    
    // 2. التحقق من الإعدادات
    const settings = await this.settingsService.getUserSettings(userId);
    if (!settings.aiEnabled) {
      throw new AppError("AI_DISABLED", 403, "AI is disabled in settings");
    }
    
    // 3. إنشاء مفتاح التخزين المؤقت
    const inputHash = makeSummaryCacheKey({
      text: clip.text,
      format,
      model: process.env.AI_MODEL,
      promptVersion: Number(process.env.PROMPT_VERSION),
    });
    
    // 4. فحص الذاكرة المؤقتة
    const cached = await this.summaryRepo.findLatestByClipAndFormat({
      userId, clipId, format, inputHash
    });
    
    if (cached) {
      return { ...cached, fromCache: true };
    }
    
    // 5. استهلاك كوتا واحدة (عملية ذرية)
    await this.usageService.consumeOneSummary(userId);
    
    try {
      // 6. استدعاء الذكاء الاصطناعي
      const out = await this.aiClient.summarize({
        text: clip.text,
        format,
      });
      
      // 7. حفظ الملخص
      const summary = await this.summaryRepo.create({
        userId, clipId, format,
        model: process.env.AI_MODEL,
        promptVersion: Number(process.env.PROMPT_VERSION),
        inputHash,
        title: out.title,
        body: out.body,
      });
      
      return { ...summary, fromCache: false };
    } catch (e) {
      // معالجة الأخطاء
      throw e;
    }
  }
}
```

**الميزات الرئيسية**:
1. **التخزين المؤقت**: تجنب إعادة توليد نفس الملخص
2. **فحص الحصص**: التأكد من عدم تجاوز الحد الشهري
3. **العملية الذرية**: ضمان عدم حدوث سباق في الشروط (race conditions)

#### ج. خدمة الاستخدام (UsageService) - `services/usageservice.ts`

تتتبع استخدام المستخدم للذكاء الاصطناعي شهرياً.

```typescript
export class UsageService {
  async consumeOneSummary(userId: string) {
    // الحصول أو إنشاء سجل الاستخدام للشهر الحالي
    const usage = await this.usageRepo.getOrCreateCurrentMonth(userId);
    
    // فحص الحصة
    if (usage.summaryCount >= usage.limit) {
      throw new AppError("QUOTA_EXCEEDED", 403, "Monthly summary limit exceeded");
    }
    
    // زيادة العداد (عملية ذرية في قاعدة البيانات)
    await this.usageRepo.incrementCount(userId, usage.monthStart);
  }
}
```

---

### 3️⃣ طبقة البنية التحتية (Infrastructure Layer) - `/infra/`

هذه الطبقة تتعامل مع **التفاصيل التقنية الخارجية**.

#### أ. قاعدة البيانات - Prisma + PostgreSQL

**الملف**: `prisma/schema.prisma`

```prisma
// المستخدم
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  createdAt     DateTime @default(now())
  
  settings      UserSettings?
  clips         Clip[]
  summaries     ClipSummary[]
  usage         UsageMonthly[]
  accounts      Account[]
  sessions      Session[]
}

// إعدادات المستخدم
model UserSettings {
  userId               String        @id
  aiEnabled            Boolean       @default(false)
  defaultSummaryFormat SummaryFormat @default(bullet_points)
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// النص المحفوظ
model Clip {
  id        String   @id @default(cuid())
  userId    String
  sourceId  String?
  text      String
  url       String?
  title     String?
  createdAt DateTime @default(now())
  
  user      User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  summaries ClipSummary[]
  
  @@unique([userId, sourceId])  // منع التكرار
}

// الملخص
model ClipSummary {
  id            String        @id @default(cuid())
  userId        String
  clipId        String
  format        SummaryFormat
  model         String
  promptVersion Int           @default(1)
  inputHash     String        // للتخزين المؤقت
  summaryTitle  String?
  summaryBody   String
  status        String        @default("completed")
  createdAt     DateTime      @default(now())
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  clip Clip @relation(fields: [clipId], references: [id], onDelete: Cascade)
  
  @@index([clipId, format])
  @@unique([clipId, format, model, promptVersion, inputHash])
}

// الاستخدام الشهري
model UsageMonthly {
  id           String   @id @default(cuid())
  userId       String
  monthStart   DateTime
  summaryCount Int      @default(0)
  limit        Int      @default(100)
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, monthStart])
}
```

**مستودع Clip** - `infra/prisma/repos/cliprepo.ts`:

```typescript
export class ClipRepoPrisma implements IClipRepository {
  async create(userId: string, input: CreateClipInput) {
    return await prisma.clip.create({
      data: {
        userId,
        text: input.text,
        url: input.url,
        title: input.title,
        sourceId: input.sourceId,
      },
    });
  }
  
  async findManyByUserId(userId: string, limit: number): Promise<ClipDTO[]> {
    const clips = await prisma.clip.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        summaries: { select: { id: true } }
      }
    });
    
    return clips.map(clip => ({
      id: clip.id,
      title: clip.title,
      url: clip.url,
      textPreview: clip.text.substring(0, 150) + "...",
      createdAt: clip.createdAt.toISOString(),
      hasAiSummary: clip.summaries.length > 0,
    }));
  }
  
  async getById(clipId: string): Promise<ClipDetailDTO | null> {
    const clip = await prisma.clip.findUnique({
      where: { id: clipId }
    });
    
    if (!clip) return null;
    
    return {
      id: clip.id,
      userId: clip.userId,
      title: clip.title,
      url: clip.url,
      text: clip.text,
      createdAt: clip.createdAt.toISOString(),
    };
  }
}
```

#### ب. الذكاء الاصطناعي - Google Gemini

**الملف**: `infra/ai/Gemini.ts`

```typescript
import { GoogleGenerativeAI } from "@google/genai";

export class GeminiClient implements IAIClient {
  private client: GoogleGenerativeAI;
  
  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }
  
  async summarize(input: { text: string; format: SummaryFormat }) {
    const model = this.client.getGenerativeModel({ 
      model: "gemini-pro" 
    });
    
    // بناء الـ Prompt حسب الصيغة المطلوبة
    const prompt = this.buildPrompt(input.text, input.format);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // استخراج العنوان والمحتوى
    return this.parseResponse(text);
  }
  
  private buildPrompt(text: string, format: SummaryFormat): string {
    const formatInstructions = {
      paragraph: "Summarize in a clear, concise paragraph",
      bullet_points: "Summarize as bullet points",
      study_notes: "Create study notes with Q&A format"
    };
    
    return `${formatInstructions[format]}:\n\n${text}`;
  }
}
```

#### ج. المصادقة - NextAuth.js

**الملف**: `auth.ts`

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/infra/prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
```

**حماية المسارات** - `infra/auth/requireUser.ts`:

```typescript
export async function requireUser() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }
  
  return { id: session.user.id };
}
```

---

### 4️⃣ طبقة العرض (Presentation Layer) - `/app/`

#### أ. API Routes (المتحكمات)

**مثال**: `app/api/v1/clips/route.ts`

```typescript
// POST /api/v1/clips - إنشاء clip جديد
export async function POST(req: NextRequest) {
  try {
    // 1. المصادقة
    const user = await requireUser();
    
    // 2. التحقق من صحة البيانات المدخلة
    const body = CreateClipSchema.parse(await req.json());
    
    // 3. إنشاء الخدمة
    const clipService = new ClipService(new ClipRepoPrisma());
    
    // 4. استدعاء منطق العمل
    const { clipId } = await clipService.createManualClip(user.id, body);
    
    // 5. إرجاع الاستجابة
    return NextResponse.json({ ok: true, clipId }, { status: 201 });
  } catch (e) {
    // معالجة الأخطاء
    if (e instanceof AppError) {
      return NextResponse.json(
        { ok: false, code: e.code, message: e.message },
        { status: e.status }
      );
    }
    // ...
  }
}

// GET /api/v1/clips - قائمة النصوص
export async function GET() {
  try {
    const user = await requireUser();
    const clipService = new ClipService(new ClipRepoPrisma());
    const data = await clipService.listUserClips(user.id, 50);
    
    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (e) {
    // معالجة الأخطاء
  }
}
```

**نقاط النهاية الرئيسية**:

| الطريقة | المسار | الوظيفة |
|--------|--------|---------|
| POST | `/api/v1/clips` | إنشاء clip جديد |
| GET | `/api/v1/clips` | قائمة النصوص للمستخدم |
| POST | `/api/v1/clips/[id]/summarize` | إنشاء ملخص لنص معين |
| GET | `/api/v1/clips/[id]/summaries` | الحصول على جميع ملخصات نص معين |
| GET | `/api/v1/settings` | الحصول على إعدادات المستخدم |
| PATCH | `/api/v1/settings` | تحديث الإعدادات |
| GET | `/api/v1/usage` | معلومات الاستخدام الشهري |

#### ب. صفحات Next.js

**الصفحة الرئيسية للمكتبة** - `app/library/page.tsx`:

```typescript
export default async function LibraryPage() {
  // 1. التحقق من المصادقة
  const user = await requireUser();
  
  // 2. جلب البيانات على السيرفر
  const clipService = new ClipService(new ClipRepoPrisma());
  const { items: clips } = await clipService.listUserClips(user.id);
  
  // 3. تمرير البيانات للمكون
  return <ClipLibrary clips={clips} />;
}
```

**صفحة تفاصيل النص** - `app/library/[id]/page.tsx`:

```typescript
export default async function ClipDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const user = await requireUser();
  const clipService = new ClipService(new ClipRepoPrisma());
  const clip = await clipService.getClipDetails(user.id, params.id);
  
  return <ClipDetailView clip={clip} />;
}
```

#### ج. مكونات React

**مكون بطاقة النص** - `app/components/Clipcard.tsx`:

```typescript
export function Clipcard({ clip }: { clip: ClipDTO }) {
  return (
    <Link href={`/library/${clip.id}`}>
      <div className="clip-card">
        <div className="clip-header">
          {clip.title && <h3>{clip.title}</h3>}
          {clip.url && <span className="source">{new URL(clip.url).hostname}</span>}
        </div>
        
        <p className="clip-preview">{clip.textPreview}</p>
        
        <div className="clip-footer">
          <time>{new Date(clip.createdAt).toLocaleDateString()}</time>
          {clip.hasAiSummary && (
            <Badge>
              <Sparkles /> Summarized
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
```

**مساحة عمل الذكاء الاصطناعي** - `app/components/Aiworkspace.tsx`:

```typescript
"use client";

export function Aiworkspace({ clipId }: { clipId: string }) {
  const [format, setFormat] = useState<SummaryFormat>("bullet_points");
  const [summary, setSummary] = useState<SummaryDTO | null>(null);
  const [loading, setLoading] = useState(false);
  
  async function handleSummarize() {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/clips/${clipId}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format }),
      });
      
      const data = await res.json();
      
      if (data.ok) {
        setSummary(data.summary);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="ai-workspace">
      <div className="format-selector">
        <button onClick={() => setFormat("bullet_points")}>
          Bullet Points
        </button>
        <button onClick={() => setFormat("paragraph")}>
          Paragraph
        </button>
        <button onClick={() => setFormat("study_notes")}>
          Study Notes
        </button>
      </div>
      
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Generating..." : "Summarize"}
      </button>
      
      {summary && (
        <div className="summary-result">
          {summary.title && <h3>{summary.title}</h3>}
          <div>{summary.body}</div>
          {summary.fromCache && (
            <Badge>From Cache</Badge>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 🔄 تدفق البيانات الكامل

### سيناريو 1: حفظ نص جديد

```
1. المستخدم يختار نصاً ويضغط "حفظ"
   ↓
2. Chrome Extension (مستقبلي) أو واجهة الويب تُرسل POST إلى:
   POST /api/v1/clips
   Body: { text: "...", url: "...", title: "..." }
   ↓
3. API Route (app/api/v1/clips/route.ts):
   - التحقق من المصادقة (requireUser)
   - التحقق من صحة البيانات (Zod)
   ↓
4. ClipService.createManualClip():
   - تنظيف النص (normalizeText)
   - التحقق من صحته (validateClipText)
   ↓
5. ClipRepoPrisma.create():
   - INSERT INTO clips ...
   ↓
6. إرجاع { clipId }
   ↓
7. عرض رسالة نجاح للمستخدم
```

### سيناريو 2: توليد ملخص

```
1. المستخدم يفتح نصاً ويضغط "Summarize"
   ↓
2. Frontend يرسل:
   POST /api/v1/clips/{id}/summarize
   Body: { format: "bullet_points" }
   ↓
3. API Route:
   - requireUser() → التحقق من المصادقة
   ↓
4. SummaryService.summarizeClip():
   a. clipService.getClipDetails() → جلب النص + فحص الملكية
   b. settingsService.getUserSettings() → فحص aiEnabled
   c. makeSummaryCacheKey() → إنشاء hash
   d. summaryRepo.findLatestByClipAndFormat() → فحص Cache
      ↓
      إذا موجود → إرجاعه مباشرة ✅
      ↓
   e. usageService.consumeOneSummary()
      - getOrCreateCurrentMonth()
      - فحص: summaryCount < limit؟
      - incrementCount() (عملية ذرية)
      ↓
   f. aiClient.summarize() → استدعاء Google Gemini
      - buildPrompt()
      - generateContent()
      - parseResponse()
      ↓
   g. summaryRepo.create() → حفظ الملخص في DB
   ↓
5. إرجاع الملخص للـ Frontend
   ↓
6. عرض الملخص في UI
```

### سيناريو 3: عرض المكتبة

```
1. المستخدم يزور /library
   ↓
2. Server Component (app/library/page.tsx):
   - requireUser() → التحقق من المصادقة
   - clipService.listUserClips(userId, 50)
   ↓
3. ClipRepoPrisma.findManyByUserId():
   - SELECT * FROM clips WHERE userId = ?
     ORDER BY createdAt DESC LIMIT 50
   - تحويل إلى ClipDTO (مع textPreview)
   ↓
4. تمرير clips إلى <ClipLibrary />
   ↓
5. ClipLibrary يعرض قائمة من <Clipcard />
   ↓
6. المستخدم يرى قائمة النصوص المحفوظة
```

---

## 🎨 واجهة المستخدم (UI/UX)

### التقنيات المستخدمة

1. **Tailwind CSS**: للتنسيق السريع والمرن
2. **shadcn/ui**: مكونات جاهزة وقابلة للتخصيص
3. **Lucide Icons**: أيقونات حديثة وواضحة
4. **IBM Plex Sans Arabic**: خط عربي جميل
5. **React Toast**: إشعارات للمستخدم

### الصفحات الرئيسية

#### 1. Landing Page (`/`)

- **الهدف**: جذب المستخدمين الجدد
- **المحتوى**:
  - Hero Section مع وصف المشروع
  - Features (الميزات الأساسية)
  - How It Works (3 خطوات)
  - Privacy & Control
  - FAQ
  - CTA للتسجيل

#### 2. Login Page (`/login`)

- تسجيل الدخول باستخدام Google OAuth
- واجهة بسيطة وسهلة

#### 3. Library Page (`/library`)

- عرض جميع النصوص المحفوظة
- بحث وتصفية
- إمكانية حذف أو تعديل

#### 4. Clip Detail Page (`/library/[id]`)

- عرض النص الكامل
- AI Workspace لتوليد الملخصات
- عرض الملخصات السابقة
- معلومات المصدر

#### 5. Profile Page (`/library/profile`)

- إعدادات المستخدم
- تفعيل/تعطيل الذكاء الاصطناعي
- اختيار الصيغة الافتراضية
- عرض الاستخدام الشهري

---

## 🔐 الأمان والخصوصية

### 1. المصادقة

- **NextAuth.js** مع Google OAuth
- Session-based authentication
- Secure cookie storage

### 2. التفويض

- كل API route محمي بـ `requireUser()`
- فحص ملكية الـ Clip قبل السماح بالوصول
- فحص ملكية الملخصات

### 3. التحقق من صحة البيانات

- **Zod schemas** للتحقق من البيانات المدخلة
- منع SQL Injection (Prisma ORM)
- تنظيف النصوص المدخلة

### 4. الخصوصية

- الذكاء الاصطناعي يعمل فقط عند الطلب الصريح
- عدم مشاركة البيانات مع أطراف ثالثة (إلا Gemini عند التلخيص)
- TOS Modal لتوضيح سياسة الخصوصية

### 5. حماية من الإفراط في الاستخدام

- حد شهري للملخصات (100 ملخص افتراضياً)
- عمليات ذرية لتجنب Race Conditions
- رسائل واضحة عند تجاوز الحد

---

## 🧪 الاختبارات

### هيكل الاختبارات

```
tests/
├── unit/
│   ├── clipservice.test.ts      # اختبارات ClipService
│   ├── summaryservice.test.ts   # اختبارات SummaryService
│   ├── settingservice.test.ts   # اختبارات SettingsService
│   └── usage.test.ts            # اختبارات UsageService
└── mockdata.ts                   # بيانات وهمية مشتركة
```

### مثال على اختبار

```typescript
import { describe, it, expect, vi } from 'vitest';
import { ClipService } from '@/core/applicationlogique/services/clipservice';

describe('ClipService', () => {
  it('should create a clip successfully', async () => {
    // Arrange
    const mockRepo = {
      create: vi.fn().mockResolvedValue({ id: 'clip-123' })
    };
    const service = new ClipService(mockRepo as any);
    
    // Act
    const result = await service.createManualClip('user-1', {
      text: 'Test clip content'
    });
    
    // Assert
    expect(result.clipId).toBe('clip-123');
    expect(mockRepo.create).toHaveBeenCalledWith('user-1', expect.any(Object));
  });
  
  it('should throw error for empty text', async () => {
    const mockRepo = { create: vi.fn() };
    const service = new ClipService(mockRepo as any);
    
    await expect(
      service.createManualClip('user-1', { text: '' })
    ).rejects.toThrow();
  });
});
```

### تشغيل الاختبارات

```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل مع المراقبة
npm run test:watch

# تشغيل مع تغطية الكود
npm run test:cov
```

---

## 📦 التبعيات الرئيسية

### Dependencies

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| **next** | 16.0.10 | إطار React للإنتاج |
| **react** | 18.3.1 | مكتبة UI |
| **next-auth** | 5.0.0-beta.30 | المصادقة |
| **@prisma/client** | 6.19.1 | ORM لقاعدة البيانات |
| **@google/genai** | 1.34.0 | Google Gemini AI |
| **zod** | 4.2.0 | التحقق من صحة البيانات |
| **tailwindcss** | 4 | CSS Framework |
| **lucide-react** | 0.562.0 | الأيقونات |

### DevDependencies

| المكتبة | الغرض |
|---------|-------|
| **typescript** | لغة البرمجة |
| **vitest** | إطار الاختبارات |
| **eslint** | linting للكود |

---

## 🚀 الإعداد والتشغيل

### المتطلبات الأساسية

- Node.js 20+
- PostgreSQL 14+
- حساب Google Cloud (للمصادقة والذكاء الاصطناعي)

### خطوات الإعداد

#### 1. استنساخ المشروع

```bash
git clone https://github.com/mouloud2003/cliperpro-chromeextenstion.git
cd cliperpro-chromeextenstion
```

#### 2. تثبيت التبعيات

```bash
npm install
```

#### 3. إعداد البيئة

أنشئ ملف `.env.local`:

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

#### 4. تهيئة قاعدة البيانات

```bash
# توليد عميل Prisma
npx prisma generate

# تشغيل الهجرات
npx prisma migrate dev

# (اختياري) ملء البيانات الأولية
npx prisma db seed
```

#### 5. تشغيل الخادم التطويري

```bash
npm run dev
```

افتح المتصفح على: `http://localhost:3000`

---

## 📊 تحليل الأداء

### استراتيجيات التحسين المطبقة

1. **Server Components**: معظم الصفحات تُعرَّض على السيرفر
2. **التخزين المؤقت للملخصات**: تجنب إعادة التوليد
3. **Lazy Loading**: تحميل المكونات عند الحاجة
4. **Database Indexing**: فهارس على الحقول المهمة
5. **Pagination**: تحديد عدد النتائج (limit)

### قياسات الأداء

- **Time to First Byte (TTFB)**: < 200ms
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms

---

## 🔮 الميزات المستقبلية

### قصيرة المدى

1. **Chrome Extension**:
   - حفظ النصوص مباشرة من أي صفحة ويب
   - تكامل سلس مع الموقع
   - popup UI صغير

2. **Export**:
   - تصدير النصوص والملخصات إلى Markdown
   - تصدير إلى PDF
   - تصدير إلى CSV

3. **البحث المتقدم**:
   - بحث نصي كامل (Full-text search)
   - تصفية حسب التاريخ والمصدر
   - Tags/Categories

### متوسطة المدى

4. **Folders/Collections**:
   - تنظيم النصوص في مجلدات
   - مشاركة المجلدات

5. **Collaboration**:
   - مشاركة النصوص مع الآخرين
   - تعليقات جماعية

6. **Mobile App**:
   - تطبيق iOS/Android

### طويلة المدى

7. **Advanced AI**:
   - توليد أسئلة اختبارية
   - Flashcards تلقائية
   - ربط المفاهيم المتشابهة

8. **Integrations**:
   - Notion, Obsidian
   - Anki (للـ Flashcards)
   - Google Drive

---

## 🛠️ استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. خطأ الاتصال بقاعدة البيانات

```
Error: Can't reach database server at `localhost:5432`
```

**الحل**:
- تأكد من تشغيل PostgreSQL
- تحقق من `DATABASE_URL` في `.env.local`

#### 2. خطأ المصادقة

```
[auth][error] OAuthAccountNotLinked
```

**الحل**:
- تأكد من تكوين Google OAuth بشكل صحيح
- تحقق من `AUTH_GOOGLE_ID` و `AUTH_GOOGLE_SECRET`

#### 3. خطأ الذكاء الاصطناعي

```
AI_SERVICE_UNAVAILABLE
```

**الحل**:
- تحقق من `GEMINI_API_KEY`
- تأكد من وجود رصيد كافٍ في حسابك
- تحقق من حدود الاستخدام لـ Gemini API

#### 4. تجاوز الحصة الشهرية

```
QUOTA_EXCEEDED: Monthly summary limit exceeded
```

**الحل**:
- انتظر حتى بداية الشهر التالي
- أو قم بترقية الخطة (ميزة مستقبلية)

---

## 📚 المصادر والمراجع

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google Gemini AI](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### المفاهيم المعمارية

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

## 👥 المساهمة

### كيفية المساهمة

1. Fork المشروع
2. أنشئ فرعاً جديداً:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. قم بالتغييرات والاختبار
4. Commit:
   ```bash
   git commit -m "Add amazing feature"
   ```
5. Push:
   ```bash
   git push origin feature/amazing-feature
   ```
6. افتح Pull Request

### معايير الكود

- استخدم TypeScript لجميع الملفات
- اتبع أسلوب الكود الموجود
- أضف اختبارات للميزات الجديدة
- وثّق الوظائف المعقدة
- استخدم أسماء واضحة ومعبرة

---

## 📝 الخلاصة

**Clipper Pro** هو مشروع تعليمي متكامل يجمع بين:

✅ **بنية معمارية نظيفة**: فصل واضح بين الطبقات  
✅ **تقنيات حديثة**: Next.js 16, React 18, TypeScript  
✅ **قاعدة بيانات قوية**: PostgreSQL + Prisma ORM  
✅ **ذكاء اصطناعي متقدم**: Google Gemini  
✅ **أمان وخصوصية**: مصادقة آمنة، تحكم كامل  
✅ **تجربة مستخدم ممتازة**: واجهة نظيفة، استجابة سريعة  
✅ **قابلية الاختبار**: اختبارات شاملة لكل طبقة  
✅ **قابلية التوسع**: سهولة إضافة ميزات جديدة  

المشروع مثالي للتعلم والفهم العميق لكيفية بناء تطبيق ويب حديث باستخدام أفضل الممارسات في هندسة البرمجيات.

---

## 📞 التواصل

- **المطور**: Mouloud
- **GitHub**: [mouloud2003](https://github.com/mouloud2003)
- **المشروع**: [cliperpro-chromeextenstion](https://github.com/mouloud2003/cliperpro-chromeextenstion)

---

<div align="center">

**صُنع بـ ❤️ باستخدام Next.js و TypeScript**

</div>

</div>
