import { coordsAtom } from "atom/coords";
import LabelElement from "components-element/LabelElement/LabelElement";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { navAtom, selectComapnyName } from "atom/nav";
import styled from "styled-components";
import { darken } from "polished";
import { userAtom } from "atom/user";
import { AiOutlineUser } from "react-icons/ai";
interface INavElementSection {
  isSelectedItem: boolean;
}

const NavElement = ({
  name,
  explanation,
  companyName,
  companyLocation,
  profileImg,
  type,
  coords,
  userSelector,
  tagImg,
}: any) => {
  const selectElement = useRecoilValue(coordsAtom);
  const member = useRecoilValue(userAtom);
  const setNavDeps = useSetRecoilState(navAtom);
  const setSelectComapnyName = useSetRecoilState(selectComapnyName);
  const workingMember = member.filter(
    (args) => args.companyName === companyName
  );
  const isSelectedItem = coords === selectElement ? true : false;

  return (
    <NavElementSection
      onClick={() => {
        userSelector(coords);
        setNavDeps(true);
        setSelectComapnyName(companyName);
      }}
      isSelectedItem={isSelectedItem}
    >
      <CompanyName>{companyName}</CompanyName>
      <CompanyLocation>{companyLocation}</CompanyLocation>
      <WorkingMemberWrapper>
        <AiOutlineUser />
        {workingMember.length}
      </WorkingMemberWrapper>
    </NavElementSection>
  );
};

export default NavElement;

const NavElementSection = styled.section<INavElementSection>`
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid rgb(245, 245, 245);
  cursor: pointer;
  padding: 10px;
  background-color: ${(props) =>
    props.isSelectedItem ? `${darken(0.05, "#fff")}` : "#fff"};

  &:hover {
    background-color: ${(props) =>
      props.isSelectedItem
        ? `${darken(0.05, "#fff")}`
        : `${darken(0.02, "#fff")}`};
  }
`;

const CompanyName = styled.div`
  font-size: 18px;
  color: #0068c3;
  font-weight: 700;
  letter-spacing: -1px;
`;

const CompanyLocation = styled.div`
  font-size: 12px;
  color: #333;
`;

const WorkingMemberWrapper = styled.div`
  margin-top: 10px;
  color: #333;
  font-size: 12px;
  display: flex;
  align-items: center;
`;
