import { createContext } from 'react';

// tipando as informacoes do episodio 
type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

// tipando as informacoes que eu quero salvar no contexto
type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

