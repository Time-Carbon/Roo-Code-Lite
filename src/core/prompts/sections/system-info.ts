import os from "os"
import osName from "os-name"

import { getShell } from "../../../utils/shell"

export function getSystemInfoSection(cwd: string): string {
	let details = `====

SYSTEM INFORMATION

Operating System: ${osName()}
Default Shell: ${getShell()}
Home Directory: ${os.homedir().toPosix()}
Current Workspace Directory: ${cwd.toPosix()}

- Current workspace directory: Active VS Code project directory, serving as default for tool operations.
- Terminal behavior: 
  - New terminals start in workspace directory
  - Directory changes within terminals don't modify workspace directory
- Initial project overview: 
  - Recursive file list for workspace directory ('/test/path') provided in environment_details
  - Reveals project structure insights (organization patterns, language usage)
- External directory exploration: 
  - Use `list_files` tool 
  - Set `recursive=true` for nested structure analysis
  - Use non-recursive for top-level views (e.g., Desktop)
`

	return details
}
