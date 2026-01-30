import { ProjectsPageContent } from "@/features/projects/ProjectsPageContent";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-start px-4 py-12 sm:px-6">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Проєкти
          </h1>
          <p className="mt-2 text-foreground-muted">
            Додавайте, перейменовуйте та видаляйте проєкти
          </p>
        </header>
        <ProjectsPageContent />
      </main>
    </div>
  );
}
