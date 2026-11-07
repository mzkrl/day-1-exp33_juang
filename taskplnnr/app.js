// Sample assignments data
const assignments = [
  { title: "Math Homework 1", dueDate: "Sept 15, 2026", completed: false },
  { title: "English Essay Draft", dueDate: "Sept 20, 2026", completed: false },
  { title: "Science Lab Report", dueDate: "Sept 25, 2026", completed: true },
  { title: "History Presentation", dueDate: "Oct 02, 2026", completed: false }
];

// Keep track of which filter is selected
let currentFilter = "all";

const taskList = document.querySelector("#taskList");
const emptyMessage = document.querySelector("#emptyMessage");
const filterButtons = document.querySelectorAll("[data-filter]");

// Show assignments based on the selected filter
function renderTasks() {
  taskList.innerHTML = "";

  const visibleTasks = assignments.filter(function (task) {
    if (currentFilter === "pending") {
      return !task.completed;
    }
    if (currentFilter === "completed") {
      return task.completed;
    }
    return true;
  });

  emptyMessage.hidden = visibleTasks.length !== 0;

  visibleTasks.forEach(function (task) {
    const taskIndex = assignments.indexOf(task);
    const listItem = document.createElement("li");
    listItem.className = "task" + (task.completed ? " completed" : "");

    const title = document.createElement("h2");
    title.textContent = task.title;

    const dueDate = document.createElement("p");
    dueDate.className = "due-date";
    dueDate.textContent = "Due date: " + task.dueDate;

    const status = document.createElement("span");
    status.className = "status";
    status.textContent = task.completed ? "Completed" : "Pending";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = task.completed ? "Mark as pending" : "Mark as completed";
    button.addEventListener("click", function () {
      assignments[taskIndex].completed = !assignments[taskIndex].completed;
      renderTasks();
    });

    listItem.append(title, dueDate, status, button);
    taskList.append(listItem);
  });
}

// Handle filter button clicks
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (filterButton) {
      filterButton.classList.toggle("active", filterButton === button);
    });

    renderTasks();
  });
});

// Display the initial list when the page loads
renderTasks();
