<template>
    <div class="d-flex justify-content-center">
        <div class="card" style="width: 60%; padding: 20px; margin-top: 20px;">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">ID</span>
                <input v-model="id" type="text" class="form-control" placeholder="af2ea-1sfe-fas3-gts3" aria-label="IdBracelet" aria-describedby="basic-addon1">
            </div>
            <div class="d-flex justify-content-between">
                <router-link to="/dashboard" type="button" class="btn btn-secondary">Torna indietro</router-link>
                <button @click="confirm()" type="button" class="btn btn-primary">Conferma</button>
            </div>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { storeCognito } from '@/stores/store'
    export default {
        data(){
            return{
                id:"",
                store: storeCognito(),
                endpoint:import.meta.env.VITE_ENDPOINT
            }
        },
        methods:{
            async confirm()
            {
                var user = this.store.getCognitoUser
                
                var rs = await this.$http.get(this.endpoint+"Users")
                    .then(rs => {
                        return rs;
                    });
                var users = rs.data;
                var find = users.find(e => e.username === user.username);
                
                console.log(find);

                if(find != undefined)
                {
                    find.idbracialet.push(uuidv4());
                    var rs = await this.$http.post(this.endpoint+"Users/"+find.username, find)
                    .then(rs => {
                        return rs;
                    });
                }
            }
        }
    }
</script>