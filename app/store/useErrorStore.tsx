import {create} from "zustand";

interface ErrorState {
    error : string;
    setError : (error: string) => void;
}

const useErrorStore = create<ErrorState>((set)=>({
    error: "nothing",
    setError: (error)=> set({error})
}))

export default useErrorStore;