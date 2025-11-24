import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import JobPages from "./pages/JobPages";
import AddJobPage from "./pages/AddJobPage";
import jobLoader from "./components/jobLoader";

const App = () => {
  const addJob = async (newJob) => {

    // Add New Job
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  //Delete Job
  const deleteJob = async(id)=>{
console.log("delete",id);
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/jobs/:id" element={<JobPages deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
