# UI sketches

Original scans: [UI.pdf](UI/UI.pdf).

## 1. Home

Natural-language search (“Who could help?”), a primary **Remember** action, and reminders for still-active needs (for example, a robotics UROP) with a link to suggestions.

![Home: search, Remember, and active-need reminders](UI-assets/page-1.png)

## 2. Remember Someone

Capture an encounter as a text or voice note. An optional contact link and date; **Save** is the only required action.

![Remember Someone: note, optional contact, save](UI-assets/page-2.png)

## 3. Find Someone

Results for a need (for example, a robotics UROP): each card shows the person, why they came up, and the original note. **Keep looking** leaves the search active so later memories can appear on Home (say user is not satisfied with current lookups and maybe goes to more events).

![Find Someone: explained suggestions and keep-looking](UI-assets/page-3.png)

## 4. Check the Memory

The full saved account for a person: original note, edit or hide, delete, and a way to reach out (for example, LinkedIn).

![Check the Memory: details, edit, hide, delete, reach out](UI-assets/page-4.png)

## Alpha implementation: Recent people

The Remember / Find switch is centered above the form. Recent people uses the
rounded, stacked encounter cards from the Find Someone sketch: name, recorded
When / Does / Discussed details, and Your note to expand the complete memo.
Each save is a separate card, including two different people with the same name
or another encounter with the same person. Context distinguishes cards; names
never merge identities.

New entries appear first by save time, independently of the free-text encounter
date. Older notes without saved timestamps stay visible after dated saves, with
no invented dates or inferred order. Unparsed notes are still accessible as
Saved encounter. Long previews are shortened visually; the full original stays
available. Load more keeps all saved encounters reachable, 20 cards at a time.
Loading, an empty account, and a failed request have separate states; failures
have Retry. Returning to the tab rechecks the account before refreshing.

Repeated clicks are blocked while saving. Retrying the same draft after a lost
response or indexing failure uses the same submission token, so it reuses the
saved note. The list reads saved notes directly, so an unindexed encounter is
still visible. Signing out clears the screen and ignores pending replies.
Editing, deleting, contact links, and automatic person merging remain deferred.
