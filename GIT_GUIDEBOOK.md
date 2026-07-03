# The Ultimate Git & GitHub Guidebook for Production

Welcome to your Git reference guide! This guidebook covers everything we practiced during your onboarding simulation. Refer to this whenever you need to resolve common production Git issues.

---

## 1. Quick Command Cheatsheet

| Command | What it does | When to use it |
| :--- | :--- | :--- |
| `git init` | Initializes a brand new local Git repository | At the start of a new project |
| `git status` | Shows untracked, modified, and staged files | Always run this before staging or committing |
| `git log --oneline` | Displays commit history in a clean, one-line format | To find commit hashes or review history |
| `git add <file>` | Moves changes from Working Directory to Staging Area | To prepare files for committing |
| `git add .` | Stages **all** modified and untracked files | To stage everything at once |
| `git commit -m "msg"` | Saves staged changes to Commit History | To create a permanent snapshot of work |
| `git checkout -b <name>` | Creates a new branch and switches to it | Before starting any new feature |
| `git checkout <branch>` | Switches to an existing branch | To jump between `main` and feature branches |
| `git merge <branch>` | Combines history from another branch into current branch | To merge a completed feature branch into `main` |
| `git push -u origin <name>`| Pushes local branch to GitHub and sets default upstream | The first time you push a new branch |
| `git pull origin main` | Fetches changes from GitHub and merges them locally | To update your local branch with team changes |

---

## 2. Common Workflows & Troubleshooting

### 🚨 Scenario A: "I got a Merge Conflict!"
**What it means**: Two developers edited the same line of the same file on different branches, and Git doesn't know which one to keep.

#### How to Resolve it:
1. Open the conflicting file in your editor. Find the conflict markers:
   ```javascript
   <<<<<<< HEAD
   console.log("My version on the current branch");
   =======
   console.log("Their version on the branch being merged");
   >>>>>>> feature/some-branch
   ```
2. Manually edit the file to look exactly how you want (choose one side, keep both, or combine them).
3. **Delete** all the marker lines (`<<<<<<<`, `=======`, and `>>>>>>>`).
4. Save the file.
5. Tell Git you resolved it and commit:
   ```bash
   git add <filename>
   git commit -m "merge: resolve conflict in header"
   ```

---

### 🚨 Scenario B: "Local code is out of sync with GitHub!"
**What it means**: Someone merged a PR on GitHub, but your local terminal doesn't show those changes.

#### How to Sync:
1. Switch to your main branch:
   ```bash
   git checkout main
   ```
2. Pull the latest commits from the remote server:
   ```bash
   git pull origin main
   ```

---

### 🚨 Scenario C: "We pushed a bug to production! We need to rollback!"
**What it means**: Bad code was merged into `main` and pushed to GitHub. You need to undo it safely without messing up history.

#### Option 1: Reverting a Normal Commit
1. Find the 7-character hash of the buggy commit:
   ```bash
   git log --oneline
   ```
2. Revert it (this automatically deletes the bugged code and creates a new rollback commit):
   ```bash
   git revert <bug-commit-hash>
   ```

#### Option 2: Reverting a Merge Commit (e.g. a merged Pull Request)
Because a merge commit has multiple parent branches, you must tell Git to follow the main line (`-m 1`):
1. Run:
   ```bash
   git revert -m 1 <merge-commit-hash>
   ```
2. Push the rollback branch to GitHub and merge it to fix production.

---

### 🚨 Scenario D: "I reverted the bug, but now I want to bring the feature back and fix it!"
**What it means**: The code is gone from `main`. You want to copy the original feature code onto a new branch so you can fix the bugs and try again.

#### How to do it:
1. Create a new branch:
   ```bash
   git checkout -b feature/fix-my-bug
   ```
2. Bring back the exact changes from the buggy commit using **cherry-pick**:
   ```bash
   git cherry-pick <buggy-commit-hash>
   ```
3. Edit the file locally to fix the bug.
4. Add and commit the fix:
   ```bash
   git add .
   git commit -m "feat: re-introduce feature with bug fix"
   ```
5. Push the new branch to GitHub and open a new Pull Request.

---

## 3. Best Practices
* **Never commit directly to `main`**: Always work on a feature branch.
* **Write clear commit messages**: Use prefixes like `feat:` (new feature), `fix:` (bug fix), `style:` (formatting/design), or `docs:` (documentation).
* **Pull often**: Before starting work or merging, run `git pull origin main` to minimize merge conflicts.

---

## 4. Industry Standards: Naming & Conventions

### 🌿 Branch Naming Conventions
In a production team, branch names should indicate the branch's purpose and include the issue/ticket number if applicable.

| Branch Prefix | Purpose | Example |
| :--- | :--- | :--- |
| `feature/` or `feat/` | Introducing a new feature or command | `feature/add-task-list` |
| `bugfix/` or `fix/` | Fixing a bug in a non-production branch | `bugfix/fix-undefined-task` |
| `hotfix/` | An urgent patch directly to production (`main`) | `hotfix/revert-crash-bug` |
| `docs/` | Writing documentation, READMEs, or guides | `docs/add-git-guidebook` |
| `refactor/` | Code changes that neither fix a bug nor add a feature | `refactor/optimize-loops` |

*Best Practice: Use lowercase, separate words with hyphens (kebab-case), and keep it short.*

---

### 📝 Commit Message Conventions (Conventional Commits)
Most tech companies use **Conventional Commits** to keep history clean and auto-generate release notes.

Format: `<type>(<optional-scope>): <description>`

* **`feat:`**: A new feature (e.g., `feat(auth): add login with google`)
* **`fix:`**: A bug fix (e.g., `fix(tasks): resolve index crash on empty array`)
* **`docs:`**: Documentation changes only (e.g., `docs(readme): update installation steps`)
* **`style:`**: Changes that do not affect the meaning of the code (white-space, formatting, semi-colons)
* **`refactor:`**: A code change that neither fixes a bug nor adds a feature
* **`test:`**: Adding missing tests or correcting existing tests

*Rule of thumb: Keep descriptions in the imperative present tense (e.g. "add feature" instead of "added feature" or "adds feature").*

---

### 📬 Pull Request (PR) Message Template
When submitting a Pull Request on GitHub, use a structured description to help your Senior Engineers review your code quickly.

#### **Example PR Description Template**:
```markdown
## Summary
A brief description of what this PR does and why.
*Example: "This PR introduces a task-listing command to the TaskFlow CLI so users can view active tasks."*

## Linked Issues
*Example: "Closes #102"*

## Changes Made
- Added a `tasks` array to store tasks in `index.js`.
- Implemented `listTasks()` function to output formatted tasks.
- Integrated the command into the application runtime.

## How to Test
Steps for the reviewer to verify your changes:
1. Run `git checkout feature/add-task-list`
2. Execute `node index.js`
3. Verify that the task list prints correctly with checkboxes.

## Checklist
- [x] My code runs locally without errors
- [x] I have updated the documentation
- [x] My branch name follows the naming convention
```

