# OfficeHub Pro - Enterprise Office Management System

A comprehensive, fully functional office management website with role-based access, advanced GSAP animations, and real-time analytics.

## Features

### 🔐 Authentication System
- **Three User Roles**: Boss/CEO, Manager, Employee
- **Secure Login**: Email and password based authentication
- **Demo Credentials**: Pre-configured accounts for testing
- **Session Management**: Auto-redirect and logout functionality

### 👔 Boss/CEO Dashboard
**Full Administrative Control**
- **Employee Management**: Add, edit, delete employees with real-time updates
- **Department Performance**: Visual analytics and metrics
- **Project Timeline**: Track project progress across the organization
- **Finance Dashboard**: Revenue, expenses, profit margins, and budget allocation
- **Advanced Reports**: Monthly summaries, financial statements, compliance reports
- **System Settings**: Global configuration and access control
- **Complete Insights**: Alerts, achievements, and deadline reminders

### 📊 Manager Dashboard
**Team Leadership & Operations**
- **Team Management**: View and manage team members
- **Task Management**: Assign, track, and monitor tasks
- **Project Oversight**: Monitor assigned projects
- **Team Calendar**: Schedule and event management
- **Leave Requests**: Approve/reject team member leave
- **Team Reports**: Performance and attendance analytics
- **Upcoming Tasks**: Quick view of pending actions

### 👨‍💼 Employee Dashboard
**Personal Productivity**
- **My Tasks**: Kanban-style task management (Pending, In Progress, Completed)
- **Time Tracking**: Built-in timer with project tracking
- **Weekly Hours**: Visual representation of logged hours
- **Performance Metrics**: Individual performance scores and feedback
- **Leave Management**: Request and track leave balance
- **Profile Management**: Update personal information
- **Activity Feed**: Recent activities and updates

## Advanced Features

### 🎨 Advanced GSAP Animations
- **Scroll Trigger Animations**: Elements animate as they enter viewport
- **Interactive Hover Effects**: Smooth card and button interactions
- **Staggered Animations**: Sequential element animations
- **Progress Animations**: Animated counter numbers
- **Parallax Effects**: Depth-based element movements
- **Ripple Effects**: Click feedback animations
- **Drag & Drop**: Smooth task transitions with GSAP

### 📈 Real-time Data Visualization
- **Chart.js Integration**: Multiple chart types
  - Bar Charts (Performance, Budget)
  - Line Charts (Timeline, Revenue Trends)
  - Doughnut Charts (Status Breakdown)
  - Area Charts (Productivity Trends)
  - Radar Charts (Performance Metrics)
  - Horizontal Bar Charts (Department Budgets)

### 🎯 Dashboard Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Modern dark mode with gradient backgrounds
- **Real-time Updates**: Mock data with state management
- **Role-Based Access Control**: Different views for different roles
- **Search & Filter**: Advanced filtering capabilities
- **Modal Forms**: Beautiful modal dialogs for data entry
- **Navigation Sidebar**: Quick access to all sections

## Getting Started

### Opening the Application

1. Open `index.html` in your browser
2. Login with demo credentials:

#### Boss/CEO Account
- **Email**: boss@office.com
- **Password**: boss123

#### Manager Account
- **Email**: manager@office.com
- **Password**: manager123

#### Employee Account
- **Email**: employee@office.com
- **Password**: emp123

### File Structure

```
offer/
├── index.html                  # Login page
├── boss-dashboard.html         # Boss dashboard
├── manager-dashboard.html      # Manager dashboard
├── employee-dashboard.html     # Employee dashboard
├── styles/
│   ├── main.css              # Global styles
│   ├── login.css             # Login page styles
│   ├── dashboard.css         # Common dashboard styles
│   ├── boss-dashboard.css    # Boss dashboard styles
│   ├── manager-dashboard.css # Manager dashboard styles
│   └── employee-dashboard.css# Employee dashboard styles
└── js/
    ├── auth.js               # Authentication system
    ├── login-animations.js   # Login page GSAP animations
    ├── dashboard-common.js   # Common dashboard functionality
    ├── boss-dashboard.js     # Boss dashboard functionality
    ├── manager-dashboard.js  # Manager dashboard functionality
    └── employee-dashboard.js # Employee dashboard functionality
```

