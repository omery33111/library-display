import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Avatar from "@mui/joy/Avatar";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  user: { name: { title: string; first: string; last: string }, picture: { medium: string } };
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ open, onClose, onDelete, user }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <Box sx={{ textAlign: 'center' }}>
          <Typography level="body-sm" sx={{ mb: 2 }}>
            Are you sure you want to delete this user?
          </Typography>
          <Box sx={{ justifyContent: "center", display: "flex", mb: 1 }}>
            <Avatar src={user.picture.medium} size="lg" />
          </Box>
          <Typography level="body-md" sx={{ mb: 3 }}>
            {user.name.title} {user.name.first} {user.name.last}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={onDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteUserModal;
