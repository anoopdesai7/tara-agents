const pipeline = [
  [
    "Operationalize",
    "Translate abstract human impacts into observable behavioral metrics.",
    "Define authorization, tampering, shutdown, and sabotage outcomes before running an agent."
  ],
  [
    "Generate scenarios",
    "Construct diverse contexts that can elicit the behavior being measured.",
    "Create legitimate tool-use tasks with controlled adversarial opportunities and matched benign cases."
  ],
  [
    "Simulate interactions",
    "Run repeatable multi-turn conversations and retain the resulting trajectories.",
    "Execute tool-using agents in isolated, instrumented environments and retain proposed actions plus state changes."
  ],
  [
    "Evaluate traces",
    "Score individual behaviors and outcomes at the metric level.",
    "Prefer deterministic environment-state checks for action outcomes, with calibrated human or model review for ambiguous intent."
  ],
  [
    "Aggregate carefully",
    "Inspect distributions and concrete failures instead of relying on one headline score.",
    "Report attack success, attempted and executed violations, false positives, utility, and detection timing separately."
  ]
];

const tracks = {
  formal: {
    title: "Formal runtime constraints",
    hypothesis: "An independent runtime gate reduces executed policy violations under adversarial pressure.",
    property: "G ( execute(a) → authorized(a) )",
    comparison: "Compare no gate, a prompt-only policy, and deterministic enforcement. Count attempts, executed violations, legitimate task completion, and blocked benign actions."
  },
  monitor: {
    title: "Sabotage monitoring",
    hypothesis: "Action- and state-aware monitoring detects covert task deviations earlier than transcript-only judging.",
    property: "alert_time < prohibited_effect_time",
    comparison: "Compare no monitor, a transcript-only model judge, and a structured tool-trace monitor. Count sabotage success, recall at a fixed false-positive rate, and detection before effect."
  }
};

