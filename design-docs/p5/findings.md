# Design flaws and opportunities

Three opportunities from [Study 1](study-1.md). Evidence comes from a meeting summary and moderator confirmations; causes and severity are provisional. Where no failure was documented, severity describes potential impact. Revisit these after Study 2.

## F1 — Prepare users for first-use microphone permission

**Evidence:** P1 reacted positively to voice capture but had to grant microphone permission during the hands-free task. No task-specific hint was given; transcript accuracy and the final save outcome are unknown.

**Explanation:** Browser permission adds an interaction when the user expects speaking to reduce effort. Ordinary first-use browser setup may explain the friction; the evidence does not establish that Circle’s recording controls were confusing.

**Possible improvement:** Explain the permission step beside Start recording and show a clear text-entry fallback if access is refused. Test first-use recording with Study 2 before pre-granting permission.

**Level:** Physical — operating a browser permission control interrupts capture. **Severity:** Minor — an extra setup step is documented, with no reported abandonment or intervention.

## F2 — Make context-based recall easy to discover

**Evidence:** P1 quickly forgot the newly saved contact’s name. The session included searches for research needs, although exact queries and returned people were not recorded.

**Explanation:** Remembering a name cannot be a prerequisite for retrieving an encounter. This supports Circle’s core design opportunity; it does not establish that P1 failed to find the person or that current search guidance failed.

**Possible improvement:** Add a short example beside Find, such as “Someone working on robot learning who may take undergraduates next spring.” Check whether Study 2 can formulate a need and justify a relevant result without a name or moderator hint.

**Level:** Conceptual — retrieval should match the user’s remembered situation and current need. **Severity:** Moderate potential impact — a name-dependent expectation could prevent useful recall, but that failure was not observed here.

## F3 — Clarify the limits of opportunity search

**Evidence:** P1 considered Circle useful for research opportunities and less useful for company internships. The summary gives no explanation or verified comparison of results.

**Explanation:** A saved encounter’s value may depend on the kind of opportunity sought. The difference could reflect the fictional network, P1’s networking habits or the interface’s framing; the evidence cannot distinguish these.

**Possible improvement:** Explain that Find searches saved encounters and preserves uncertainty about openings. Test one recent research need and one recent internship need, then ask what each result would let the participant do next.

**Level:** Conceptual — the opportunity concerns the scope and value users expect from their network. **Severity:** Moderate potential impact — a mismatch could reduce return use, while no incorrect result or blocked task was documented.
