"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Zap, Brain, FileText } from "lucide-react";

export default function ClipperIntro() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div className="container relative z-10 px-4 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
          >
            AI-Powered Learning Assistant
          </Badge>

          {/* Title */}
          <h1 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Learn Smarter, Not Harder
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Transform your study sessions with AI-powered notes, flashcards, and
            personalized learning paths.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              size="lg"
              className="w-full rounded-md bg-primary px-8 py-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Start Learning
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-md border-border px-8 py-5 text-sm font-medium transition-colors hover:bg-accent sm:w-auto"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4">
              <Zap className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Instant Notes
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4">
              <Brain className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Smart Flashcards
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4">
              <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                AI Summaries
              </span>
            </div>
          </div>

          {/* Trust line */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Free to start</span>
            <span className="hidden sm:inline">|</span>
            <span>No credit card required</span>
            <span className="hidden sm:inline">|</span>
            <span>Trusted by Professionals</span>
          </div>
        </div>
      </div>
    </section>
  );
}
