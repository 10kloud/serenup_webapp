<template>
    <div>
        <!-- auto refresh api  -->
        <input type="hidden" hidden :value="hide">
        <div class="d-flex justify-content-center">
            <div class="card" style="width: 60%; padding: 20px; margin-top: 20px;">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Name Contact</span>
                    <input v-model="nameContact" type="text" class="form-control" placeholder="Jerry" aria-label="IdBracelet" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Number Phone</span>
                    <input v-model="phone" type="tel" maxlength="10" class="form-control" placeholder="8530230021" aria-label="tel" aria-describedby="basic-addon1">
                </div>
                <div class="d-flex justify-content-between">
                    <router-link to="/dashboard" type="button" class="btn btn-secondary">Torna indietro</router-link>
                    <button @click="confirm()" type="button" class="btn btn-primary">Conferma</button>
                </div>
            </div>
        </div>

        <div style="width:600px; margin:auto;">
            <div v-for="contact in listContacts" :key="contact">
                <div class="card m-2">
                    <div class="card-body d-flex justify-content-around">
                        <div class="p-2">
                            Name Contact:
                        </div>
                        <div class="p-2">
                            {{contact.contactname}}
                        </div>
                        <div class="p-2">
                            Number Phone:
                        </div>
                        <div class="p-2">
                            {{contact.number}}
                        </div>
                        <div class="p-2">
                            <button @click="deleteContact(contact.id)" class="btn btn-danger"><i class="bi bi-trash3"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { storeCognito } from '@/stores/store'
    export default {
        data(){
            return{
                nameContact:"",
                phone:"",
                store: storeCognito(),
                endpoint:import.meta.env.VITE_ENDPOINT,
                hide:"",
                listContacts:[]
            }
        },
        methods:
        {
            async confirm(){                
                
                var user = this.store.getCognitoUser

                var data = {
                    "username": user.username,
                    "contactname": this.nameContact,
                    "number": this.phone
                }

                console.log(data);

                var rs = await this.$http.post(this.endpoint+"Contacts", data);
                console.log(rs);
            },
            async deleteContact(id){
                await this.$http.delete(this.endpoint+"Contacts/"+id);
            }
        },
        watch:{
            hide:{
                handler(){
                    var user = this.store.getCognitoUser
                    //get api internal
                    this.$http.get(this.endpoint+"Contacts/All/"+user.username)
                        .then(rs => {
                        this.listContacts = rs.data
                    });

                    setTimeout(() => {
                        this.hide = new Date();
                    }, 3000);
                },
                immediate: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>