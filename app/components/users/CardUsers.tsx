"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Flag from "../utils/Flag";
import Loader from "../utils/Loader";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import { getUsers } from "./usersAPI";
import { UserGet, UserIns } from "@/app/models/User";

const CardUsers = ({ 
  searchQuery, 
  localUsers, 
  setLocalUsers 
}: { 
  searchQuery: string; 
  localUsers: UserGet[]; 
  setLocalUsers: React.Dispatch<React.SetStateAction<UserGet[]>> 
}) => {
  const { data: users, isLoading, error } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserGet | null>(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserGet | null>(null);

  const filteredUsers = localUsers.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );  

  const handleEditClick = (user: UserGet, index: number) => {
    setSelectedUser(user);
    setSelectedUserIndex(index);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (user: UserGet) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      const updatedUsers = localUsers.filter((user) => user !== userToDelete);
      setLocalUsers(updatedUsers);
    }
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleSave = (updatedUser: UserGet) => {
    if (selectedUserIndex !== null) {
      const updatedUsers = [...localUsers];
      updatedUsers[selectedUserIndex] = updatedUser;
      setLocalUsers(updatedUsers);
    }
    setEditModalOpen(false);
  };

  useEffect(() => {
    if (users?.data && localUsers.length === 0) {
      setLocalUsers(users.data);
    }
  }, [users?.data]);

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!filteredUsers || filteredUsers.length === 0) return <h1 className="loader">No users found</h1>;

  return (
    <div className="card-map">
      {filteredUsers?.map((user, index) => (
        <Card
          key={index}
          color="neutral"
          invertedColors
          sx={{
            width: 320,
            overflow: "auto",
            transition: "transform 0.13s ease-in-out",
            "&:hover": {
              transform: "scale(1.08)",
            },
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.06), 0px 0px 5px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar src={user.picture.medium} size="lg" />
          </Box>
          <CardContent>
            <Typography level="body-sm" sx={{ alignItems: "center", display: "flex" }}>
              <Flag country={user.location.country} /> {user.location.country},{" "}
              {user.location.city}, {user.location.street.name} {user.location.street.number}
            </Typography>
            <Typography level="title-lg">
              {user.name.title} {user.name.first} {user.name.last}
            </Typography>
            <Typography
              level="body-sm"
              sx={{
                alignItems: "center",
                display: "flex",
                mt: "auto",
                transform: "translateY(10px)",
              }}
            >
              <MailIcon sx={{ mr: 1 }} />
              {user.email}
            </Typography>
          </CardContent>
          <CardActions buttonFlex="0 1 80px">
            <IconButton variant="outlined" color="neutral" sx={{ mr: "auto" }} onClick={() => handleDeleteClick(user)}>
              <DeleteIcon />
            </IconButton>
            <Button color="neutral" sx={{ gap: "11px" }} onClick={() => handleEditClick(user, index)}>
              <EditIcon fontSize="small" />
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}

      {selectedUser && (
        <EditUserModal
          open={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={{ ...selectedUser, picture: selectedUser?.picture || { medium: '' }}}
          localUsers={localUsers}
          onSave={(updatedUser: UserIns) => handleSave(updatedUser as UserGet)}
        />
      )}

      {userToDelete && (
        <DeleteUserModal
          open={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          user={userToDelete}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default CardUsers;
