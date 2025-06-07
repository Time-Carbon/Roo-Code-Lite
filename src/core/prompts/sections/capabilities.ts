import { DiffStrategy } from "../../../shared/tools"
import { McpHub } from "../../../services/mcp/McpHub"
import { CodeIndexManager } from "../../../services/code-index/manager"

export function getCapabilitiesSection(
	cwd: string,
	supportsComputerUse: boolean,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
	codeIndexManager?: CodeIndexManager,
): string {
	return `====
CAPABILITIES
- Ability: Execute CLI commands, list files, view source code, regex search${supportsComputerUse ? ", use browser" : ""}, read/write files, ask follow-up questions for tasks like coding, editing, project analysis, and system operations.
- Initial project overview: Recursive file list for workspace directory ('${cwd}') provided in environment_details for project structure insights. Use list_files for external directories (with recursive option).
${codeIndexManager && codeIndexManager.isFeatureEnabled && codeIndexManager.isFeatureConfigured && codeIndexManager.isInitialized ? "- Use codebase_search for semantic codebase queries to find functionally relevant code across files." : ""}
- Use search_files for regex searches with contextual output in directories.
- Use list_code_definition_names to get top-level source code definitions in directories. 
  - Edit workflow: Analyze file structure → list_code_definition_names → read_file → apply changes via ${diffStrategy ? "apply_diff or write_to_file" : "write_to_file"} → verify with search_files.
- Execute_command runs CLI commands in new terminal instances (interactive/long-running allowed). Always explain command purpose.
${supportsComputerUse ? "- Use browser_action for web interactions (Puppeteer): launch browsers, navigate pages, interact elements, capture screenshots/logs. Useful for verifying web changes locally." : ""}
${mcpHub ? "- Access MCP servers for additional tools/resources." : ""}
`
}
