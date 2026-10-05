import { Activity, AlertTriangle, BookHeart, BrainCircuit, CalendarClock, MessageSquareText, Sparkles } from "lucide-react";
import { AppShell, MetricCard } from "@/components/site-shell";

const moodData = [
  { day: "Mon", value: 6 },
  { day: "Tue", value: 7 },
  { day: "Wed", value: 8 },
  { day: "Thu", value: 6 },
  { day: "Fri", value: 9 },
  { day: "Sat", value: 7 },
  { day: "Sun", value: 8 },
];

function MoodChart() {
  const width = 620;
  const height = 220;
  const padding = 26;
  const max = 10;
  const min = 0;

  const points = moodData.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / (moodData.length - 1);
    const y = height - padding - ((point.value - min) / (max - min)) * (height - padding * 2);
    return `${x},${y}`;
  });

  const gridLines = Array.from({ length: 5 }, (_, index) => {
    const y = padding + (index * (height - padding * 2)) / 4;
    return { y };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full" role="img" aria-label="Mood chart over the last seven days">
      {gridLines.map((line) => (
        <line key={line.y} x1={padding} x2={width - padding} y1={line.y} y2={line.y} stroke="#e5e7eb" strokeDasharray="4 4" />
      ))}

      <polyline
        fill="none"
        stroke="#6547a6"
        strokeWidth="3"
        points={points.join(" ")}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {moodData.map((point, index) => {
        const x = padding + (index * (width - padding * 2)) / (moodData.length - 1);
        const y = height - padding - ((point.value - min) / (max - min)) * (height - padding * 2);
        return (
          <g key={point.day}>
            <circle cx={x} cy={y} r="5" fill="#6547a6" />
            <text x={x} y={height - 8} textAnchor="middle" fontSize="11" fill="#6b7280">
              {point.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <AppShell role="Student">
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Current mood" value="8/10" helper="Feeling steady and supported" />
          <MetricCard label="Journal entries" value="14" helper="This month" />
          <MetricCard label="Upcoming session" value="Thu 4:00 PM" helper="Expert check-in" />
          <MetricCard label="Support score" value="87%" helper="Consistency this week" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-muted)]">Wellbeing overview</p>
                <h2 className="text-2xl font-semibold text-[var(--color-text)]">Mood trend</h2>
              </div>
              <div className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-primary)]">Last 7 days</div>
            </div>
            <MoodChart />
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[var(--color-primary)]" />
                <h3 className="text-lg font-semibold">Quick actions</h3>
              </div>
              <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
                <div className="flex items-center justify-between rounded-2xl bg-[var(--color-surface)] p-3"><span>Check in</span><Activity className="h-4 w-4" /></div>
                <div className="flex items-center justify-between rounded-2xl bg-[var(--color-surface)] p-3"><span>Journal</span><BookHeart className="h-4 w-4" /></div>
                <div className="flex items-center justify-between rounded-2xl bg-[var(--color-surface)] p-3"><span>Breathing</span><BrainCircuit className="h-4 w-4" /></div>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-[var(--color-primary)]" />
                <h3 className="text-lg font-semibold">Safety</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">If you need immediate crisis support, use the safety resources in one step.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarClock className="h-5 w-5 text-[var(--color-primary)]" />
              <h3 className="text-lg font-semibold">Upcoming</h3>
            </div>
            <p className="mt-4 text-[var(--color-muted)]">No upcoming appointments. Book a consultation or start a peer support conversation.</p>
          </div>

          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MessageSquareText className="h-5 w-5 text-[var(--color-primary)]" />
              <h3 className="text-lg font-semibold">AI assistant</h3>
            </div>
            <p className="mt-4 text-[var(--color-muted)]">A supportive prompt can help you reflect on your day and suggest gentle next steps.</p>
          </div>

          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BookHeart className="h-5 w-5 text-[var(--color-primary)]" />
              <h3 className="text-lg font-semibold">Recommended resources</h3>
            </div>
            <p className="mt-4 text-[var(--color-muted)]">Guided breathing and a mood journaling prompt are good fits for this week.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
