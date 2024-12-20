"use client";

import React from 'react'
import { Content, Copyright, Footer, FooterText, Wrapper } from './MainFooter.styles'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const MainFooter = () => {
  return (
    <div style = {{marginTop: "30px"}}>
      <Wrapper>
      <Content></Content>
      <Footer>
        <FooterText href="https://github.com/omery33111">
          <GitHubIcon fontSize='medium'/>
        </FooterText>
        <FooterText href="https://www.linkedin.com/in/omer-yanai/">
          <LinkedInIcon fontSize='medium'/>
        </FooterText>
        <Copyright>
          Copyright &copy; {new Date().getFullYear()} Omer Yanai
        </Copyright>
      </Footer>
    </Wrapper>
  </div>
  )
}

export default MainFooter