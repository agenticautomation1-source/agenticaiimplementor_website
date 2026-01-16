
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: 'Beginner' | 'Advanced' | 'Mastery' | 'Enterprise';
  modules: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
