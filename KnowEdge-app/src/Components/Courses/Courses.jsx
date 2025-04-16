import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Courses.css'

const Courses = () => {
  return (
    
    <div className="Couses">
        
        <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
</ul>
    </div>
  )
}

export default Courses