document.addEventListener("DOMContentLoaded", function () {
  initKanbanDragDrop();
  initMeetingAnalysis();
});

function initKanbanDragDrop() {
  const cards = document.querySelectorAll(".kanban-card");
  const columns = document.querySelectorAll(".column-content");

  cards.forEach(function (card) {
    card.addEventListener("dragstart", function (event) {
      card.classList.add("dragging");
      event.dataTransfer.setData("text/plain", "drag");
    });

    card.addEventListener("dragend", function () {
      card.classList.remove("dragging");
      updateColumnCounts();
    });
  });

  columns.forEach(function (column) {
    column.addEventListener("dragover", function (event) {
      event.preventDefault();
      const draggingCard = document.querySelector(".kanban-card.dragging");
      if (draggingCard) {
        column.appendChild(draggingCard);
      }
    });
  });
}

function updateColumnCounts() {
  const kanbanColumns = document.querySelectorAll(".kanban-column");
  kanbanColumns.forEach(function (column) {
    const count = column.querySelectorAll(".kanban-card").length;
    const countLabel = column.querySelector(".column-count");
    if (countLabel) {
      countLabel.textContent = String(count);
    }
  });
}

function initMeetingAnalysis() {
  const analyzeButton = document.getElementById("analyze-button");
  const notesInput = document.getElementById("meeting-minutes");
  const panel = document.getElementById("ai-panel");

  if (!analyzeButton || !notesInput || !panel) {
    return;
  }

  analyzeButton.addEventListener("click", function () {
    const text = notesInput.value.trim();
    const hasNotes = text.length > 0;

    panel.innerHTML = `
      <h3>AI Analysis</h3>
      <p class="analysis-muted">Prototype simulation output (no live API integration).</p>
      <div class="analysis-block">
        <h4>Sample Summary</h4>
        <ul>
          <li>${hasNotes ? "Team reviewed submitted meeting minutes and aligned on immediate delivery priorities." : "Team reviewed sprint delivery status and confirmed focus areas for the week."}</li>
          <li>Development work remains on track, with backend tasks slightly ahead of plan.</li>
          <li>Primary dependency is external API stability for reporting features.</li>
        </ul>
      </div>
      <div class="analysis-block">
        <h4>Action Items</h4>
        <ul>
          <li>JD to complete reporting API endpoint validation by Friday.</li>
          <li>AM to finalize role-permission test scenarios and share QA checklist.</li>
          <li>PM to confirm stakeholder demo date and circulate agenda.</li>
        </ul>
      </div>
      <div class="analysis-block">
        <h4>Progress Update</h4>
        <ul>
          <li>Overall completion: <strong>68%</strong> (up from 61% last week).</li>
          <li>Kanban flow: 2 items moved to Done, 1 new blocker in In Progress.</li>
          <li>Timeline confidence: <strong>Medium-High</strong> pending dependency clearance.</li>
        </ul>
      </div>
      <div class="analysis-block">
        <h4>Risk Keywords</h4>
        <ul>
          <li>Scope Creep</li>
          <li>API Latency</li>
          <li>Resource Bandwidth</li>
          <li>Testing Delay</li>
        </ul>
      </div>
    `;
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function demoWalkthrough() {
  window.location.href = "dashboard.html";
}
