import type { ReactNode } from 'react';
import { Button } from '@workspace/dead-channel-ds/components/ui/button';
import { Badge } from '@workspace/dead-channel-ds/components/ui/badge';
import { Separator } from '@workspace/dead-channel-ds/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/dead-channel-ds/components/ui/card';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { VideoBackdrop } from '@/components/video-backdrop';
import { HeroScene } from '@/components/hero-scene';
import { Drift, Reveal, ScrollProgressBar, ScrollProgressReadout } from '@/components/motion-bits';
import { CONTACTS, JOBS, NAV, PDF, POSTS, PROJECTS, SKILLS, STATS } from '@/data/resume';

function SectionHeader({ ch, id, title }: { ch: string; id: string; title: string }) {
  return (
    <div className="relative mb-8 flex items-end gap-4">
      <Drift rate={40} className="deco-layer absolute -top-10 right-0 hidden font-mono text-xs uppercase tracking-widest text-muted-foreground opacity-50 md:block">
        sig.{id} · ch{ch} · lock<span className="text-chart-3">✓</span>
      </Drift>
      <span className="font-mono text-xs uppercase tracking-widest text-accent">CH {ch}</span>
      <h2 id={`${id}-heading`} className="text-2xl font-semibold uppercase tracking-wider text-foreground md:text-3xl">{title}</h2>
      <div aria-hidden className="mb-2 h-px flex-1 bg-border" />
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((b, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground md:text-base">
          <span aria-hidden className="mt-1 font-mono text-xs text-chart-3">&gt;</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function ExtLink({ href, children, testId }: { href: string; children: ReactNode; testId: string }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      data-testid={testId}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="home-root relative isolate min-h-[100dvh] overflow-x-clip font-sans text-foreground">
      <VideoBackdrop />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>

      <header className="no-print sticky top-0 z-40 border-b border-border bg-background">
        <ScrollProgressBar />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a href="#top" data-testid="link-home" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <span aria-hidden className="signal-blink inline-block h-2 w-2 bg-accent" />
            <span className="text-foreground">NK</span>
            <span className="hidden text-muted-foreground sm:inline">// signal live</span>
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} data-testid={`link-nav-${n.id}`} className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <span className="text-accent">{n.ch}</span> {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
          <ScrollProgressReadout />
          <Button asChild size="sm" data-testid="button-download-header">
            <a href={PDF} download><Download /> PDF</a>
          </Button>
          </div>
        </div>
      </header>

      <main id="main" className="print-plain">
        {/* HERO */}
        <section id="top" aria-labelledby="name-heading" className="relative overflow-hidden border-b border-border">
          <HeroScene />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-8 md:pt-24 md:pb-36">
            <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-chart-4">[ REC ]</span>
              <span>New York, NY</span>
              <span aria-hidden>/</span>
              <span>Agentic Engineer · Principal, WithAgents</span>
            </div>
            <h1 id="name-heading" className="text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl lg:text-8xl">
              <span className="block">Nick</span>
              <span className="glitch block text-primary" data-text="Krzemienski">Krzemienski</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-foreground md:text-xl">
              I build the harnesses that make AI coding agents trustworthy in real codebases: validation gates, multi-agent consensus, and planning loops that <span className="text-primary">refuse to ship without evidence</span>.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Before agents, I spent seven years at fuboTV building streaming-video infrastructure at production scale — encoding pipelines, just-in-time transcoding, multi-view for live sports — and before that I founded two software studios. I've led teams of ten and still write the code. Former USMC Infantry Squad Leader (Sergeant).
            </p>
            <div className="no-print mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" data-testid="button-download-resume">
                <a href={PDF} download><Download /> Download resume PDF</a>
              </Button>
              <Button asChild size="lg" variant="outline" data-testid="button-email">
                <a href="mailto:krzemienski@gmail.com"><Mail /> Open a channel</a>
              </Button>
            </div>
            <ul className="mt-10 grid gap-x-8 gap-y-3 font-mono text-sm sm:grid-cols-2 lg:grid-cols-3">
              {CONTACTS.map((c) => (
                <li key={c.id} className="flex items-center gap-2">
                  <c.icon aria-hidden className="h-4 w-4 text-muted-foreground" />
                  <ExtLink href={c.href} testId={`link-contact-${c.id}`}>{c.label}</ExtLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* STATS */}
        <section aria-label="Key numbers" className="border-b border-border bg-background/80">
          <dl className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={i} className="border-border px-4 py-8 md:px-8 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 border-b lg:border-b-0" data-testid={`stat-${i}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className={`block font-mono text-3xl font-bold md:text-4xl ${i % 2 ? 'text-chart-3' : 'text-primary'}`}>{s.value}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-16 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <SectionHeader ch="01" id="experience" title="Experience" />
            <ol className="relative space-y-12 border-l border-border pl-6 md:pl-10">
              {JOBS.map((j, idx) => (
                <li key={j.org} className="relative" data-testid={`job-${idx}`}>
                  <Reveal>
                  <span aria-hidden className={`absolute -left-7 top-2 h-2 w-2 md:-left-11 ${idx === 0 ? 'bg-accent' : idx === 2 ? 'bg-chart-3' : 'bg-primary'}`} />
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground md:pt-1">
                      <div className="text-foreground">{j.dates}</div>
                      <div className="mt-1">{j.where}</div>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-semibold md:text-2xl">
                        {j.org}
                        {j.title && <span className="text-muted-foreground"> — </span>}
                        {j.title && <span className="text-primary">{j.title}</span>}
                      </h3>
                      {idx === 0 && <Badge variant="outline" className="mt-2 font-mono text-accent">Current</Badge>}
                      {j.blurb && <p className="mt-3 text-muted-foreground">{j.blurb}</p>}
                      {j.bullets && <div className="mt-4"><Bullets items={j.bullets} /></div>}
                      {j.roles && (
                        <div className="mt-6 space-y-8">
                          {j.roles.map((r) => (
                            <div key={r.title} className="border-l border-primary pl-4">
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <h4 className="text-lg font-medium">{r.title}</h4>
                                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{r.dates}</span>
                              </div>
                              <div className="mt-3"><Bullets items={r.bullets} /></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* OPEN SOURCE */}
        <section id="open-source" aria-labelledby="open-source-heading" className="scroll-mt-16 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <SectionHeader ch="02" id="open-source" title="Open Source & Writing" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p, pi) => (
                <Reveal key={p.name} delay={(pi % 3) * 0.08}>
                <a href={p.url} target="_blank" rel="noreferrer" data-testid={`link-project-${p.name.toLowerCase().replace(/\W/g, '-')}`} className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <Card className="h-full transition-colors group-hover:border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-xl">
                        {p.name}
                        <ArrowUpRight aria-hidden className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                      </CardTitle>
                      <span className="font-mono text-xs text-primary">{p.display}</span>
                    </CardHeader>
                    <CardContent className="text-sm leading-relaxed text-muted-foreground">{p.desc}</CardContent>
                  </Card>
                </a>
                </Reveal>
              ))}
              <Reveal delay={0.16}><Card className="h-full border-accent">
                <CardHeader>
                  <CardTitle className="text-xl">Field journal</CardTitle>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">Selected posts</span>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {POSTS.map((t) => (
                      <li key={t} className="flex gap-2"><span aria-hidden className="font-mono text-accent">/</span>{t}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card></Reveal>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-16 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <SectionHeader ch="03" id="skills" title="Skills" />
            <dl className="divide-y divide-border border-y border-border">
              {SKILLS.map((s, si) => (
                <Reveal key={s.group} delay={si * 0.05} className="grid gap-3 py-5 md:grid-cols-4">
                  <dt className="font-mono text-xs uppercase tracking-widest text-primary md:pt-1">{s.group}</dt>
                  <dd className="flex flex-wrap gap-2 md:col-span-3">
                    {s.items.map((it) => <Badge key={it} variant="secondary" className="font-mono">{it}</Badge>)}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" aria-labelledby="education-heading" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <SectionHeader ch="04" id="education" title="Education & Community" />
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader><CardTitle>Iona College</CardTitle></CardHeader>
                <CardContent className="text-muted-foreground">B.S., Computer Science</CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Teaching Vets to Code</CardTitle></CardHeader>
                <CardContent className="text-muted-foreground">Mentoring veterans moving into software engineering.</CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="no-print border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-chart-3">End of transmission</p>
            <p className="mt-2 text-2xl font-semibold">Ship something real together.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild data-testid="button-footer-email"><a href="mailto:krzemienski@gmail.com"><Mail /> Email</a></Button>
            <Button asChild variant="outline" data-testid="button-footer-download"><a href={PDF} download><Download /> Resume PDF</a></Button>
          </div>
        </div>
        <Separator />
        <p className="mx-auto max-w-6xl px-4 py-4 font-mono text-xs text-muted-foreground md:px-8">Nick Krzemienski · New York, NY</p>
      </footer>
    </div>
  );
}
