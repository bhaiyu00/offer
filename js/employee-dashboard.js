// Employee Dashboard Specific Functionality
gsap.registerPlugin(ScrollTrigger);

let timerInterval = null;
let timerSeconds = 0;

document.addEventListener('DOMContentLoaded', function() {
    initEmployeeDashboard();
});

function initEmployeeDashboard() {
    // Populate today's tasks
    populateTodayTasks();

    // Populate schedule
    populateSchedule();

    // Populate activity
    populateActivity();

    // Populate projects
    populateEmployeeProjects();

    // Setup time tracker
    setupTimeTracker();

    // Setup leave section
    populateLeaveHistory();

    // Setup performance
    setupPerformance();

    // Advanced animations
    setupEmployeeAnimations();
}

function populateTodayTasks() {
    const todayList = document.getElementById('todayTasksList');
    if (!todayList) return;

    todayList.innerHTML = '';

    const todayTasks = mockTasks.slice(0, 3);

    todayTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item-small ${task.status === 'completed' ? 'completed' : ''}`;
        li.innerHTML = `
            <h4>${task.title}</h4>
            <p>Priority: ${task.priority}</p>
        `;

        todayList.appendChild(li);

        gsap.from(li, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
}

function populateSchedule() {
    const scheduleList = document.getElementById('todaySchedule');
    if (!scheduleList) return;

    scheduleList.innerHTML = '';

    const schedule = [
        { time: '09:00 AM', title: 'Team Standup', location: 'Conference Room A' },
        { time: '11:00 AM', title: 'Project Meeting', location: 'Online' },
        { time: '02:00 PM', title: 'Client Call', location: 'Conference Room B' },
        { time: '04:00 PM', title: '1:1 with Manager', location: 'Manager\'s Office' }
    ];

    schedule.forEach((event, index) => {
        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `
            <div class="schedule-time">${event.time}</div>
            <p class="schedule-title">${event.title}</p>
            <p class="schedule-location">📍 ${event.location}</p>
        `;

        scheduleList.appendChild(item);

        gsap.from(item, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
}

function populateActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    activityList.innerHTML = '';

    const activities = [
        { icon: '✓', title: 'Completed Task', description: 'API integration completed', time: '2 hours ago' },
        { icon: '💬', title: 'Comment on Project', description: 'Added feedback to mobile app design', time: '4 hours ago' },
        { icon: '📅', title: 'Meeting Scheduled', description: 'Client presentation scheduled', time: '6 hours ago' },
        { icon: '🎯', title: 'Goal Updated', description: 'Q2 objectives updated', time: '1 day ago' }
    ];

    activities.forEach((activity, index) => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;

        activityList.appendChild(item);

        gsap.from(item, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            delay: index * 0.08,
            ease: 'power2.out'
        });
    });
}

function populateEmployeeProjects() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;

    projectsList.innerHTML = '';

    mockProjects.slice(0, 3).forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress" style="width: ${project.progress}%"></div>
                </div>
                <div class="progress-text">${project.progress}% Complete</div>
            </div>
        `;

        projectsList.appendChild(card);

        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out'
        });
    });
}

function setupTimeTracker() {
    const startBtn = document.getElementById('startTimerBtn');
    const pauseBtn = document.getElementById('pauseTimerBtn');
    const stopBtn = document.getElementById('stopTimerBtn');
    const timerDisplay = document.getElementById('timerDisplay');

    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;

        gsap.to(startBtn, {
            opacity: 0.5,
            duration: 0.2
        });

        gsap.to(timerDisplay, {
            scale: 1.05,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });
    });

    pauseBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        pauseBtn.textContent = 'Resume';
        startBtn.disabled = false;
        pauseBtn.disabled = true;

        gsap.to(pauseBtn, {
            backgroundColor: 'rgba(99, 102, 241, 0.3)',
            duration: 0.2
        });
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerSeconds = 0;
        updateTimerDisplay();

        startBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
        pauseBtn.textContent = 'Pause';

        gsap.to(timerDisplay, {
            color: '#6366f1',
            duration: 0.3
        });

        // Show success animation
        gsap.to(timerDisplay, {
            scale: 1.15,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'back.out'
        });
    });
}

function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;

    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

