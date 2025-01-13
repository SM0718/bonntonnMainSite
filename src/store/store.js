import { create } from 'zustand';

const useStore = create((set) => ({
    isLoggedIn: false,
    user: null,
    isCartUpdated: false,
    cartSize: 0,  // Add this boolean flag
    
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
    })),

    setCartSize: (size) => set(() => ({  // New function to update cart size
        cartSize: size
    }))
}));

export default useStore;