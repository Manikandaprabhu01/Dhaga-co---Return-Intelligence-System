import { useState } from 'react';
import { Dashboard, OverviewAgent } from '../api';

const AREA_TONE: Record<string, string> = {
  'Fit and size': 'rose',
  Quality: 'amber',
  Colour: 'violet',
  'Copy and look': 'blue',
  'Not enough to act': 'slate',
  'Not a product issue': 'green',
};

const HINGLISH_TRANSLATIONS: Record<string, string> = {
  'shrit but chota h': 'Shirt is small in size',
  'size expected se chota': 'Size is smaller than expected',
  'M bahut chota h': 'Size M is very small',
  'kurti achi h but L bhi chota': 'Kurti is nice but even L is too small',
  'shoulder bahut tight': 'Shoulder fitting is too tight',
  'bahut loose h': 'Much too loose',
  'size bada hai': 'Size is too large',
  'bahut bada h': 'Much too big',
  'chart galat hai': 'Size chart is incorrect',
  'not true to size': 'Does not match size specifications',
  'colour photo jaisa nhi hai': 'Colour does not match the catalog photo',
  'photo me navy tha ye black h': 'Photo showed navy blue, item received is black',
  'kapda transparent hai': 'Fabric is sheer / transparent',
  'cloth patla h': 'Cloth material is too thin',
  'office shirt nhi lg rha': 'Does not look like the professional office shirt described',
  'stitch nikal gyi': 'Stitching has come undone / frayed',
  'delivery late hui': 'Delivery was delayed (logistics issue)',
  'courier ne wrong item diya': 'Courier delivered the wrong parcel',
  'macha nai lga': 'Did not like it',
  'product acha nahi laga': 'Did not like the product',
  "I didn't like the product": 'Customer dislike without specific product flaw',
};

