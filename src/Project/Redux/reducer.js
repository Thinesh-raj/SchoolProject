import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
    name: "Counter",
    initialState: {
        show: false,
        pass: "",
        data: ""

    },
    reducers: {
        setShow: (state,action) => { state.show=action.payload },
        setpass: (state, action) => { state.pass = action.payload },
        admindetails: (state, action) => { state.data = action.payload }
    }
})

export const { setShow, setpass, admindetails } = counterSlice.actions
export const passvalue = (state) => state.Counter.pass
export const showtype = (state) => state.Counter.show
export const datatype = (state) => state.Counter.data
export default counterSlice.reducer