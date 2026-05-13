const dashboardRoleConfig = {
  STUDENT: {
    eyebrow: 'Student Workspace',
    label: 'Learning Dashboard',
    description: 'Manage your library, wishlist, cart, orders, and learning progress from one workspace.',
    quickLinks: [
      { label: 'Browse Courses', to: '/courses' },
      { label: 'Learning Paths', to: '/beginner' }
    ],
    sections: [
      {
        title: 'Learning',
        items: [
          { label: 'Overview', to: '/dashboard', matchNames: ['DashboardOverview'] },
          { label: 'My Courses', to: '/dashboard/my-courses', matchNames: ['MyEnrolledCourses'] },
          { label: 'Wishlist', to: '/dashboard/wishlist', matchNames: ['WishlistView'] },
          { label: 'Cart', to: '/dashboard/cart', matchNames: ['CartView'] },
          { label: 'Orders', to: '/dashboard/orders', matchNames: ['OrdersView', 'OrderDetailsView'] }
        ]
      },
      {
        title: 'Account',
        items: [
          { label: 'Settings', to: '/dashboard/settings', matchNames: ['DashboardSettings'] }
        ]
      }
    ]
  },
  INSTRUCTOR: {
    eyebrow: 'Instructor Workspace',
    label: 'Teaching Dashboard',
    description: 'Operate your course studio, track publishing, and manage instructor settings.',
    quickLinks: [
      { label: 'Course Studio', to: '/dashboard/instructor-panel?tab=courses' },
      { label: 'Public Catalog', to: '/courses' }
    ],
    sections: [
      {
        title: 'Workspace',
        items: [
          { label: 'Overview', to: '/dashboard', matchNames: ['DashboardOverview'] },
          { label: 'Instructor Panel', to: '/dashboard/instructor-panel', matchNames: ['InstructorPanel'] },
          { label: 'Course Studio', to: '/dashboard/instructor-panel?tab=courses', matchNames: ['InstructorPanel'] }
        ]
      },
      {
        title: 'Account',
        items: [
          { label: 'Settings', to: '/dashboard/settings', matchNames: ['DashboardSettings'] }
        ]
      }
    ]
  },
  ADMIN: {
    eyebrow: 'Admin Workspace',
    label: 'Operations Dashboard',
    description: 'Monitor platform health, manage moderation, and access admin controls from one place.',
    quickLinks: [
      { label: 'Admin Panel', to: '/dashboard/admin-panel' },
      { label: 'Support Center', to: '/support' }
    ],
    sections: [
      {
        title: 'Operations',
        items: [
          { label: 'Overview', to: '/dashboard', matchNames: ['DashboardOverview'] },
          { label: 'Admin Panel', to: '/dashboard/admin-panel', matchNames: ['AdminPanel'] }
        ]
      },
      {
        title: 'Account',
        items: [
          { label: 'Settings', to: '/dashboard/settings', matchNames: ['DashboardSettings'] }
        ]
      }
    ]
  }
}

const routeDescriptions = {
  DashboardOverview: 'Role-based snapshot of your most important activity and operational metrics.',
  MyEnrolledCourses: 'Track active enrollments, continue lessons, and monitor course completion progress.',
  WishlistView: 'Keep shortlisted courses visible until you are ready to enroll or move them into checkout.',
  CartView: 'Review selected courses and create a pending order before payment confirmation.',
  OrdersView: 'Track created orders, initialize payment, and verify completed purchases.',
  OrderDetailsView: 'Review order items, payment status, and next actions for a single purchase.',
  DashboardSettings: 'Update account profile, media, email, and instructor-specific public details.',
  InstructorPanel: 'Access publishing, student, revenue, review, and studio operations for your courses.',
  AdminPanel: 'Manage users, courses, content, and platform workflows from the admin control surface.'
}

export const getDashboardRoleConfig = (role) => dashboardRoleConfig[role] || dashboardRoleConfig.STUDENT

export const getDashboardRouteDescription = (routeName) =>
  routeDescriptions[routeName] || 'Use this workspace to manage the next actions for your role.'
