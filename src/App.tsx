import { useEffect, useMemo, useState } from "react";
import "./App.css";

type TaskStatus = "To Do" | "In Progress" | "Review" | "Complete";
type Priority = "Low" | "Medium" | "High";

type Task = {
  id: number;
  title: string;
  project: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  description: string;
};

const starterTasks: Task[] = [
  {
    id: 1,
    title: "Build dashboard layout",
    project: "Client CRM",
    assignee: "Maurica",
    dueDate: "2026-06-25",
    priority: "High",
    status: "In Progress",
    description: "Create sidebar, dashboard cards, and responsive layout.",
  },
  {
    id: 2,
    title: "Add resume preview panel",
    project: "AI Resume Builder",
    assignee: "Maurica",
    dueDate: "2026-06-26",
    priority: "Medium",
    status: "Review",
    description: "Show live resume preview from form data.",
  },
  {
    id: 3,
    title: "Create GitHub README",
    project: "JobTrack Pro",
    assignee: "Maurica",
    dueDate: "2026-06-27",
    priority: "Low",
    status: "To Do",
    description: "Write professional project documentation.",
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("teamTaskManagerTasks");
    return saved ? JSON.parse(saved) : starterTasks;
  });

  const [form, setForm] = useState({
    title: "",
    project: "",
    assignee: "",
    dueDate: "",
    priority: "Medium" as Priority,
    status: "To Do" as TaskStatus,
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("teamTaskManagerTasks", JSON.stringify(tasks));
  }, [tasks]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "Complete").length;
    const percent =
      tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

    return {
      total: tasks.length,
      open: tasks.filter((task) => task.status !== "Complete").length,
      completed,
      percent,
    };
  }, [tasks]);

  function addTask(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.project || !form.assignee) {
      alert("Please fill out title, project, and assignee.");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      ...form,
    };

    setTasks([newTask, ...tasks]);

    setForm({
      title: "",
      project: "",
      assignee: "",
      dueDate: "",
      priority: "Medium",
      status: "To Do",
      description: "",
    });
  }

  function updateTaskStatus(id: number, status: TaskStatus) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const columns: TaskStatus[] = ["To Do", "In Progress", "Review", "Complete"];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="crown">♛</div>
          <h2>LTM AI STUDIO</h2>
          <p>Team Operations</p>
        </div>

        <nav className="nav">
          <button className="nav-item active">▦ Dashboard</button>
          <button className="nav-item">📁 Projects</button>
          <button className="nav-item">✅ Tasks</button>
          <button className="nav-item">👥 Team</button>
          <button className="nav-item">📊 Reports</button>
          <button className="nav-item">⚙ Settings</button>
        </nav>

        <div className="profile-card">
          <div className="monogram">MB</div>
          <strong>Maurica Bellaphant</strong>
          <span>Full-Stack Developer</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="menu-btn">☰</button>

          <div className="user-menu">
            <div className="user-initials">MB</div>
            <span>Maurica Bellaphant</span>
            <span>⌄</span>
          </div>
        </header>

        <section className="hero">
          <h1>
            <span>Team Task</span> Manager
          </h1>
          <p>
            A collaborative project management dashboard for tracking team tasks,
            priorities, progress, and productivity.
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div>
              <span>Total Tasks</span>
              <strong>{stats.total}</strong>
              <p>All project tasks</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon gold-icon">⚡</div>
            <div>
              <span>Open Tasks</span>
              <strong>{stats.open}</strong>
              <p>Needs work</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏁</div>
            <div>
              <span>Completed</span>
              <strong>{stats.completed}</strong>
              <p>Finished tasks</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon gold-icon">📈</div>
            <div>
              <span>Progress</span>
              <strong>{stats.percent}%</strong>
              <p>Completion rate</p>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <form className="panel form-panel" onSubmit={addTask}>
            <h2>✅ Add New Task</h2>

            <label>
              Task Title
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Example: Build login page"
              />
            </label>

            <label>
              Project
              <input
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                placeholder="Example: Client CRM"
              />
            </label>

            <label>
              Assignee
              <input
                value={form.assignee}
                onChange={(e) =>
                  setForm({ ...form, assignee: e.target.value })
                }
                placeholder="Example: Maurica"
              />
            </label>

            <label>
              Due Date
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </label>

            <label>
              Priority
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as Priority })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label>
              Status
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as TaskStatus })
                }
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Complete</option>
              </select>
            </label>

            <label>
              Description
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Add task details..."
              />
            </label>

            <button className="primary-btn" type="submit">
              + Add Task
            </button>
          </form>

          <section className="board">
            {columns.map((column) => (
              <div className="task-column" key={column}>
                <h2>{column}</h2>

                <div className="task-list">
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task) => (
                      <article className="task-card" key={task.id}>
                        <div className="task-top">
                          <span
                            className={`priority ${task.priority.toLowerCase()}`}
                          >
                            {task.priority}
                          </span>

                          <button
                            className="delete-btn"
                            onClick={() => deleteTask(task.id)}
                          >
                            ×
                          </button>
                        </div>

                        <h3>{task.title}</h3>
                        <strong>{task.project}</strong>
                        <p>{task.description}</p>

                        <div className="task-meta">
                          <span>👤 {task.assignee}</span>
                          <span>📅 {task.dueDate || "No date"}</span>
                        </div>

                        <select
                          value={task.status}
                          onChange={(e) =>
                            updateTaskStatus(
                              task.id,
                              e.target.value as TaskStatus
                            )
                          }
                        >
                          <option>To Do</option>
                          <option>In Progress</option>
                          <option>Review</option>
                          <option>Complete</option>
                        </select>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </section>
        </section>

        <footer>© 2026 LTM AI Studio. Built by Maurica Bellaphant.</footer>
      </main>
    </div>
  );
}

export default App;