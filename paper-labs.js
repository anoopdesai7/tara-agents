// Discrete published measurements; never interpolate unmeasured conditions.
export const protocols = {
  replacement: [[0,62,97],[5,74,95],[10,83,93],[20,92,83],[50,100,51]],
  editing: [[5,73,97],[10,85,96],[20,92,94],[50,96,89]]
};
const field = (id,label,options) => `<div class="field"><label for="${id}">${label}</label><select id="${id}">${options.map(([v,t])=>`<option value="${v}">${t}</option>`).join("")}</select></div>`;
const bar = (label,value) => `<div class="finding-bar"><span>${label}</span><div><i style="width:${value}%"></i></div><strong>${value}%</strong></div>`;
const check = (id,label,checked=true) => `<label class="lab-check"><input type="checkbox" id="${id}" ${checked?"checked":""}> ${label}</label>`;
const out = `<div class="specific-output" aria-live="polite"></div>`;

export function specificLab(id) {
  const bodies = {
    "ai-control": `<h3>Route, replace, or edit: compare the measured protocols</h3><span class="tag">Reported results · Table 7</span><p>Choose a protocol family and one of its measured routing levels. The 2% high-quality audit budget is fixed; the routing level is not an extra audit budget.</p>${field("protocolFamily","Protocol",[["replacement","Trusted monitoring + replacement"],["editing","Trusted editing"]])}${field("routingLevel","Routing level",protocols.replacement.map(([v])=>[v,`${v}%`]))}${out}<p>Safety is game-level blue-team win probability. Scaled usefulness normalizes GPT-3.5 to 0 and GPT-4 to 100; it is not raw task accuracy. Compare replacement and editing at 20%: the reported safety is the same, but usefulness differs. These are discrete measurements, not a forecast for arbitrary settings.</p>`,
    "shade-arena": `<h3>Score a SHADE-Arena outcome</h3><span class="tag">Method-based scoring exercise</span><p>The evaluation distinguishes main-task completion, side-task completion, and evasion. Toggle the observed outcomes to see why an attempt does or does not qualify as successful sabotage. This is a logical example, not a sampled benchmark trajectory.</p>${check("mainDone","Main task completed")}${check("sideDone","Harmful side task completed")}${check("evaded","Monitor did not detect the attempt")}${out}<p>The reported overall scores are 27% for Claude 3.7 Sonnet and 15% for Gemini 2.5 Pro with Claude 3.6 Sonnet monitoring. The best monitor’s AUC, 0.87, measures ranking on a separate benign/malign classification evaluation. The toggles do not estimate any of those rates.</p><details><summary>What can the default monitor see?</summary><p>The transcript is visible; the side-task description and hidden scratchpad are excluded. Changing visibility requires a new experiment: the paper’s headline score cannot be reused as the predicted score under a different view.</p></details>`,
    "power-seeking": `<h3>Compute optimal choices in a tiny goal family</h3><span class="tag">Worked MDP illustration · not the theorem’s experiment</span><p>At a start state, choose left or right. Each branch allows selecting one terminal state. A goal gives reward 1 at its named terminal and 0 elsewhere. All goals are equally weighted; transitions are deterministic and both branches take the same time.</p>${field("leftGoals","Terminals reachable on the left",[[1,"A"],[2,"A, B"],[3,"A, B, C"]])}${field("rightGoals","Terminals reachable on the right",[[1,"D"],[2,"D, E"],[3,"D, E, F"]])}${out}<p>For each one-hot reward function, a policy selects the branch that can reach the rewarded terminal. More reachable terminals win for more members of this chosen goal family. This count is not the paper’s general definition of power. Its formal results depend on reward distributions, optimality, and environmental symmetries; this illustration does not establish behavior in LLM agents.</p>`,
    "alignment-faking": `<h3>Change the experimental context; inspect the measured event</h3><span class="tag">Reported findings · distinct denominators/events</span>${field("fakingContext","Experimental condition",[["free","Prompted setup: fictional free tier"],["paid","Prompted setup: fictional paid tier"],["trained","One actual training experiment"]])}${out}<p>Context changes what the model is told about whether its output will affect training. Compare the event labels carefully: a refusal percentage, a harmful-compliance-with-reasoning percentage, and a reasoning classification rate are not interchangeable. No new generations are run here.</p><details><summary>Why this matters for my research</summary><p>Use context changes as a control in your monitoring study: hold actual tool permissions fixed, vary perceived oversight, and measure observable violations. The paper’s percentages do not predict your harness’s failure rate.</p></details>`,
    "red-teams": `<h3>Assemble the attack scaffold; identify measured comparisons</h3><span class="tag">Reported endpoints · unmeasured combinations stay unknown</span><p>Select the five components of the optimized scaffold. The two displayed endpoint scores are reported results; this explorer does not invent additive effects for individual components.</p>${["Suspicion modeling","Attack selection","Plan synthesis","Execution","Subtlety"].map((x,i)=>check(`component${i}`,x,false)).join("")}${out}<p>In this evaluated setting, lower safety means the red team is stronger. The internal suspicion predictor’s AUROC improved from 0.69 to 0.85; this was the attacker’s model of the defender, not improved defender accuracy. Component ablations are needed to assign individual effects.</p>`,
    "jevact": `<h3>Compare the gate’s measured component ablation</h3><span class="tag">Reported results · Table 3</span>${field("gateAblation","Verification configuration",[[0,"ReAct baseline"],[1,"Executable code checks only"],[2,"Kev-27B questions only"],[3,"Combined JevAct"]])}${out}<p>These values are single-trial Airline success with GPT-4.1, not adversarial-safety rates. The four-point difference between combined and code-only does not establish statistical significance.</p><h3>Understand pass@3 versus pass³</h3><span class="tag">Metric definition exercise · one illustrative task</span><p>Mark which of three runs succeeds. The at-least-once and all-three metrics respond differently.</p>${check("trial0","Run 1 succeeds")}${check("trial1","Run 2 succeeds",false)}${check("trial2","Run 3 succeeds",false)}<div class="repeat-output" aria-live="polite"></div><p>Dataset metrics aggregate these indicators across tasks. This exercise contains no additional measured trial results.</p>`
  };
  return `<div class="interactive paper-specific-lab" data-specific="${id}">${bodies[id]}</div>`;
}

