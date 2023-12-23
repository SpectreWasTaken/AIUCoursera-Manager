const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
app.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "DatabaseProject", // Replace with your actual database name
});

conn.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database!");
});

app.get("/GET-CONN-STATE", (req, res) => {
  res.send(conn.state);
});

app.post("/ADD-NEW-COURSE", (req, res) => {
  console.log(req.body);
  console.log("WIP, Course Added");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/GET-ALL-COURSES", (req, res) => {
  const query = "SELECT * FROM `Aiu_Course`;";

  conn.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error in executing the query");
    } else {
      res.json(results);
    }
  });
});
app.post("/ASSIGN-COURSE-TO-INST/:id", (req, res) => {
  res.send("Work In Progress, Instructor ID sent:", id);
});

app.get("/GET-ALL-INSTRUCTORS", (req, res) => {
  query =
    "SELECT I.Inst_ID, I.firstName, I.secondName, C.Course_Name" +
    "FROM Instructor I, Aiu_Course C, Inst_AIUCourse IC" +
    "WHERE I.Inst_ID = IC.Inst_ID" +
    "AND C.Course_ID = IC.Course_ID" +
    "ORDER BY Inst_ID;";

  conn.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error in executing the query GET-ALL-INSTRUCTOR");
    } else {
      res.json(results);
    }
  });
});

app.get("/GET-ALL-COURSES", (req, res) => {
  query =
    "SELECT C.Course_ID, C.Course_Name, I.Inst_ID," +
    "FROM Aiu_Course C, Instructor I, Inst_AIUCourse IC" +
    "WHERE C.Course_ID = IC.Course_ID" +
    "AND I.Inst_ID = IC.Inst_ID" +
    "ORDER BY Course_ID;";
  conn.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error in executing the query GET-ALL-COURSES");
    } else {
      res.json(results);
    }
  });
});

app.get("/GET-ALL-STUDENTS", (req, res) => {
  query =
    "SELECT S.Student_ID, S.firstName, S.secondName, C.Course_Name, SC.Semester" +
    "FROM Student S, Aiu_Course C, Student_in_AIUCourse SC" +
    "WHERE S.Student_ID = SC.Student_ID" +
    "AND C.Course_ID = SC.Course_ID" +
    "ORDER BY Student_ID;";
  conn.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error in executing the query GET-ALL-STUDENTS");
    } else {
      res.json(results);
    }
  });
});

app.get("/GET-COURSERA-MAPPING", (req, res) => {
  query =
    "SELECT C.Course_Name AS Course_Name, I.firstName as InstFirstName, I.secondName as InstSecondName, SC.Week_Completed as Completed_Weeks" +
    "FROM Course C, Inst_AIUCourse IA, AIUCourse_Coursera_Mapping CC, Student_In_CourseraCourse SC, Instructor I" +
    "WHERE C.Course_Slug = CC.Course_Slug" +
    "AND IA.Inst_ID = I.Inst_ID" +
    "AND CC.Course_ID = IA.Course_ID" +
    "AND SC.Course_Slug = C.Course_Slug;";
    conn.query(query , (error, results) => {
      if(error){
        console.log(error);
        res.status(500).send("Error in executing the query GET-COURSERA-MAPPING");
      }else{
        res.json(results);
      }
    });
});

app.get("/GET-STUDENT-COUNT-COURSERA", (req,res)=>{
  query = "SELECT AIUC.Course_Name, COUNT(*) AS Student_Count, C.Week_Count" + 
  "FROM Aiu_Course AIUC, AIUCourse_Coursera_Mapping AIUCC, Course C, Student_In_AIUCourse SIAIUC" +
  "WHERE AIUC.Course_ID = AIUCC.Course_ID" +
  "AND C.Course_Slug = AIUCC.Course_Slug" +
  "AND AIUC.Course_ID = SIAIUC.Course_ID" +
  "GROUP BY AIUC.Course_Name;";
  conn.query(query, (error, results) => {
    if(error){
      console.log(error);
      res.status(500).send("Error in executing the query GET-STUDENT-COUNT-COURSERA");
    }else{
      res.json(results);
    }
  });
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
