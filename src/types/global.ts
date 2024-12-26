export interface ISkill {
    _id: string;
    name: string;
    image: string;
    title: string;
};

export interface IBlog {
    _id: string;
    title: string;
    blogImage: string;
    text: string;
}

export interface IProject {
    _id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    live: string;
  }