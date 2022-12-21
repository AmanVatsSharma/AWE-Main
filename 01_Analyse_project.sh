#!/bin/bash

# Script A: Project Structure Analyzer
# This script scans the current directory and creates a structured text file
# listing all files. This output is designed to be fed into an AI model
# to request a plausible commit history.

OUTPUT_FILE="project_structure.txt"

echo "Analyzing project structure..."

# Check for existing output file
if [ -f "$OUTPUT_FILE" ]; then
    read -p "Warning: $OUTPUT_FILE already exists. Overwrite? (y/N) " confirm
    if [[ ! "$confirm" =~ ^[yY](es)?$ ]]; then
        echo "Operation cancelled."
        exit 1
    fi
fi

# Find all files, excluding .git, this script, and the output file itself.
# The output is a simple, clean list of file paths.
find . -type f -not -path "./.git/*" -not -name "$(basename "$0")" -not -name "$OUTPUT_FILE" | sed 's|^\./||' | sort > "$OUTPUT_FILE"

echo "✅ Analysis complete."
echo "Project file structure has been saved to '$OUTPUT_FILE'."
echo ""
echo "--- NEXT STEP ---"
echo "Copy the contents of '$OUTPUT_FILE' and use 'ai_prompt_guide.md' to ask an AI for a commit history."