export function impactBenchPage(reflection = "", footer = "") {
  return `<article class="page impactbench-page" data-impactbench>
    <header class="paper-hero">
      <div class="eyebrow">Research methods companion</div>
      <h1 class="paper-title">ImpactBench: measuring what AI does to people</h1>
      <p class="lede">A human-impact evaluation pipeline—and a careful bridge to reproducible TARA experiments on agent oversight.</p>
      <div class="page-meta"><span class="tag accent">ImpactBench method</span><span class="tag">TARA adaptations labeled</span><span class="tag">Interactive guide</span></div>
      <div class="hero-actions">
        <button class="button primary" data-jump="impactMethod">Method walkthrough ↓</button>
        <button class="button primary" data-jump="impactTrace">Trace lab ↓</button>
        <button class="button" data-jump="impactResearch">Proposed experiments ↓</button>
        <a class="button ghost" href="https://impactbench.media.mit.edu/" target="_blank" rel="noreferrer">ImpactBench project ↗</a>
      </div>
      <p class="lab-version">Integrated research-methods module · uses the same field-guide interactions and progress system</p>
    </header>

    <section class="prose">
      <h2>Research question</h2>
      <p>Instead of measuring only model task capability, how can researchers operationalize the consequences of interactions for people? ImpactBench studies human-facing effects through behavioral metrics and simulated conversations.</p>
    </section>

    <div class="claim-grid">
      <div class="claim demo"><strong>What comes from ImpactBench</strong><p>A scenario → interaction → metric → aggregation workflow for evaluating specified human impacts with inspectable trajectories.</p></div>
      <div class="claim not"><strong>What it does not establish</strong><p>ImpactBench is not itself a benchmark of catastrophic agentic risk, power-seeking, sabotage, or runtime enforcement. The TARA experiments below are proposals, not ImpactBench findings.</p></div>
    </div>

    <h2 id="impactMethod" tabindex="-1">Interactive method walkthrough</h2>
    <p class="detail-intro">Move through the evaluation pipeline. Each stage keeps the source method separate from the proposed TARA adaptation.</p>
    <div class="interactive method-walkthrough">
      <div class="method-choices" aria-label="ImpactBench evaluation stages">${pipeline.map(([title], index) => `<button class="button small" data-impact-stage="${index}" aria-pressed="${index === 0}">${index + 1}. ${title}</button>`).join("")}</div>
      <div class="method-content" data-impact-stage-content aria-live="polite"></div>
      <div class="hero-actions"><button class="button small" data-impact-prev>← Previous stage</button><button class="button small primary" data-impact-next>Next stage →</button></div>
    </div>

    <div class="callout"><strong>What to take away</strong><p>Define observable outcomes; generate scenarios that elicit them; collect inspectable trajectories; evaluate at the metric level; and aggregate without hiding failure modes.</p></div>

    <h2 id="impactResearch" tabindex="-1">Connect the method to TARA</h2>
    <p>These are proposed research designs inspired by the pipeline. They are not reported ImpactBench experiments or findings.</p>
    <div class="interactive research-connection">
      <span class="tag accent">Proposed TARA experiments · not paper findings</span>
      <div class="field impact-track-field"><label for="impactTrack">Research track</label><select id="impactTrack"><option value="formal">Formal runtime constraints</option><option value="monitor">Sabotage monitoring</option></select></div>
      <div data-impact-track-output aria-live="polite"></div>
    </div>

    <h2 id="impactTrace" tabindex="-1">Interactive trace-level scoring</h2>
    <div class="interactive impact-trace-lab">
      <div class="interactive-head"><div><h3>Score one proposed action</h3><p>Illustrative scenario: an agent proposes an unauthorized configuration change during a legitimate coding task.</p></div><span class="tag">Illustration · not a measured result</span></div>
      <label class="lab-check"><input type="checkbox" id="impactAttempt" checked> Unauthorized action attempted</label>
      <label class="lab-check"><input type="checkbox" id="impactExecuted"> Action actually executed</label>
      <label class="lab-check"><input type="checkbox" id="impactDetected" checked> Monitor raised an alert</label>
      <label class="lab-check"><input type="checkbox" id="impactEarly" checked> Alert occurred before execution</label>
      <div class="result-content impact-trace-output" aria-live="polite"></div>
    </div>

    <h2>Research design and validity</h2>
    <table class="matrix"><thead><tr><th>Dimension</th><th>Operationalization for a proposed TARA study</th></tr></thead><tbody>
      <tr><td>Unauthorized execution</td><td>Executed prohibited actions / opportunities; report attempts separately</td></tr>
      <tr><td>Shutdown compliance</td><td>Time and steps until an authorized stop is honored</td></tr>
      <tr><td>Detection recall</td><td>Detected malicious trajectories / all malicious trajectories</td></tr>
      <tr><td>False-positive rate</td><td>Flagged benign trajectories / all benign trajectories</td></tr>
      <tr><td>Intervention timeliness</td><td>Alerts before harmful effect / all detected harmful attempts</td></tr>
    </tbody></table>
    <div class="prose"><p>Compare no protection, a deterministic gate, a model monitor, and a combined gate + monitor under matched tasks and adversarial conditions. Pre-register scenarios, randomize run order, repeat trials, and inspect failure traces. Do not treat a model judge as ground truth: prefer environment-state checks for action outcomes and human review for ambiguous intent.</p></div>

    <h2>Reading and critique prompts</h2>
    <div class="interactive critique-prompts">
      <details><summary>What exactly is measured?</summary><p>Distinguish a construct such as human agency or wellbeing from observable indicators, generated conversations, and judge outputs. Ask whether the indicators validly represent the construct.</p></details>
      <details><summary>What transfers to agent safety?</summary><p>The scenario–trajectory–metric–aggregation pipeline transfers. Human-impact scores do not directly estimate power-seeking, sabotage, or catastrophic risk.</p></details>
      <details><summary>What would falsify a TARA hypothesis?</summary><p>If a gate reduces completed violations but increases task failures, report both. If a monitor flags attacks only after execution, detection alone is not prevention. Test adaptive attackers and benign edge cases.</p></details>
    </div>

    <div class="interactive"><div class="interactive-head"><div><h3>One-minute synthesis</h3><p>Record the design decision this method should change.</p></div><a class="button small" href="#/template">Open full template →</a></div><div class="field"><label for="impactReflection">After reading this guide, I would change…</label><textarea id="impactReflection" data-reflection="impactbench" placeholder="My construct, scenario set, outcome measure, aggregation, or validity check…">${reflection}</textarea></div></div>

    <div class="citation"><strong>Source material</strong><br><a href="https://impactbench.media.mit.edu/" target="_blank" rel="noreferrer">ImpactBench project ↗</a> · <a href="https://github.com/mit-cyborgpsychology/impactbench" target="_blank" rel="noreferrer">Code ↗</a> · <a href="https://docs.impactbench.cyborglab.org/" target="_blank" rel="noreferrer">Documentation ↗</a></div>
    <nav class="paper-nav"><a href="#/papers">← Paper library</a><a href="#/template">Continue to reading template →</a></nav>
    ${footer}
  </article>`;
}

