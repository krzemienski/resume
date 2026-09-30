import type { ReactNode } from 'react';
import { Button } from '@workspace/dead-channel-ds/components/ui/button';
import { Badge } from '@workspace/dead-channel-ds/components/ui/badge';
import { Separator } from '@workspace/dead-channel-ds/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/dead-channel-ds/components/ui/card';
import { ArrowUpRight, Download, Github, Globe, Linkedin, Mail, Phone, Radio } from 'lucide-react';

const PDF = import.meta.env.BASE_URL + 'nick-krzemienski-resume.pdf';

const CONTACTS = [
  { label: 'krzemienski@gmail.com', href: 'mailto:krzemienski@gmail.com', icon: Mail, id: 'email' },
  { label: '914-649-5534', href: 'tel:+19146495534', icon: Phone, id: 'phone' },
  { label: 'withagents.dev', href: 'https://withagents.dev', icon: Globe, id: 'withagents' },
  { label: 'github.com/krzemienski', href: 'https://github.com/krzemienski', icon: Github, id: 'github' },
  { label: 'linkedin.com/in/krzemienski', href: 'https://www.linkedin.com/in/krzemienski', icon: Linkedin, id: 'linkedin' },
  { label: 'awesome.video', href: 'https://awesome.video', icon: Radio, id: 'awesome-video' },
];

const STATS = [
  { value: '23,479', label: 'real Claude Code sessions mined across 27 projects' },
  { value: '~500 hrs/day', label: 'VOD content through the pipeline I owned at fuboTV' },
  { value: '~70%', label: 'transcoding cost cut vs. on-demand cloud compute' },
  { value: '4,200+', label: 'readers of the WithAgents field journal' },
];

type Role = { title: string; dates: string; bullets: string[] };
type Job = { org: string; title?: string; dates: string; where: string; blurb?: string; bullets?: string[]; roles?: Role[] };

const JOBS: Job[] = [
  {
    org: 'WithAgents', title: 'Principal', dates: 'May 2026 – Present', where: 'New York',
    blurb: 'A product practice and field journal on applied agent design, built on Claude Code and the Claude Agent SDK.',
    bullets: [
      'Ship open-source verification tooling for coding agents: Crucible (10-phase refusal-driven verification, 3 independent reviewers + 3 oracle auditors, no override), Consensus (3 agents must vote PASS unanimously), Orbit (detects drift between what was asked, planned, claimed, and shipped), and Lynx (visual audits of live web UIs).',
      'Take contract engagements with enterprise and startup teams that need agent-written code to go from demo to production.',
      'Write a daily field journal (since May 2026): 43 lessons drawn from 23,479 Claude Code sessions, each a real codebase, a real failure mode, and the harness that fixed it.',
    ],
  },
  {
    org: 'Independent', title: 'Agentic Engineering R&D', dates: '2024 – 2026', where: 'New York',
    bullets: [
      'Left fuboTV to spend two years building with coding agents full-time, inside real codebases across Python, TypeScript, Next.js, Swift/iOS and Go.',
      'Built the patterns that became WithAgents: harnesses that reject mocks, test-file theater and "it compiled" claims in favor of validation against the running system; consensus gates that need ≥2 independent PASS verdicts; spec-driven planning loops; and skill systems that encode senior review judgment as reusable agent behavior.',
      'Built multi-agent orchestration with fan-out/fan-in, bounded concurrency, and stateful pipelines that resume after failure.',
    ],
  },
  {
    org: 'fuboTV', dates: 'May 2017 – May 2024', where: 'New York',
    roles: [
      { title: 'Engineering Lead, Video Innovations', dates: 'Mar 2022 – May 2024', bullets: [
        'Led server-side multi-view: several live feeds composited into a single player surface for live sports.',
        'Built just-in-time transcoding and HLS packaging for HEVC sources on Kubernetes (autoscaling, stateful sets, persistent volumes), which shrank storage and sped up catalog turnover at the same picture quality.',
      ] },
      { title: 'Engineering Lead, VOD Encoding & Operations', dates: 'Nov 2018 – Mar 2022', bullets: [
        'Owned the VOD pipeline end to end (~500 hours of content a day): ingest, bitrate-ladder transcoding, and HLS + DASH packaging with DRM.',
        'Cut transcoding and packaging cost by ~70% against on-demand compute by moving the work to AWS Spot Instances and containers.',
        'Shipped multi-codec delivery (H.264, HEVC, VP9, including 4K), with a serverless CDN edge that picks codecs by device capability, so new codecs could roll out safely.',
        'Built live-to-VOD generation from linear streams, CableLabs metadata validation, and CEA-608/708 caption sidecars, with alerting on every pipeline failure point.',
      ] },
      { title: 'Engineering Manager, Roku & Apple TV', dates: 'Feb 2018 – Nov 2018', bullets: [
        'Hired and led 10 engineers while still contributing code. Owned both platform roadmaps and the Apple and Roku partner relationships.',
        'Built a device-farm test harness and Jira workflow automation, and helped deliver the first 4K live OTT feed during World Cup 2018.',
      ] },
      { title: 'Software Engineer, iOS', dates: 'May 2017 – Feb 2018', bullets: [
        'Rewrote the Swift player framework on AVFoundation, cutting third-party SDK dependencies, and built in-app billing for iTunes and Roku subscriptions.',
      ] },
    ],
  },
  {
    org: 'Koda Labs', title: 'Founder & Principal Developer', dates: 'Oct 2013 – May 2017', where: 'New York',
    bullets: ['Ran a software studio: led 3 developers plus contractors through 15+ client projects. Built AWS-backed APIs and WebRTC video/text chat, and shipped 4 Unity games with over 1M users.'],
  },
  {
    org: 'Majestyk Apps', title: 'Co-Founder & Managing Director', dates: 'Oct 2011 – Sep 2013', where: 'New York',
    bullets: ['Led 4 developers and 2 designers across 20+ projects for clients including Disney. Shipped an app-connected plush toy sold at Toys"R"Us and managed its factory production in China. Built a mobile POS on NetSuite.'],
  },
  {
    org: 'Shodogg', title: 'Mobile Developer', dates: 'Dec 2011 – Sep 2012', where: 'New York',
    bullets: ['Built mobile-to-screen media delivery using HLS and byte-level H.264, and shipped a reusable iOS framework for other developers.'],
  },
  {
    org: 'U.S. Marine Corps Reserve', title: 'Infantry Squad Leader, Sergeant', dates: 'Dec 2008 – Jan 2015', where: '2/25 Weapons Co.',
    bullets: ['Responsible for the safety, training and performance of the Marines in my squad, and for coordinating weapons employment on missions and patrols. Promoted to Sergeant in under four years.'],
  },
];

