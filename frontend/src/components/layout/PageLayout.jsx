export default function PageLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">{children}</div>
    </main>
  );
}
