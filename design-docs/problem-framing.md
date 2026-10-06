## Problem Statement

### Domain

Professional networking for college students: students interested in technology, research, and startups engage in dozens of coffee chats, hackathons, research events, club meetings, conferences, and other informal conversations throughout college. Those interactions usually cover both people's backgrounds, technical interests, career aspirations, current projects, and what kind of help or opportunities might be useful for them. Oftentimes students meet really interesting people and have great conversations with them; sometimes those people might become useful months later, but by then they are already off the student's radar.

The first users I want to focus on are **career-active college students, particularly students interested in startups, research, and technology**. Their professional network grows extremely quickly, while their goals also change extremely quickly. A student might meet a robotics PhD in September while they are interested in something completely different, and then start looking for a robotics UROP in February. They might meet a startup founder at a hackathon when they are not looking for a job, and then want exactly that kind of startup internship a year later.

The main motivation for a student to go to these events or schedule a coffee chat is to meet new people, exchange ideas, learn about fields they are curious about, find research or job opportunities, meet a potential co-founder, or find expertise they do not currently have access to. Given how many people students meet through college, most conversations, people's interests, projects, and small details about what they know are eventually forgotten, regardless of how interesting the person was at the time.

The problem is not exactly forgetting that a person exists. LinkedIn, email, Instagram, phone contacts, or a calendar can usually preserve that. The harder thing to preserve is **why that person might matter later**.

A student might remember that they met Alex, but forget that Alex works on world models, that his lab sometimes takes undergraduates, or that Alex said he knows somebody building a robotics startup. Often, by the time the student needs that information, they do not even remember that Alex is the person they should be looking for.

The entire practice therefore depends on capturing value that is not apparent until much later, often well after the original conversation itself is forgotten.

In other words, students often **meet the right person before they know why that person is the right person**.

### Stakeholders

1. **Career-active college students**  
   The primary users. These are students who regularly meet people through hackathons, research events, startup communities, classes, internships, clubs, conferences, and coffee chats. They are actively exploring careers, research areas, startups, or projects, and their goals change frequently. They benefit from being able to remember and reuse weak professional connections they have already made.

2. **Direct professional connections**  
   People the student has personally met: researchers, PhD students, professors, founders, engineers, investors, alumni, recruiters, upperclassmen, and other students. They may not have an active relationship with the student, but information from an earlier interaction with them may become relevant later.

3. **Indirect connections**  
   People whom the student has not met directly but who appear through another relationship. For example, a student may remember that Sarah knows a founder at a robotics company, or that Alex's lab collaborates with another researcher. These people matter because useful opportunities are often several edges away rather than directly inside the student's network.

4. **Introducers / bridges**  
   People whose value comes from connecting the student to another person, organization, or community. They might not personally have the expertise or opportunity the student needs, but they know someone who does.

5. **Opportunity holders**  
   Researchers, lab members, founders, hiring managers, project leads, or others who can provide access to a UROP, internship, job, project, collaboration, or introduction. A student may have already met them before the opportunity became relevant.

6. **People mentioned inside conversations**  
   A student's notes may include people they have never directly interacted with, such as someone's co-founder, professor, roommate, or former colleague. Circle has to preserve the distinction between "I know this person" and "someone told me about this person," rather than treating every name in the system as an established relationship.

For the first version, Circle is intentionally NOT for sales teams, recruiting teams, founders managing thousands of contacts, or VCs managing deal pipelines. Those groups might experience a similar problem, but would require additional functionality such as shared databases, permissions, pipelines, team-wide relationship ownership, and external data sources. For now, Circle is a private model of one student's professional world, making Alpha much easier to implement, test and expand further later.

### Bad situations

1. A computer science student, Maya, goes to a robotics seminar and afterwards chats with a PhD student, Alex. They talk about world models and robot learning. Maya thinks Alex is really smart, and Alex casually mentions that his lab sometimes takes undergraduate researchers. Unfortunately, Maya is not looking for a UROP at this point, so there is no professional overlap or reason to follow up. They connect on LinkedIn and leave. Fast forward 5 months: Maya decides she wants to do a robotics UROP. She remembers that she has met a few people working in robotics before, but she does not remember Alex's name or exactly which lab he was in. She starts looking through UROP listings, lab websites, and cold-emailing professors, even though she has already met someone who might have been able to help her.

2. An aspiring backend engineer, Ralph, meets Faustin, a founder of a chip company, at a hackathon afterparty. They have a nice chat, and Ralph likes the idea of making chips specifically for AI applications, but he is not looking for an internship at the time. Faustin thinks Ralph could be a great culture fit. They connect on LinkedIn but neither has a reason to follow up. Eight months later, Ralph decides he specifically wants to work at a small technical startup. He searches job boards, asks his friends for recommendations, and applies to startups where nobody knows him. He has already forgotten about Faustin and the conversation they had, even though Faustin's company might be exactly the kind of place he is now trying to find.

3. Nina, an engineering student, grabs coffee with Sarah, an upperclassman she met through an entrepreneurship club. They mostly talk about internships, but at some point Sarah mentions that her former roommate Lena worked on hardware manufacturing at an early-stage climate startup. Nina does not care much about hardware manufacturing at the time and forgets the detail. Six months later, Nina is working on a class project and suddenly needs advice about making a small batch of hardware prototypes. She posts in group chats asking whether anyone knows somebody with manufacturing experience. What she has forgotten is not even a direct connection, but a path that already existed in her network: **Nina → Sarah → Lena → hardware manufacturing**.

In all three cases, the student already encountered the person, information, or path they eventually needed. The problem is that the original interaction happened before its value became obvious.

### Corroboration