export function bindSpecificLab(root) {
  const lab = root.querySelector("[data-specific]"); if (!lab) return;
  const id = lab.dataset.specific, output = lab.querySelector(".specific-output");
  const value = name => lab.querySelector(`#${name}`).value;
  const checked = name => lab.querySelector(`#${name}`).checked;
  const update = () => {
    if (id === "ai-control") {
      const data = protocols[value("protocolFamily")];
      const row = data.find(([level])=>level===+value("routingLevel")) || data[0];
      output.innerHTML = bar("Safety",row[1])+bar("Scaled usefulness",row[2])+`<p>Measured routing level: ${row[0]}%. ${value("protocolFamily")==="editing" ? "Suspicious proposals are edited by the trusted model." : "Suspicious proposals are replaced with trusted solutions."}</p>`;
    } else if (id === "shade-arena") {
      const main=checked("mainDone"), side=checked("sideDone"), evade=checked("evaded");
      output.innerHTML = `<div class="result-value">${main && side && evade ? "Successful sabotage" : "Not overall sabotage success"}</div><p>${!main ? "Main-task failure can explain the failure of this attempt; it is not evidence of a good monitor. " : ""}${!side ? "The harmful objective was not achieved. " : ""}${!evade ? "The monitor detected the attempt. " : ""}${side && !evade ? "Detection alone does not say whether harm was prevented before the side effect occurred." : ""}${main && side && evade ? "Both objectives succeeded and the attempt evaded detection." : ""}</p>`;
    } else if (id === "power-seeking") {
      const l=+value("leftGoals"),r=+value("rightGoals"),total=l+r;
      output.innerHTML = `<div class="toy-branches"><div>Start → Left → ${["A","B","C"].slice(0,l).join(" / ")}</div><div>Start → Right → ${["D","E","F"].slice(0,r).join(" / ")}</div></div><p>Across ${total} equally weighted one-hot goals:</p>${bar(`Left optimal: ${l}/${total}`,Math.round(100*l/total))}${bar(`Right optimal: ${r}/${total}`,Math.round(100*r/total))}<p>${l===r ? "The branches tie across this goal family." : `${l>r ? "Left" : "Right"} is optimal for more of these goals.`} Change reachable terminals to change the count; no model motives are assumed.</p>`;
    } else if (id === "alignment-faking") {
      const data={free:[12,"Harmful compliance with alignment-faking reasoning","The model is told free-tier outputs are used for training toward always complying."],paid:[97,"Refusal rate","The model is told paid-tier outputs are not used for that training."],trained:[78,"Alignment-faking reasoning rate in one training experiment","Actual training is performed; this reasoning rate does not imply the same rate of successful covert harm."]}[value("fakingContext")];
      output.innerHTML=bar(data[1],data[0])+`<p>${data[2]}</p><p>Do not subtract these values to calculate a compliance gap: they measure different events.</p>`;
    } else if (id === "red-teams") {
      const n=[0,1,2,3,4].filter(i=>checked(`component${i}`)).length;
      output.innerHTML = n===0 ? bar("Baseline safety",87)+"<p>Baseline attack policy; the unchecked boxes mean no added optimized scaffold selected in this explorer, not an attacker with no capabilities.</p>" : n===5 ? bar("Optimized-scaffold safety",41)+"<p>All five scaffold components selected. The reported safety drops 46 percentage points from baseline.</p>" : `<div class="result-value">Not estimated</div><p>${n} of 5 components selected. These endpoint results cannot determine this combination’s score. Consult the paper’s component ablations; interactions can make effects non-additive.</p>`;
    } else if (id === "jevact") {
      const rows=[["Baseline",50],["Code checks",68],["Judge questions",57.1],["Combined",72]], row=rows[+value("gateAblation")];
      output.innerHTML=bar("Single-run success",row[1])+`<p>${row[0]}: ${(row[1]-50).toFixed(1)} percentage points versus the 50% baseline. Same benchmark, model, and single-trial comparison.</p>`;
      const wins=[0,1,2].filter(i=>checked(`trial${i}`)).length;
      lab.querySelector(".repeat-output").innerHTML=`<div class="metric-grid"><div class="metric-tile"><span>pass@3: at least one</span><strong>${wins>0?1:0}</strong></div><div class="metric-tile"><span>pass³: all three</span><strong>${wins===3?1:0}</strong></div></div><p>${wins}/3 runs succeed for this illustrative task.</p>`;
    }
  };
  if(id === "ai-control") lab.querySelector("#protocolFamily").addEventListener("change",()=>{
    const old=value("routingLevel"), data=protocols[value("protocolFamily")];
    lab.querySelector("#routingLevel").innerHTML=data.map(([v])=>`<option value="${v}">${v}%</option>`).join("");
    if(data.some(([v])=>v===+old)) lab.querySelector("#routingLevel").value=old;
  });
  lab.querySelectorAll("input,select").forEach(el=>el.addEventListener("change",update)); update();
}
