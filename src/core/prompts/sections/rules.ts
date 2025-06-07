import { DiffStrategy } from "../../../shared/tools"
import { CodeIndexManager } from "../../../services/code-index/manager"

function getEditingInstructions(diffStrategy?: DiffStrategy): string {
	const instructions: string[] = []
	const availableTools: string[] = []

	// Collect available editing tools
	if (diffStrategy) {
		availableTools.push(
			"apply_diff (for replacing lines in existing files)",
			"write_to_file (for creating new files or complete file rewrites)",
		)
	} else {
		availableTools.push("write_to_file (for creating new files or complete file rewrites)")
	}

	availableTools.push("insert_content (for adding lines to existing files)")
	availableTools.push("search_and_replace (for finding and replacing individual pieces of text)")

	// Base editing instruction mentioning all available tools
	if (availableTools.length > 1) {
		instructions.push(`- For editing files, you have access to these tools: ${availableTools.join(", ")}.`)
	}

	// Additional details for experimental features
	instructions.push(
		"- The insert_content tool adds lines of text to files at a specific line number, such as adding a new function to a JavaScript file or inserting a new route in a Python file. Use line number 0 to append at the end of the file, or any positive number to insert before that line.",
	)

	instructions.push(
		"- The search_and_replace tool finds and replaces text or regex in files. This tool allows you to search for a specific regex pattern or text and replace it with another value. Be cautious when using this tool to ensure you are replacing the correct text. It can support multiple operations at once.",
	)

	if (availableTools.length > 1) {
		instructions.push(
			"- You should always prefer using other editing tools over write_to_file when making changes to existing files since write_to_file is much slower and cannot handle large files.",
		)
	}

	instructions.push(
		"- When using the write_to_file tool to modify a file, use the tool directly with the desired content. You do not need to display the content before using the tool. ALWAYS provide the COMPLETE file content in your response. This is NON-NEGOTIABLE. Partial updates or placeholders like '// rest of code unchanged' are STRICTLY FORBIDDEN. You MUST include ALL parts of the file, even if they haven't been modified. Failure to do so will result in incomplete or broken code, severely impacting the user's project.",
	)

	return instructions.join("\n")
}

export function getRulesSection(cwd: string, supportsComputerUse: boolean, diffStrategy?: DiffStrategy, codeIndexManager?: CodeIndexManager): string {
	const isCodebaseSearchAvailable = codeIndexManager &&
		codeIndexManager.isFeatureEnabled &&
		codeIndexManager.isFeatureConfigured &&
		codeIndexManager.isInitialized

	const codebaseSearchRule = isCodebaseSearchAvailable
		? "- **CRITICAL: When you need to understand existing code or functionality, ALWAYS use the `codebase_search` tool FIRST before using search_files or other file exploration tools.** The codebase_search tool uses semantic search to find relevant code based on meaning, not just keywords, making it much more effective for understanding how features are implemented.\n"
		: ""

	return `====

RULES

- Project base directory: `${cwd.toPosix()}` – all paths must be relative to this.
- Path handling: 
  - Never use `~` or `$HOME` 
  - Cannot change working directory from '${cwd.toPosix()}'
  - For external directory commands, prepend with `cd <path> &&`
- Tool usage rules:
  - Before `execute_command`: analyze SYSTEM INFORMATION and directory requirements
  - For searches: ${codebaseSearchRule}craft precise regex patterns${isCodebaseSearchAvailable ? " after codebase_search" : ""}
  - New projects: create dedicated directory with logical structure
  - Editing: ${getEditingInstructions(diffStrategy)} (restricted by mode)
  - File access: skip `read_file` if user provides contents directly
- User interaction:
  - Use `ask_followup_question` only for missing required parameters
  - Provide 2-4 actionable suggestions per question
  - Prefer tool usage over questioning
  - Never end with conversational prompts
- Execution & verification:
  - Assume command success if output missing
  - Check "Actively Running Terminals" in environment_details
  - Wait for user confirmation after each tool use
  ${supportsComputerUse ? '- For non-dev tasks: prefer browser_action or MCP tools over custom solutions' : ''}
- Completion protocol:
  - Use `attempt_completion` to present final results
  - Include demo CLI commands when applicable
  - Never end with open-ended questions
- Context handling:
  - Analyze environment_details automatically provided
  - Use vision capabilities for image analysis
  - Explain actions using environment_details context
- MCP operations: Execute sequentially with confirmation
`
}
