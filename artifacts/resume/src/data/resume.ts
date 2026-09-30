import { Github, Globe, Linkedin, Mail, Phone, Radio } from 'lucide-react';

export const PDF = import.meta.env.BASE_URL + 'nick-krzemienski-resume.pdf';

export const CONTACTS = [
  { label: 'krzemienski@gmail.com', href: 'mailto:krzemienski@gmail.com', icon: Mail, id: 'email' },
  { label: '914-649-5534', href: 'tel:+19146495534', icon: Phone, id: 'phone' },
  { label: 'withagents.dev', href: 'https://withagents.dev', icon: Globe, id: 'withagents' },
  { label: 'github.com/krzemienski', href: 'https://github.com/krzemienski', icon: Github, id: 'github' },
  { label: 'linkedin.com/in/krzemienski', href: 'https://www.linkedin.com/in/krzemienski', icon: Linkedin, id: 'linkedin' },
  { label: 'awesome.video', href: 'https://awesome.video', icon: Radio, id: 'awesome-video' },
];

export const STATS = [
  { value: '23,479', label: 'real Claude Code sessions mined across 27 projects' },
  { value: '~500 hrs/day', label: 'VOD content through the pipeline I owned at fuboTV' },
  { value: '~70%', label: 'transcoding cost cut vs. on-demand cloud compute' },
  { value: '4,200+', label: 'readers of the WithAgents field journal' },
];

export type Role = { title: string; dates: string; bullets: string[] };
export type Job = { org: string; title?: string; dates: string; where: string; blurb?: string; bullets?: string[]; roles?: Role[] };

export const JOBS: Job[] = [
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

export const PROJECTS = [
  { name: 'Crucible', url: 'https://withagents.dev/crucible', display: 'withagents.dev/crucible', desc: 'Refusal-driven verification for Claude Code: 10 phases, 3 independent reviewers, 3 oracle auditors, no override flags.' },
  { name: 'Consensus', url: 'https://withagents.dev/consensus', display: 'withagents.dev/consensus', desc: 'Multi-agent agreement gate. Three independent agents must vote PASS; 2 of 3 is not enough.' },
  { name: 'Orbit', url: 'https://withagents.dev/orbit', display: 'withagents.dev/orbit', desc: 'Finds drift between what you asked for, what was planned, what was claimed, and what shipped.' },
  { name: 'Lynx', url: 'https://withagents.dev/lynx', display: 'withagents.dev/lynx', desc: 'Visual-audit suite for live web UIs.' },
  { name: 'awesome.video', url: 'https://awesome.video', display: 'awesome.video', desc: 'Curated index of streaming-video tooling and standards, widely used across the industry.' },
];

export const POSTS = [
  '3 Agents Found the Bug 1 Agent Missed',
  'I Banned Unit Tests and Shipped Faster',
  'Crucible: Refusal-Driven Verification for Claude Code',
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Agents', items: ['Claude Code', 'Claude Agent SDK', 'multi-agent orchestration', 'validation and evaluation harnesses', 'consensus gates', 'skill systems', 'spec-driven planning'] },
  { group: 'Languages', items: ['Python', 'TypeScript', 'Go', 'Swift', 'SQL'] },
  { group: 'Infrastructure', items: ['AWS (incl. Spot)', 'Kubernetes', 'Docker', 'serverless CDN edge', 'alerting and on-call pipelines'] },
  { group: 'Video', items: ['FFmpeg', 'HLS', 'DASH', 'DRM', 'H.264 / HEVC / VP9', 'JIT transcoding and packaging', 'AVFoundation', 'Roku', 'tvOS'] },
  { group: 'Web & mobile', items: ['Next.js', 'iOS / tvOS', 'WebRTC'] },
];

export const NAV = [
  { id: 'experience', label: 'Experience', ch: '01' },
  { id: 'open-source', label: 'Open Source', ch: '02' },
  { id: 'skills', label: 'Skills', ch: '03' },
  { id: 'education', label: 'Education', ch: '04' },
];

