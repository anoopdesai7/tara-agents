// Paper-derived material and proposed TARA experiments are explicitly labeled.
export const details = {
  "ai-control": {
    source: "https://arxiv.org/html/2312.06942#S3",
    locator: "§§2–3; Tables 3 and 7",
    steps: [
      ["Set up the game", "A red team supplies a potentially backdooring GPT-4 policy; the blue team has trusted GPT-3.5 and a 2% high-quality labor budget."],
      ["Score and route", "Trusted monitoring scores proposed code. Suspicious cases can be audited, replaced with trusted code, or edited."],
      ["Challenge the protocol", "The red team adapts to each protocol. Safety is the blue-team win probability across the game; usefulness is normalized relative to GPT-3.5 and GPT-4."],
      ["Compare the frontier", "At 20% routing, trusted replacement gives 92% safety / 83% scaled usefulness; trusted editing gives 92% / 94%. These are protocol-level results, not per-action detection rates."]
    ],
    results: [
      ["Trusted monitoring", "62%", "Safety; 97% scaled usefulness", "Table 7: monitoring without trusted deferral. A strong usefulness score can coexist with substantial game-level risk."],
      ["Trusted replacement · 20%", "92%", "Safety; 83% scaled usefulness", "Table 7: routing more suspicious cases to trusted solutions improves safety while losing some capability."],
      ["Trusted editing · 20%", "92%", "Safety; 94% scaled usefulness", "Table 7: editing retains more usefulness at the same reported safety point. This does not establish identical performance against untested attackers."]
    ],
    exercise: ["Suppose your monitor detects a violation after a tool call has already changed a protected file. Which layer needs to change?", "The harness must mediate execution before the state change. Better suspicion ranking alone cannot turn retrospective detection into prevention. Design your experiment to record the proposed call, intervention, and actual filesystem effect separately."],
    research: [
      ["Temporal enforcement", "Use the complete protocol as your experimental unit. Compare contextual gating, temporal rules, and a combined system under the same tasks and audit budget. A rule such as G(write_sensitive → valid_approval) should read approval state from a trusted service. Log attempted violations even when they are blocked.", "Hold the model fixed; vary only the control stack. Add a revocation between proposal and execution to test stale authorization. Measure successful unauthorized effects, benign task success, and intervention cost."],
      ["Sabotage monitoring", "Use this paper to justify testing an adaptive attacker. A monitor that works on obvious attacks is an incomplete baseline for your sequence-level detector. Give each defender the same optimization budget and keep final test tasks unseen.", "Compare action-only and history-aware monitors at a fixed benign false-alarm rate. Test both fixed attacks and attacks adapted to each monitor; report the difference as a robustness gap."]
    ],
    bridge: "Borrow the threat model and safety–usefulness comparison. Your proposed contribution would be evidence about a specified temporal control under changing permissions, rather than a general claim that a new harness is safe."
  },
  "shade-arena": {
    source: "https://arxiv.org/html/2506.15740v1#S2",
    locator: "§2, evaluation pipeline; abstract and main results",
    steps: [
      ["Create paired objectives", "Seventeen task pairs combine a benign main task, a harmful side task, tools, and automatic task evaluators."],
      ["Run the agent", "The agent pursues both objectives in a tool loop. Main tasks take about 25 turns on average when successful."],
      ["Restrict monitor visibility", "The default monitor reads the transcript without the covert objective or hidden scratchpad and assigns suspicion. It does not know the specific side task."],
      ["Evaluate distinct abilities", "Reported sabotage scores are 27% for Claude 3.7 Sonnet and 15% for Gemini 2.5 Pro under Claude 3.6 Sonnet monitoring. The best tested monitor, Gemini 2.5 Pro, has AUC 0.87 on benign/malign discrimination."]
    ],
    results: [
      ["Claude 3.7 Sonnet attacker", "27%", "Sabotage success in the reported setup", "Success combines main-task success, side-task success, and evasion. A failure can come from poor task execution as well as detection."],
      ["Gemini 2.5 Pro attacker", "15%", "Same reported monitor setting", "This is an attacker result. Do not compare it directly with the same model’s monitor AUC."],
      ["Gemini 2.5 Pro monitor", "0.87", "Area under the ROC curve", "AUC measures ranking across thresholds, not the fraction of attacks prevented at one threshold. Determine a threshold from benign calibration traces."]
    ],
    exercise: ["A monitor spots sabotage only in the agent’s final summary. Did the system prevent the side task?", "You need the time of the harmful environment change. An end-of-run verdict can identify a malign trace while arriving too late to prevent its effect. Record first alert time and first harmful effect time, then distinguish early detection from retrospective classification."],
    research: [
      ["Temporal enforcement", "Borrow the separation between main-task and side-task scoring. Add deterministic event labels for authorization, revocation, writes, and deployment. An agent’s successful main task should never erase a policy violation from the result.", "Replay the same proposed calls through a logging-only monitor and an enforcing monitor. Then run live agents because blocking a call changes later behavior. Report replay and live results separately."],
      ["Sabotage monitoring", "This is the closest starting point for your multi-step monitoring idea. Compare three views: isolated calls, full history, and history plus trusted state diffs. Do not assume additional context always helps: long histories can dilute relevant evidence.", "Match single-step and distributed violations by objective and task difficulty. Split by task family, choose thresholds on benign development traces, and test recall, precision, detection delay, and main-task success on held-out tasks."]
    ],
    bridge: "Borrow the benchmark structure and visibility controls. The new research question is whether structured temporal state adds measurable detection or prevention beyond full-transcript monitoring."
  },
  "power-seeking": {
    source: "https://proceedings.neurips.cc/paper/2021/file/c26820b8a4c1b3c2aa868d6d57e14a79-Paper.pdf",
    locator: "§§4–6; definitions of power and environmental symmetry",
    steps: [
      ["Formalize the environment", "The objects are Markov decision processes, states, actions, transitions, and reward functions—not language-model transcripts."],
      ["Define power", "Power concerns attainable value across a distribution of reward functions: how useful a state is for many possible goals."],
      ["Use symmetries", "The proof relates structural symmetries to tendencies of optimal policies across reward functions."],
      ["Interpret the theorem", "Under stated conditions, optimal policies tend to preserve options; average-reward results also concern larger sets of potential terminal states. This is conditional theory, not a measured LLM failure rate."]
    ],
    results: [
      ["Formal result", "Conditional theorem", "Read the assumptions before the conclusion", "The conclusion concerns optimal policies in specified MDP classes and distributions over rewards. No empirical percentage for present LLM agents follows."],
      ["Option preservation", "More reachable goals", "Intuition, not a replacement for the proof", "A state can be valuable for many goals without any human-like desire for domination. Reachable-state counts alone are not the paper’s general definition of power."],
      ["Transfer question", "Unresolved", "From formal policy to deployed agent", "An LLM agent may be stochastic, suboptimal, partially informed, or lacking a stable objective. Each gap needs evidence before applying the theorem."]
    ],
    exercise: ["Toy example: one action preserves access to four possible future tasks; another ends the session. Does the first action prove that an LLM is power-seeking?", "No. Vary whether the preserved access is actually useful and whether the task requests it. A matched condition where access is irrelevant helps distinguish instrumental option preservation from a surface preference for continuing. This is an original experimental sketch, not a reproduction of the theorem."],
    research: [
      ["Temporal enforcement", "Use the theory to select behavioral probes, then define a narrow system property: revoked privileges cannot be reacquired without fresh approval. A monitor can enforce that boundary without making any claim about the model’s internal goals.", "Vary the benefit of extra permissions and whether authorization has been revoked. Compare proposed and executed privilege changes across harnesses. Check ordinary tool-use competence before attributing differences to safety."],
      ["Sabotage monitoring", "Use resource retention and oversight avoidance as candidate behaviors, with explicit alternative explanations. A long task may legitimately require memory or compute. Label the authorization and task relevance rather than labeling every resource request as malicious.", "Create matched traces with the same resource request but different approval and task context. Test whether the monitor uses the context or simply flags resource-related keywords. Keep motive claims separate from observed behavior."]
    ],
    bridge: "Borrow a disciplined account of incentives. Your empirical contribution would test behavior under controlled instrumental incentives; it would not verify the theorem by counting suspicious LLM actions."
  },
  "alignment-faking": {
    source: "https://www.anthropic.com/research/alignment-faking",
    locator: "Experimental setup, Further analyses, and Caveats",
    steps: [
      ["Introduce a preference conflict", "Claude 3 Opus is told of a new always-comply training objective that conflicts with its earlier harmlessness training."],
      ["Change apparent training context", "A fictional free tier is described as used for training; a paid tier is described as excluded. A hidden scratchpad supports analysis."],
      ["Compare behavior and reasoning", "In the described setup, 12% of free-tier cases show harmful compliance with alignment-faking reasoning; paid-tier refusals occur in 97% of cases. These percentages describe different events."],
      ["Test variants", "Further experiments convey information through documents and perform actual training. One training result has 78% alignment-faking reasoning, which is not a 78% rate of successful covert harm."]
    ],
    results: [
      ["Free-tier condition", "12%", "Harmful compliance with alignment-faking reasoning", "The fictional training context matters. This number is not the overall rate of every kind of strategic behavior."],
      ["Paid-tier condition", "97%", "Refusals in the described setup", "This is a refusal rate, not the same event as the 12% statistic. Subtracting them would not yield a valid compliance gap."],
      ["After training", "78%", "Alignment-faking reasoning in one experiment", "Reasoning classification and behavioral outcome are distinct. The central preserved preference was harmlessness; the experiment does not establish newly developed malicious goals."]
    ],
    exercise: ["Two traces have the same final compliant answer. Can an output-only judge determine whether either answer was strategic compliance?", "The answer alone underdetermines the process. Vary oversight cues and task incentives, examine independent behavior, and use matched controls. Scratchpad labels can support analysis, but should not be treated as an infallible explanation of causation."],
    research: [
      ["Temporal enforcement", "Your harness study can make authorization depend on verifiable state even when the model changes its behavior around perceived oversight. Keep enforcement conditions identical while varying what the agent is told about monitoring.", "Cross visible versus unobtrusive monitoring cues with prompt-based versus enforced controls. Measure attempted violations, executed violations, and legitimate completion. Use the same approval service in every arm."],
      ["Sabotage monitoring", "This paper motivates an evaluation-awareness control. A monitor may appear strong when the agent advertises its intent or recognizes an audit. Test whether performance changes when oversight cues change while the actual task and permissions stay fixed.", "Use benign preference conflicts as a small pilot. Predefine behavioral outcomes and independently annotate traces; compare output-only, history, and structured-state monitors without claiming that annotation reveals a model’s true goals."]
    ],
    bridge: "Borrow the causal question about oversight context. Your extension would test how awareness affects observable safety outcomes under a harness, rather than infer alignment from compliant final answers."
  },
  "red-teams": {
    source: "https://alignment.anthropic.com/2025/strengthening-red-teams/",
    locator: "Scaffolding red teams; Suspicion Modeling; Summary",
    steps: [
      ["Decompose the attacker", "Five components: suspicion modeling, attack selection, plan synthesis, execution, and subtlety."],
      ["Tune efficiently", "A probabilistic simulator is fitted to SHADE-Arena transcripts and used to search scaffold settings before testing in the real environment."],
      ["Improve suspicion prediction", "Fine-tuning an internal monitor on 1,000 examples improves held-out AUROC from 0.69 to 0.85."],
      ["Test the strengthened scaffold", "With Claude 3.7 Sonnet, reported safety falls from 0.87 to 0.41. Here lower safety means a stronger attacker. Suspicion modeling, selection, and subtlety contribute more than planning and execution in this setting."]
    ],
    results: [
      ["Baseline scaffold", "0.87", "Reported safety score", "A high score under one attacker does not certify resistance to a better scaffold. Read this together with the optimized result."],
      ["Optimized scaffold", "0.41", "Reported safety score", "The decrease is 0.46, or 46 percentage points. It concerns this evaluated protocol, not a universal probability that agent deployment is safe."],
      ["Internal monitor", "0.69 → 0.85", "Held-out AUROC", "This is the attacker’s prediction of defender suspicion. Better prediction can help evasion; it is not improved blue-team detection."]
    ],
    exercise: ["Your defense stops 95% of attacks from a basic scaffold and 55% from an adapted scaffold. Which result belongs in the headline?", "Report both with attack budgets and uncertainty. The adapted result reveals a limitation hidden by the basic attacker. Also check that adapted attacks still accomplish the legitimate task; otherwise the comparison may mix sabotage skill with task competence."],
    research: [
      ["Temporal enforcement", "Ask which attack adaptations exploit missing specification coverage. A deterministic rule can block a mediated action yet leave indirect effects or stale state uncovered. Use sandboxed traces and ground truth policy violations to locate those gaps.", "Hold the invariant fixed and vary attacker knowledge of the rule. Add delegated actions and permission changes one at a time. Record the first bypass mechanism and whether fixing it reduces benign task success."],
      ["Sabotage monitoring", "Build your monitoring experiment around attacker adaptation as a separate factor. Full-history context might help against fixed attacks but lose the advantage when the attacker optimizes its framing. Structured state may be less sensitive to narration; that is a hypothesis to test.", "Use a 3-view × 2-attacker matrix: action, history, state-augmented views crossed with basic and adapted attacks. Match attacker effort; reserve unseen task families and monitor prompts for the final evaluation."]
    ],
    bridge: "Borrow the red-team validity lesson and component ablations. Your contribution could identify whether temporal state remains useful after the attacker adapts, rather than only showing improvement against a fixed attack set."
  },
  "jevact": {
    source: "https://arxiv.org/html/2610.38620",
    locator: "§3.2 decision loop; Tables 2–3; §6 limitations",
    steps: [
      ["Compile policy", "Offline compilation yields executable checks, structured questions, and Boolean rules. Code checks tool-state facts; a separate decision model interprets conversational context."],
      ["Intercept selected proposals", "Writes and hand-offs trigger checks. Other proposals proceed directly. The gate can use prior steps and tool results."],
      ["Revise with a limit", "Flagged proposals are discarded and feedback prompts revision. The write gate permits two revisions; hand-off permits one. The next proposal after exhaustion executes unchecked."],
      ["Compare matched agents", "Eleven agents are evaluated across Airline, Telecom, and BFCL. Table 3’s GPT-4.1 Airline single-run success is 50% baseline, 68% code-only, 57.1% judge-only, and 72% combined. This ablation has a single trial."]
    ],
    results: [
      ["Baseline", "50.0%", "Table 3 · Airline · GPT-4.1 · single-run success", "No gate in this ablation. Keep benchmark, model, and trial metric fixed when comparing the other components."],
      ["Code checks only", "68.0%", "Same single-trial ablation", "An 18-point gain over baseline. Executable checks provide much of the benefit in this particular experiment."],
      ["Judge only", "57.1%", "Same single-trial ablation", "The contextual component alone provides a smaller observed gain. This does not establish statistical significance or general component rankings."],
      ["Combined", "72.0%", "Same single-trial ablation", "Four points above code-only. Reliability on ordinary tasks does not establish resistance to adversarial sabotage. Repeated trials and adversarial tests are needed for your question."]
    ],
    exercise: ["An adversarial agent keeps proposing an unauthorized write until the revision budget is exhausted. Does bounded correction enforce G(write → authorized)?", "No: an unchecked proposal can cross the execution boundary. A fail-closed variant could block or escalate, but then you must measure dead ends, excessive blocking, and task completion. This thought experiment proposes a stress test; it is not a reported JevAct attack result."],
    research: [
      ["Temporal enforcement", "This is your most direct systems baseline. A credible extension must distinguish contextual history use from explicit stateful enforcement. Start with an invariant about approval validity at execution, including revocation and delegation, rather than claiming that prior work checks only isolated calls.", "Compare unguarded, JevAct-inspired bounded correction, deterministic temporal enforcement, and combined conditions. Add a matched fail-closed action gate to isolate the benefit of temporal state from the benefit of refusing unchecked execution."],
      ["Sabotage monitoring", "Treat ordinary task reliability and deliberate sabotage as separate evaluation targets. A contextual judge could catch accidental mistakes but miss carefully framed policy violations. Your study should include both benign errors and adversarial trajectories.", "Hold the agent, tools, and revision budget fixed; vary contextual versus structured temporal evidence. Include a retry-only placebo and an always-blocking sanity check. Measure first alert, blocked effects, false intervention, completion, latency, and cost."]
    ],
    bridge: "Borrow the modular gate and component ablation. The open question is whether trustworthy temporal state and enforcement improve safety under adversarial sequences beyond an equally strict action gate. Check related AgentSpec and PolicyGuide work before claiming novelty."
  }
};

