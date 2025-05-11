import { createContext } from "react";
import runChat from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const onSent = async(prompt) => {
        await runChat(prompt)
    }
    onSent("What is react?")

    const contextValue = {

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;
