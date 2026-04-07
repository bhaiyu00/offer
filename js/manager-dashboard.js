// Manager Dashboard Specific Functionality
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initManagerDashboard();
});

function initManagerDashboard() {
    // Populate team
    populateTeamGrid();

    // Populate tasks
    populateTasks();

    // Populate projects
    populateProjects();

    // Populate upcom tasks
    populateUpcomingTasks();

    // Setup calendar
    setupCalendar();

    // Advanced animations
    setupManagerAnimations();
}

function populateTeamGrid() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;

    teamGrid.innerHTML = '';

    const teamMembers = [
        { name: 'John Smith', position: 'Senior Developer', department: 'Engineering', status: 'Active' },
        { name: 'Michael Chen', position: 'Designer', department: 'Design', status: 'Active' },
        { name: 'Emma Davis', position: 'Junior Developer', department: 'Engineering', status: 'Active' },
        { name: 'Lisa Anderson', position: 'Coordinator', department: 'Engineering', status: 'Active' }
    ];

    teamMembers.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <img src="https://ui-avatars.com/api/?name=${member.name}" alt="${member.name}" class="team-card-avatar">
            <h3>${member.name}</h3>
            <p class="position">${member.position}</p>
            <p class="department">${member.department}</p>
            <span class="status">${member.status}</span>
        `;

        teamGrid.appendChild(card);

        // Animate card
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out'
        });

        // Click animation
        card.addEventListener('click', () => {
            gsap.to(card, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power1.inOut'
            });
        });
    });
}

function populateTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    if (!tasksContainer) return;

    tasksContainer.innerHTML = '';

    mockTasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.status === 'completed' ? 'completed' : ''} ${task.priority === 'high' && task.status !== 'completed' ? 'overdue' : ''}`;
        
        taskItem.innerHTML = `
            <div class="task-item-info">
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <div class="task-item-assignee">
                    <img src="https://ui-avatars.com/api/?name=${task.assignee}" alt="${task.assignee}" style="width: 24px; height: 24px; border-radius: 50%;">
                    <span style="color: #94a3b8; font-size: 0.85rem;">${task.assignee}</span>
                </div>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <span class="task-item-priority ${task.priority}">${task.priority}</span>
                <span style="color: #94a3b8; font-size: 0.85rem;">${task.dueDate}</span>
            </div>
        `;

        tasksContainer.appendChild(taskItem);

        // Animate task
        gsap.from(taskItem, {
            opacity: 0,
            x: -20,
            duration: 0.4,
            delay: index * 0.05,
            ease: 'power2.out'
        });

        // Hover animation
        taskItem.addEventListener('mouseenter', () => {
            gsap.to(taskItem, {
                x: 5,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        taskItem.addEventListener('mouseleave', () => {
            gsap.to(taskItem, {
                x: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

function populateProjects() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;

    projectsList.innerHTML = '';

    mockProjects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        
        projectItem.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress" style="width: ${project.progress}%"></div>
                </div>
                <p class="progress-text">${project.progress}% Complete</p>
            </div>
            <div class="project-team">
                ${project.team.map(member => 
                    `<img src="https://ui-avatars.com/api/?name=${member}" alt="${member}" title="${member}">`
                ).join('')}
            </div>
        `;

        projectsList.appendChild(projectItem);

        // Animate
        gsap.from(projectItem, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
}

function populateUpcomingTasks() {
    const upcomingList = document.getElementById('upcomingList');
    if (!upcomingList) return;

    upcomingList.innerHTML = '';

    const upcomingTasks = mockTasks.filter(t => t.status !== 'completed').slice(0, 4);

    upcomingTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'tasks-list li';
        li.innerHTML = `
            <p class="task-title">${task.title}</p>
            <p class="task-time">Due: ${task.dueDate}</p>
        `;

        upcomingList.appendChild(li);

        gsap.from(li, {
            opacity: 0,
            x: -15,
            duration: 0.3,
            delay: index * 0.08,
            ease: 'power2.out'
        });
    });
}

function setupCalendar() {
    const calendarElement = document.getElementById('calendar');
    if (!calendarElement) return;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month display
    const monthElement = document.getElementById('currentMonth');
    if (monthElement) {
        monthElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    // Create calendar grid
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarElement.innerHTML = '';

    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day header';
        header.textContent = day;
        calendarElement.appendChild(header);
    });

    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day';
        calendarElement.appendChild(emptyCell);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;

        if (day === currentDate.getDate()) {
            dayCell.classList.add('today');
        }

        dayCell.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('today'));
            dayCell.classList.add('today');
        });

        // Animate
        gsap.from(dayCell, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            delay: (firstDay + day) * 0.02,
            ease: 'back.out'
        });

        calendarElement.appendChild(dayCell);
    }
}

function setupManagerAnimations() {
    // Scroll trigger for cards
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

    // Team card animations
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.08,
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.team-card-avatar'), {
                scale: 1.1,
                rotatez: 5,
                duration: 0.3,
                ease: 'back.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.team-card-avatar'), {
                scale: 1,
                rotatez: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Project item animations
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.03,
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to(item.querySelector('.progress'), {
                scaleX: 1.05,
                transformOrigin: 'left',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });

            gsap.to(item.querySelector('.progress'), {
                scaleX: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Task item stagger animation
    const taskItems = document.querySelectorAll('.task-item');
    gsap.from(taskItems, {
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
    });

    // Calendar hover effects
    document.querySelectorAll('.calendar-day').forEach(day => {
        if (!day.classList.contains('header')) {
            day.addEventListener('mouseenter', () => {
                gsap.to(day, {
                    scale: 1.15,
                    duration: 0.2,
                    ease: 'back.out'
                });
            });

            day.addEventListener('mouseleave', () => {
                gsap.to(day, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        }
    });
}

// Filter interactions
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Animate content refresh
            gsap.to('#tasksContainer, #projectsList', {
                opacity: 0.5,
                duration: 0.2,
                ease: 'power1.out'
            });

            setTimeout(() => {
                gsap.to('#tasksContainer, #projectsList', {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power1.in'
                });
            }, 200);
        });
    });
});
