<template>
		<div class="container card" style="width: 70%; padding: 10px;">
            <template v-if="postLogin == false">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">@</span>
                    <input v-model="username" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-lock2"></i></span>
                    <input v-model="password" type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-lock2"></i></span>
                    <input v-model="confirmPassword" type="password" class="form-control" placeholder="Confirm password" aria-label="confirmPassword" aria-describedby="basic-addon1">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-lock2"></i></span>
                    <input v-model="email" type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
                </div>

                <template v-if="canLogin == true">
                    <button type="button" class="btn btn-primary" @click="SingUp()">Login</button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-primary" disabled>Login</button>
                    <router-link to="/login" type="button" class="btn btn-secondary">Back</router-link>
                </template>
            </template>
            <template v-else>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-file-lock2"></i></span>
                    <input v-model="confirmCode" type="text" class="form-control" placeholder="Code confirm" aria-label="Number" aria-describedby="basic-addon1">
                </div>
                <button type="button" class="btn btn-secondary" @click="resendCode()">Resend code</button>
                <button type="button" class="btn btn-primary" @click="confirmRegistration()">Confirm code</button>

            </template>
		</div>
</template>

<script>
import { storeCognito } from '@/stores/store'
		export default {
				data(){
					return{
						username:"",
						password:"",
                        confirmPassword:"",
						email:"",
                        confirmCode:"",

                        store: storeCognito(),
                        endpoint:import.meta.env.VITE_ENDPOINT,

                        postLogin: false,
                        canLogin: false
					}
				},
				methods:{
					async SingUp(){
                        //create poolData
                        var poolData = this.store.getPoolData;

                        //create userPool
						var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
						
						var attributeList = [];
						var dataEmail = {
							Name: 'email',
							Value: this.email,
						};
						var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

                        //add to attrivuteList
						attributeList.push(attributeEmail);

                        var cognitoUser = await this.SingUpPromise(userPool, attributeList);

                        this.store.setCognitoUser(cognitoUser);

                        var data = {
                            "username": this.username,
                            "admin": false
                        }

                        this.$http.post(this.endpoint+'Users/', data )
                            .then(function (rs) {
                                console.log(rs);
                        });

                        //show code confirm account
                        this.postLogin = true;
					},
                    SingUpPromise(userPool, attributeList){
                        return new Promise((resolve, reject) => {
                            userPool.signUp(this.username, this.password, attributeList, null, function(err,result) {
                                if (err) {
                                    alert(err.message || JSON.stringify(err));
                                    reject(err)
                                    return;
                                }
                                //console.log('user name is ' + result.user.getUsername());
                                resolve(result.user)
                            });
                        });
                    },
                    async confirmRegistration(){
                        var response = await this.confirmRegistrationPromise()
                        //console.log(rs);
                        if(response){
                            alert('account create success!')
                            this.$router.push('/login')
                        }
                    },
                    confirmRegistrationPromise(){
                        var cognitoUser = this.store.getCognitoUser
                        return new Promise((resolve, reject) => {
                            cognitoUser.confirmRegistration(this.confirmCode, true, function(err, result) {
                                if (err) {
                                    alert(err.message || JSON.stringify(err));
                                    return reject(err);
                                }
                                return resolve(result)
                            });
                        })
                    },
                    resendCode(){
                        var cognitoUser = this.store.getCognitoUser
                        cognitoUser.resendConfirmationCode(function(err, result) {
                            if (err) {
                                alert(err.message || JSON.stringify(err));
                                return;
                            }
                            //console.log('call result: ' + result);
                            alert('resend code success!')
                        });
                    }
				},
                watch:{
                    confirmPassword(confirmPassword){
                        if(confirmPassword.length > 1 && confirmPassword === this.password)
                            this.canLogin = true;
                        else
                            this.canLogin = false;
                    },
                    password(password){
                        if(password.length > 1 && password === this.confirmPassword)
                            this.canLogin = true;
                        else
                            this.canLogin = false;
                    }
                }
		}
</script>

<style lang="scss" scoped>

</style>