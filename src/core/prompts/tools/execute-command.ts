import { ToolArgs } from "./types"

export function getExecuteCommandDescription(args: ToolArgs): string | undefined {
	return `## execute_command
Description:
- CLI command execution tool:
  1. Runs system commands for task steps
  2. Requirements:
     - Tailor to user's system
     - Explain command purpose
     - Use proper shell chaining syntax
  3. Best practices:
     - Prefer commands over scripts
     - Use relative paths (./example)
     - Avoid location-sensitive paths
  4. Optional:
     - Can specify working directory via \`cwd\`
Parameters:
- command: (required) The CLI command to execute. This should be valid for the current operating system. Ensure the command is properly formatted and does not contain any harmful instructions.
- cwd: (optional) The working directory to execute the command in (default: ${args.cwd})
Usage:
<execute_command>
<command>Your command here</command>
<cwd>Working directory path (optional)</cwd>
</execute_command>
`
}
