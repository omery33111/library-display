"use client";

import { UserGet, UserIns } from '@/app/models/User';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import UserFormGroup from './UserFormGroup';

interface PostUserProps {
  onClose: () => void;
  user: UserIns;
  onSave: (data: UserIns) => void;
  localUsers: UserGet[];
}

const PostUser: React.FC<PostUserProps> = ({ onClose, user, onSave, localUsers }) => {
  const methods = useForm<UserIns>({
    defaultValues: user,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<UserIns> = (data) => {
    onSave({ ...user, ...data });
    onClose();
  };

  return (
    <div className = "add-user-section">
      <h3>Add New User</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserFormGroup user={user} onClose={onClose} localUsers={localUsers} />
        </form>
      </FormProvider>
    </div>
  );
};

export default PostUser;
