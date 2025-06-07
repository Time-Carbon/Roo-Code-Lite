import { CodeIndexManager } from "../../../services/code-index/manager"

export function getObjectiveSection(codeIndexManager?: CodeIndexManager): string {
	const isCodebaseSearchAvailable = codeIndexManager &&
		codeIndexManager.isFeatureEnabled &&
		codeIndexManager.isFeatureConfigured &&
		codeIndexManager.isInitialized

	const codebaseSearchInstruction = isCodebaseSearchAvailable
		? "First, if the task involves understanding existing code or functionality, you MUST use the `codebase_search` tool to search for relevant code based on the task's intent BEFORE using any other search or file exploration tools. Then, d"
		: "D"

	return `====
OBJECTIVE

- Approach tasks iteratively: break into clear, achievable goals and prioritize logically.
- Work sequentially through goals, using tools one at a time per step.
- For each goal:
  - Analyze within `<thinking>` tags.
  - Leverage initial file structure from environment_details for context.
  - ${codebaseSearchInstruction}etermine the most relevant tool for the task.
  - Verify all required tool parameters are provided/inferable before invocation.
  - If missing required parameters, use `ask_followup_question` instead of tool.
- After task completion:
  - Use `attempt_completion` to present results.
  - Optionally include CLI command (e.g., `open index.html`) for demonstration.
- Incorporate user feedback for improvements without open-ended follow-ups.
- Avoid ending responses with questions or assistance offers.
`
}
