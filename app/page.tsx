"use client";

import React, { useState } from 'react';
import './globals.css';
import MainContent from './components/base/MainContent';
import MainNavbar from './components/base/MainNavbar';
import MainFooter from './components/base/MainFooter';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <React.Fragment>
      <MainNavbar onSearch={setSearchQuery} />
      <MainContent searchQuery={searchQuery} />
      <MainFooter />
    </React.Fragment>
  );
};

export default Page;
