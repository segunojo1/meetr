import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_45%,#ffffff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16 md:px-10">
        <section className="max-w-2xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-1 text-sm font-medium text-blue-700 shadow-sm backdrop-blur">
            Meetr workspace
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-slate-950 md:text-6xl">
            Run meetings, manage agents, and keep every conversation in one
            place.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            Jump straight into your agents dashboard to create, update, and
            reuse the assistants that power your meetings.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/agents"
              className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Go to agents
            </Link>
            <Link
              href="/meetings"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950"
            >
              View meetings
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Update: chatting with agents in meetings is working again. YAYY!!!
          </p>
        </section>
      </div>
    </main>
  );
}
