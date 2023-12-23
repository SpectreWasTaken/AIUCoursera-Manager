import "./App.css";

function App() {
  return (
    <>
      <div className="nav">
        <ul>
          <li>
            <a href="">Courses</a>
          </li>
          <li>
            <a href="">Course Management</a>
          </li>
          <li>
            <a href="">Coursera Assignment</a>
          </li>
          <li>
            <a href="">Student Accomplishment</a>
          </li>
          <li>
            <a href="">
              <button>Sign In</button>
            </a>
          </li>
        </ul>
      </div>
      <div className="main__body">
        <p>
          Currently only basic functionality is available, please select from
          the following
        </p>
        <div className="main__body__options"></div>
        <a href="">
          <button>Get All Instructors</button>
        </a>
        <a href="">
          <button>Get All Students</button>
        </a>
        <a href="">
          <button>Get Coursera Mapping for Courses</button>
        </a>
        <a href="">
          <button>
            Get Amount of students for each course that have requested that
            course
          </button>
        </a>
      </div>
    </>
  );
}

export default App;
