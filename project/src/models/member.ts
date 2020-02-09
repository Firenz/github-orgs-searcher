
export interface MemberEntity {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  public_repos: number;
  followers: number;
  following: number;
}

export const createDefaultMemberEntity = () => ({
  id: -1,
  login: "",
  name: "",
  avatar_url: "",
  html_url: "",
  bio: "",
  company: "",
  blog: "",
  location: "",
  email: "",
  public_repos: -1,
  followers: -1,
  following: -1
});
