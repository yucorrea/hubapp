import { getStorage, saveStorage } from "@/src/storage";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import FavoriteError from "../errors/FavoriteError";

type ProviderProps = {
  children: React.ReactNode;
}

type CharacterContext = {
  favorites: Array<number>;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean; 
}

export const CharacterContext = createContext({} as CharacterContext);

export function CharacterProvider({children} : ProviderProps) {
  const [favorites, setFavorites] = useState<Array<number>>([]);

  const markFavorite = async (id: number) => {
    try {
      const data = [...favorites, id]
      await saveStorage("characterIds", data)

      setFavorites(data);
    }catch {
      throw new FavoriteError('Não foi possível favoritar personagem');
    }
  }

  const unmarkFavorite = async (id: number) => {
    try {
      const data = favorites.filter(item => item !== id)
      await saveStorage("characterIds", data)
      setFavorites(data)
    }catch {
      throw new FavoriteError('Não foi possível desmarcar personagem');
    }
  }

  const toggleFavorite = useCallback( async (id: number) => {
    try {
      const alreadyExists = favorites.some(characterId => characterId === id);
      alreadyExists ? unmarkFavorite(id) : markFavorite(id);
    }catch(err) {
      if(err instanceof FavoriteError) {
        Toast.show(err.message, {
          containerStyle: {width: "100%"},
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM
        })
      }

     throw err;
    }
  },[favorites, unmarkFavorite, markFavorite]);


  const isFavorite = useCallback((id: number) => {
    return favorites.some(characterId => characterId === id)
  },[favorites])

  useEffect(() => {
    async function loadDataStorage() {
      try {
        const data = await getStorage<Array<number>>("characterIds") ?? [];
        setFavorites(data)
      }catch {
        throw new FavoriteError('Não foi possível buscar os personagens favoritos');
      }
    }
    
    loadDataStorage()
  },[])

  return (
    <CharacterContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  const context = useContext(CharacterContext);

  if(!context) throw new Error("CharacterContext not provided")

  return context;
}