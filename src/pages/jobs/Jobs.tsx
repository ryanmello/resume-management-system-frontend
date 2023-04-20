import React, { useEffect, useState } from "react";
import "./jobs.scss";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { IJob } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";
import JobsGrid from "../../components/jobs/JobsGrid";

const Jobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IJob[]>("/job/get")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Button variant="outlined">
          <Add />
        </Button>
      </div>
      {
        loading ? <CircularProgress size={100}/> : jobs.length === 0 ? <h1>No Jobs</h1> : <JobsGrid data={jobs} />
      }
    </div>
  );
};

export default Jobs;