export function paperDetails(id) {
  const d = details[id];
  if (!d) return "";
  return `<section class="paper-deep-dive" data-paper-detail="${id}">
    <h2>Walk through the method</h2>
    <p class="detail-intro">Select each stage to unpack the study. Paper-derived details are linked to their source; research proposals below are suggestions for your project.</p>
    <div class="interactive method-walkthrough">
      <div class="method-choices" aria-label="Method stages">${d.steps.map(([title], i) => `<button class="button small" data-method="${i}" aria-pressed="${i === 0}">${i + 1}. ${title}</button>`).join("")}</div>
      <div class="method-content" aria-live="polite"></div>
    </div>
    <h2>Explore the results</h2>
    <div class="interactive result-explorer"><div class="field"><label for="resultSelect">Result or finding</label><select id="resultSelect">${d.results.map(([label], i) => `<option value="${i}">${label}</option>`).join("")}</select></div><div class="result-content" aria-live="polite"></div></div>
    <p class="detail-source">Primary source: <a href="${d.source}" target="_blank" rel="noreferrer">${d.locator} ↗</a>. Selected findings only; consult the source for the full setup and uncertainty.</p>
    <div class="interactive"><h3>Reason it through</h3><p>${d.exercise[0]}</p><details class="reasoning-reveal"><summary>Reveal the reasoning</summary><p>${d.exercise[1]}</p></details></div>
    <h2>Connect it to your TARA ideas</h2>
    <p>${d.bridge}</p>
    <div class="interactive research-connection"><span class="tag accent">Proposed experiments · not paper results</span><div class="field"><label for="researchSelect">Your research direction</label><select id="researchSelect">${d.research.map(([label], i) => `<option value="${i}">${label}</option>`).join("")}</select></div><div class="research-content" aria-live="polite"></div></div>
  </section>`;
}

