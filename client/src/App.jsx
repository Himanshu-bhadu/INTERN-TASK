import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormData from './components/FormData'
import DataList from './components/DataList'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
  <Router>
      <div className="min-h-screen bg-gray-400 py-10 px-4">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center text-red-700 mb-10">
            MERN Contact Manager
          </h1>

          <Routes>
            <Route path="/" element={<FormData />} />
            <Route path="/entries" element={<DataList />} />
          </Routes>

        </div>
      </div>
    </Router>
  )
}

export default App
