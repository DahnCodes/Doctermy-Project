
import styled from "styled-components";

// Styled component for the badge
const BadgeWrapper = styled.span`
  background-color: red;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.75rem;
  margin-left: 8px;
`;

const Badge = ({ children }) => {
  return <BadgeWrapper>{children}</BadgeWrapper>;
};

export default Badge;
