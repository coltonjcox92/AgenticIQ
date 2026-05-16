import { useState } from "react";
import { Heart, Star, Trophy, Lock, ChevronRight, ChevronLeft, Check, X, Zap, Flame, RotateCcw } from "lucide-react";

// ─── QUESTION BANK ────────────────────────────────────────────────────────────
const QB = {
  id:"W1", title:"The Basics", subtitle:"What Is an Agent?", icon:"🤖", color:"#00C8FF",
  lessons:[
    { id:"L1", title:"What Makes Something an Agent?", icon:"🤖", questions:[
      { type:"flashcard", concept:"Agent",
        question:"What property most distinguishes an AI agent from a standard chatbot?",
        options:["Agents use larger language models with more parameters","Agents autonomously plan and execute multi-step actions toward a goal","Agents always have access to the internet","Agents produce longer, more detailed responses"],
        correctIndex:1,
        explanation:"The defining property is goal-directed autonomy across multiple steps — perceiving context, planning actions, executing them, and iterating. A chatbot responds to each input independently without pursuing a goal.",
        wrongExplanations:{0:"Model size is not what makes something an agent — a tiny model in an action loop is more agentic than a huge model that only responds to prompts.",2:"Internet access is a tool, not a defining property. An agent operating on local files is still an agent.",3:"Response length is irrelevant. Agents can be terse — what matters is whether they plan and act toward a goal."}},
      { type:"analogy", concept:"Agent",
        question:"Which analogy best captures what an AI Agent is?",
        options:["A vending machine — insert input, receive fixed output","A calculator — deterministic, one operation at a time","A skilled contractor — given blueprints and keys, manages the whole project to completion","A search engine — retrieves relevant information for a query"],
        correctIndex:2,
        explanation:"The contractor analogy is perfect: you specify the goal (blueprints), provide resources (tools), and the agent plans, coordinates, and executes until the goal is achieved — without you specifying every step.",
        wrongExplanations:{0:"A vending machine is fully deterministic and reactive — the opposite of an agent.",1:"A calculator takes one input, produces one output, with no planning or iteration.",3:"A search engine retrieves information but doesn't plan or execute actions toward a goal."}},
      { type:"spot", concept:"Agentic AI",
        question:"A software system receives 'prepare a competitive analysis report.' It independently searches the web for competitor data, writes Python to analyze pricing trends, generates a chart, drafts a summary, and emails the report — all without further human input. What concept does this demonstrate?",
        options:["A standard chatbot with internet access","Agentic AI — it autonomously decomposes and executes a multi-step goal","A search engine with a report template","Robotic process automation (RPA) following a fixed script"],
        correctIndex:1,
        explanation:"Agentic AI is defined by autonomous goal decomposition and multi-step execution. This system planned its own steps (search → analyze → chart → write → send) without being told how — the hallmark of agentic behavior.",
        wrongExplanations:{0:"A chatbot would answer questions about competitors — it wouldn't autonomously plan a full research workflow.",2:"A search engine retrieves documents; it doesn't write code, generate charts, or send emails.",3:"RPA follows a pre-programmed script. This system chose its own approach to reach the goal."}},
      { type:"flashcard", concept:"Agentic AI",
        question:"Which is the best definition of 'Agentic AI'?",
        options:["Any AI system that can answer questions without internet access","AI systems capable of goal-directed behavior — including planning, tool use, and iterative reasoning","AI models with more than 70 billion parameters","AI systems that generate images and videos autonomously"],
        correctIndex:1,
        explanation:"Agentic AI is defined by the combination of goal-directedness, planning, tool use, and iteration — not model size, modality, or connectivity. The key shift is from 'respond to prompts' to 'achieve goals.'",
        wrongExplanations:{0:"Internet connectivity is irrelevant to whether an AI is agentic.",2:"Parameter count measures model size, not agency. Small models can be highly agentic.",3:"Generating images is a capability, not agency. An image generator without planning or goals is not an agent."}},
      { type:"spot", concept:"Agent vs. Chatbot",
        question:"System A responds to 'summarize this article' with a summary. System B receives 'monitor competitors' pricing weekly, alert me to changes >5%, and update our pricing database.' System B plans a schedule, builds monitoring logic, sets alerts, and runs autonomously. Which is the agent?",
        options:["System A — it uses a more advanced language model","System B — it pursues a persistent goal autonomously across multiple steps and time","Both — any system using an LLM qualifies as an agent","Neither — agents must be physically embodied robots"],
        correctIndex:1,
        explanation:"System B is the agent: it has a persistent goal, autonomously plans and executes actions, and operates across time without per-step human instructions. System A is a capable chatbot — impressive, but reactive rather than goal-directed.",
        wrongExplanations:{0:"Model quality doesn't determine agency. System B is agentic regardless of which LLM it uses.",2:"Using an LLM is necessary but not sufficient. System A uses an LLM but lacks autonomous goal-pursuit.",3:"Physical embodiment is not required. Software agents are the dominant form of agentic AI today."}},
    ]},
    { id:"L2", title:"Goals vs. Instructions", icon:"🎯", questions:[
      { type:"flashcard", concept:"Goal / Objective",
        question:"In agent design, what is the key difference between a 'goal' and an 'instruction'?",
        options:["Goals are written in Python; instructions are written in English","A goal defines the desired outcome; an instruction specifies an exact step to take","Goals are long-term; instructions are always completed instantly","There is no meaningful difference — they are interchangeable terms"],
        correctIndex:1,
        explanation:"A goal says what to achieve ('increase retention 10%'). An instruction says what to do ('send this email to these customers'). Agents work from goals, not instructions — they decide their own steps.",
        wrongExplanations:{0:"Neither goals nor instructions are tied to a specific language.",2:"Time duration is not the distinction. A short instruction and a long goal can exist at any timescale.",3:"The difference is fundamental: goals leave method open; instructions prescribe it."}},
      { type:"analogy", concept:"Task Decomposition",
        question:"Which analogy best describes 'Task Decomposition' — breaking a goal into executable sub-tasks?",
        options:["A GPS calculating a route — one path, no alternatives","A general contractor splitting a renovation into separate work orders for each trade","A microwave heating food — fixed process, same every time","A library organizing books alphabetically"],
        correctIndex:1,
        explanation:"The general contractor nails it: given a high-level goal (renovate the kitchen), they break it into specialized work orders (plumbing, electrical, drywall, painting) that can be assigned, parallelized, and tracked independently.",
        wrongExplanations:{0:"A GPS finds a route but doesn't decompose a goal into sub-tasks handled by different specialists.",2:"A microwave executes a fixed process — no decomposition, no adaptation.",3:"Alphabetical organization is sorting, not goal decomposition."}},
      { type:"spot", concept:"Goal-Directed Behavior",
        question:"A user says 'grow our newsletter subscribers.' The AI independently researches acquisition best practices, identifies the top 3 channels for the company's industry, drafts an A/B test plan, creates signup form copy, and schedules a 4-week experiment — without being asked for each step. What is this?",
        options:["Instruction-following — the system did exactly what it was told","Goal-directed behavior — the system planned its own steps to achieve the stated outcome","Hallucination — the system invented tasks that weren't requested","Retrieval-augmented generation (RAG)"],
        correctIndex:1,
        explanation:"Goal-directed behavior: given an outcome, the agent plans and executes its own path. The user didn't ask for an A/B test — the agent decided that was the right approach. No per-step instructions were given.",
        wrongExplanations:{0:"Instruction-following means doing what you're told, step by step. This agent chose its own steps.",2:"Hallucination is generating false information. Planning legitimate steps toward a real goal is not hallucination.",3:"RAG is a retrieval pattern. While search may have been used, the key concept here is goal-directed planning."}},
      { type:"flashcard", concept:"Task Decomposition",
        question:"Why is task decomposition important in agentic systems?",
        options:["It reduces the number of tokens used in each prompt","It enables specialization, parallelism, and easier error recovery on complex goals","It prevents the agent from using external tools","It ensures the agent always asks a human before acting"],
        correctIndex:1,
        explanation:"Decomposing complex goals enables: assigning each sub-task to a specialist, running independent sub-tasks in parallel, and recovering from failures in one area without restarting the entire workflow.",
        wrongExplanations:{0:"Decomposition typically uses more tokens — but quality and reliability improvements justify the cost.",2:"Decomposition has nothing to do with tool access. Tools are used within sub-tasks.",3:"Human oversight (HITL) is a separate design decision, independent of decomposition."}},
      { type:"spot", concept:"Instruction vs. Goal",
        question:"An agent receives: 'Query the sales database, filter for Q2 2026, sum the revenue column, and return the total.' It does exactly that — nothing more, nothing less.",
        options:["This agent is following instructions — every step was prescribed with no autonomy over method","This demonstrates strong goal-directed behavior","This demonstrates hallucination prevention through grounding","This is an example of a multi-agent handoff"],
        correctIndex:0,
        explanation:"When every step is pre-specified, the system is following instructions, not pursuing a goal. This is often safer and more predictable. Recognizing the difference helps you choose the right level of autonomy for the task.",
        wrongExplanations:{1:"Goal-directed behavior requires the agent to choose its own steps. Here, every step was prescribed.",2:"Grounding is about connecting reasoning to real-world data — a separate concept from goal-setting.",3:"A handoff involves passing control from one agent to another — not present here."}},
    ]},
    { id:"L3", title:"The Autonomy Spectrum", icon:"⚙️", questions:[
      { type:"flashcard", concept:"Autonomy Levels",
        question:"What does 'autonomy level' describe in an agentic AI system?",
        options:["How many parameters the underlying language model has","The degree to which the agent acts independently vs. requiring human involvement","The speed at which the agent processes requests","Whether the agent has access to the internet"],
        correctIndex:1,
        explanation:"Autonomy level describes how independently an agent operates — from 'humans approve every action' at one extreme to 'fully autonomous, no checkpoints' at the other. Choosing the right level is one of the most important architectural decisions.",
        wrongExplanations:{0:"Model size affects capability, not autonomy level. A small model can be given full autonomy.",2:"Processing speed is a performance metric, not an autonomy characteristic.",3:"Internet access is a tool capability, not an autonomy level."}},
      { type:"analogy", concept:"Autonomy Levels",
        question:"The spec compares autonomy levels to driving modes. Which mapping is correct?",
        options:["Manual driving = fully autonomous agent; fully self-driving = human-in-the-loop","Manual driving = human-in-the-loop (HITL); fully self-driving = fully autonomous agent","Adaptive cruise control = fully autonomous; manual = supervised automation","All driving modes map to the same autonomy level — speed is the only difference"],
        correctIndex:1,
        explanation:"Manual driving (human controls everything) maps to HITL. Adaptive cruise (car assists, human steers) maps to supervised automation. Fully self-driving (no human needed) maps to a fully autonomous agent.",
        wrongExplanations:{0:"This reverses the mapping. Human involvement is highest in manual driving, just as HITL has the highest human involvement.",2:"Adaptive cruise assists but doesn't remove human control — it maps to supervised automation, not full autonomy.",3:"The driving analogy is specifically about degree of human control, not speed."}},
      { type:"spot", concept:"Human-in-the-Loop (HITL)",
        question:"A financial trading agent researches opportunities and drafts recommendations autonomously. But before executing any trade, it pauses and sends a summary to a human trader for approval. Trades under $500 are auto-approved; trades over $500 always require human sign-off. What pattern is this?",
        options:["Fully autonomous — it does all research independently","Human-in-the-loop (HITL) with a conditional risk-based approval checkpoint","Instruction-following — the human controls every step","Multi-agent — the human acts as one of the agents"],
        correctIndex:1,
        explanation:"HITL means human oversight is built into the workflow at defined points — here, at the execution decision with a risk threshold ($500). The agent is autonomous for research and drafting, but humans gate the high-stakes actions.",
        wrongExplanations:{0:"Fully autonomous means no human checkpoints. This system has explicit human gates for execution.",2:"Instruction-following means humans specify each step. The human only approves final execution here.",3:"A multi-agent system uses multiple AI agents. A human reviewer is HITL, not a second agent."}},
      { type:"flashcard", concept:"Human-in-the-Loop",
        question:"When is Human-in-the-Loop (HITL) most valuable in an agentic system?",
        options:["When the task is very simple and low-risk","When actions are irreversible, high-stakes, or the agent's confidence is low","Only when the agent is using external tools","HITL is never valuable — it defeats the purpose of automation"],
        correctIndex:1,
        explanation:"HITL checkpoints are most valuable when the cost of error is high: irreversible actions (sending emails, executing trades, deleting data), high-stakes decisions, or situations outside the agent's training distribution. HITL is a feature, not a failure.",
        wrongExplanations:{0:"Low-risk, simple tasks are where full automation is safest — HITL overhead is unnecessary there.",2:"HITL can be valuable even without external tools — for example, reviewing generated content before publishing.",3:"The best systems combine autonomous execution for routine tasks with human oversight for high-consequence decisions."}},
      { type:"spot", concept:"Autonomy Levels",
        question:"Agent X drafts an email, shows it to the user, waits for approval, then sends it. Agent Y receives a task, then drafts and sends emails, books meetings, updates the CRM, and files reports — all within policy, with no human interaction unless something fails. Which has higher autonomy?",
        options:["Agent X — it generates content independently","Agent Y — it executes the full workflow without human checkpoints","Both have the same autonomy level — they use the same LLM","Agent X — the user sees the output before it's sent"],
        correctIndex:1,
        explanation:"Autonomy is measured by independence from human oversight in the action loop. Agent Y completes the full workflow without pausing for approval. Agent X requires human approval before every send action — significantly less autonomous.",
        wrongExplanations:{0:"Generating content independently is a capability, not an autonomy level. The key question is whether a human gates the action.",2:"The underlying LLM is irrelevant to autonomy level. The architecture of checkpoints determines autonomy.",3:"User visibility of output doesn't determine autonomy — what matters is whether the user must approve before actions proceed."}},
    ]},
    { id:"L4", title:"The Observe–Plan–Act–Reflect Loop", icon:"🔄", questions:[
      { type:"flashcard", concept:"Execution Loop",
        question:"What is the core 'execution loop' of an agentic AI system?",
        options:["Train → Evaluate → Deploy → Monitor","Input → Tokenize → Embed → Generate","Observe → Plan → Act → Reflect → Repeat","Query → Retrieve → Rank → Return"],
        correctIndex:2,
        explanation:"The execution loop (Observe → Plan → Act → Reflect → Repeat) is the fundamental operational cycle. Observe: gather context. Plan: decide next action. Act: execute it. Reflect: evaluate the result. Repeat until the goal is achieved.",
        wrongExplanations:{0:"Train → Evaluate → Deploy → Monitor describes the ML model development lifecycle, not the agent's runtime loop.",1:"Input → Tokenize → Embed → Generate describes a single LLM inference call, not the iterative agent loop.",3:"Query → Retrieve → Rank → Return describes a search engine step, not an agent's full action cycle."}},
      { type:"analogy", concept:"Execution Loop",
        question:"The Execution Loop mirrors which real-world decision-making framework?",
        options:["The Scientific Method — hypothesize, test, repeat","The OODA Loop (Observe, Orient, Decide, Act) from military strategy","Agile sprints — plan two weeks, execute, retrospect","The Socratic Method — question assumptions until truth emerges"],
        correctIndex:1,
        explanation:"The OODA Loop (developed by military strategist John Boyd) is the direct conceptual ancestor: Observe → Orient → Decide → Act → loop. Agentic AI's Observe-Plan-Act-Reflect is a direct parallel, designed for operating under uncertainty.",
        wrongExplanations:{0:"The Scientific Method tests hypotheses over long timeframes — not real-time decision cycles at millisecond speed.",2:"Agile sprints operate over weeks, not per-action cycles. Too slow for agent execution.",3:"The Socratic Method is a dialogue technique for revealing truth, not an action loop."}},
      { type:"spot", concept:"Reflection",
        question:"A coding agent generates a SQL query, then reads it back and thinks: 'This query joins on customer_id but the schema uses user_id — I need to fix that.' It corrects the query, then executes the corrected version. Which step of the execution loop is this?",
        options:["Observe — the agent is gathering information from the schema","Act — the agent is executing the query","Reflect — the agent is evaluating its own output before committing","Plan — the agent is deciding what to do next"],
        correctIndex:2,
        explanation:"Reflection (self-critique) is when the agent evaluates its own outputs — checking correctness before or after acting. Catching its own bug by reviewing the query before execution is a textbook reflection step.",
        wrongExplanations:{0:"Observe is gathering external context (reading the schema) — not evaluating own generated output.",1:"Act would be executing the query. The agent paused before execution to self-correct.",3:"Plan is decomposing the goal into steps. The agent had already planned to write SQL — this checks the quality of that output."}},
      { type:"spot", concept:"Planning",
        question:"Before writing a single line of code, an agent reads a feature request, reviews the codebase structure, identifies which files will change, determines the order of edits to avoid breaking dependencies, and lists 7 specific changes to make in sequence. Which execution loop step is this?",
        options:["Observe — the agent is reading the codebase","Reflect — the agent is evaluating a previous output","Plan — the agent is decomposing the goal into an ordered action sequence","Act — the agent is making changes to the code"],
        correctIndex:2,
        explanation:"Planning is the deliberate decomposition of a goal into an ordered sequence of executable actions before any action is taken. The agent hasn't touched the code yet — it's planning the full sequence first, like a surgeon's pre-operative review.",
        wrongExplanations:{0:"Reading the codebase is Observe. But identifying what needs to change and in what order crosses into Planning.",1:"Reflect evaluates outputs that already exist. No code has been written here yet.",3:"Act means executing an action. The agent hasn't changed any code — it's still in the planning phase."}},
      { type:"flashcard", concept:"Planning",
        question:"What is the purpose of the 'Plan' step in an agent's execution loop?",
        options:["To generate the final output returned to the user","To decide which model to use for the next inference call","To decompose the goal into an ordered sequence of executable sub-tasks","To retrieve relevant documents from the vector database"],
        correctIndex:2,
        explanation:"Planning converts a high-level goal into a concrete action sequence. Like a chef staging ingredients before cooking — planning prevents reactive, error-prone execution by thinking the full path through first.",
        wrongExplanations:{0:"Generating final output typically happens in the Act step. Planning precedes action.",1:"Model selection is an infrastructure/routing concern, not part of the execution loop's planning step.",3:"Document retrieval is part of the Observe step — gathering context before planning or acting."}},
    ]},
    { id:"L5", title:"When Agents Go Wrong", icon:"⚠️", questions:[
      { type:"flashcard", concept:"Hallucination",
        question:"What is 'hallucination' in the context of AI agents?",
        options:["When the agent generates responses that are too creative or imaginative","When the agent produces plausible-sounding but factually incorrect or fabricated content","When the agent repeats the same response multiple times in a loop","When the agent misunderstands the user's goal and pursues the wrong objective"],
        correctIndex:1,
        explanation:"Hallucination is the generation of confident-sounding content that is factually wrong or simply invented — fabricated citations, made-up statistics, non-existent APIs. In agentic systems, hallucinated 'facts' can propagate across many steps before being caught.",
        wrongExplanations:{0:"Creativity or imagination in valid outputs is not hallucination. Hallucination specifically means factual incorrectness or fabrication.",2:"Repetition loops are a different failure mode — related to memory/state management, not hallucination.",3:"Pursuing the wrong objective is a goal alignment problem, not hallucination."}},
      { type:"analogy", concept:"Hallucination",
        question:"Which analogy best captures why hallucination is especially dangerous in agentic AI?",
        options:["A typo in a text message — minor, easily noticed, quickly corrected","A confident intern who answers every question authoritatively — even when they don't know — and whose risk grows with their scope of responsibility","A calculator that rounds to 2 decimal places — small precision loss, predictable","A slow internet connection — frustrating but the content that arrives is correct"],
        correctIndex:1,
        explanation:"The intern analogy captures two key dangers: (1) confidence masks ignorance, and (2) scope amplifies risk. A confidently wrong intern is manageable checking email — catastrophic filing legal documents or executing trades. Agent scope amplifies hallucination risk.",
        wrongExplanations:{0:"A typo is visible and self-contained. Hallucinations are often invisible and cascade through multi-step workflows.",2:"Rounding is predictable and bounded. Hallucination is unpredictable and can fabricate entire facts or sources.",3:"Network latency produces correct content slowly. Hallucination produces incorrect content confidently."}},
      { type:"spot", concept:"Hallucination",
        question:"A research agent is asked about a drug interaction. It responds: 'According to the 2024 Chen et al. study in the Journal of Clinical Pharmacology, this combination causes a 23% increase in adverse events.' The journal, the authors, and the study do not exist.",
        options:["Grounding — the agent cited a specific source","Retrieval-augmented generation — the agent fetched from its knowledge base","Hallucination — the agent fabricated a plausible but entirely non-existent citation","A planning failure — the agent should have searched for the study first"],
        correctIndex:2,
        explanation:"Hallucination in its most dangerous form: a realistic-sounding citation (authors, year, journal, specific statistic) that is entirely fabricated. In a medical context, this can cause direct harm. Grounding — verifying against real sources — is the mitigation.",
        wrongExplanations:{0:"Grounding means connecting to verifiable real-world information. Citing a non-existent source is the opposite of grounding.",1:"RAG retrieves real documents from a knowledge base. The agent invented this citation rather than retrieving it.",3:"While a planning failure contributed, the specific concept demonstrated is hallucination — fabrication of false content with false confidence."}},
      { type:"flashcard", concept:"Grounding",
        question:"What does 'grounding' mean in the context of an AI agent?",
        options:["Preventing the agent from accessing external tools or databases","Training the model on domain-specific data to improve accuracy","Connecting the agent's reasoning to verifiable real-world information, reducing reliance on training data alone","Limiting the agent's response length to prevent over-generation"],
        correctIndex:2,
        explanation:"Grounding means anchoring outputs to verified, real-world information sources — via retrieval, tool calls, or direct observation — rather than relying solely on patterns in training data. Grounded claims can be checked; hallucinated claims cannot.",
        wrongExplanations:{0:"Blocking external access would prevent grounding. Grounding requires connecting to external information.",1:"Fine-tuning improves base capabilities but doesn't prevent hallucination for facts that change or aren't in training data.",3:"Response length has nothing to do with grounding. A very short hallucination is still a hallucination."}},
      { type:"spot", concept:"Grounding",
        question:"A financial agent is asked for NVDA's current stock price. Rather than recalling a number from training data, it calls a live market data API, receives the real-time price, and responds: 'NVDA is $138.42 as of 14:32 UTC, per Bloomberg Market Data.'",
        options:["Hallucination — the agent is making up a specific number","Grounding — the agent verified the claim through a real-time external source before stating it","Planning — the agent chose the right sequence of actions","Reflection — the agent is evaluating whether its answer is correct"],
        correctIndex:1,
        explanation:"Grounding: instead of generating a plausible stock price from training memory (which could be months out of date), the agent called a live data source, verified the real value, and cited the source and timestamp. The claim is now checkable — the definition of grounded.",
        wrongExplanations:{0:"Hallucination is fabricating content. The agent retrieved the price from a real API — the opposite of hallucination.",2:"Planning would have been deciding to call the API. The demonstrated concept is the actual verification behavior — grounding.",3:"Reflect is self-evaluating own outputs. This is about where the data came from, not self-evaluation."}},
    ]},
  ],
  boss:{
    title:"The Agent Audit", icon:"👑",
    narrative:["You've been hired as an AI consultant by Meridian Technology Partners.","Three client teams claim to have built 'AI agents' and want your validation before presenting to their board.","Apply everything from World 1 to assess each system honestly. The board is watching."],
    questions:[
      { type:"spot", concept:"Agent Definition",
        setup:"System A — TaxBot: A chatbot that answers tax questions. The user types a question, the LLM consults training data, and generates a response. No tools, no memory between sessions, no goal tracking.",
        question:"Does TaxBot qualify as an AI agent?",
        options:["Yes — it uses a large language model","No — it lacks goals, tools, and a multi-step action loop","Yes — it has a user interface and responds to queries","Partially — it just needs internet access to qualify"],
        correctIndex:1,
        explanation:"TaxBot is a capable chatbot, but not an agent. It lacks the defining properties: no persistent goal, no tool use, no action loop, no iterative execution. Each interaction is independent and reactive.",
        consequence:"The TaxBot team is disappointed — but you've saved them from misrepresenting their product to the board."},
      { type:"spot", concept:"Agentic AI",
        setup:"System B — ReportWriter: Given a monthly data file, it automatically (1) loads the CSV, (2) runs Python analysis, (3) generates a chart, (4) drafts a Word report, (5) emails stakeholders. Runs every Monday with no human involvement.",
        question:"Does ReportWriter qualify as an AI agent?",
        options:["No — it just runs a fixed, pre-programmed script","Yes — it autonomously executes a multi-step goal without human involvement","Partially — it would need persistent memory to fully qualify","No — agents must use an LLM at each step"],
        correctIndex:1,
        explanation:"ReportWriter is agentic: clear goal (produce and deliver the monthly report), autonomous multi-step execution, and multiple tools (Python, charting, email). The Monday trigger is its observation step.",
        consequence:"ReportWriter checks out. You recommend adding a reflection step to auto-validate the report quality before sending."},
      { type:"spot", concept:"Human-in-the-Loop",
        setup:"System C — SupportBot Pro: Handles customer issues end-to-end. Processes refunds ≤$50 autonomously. Refunds $50–$200 go to a human for approval. Refunds >$200 always escalate to a senior agent. Logs every interaction automatically.",
        question:"Which autonomy pattern does SupportBot Pro demonstrate?",
        options:["Fully autonomous — handles all refunds without human involvement","Human-in-the-loop with risk-based conditional checkpoints","Fully manual — a human approves every single action","Multi-agent — the human reviewer is a second AI agent"],
        correctIndex:1,
        explanation:"SupportBot Pro uses HITL with tiered risk thresholds: autonomy for low risk ($0–$50), conditional approval for medium risk ($50–$200), mandatory escalation for high risk ($200+). This is textbook risk-proportionate HITL design.",
        consequence:"Most mature design of the three. You recommend adding tracing so every automated refund has an auditable rationale."},
      { type:"spot", concept:"Goal-Directed Behavior",
        setup:"The TaxBot team upgrades: they add a web search tool, conversation history, and a persistent goal: 'Help this user minimize tax liability legally and file accurately.' Now TaxBot researches current tax law, remembers the user's situation, and autonomously plans a multi-session filing strategy.",
        question:"Which single change most fundamentally transformed TaxBot into an agent?",
        options:["Adding the web search tool — tools are what define agents","Adding conversation history — memory is what makes an agent","A persistent goal combined with multi-step action capability to pursue it","Connecting to real-time tax law data"],
        correctIndex:2,
        explanation:"The goal is what transforms a capable tool into an agent. Memory without a goal is just storage. Tools without a goal are just features. 'Something to achieve' + 'multi-step capability to achieve it' = agency.",
        consequence:"The board is impressed. You caution that with real goal-pursuit comes real responsibility — hallucination in tax advice has legal consequences. Grounding and audit trails are now critical."},
      { type:"spot", concept:"Goal Misalignment",
        setup:"A trading agent is given the goal: 'Maximize the number of trades closed per day.' After two weeks, compliance discovers it's executing micro-trades — buying and selling the same position within seconds — technically 'closing' dozens of trades while creating no investment value and generating significant transaction fees.",
        question:"What is the primary failure concept demonstrated?",
        options:["Hallucination — the agent invented trades that didn't happen","Context window overflow — the agent forgot its original instructions","Goal misalignment — the proxy metric (trades closed) diverged from the true objective (investment returns)","Missing grounding — the agent lacked real market data"],
        correctIndex:2,
        explanation:"Goal misalignment: the agent optimized perfectly for what it was measured on (trades closed) rather than what was intended (investment value). The metric was a flawed proxy. One of the most common and dangerous failure modes in production agents.",
        consequence:"Compliance freezes the system. You recommend redefining the goal as 'maximize risk-adjusted returns within policy bounds' and adding a HITL checkpoint for any unusual trade pattern."},
    ],
  },
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const XP_MAP = { flashcard:10, analogy:10, spot:15 };
const TYPE_COLORS = { flashcard:"#00C8FF", analogy:"#A855F7", spot:"#FFB700" };
const TYPE_LABELS = { flashcard:"FLASHCARD", analogy:"ANALOGY MATCH", spot:"SPOT THE CONCEPT" };
const LEVELS = [
  {min:0,    title:"Observer"},
  {min:200,  title:"Prompt Engineer"},
  {min:600,  title:"Tool Caller"},
  {min:1200, title:"Orchestrator"},
  {min:2400, title:"Architect"},
];
const getLevel = xp => [...LEVELS].reverse().find(l => xp >= l.min)?.title ?? "Observer";
const getStars = lost => lost === 0 ? 3 : lost === 1 ? 2 : 1;

// ─── STYLES ──────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800&family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Share+Tech+Mono&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #060D18; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #060D18; } ::-webkit-scrollbar-thumb { background: #1A3050; border-radius: 2px; }
  @keyframes slideUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
  @keyframes correctFlash { 0%{background:rgba(0,232,160,0.0)} 30%{background:rgba(0,232,160,0.18)} 100%{background:rgba(0,232,160,0.07)} }
  @keyframes wrongFlash { 0%{background:rgba(255,64,96,0.0)} 30%{background:rgba(255,64,96,0.18)} 100%{background:rgba(255,64,96,0.07)} }
  @keyframes xpFloat { 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-36px) scale(1.3)} }
  @keyframes starPop { 0%{transform:scale(0) rotate(-20deg);opacity:0} 65%{transform:scale(1.2) rotate(4deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes glowPulse { 0%,100%{box-shadow:0 0 15px rgba(0,200,255,0.25),0 0 30px rgba(0,200,255,0.08)} 50%{box-shadow:0 0 25px rgba(0,200,255,0.45),0 0 50px rgba(0,200,255,0.18)} }
  @keyframes bossIn { 0%{opacity:0;transform:scale(0.94) translateY(10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes heartBreak { 0%{transform:scale(1)} 30%{transform:scale(1.3)} 60%{transform:scale(0.9)} 100%{transform:scale(1)} }
  @keyframes streakBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }
  .opt-btn { transition: all 0.15s ease; border:1.5px solid #1A3050; background:#0C1A2E; border-radius:12px; padding:14px 18px; text-align:left; cursor:pointer; width:100%; font-family:'Karla',sans-serif; font-size:15px; color:#C8DCF0; display:flex; align-items:center; gap:12px; }
  .opt-btn:hover { border-color:#00C8FF; background:#0F2040; transform:translateX(3px); }
  .opt-btn:active { transform:scale(0.98); }
  .opt-btn.correct { border-color:#00E8A0; background:rgba(0,232,160,0.1); color:#00E8A0; animation:correctFlash 0.6s ease; }
  .opt-btn.wrong { border-color:#FF4060; background:rgba(255,64,96,0.1); color:#FF4060; animation:shake 0.45s ease,wrongFlash 0.6s ease; }
  .opt-btn.reveal { border-color:#00E8A0; background:rgba(0,232,160,0.07); color:#00E8A0; }
  .opt-btn.disabled { cursor:default; opacity:0.6; }
  .opt-btn.disabled:hover { border-color:#1A3050; background:#0C1A2E; transform:none; }
  .lesson-row { transition:all 0.15s ease; border:1px solid #1A3050; background:#0A1628; border-radius:10px; padding:14px 16px; cursor:pointer; display:flex; align-items:center; gap:12px; }
  .lesson-row:hover { border-color:#00C8FF; background:#0F2040; }
  .lesson-row.locked { cursor:default; opacity:0.45; }
  .lesson-row.locked:hover { border-color:#1A3050; background:#0A1628; }
  .nav-btn { transition:all 0.15s ease; border:none; border-radius:8px; cursor:pointer; font-family:'Orbitron',monospace; font-size:12px; letter-spacing:0.08em; }
  .nav-btn:hover { filter:brightness(1.15); transform:translateY(-1px); }
  .nav-btn:active { transform:scale(0.97); }
  .world-card { transition:all 0.2s ease; border-radius:16px; cursor:pointer; }
  .world-card:hover { transform:translateY(-3px); }
`;

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [st, set] = useState({
    screen:"worldMap",
    xp:0, streak:0,
    hearts:3, heartsLostInLesson:0,
    currentLesson:0, currentQuestion:0,
    lessonStars:[0,0,0,0,0],
    bossUnlocked:false,
    bossQuestion:0, bossCorrect:0,
    bossComplete:false, bossScore:0,
    feedback:null,
    showXp:false, xpJustEarned:0,
  });
  const [animKey, setAnimKey] = useState(0);
  const bump = () => setAnimKey(k => k+1);

  // ── actions ──────────────────────────────────────────────────
  const go = (screen, extra={}) => { set(s=>({...s,screen,...extra})); bump(); };

  const startLesson = (idx) => go("question",{currentLesson:idx,currentQuestion:0,hearts:3,heartsLostInLesson:0,feedback:null});

  const answerQ = (idx) => {
    const q = QB.lessons[st.currentLesson].questions[st.currentQuestion];
    const correct = idx === q.correctIndex;
    const bonus = st.streak>=4?5:st.streak>=2?2:0;
    const xpEarned = correct ? XP_MAP[q.type]+bonus : 0;
    const wrongExp = !correct && q.wrongExplanations ? q.wrongExplanations[idx] : null;
    set(s=>({...s,
      screen:"feedback",
      xp:s.xp+xpEarned,
      hearts:correct?s.hearts:Math.max(0,s.hearts-1),
      heartsLostInLesson:correct?s.heartsLostInLesson:s.heartsLostInLesson+1,
      streak:correct?s.streak+1:0,
      xpJustEarned:xpEarned,
      feedback:{correct,explanation:q.explanation,wrongExplanation:wrongExp,xpEarned,selectedIndex:idx,correctIndex:q.correctIndex},
    }));
  };

  const afterFeedback = () => {
    const lesson = QB.lessons[st.currentLesson];
    const isLast = st.currentQuestion >= lesson.questions.length-1;
    if(isLast){ set(s=>{
      const stars=[...s.lessonStars];
      stars[s.currentLesson]=getStars(s.heartsLostInLesson);
      const allDone=stars.every(x=>x>0);
      return{...s,screen:"lessonComplete",lessonStars:stars,bossUnlocked:allDone,feedback:null};
    }); bump(); }
    else go("question",{currentQuestion:st.currentQuestion+1,feedback:null});
  };

  const afterLessonComplete = () => go("lessonList",{hearts:3,heartsLostInLesson:0,feedback:null});

  const startBoss = () => go("bossQuestion",{bossQuestion:0,bossCorrect:0,hearts:5,feedback:null});

  const answerBoss = (idx) => {
    const q = QB.boss.questions[st.bossQuestion];
    const correct = idx===q.correctIndex;
    set(s=>({...s,screen:"bossFeedback",
      bossCorrect:s.bossCorrect+(correct?1:0),
      feedback:{correct,explanation:q.explanation,consequence:q.consequence,selectedIndex:idx,correctIndex:q.correctIndex},
    }));
  };

  const afterBossFeedback = () => {
    const isLast = st.bossQuestion >= QB.boss.questions.length-1;
    if(isLast){
      const score=Math.round(((st.bossCorrect+(st.feedback?.correct?1:0))/QB.boss.questions.length)*100);
      const xpBonus=score>=100?150:score>=80?120:100;
      set(s=>({...s,screen:"bossComplete",bossScore:score,bossComplete:true,xp:s.xp+xpBonus,feedback:null}));
      bump();
    } else go("bossQuestion",{bossQuestion:st.bossQuestion+1,feedback:null});
  };

  // ── shared ui pieces ──────────────────────────────────────────
  const HeartsRow = ({count=st.hearts,max=3}) => (
    <div style={{display:"flex",gap:4}}>
      {Array.from({length:max}).map((_,i)=>(
        <Heart key={i} size={18} fill={i<count?"#FF4060":"none"} color={i<count?"#FF4060":"#2A4060"} />
      ))}
    </div>
  );

  const TypeBadge = ({type,isBoss=false}) => (
    <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,fontWeight:600,letterSpacing:"0.12em",
      color:isBoss?"#FFB700":(TYPE_COLORS[type]||"#00C8FF"),
      background:isBoss?"rgba(255,183,0,0.12)":`rgba(${type==="spot"?"255,183,0":type==="analogy"?"168,85,247":"0,200,255"},0.1)`,
      padding:"3px 8px",borderRadius:4,border:`1px solid ${isBoss?"rgba(255,183,0,0.3)":`rgba(${type==="spot"?"255,183,0":type==="analogy"?"168,85,247":"0,200,255"},0.25)`}`}}>
      {isBoss?"BOSS SCENARIO":(TYPE_LABELS[type]||type.toUpperCase())}
    </span>
  );

  const ConceptTag = ({c}) => (
    <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#7899AA",letterSpacing:"0.06em"}}>
      {c}
    </span>
  );

  const optLabel = ["A","B","C","D"];

  // ── OPTIONS (shared between Q and Boss) ───────────────────────
  const OptionsPanel = ({question, onAnswer, disabled, feedback, isBoss=false}) => {
    const q = question;
    return(
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.options.map((opt,i)=>{
          let cls="opt-btn";
          if(disabled){
            cls+=" disabled";
            if(feedback){
              if(i===q.correctIndex) cls+=" reveal";
              else if(i===feedback.selectedIndex) cls+=feedback.correct?" reveal":" wrong";
            }
          }
          return(
            <button key={i} className={cls} onClick={()=>!disabled&&onAnswer(i)}>
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:13,color:"#4A7090",minWidth:20,flexShrink:0}}>{optLabel[i]}</span>
              <span style={{flex:1,lineHeight:1.45}}>{opt}</span>
              {disabled&&feedback&&i===q.correctIndex&&<Check size={16} color="#00E8A0" style={{flexShrink:0}}/>}
              {disabled&&feedback&&!feedback.correct&&i===feedback.selectedIndex&&<X size={16} color="#FF4060" style={{flexShrink:0}}/>}
            </button>
          );
        })}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // SCREENS
  // ─────────────────────────────────────────────────────────────

  // ── WORLD MAP ────────────────────────────────────────────────
  const WorldMap = () => {
    const level = getLevel(st.xp);
    const lockedWorlds = ["The Brain","Memory Palace","Tool Shed","Pattern Library","The Crew","The Factory","The Watchtower"];
    return(
      <div key={animKey} style={{minHeight:"100vh",background:"#060D18",backgroundImage:"radial-gradient(circle,rgba(0,200,255,0.055) 1px,transparent 1px)",backgroundSize:"28px 28px",display:"flex",flexDirection:"column",alignItems:"center",padding:"0 0 40px"}}>
        {/* header */}
        <div style={{width:"100%",maxWidth:580,padding:"28px 24px 0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:"'Orbitron',monospace",fontSize:22,fontWeight:800,color:"#00C8FF",letterSpacing:"0.08em",textShadow:"0 0 20px rgba(0,200,255,0.5)"}}>AGENTIQ</span>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <Zap size={14} color="#FFB700" fill="#FFB700"/>
                <span style={{fontFamily:"'Share Tech Mono',monospace",color:"#FFB700",fontSize:16,fontWeight:600}}>{st.xp} XP</span>
              </div>
              <span style={{fontFamily:"'Orbitron',monospace",fontSize:9,color:"#4A7090",letterSpacing:"0.1em"}}>{level.toUpperCase()}</span>
            </div>
          </div>
          {/* progress bar to next level */}
          <div style={{marginTop:8,height:2,background:"#0F2040",borderRadius:2}}>
            <div style={{height:"100%",background:"linear-gradient(90deg,#00C8FF,#A855F7)",borderRadius:2,width:`${Math.min(100,(st.xp%200)/2)}%`,transition:"width 0.5s ease"}}/>
          </div>
        </div>

        <div style={{width:"100%",maxWidth:580,padding:"32px 24px 0"}}>
          {/* W1 featured card */}
          <div className="world-card" onClick={()=>go("lessonList")}
            style={{background:"linear-gradient(135deg,#0A1E35 0%,#0F2A48 60%,#0A1E35 100%)",border:"1.5px solid rgba(0,200,255,0.35)",padding:"28px 24px",marginBottom:20,animation:"glowPulse 3s ease-in-out infinite",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-40,right:-40,width:140,height:140,background:"radial-gradient(circle,rgba(0,200,255,0.12),transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <span style={{fontSize:28}}>🤖</span>
                  <div>
                    <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#00C8FF",letterSpacing:"0.1em",marginBottom:2}}>WORLD 1 · UNLOCKED</div>
                    <div style={{fontFamily:"'Orbitron',monospace",fontSize:18,fontWeight:700,color:"#E8F4FF",letterSpacing:"0.04em"}}>The Basics</div>
                  </div>
                </div>
                <p style={{fontFamily:"'Karla',sans-serif",fontSize:14,color:"#7899AA",lineHeight:1.5,marginBottom:16}}>What is an Agent?</p>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {QB.lessons.map((l,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:4}}>
                      <span style={{fontSize:12}}>{l.icon}</span>
                      {st.lessonStars[i]>0
                        ? <div style={{display:"flex",gap:1}}>{[...Array(st.lessonStars[i])].map((_,j)=><Star key={j} size={10} fill="#FFB700" color="#FFB700"/>)}</div>
                        : <div style={{width:30,height:6,background:"#1A3050",borderRadius:3}}/>}
                    </div>
                  ))}
                </div>
              </div>
              <ChevronRight size={24} color="#00C8FF" style={{flexShrink:0,marginTop:4}}/>
            </div>
            {st.bossComplete && <div style={{marginTop:16,padding:"8px 12px",background:"rgba(255,183,0,0.1)",border:"1px solid rgba(255,183,0,0.3)",borderRadius:8,display:"flex",alignItems:"center",gap:6}}>
              <Trophy size={14} color="#FFB700" fill="#FFB700"/>
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#FFB700"}}>BOSS DEFEATED · {st.bossScore}% SCORE</span>
            </div>}
          </div>

          {/* locked worlds grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {lockedWorlds.slice(0,4).map((w,i)=>(
              <div key={i} style={{background:"#080F1C",border:"1px solid #0F1E30",borderRadius:12,padding:"16px 14px",opacity:0.5}}>
                <Lock size={14} color="#2A4060" style={{marginBottom:8}}/>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,color:"#2A4060",letterSpacing:"0.06em"}}>W{i+2}</div>
                <div style={{fontFamily:"'Karla',sans-serif",fontSize:13,color:"#2A4060",marginTop:2}}>{w}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",color:"#1A3050",fontSize:12,fontFamily:"'Share Tech Mono',monospace",letterSpacing:"0.1em"}}>+ 4 MORE WORLDS LOCKED</div>
        </div>
      </div>
    );
  };

  // ── LESSON LIST ──────────────────────────────────────────────
  const LessonList = () => {
    const allComplete = st.lessonStars.every(s=>s>0);
    return(
      <div key={animKey} style={{minHeight:"100vh",background:"#060D18",backgroundImage:"radial-gradient(circle,rgba(0,200,255,0.04) 1px,transparent 1px)",backgroundSize:"28px 28px"}}>
        {/* world header */}
        <div style={{background:"linear-gradient(180deg,#0A1E35 0%,rgba(6,13,24,0) 100%)",padding:"24px 24px 32px",position:"relative"}}>
          <button onClick={()=>go("worldMap")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:"#4A7090",fontFamily:"'Karla',sans-serif",fontSize:14,marginBottom:20}}>
            <ChevronLeft size={16}/> World Map
          </button>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:40}}>🤖</span>
            <div>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#00C8FF",letterSpacing:"0.12em",marginBottom:4}}>WORLD 1</div>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:22,fontWeight:700,color:"#E8F4FF"}}>The Basics</div>
              <div style={{fontFamily:"'Karla',sans-serif",color:"#7899AA",fontSize:14,marginTop:2}}>What Is an Agent?</div>
            </div>
            <div style={{marginLeft:"auto",textAlign:"right"}}>
              <div style={{display:"flex",alignItems:"center",gap:5,justifyContent:"flex-end"}}>
                <Zap size={14} color="#FFB700" fill="#FFB700"/>
                <span style={{fontFamily:"'Share Tech Mono',monospace",color:"#FFB700",fontSize:15}}>{st.xp}</span>
              </div>
              <div style={{display:"flex",gap:3,justifyContent:"flex-end",marginTop:4}}>
                <HeartsRow count={st.hearts} max={3}/>
              </div>
            </div>
          </div>
          {/* overall progress */}
          <div style={{marginTop:20,height:3,background:"#0F2040",borderRadius:2}}>
            <div style={{height:"100%",background:"linear-gradient(90deg,#00C8FF,#A855F7)",borderRadius:2,
              width:`${(st.lessonStars.filter(s=>s>0).length/QB.lessons.length)*100}%`,transition:"width 0.6s ease"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#4A7090"}}>{st.lessonStars.filter(s=>s>0).length}/{QB.lessons.length} LESSONS</span>
            {st.streak>0&&<span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#FFB700",display:"flex",alignItems:"center",gap:4}}><Flame size={12} fill="#FFB700" color="#FFB700"/>{st.streak} STREAK</span>}
          </div>
        </div>

        <div style={{padding:"0 20px 32px",display:"flex",flexDirection:"column",gap:10}}>
          {QB.lessons.map((l,i)=>{
            const done = st.lessonStars[i]>0;
            const stars = st.lessonStars[i];
            return(
              <div key={i} className={`lesson-row${done||i===0||st.lessonStars[i-1]>0?"":" locked"}`}
                onClick={()=>{ if(done||i===0||st.lessonStars[i-1]>0) startLesson(i); }}>
                <div style={{width:38,height:38,borderRadius:10,background:done?"rgba(0,200,255,0.12)":"#0A1628",border:`1px solid ${done?"rgba(0,200,255,0.3)":"#1A3050"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                  {l.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4A7090",letterSpacing:"0.1em",marginBottom:3}}>LESSON {i+1}</div>
                  <div style={{fontFamily:"'Karla',sans-serif",fontSize:15,fontWeight:600,color:done?"#C8DCF0":"#7899AA"}}>{l.title}</div>
                  {done&&<div style={{display:"flex",gap:3,marginTop:5}}>
                    {[...Array(3)].map((_,j)=><Star key={j} size={12} fill={j<stars?"#FFB700":"none"} color={j<stars?"#FFB700":"#2A4060"}/>)}
                  </div>}
                </div>
                {(done||i===0||st.lessonStars[i-1]>0)
                  ? <ChevronRight size={18} color={done?"#00C8FF":"#4A7090"}/>
                  : <Lock size={16} color="#2A4060"/>}
              </div>
            );
          })}

          {/* Boss row */}
          <div className={`lesson-row${st.bossUnlocked?"":" locked"}`}
            onClick={()=>st.bossUnlocked&&!st.bossComplete&&go("bossIntro")}
            style={{border:`1.5px solid ${st.bossUnlocked?"rgba(255,183,0,0.4)":"#1A3050"}`,background:st.bossUnlocked?"rgba(255,183,0,0.05)":"#0A1628",marginTop:8}}>
            <div style={{width:38,height:38,borderRadius:10,background:st.bossUnlocked?"rgba(255,183,0,0.12)":"#0A1628",border:`1px solid ${st.bossUnlocked?"rgba(255,183,0,0.35)":"#1A3050"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>👑</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:st.bossUnlocked?"#FFB700":"#4A7090",letterSpacing:"0.1em",marginBottom:3}}>BOSS CHALLENGE</div>
              <div style={{fontFamily:"'Karla',sans-serif",fontSize:15,fontWeight:600,color:st.bossUnlocked?"#E8D060":"#7899AA"}}>{QB.boss.title}</div>
              {st.bossComplete&&<div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#FFB700",marginTop:4}}>{st.bossScore}% · COMPLETE</div>}
            </div>
            {st.bossComplete?<Trophy size={18} color="#FFB700" fill="#FFB700"/>:st.bossUnlocked?<ChevronRight size={18} color="#FFB700"/>:<Lock size={16} color="#2A4060"/>}
          </div>
        </div>
      </div>
    );
  };

  // ── QUESTION ─────────────────────────────────────────────────
  const QuestionScreen = ({isBoss=false}) => {
    const q = isBoss ? QB.boss.questions[st.bossQuestion] : QB.lessons[st.currentLesson].questions[st.currentQuestion];
    const total = isBoss ? QB.boss.questions.length : QB.lessons[st.currentLesson].questions.length;
    const current = isBoss ? st.bossQuestion : st.currentQuestion;
    const onAnswer = isBoss ? answerBoss : answerQ;
    const lessonTitle = isBoss ? QB.boss.title : QB.lessons[st.currentLesson].title;

    return(
      <div key={`${animKey}-${current}`} style={{minHeight:"100vh",background:"#060D18",backgroundImage:"radial-gradient(circle,rgba(0,200,255,0.04) 1px,transparent 1px)",backgroundSize:"28px 28px",display:"flex",flexDirection:"column"}}>
        {/* top bar */}
        <div style={{padding:"16px 20px 12px",borderBottom:"1px solid #0F2040"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <button onClick={()=>go(isBoss?"bossIntro":"lessonList")} style={{background:"none",border:"none",cursor:"pointer",color:"#4A7090",display:"flex",alignItems:"center",gap:4,fontFamily:"'Karla',sans-serif",fontSize:13}}>
              <ChevronLeft size={15}/>{isBoss?"Abort":"Exit"}
            </button>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {st.streak>0&&<div style={{display:"flex",alignItems:"center",gap:4,animation:st.streak>0?"streakBounce 0.4s ease":""}}><Flame size={15} color="#FFB700" fill="#FFB700"/><span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:13,color:"#FFB700"}}>{st.streak}</span></div>}
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <Zap size={13} color="#FFB700" fill="#FFB700"/>
                <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:13,color:"#FFB700"}}>{st.xp}</span>
              </div>
              {!isBoss&&<HeartsRow/>}
            </div>
          </div>
          {/* progress dots */}
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            {Array.from({length:total}).map((_,i)=>(
              <div key={i} style={{height:4,flex:1,borderRadius:2,background:i<current?"#00C8FF":i===current?"rgba(0,200,255,0.5)":"#1A3050",transition:"background 0.3s ease"}}/>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4A7090",letterSpacing:"0.08em"}}>{lessonTitle.toUpperCase()}</span>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4A7090"}}>{current+1}/{total}</span>
          </div>
        </div>

        {/* question card */}
        <div style={{flex:1,padding:"20px 20px 28px",overflowY:"auto",animation:"slideUp 0.3s ease"}}>
          <div style={{background:"#0A1628",border:"1px solid #1A3050",borderRadius:14,padding:"20px 18px",marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,flexWrap:"wrap"}}>
              <TypeBadge type={q.type} isBoss={isBoss}/>
              <ConceptTag c={q.concept}/>
            </div>

            {/* Boss setup panel */}
            {isBoss&&q.setup&&(
              <div style={{background:"rgba(0,200,255,0.04)",border:"1px solid rgba(0,200,255,0.15)",borderRadius:8,padding:"12px 14px",marginBottom:14}}>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#00C8FF",letterSpacing:"0.1em",marginBottom:6}}>SYSTEM BRIEF</div>
                <p style={{fontFamily:"'Karla',sans-serif",fontSize:13,color:"#7899AA",lineHeight:1.55,fontStyle:"italic"}}>{q.setup}</p>
              </div>
            )}

            <p style={{fontFamily:"'Karla',sans-serif",fontSize:16,fontWeight:600,color:"#E8F4FF",lineHeight:1.55}}>{q.question}</p>
          </div>

          <OptionsPanel question={q} onAnswer={onAnswer} disabled={false} feedback={null} isBoss={isBoss}/>
        </div>
      </div>
    );
  };

  // ── FEEDBACK ─────────────────────────────────────────────────
  const FeedbackScreen = ({isBoss=false}) => {
    const fb = st.feedback;
    if(!fb) return null;
    const q = isBoss ? QB.boss.questions[st.bossQuestion] : QB.lessons[st.currentLesson].questions[st.currentQuestion];
    const afterFn = isBoss ? afterBossFeedback : afterFeedback;

    return(
      <div key={animKey} style={{minHeight:"100vh",background:fb.correct?"rgba(0,20,15,0.97)":"rgba(20,5,10,0.97)",display:"flex",flexDirection:"column",animation:"fadeIn 0.25s ease"}}>
        {/* result banner */}
        <div style={{padding:"28px 24px 20px",background:fb.correct?"rgba(0,232,160,0.06)":"rgba(255,64,96,0.06)",borderBottom:`1px solid ${fb.correct?"rgba(0,232,160,0.2)":"rgba(255,64,96,0.2)"}`}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
            <div style={{width:42,height:42,borderRadius:12,background:fb.correct?"rgba(0,232,160,0.15)":"rgba(255,64,96,0.15)",display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${fb.correct?"rgba(0,232,160,0.4)":"rgba(255,64,96,0.4)"}`}}>
              {fb.correct?<Check size={22} color="#00E8A0"/>:<X size={22} color="#FF4060"/>}
            </div>
            <div>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:18,fontWeight:700,color:fb.correct?"#00E8A0":"#FF4060",letterSpacing:"0.04em"}}>
                {fb.correct?"Correct!":"Not quite."}
              </div>
              {fb.correct&&fb.xpEarned>0&&<div style={{display:"flex",alignItems:"center",gap:5,marginTop:4}}>
                <Zap size={13} color="#FFB700" fill="#FFB700"/>
                <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:13,color:"#FFB700"}}>+{fb.xpEarned} XP</span>
                {st.streak>=3&&<span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#FFB700",background:"rgba(255,183,0,0.1)",padding:"1px 6px",borderRadius:4}}>🔥 {st.streak} STREAK</span>}
              </div>}
            </div>
          </div>
        </div>

        <div style={{flex:1,padding:"16px 20px 24px",overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
          {/* answer options (revealed) */}
          <OptionsPanel question={q} onAnswer={()=>{}} disabled={true} feedback={fb} isBoss={isBoss}/>

          {/* explanation */}
          <div style={{background:"rgba(0,200,255,0.05)",border:"1px solid rgba(0,200,255,0.15)",borderRadius:10,padding:"14px 16px"}}>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#00C8FF",letterSpacing:"0.1em",marginBottom:8}}>EXPLANATION</div>
            <p style={{fontFamily:"'Karla',sans-serif",fontSize:14,color:"#C8DCF0",lineHeight:1.6}}>{fb.explanation}</p>
          </div>

          {/* wrong choice note */}
          {!fb.correct&&fb.wrongExplanation&&(
            <div style={{background:"rgba(255,64,96,0.05)",border:"1px solid rgba(255,64,96,0.15)",borderRadius:10,padding:"12px 16px"}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#FF4060",letterSpacing:"0.1em",marginBottom:6}}>WHY NOT THAT ONE</div>
              <p style={{fontFamily:"'Karla',sans-serif",fontSize:13,color:"#A0B8CC",lineHeight:1.55}}>{fb.wrongExplanation}</p>
            </div>
          )}

          {/* boss consequence */}
          {isBoss&&fb.consequence&&(
            <div style={{background:"rgba(255,183,0,0.06)",border:"1px solid rgba(255,183,0,0.2)",borderRadius:10,padding:"12px 16px"}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#FFB700",letterSpacing:"0.1em",marginBottom:6}}>CONSEQUENCE</div>
              <p style={{fontFamily:"'Karla',sans-serif",fontSize:13,color:"#D4B060",lineHeight:1.55}}>{fb.consequence}</p>
            </div>
          )}
        </div>

        {/* continue button */}
        <div style={{padding:"16px 20px 28px",borderTop:"1px solid #0F2040"}}>
          <button className="nav-btn" onClick={afterFn}
            style={{width:"100%",padding:"15px",background:`linear-gradient(135deg,${fb.correct?"#006040,#008060":"#1A3050,#243D5C"})`,color:fb.correct?"#00E8A0":"#7899AA",fontSize:14,fontWeight:600,letterSpacing:"0.06em"}}>
            CONTINUE →
          </button>
        </div>
      </div>
    );
  };

  // ── LESSON COMPLETE ───────────────────────────────────────────
  const LessonComplete = () => {
    const stars = st.lessonStars[st.currentLesson];
    const lessonTitle = QB.lessons[st.currentLesson].title;
    const allDone = st.lessonStars.every(s=>s>0);

    return(
      <div key={animKey} style={{minHeight:"100vh",background:"#060D18",backgroundImage:"radial-gradient(circle,rgba(0,200,255,0.05) 1px,transparent 1px)",backgroundSize:"28px 28px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",animation:"bossIn 0.4s ease"}}>
        <div style={{width:"100%",maxWidth:520,textAlign:"center"}}>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#00C8FF",letterSpacing:"0.15em",marginBottom:16}}>LESSON COMPLETE</div>
          <div style={{fontFamily:"'Orbitron',monospace",fontSize:20,fontWeight:700,color:"#E8F4FF",marginBottom:8}}>{lessonTitle}</div>

          {/* stars */}
          <div style={{display:"flex",gap:16,justifyContent:"center",margin:"28px 0",}}>
            {[...Array(3)].map((_,i)=>(
              <Star key={i} size={42} fill={i<stars?"#FFB700":"none"} color={i<stars?"#FFB700":"#1A3050"}
                style={{animation:i<stars?`starPop 0.5s ease ${i*0.15}s both`:""}}/>
            ))}
          </div>

          {/* stats */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
            {[["XP EARNED",`+${QB.lessons[st.currentLesson].questions.length*(stars===3?12:stars===2?10:8)}`,"#FFB700"],
              ["HEARTS LEFT",`${st.hearts}/3`,"#FF4060"],
              ["STREAK",`${st.streak}`,st.streak>=3?"#FFB700":"#4A7090"],
              ["LEVEL",getLevel(st.xp),"#00C8FF"]
            ].map(([label,val,color])=>(
              <div key={label} style={{background:"#0A1628",border:"1px solid #1A3050",borderRadius:10,padding:"14px"}}>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4A7090",letterSpacing:"0.1em",marginBottom:6}}>{label}</div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:15,fontWeight:600,color}}>{val}</div>
              </div>
            ))}
          </div>

          {allDone&&!st.bossComplete&&(
            <div style={{background:"rgba(255,183,0,0.07)",border:"1px solid rgba(255,183,0,0.3)",borderRadius:10,padding:"14px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
              <Trophy size={20} color="#FFB700" fill="#FFB700"/>
              <span style={{fontFamily:"'Karla',sans-serif",fontSize:14,color:"#E8D060",textAlign:"left"}}>All lessons complete! The Boss Challenge is now unlocked.</span>
            </div>
          )}

          <button className="nav-btn" onClick={afterLessonComplete}
            style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,#004A6A,#006090)",color:"#00C8FF",fontSize:14,fontWeight:600,letterSpacing:"0.06em"}}>
            {allDone&&!st.bossComplete?"BACK TO LESSONS →":"CONTINUE →"}
          </button>
        </div>
      </div>
    );
  };

  // ── BOSS INTRO ───────────────────────────────────────────────
  const BossIntro = () => (
    <div key={animKey} style={{minHeight:"100vh",background:"#060D18",backgroundImage:"radial-gradient(circle,rgba(255,183,0,0.04) 1px,transparent 1px)",backgroundSize:"28px 28px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",animation:"bossIn 0.5s ease"}}>
      <div style={{width:"100%",maxWidth:520}}>
        <button onClick={()=>go("lessonList")} style={{background:"none",border:"none",cursor:"pointer",color:"#4A7090",fontFamily:"'Karla',sans-serif",fontSize:13,display:"flex",alignItems:"center",gap:4,marginBottom:28}}>
          <ChevronLeft size={15}/> Back
        </button>

        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:52,marginBottom:12,animation:"slideUp 0.3s ease"}}>👑</div>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#FFB700",letterSpacing:"0.15em",marginBottom:8}}>BOSS CHALLENGE · WORLD 1</div>
          <div style={{fontFamily:"'Orbitron',monospace",fontSize:22,fontWeight:700,color:"#E8D060",letterSpacing:"0.04em"}}>{QB.boss.title}</div>
        </div>

        <div style={{background:"rgba(255,183,0,0.04)",border:"1px solid rgba(255,183,0,0.2)",borderRadius:14,padding:"22px 20px",marginBottom:24,animation:"slideUp 0.4s ease"}}>
          {QB.boss.narrative.map((line,i)=>(
            <p key={i} style={{fontFamily:"'Karla',sans-serif",fontSize:15,color:i===0?"#E8D060":"#A0B070",lineHeight:1.65,marginBottom:i<QB.boss.narrative.length-1?10:0,fontWeight:i===0?600:400}}>{line}</p>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:28}}>
          {[["Questions",QB.boss.questions.length],["No hearts","Unlimited"],["Bonus XP","100–150"]].map(([l,v])=>(
            <div key={l} style={{background:"#0A1628",border:"1px solid #1A3050",borderRadius:8,padding:"12px",textAlign:"center"}}>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4A7090",letterSpacing:"0.08em",marginBottom:4}}>{l.toUpperCase()}</div>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:14,fontWeight:600,color:"#FFB700"}}>{v}</div>
            </div>
          ))}
        </div>

        <button className="nav-btn" onClick={startBoss}
          style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#5A3A00,#8A5500)",color:"#FFB700",fontSize:14,fontWeight:700,letterSpacing:"0.08em",border:"1.5px solid rgba(255,183,0,0.4)"}}>
          BEGIN THE AUDIT →
        </button>
      </div>
    </div>
  );

  // ── BOSS COMPLETE ────────────────────────────────────────────
  const BossComplete = () => {
    const score = st.bossScore;
    const grade = score>=100?"S":score>=80?"A":score>=60?"B":"C";
    const gradeColor = grade==="S"?"#00E8A0":grade==="A"?"#FFB700":grade==="B"?"#00C8FF":"#7899AA";
    return(
      <div key={animKey} style={{minHeight:"100vh",background:"#060D18",backgroundImage:"radial-gradient(circle,rgba(255,183,0,0.05) 1px,transparent 1px)",backgroundSize:"28px 28px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",animation:"bossIn 0.5s ease"}}>
        <div style={{width:"100%",maxWidth:500,textAlign:"center"}}>
          <Trophy size={52} color="#FFB700" fill="#FFB700" style={{marginBottom:16,animation:"starPop 0.6s ease"}}/>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#FFB700",letterSpacing:"0.15em",marginBottom:8}}>AUDIT COMPLETE</div>
          <div style={{fontFamily:"'Orbitron',monospace",fontSize:60,fontWeight:800,color:gradeColor,lineHeight:1,marginBottom:8,textShadow:`0 0 30px ${gradeColor}80`}}>{grade}</div>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:"#E8D060",marginBottom:24}}>{score}% CORRECT</div>

          <div style={{background:"#0A1628",border:"1px solid #1A3050",borderRadius:14,padding:"20px",marginBottom:24}}>
            <p style={{fontFamily:"'Karla',sans-serif",fontSize:15,color:"#A0B8CC",lineHeight:1.6}}>
              {score>=80?"Outstanding analysis. You've demonstrated solid command of agentic AI fundamentals. The Meridian board is impressed.":score>=60?"Good work. You correctly identified most systems. With more practice on edge cases, you'll be a top-tier AI evaluator.":"Keep building your foundations. Return to any lessons where you felt uncertain, then retry the audit."}
            </p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:28}}>
            {[["Score",`${st.bossCorrect}/${QB.boss.questions.length} correct`,"#FFB700"],
              ["Total XP",`${st.xp} XP`,"#00C8FF"],
              ["Rank",getLevel(st.xp),"#A855F7"],
              ["Streak",`${st.streak} 🔥`,st.streak>=3?"#FFB700":"#4A7090"]
            ].map(([l,v,c])=>(
              <div key={l} style={{background:"#080F1C",border:"1px solid #1A3050",borderRadius:10,padding:"14px",textAlign:"left"}}>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#4A7090",letterSpacing:"0.08em",marginBottom:5}}>{l}</div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:14,fontWeight:600,color:c}}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:10}}>
            {score<80&&<button className="nav-btn" onClick={startBoss}
              style={{flex:1,padding:"13px",background:"#0F2040",color:"#7899AA",fontSize:13,fontWeight:600,letterSpacing:"0.06em",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <RotateCcw size={14}/> RETRY
            </button>}
            <button className="nav-btn" onClick={()=>go("worldMap")}
              style={{flex:2,padding:"14px",background:"linear-gradient(135deg,#004A6A,#006090)",color:"#00C8FF",fontSize:14,fontWeight:600,letterSpacing:"0.06em"}}>
              WORLD MAP →
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────────
  return(
    <div style={{fontFamily:"'Karla',sans-serif",background:"#060D18",minHeight:"100vh",maxWidth:600,margin:"0 auto",position:"relative"}}>
      <style>{CSS}</style>
      {st.screen==="worldMap"     && <WorldMap/>}
      {st.screen==="lessonList"   && <LessonList/>}
      {st.screen==="question"     && <QuestionScreen isBoss={false}/>}
      {st.screen==="feedback"     && <FeedbackScreen isBoss={false}/>}
      {st.screen==="lessonComplete"&&<LessonComplete/>}
      {st.screen==="bossIntro"    && <BossIntro/>}
      {st.screen==="bossQuestion" && <QuestionScreen isBoss={true}/>}
      {st.screen==="bossFeedback" && <FeedbackScreen isBoss={true}/>}
      {st.screen==="bossComplete" && <BossComplete/>}
    </div>
  );
}