## Technical Stack

### Frontend Technologies
- **HTML5**: Semantic markup
- **CSS3**: Advanced styling with variables and gradients
- **JavaScript (ES6+)**: Modern async/await patterns
- **GSAP 3.12**: Advanced animation library
  - ScrollTrigger Plugin
  - TextPlugin
- **Chart.js 3.9**: Data visualization
- **LocalStorage**: Client-side data persistence

### Design Pattern
- **Modular Architecture**: Separated concerns
- **Component-based**: Reusable UI components
- **Responsive Grid System**: Flexible layouts
- **Dark Mode First**: Modern design approach

## Key Features Explained

### 1. Authentication System
```javascript
// Uses localStorage for session management
// Demo users stored for easy testing
// Auto-redirect based on user role
```

### 2. GSAP Animations
- **gsap.to()**: Animate to target values
- **gsap.from()**: Animate from values
- **Timeline**: Sequential animations
- **ScrollTrigger**: Viewport-based animations
- **Stagger**: Sequential element animations

### 3. Data Management
- **Mock Data**: Pre-configured employee and task data
- **Real-time Updates**: Animations reflect data changes
- **Responsive Updates**: Charts update dynamically

### 4. Dashboard Features
- **Section Navigation**: Click nav items to switch views
- **Active States**: Visual feedback for current section
- **Responsive Sidebar**: Collapses on mobile devices
- **Search/Filter**: Quick data filtering

## Advanced GSAP Techniques Used

### 1. Scroll-Triggered Animations
```javascript
gsap.from(element, {
    scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        toggleActions: 'play none none reverse'
    },
    // animation properties
});
```

### 2. Staggered Animations
```javascript
gsap.from('.stat-card', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1 // 0.1s delay between each element
});
```

### 3. Interactive Hover Effects
```javascript
element.addEventListener('mouseenter', () => {
    gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
    });
});
```

### 4. Drag & Drop with Animations
```javascript
// Smooth drag animations with GSAP
// Responsive feedback on drag events
```

## Customization Guide

### Changing Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... other colors */
}
```

### Adding Employees
Edit `mockEmployees` array in `js/dashboard-common.js`:
```javascript
const mockEmployees = [
    { id: 1, name: 'Name', email: 'email@office.com', /* ... */ }
];
```

### Modifying Animations
Edit animation duration and easing in respective JS files:
```javascript
gsap.to(element, {
    duration: 0.5,      // Change duration
    ease: 'power2.out'  // Change easing
});
```

## Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Responsive support

## Performance Optimizations

1. **Efficient Animations**: Uses GPU-accelerated transforms
2. **Lazy Chart Rendering**: Charts created on demand
3. **Event Delegation**: Reduced event listeners
4. **CSS Variables**: Reduced file size
5. **Responsive Images**: Avatar generation on-demand

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab through elements
- **Color Contrast**: WCAG compliant colors
- **Reduce Motion**: Respects prefers-reduced-motion

## Future Enhancements

- Backend API integration
- Real database connectivity
- WebSocket for real-time updates
- Advanced report generation (PDF export)
- Email notification system
- 2FA authentication
- Dark/Light theme toggle
- Multi-language support
- Advanced analytics engine

## Troubleshooting

### Animations not playing?
- Check if GSAP library is loaded
- Ensure JavaScript is enabled
- Check browser console for errors

### Charts not displaying?
- Verify Chart.js CDN is accessible
- Check browser console for errors
- Ensure chart element IDs match

### Login issues?
- Clear browser cache and cookies
- Check demo credentials
- Verify localStorage is enabled

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions, please refer to the code comments or check the browser console for error messages.

---

**Developed with ❤️ using GSAP and Chart.js**

Version: 1.0.0  
Last Updated: April 2026