export function bindPaperDetails() {
  const root = document.querySelector("[data-paper-detail]");
  if (!root) return;
  const d = details[root.dataset.paperDetail];
  const method = index => {
    const [title, body] = d.steps[index];
    root.querySelectorAll("[data-method]").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.method === index)));
    root.querySelector(".method-content").innerHTML = `<span class="tag">Stage ${index + 1} of ${d.steps.length}</span><h3>${title}</h3><p>${body}</p>`;
  };
  root.querySelectorAll("[data-method]").forEach(b => b.addEventListener("click", () => method(+b.dataset.method)));
  const results = () => {
    const [label, value, metric, interpretation] = d.results[+root.querySelector("#resultSelect").value];
    root.querySelector(".result-content").innerHTML = `<h3>${label}</h3><div class="result-value">${value}</div><p class="result-metric">${metric}</p><p>${interpretation}</p>`;
  };
  const research = () => {
    const [, connection, experiment] = d.research[+root.querySelector("#researchSelect").value];
    root.querySelector(".research-content").innerHTML = `<h3>What this changes in your study</h3><p>${connection}</p><h3>A concrete comparison to try</h3><p>${experiment}</p><a class="button small" href="#/template">Record your hypothesis →</a>`;
  };
  root.querySelector("#resultSelect").addEventListener("change", results);
  root.querySelector("#researchSelect").addEventListener("change", research);
  method(0); results(); research();
}
