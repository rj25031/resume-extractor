import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <ul className="flex space-x-6">
          <li>
            <NavLink
              exact
              to="/"
              className="px-3 py-2 rounded-md  font-medium text-gray-700 hover:text-blue-500"
              activeClassName="text-blue-500"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resumes"
              className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-500"
              activeClassName="text-blue-500"
            >
              Resumes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/edit-resume"
              className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-500"
              activeClassName="text-blue-500"
            >
              Edit Resume
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header