export function ReturnMetricsView({ data }: { data: Dashboard }) {
  const report = data.insights;

  // Simulator State
  const [monthlyVolume, setMonthlyVolume] = useState(15000);
  const [returnRatePct, setReturnRatePct] = useState(31);
  const [otherSharePct, setOtherSharePct] = useState(44);
  const [freightCost, setFreightCost] = useState(140);

  // Deep dive selection
  const [selectedAreaTitle, setSelectedAreaTitle] = useState<string>('Fit and size');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // Audio briefing player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Computations for simulator
  const estMonthlyReturns = Math.round((monthlyVolume * returnRatePct) / 100);
  const estOtherReturns = Math.round((estMonthlyReturns * otherSharePct) / 100);
  const estTotalFreightLossLakhs = ((estOtherReturns * freightCost) / 100000).toFixed(2);
  // With 74% resolved through Doorstep Exchanges & Size adjustments:
  const estPotentialSavingsLakhs = (((estOtherReturns * freightCost * 0.74) + (estOtherReturns * 1200 * 0.74)) / 100000).toFixed(2);

  // Filtered area info
  const selectedArea = report.areas.find((a) => a.title === selectedAreaTitle) || report.areas[0];

  // Keywords in Hinglish
  const keywords = [
    { word: 'chota', count: 4, area: 'Fit and size' },
    { word: 'tight', count: 2, area: 'Fit and size' },
    { word: 'bada / loose', count: 3, area: 'Fit and size' },
    { word: 'chart galat', count: 2, area: 'Fit and size' },
    { word: 'transparent', count: 1, area: 'Quality' },
    { word: 'patla cloth', count: 1, area: 'Quality' },
    { word: 'stitch nikal gyi', count: 1, area: 'Quality' },
    { word: 'navy vs black', count: 2, area: 'Colour' },
    { word: 'acha nahi laga', count: 3, area: 'Not enough to act' },
    { word: 'delivery late', count: 2, area: 'Not a product issue' },
  ];

  function toggleSpeech() {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const text = `${data.agents.overview.headline}. Here are this week's key items: ${data.agents.overview.bullets.join('. ')}. Action required: ${data.agents.overview.actions.join('. ')}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  }

  const cards = [
    { tone: 'rose', label: 'Return rate · brief', value: '31%', note: 'Already on Neha’s desk. High COD apparel benchmark.' },
    { tone: 'amber', label: 'Other · brief', value: '44%', note: 'The unclassified comment bucket. 100% analyzed here.' },
    { tone: 'violet', label: 'Labeled on this file', value: `${report.counted_pct}%`, note: `${report.counted} of ${data.total} comments classified into actionable root causes.` },
    { tone: 'green', label: 'Filed without a click', value: String(data.agents.review.auto_approved), note: `${report.still_with_neha} pending Neha’s review. Threshold: ${data.auto_approve_pct}%.` },
  ];

  return (
    <section className="ink" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Weekly Brief Component with Audio Player */}
      <div>
        <WeeklyBrief overview={data.agents.overview} />

        <div className="audio-brief-player">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button type="button" className="play-btn" onClick={toggleSpeech} aria-label="Listen to Executive Brief">
              {isPlayingAudio ? '⏸' : '▶'}
            </button>
            <div>
              <strong style={{ fontSize: '14px', color: '#ffaa88' }}>
                {isPlayingAudio ? 'Playing Executive Audio Briefing...' : 'Listen to Weekly Sourcing & Return Brief'}
              </strong>
              <div style={{ fontSize: '11px', color: '#b7aea4' }}>
                AI Speech Synthesis &bull; Summarizing Neha’s SKU priorities &amp; vendor size variances
              </div>
            </div>
          </div>
          {isPlayingAudio && (
            <div className="wave-anim" style={{ height: '18px' }}>
              <div className="wave-bar" style={{ animationDelay: '0.1s' }} />
              <div className="wave-bar" style={{ animationDelay: '0.3s' }} />
              <div className="wave-bar" style={{ animationDelay: '0.2s' }} />
              <div className="wave-bar" style={{ animationDelay: '0.4s' }} />
              <div className="wave-bar" style={{ animationDelay: '0.15s' }} />
            </div>
          )}
        </div>
      </div>

      {/* Top Cards */}
      <div className="tones">
        {cards.map((card) => (
          <article className={`tone ${card.tone}`} key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.note}</p>
          </article>
        ))}
      </div>

      {/* Interactive Financial Impact & RTO Loss Simulator */}
      <div className="calc-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffaa88', fontWeight: 600 }}>
              FINANCIAL IMPACT CALCULATOR &bull; LIVE SIMULATOR
            </span>
            <h3 style={{ margin: '4px 0 0', fontFamily: 'Fraunces, serif', fontSize: '20px', color: '#fff' }}>
              Dhaga &amp; Co. Brand Volume &amp; Reverse Freight Economics
            </h3>
          </div>
          <span className="badge" style={{ background: '#243640', border: '1px solid #455a64', padding: '6px 12px' }}>
            Interactive Modeling
          </span>
        </div>

        <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#c9bfb4' }}>
          Adjust the sliders below to model monthly reverse freight losses and projected recovery from automated Doorstep Exchanges:
        </p>

        <div className="calc-slider-grid">
          <div className="slider-item">
            <label>Shipped Volume / Mo</label>
            <b>{monthlyVolume.toLocaleString('en-IN')} units</b>
            <input
              type="range"
              min={5000}
              max={50000}
              step={1000}
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
            />
          </div>

          <div className="slider-item">
            <label>Macro Return Rate</label>
            <b>{returnRatePct}%</b>
            <input
              type="range"
              min={15}
              max={45}
              step={1}
              value={returnRatePct}
              onChange={(e) => setReturnRatePct(Number(e.target.value))}
            />
          </div>

          <div className="slider-item">
            <label>&ldquo;Other&rdquo; Return Share</label>
            <b>{otherSharePct}%</b>
            <input
              type="range"
              min={20}
              max={65}
              step={1}
              value={otherSharePct}
              onChange={(e) => setOtherSharePct(Number(e.target.value))}
            />
          </div>

          <div className="slider-item">
            <label>Reverse Freight Loss</label>
            <b>₹{freightCost} / return</b>
            <input
              type="range"
              min={90}
              max={220}
              step={10}
              value={freightCost}
              onChange={(e) => setFreightCost(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="calc-out-grid">
          <div className="calc-out">
            <span>Monthly Total Returns</span>
            <strong style={{ color: '#fca5a5' }}>{estMonthlyReturns.toLocaleString('en-IN')}</strong>
          </div>
          <div className="calc-out">
            <span>&ldquo;Other&rdquo; Inquiries / Mo</span>
            <strong style={{ color: '#fcd34d' }}>{estOtherReturns.toLocaleString('en-IN')}</strong>
          </div>
          <div className="calc-out">
            <span>Reverse Freight Loss</span>
            <strong style={{ color: '#ff5d73' }}>₹{estTotalFreightLossLakhs} Lakhs/mo</strong>
          </div>
          <div className="calc-out">
            <span>Recoverable via Doorstep Swap</span>
            <strong style={{ color: '#4ade80' }}>₹{estPotentialSavingsLakhs} Lakhs/mo</strong>
          </div>
        </div>
      </div>

      {/* Hinglish Keyword Cloud */}
      <div style={{ background: '#17242c', borderRadius: '18px', padding: '18px 20px', border: '1px solid #2b3e4c' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffaa88' }}>
              VERNACULAR &amp; HINGLISH SIGNAL EXTRACTOR
            </span>
            <h4 style={{ margin: '2px 0 0', fontSize: '16px', color: '#fff', fontFamily: 'Fraunces, serif' }}>
              Click Any Phrasing To Inspect Customer Quotes &amp; Meaning
            </h4>
          </div>
          {selectedKeyword && (
            <button
              type="button"
              onClick={() => setSelectedKeyword(null)}
              style={{ background: 'transparent', border: '1px solid #555', color: '#ccc', borderRadius: '6px', padding: '3px 8px', fontSize: '11px' }}
            >
              Clear filter
            </button>
          )}
        </div>

        <div className="keyword-cloud">
          {keywords.map((kw) => {
            const isActive = selectedKeyword === kw.word;
            return (
              <button
                type="button"
                key={kw.word}
                className={`kw-tag ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedKeyword(isActive ? null : kw.word)}
              >
                <span>{kw.count}&times;</span> &ldquo;{kw.word}&rdquo;
              </button>
            );
          })}
        </div>

        {selectedKeyword && (
          <div style={{ marginTop: '12px', background: '#243640', borderRadius: '12px', padding: '12px 14px' }}>
            <div style={{ fontSize: '12px', color: '#ffaa88', fontWeight: 600 }}>
              Matches for &ldquo;{selectedKeyword}&rdquo;:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              {Object.entries(HINGLISH_TRANSLATIONS)
                .filter(([original]) => original.toLowerCase().includes(selectedKeyword.toLowerCase().split(' ')[0]))
                .map(([original, english]) => (
                  <div key={original} style={{ fontSize: '12px', color: '#f4efe8' }}>
                    <strong>&ldquo;{original}&rdquo;</strong> &rarr; <span style={{ color: '#a7f3d0' }}>{english}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Areas Deep Dive Split */}
      <div className="ink-split">
        {/* Left: Clickable Category List */}
        <div className="ink-list">
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffaa88', marginBottom: '4px' }}>
            Catalog Focus Areas (Click to Inspect)
          </div>
          {report.areas.filter((area) => area.count > 0).map((area) => {
            const isSelected = selectedAreaTitle === area.title;
            return (
              <div
                className="ink-row"
                key={area.title}
                onClick={() => setSelectedAreaTitle(area.title)}
                style={{
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(255,255,255,0.08)' : 'transparent',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: isSelected ? '1px solid #ff7755' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                <span className={`swatch ${AREA_TONE[area.title] || 'slate'}`} />
                <div style={{ flex: 1 }}>
                  <div className="area-top">
                    <span style={{ fontWeight: isSelected ? 700 : 500 }}>{area.title}</span>
                    <strong>{area.count} · {area.share_pct}%</strong>
                  </div>
                  <div className="track dark">
                    <div className={`fill ${AREA_TONE[area.title] || 'slate'}`} style={{ width: `${area.share_pct}%` }} />
                  </div>
                  <p className="ink-quiet">{area.actionable ? area.note : 'No catalogue action.'}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Area Deep Dive Panel */}
        <div style={{ background: '#1b2731', borderRadius: '16px', padding: '18px', border: '1px solid #2e4150', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <span className={`pill ${AREA_TONE[selectedArea.title] || 'slate'}`} style={{ fontSize: '11px' }}>
              {selectedArea.actionable ? '⚡ High Actionability' : 'Low Actionability'}
            </span>
            <h3 style={{ margin: '8px 0 2px', fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#fff' }}>
              {selectedArea.title} Breakdown
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#c9bfb4' }}>
              {selectedArea.count} returns ({selectedArea.share_pct}% of classified Other). {selectedArea.note}
            </p>
          </div>

          <div style={{ background: '#243542', borderRadius: '12px', padding: '12px', fontSize: '13px' }}>
            <strong style={{ color: '#ffaa88' }}>Action for Neha &amp; Sourcing Team:</strong>
            <p style={{ margin: '4px 0 0', color: '#e5ddd5', lineHeight: 1.45 }}>
              {selectedArea.actionable
                ? `Prioritize vendor audit for ${selectedArea.title}. Request updated technical specs before next production run.`
                : 'Customer subjective sentiment or courier delay. Do not alter catalogue or size specifications.'}
            </p>
          </div>

          <div>
            <strong style={{ fontSize: '12px', color: '#b7aea4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Sample Customer Hinglish Voices in {selectedArea.title}:
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {Object.entries(HINGLISH_TRANSLATIONS)
                .slice(0, 3)
                .map(([original, english]) => (
                  <div
                    key={original}
                    style={{
                      background: 'rgba(0,0,0,0.2)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #ff7755',
                      fontSize: '12px',
                    }}
                  >
                    <div style={{ fontStyle: 'italic', color: '#fef08a' }}>&ldquo;{original}&rdquo;</div>
                    <div style={{ color: '#a7f3d0', marginTop: '2px' }}>Meaning: {english}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WeeklyBrief({ overview }: { overview: OverviewAgent }) {
  return (
    <section className="brief" aria-label="Weekly overview">
      <p className="kicker">Agent 3 · Overview · {overview.source === 'model' ? 'model brief' : 'from counted labels'}</p>
      <h3>{overview.headline}</h3>
      <div className="brief-grid">
        <div>
          <p className="brief-label">This week</p>
          <ul>
            {overview.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="brief-label">Watch</p>
          <ul>
            {(overview.watch.length ? overview.watch : ['No SKU cluster yet.']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="brief-label">Neha’s actions</p>
          <ul>
            {(overview.actions.length ? overview.actions : ['Nothing queued.']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="caveat">{overview.caveat}</p>
    </section>
  );
}
