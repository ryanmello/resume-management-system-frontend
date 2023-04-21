import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICompany, ICreateJobDto } from "../../types/global.typing";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./add-job.scss";
import httpModule from "../../helpers/http.module";

const AddJob = () => {
  const redirect = useNavigate();
  const [job, setJob] = useState<ICreateJobDto>({
    title: "",
    level: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    httpModule
      .get<ICompany[]>("company/get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId === "") {
      alert("Please enter all fields");
      return;
    }

    httpModule
      .post("job/create", job)
      .then((response) => redirect("/jobs"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/jobs");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add Job</h2>
        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            <MenuItem value="Intern">Intern</MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="MidLevel">Midlevel</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
            <MenuItem value="TeamLead">Team Lead</MenuItem>
            <MenuItem value="Architect">Architect</MenuItem>
            <MenuItem value="CTO">CTO</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