const PROJECTS = [
  { name: 'Crucible', url: 'https://withagents.dev/crucible', display: 'withagents.dev/crucible', desc: 'Refusal-driven verification for Claude Code: 10 phases, 3 independent reviewers, 3 oracle auditors, no override flags.' },
  { name: 'Consensus', url: 'https://withagents.dev/consensus', display: 'withagents.dev/consensus', desc: 'Multi-agent agreement gate. Three independent agents must vote PASS; 2 of 3 is not enough.' },
  { name: 'Orbit', url: 'https://withagents.dev/orbit', display: 'withagents.dev/orbit', desc: 'Finds drift between what you asked for, what was planned, what was claimed, and what shipped.' },
  { name: 'Lynx', url: 'https://withagents.dev/lynx', display: 'withagents.dev/lynx', desc: 'Visual-audit suite for live web UIs.' },
  { name: 'awesome.video', url: 'https://awesome.video', display: 'awesome.video', desc: 'Curated index of streaming-video tooling and standards, widely used across the industry.' },
];

const POSTS = [
  '3 Agents Found the Bug 1 Agent Missed',
  'I Banned Unit Tests and Shipped Faster',
  'Crucible: Refusal-Driven Verification for Claude Code',
];

const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Agents', items: ['Claude Code', 'Claude Agent SDK', 'multi-agent orchestration', 'validation and evaluation harnesses', 'consensus gates', 'skill systems', 'spec-driven planning'] },
  { group: 'Languages', items: ['Python', 'TypeScript', 'Go', 'Swift', 'SQL'] },
  { group: 'Infrastructure', items: ['AWS (incl. Spot)', 'Kubernetes', 'Docker', 'serverless CDN edge', 'alerting and on-call pipelines'] },
  { group: 'Video', items: ['FFmpeg', 'HLS', 'DASH', 'DRM', 'H.264 / HEVC / VP9', 'JIT transcoding and packaging', 'AVFoundation', 'Roku', 'tvOS'] },
  { group: 'Web & mobile', items: ['Next.js', 'iOS / tvOS', 'WebRTC'] },
];

const NAV = [
  { id: 'experience', label: 'Experience', ch: '01' },
  { id: 'open-source', label: 'Open Source', ch: '02' },
  { id: 'skills', label: 'Skills', ch: '03' },
  { id: 'education', label: 'Education', ch: '04' },
];

function SectionHeader({ ch, id, title }: { ch: string; id: string; title: string }) {
  return (
    <div className="mb-8 flex items-end gap-4">
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
          <span aria-hidden className="mt-1 font-mono text-xs text-primary">&gt;</span>
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
    <div className="relative min-h-[100dvh] bg-background font-sans text-foreground">
      <div aria-hidden className="crt-scanlines fixed inset-0 z-50" />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>

      <header className="no-print sticky top-0 z-40 border-b border-border bg-background">
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
          <Button asChild size="sm" data-testid="button-download-header">
            <a href={PDF} download><Download /> PDF</a>
          </Button>
        </div>
      </header>

      <main id="main" className="print-plain">
        {/* HERO */}
        <section id="top" aria-labelledby="name-heading" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
            <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-accent">[ REC ]</span>
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
        <section aria-label="Key numbers" className="border-b border-border">
          <dl className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={i} className="border-border px-4 py-8 md:px-8 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 border-b lg:border-b-0" data-testid={`stat-${i}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-mono text-3xl font-bold text-primary md:text-4xl">{s.value}</span>
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
                  <span aria-hidden className={`absolute -left-7 top-2 h-2 w-2 md:-left-11 ${idx === 0 ? 'bg-accent' : 'bg-primary'}`} />
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
              {PROJECTS.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer" data-testid={`link-project-${p.name.toLowerCase().replace(/\W/g, '-')}`} className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
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
              ))}
              <Card className="h-full border-accent">
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
              </Card>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-16 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <SectionHeader ch="03" id="skills" title="Skills" />
            <dl className="divide-y divide-border border-y border-border">
              {SKILLS.map((s) => (
                <div key={s.group} className="grid gap-3 py-5 md:grid-cols-4">
                  <dt className="font-mono text-xs uppercase tracking-widest text-primary md:pt-1">{s.group}</dt>
                  <dd className="flex flex-wrap gap-2 md:col-span-3">
                    {s.items.map((it) => <Badge key={it} variant="secondary" className="font-mono">{it}</Badge>)}
                  </dd>
                </div>
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
            <p className="font-mono text-xs uppercase tracking-widest text-accent">End of transmission</p>
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
