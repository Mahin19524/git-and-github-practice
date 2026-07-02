console.log("TaskFlow - Developer Workspace");

const tasks = [
    { id: 1, title: "Learn Git Basics", completed: true },
    { id: 2, title: "Practice Branching", completed: false },
    { id: 3, title: "Master Merge Conflicts", completed: false }
];

function listTasks() {
    console.log("\n--- Your Task List ---");
    tasks.forEach(task => {
        const status = task.completed ? "✓" : " ";
        console.log(`[${status}] ${task.id}. ${task.title}`);
    });
}

listTasks();
