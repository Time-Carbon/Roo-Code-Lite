import { ToolArgs } from "./types"

export function getListCodeDefinitionNamesDescription(args: ToolArgs): string {
	return `## list_code_definition_names
Description: 
- Code definition lister tool:
  1. Scans for code constructs:
     - Classes
     - Functions 
     - Methods
     - Other definitions
  2. Works with:
     - Single files
     - Top-level directory contents
  3. Benefits:
     - Reveals codebase structure
     - Shows key architectural elements
     - Highlights concept relationships
Parameters:
- path: (required) The path of the file or directory (relative to the current working directory ${args.cwd}) to analyze. When given a directory, it lists definitions from all top-level source files.
Usage:
<list_code_definition_names>
<path>Directory path here</path>
</list_code_definition_names>
`
}
