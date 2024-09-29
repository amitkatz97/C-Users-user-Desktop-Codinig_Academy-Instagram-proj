import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from "react"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px', 
  border: 'none',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column", 
  alignItems: "center",
  
};

export default function BasicModal({header, text ,content, number = null }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    
}, [open])


  return (
    <div>
      {number}
      <span onClick={handleOpen}>{header}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <Typography className="modal-header">
            {text}
          </Typography>
          <Typography className="modal-content">
           {content}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}