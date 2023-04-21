import React from 'react'
import "./candidates.scss"
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Candidates = () => {
  const redirect = useNavigate();

  return (
    <div className='content'>
      <div className='heading'>
        <h2>Candidates</h2>
        <Button variant='outlined' onClick={() => redirect("/candidates/add")}>
          <Add/>
        </Button>
      </div>
      
    </div>
  )
}

export default Candidates
