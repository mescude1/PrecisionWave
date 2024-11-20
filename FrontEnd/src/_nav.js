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
        to: '/tools/visualizer',
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
    to: '/matrix-solvers',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
    items: [
      {
        component: CNavItem,
        name: 'Gaussian Elimination',
        to: '/matrix-solvers/gaussian-elimination',
      },
      {
        component: CNavItem,
        name: 'LU Factorization',
        to: '/matrix-solvers/lu-factorization',
      },
      {
          component: CNavItem,
          name: 'Crout',
          to: '/matrix-solvers/crout',
      },
      {
          component: CNavItem,
          name: 'Doolittle',
          to: '/matrix-solvers/doolittle',
      },
      {
          component: CNavItem,
          name: 'Cholesky',
          to: '/matrix-solvers/cholesky',
      },
      {
          component: CNavItem,
          name: 'Jacobi',
          to: '/matrix-solvers/jacobi',
      },
      {
          component: CNavItem,
          name: 'Gauss-Seidel',
          to: '/matrix-solvers/gauss-seidel',
      },
      {
          component: CNavItem,
          name: 'S.O.R (Successive Over Relaxation)',
          to: '/matrix-solvers/sor',
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
          to: '/interpolation/vandermonde',
        },
        {
          component: CNavItem,
          name: "Newton's Divided Differences",
          to: '/interpolation/divided-differences',
        },
        {
          component: CNavItem,
          name: "Lagrange",
          to: '/interpolation/lagrange',
        },
        {
          component: CNavItem,
          name: "Spline Interpolation",
          to: '/interpolation/spline-interpolation',
        },
    ]
  }

]

export default _nav
