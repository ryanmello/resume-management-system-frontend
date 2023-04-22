import React, { useEffect, useState } from "react";
import "./add-candidate.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ICreateCandidateDto } from "../../types/global.typing";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";
import { error } from "console";

const AddCandidate = () => {
  const redirect = useNavigate();
  const [candidate, setCandidate] = useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: "",
  });

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>();

  useEffect(() => {
    httpModule
      .get<IJob[]>("job/get")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if(
      candidate.firstName === "" ||
      candidate.lastName === "" ||
      candidate.email === "" ||
      candidate.phone === "" ||
      candidate.coverLetter === "" ||
      candidate.jobId === "" ||
      !pdfFile
    ){
      alert("Fill all fields");
      return;
    }

    const newCandidateFormData = new FormData();
    newCandidateFormData.append("firstName", candidate.firstName);
    newCandidateFormData.append("lastName", candidate.lastName);
    newCandidateFormData.append("email", candidate.email);
    newCandidateFormData.append("phone", candidate.phone);
    newCandidateFormData.append("coverLetter", candidate.coverLetter);
    newCandidateFormData.append("jobId", candidate.jobId);
    newCandidateFormData.append("pdf", pdfFile);
    httpModule
      .post("/Candidate/create", newCandidateFormData)
      .then((response) => redirect("/candidates"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidate">
        <h2>Add Candidate</h2>
        <TextField
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidate.firstName}
          onChange={(e) =>
            setCandidate({ ...candidate, firstName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidate.lastName}
          onChange={(e) =>
            setCandidate({ ...candidate, lastName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={candidate.email}
          onChange={(e) =>
            setCandidate({ ...candidate, email: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Phone Number"
          variant="outlined"
          value={candidate.phone}
          onChange={(e) =>
            setCandidate({ ...candidate, phone: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Cover Letter"
          variant="outlined"
          value={candidate.coverLetter}
          onChange={(e) =>
            setCandidate({ ...candidate, coverLetter: e.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel>Select Job</InputLabel>
          <Select
            value={candidate.jobId}
            label="job"
            onChange={(e) =>
              setCandidate({ ...candidate, jobId: e.target.value })
            }
          >
            {jobs.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.companyName} {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={event => setPdfFile(event.target.files ? event.target.files[0] : null)}/>
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

export default AddCandidate;
