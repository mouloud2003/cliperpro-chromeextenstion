"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Zap, Brain, FileText } from "lucide-react";

export default function ClipperIntro() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
      <div className="container relative z-10 px-4 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0"
          >
            AI-Powered Learning Assistant
          </Badge>

          {/* Title */}
          <h1 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Learn Smarter, Not Harder
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Transform your study sessions with AI-powered notes, flashcards, and
            personalized learning paths.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-md px-8 py-5 text-sm font-medium bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white transition-colors"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Start Learning
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-md px-8 py-5 text-sm font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Zap className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Instant Notes
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Brain className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Smart Flashcards
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                AI Summaries
              </span>
            </div>
          </div>

          {/* Trust line */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
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
