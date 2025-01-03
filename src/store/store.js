import { create } from 'zustand';

const useStore = create((set) => ({
    isLoggedIn: false,
    user: null,
    isCartUpdated: false,  // Add this boolean flag
    
    login: (userInfo) => set({
        isLoggedIn: true,
        user: userInfo,
    }),

    logout: () => set({
        isLoggedIn: false,
        user: null,
    }),

    // Function to toggle cart status
    updateCartStatus: () => set((state) => ({
        isCartUpdated: !state.isCartUpdated
    }))
}));

export default useStore;