import { defineStore } from 'pinia'

export const storeCognito = defineStore({
  id: "store",
  state: () => ({
    cognitoUser: null,
    poolData: {}
  }),
  getters: {
    getCognitoUser: (state) => state.cognitoUser,
    getPoolData: (state) => state.poolData
  },
  actions: {
    setCognitoUser(cognitoUser)
    {
      this.cognitoUser = cognitoUser
    },
    initCognito(userPoolId, clientId)
    {
      this.poolData = {
        UserPoolId: userPoolId, // Your user pool id here
        ClientId: clientId, // Your client id here
      };
    }
  }
})
