export interface ISkill {
  _id: string;
  name: string;
  image: string;
  title: string;
}

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
export interface IExperience {
  _id: string;
  company: string;
  designation: string;
  startDate: string;
  endDate: string | null;
  description: string;
  location: string;
}
