export const UserModule = {
    namespaced: true,
    
    state: {
        user: null
    
      },
    
      //Mutations are functions that affect the state
      mutations: {
        SET_USER(state, user) { 
          state.user = user;
        }
    
      },
    
      //Function that you call throughout your app that call mutations
      actions: {
        setUser({ commit }, user) { 
          commit('SET_USER', user);
        }
      },

}