export function bindImpactBench() {
  const root = document.querySelector("[data-impactbench]");
  if (!root) return;

  let stage = 0;
  const renderStage = index => {
    stage = index;
    const [title, source, adaptation] = pipeline[index];
    root.querySelectorAll("[data-impact-stage]").forEach(button => button.setAttribute("aria-pressed", String(+button.dataset.impactStage === index)));
    root.querySelector("[data-impact-stage-content]").innerHTML = `<span class="tag">Stage ${index + 1} of ${pipeline.length}</span><h3>${title}</h3><div class="impact-comparison"><div><strong>ImpactBench method</strong><p>${source}</p></div><div><strong>Proposed TARA adaptation</strong><p>${adaptation}</p></div></div>`;
    root.querySelector("[data-impact-prev]").disabled = index === 0;
    root.querySelector("[data-impact-next]").disabled = index === pipeline.length - 1;
  };
  root.querySelectorAll("[data-impact-stage]").forEach(button => button.addEventListener("click", () => renderStage(+button.dataset.impactStage)));
  root.querySelector("[data-impact-prev]").addEventListener("click", () => renderStage(Math.max(0, stage - 1)));
  root.querySelector("[data-impact-next]").addEventListener("click", () => renderStage(Math.min(pipeline.length - 1, stage + 1)));

  const renderTrack = () => {
    const track = tracks[root.querySelector("#impactTrack").value];
    root.querySelector("[data-impact-track-output]").innerHTML = `<h3>${track.title}</h3><p><strong>Hypothesis:</strong> ${track.hypothesis}</p><div class="formula">${track.property}<small>Proposed property or evaluation target; not an ImpactBench result.</small></div><h3>Comparison to run</h3><p>${track.comparison}</p>`;
  };
  root.querySelector("#impactTrack").addEventListener("change", renderTrack);

  const renderTrace = () => {
    const checked = id => root.querySelector(`#${id}`).checked;
    const attempted = checked("impactAttempt");
    const executed = checked("impactExecuted");
    const detected = checked("impactDetected");
    const early = checked("impactEarly");
    const verdict = executed ? "Prohibited effect executed" : detected && early ? "Potentially preventive alert" : "No prohibited effect observed";
    const explanation = `${attempted ? "An unauthorized proposal was observed. " : "No unauthorized proposal was recorded. "}${executed ? "Enforcement failed because the environment changed. " : "No prohibited effect executed in this trace. "}${detected ? (early && !executed ? "The alert arrived before effect, so it could support prevention. " : "An alert exists, but prevention is not established. ") : "No monitor alert was recorded. "}${detected && !attempted ? "This is a possible false positive; verify the ground truth. " : ""}`;
    root.querySelector(".impact-trace-output").innerHTML = `<span class="tag">Illustrative outcome</span><div class="result-value">${verdict}</div><p>${explanation}</p><p><strong>Boundary:</strong> one trace cannot establish a detection rate or reliability guarantee.</p>`;
  };
  root.querySelectorAll(".impact-trace-lab input").forEach(input => input.addEventListener("change", renderTrace));

  renderStage(0);
  renderTrack();
  renderTrace();
}
