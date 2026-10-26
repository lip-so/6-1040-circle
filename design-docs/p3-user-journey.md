# P3: Beta user journey

This is a concrete synthetic example for a new encounter in Ralph’s own Commons account. Do not erase existing notes to stage it. Model interpretation can vary; these are the expected supported outcomes, not a claim of a recorded live-provider run.

1. Ralph signs in through Commons and chooses **Remember → Text**. On October 20, 2026 in America/New_York, he enters exactly:

   > Met Mira Chen at the campus energy meetup today. Mira develops solar panels at Delta Lab. We discussed ocean sensors. Her contact is mira@example.com.

   He can switch to Voice and back without losing this text. Form has its own preserved draft. Voice transcription is reviewed as text and never automatically saved.

2. Ralph clicks the centered **Save**. Circle saves the exact original and organizes a card with Mira Chen; an encounter date of 2026-10-20 anchored to that saved local day; solar-panel development at Delta Lab under Does; ocean sensors under Discussed; and mira@example.com under Contact. A provider error keeps the saved original visible in Recent people and offers an intentional retry. Missing fields stay omitted.

3. Ralph chooses **Find** and enters exactly **Who works on solar panels?** He sees **Finding connections…** while waiting. Mira Chen should appear with source-linked evidence from **“Mira develops solar panels at Delta Lab.”** Her own work supports this query; the ocean-sensor discussion alone would not establish expertise. Other genuinely supported contacts in his account may also appear. With only this synthetic note, the expected count is one. An unsupported query such as **Who is hiring marine biologists?** should show **No saved encounters matched this need.** A processing failure shows an error instead of that empty-result message.

4. Ralph expands Mira’s row, then the separately collapsed **Personal notes** disclosure. He sees the exact original above. The edit button opens a prefilled Person/When/Does/Discussed/Contact/Notes form. **Cancel** or **Escape** leaves content, revision and timestamps unchanged and returns keyboard focus to the edit button.

5. Ralph reopens the form and changes Does to **Develops acoustic sensors at Delta Lab**, then clicks **Save changes**. The same encounter identity now has revision 1; the initial capture timestamp and first original remain unchanged. The current card shows acoustic sensors, and a new **Who develops acoustic sensors?** search should return Mira. The original solar-panel wording is still visible under Personal notes but is no longer current search evidence. A stale revision is refused as CONFLICT; Ralph closes and reopens to load the winning content before retrying.

6. Ralph clicks Mira’s red basket. A dialog asks **Remove Mira Chen?**, with Cancel initially focused. **Cancel** or **Escape** sends no deletion request. Explicit **Remove** sends one request even on duplicate clicks, erases original/current content, and withdraws the card and selection caches. The row disappears, focus moves to Recent people, and subsequent searches cannot return this removed encounter. Other encounters, including other notes named Mira Chen, remain separate. Partial cleanup shows **Retry removal**.

Account changes clear drafts/results/dialogs and invalidate late saves, edits, searches and transcripts. Circle currently defers recommendations/exclusions, active/saved-search management and reminders, automatic rediscovery, useful/dismissed history (Connecting), cross-note fact transfer and merging people by name. Editing and removal are in scope. See the [current composition](../code/design/compositions/Circle.md), [concept contracts](../code/design/concepts/), and [historical P3 execution](../code/tests/output/p3-tests.txt) and [current P4 verification](p4-verification.md).
