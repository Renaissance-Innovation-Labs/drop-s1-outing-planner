export type ModalProps = {
  name: string;
  status: boolean;
};

export interface OpenModalProps {
  setOpenModal: (modalState: { name: string; status: boolean }) => void;
}

export interface Idea {
  id: number;
  idea: string;
}

export interface Searched {
  id?: number;
  header?: string;
  ideas?: Idea[];
}

export interface MessageProps {
  role: string;
  content?: string;
}

export interface imageUrlProps {
  url: string;
}

export interface AIResponse {
  response?: string;
  error?: string;
  imageUrls: imageUrlProps[];
}
