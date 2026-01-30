import { ReportsPageContent } from "@/features/reports/ReportsPageContent";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-start px-4 py-12 sm:px-6">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Звіти
          </h1>
          <p className="mt-2 text-foreground-muted">
            Фільтр по даті та проєкту, копіювання описів за день
          </p>
        </header>
        <ReportsPageContent />
      </main>
    </div>
  );
}
