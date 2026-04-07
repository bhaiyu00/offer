// Boss Dashboard Specific Functionality with Advanced GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initBossDashboard();
});

function initBossDashboard() {
    // Populate employees table
    const employeesTableBody = document.getElementById('employeesTableBody');
    if (employeesTableBody) {
        populateEmployeesTable();
    }

    // Populate projects
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        populateProjects();
    }

    // Populate top performers
    const topPerformers = document.getElementById('topPerformers');
    if (topPerformers) {
        populateTopPerformers();
    }

    // Setup add employee modal
    setupAddEmployeeModal();

    // Setup filter interactions
    setupFilters();

    // Advanced animations
    setupAdvancedAnimations();
}

function populateEmployeesTable() {
    const tbody = document.getElementById('employeesTableBody');
    tbody.innerHTML = '';

    mockEmployees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td>
                <span class="status-badge ${employee.status === 'Active' ? 'active' : employee.status === 'On Leave' ? 'on-leave' : 'inactive'}">
                    ${employee.status}
                </span>
            </td>
            <td>${employee.salary}</td>
            <td>${employee.joined}</td>
            <td>
                <button class="action-btn" onclick="editEmployee(${employee.id})">Edit</button>
                <button class="action-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);

        // Animate row
        gsap.from(row, {
            opacity: 0,
            x: -20,
            duration: 0.4,
            delay: index * 0.05,
            ease: 'power2.out'
        });
    });
}

function populateProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    mockProjects.forEach((project, index) => {
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
            <div class="project-footer">
                <span>${project.deadline}</span>
                <span class="status-badge active">${project.status}</span>
            </div>
        `;

        grid.appendChild(card);

        // Hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.2)',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

function populateTopPerformers() {
    const list = document.getElementById('topPerformers');
    if (!list) return;

    list.innerHTML = '';

    const topPerformersData = [
        { name: 'Sarah Johnson', score: 98, dept: 'Management' },
        { name: 'Michael Chen', score: 96, dept: 'Design' },
        { name: 'Lisa Anderson', score: 94, dept: 'Marketing' },
        { name: 'John Smith', score: 92, dept: 'Engineering' }
    ];

    topPerformersData.forEach((performer, index) => {
        const item = document.createElement('li');
        item.style.padding = '1rem';
        item.style.background = 'rgba(30, 41, 59, 0.4)';
        item.style.borderRadius = '6px';
        item.style.marginBottom = '0.75rem';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        item.innerHTML = `
            <div>
                <strong style="color: #f1f5f9;">${performer.name}</strong>
                <p style="margin: 0; color: #94a3b8; font-size: 0.85rem;">${performer.dept}</p>
            </div>
            <span style="color: #6366f1; font-weight: 700; font-size: 1.2rem;">${performer.score}%</span>
        `;

        list.appendChild(item);

        gsap.from(item, {
            opacity: 0,
            x: -20,
            duration: 0.4,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
}

function setupAddEmployeeModal() {
    const modal = document.getElementById('employeeModal');
    const addBtn = document.getElementById('addEmployeeBtn');
    const closeBtn = document.querySelector('.modal-close');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const employeeForm = document.getElementById('employeeForm');

    if (!modal || !addBtn) return;

    addBtn.addEventListener('click', () => {
        modal.classList.add('active');
        gsap.from(modal, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    const closeModal = () => {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                modal.classList.remove('active');
            }
        });
    };

    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const btn = employeeForm.querySelector('button[type="submit"]');
        btn.textContent = '✓ Employee Added!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        btn.disabled = true;

        setTimeout(() => {
            closeModal();
            employeeForm.reset();
            btn.textContent = 'Add Employee';
            btn.style.background = '';
            btn.disabled = false;
            populateEmployeesTable();
        }, 1500);
    });
}

function setupFilters() {
    const filterInputs = document.querySelectorAll('.filter-bar input, .filter-bar select, .filter-btn');

    filterInputs.forEach(input => {
        input.addEventListener('change', () => {
            // Animate table or content update
            const tableBody = document.getElementById('employeesTableBody');
            if (tableBody) {
                gsap.to(tableBody, {
                    opacity: 0.5,
                    duration: 0.2,
                    ease: 'power2.out',
                    onComplete: () => {
                        populateEmployeesTable();
                        gsap.to(tableBody, {
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });
            }
        });
    });
}

function setupAdvancedAnimations() {
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

    // Parallax effect on charts
    document.querySelectorAll('.chart-container').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            onEnter: () => {
                gsap.to(element, {
                    y: -10,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Hover animation for insight cards
    document.querySelectorAll('.insight-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.03,
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.alert-icon'), {
                scale: 1.2,
                rotation: 10,
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

            gsap.to(card.querySelector('.alert-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Table row hover effects
    document.querySelectorAll('.employees-table tbody tr').forEach(row => {
        row.addEventListener('mouseenter', () => {
            gsap.to(row, {
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        row.addEventListener('mouseleave', () => {
            gsap.to(row, {
                backgroundColor: 'transparent',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// Employee management functions
function editEmployee(id) {
    const employee = mockEmployees.find(e => e.id === id);
    if (!employee) return;

    const modal = document.getElementById('employeeModal');
    const form = document.getElementById('employeeForm');
    
    // Populate form
    const inputs = form.querySelectorAll('input, select');
    inputs[0].value = employee.name;
    inputs[1].value = employee.email;
    inputs[2].value = employee.position;
    inputs[3].value = employee.department;
    inputs[4].value = employee.salary.replace('$', '').replace(',', '');

    modal.classList.add('active');
    form.querySelector('button[type="submit"]').textContent = 'Update Employee';
}

function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        const index = mockEmployees.findIndex(e => e.id === id);
        if (index > -1) {
            const row = document.querySelector(`tr[data-id="${id}"]`);
            if (row) {
                gsap.to(row, {
                    opacity: 0,
                    x: -50,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        row.remove();
                    }
                });
            }
            mockEmployees.splice(index, 1);
            populateEmployeesTable();
        }
    }
}

// Advanced filter animation
function animateFilterTransition() {
    gsap.timeline()
        .to('.employees-table, .projects-grid', {
            opacity: 0.3,
            duration: 0.2
        })
        .to('.employees-table, .projects-grid', {
            opacity: 1,
            duration: 0.4
        }, 0.2);
}