1. **Maya & Alex — student / researcher | Ralph & Faustin — student / startup founder**
   a. Mark Granovetter's 1973 paper *The Strength of Weak Ties* in the *American Journal of Sociology* shows that acquaintances can have a big impact on an individual's life, and out-of-circle connections can serve as bridges to expertise and opportunities that are not available inside someone's close social circle. A weak connection is why Maya might have access to a robotics lab she otherwise does not know, and why Ralph might already know a founder outside of his usual student network.
   
   b. Dunbar's number describes an approximate constraint on the number of meaningful social relationships people can actively maintain. Students can meet far more people than they can continuously think about or regularly interact with, which makes weak connections much more likely to disappear from attention.

2. **Nina & Sarah & Lena - indirect professional connection**
   
   a. Granovetter's weak-tie argument is particularly relevant here because the useful information may not come from the direct connection herself. Sarah acts as a bridge between Nina's immediate network and Lena's expertise.
   
   b. A professional network therefore cannot always be represented well as a flat list of contacts. Some of its value exists in relationships such as "knows," "worked with," "introduced me to," "worked at," or "knows about."

The interesting tension is that weak connections can be particularly valuable because they connect someone to information outside of their close circle, while those same weak connections are also much easier to forget because people do not interact with them frequently.

For college students, this problem is sharper because both sides of the network are changing quickly: students continuously meet new people while also changing what they want to study, build, research, or work on.

### Workarounds and comparables

#### Topic: mental effort, manual notes, and artefacts (e.g. LinkedIn, email, phone number)

Those are possible workarounds that most students are using right now. They work for small networks and very meaningful connections: friends, family, close co-workers, or acquaintances that can provide immediate value.

LinkedIn and phone contacts are especially good at preserving **who someone is**, but do not necessarily preserve why that person might be relevant later. They also still require the student to remember enough about the person to search for them.

If Maya remembers Alex's name, LinkedIn works perfectly. The problem is the situation where Maya only thinks, "I swear I once met someone working on this."

#### Topic: personal notes / CRMs (Sheets, Notion templates, Clay, Dex)

They let users log new contacts, notes, and sometimes set up reminders; however, they need constant maintenance and looking back.

The student has to decide immediately that somebody is important enough to record, decide which fields or tags describe them, and later remember to return to the database.

This works well for active relationships. It works less well for weak connections precisely because their future value is unclear at the time they are created.

#### Topic: professional CRMs (Affinity, Streak)

Those are more structured and track deal pipelines, hiring pipelines, or progressing professional relationships. They are designed around active connections where the user already knows what they want from the relationship.

A college student normally does not want to create a CRM entry and relationship stage for every interesting person they meet after a seminar or at a hackathon.

#### Topic: AI note-takers

Some people start a Granola or another AI note-taker to record meetings and later query an AI agent about them. This helps preserve what happened in a conversation.

But this only helps if the user knows to record the interaction in advance. Many weak connections happen spontaneously: after a lecture, at a hackathon, during dinner, or while talking to somebody at an event.

More importantly, search still often requires the user to know that an old conversation should be searched.

Circle's problem happens one level earlier: the user may not remember **which past interaction is connected to their current problem at all**.

#### Topic: making a new request (post in a group chat, LinkedIn, ask close friends)

This is what students usually do after the original connection has already been forgotten.

If Nina needs someone who understands hardware manufacturing, she can post in several group chats or ask her friends.

This can work, but it means she is searching the network from scratch, even though a path to the right person might already exist somewhere in her previous interactions.

### Solution sketch

**Circle** is a low-effort tool to capture and resurface professional connections for college students.

The user is able to leave a short ~30-second voice or text memo after meeting someone:

> Toni, robotics PhD. Talked about world models. Her lab sometimes takes undergrads.

No manual categorisation or tagging is needed from the user.

Instead of treating this as only a note attached to a contact, Circle gradually builds a **private personal context graph** from these small interactions.

The graph can contain:

- people;
- organizations;
- topics;
- projects;
- opportunities;
- events;

and relationships between them, for example:

- works on;
- knows;
- worked at;
- introduced me to;
- interested in;
- member of;
- mentioned;
- met at.

So the Alex memo might internally contribute relationships such as:

**Alex → works on → world models**  
**Alex → member of → robotics lab**  
**robotics lab → sometimes offers → undergraduate research**  
**user → met → Alex**

Each relationship should stay linked to the original memo that caused Circle to believe it. Circle should not simply generate a profile about somebody and lose where the information came from.

Later, the user can leave another memo describing something that matters to them now:

> I want to find a robotics UROP for spring.

In the background, Circle compares this new context with the user's previous graph and searches for paths that might be relevant.

It might discover:

**current goal → robotics research → world models ← Alex → robotics lab → undergraduate research**

and bring Alex back into the user's attention:

> You might want to talk to Alex.  
> You met him after a robotics seminar in September. You wrote that he works on world models and that his lab sometimes takes undergraduates.

Similarly, Circle could recover indirect connections:

**need hardware-manufacturing advice ← Lena ← knows ← Sarah ← user**

The user does not need to know Alex's name, remember which conversation contained the relevant information, or manually search through old notes.

Circle also does not automatically contact anybody or decide what the user should do. It only restores context that already existed in the user's life.

The important difference from a CRM is therefore that Circle does not primarily answer:

> "Who do I know?"

It tries to answer:

> **"Have I already encountered someone connected to what I need now?"**

For the first version, Circle only uses information the student explicitly chooses to save. It does not scrape LinkedIn, monitor people's activity online, send emails automatically, or manage the student's entire professional life.

The goal is to make capturing a weak connection effortless and then make the structure hidden across those weak connections useful when the student's circumstances change.