import { createSlice } from "@reduxjs/toolkit"



interface DevloperTEST{
    border_test:boolean;
};

const initialState:DevloperTEST = {
    border_test:false
};

const DevloperTest = createSlice({
    name: "Devleoper",
    initialState,
    reducers: {
        changeToDeveloperMode(state) {
            state.border_test = true ;
        },
        backToClentMode(state){
            state.border_test = false;
        }
    }
});

export const {changeToDeveloperMode , backToClentMode} = DevloperTest.actions;

export default DevloperTest.reducer;