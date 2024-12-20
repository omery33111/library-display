import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  width: 100%;
  background-color: #213555;
  color: white;
  text-align: center;
  padding: 25px 0;
`;

export const FooterText = styled.a`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  &:hover {
    color: gray;
  }
`;

export const Copyright = styled.p`
  margin-top: 15px;
`;
