import { ToolArgs } from "./types"

export function getReadFileDescription(args: ToolArgs): string {
	const maxConcurrentReads = args.settings?.maxConcurrentFileReads ?? 15
	const isMultipleReadsEnabled = maxConcurrentReads > 1

	return `## read_file
Description:
- File reading tool:
  1. Capabilities:
     - Reads ${isMultipleReadsEnabled ? "1-" + maxConcurrentReads + " files" : "1 file"} per request
     - Outputs line-numbered content
     - Supports PDF/DOCX text extraction

  2. ${args.partialReadsEnabled ? "Efficiency features:" : ""}
     ${args.partialReadsEnabled ? "- Allows line range specification" : ""}
     ${args.partialReadsEnabled ? "- Optimized for large files" : ""}

  3. Limitations:
     - ${isMultipleReadsEnabled ? `Max ${maxConcurrentReads} files/request` : "Single-file reads only"}
     - Limited binary file support
Parameters:
- args: Contains one or more file elements, where each file contains:
  - path: (required) File path (relative to workspace directory ${args.cwd})
  ${args.partialReadsEnabled ? `- line_range: (optional) One or more line range elements in format "start-end" (1-based, inclusive)` : ""}
Efficient Reading Strategy:
1. Reading approach:
   ${isMultipleReadsEnabled ? 
     `- Read related files together (max ${maxConcurrentReads} files)` : 
     `- Read files one at a time`}
   ${args.partialReadsEnabled ?
     `- Use line ranges for large files
      - Combine nearby ranges (<10 lines apart)
      - Use separate ranges for distant content
      - Include sufficient context` : ''}

2. Requirements:
   - Get all context before making changes
   ${isMultipleReadsEnabled ?
     `- For >${maxConcurrentReads} files, prioritize critical files first` : ''}
Usage:
<read_file>
<args>
  <file>
    <path>path/to/file</path>
    ${args.partialReadsEnabled ? `<line_range>start-end</line_range>` : ""}
  </file>
</args>
</read_file>
`
}
