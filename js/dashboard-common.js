// Common Dashboard Functionality
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Mock data for employees
const mockEmployees = [
    { id: 1, name: 'John Smith', email: 'john@office.com', position: 'Senior Developer', department: 'Engineering', salary: '$85,000', joined: '2022-01-15', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@office.com', position: 'Project Manager', department: 'Management', salary: '$75,000', joined: '2021-06-20', status: 'Active' },
    { id: 3, name: 'Michael Chen', email: 'michael@office.com', position: 'Designer', department: 'Design', salary: '$70,000', joined: '2022-03-10', status: 'Active' },
    { id: 4, name: 'Emma Davis', email: 'emma@office.com', position: 'Sales Executive', department: 'Sales', salary: '$65,000', joined: '2021-09-05', status: 'On Leave' },
    { id: 5, name: 'David Wilson', email: 'david@office.com', position: 'Backend Developer', department: 'Engineering', salary: '$80,000', joined: '2022-02-01', status: 'Active' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa@office.com', position: 'Marketing Manager', department: 'Marketing', salary: '$72,000', joined: '2021-07-15', status: 'Active' }
];

// Mock tasks
const mockTasks = [
    { id: 1, title: 'Design landing page', description: 'Create new landing page design', status: 'in-progress', priority: 'high', dueDate: '2025-04-15', assignee: 'Michael Chen' },
    { id: 2, title: 'API integration', description: 'Integrate payment gateway API', status: 'pending', priority: 'high', dueDate: '2025-04-10', assignee: 'John Smith' },
    { id: 3, title: 'Database optimization', description: 'Optimize slow queries', status: 'completed', priority: 'medium', dueDate: '2025-04-05', assignee: 'David Wilson' },
    { id: 4, title: 'Security audit', description: 'Perform security audit', status: 'pending', priority: 'high', dueDate: '2025-04-20', assignee: 'Sarah Johnson' },
    { id: 5, title: 'Client meeting', description: 'Q2 review meeting', status: 'pending', priority: 'medium', dueDate: '2025-04-08', assignee: 'Sarah Johnson' }
];

// Mock projects
const mockProjects = [
    { id: 1, name: 'E-Commerce Platform', description: 'New online store platform', progress: 75, team: ['John Smith', 'David Wilson'], deadline: '2025-05-30', status: 'active' },
    { id: 2, name: 'Mobile App', description: 'iOS and Android app', progress: 45, team: ['Michael Chen', 'John Smith'], deadline: '2025-06-15', status: 'active' },
    { id: 3, name: 'AI Analytics', description: 'Advanced analytics dashboard', progress: 30, team: ['David Wilson', 'Sarah Johnson'], deadline: '2025-07-01', status: 'active' },
    { id: 4, name: 'Cloud Migration', description: 'Migrate to cloud infrastructure', progress: 90, team: ['All'], deadline: '2025-04-30', status: 'active' }
];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    handleNavigation();
    animateElements();
    createCharts();
    animateStats();
});

function initDashboard() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Set user name
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => el.textContent = user.name);

    // Set page title greeting
    const greeting = document.querySelector('#greeting');
    if (greeting) {
        const hour = new Date().getHours();
        let greeting_text = '';
        if (hour < 12) greeting_text = 'Good morning! 🌅';
        else if (hour < 18) greeting_text = 'Good afternoon! ☀️';
        else greeting_text = 'Good evening! 🌙';
        greeting.textContent = greeting_text;
    }
}

function handleNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const sidebar = document.querySelector('.sidebar');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Get target section
            const targetSection = item.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);

            if (!targetElement) return;

            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Hide all sections with animation
            sections.forEach(section => {
                if (section.classList.contains('active')) {
                    gsap.to(section, {
                        opacity: 0,
                        y: 10,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            section.classList.remove('active');
                        }
                    });
                }
            });

            // Show target section with animation
            setTimeout(() => {
                targetElement.classList.add('active');
                gsap.from(targetElement, {
                    opacity: 0,
                    y: 10,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                // Scroll to top
                document.querySelector('.content-container').scrollTop = 0;
            }, 300);

            // Close sidebar on mobile after clicking a nav item
            if (window.innerWidth <= 1024 && sidebar) {
                sidebar.classList.remove('active');
                gsap.to(sidebar, {
                    x: -280,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

function animateElements() {
    // Animate cards on page load
    const cards = document.querySelectorAll('.stat-card, .chart-container, .card');
    cards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Sidebar toggle and mobile menu handling
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                gsap.to(sidebar, {
                    x: -260,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            } else {
                sidebar.classList.add('active');
                gsap.to(sidebar, {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                const isClickOnSidebar = sidebar.contains(e.target);
                const isClickOnToggle = sidebarToggle.contains(e.target);
                
                if (!isClickOnSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    gsap.to(sidebar, {
                        x: -260,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                gsap.set(sidebar, { x: 0 });
            }
        });
    }
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-value]');

    statNumbers.forEach(el => {
        const value = parseInt(el.getAttribute('data-value'));
        gsap.to(el, {
            textContent: value,
            duration: 2,
            delay: 0.5,
            ease: 'power1.inOut',
            snap: { textContent: 1 },
            onUpdate: function() {
                el.textContent = Math.floor(this.targets()[0].textContent);
            }
        });
    });
}

function createCharts() {
    // Department Chart
    const deptChartElement = document.getElementById('deptChart');
    if (deptChartElement) {
        new Chart(deptChartElement, {
            type: 'bar',
            data: {
                labels: ['Sales', 'Engineering', 'Marketing', 'HR', 'Design'],
                datasets: [{
                    label: 'Department Performance',
                    data: [85, 92, 78, 88, 95],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.6)',
                        'rgba(139, 92, 246, 0.6)',
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(16, 185, 129, 0.6)',
                        'rgba(236, 72, 153, 0.6)'
                    ],
                    borderColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#3b82f6',
                        '#10b981',
                        '#ec4899'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: { size: 12, weight: '600' }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#cbd5e1'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Timeline Chart (Project timeline)
    const timelineChartElement = document.getElementById('timelineChart');
    if (timelineChartElement) {
        new Chart(timelineChartElement, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [{
                    label: 'Project Progress',
                    data: [20, 35, 45, 60, 75, 90],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#0f172a',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: { size: 12, weight: '600' }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#cbd5e1'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Team Chart (for manager)
    const teamChartElement = document.getElementById('teamChart');
    if (teamChartElement) {
        new Chart(teamChartElement, {
            type: 'doughnut',
            data: {
                labels: ['On Track', 'At Risk', 'Completed'],
                datasets: [{
                    data: [55, 25, 20],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(99, 102, 241, 0.7)'
                    ],
                    borderColor: ['#10b981', '#f59e0b', '#6366f1'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: { size: 12, weight: '600' }
                        }
                    }
                }
            }
        });
    }

    // Weekly Chart (for employee)
    const weeklyChartElement = document.getElementById('weeklyChart');
    if (weeklyChartElement) {
        new Chart(weeklyChartElement, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Hours Logged',
                    data: [8, 8.5, 8, 7.5, 8, 4, 0],
                    backgroundColor: 'rgba(99, 102, 241, 0.6)',
                    borderColor: '#6366f1',
                    borderWidth: 2,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: { size: 12, weight: '600' }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#cbd5e1'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Revenue vs Expense Chart
    const revenueChartElement = document.getElementById('revenueExpenseChart');
    if (revenueChartElement) {
        new Chart(revenueChartElement, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [650, 750, 800, 850, 900, 950],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#10b981'
                    },
                    {
                        label: 'Expense',
                        data: [450, 500, 520, 550, 600, 620],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#ef4444'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1',
                            font: { size: 12, weight: '600' }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#cbd5e1'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Performance Chart
    const performanceChartElement = document.getElementById('performanceChart');
    if (performanceChartElement) {
        new Chart(performanceChartElement, {
            type: 'radar',
            data: {
                labels: ['Quality', 'Speed', 'Reliability', 'Teamwork', 'Innovation'],
                datasets: [{
                    label: 'Your Score',
                    data: [95, 87, 92, 88, 85],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#6366f1'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1'
                        }
                    }
                },
                scales: {
                    r: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Productivity Chart
    const productivityChartElement = document.getElementById('productivityChart');
    if (productivityChartElement) {
        new Chart(productivityChartElement, {
            type: 'area',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [{
                    label: 'Productivity Score',
                    data: [65, 72, 68, 78, 85, 82, 88, 92],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6366f1'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#cbd5e1'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Department Budget Chart
    const departmentBudgetElement = document.getElementById('departmentBudgetChart');
    if (departmentBudgetElement) {
        new Chart(departmentBudgetElement, {
            type: 'horizontalBar',
            data: {
                labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Design'],
                datasets: [{
                    label: 'Budget ($K)',
                    data: [150, 120, 90, 60, 70],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.6)',
                        'rgba(139, 92, 246, 0.6)',
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(16, 185, 129, 0.6)',
                        'rgba(236, 72, 153, 0.6)'
                    ],
                    borderColor: [
                        '#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#ec4899'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        labels: {
                            color: '#cbd5e1'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#cbd5e1'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Expose mock data globally
window.mockEmployees = mockEmployees;
window.mockTasks = mockTasks;
window.mockProjects = mockProjects;
