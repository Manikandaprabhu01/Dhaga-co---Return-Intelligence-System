import { Dashboard } from '../api';
import {
  Gauge,
  TrendingDown,
  RotateCcw,
  Truck,
  ShieldCheck,
  Zap,
  ArrowRight,
  Package,
} from 'lucide-react';

export function OverallMetricsView({
  data,
  onNavigate,
}: {
  data: Dashboard;
  onNavigate: (page: 'metrics' | 'dashboard' | 'review' | 'agent' | 'upload') => void;
}) {
  const report = data.insights;

  // Funnel calculations based on 15,000 monthly units at 31% return rate
  const monthlyOrders = 15000;
  const macroReturnRate = 31;
  const otherPct = 44;
  const totalReturns = Math.round((monthlyOrders * macroReturnRate) / 100);
  const otherReturns = Math.round((totalReturns * otherPct) / 100);
  const doorstepSwaps = Math.round(otherReturns * 0.74);
  const netRTO = totalReturns - doorstepSwaps;
  const effectiveReturnRate = ((netRTO / monthlyOrders) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Executive Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #17242c 0%, #20333e 100%)',
          color: '#f6f1ea',
          borderRadius: '20px',
          padding: '24px 28px',
          border: '1px solid #2d424e',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pill ok" style={{ background: '#103926', color: '#6ee7b7', border: '1px solid #1f6443' }}>
                🟢 Executive Control Room
              </span>
              <span style={{ fontSize: '12px', color: '#c9bfb4' }}>Dhaga &amp; Co. &bull; Bengaluru D2C Hub</span>
            </div>
            <h2 style={{ margin: '8px 0 4px', fontFamily: 'Fraunces, serif', fontSize: '28px', color: '#fff' }}>
              Overall Brand Return Intelligence &amp; Autonomous Recovery
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#c9bfb4', maxWidth: '780px', lineHeight: 1.5 }}>
              Comprehensive performance across macro return rates, &ldquo;Other&rdquo; classification taxonomy, AI doorstep exchanges, and reverse logistics freight preservation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 14px' }}
            >
              <span>Command Center</span>
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('agent')}
              style={{
                background: '#243640',
                color: '#ffaa88',
                border: '1px solid #ff7755',
                borderRadius: '10px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Zap size={14} />
              <span>Autonomous Agent</span>
            </button>
          </div>
        </div>

        {/* 6 Key Macro Metrics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px',
            marginTop: '22px',
          }}
        >
          <div style={{ background: '#1b2933', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '11px', color: '#ffaa88', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Baseline Return</span>
            <div style={{ fontSize: '24px', fontFamily: 'Fraunces, serif', color: '#fff', marginTop: '2px' }}>31.0%</div>
            <span style={{ fontSize: '11px', color: '#a79c90' }}>COD apparel benchmark</span>
          </div>

          <div style={{ background: '#1b2933', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '11px', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Effective Net Return</span>
            <div style={{ fontSize: '24px', fontFamily: 'Fraunces, serif', color: '#4ade80', marginTop: '2px' }}>{effectiveReturnRate}%</div>
            <span style={{ fontSize: '11px', color: '#6ee7b7' }}>-9.5% via Doorstep Swap</span>
          </div>

          <div style={{ background: '#1b2933', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '11px', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>&ldquo;Other&rdquo; Inquiries</span>
            <div style={{ fontSize: '24px', fontFamily: 'Fraunces, serif', color: '#93c5fd', marginTop: '2px' }}>44%</div>
            <span style={{ fontSize: '11px', color: '#a79c90' }}>100% analyzed &amp; parsed</span>
          </div>

          <div style={{ background: '#1b2933', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '11px', color: '#fcd34d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Auto-Approved</span>
            <div style={{ fontSize: '24px', fontFamily: 'Fraunces, serif', color: '#fcd34d', marginTop: '2px' }}>{data.agents.review.auto_approved}</div>
            <span style={{ fontSize: '11px', color: '#a79c90' }}>{report.counted_pct}% of total comments</span>
          </div>

          <div style={{ background: '#1b2933', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '11px', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Needs Neha</span>
            <div style={{ fontSize: '24px', fontFamily: 'Fraunces, serif', color: '#f87171', marginTop: '2px' }}>{data.in_review}</div>
            <span style={{ fontSize: '11px', color: '#fca5a5' }}>Rows pending in Review</span>
          </div>

          <div style={{ background: '#1b2933', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WhatsApp SLA</span>
            <div style={{ fontSize: '24px', fontFamily: 'Fraunces, serif', color: '#38bdf8', marginTop: '2px' }}>11.2s</div>
            <span style={{ fontSize: '11px', color: '#bae6fd' }}>Target &lt; 15 seconds</span>
          </div>
        </div>
      </section>

      {/* Macro Funnel Architecture: Shipped -> Returned -> "Other" -> Doorstep Exchange -> Saved */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <p className="kicker" style={{ margin: 0 }}>End-to-End Funnel</p>
            <h3 style={{ margin: '2px 0 0', fontSize: '18px', fontFamily: 'Fraunces, serif' }}>
              Monthly Return Volume &amp; Autonomous Preservation Funnel
            </h3>
          </div>
          <span className="pill" style={{ background: '#e6f4ec', color: '#1d6a48' }}>
            Model: 15,000 Shipped Orders / Month
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          <div style={{ background: '#f8f5f0', borderRadius: '12px', padding: '14px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '12px' }}>
              <Package size={14} />
              <span>1. Total Shipped</span>
            </div>
            <strong style={{ display: 'block', fontSize: '22px', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
              15,000
            </strong>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted)' }}>D2C &amp; Marketplace orders</p>
          </div>

          <div style={{ background: '#fee2e2', borderRadius: '12px', padding: '14px', border: '1px solid #fecaca' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991b1b', fontSize: '12px' }}>
              <TrendingDown size={14} />
              <span>2. Initiated Returns</span>
            </div>
            <strong style={{ display: 'block', fontSize: '22px', fontFamily: 'Fraunces, serif', color: '#991b1b', marginTop: '4px' }}>
              {totalReturns.toLocaleString('en-IN')} (31%)
            </strong>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#7f1d1d' }}>Macro apparel return baseline</p>
          </div>

          <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '14px', border: '1px solid #fde68a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400e', fontSize: '12px' }}>
              <RotateCcw size={14} />
              <span>3. &ldquo;Other&rdquo; Inquiries</span>
            </div>
            <strong style={{ display: 'block', fontSize: '22px', fontFamily: 'Fraunces, serif', color: '#92400e', marginTop: '4px' }}>
              {otherReturns.toLocaleString('en-IN')} (44%)
            </strong>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#78350f' }}>Root-causes previously unparsed</p>
          </div>

          <div style={{ background: '#e0f2fe', borderRadius: '12px', padding: '14px', border: '1px solid #bae6fd' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0369a1', fontSize: '12px' }}>
              <Zap size={14} />
              <span>4. Doorstep Exchanges</span>
            </div>
            <strong style={{ display: 'block', fontSize: '22px', fontFamily: 'Fraunces, serif', color: '#0369a1', marginTop: '4px' }}>
              {doorstepSwaps.toLocaleString('en-IN')} (74%)
            </strong>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#0c4a6e' }}>Intercepted in &lt;15s via WhatsApp</p>
          </div>

          <div style={{ background: '#dcfce7', borderRadius: '12px', padding: '14px', border: '1px solid #bbf7d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontSize: '12px' }}>
              <ShieldCheck size={14} />
              <span>5. Reverse Freight Saved</span>
            </div>
            <strong style={{ display: 'block', fontSize: '22px', fontFamily: 'Fraunces, serif', color: '#15803d', marginTop: '4px' }}>
              ₹{((doorstepSwaps * 140) / 100000).toFixed(2)} Lakhs
            </strong>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#14532d' }}>+ ₹18.1L Gross GMV preserved</p>
          </div>
        </div>
      </section>

      {/* Two Column Grid: Category Breakdown vs Regional Hub Status */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '16px' }}>
        {/* Left: Overall Return Taxonomy Share */}
        <article className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <p className="kicker" style={{ margin: 0 }}>Root Cause Taxonomy</p>
              <h3 style={{ margin: '2px 0 0', fontSize: '18px', fontFamily: 'Fraunces, serif' }}>
                Where Does the &ldquo;Other&rdquo; Bucket Go?
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('metrics')}
              style={{ fontSize: '12px', background: 'transparent', border: '1px solid var(--line)', padding: '5px 10px', borderRadius: '8px' }}
            >
              Financial Modeling &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            {report.areas.filter((a) => a.count > 0).map((area) => (
              <div key={area.title}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{area.title}</span>
                  <span>
                    <strong>{area.count} comments</strong> &bull; {area.share_pct}%
                  </span>
                </div>
                <div className="track">
                  <div className="fill" style={{ width: `${area.share_pct}%` }} />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                  {area.actionable ? `⚡ ${area.note}` : 'ℹ Non-catalogue factor'}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Right: Bengaluru Micro-Hub & Logistics Routing */}
        <article className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <p className="kicker" style={{ margin: 0 }}>Hyperlocal Routing</p>
              <h3 style={{ margin: '2px 0 0', fontSize: '18px', fontFamily: 'Fraunces, serif' }}>
                Micro-Hub Network Status
              </h3>
            </div>
            <span className="pill ok">5 Hubs Connected</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {[
              { name: 'Koramangala Hub', dist: '3.2 km avg', stock: '24 units', speed: '9.4s', status: 'Online' },
              { name: 'HSR Layout Hub', dist: '2.1 km avg', stock: '18 units', speed: '11.1s', status: 'Online' },
              { name: 'Indiranagar Hub', dist: '1.5 km avg', stock: '31 units', speed: '8.8s', status: 'Online' },
              { name: 'Whitefield Hub', dist: '4.8 km avg', stock: '15 units', speed: '12.4s', status: 'Online' },
              { name: 'Peenya Hub', dist: '4.1 km avg', stock: '12 units', speed: '13.0s', status: 'Online' },
            ].map((hub) => (
              <div
                key={hub.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: '#fcf8f3',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              >
                <div>
                  <strong>{hub.name}</strong>
                  <div style={{ color: 'var(--muted)', fontSize: '11px' }}>Radius: {hub.dist} &bull; Ready stock: {hub.stock}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#059669', fontWeight: 600 }}>{hub.status}</span>
                  <div style={{ color: 'var(--muted)', fontSize: '10px' }}>Avg Intercept: {hub.speed}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: 'var(--muted)' }}>Average Doorstep Exchange SLA:</span>
            <strong style={{ color: 'var(--ok)' }}>&lt; 24 Hours vs 6-8 days RTO</strong>
          </div>
        </article>
      </section>
    </div>
  );
}
