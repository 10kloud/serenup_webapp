<template>
    <div class="d-flex justify-content-center">
        <div class="card" style="width: 60%; padding: 20px; margin-top: 20px;">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Name Contact</span>
                <input v-model="nameContact" type="text" class="form-control" placeholder="Jerry" aria-label="IdBracelet" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Number Phone</span>
                <input v-model="phone" type="tel" class="form-control" placeholder="8530230021" aria-label="tel" aria-describedby="basic-addon1">
            </div>
            <div class="d-flex justify-content-between">
                <router-link to="/dashboard" type="button" class="btn btn-secondary">Torna indietro</router-link>
                <button @click="confirm()" type="button" class="btn btn-primary">Conferma</button>
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
                endpoint:import.meta.env.VITE_ENDPOINT
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

                var rs = await this.$http.post(this.endpoint+"Contacts", data);
                console.log(rs);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>