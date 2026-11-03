# TARA Field Guide

Interactive research learning site for AI control, agent safety, sabotage monitoring, power-seeking, agent harnesses, and formal methods.

Live site: https://anoopdesai7.github.io/tara-agents/

Buildless source: `index.html`, `styles.css`, `app.js`, and `paper-details.js`. Preview with `python3 -m http.server 4173`. Validate JavaScript with `node --check app.js` and `node --check paper-details.js`.

GitHub Pages publishes pushes to `main` using `.github/workflows/pages.yml`. Only the four public site files enter the deployment artifact.

Each of the six paper modules includes a four-stage method walkthrough, a result selector with metric interpretation, an expandable reasoning exercise, and separate proposed experiments for temporal enforcement and sabotage monitoring. Primary-source section/table references accompany the selected findings. Proposed experiments are labeled separately from reported results.

Paper labs version 2 adds prominent jump buttons, previous/next method controls, a live threshold calculator on all six papers, and a JevAct bounded-correction versus fail-closed simulator. The calculator uses explicitly synthetic traces and computes precision, recall, false-positive rate, caught attacks, missed attacks, and false alarms. These are teaching exercises, not new paper measurements. Public assets have versioned URLs to refresh cached modules after this update.

Reading progress and paper notes stay in the visitor’s browser and do not sync across devices. The reading template supports Markdown export. The protocol simulator is illustrative, not an empirical safety prediction.

Paper modules link primary sources and distinguish demonstrated results from broader interpretations. The IBM paper is Shoham et al., *Think Before You Act: Decision Gate for LLM Agents* (arXiv:2610.38620).

Moved from `first-moves/public/tara` at the owner’s request. Repository visibility is not authorization to edit or publish; use the repository explicitly designated for the task.
