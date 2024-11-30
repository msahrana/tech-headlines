export type TCategory = {
  id: string;
  catName: string;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  catName?: string;
  links?: string[];
  createdAt: string;
  authorEmail: string;
  author: {
    name: string;
  };
};
