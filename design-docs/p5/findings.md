# Design flaws and opportunities

[Study 1](study-1.md), [Study 2](study-2.md)

## 1. Make context-based search easier to discover

**Evidence:** P1 quickly forgot a newly saved contact's name. P2 initially assumed Circle was a conventional contacts app and questioned how to search by name. Both participants found contextual recommendations useful.

**Explanation:** Circle's distinction from a contacts app is not immediately apparent. Users may default to name-based search rather than describing a remembered encounter or current need.

**Possible improvement:** Add example queries beside Find to illustrate contextual retrieval. Make sure it's evident that it works well with both full sentences and key-words.

**Level:** Conceptual, understanding how retrieval differs from conventional (e.g. Google) search. **Severity:** Moderate, misunderstanding the search model could limit use of app's main functionality.

## 2. Separate saved encounters from contextual findings

**Evidence:** P2 questioned why navigation returned them to Findings and how to locate saved encounters. They also took several seconds to find the button for expanding original notes.

**Explanation:** The distinction between stored encounters and ones that are coming from search is unclear.

**Possible improvement:** Introduce a dedicated Encounters page with a searchable list of saved records. Use explicit controls such as "View original notes" and keep Findings as a separate search interface.

**Level:** Structural. **Severity:** Moderate, confusion was observed, although it did not make the user fail, just made it harded for them to undestand the UI.

## 3. Clarify how editing affects structured data

**Evidence:** P2 was unsure when to edit the original narrative, how to add new fields, and which information would change. They nevertheless appreciated automatic field extraction.

**Explanation:** The relationship between original notes and extracted fields is unclear: users cannot predict whether changing one representation affects old notes, or only the fields they are changing.

**Possible improvement:** Separate original notes from editable fields, introduce an explicit "Add field" action, and clarify when changes trigger reprocessing. Make editing in form format rather than text input.

**Level:** Conceptual. **Severity:** Moderate.

## 4. Clarify the scope and evidence behind recommendations

**Evidence:** P1 found contextual search useful for research opportunities but less useful for company internships.

**Explanation:** Users may not understand what evidence supports a recommendation or whether Circle identifies a relevant connection versus an actual opportunity.

**Possible improvement:** Show which saved encounters support each recommendation, distinguish relevant expertise from confirmed opportunities, and tell the user when information is missing.

**Level:** Conceptual. **Severity:** Moderate potential impact, unclear expectations could reduce trust, although no incorrect recommendation was documented.