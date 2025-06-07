export function getCodebaseSearchDescription(): string {
	return `## codebase_search
Description: 
- Semantic file search tool:
  1. Uses meaning-based matching (not just keywords)
  2. Preserves user's exact query wording when possible
  3. Can scope search to specific directory if relevant
  4. Always translates non-English queries to English
  5. Key considerations:
     - User's phrasing often improves results
     - Maintain original question format
     - Only modify query if clearly beneficial
Parameters:
- query: (required) The search query to find relevant code. You should reuse the user's exact query/most recent message with their wording unless there is a clear reason not to.
- path: (optional) The path to the directory to search in relative to the current working directory. This parameter should only be a directory path, file paths are not supported. Defaults to the current working directory.
Usage:
<codebase_search>
<query>Your natural language query here</query>
<path>Path to the directory to search in (optional)</path>
</codebase_search>
`
}