function populateLeaveHistory() {
    const leaveHistoryList = document.getElementById('leaveHistoryList');
    if (!leaveHistoryList) return;

    leaveHistoryList.innerHTML = '';

    const leaveRecords = [
        { type: 'Annual Leave', from: '2025-03-10', to: '2025-03-15', status: 'Approved' },
        { type: 'Sick Leave', from: '2025-02-20', to: '2025-02-21', status: 'Approved' },
        { type: 'Casual Leave', from: '2025-01-15', to: '2025-01-15', status: 'Rejected' }
    ];

    leaveRecords.forEach((record, index) => {
        const item = document.createElement('div');
        item.className = `leave-history-item ${record.status === 'Rejected' ? 'rejected' : ''}`;
        item.innerHTML = `
            <div class="leave-history-info">
                <h4>${record.type}</h4>
                <p>${record.from} to ${record.to}</p>
            </div>
            <span class="leave-status ${record.status === 'Rejected' ? 'rejected' : 'Approved'?.toLowerCase()}">${record.status}</span>
        `;

        leaveHistoryList.appendChild(item);

        gsap.from(item, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
}

function setupPerformance() {
    // Animate performance circles
    const performanceCards = document.querySelectorAll('.performance-card');

    performanceCards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out'
        });

        // Add hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.08,
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Animate progress ring
    const progressRing = document.querySelector('.progress-ring svg');
    if (progressRing) {
        gsap.from(progressRing, {
            rotation: -360,
            duration: 2,
            delay: 0.5,
            ease: 'power2.out'
        });
    }

    // Populate feedback
    const feedbackList = document.getElementById('feedbackList');
    if (feedbackList) {
        const feedback = [
            { author: 'Sarah (Manager)', text: 'Great work on the API integration. Clear code and excellent documentation.' },
            { author: 'Team Lead', text: 'Excellent problem-solving skills during the debugging session.' }
        ];

        feedback.forEach((item, index) => {
            const feedbackItem = document.createElement('div');
            feedbackItem.className = 'feedback-item';
            feedbackItem.innerHTML = `
                <div class="feedback-author">${item.author}</div>
                <p class="feedback-text">${item.text}</p>
            `;

            feedbackList.appendChild(feedbackItem);

            gsap.from(feedbackItem, {
                opacity: 0,
                x: -20,
                duration: 0.3,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });
    }
}

function setupEmployeeAnimations() {
    // Scroll trigger animations
    gsap.utils.toArray('.stat-card').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Kanban board animations
    const kanbanColumns = document.querySelectorAll('.kanban-column');
    kanbanColumns.forEach((column, index) => {
        gsap.from(column, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: index * 0.15,
            ease: 'power2.out'
        });
    });

    // Task hover effects
    document.querySelectorAll('.draggable-task').forEach(task => {
        task.addEventListener('mouseenter', () => {
            gsap.to(task, {
                scale: 1.05,
                y: -5,
                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        task.addEventListener('mouseleave', () => {
            gsap.to(task, {
                scale: 1,
                y: 0,
                boxShadow: '0 5px 15px rgba(99, 102, 241, 0.2)',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Leave balance animations
    document.querySelectorAll('.balance-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out'
        });

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.balance-bar .used'), {
                scaleX: 1.1,
                transformOrigin: 'left',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.balance-bar .used'), {
                scaleX: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Profile card animation
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        gsap.from(profileCard, {
            opacity: 0,
            x: -30,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

// Kanban drag and drop functionality
let draggedTask = null;

document.addEventListener('dragstart', function(e) {
    if (e.target.classList.contains('draggable-task')) {
        draggedTask = e.target;
        e.target.classList.add('dragging');

        gsap.to(e.target, {
            opacity: 0.5,
            scale: 0.95,
            duration: 0.2
        });
    }
});

document.addEventListener('dragend', function(e) {
    if (e.target.classList.contains('draggable-task')) {
        e.target.classList.remove('dragging');

        gsap.to(e.target, {
            opacity: 1,
            scale: 1,
            duration: 0.2
        });
    }
});

document.addEventListener('dragover', function(e) {
    e.preventDefault();
    const tasksColumn = e.target.closest('.tasks-column');
    if (tasksColumn) {
        gsap.to(tasksColumn, {
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            duration: 0.2
        });
    }
});

document.addEventListener('dragleave', function(e) {
    const tasksColumn = e.target.closest('.tasks-column');
    if (tasksColumn && !tasksColumn.contains(e.relatedTarget)) {
        gsap.to(tasksColumn, {
            backgroundColor: 'transparent',
            duration: 0.2
        });
    }
});

document.addEventListener('drop', function(e) {
    e.preventDefault();
    const tasksColumn = e.target.closest('.tasks-column');
    if (tasksColumn && draggedTask) {
        tasksColumn.appendChild(draggedTask);

        gsap.to(draggedTask, {
            opacity: 1,
            duration: 0.3
        });

        gsap.to(tasksColumn, {
            backgroundColor: 'transparent',
            duration: 0.2
        });

        draggedTask = null;
    }
});
