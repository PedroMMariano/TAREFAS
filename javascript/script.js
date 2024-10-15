document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    });

    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging');
    });
});

document.querySelectorAll('.kanban-cards').forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        e.currentTarget.classList.add('cards-hover');
    });

    column.addEventListener('dragleave', e => {
        e.currentTarget.classList.remove('cards-hover');
    });


    column.addEventListener('drop', e => {
        e.currentTarget.classList.remove('cards-hover');
        const dragCard = document.querySelector('.kanban-card.dragging');
        e.currentTarget.appendChild(dragCard);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const addCardButtons = document.querySelectorAll(".add-card");
    const kanbanColumns = document.querySelectorAll(".kanban-column");
    const modal = document.getElementById("addTaskModal");
    const closeModal = document.querySelector(".close");
    let currentColumn;

    addCardButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentColumn = this.closest(".kanban-column");
            modal.style.display = "block";
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    document.getElementById("addTaskForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;
        const priority = document.getElementById("task-priority").value;

        createNewCard(currentColumn, title, description, priority);
        modal.style.display = "none";
        this.reset();
    });

    function initializeDragAndDrop() {
        const cards = document.querySelectorAll(".kanban-card");

        cards.forEach(card => {
            card.addEventListener("dragstart", dragStart);
        });

        kanbanColumns.forEach(column => {
            column.addEventListener("dragover", dragOver);
            column.addEventListener("drop", dropCard);
        });
    }

    function createNewCard(column, title, description, priority) {
        const kanbanCards = column.querySelector(".kanban-cards");

        let priorityClass = "";
        switch (priority) {
            case "low":
                priorityClass = "low";
                break;
            case "medium":
                priorityClass = "medium";
                break;
            case "high":
                priorityClass = "high";
                break;
        }

        const newCard = document.createElement("div");
        newCard.classList.add("kanban-card");
        newCard.setAttribute("draggable", "true");

        newCard.innerHTML = `
            <div class="badge ${priorityClass}">
                <span>${priority === "low" ? "Baixa Prioridade" : priority === "medium" ? "Média Prioridade" : "Alta Prioridade"}</span>
            </div>
            <p class="card-title">${title}</p>
            <p class="card-description">${description}</p>
            <div class="card-infos">
                <div class="card-icons">
                    <p><i class="fa-regular fa-comment"></i></p>
                    <p><i class="fa-solid fa-paperclip"></i></p>
                    <p class="delete"><i class="fa-solid fa-xmark"></i></p>
                </div>
                <div class="user">
                    <img src="src/pedro.jpg" alt="">
                </div>
            </div>
        `;

        kanbanCards.appendChild(newCard);

        initializeDragAndDrop();
    }

    function dragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.outerHTML);
        e.target.classList.add("dragging");
        setTimeout(() => {
            e.target.classList.add("invisible");
        }, 0);
    }


    function dragOver(e) {
        e.preventDefault();
    }

    function dropCard(e) {
        e.preventDefault();
        const draggingCard = document.querySelector(".dragging");
    }

    document.addEventListener("dragend", function () {
        const card = document.querySelector(".dragging");
        if (card) {
            card.classList.remove("dragging", "invisible");
        }
    });

    initializeDragAndDrop();

});
