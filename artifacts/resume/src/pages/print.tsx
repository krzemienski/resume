import type { ReactNode } from 'react';
import { CONTACTS, JOBS, POSTS, PROJECTS, SKILLS, STATS, type Job } from '@/data/resume';

function H({ ch, children }: { ch: string; children: ReactNode }) {
  return (
    <div className="mb-2 mt-4 flex items-center gap-2">
      <span className="pt-sm font-mono uppercase tracking-widest text-accent">CH {ch}</span>
      <h2 className="pt-lg font-semibold uppercase tracking-wider">{children}</h2>
      <div aria-hidden className="h-px flex-1 bg-border" />
    </div>
  );
}

function Bul({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 space-y-0.5">
      {items.map((b, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden className="font-mono text-chart-3">&gt;</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function JobBlock({ j, first }: { j: Job; first?: boolean }) {
  return (
    <div className="mb-2.5 border-l border-border pl-3" style={{ breakInside: 'avoid' }}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="pt-md font-semibold">
          <span className={first ? 'text-accent' : ''}>{j.org}</span>
          {j.title && <span className="text-muted-foreground"> — </span>}
          {j.title && <span className="text-primary">{j.title}</span>}
        </h3>
        <span className="pt-sm shrink-0 font-mono uppercase tracking-wider text-muted-foreground">
          {j.dates} · {j.where}
        </span>
      </div>
      {j.blurb && <p className="text-muted-foreground">{j.blurb}</p>}
      {j.bullets && <Bul items={j.bullets} />}
      {j.roles?.map((r) => (
        <div key={r.title} className="mt-1.5 border-l border-primary pl-2.5">
          <div className="flex items-baseline justify-between gap-3">
            <h4 className="font-medium">{r.title}</h4>
            <span className="pt-sm shrink-0 font-mono uppercase tracking-wider text-muted-foreground">{r.dates}</span>
          </div>
          <Bul items={r.bullets} />
        </div>
      ))}
    </div>
  );
}

function Foot({ n }: { n: number }) {
  return (
    <div className="pt-sm mt-auto flex justify-between border-t border-border pt-2 font-mono uppercase tracking-widest text-muted-foreground">
      <span>Nick Krzemienski · Resume</span>
      <span><span className="text-chart-3">{String(n).padStart(2, '0')}</span> / 02</span>
    </div>
  );
}

export default function PrintResume() {
  const fubo = JOBS.findIndex((j) => j.org === 'fuboTV');
  const page1 = JOBS.slice(0, fubo + 1);
  const page2 = JOBS.slice(fubo + 1);

  return (
    <div className="print-doc min-h-[100dvh] py-4 font-sans print:py-0">
      <article className="sheet" aria-label="Resume page 1">
        <header className="flex items-start justify-between gap-6 border-b border-border pb-3">
          <div>
            <p className="pt-sm font-mono uppercase tracking-widest text-muted-foreground">
              <span className="text-chart-4">[ REC ]</span> New York, NY
            </p>
            <h1 className="pt-name mt-1 font-bold uppercase tracking-tight">
              Nick <span className="text-primary">Krzemienski</span>
            </h1>
            <p className="pt-md mt-1.5 font-medium">Agentic Engineer · Principal, WithAgents</p>
          </div>
          <ul className="pt-sm space-y-0.5 text-right font-mono">
            {CONTACTS.map((c) => (
              <li key={c.id}><a href={c.href}>{c.label}</a></li>
            ))}
          </ul>
        </header>

        <p className="mt-3">
          I build the harnesses that make AI coding agents trustworthy in real codebases: validation gates, multi-agent consensus, and planning loops that refuse to ship without evidence. Before agents, I spent seven years at fuboTV building streaming-video infrastructure at production scale — encoding pipelines, just-in-time transcoding, multi-view for live sports — and before that I founded two software studios. I've led teams of ten and still write the code. Former USMC Infantry Squad Leader (Sergeant).
        </p>

        <dl className="mt-3 grid grid-cols-4 border border-border">
          {STATS.map((s, i) => (
            <div key={i} className={`px-2.5 py-2 ${i < 3 ? 'border-r border-border' : ''}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className={`pt-stat block font-mono font-bold ${i % 2 ? 'text-chart-3' : 'text-primary'}`}>{s.value}</span>
                <span className="pt-sm mt-1 block text-muted-foreground">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <H ch="01">Experience</H>
        {page1.map((j, i) => <JobBlock key={j.org} j={j} first={i === 0} />)}
        <Foot n={1} />
      </article>

      <article className="sheet" aria-label="Resume page 2">
        <H ch="01">Experience, continued</H>
        {page2.map((j) => <JobBlock key={j.org} j={j} />)}

        <H ch="02">Open Source &amp; Writing</H>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          {PROJECTS.map((p) => (
            <div key={p.name} className="border-l border-chart-3 pl-2.5">
              <div className="flex items-baseline gap-2">
                <h3 className="pt-md font-semibold">{p.name}</h3>
                <a href={p.url} className="pt-sm font-mono">{p.display}</a>
              </div>
              <p className="text-muted-foreground">{p.desc}</p>
            </div>
          ))}
          <div className="border-l border-accent pl-2.5">
            <div className="flex items-baseline gap-2">
              <h3 className="pt-md font-semibold">Field journal</h3>
              <span className="pt-sm font-mono uppercase tracking-wider text-accent">selected posts</span>
            </div>
            <p className="text-muted-foreground">{POSTS.join(' · ')}</p>
          </div>
        </div>

        <H ch="03">Skills</H>
        <dl className="space-y-1">
          {SKILLS.map((s) => (
            <div key={s.group} className="grid grid-cols-6 gap-3">
              <dt className="pt-sm font-mono uppercase tracking-widest text-primary">{s.group}</dt>
              <dd className="col-span-5">{s.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

        <H ch="04">Education &amp; Community</H>
        <div className="grid grid-cols-2 gap-5">
          <p><span className="font-semibold">Iona College</span> <span className="text-muted-foreground">— B.S., Computer Science</span></p>
          <p><span className="font-semibold">Teaching Vets to Code</span> <span className="text-muted-foreground">— mentoring veterans moving into software engineering.</span></p>
        </div>
        <Foot n={2} />
      </article>
    </div>
  );
}
