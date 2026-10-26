# P4 final design summary — factual preparation

**Sofia owns the final synthesis and personal rationale.** This outline is preparation, not the final 1–2-page submission. Write the finished document as `design-docs/p4-design-summary.md`, then check its rendered length. Aim for roughly 650–850 words in a normal readable layout; actual pages depend on formatting. Version evidence is in the [source map](p4-version-map.md).

## 1. Problem and final journey — about 100 words

Supported by the original [problem framing](problem-framing.md): students often meet someone before knowing why that person will matter later. Circle retains encounter context for a later need. Current journey: Commons sign-in → deliberately save Text, reviewed Voice transcript or Form → Find from the signed-in account’s saved encounters → inspect evidence/first original → correct current information or confirm removal. Organization and search use an external AI service; interpretations can be wrong.

Add your own reason this final journey is valuable. Avoid implying the broader P1 rediscovery lifecycle is implemented.

## 2. What changed from P1 and P3 — about 150–200 words

Factual P1 comparison:

- Graphing now stores evidence per encounter and recalls over the owner’s current corpus. It does not trace a cross-note relationship graph or transfer a fact between people.
- Each original is a distinct encounter; equal names are never merged. Unknown or ambiguous names can stay unknown.
- Seeking records submitted needs. Saved/active-need lifecycle, automatic rediscovery, recommendations/exclusions and Connecting’s useful/dismissed history remain deferred.
- Registering, Sessioning and Federating are reused for Commons-only accounts; ownership comes from the authenticated session.

Factual P3 visual comparison: Handlee/Urbanist, cream/blue/vermilion, quiet white rows, equal Text/Voice/Form controls, the Remember/Find toggle and hover artwork remain. P4 adds empty-account guidance and first-original/current explanation; the signed-in decorative reserve is smaller, bringing useful content closer. Narrow layouts, reduced-motion and touch were checked synthetically. Native browser zoom and physical-device/assistive-technology checks are not claimed.

Supply your actual reason for the scope/visual decisions, keeping observations separate from historical intent.

## 3. Choose two consequential refinements — about 250–350 words total

**Lossless correction:** Trigger: a Contact-only edit could discard detailed activity/reminder text because the form used shorter model summaries. Decision now implemented: recognized guided notes populate from current authored fields; raw text is allocated visibly once, retaining complete source groups. Observed consequence: unrelated details survive, replaced activity leaves current recall, first wording remains a historical copy. Tradeoff: ambiguous grouping needs user review; readable-form overhead can require deliberate shortening at the 20,000-character bound.

**Revision and erasure boundaries:** Trigger: extraction can finish after a newer correction/removal. Existing revision guards and deletion markers remain enforced. Current results join against owned current sources; removal erases text before graph cleanup and acknowledges after both. Race tests show older extraction cannot overwrite a newer version or resurrect erased content. Tradeoff: multi-concept work is not atomic; processing failures can retain saved changes, require explicit retry, or continue after a caller timeout. Describe this as retained design, not a newly invented P4 feature.

Alternative concrete P4 refinement: a failed Load more used to replace forty visible rows with the first twenty. Retry now repeats the failed cursor and preserves append intent; deleted anchors still require an explicit reload from the beginning.

Choose examples you can personally explain. Add the alternatives you actually considered; none are invented here.

## 4. Validation and honest limits — about 80–120 words

Fresh October 26 local evidence: 231 Bun tests/1,245 assertions and 69 production-preview Chrome scenarios pass, alongside source/artifact/type checks and build. Five earlier synthetic real-provider examples passed; they do not establish general model quality. Browser API/audio are mocked. The live app observed at 15:36 EDT was still older; final deployment, two-account live integration, hardware microphone and unfamiliar-user observations remain unverified until you perform them. Link [verification](p4-verification.md), state actual release results after deployment, and keep the long test inventory outside the summary.

## Before submitting this document

Confirm which P1/P3 commits were actually submitted; the source map identifies historical snapshots without inventing submission status. Replace preparation notes with your own concise narrative. Use immutable final-version links after the source is committed/pushed. Open the final rendered document, verify one or two readable pages, and remove all outline instructions. Do not claim user research or a deployed result without an observation.
