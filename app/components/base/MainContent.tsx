"use client";

import Button from '@mui/joy/Button';
import { Container } from '@mui/material';
import { useState } from 'react';
import CardUsers from '../users/CardUsers';
import PostUser from '../users/PostUser';
import { UserGet, UserIns } from '@/app/models/User';


const MainContent = ({ searchQuery }: { searchQuery: string }) => {
  const [showForm, setShowForm] = useState(false);
  const [localUsers, setLocalUsers] = useState<UserGet[]>([]);

  const handleAddUserClick = () => {
    setShowForm(!showForm);
  };

  const handleSaveNewUser = (newUser: UserIns) => {
    setLocalUsers((prevUsers) => [
      ...prevUsers,
      {
        ...newUser,
        picture: newUser.picture || { medium: 'https://via.placeholder.com/150' },
      } as UserGet,
    ]);
    setShowForm(false);
  };

  return (
    <Container maxWidth="xl" style = {{minHeight: "100vh"}}>
      <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "1vh"}}>
        <h2>Users</h2>
            <Button variant="solid" size='sm' onClick={handleAddUserClick} style = {{alignItems: "center", backgroundColor: "#213555"}}>
              Add user
            </Button>
      </div>

      {showForm && (
        <PostUser user={{ name: { title: '', first: '', last: '' }, email: '', location: { country: '', city: '', street: { name: '', number: 0 } }, picture: { medium: "" } }}
                  onClose={() => setShowForm(false)}
                  onSave={handleSaveNewUser}
                  localUsers={localUsers}/>
        )}
      
      <CardUsers searchQuery={searchQuery} localUsers={localUsers} setLocalUsers={setLocalUsers} />
      
    </Container>
  )
}

export default MainContent