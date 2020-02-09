import { MemberEntity, createDefaultMemberEntity } from "models/member";

class MemberAPI {
  getAllMembers(organizationName: string): Promise<MemberEntity[]> {
    const gitHubMembersUrl: string = `https://api.github.com/orgs/${organizationName}/members`;

    return fetch(gitHubMembersUrl)
      .then(response => this.checkStatus(response))
      .then(response => this.parseJSON(response))
      .then(data => this.resolveMembers(data));
  }

  getUser(username: string): Promise<MemberEntity> {
    const gitHubUserUrl: string = `https://api.github.com/users/${username}`;

    return fetch(gitHubUserUrl)
      .then(response => this.checkStatus(response))
      .then(response => this.parseJSON(response))
      .then(data => this.resolveUser(data));
  }

  private checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  private parseJSON(response: Response): any {
    return response.json();
  }

  private resolveMembers(data: any): Promise<MemberEntity[]> {
    const members = data.map(gitHubMember => {
      let member: MemberEntity = createDefaultMemberEntity();

      member.id = gitHubMember.id;
      member.login = gitHubMember.login;
      member.name = gitHubMember.name;
      member.avatar_url = gitHubMember.avatar_url;
      member.html_url = gitHubMember.html_url;
      member.bio = gitHubMember.bio;
      member.company = gitHubMember.company;
      member.blog = gitHubMember.blog;
      member.location = gitHubMember.location;
      member.email = gitHubMember.email;
      member.public_repos = gitHubMember.public_repos;
      member.followers = gitHubMember.followers;
      member.following = gitHubMember.following;

      return member;
    });

    return Promise.resolve(members);
  }

  private resolveUser(data: any): Promise<MemberEntity> {
    let user: MemberEntity = {
      id: data.id,
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      bio: data.bio,
      company: data.company,
      blog: data.blog,
      location: data.location,
      email: data.email,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following
    };

    return Promise.resolve(user);
  }
}

export const memberAPI = new MemberAPI();
