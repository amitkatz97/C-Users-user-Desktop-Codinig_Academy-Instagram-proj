import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BasicPopover({header, content , handleSelect, fromDetailes =false}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const anchorOrigin = fromDetailes? {
    vertical: 'top',
    horizontal: 'left',
  } : {
    vertical: 'top',
    horizontal: 'right',
  }
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <span aria-describedby={id} variant="contained" onClick={handleClick}>
       {header}
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography handleSelect={handleSelect}>{content}</Typography>
      </Popover>
    </div>
  );
}