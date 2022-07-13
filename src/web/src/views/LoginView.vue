<template>
    <div class="container card" style="width: 70%; padding: 20px; margin-top: 100px;">
        <div style="margin: auto; padding: 10px;">
            <h1><b>Login</b></h1>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input v-model="username" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-lock2"></i></span>
            <input v-model="password" type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
        </div>

        <div class="d-flex justify-content-between">
            <router-link to="/registration" type="button" class="btn btn-secondary">Registration</router-link>
            <button type="button" class="btn btn-primary" @click="login()">Login</button>
        </div>
    </div>
</template>

<script>
import { storeCognito } from '@/stores/store'

    export default {
        data(){
            return{
                username:"",
                password:"",
                store: storeCognito()
            }
        },
        methods:{
            async login(){

                //check if exitis cognitoUser
                var cognitoUser = null

                //create pool
                var poolData = this.store.getPoolData

                //check
                if(this.store.getCognitoUser == null)
                {
                    //create userpool
                    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

                    var userData = {
                        Username: this.username,
                        Pool: userPool,
                    };

                    //get cognito user with only username
                    cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
                }else //if exitis already
                    cognitoUser = this.store.getCognitoUser
                
                //create request auth
                var authenticationData = {
                    Username: this.username,
                    Password: this.password,
                };
                var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);


                //send request
                var response = await this.loginPromise(cognitoUser, authenticationDetails);
                
                if(response.session) //success auth
                {
                    var keyName = 'cognito-idp.'+import.meta.env.VITE_REGION+'.amazonaws.com/' + poolData.UserPoolId
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: poolData, // your identity pool id here
                        Logins: {
                            keyName : response.session.getIdToken().getJwtToken()
                        },
                    });
                    
                    //save temponary account cognitoUser
                    this.store.setCognitoUser();

                    //redirect
                    this.$router.push('/dashboard')
                }else if(response.error){ //error auth
                    alert(response.error)
                }
            },
            loginPromise(cognitoUser, authenticationDetails){
                return new Promise(resolve => {
                    //cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function(result) {
                            //console.log(result);
                            return resolve({"session":result})
                        },
                        onFailure: function(err) {
                            //console.log(err);
                            return resolve({"error":err})
                        }/*,
                        mfaRequired: function(codeDeliveryDetails) {
                            return resolve({"mfaRequire":codeDeliveryDetails})
                        },*/
                    });
                })
            }
        }
    }
</script>