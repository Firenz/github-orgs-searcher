import * as React from "react";
import { MemberEntity } from "models/member";
import { memberAPI } from "../../api/memberAPI";
import { MemberRow } from "./memberRow";
import { MemberHead } from "./memberHead";

interface Props {}

export const MembersTableComponent = (props: Props) => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [areMembersLoaded, setMembersLoaded] = React.useState<boolean>(false);

  const loadMembers = () => {
    memberAPI.getAllMembers("lemoncode").then(members => {
      setMembers(members);
      setMembersLoaded(true);
    });
  };

  return (
    <div className="row">
      <h2> Members Page</h2>
      <button onClick={loadMembers}>Load</button>
      {areMembersLoaded ? (
        <table className="table">
          <thead>
            <MemberHead />
          </thead>
          <tbody>
            {members.map((member: MemberEntity) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </tbody>
        </table>
      ) : (
        <p> Please use the search button to display members. </p>
      )}
    </div>
  );
};
