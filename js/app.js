(function () {
  "use strict";

  const DESCRIPTION_COLLAPSE_LENGTH = 140;
  const TIME_TICK_MS = 45_000;
  const state = {
    id: "demo-1",
    title: "Redesign the onboarding flow for mobile users",
    description:
      "Review current onboarding screens, identify friction points, and deliver updated wireframes with improved copy and CTA placement.",
    dueDateTime: "2026-04-16T23:59:00",
    priority: "high",
    status: "In Progress",
    tags: [
      { label: "work", testId: "test-todo-tag-work" },
      { label: "urgent", testId: "test-todo-tag-urgent" },
      { label: "design" },
    ],
  };

  let editSnapshot = null;
  let descriptionExpanded = false;
  let timeTimerId = null;
  let timeRemainingTimerId = null;

  const time_remaining_dummy_updates =[
    {
      id: 1,
      text : "Due in 1 hour"
    },
    {
      id: 2,
      text : "Due in 45 minutes"
    },
    {
      id: 3,
      text : "Overdue"
    },
    {
      id: 4,
      text : "Overdue by 1 hour"
    },
    {
      id: 5,
      text : "Completed"
    }
  ]

  const el = {
    card: document.getElementById("todo-card"),
    view: document.getElementById("todo-view"),
    form: document.getElementById("todo-edit-form"),
    checkbox: document.getElementById("todo-complete-toggle"),
    titleDisplay: document.getElementById("todo-title-display"),
    priorityBadge: document.getElementById("todo-priority-badge"),
    priorityIndicator: document.getElementById("todo-priority-indicator"),
    statusSelect: document.getElementById("todo-status-control"),
    dueDate: document.getElementById("todo-due-date"),
    timeRemaining: document.getElementById("todo-time-remaining"),
    overdueIndicator: document.getElementById("todo-overdue-indicator"),
    descriptionDisplay: document.getElementById("todo-description-display"),
    collapsible: document.getElementById("todo-collapsible-section"),
    expandToggle: document.getElementById("todo-expand-toggle"),
    statusDisplay: document.getElementById("todo-status-display"),
    tagsList: document.getElementById("todo-tags-list"),
    editButton: document.getElementById("todo-edit-button"),
    deleteButton: document.getElementById("todo-delete-button"),
    inputTitle: document.getElementById("todo-edit-title-input"),
    inputDescription: document.getElementById("todo-edit-description-input"),
    inputPriority: document.getElementById("todo-edit-priority-select"),
    inputDue: document.getElementById("todo-edit-due-date-input"),
    saveButton: document.getElementById("todo-save-button"),
    cancelButton: document.getElementById("todo-cancel-button"),
  };

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function formatDateDisplay(d) {
    const day = d.getDate();
    const month = d.toLocaleDateString("en-GB", { month: "long" });
    const year = d.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  function toDatetimeLocalValue(isoString) {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "";
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  }

  function fromDatetimeLocalValue(value) {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return state.dueDateTime;
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}:00`;
  }

  function plural(n, word) {
    return n === 1 ? word : `${word}s`;
  }

  function computeTimeParts(dueDate, status) {
    if (status === "Done") {
      return { text: "Completed", variant: "completed", overdue: false };
    }
    const now = new Date();
    const diffMs = dueDate.getTime() - now.getTime();
    const absMs = Math.abs(diffMs);
    const minute = 60_000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diffMs < 0) {
      let text;
      if (absMs >= day) {
        const n = Math.floor(absMs / day);
        text = `Overdue by ${n} ${plural(n, "day")}`;
      } else if (absMs >= hour) {
        const n = Math.floor(absMs / hour);
        text = `Overdue by ${n} ${plural(n, "hour")}`;
      } else {
        const n = Math.max(1, Math.floor(absMs / minute));
        text = `Overdue by ${n} ${plural(n, "minute")}`;
      }
      return { text, variant: "overdue", overdue: true };
    }

    if (diffMs >= day) {
      const days = Math.floor(diffMs / day);
      const variant = days <= 1 ? "soon" : "ok";
      return { text: `Due in ${days} ${plural(days, "day")}`, variant, overdue: false };
    }
    if (diffMs >= hour) {
      const hours = Math.floor(diffMs / hour);
      return { text: `Due in ${hours} ${plural(hours, "hour")}`, variant: "soon", overdue: false };
    }
    const minutes = Math.max(1, Math.floor(diffMs / minute));
    return { text: `Due in ${minutes} ${plural(minutes, "minute")}`, variant: "soon", overdue: false };
  }

  function priorityAria(p) {
    const cap = p.charAt(0).toUpperCase() + p.slice(1);
    return `Priority: ${cap}`;
  }

  function statusAriaLabel(s) {
    return `Status: ${s}`;
  }

  function renderTags() {
    el.tagsList.innerHTML = "";
    state.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.role = "listitem";
      li.className = "todo-card__tag";
      li.textContent = tag.label;
      if (tag.testId) {
        li.setAttribute("data-testid", tag.testId);
      }
      el.tagsList.appendChild(li);
    });
  }

  function updateDescriptionCollapseUi() {
    const text = state.description;
    const long = text.length > DESCRIPTION_COLLAPSE_LENGTH;
    if (!long) {
      el.expandToggle.hidden = true;
      el.collapsible.classList.remove("is-collapsed");
      descriptionExpanded = true;
      el.expandToggle.setAttribute("aria-expanded", "true");
      return;
    }
    el.expandToggle.hidden = false;
    if (!descriptionExpanded) {
      el.collapsible.classList.add("is-collapsed");
      el.expandToggle.setAttribute("aria-expanded", "false");
      el.expandToggle.textContent = "Show more";
    } else {
      el.collapsible.classList.remove("is-collapsed");
      el.expandToggle.setAttribute("aria-expanded", "true");
      el.expandToggle.textContent = "Show less";
    }
  }

  function applyCardVisualState() {
    el.card.classList.remove(
      "todo-card--priority-low",
      "todo-card--priority-medium",
      "todo-card--priority-high",
      "todo-card--status-pending",
      "todo-card--status-in-progress",
      "todo-card--status-done",
      "todo-card--overdue"
    );

    el.card.classList.add(`todo-card--priority-${state.priority}`);
    const statusKey =
      state.status === "In Progress"
        ? "in-progress"
        : state.status === "Done"
          ? "done"
          : "pending";
    el.card.classList.add(`todo-card--status-${statusKey}`);

    const due = new Date(state.dueDateTime);
    const { overdue } = computeTimeParts(due, state.status);
    if (overdue && state.status !== "Done") {
      el.card.classList.add("todo-card--overdue");
    }

    el.priorityIndicator.dataset.priority = state.priority;
    el.priorityBadge.dataset.priority = state.priority;
    el.priorityBadge.textContent = state.priority.charAt(0).toUpperCase() + state.priority.slice(1);
    el.priorityBadge.setAttribute("aria-label", priorityAria(state.priority));

    el.statusDisplay.textContent = state.status;
    el.statusDisplay.dataset.status = state.status;
    el.statusDisplay.setAttribute("aria-label", statusAriaLabel(state.status));

    el.titleDisplay.textContent = state.title;
    el.descriptionDisplay.textContent = state.description;

    const iso = state.dueDateTime;
    el.dueDate.dateTime = iso;
    el.dueDate.textContent = formatDateDisplay(new Date(iso));

    el.checkbox.checked = state.status === "Done";
    el.statusSelect.value = state.status;

    updateDescriptionCollapseUi();
    updateTimeDisplay();
  }

  function updateTimeDisplay() {
    const due = new Date(state.dueDateTime);
    const { text, variant, overdue } = computeTimeParts(due, state.status);
    el.timeRemaining.textContent = text;
    el.timeRemaining.dataset.variant = variant;

    if (overdue && state.status !== "Done") {
      el.overdueIndicator.hidden = false;
    } else {
      el.overdueIndicator.hidden = true;
    }
  }

  function startTimeTicker() {
    stopTimeTicker();
    timeTimerId = window.setInterval(updateTimeDisplay, TIME_TICK_MS);
  }

  function stopTimeTicker() {
    if (timeTimerId !== null) {
      window.clearInterval(timeTimerId);
      timeTimerId = null;
    }
  }

  function syncStatusFromCheckbox(checked) {
    if (checked) {
      state.status = "Done";
    } else {
      state.status = "Pending";
    }
    el.statusSelect.value = state.status;
    applyCardVisualState();
    if (state.status === "Done") {
      stopTimeTicker();
    } else {
      startTimeTicker();
    }
  }

  function syncStatusFromSelect(value) {
    state.status = value;
    el.checkbox.checked = state.status === "Done";
    applyCardVisualState();
    if (state.status === "Done") {
      stopTimeTicker();
      stopTimeRemaining();
    } else {
      startTimeTicker();
      switchTimeRemaining();
    }
  }

  function openEdit() {
    stopTimeTicker();
    editSnapshot = {
      title: state.title,
      description: state.description,
      priority: state.priority,
      dueDateTime: state.dueDateTime,
      status: state.status,
    };
    el.inputTitle.value = state.title;
    el.inputDescription.value = state.description;
    el.inputPriority.value = state.priority;
    el.inputDue.value = toDatetimeLocalValue(state.dueDateTime);

    el.view.hidden = true;
    el.view.setAttribute("aria-hidden", "true");
    el.form.hidden = false;
    el.form.setAttribute("aria-hidden", "false");

    window.requestAnimationFrame(() => {
      el.inputTitle.focus();
    });

    el.form.addEventListener("keydown", onEditFormKeydown);
  }

  function closeEdit() {
    el.form.removeEventListener("keydown", onEditFormKeydown);
    el.form.hidden = true;
    el.form.setAttribute("aria-hidden", "true");
    el.view.hidden = false;
    el.view.removeAttribute("aria-hidden");
    window.requestAnimationFrame(() => {
      el.editButton.focus();
    });
  }

  function onEditFormKeydown(ev) {
    if (ev.key !== "Tab") return;
    const focusables = getFocusableElements(el.form);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (ev.shiftKey) {
      if (document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  }

  function getFocusableElements(root) {
    const sel = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(root.querySelectorAll(sel)).filter((node) => {
      return node.offsetParent !== null && !node.hasAttribute("hidden");
    });
  }

  function saveEdit(ev) {
    ev.preventDefault();
    state.title = el.inputTitle.value.trim() || state.title;
    state.description = el.inputDescription.value;
    state.priority = /** @type {'low'|'medium'|'high'} */ (el.inputPriority.value);
    state.dueDateTime = fromDatetimeLocalValue(el.inputDue.value);
    if (state.description.length <= DESCRIPTION_COLLAPSE_LENGTH) {
      descriptionExpanded = true;
    }
    closeEdit();
    applyCardVisualState();
    if (state.status !== "Done") {
      startTimeTicker();
    }
  }

  function cancelEdit() {
    if (editSnapshot) {
      state.title = editSnapshot.title;
      state.description = editSnapshot.description;
      state.priority = editSnapshot.priority;
      state.dueDateTime = editSnapshot.dueDateTime;
      state.status = editSnapshot.status;
    }
    closeEdit();
    applyCardVisualState();
    if (state.status !== "Done") {
      startTimeTicker();
    }
  }

  function TimeRemainingChange() {
    if (el.timeRemaining.textContent.includes("Overdue")) {
      el.timeRemaining.dataset.variant = "overdue";
    } else if (el.timeRemaining.textContent.includes("Due")) {
      el.timeRemaining.dataset.variant = "soon";
    } else if (el.timeRemaining.textContent.includes("Completed")) {
      el.timeRemaining.dataset.variant = "completed";
    }
  }

  function switchTimeRemaining(){
    let i = 0;
    timeRemainingTimerId = window.setInterval(() => {
      el.timeRemaining.textContent = time_remaining_dummy_updates[i].text;
      TimeRemainingChange();
      i++;
      if (i >= time_remaining_dummy_updates.length) {
        i=0;
      }
    }, 30000);
  }

  function stopTimeRemaining(){
    window.clearInterval(timeRemainingTimerId);
  }

  el.checkbox.addEventListener("change", () => {
    syncStatusFromCheckbox(el.checkbox.checked);
  });

  el.statusSelect.addEventListener("change", () => {
    syncStatusFromSelect(el.statusSelect.value);
  });

  el.expandToggle.addEventListener("click", () => {
    descriptionExpanded = !descriptionExpanded;
    updateDescriptionCollapseUi();
  });

  el.editButton.addEventListener("click", () => {
    openEdit();
  });

  el.deleteButton.addEventListener("click", () => {
    window.alert("Delete button clicked");
  });


  el.form.addEventListener("submit", saveEdit);
  

  el.cancelButton.addEventListener("click", () => {
    cancelEdit();
  });

  if (state.status !== "Done")
     {switchTimeRemaining();}

  renderTags();
  applyCardVisualState();
  if (state.status !== "Done") {
    startTimeTicker();
  }
})();
