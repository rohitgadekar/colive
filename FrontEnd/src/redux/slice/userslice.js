import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name: 'user',
    initialState: {
        users: [],
    },
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        },

        updateUser: (state, action) => {
            state.users.pop();
            state.users.pop();
        },
        clearUser: (state, action) => {
            while (state.users.length > 0) {
                state.users.pop();
            }
        }
    },

})

export const { updateUser, addUser, clearUser } = user.actions
export default user.reducer