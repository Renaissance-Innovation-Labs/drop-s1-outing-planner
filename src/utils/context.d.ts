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
