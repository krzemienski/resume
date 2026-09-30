import { Button } from '@workspace/dead-channel-ds/components/ui/button';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-6 bg-background px-4 text-center text-foreground">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">No signal</p>
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="text-muted-foreground">This channel is dead. Nothing is broadcasting here.</p>
      <Button asChild data-testid="button-go-home"><Link href="/">Return to signal</Link></Button>
    </main>
  );
}
