# TARA Field Guide

Interactive research learning site for AI control, agent safety, sabotage monitoring, power-seeking, agent harnesses, and formal methods.

Live site: https://anoopdesai7.github.io/tara-agents/

Buildless source: `index.html`, `styles.css`, `app.js`, `paper-details.js`, and `paper-labs.js`. Preview with `python3 -m http.server 4173`. Validate JavaScript with `node --check app.js`, `node --check paper-details.js`, and `node --check paper-labs.js`.

GitHub Pages publishes pushes to `main` using `.github/workflows/pages.yml`. Only the five public site files enter the deployment artifact.

Each of the six paper modules includes a four-stage method walkthrough, a result selector with metric interpretation, an expandable reasoning exercise, and separate proposed experiments for temporal enforcement and sabotage monitoring. Primary-source section/table references accompany the selected findings. Proposed experiments are labeled separately from reported results.

Paper labs version 3 replaces the shared threshold calculator with six specific interactions: AI Control’s measured protocol trade-offs, SHADE-Arena’s outcome logic, a tiny goal-family MDP, alignment-faking experimental contexts, red-team scaffold endpoints, and JevAct’s measured component ablation plus repeatability metrics. The JevAct bounded-correction versus fail-closed simulator is retained. Reported measurements are distinguished from method illustrations; unmeasured combinations are never interpolated. Public assets have versioned URLs to refresh cached modules.

Reading progress and paper notes stay in the visitor’s browser and do not sync across devices. The reading template supports Markdown export. The protocol simulator is illustrative, not an empirical safety prediction.

Paper modules link primary sources and distinguish demonstrated results from broader interpretations. The IBM paper is Shoham et al., *Think Before You Act: Decision Gate for LLM Agents* (arXiv:2610.38620).

Moved from `first-moves/public/tara` at the owner’s request. Repository visibility is not authorization to edit or publish; use the repository explicitly designated for the task.
