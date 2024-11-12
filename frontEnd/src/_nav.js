import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Input and Visualization',
  },
  {
    component: CNavGroup,
    name: 'Tools',
    to: '/tools',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
    items: [
      {
        component: CNavItem,
        name: 'Function Plotter',
        to: '/tools/function-plotter',
      },
      {
        component: CNavItem,
        name: "Data Upload",
        to: '/tools/data-upload',
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'Numerical Methods',
  },
  {
    component: CNavGroup,
    name: 'Root Finding',
    to: '/root-finding',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
    items: [
        {
          component: CNavItem,
          name: 'Incremental Search',
          to: '/root-finding/incremental-search',
        },
         {
          component: CNavItem,
          name: 'Bisection',
          to: '/root-finding/bisection',
        },
         {
          component: CNavItem,
          name: 'False Rule',
          to: '/root-finding/false-rule',
        },
         {
          component: CNavItem,
          name: 'Fixed Point',
          to: '/root-finding/fixed-point',
        },
         {
          component: CNavItem,
          name: 'Newton-Raphson',
          to: '/root-finding/newton-raphson',
        },
         {
          component: CNavItem,
          name: 'Secant',
          to: '/root-finding/secant',
        },
         {
          component: CNavItem,
          name: 'Multiple Roots',
          to: '/root-finding/multiple-roots',
        },
    ]
  },
  {
    component: CNavGroup,
    name: 'Linear Equation System Solving',
    to: '/linear-equation-solvers',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
    items: [
      {
        component: CNavItem,
        name: 'Gaussian Elimination',
        to: '/linear-equation-solvers/gaussian-elimination',
      },
      {
        component: CNavItem,
        name: 'LU Factorization',
        to: '/linear-equation-solvers/lu-factorization',
      },
      {
          component: CNavItem,
          name: 'Crout',
          to: '/linear-equation-solvers/crout',
      },
      {
          component: CNavItem,
          name: 'Doolittle',
          to: '/linear-equation-solvers/doolittle',
      },
      {
          component: CNavItem,
          name: 'Cholesky',
          to: '/linear-equation-solvers/cholesky',
      },
      {
          component: CNavItem,
          name: 'Jacobi',
          to: '/linear-equation-solvers/jacobi',
      },
      {
          component: CNavItem,
          name: 'Gauss-Seidel',
          to: '/linear-equation-solvers/gauss-seidel',
      },
      {
          component: CNavItem,
          name: 'S.O.R (Successive Over Relaxation)',
          to: '/linear-equation-solversg/sor',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Regression Analysis',
    to: '/regression-analysis',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
    items: [
        {
          component: CNavItem,
          name: 'Vandermonde',
          to: '/regression-analysis/vandermonde',
        },
        {
          component: CNavItem,
          name: "Newton's Divided Differences",
          to: '/regression-analysis/divided-differences',
        },
        {
          component: CNavItem,
          name: "Lagrange",
          to: '/regression-analysis/lagrange',
        },
        {
          component: CNavItem,
          name: "Spline Interpolation",
          to: '/regression-analysis/spline-interpolation',
        },
    ]
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colores',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  }
]

export default _nav
