<template>
    <div>
        <!-- auto refresh api  -->
        <input type="hidden" hidden :value="hide">
        <div class="d-flex justify-content-center">
            <div class="card" style="width: 60%; padding: 20px; margin-top: 20px;">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Protocol:</span>
                    <select v-model="protocol" name="protocol" id="protocol" class="form-select">
                        <option value="email">Email</option>
                        <option value="sms">Number Phone</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <template v-if="protocol === 'sms'">
                        <span class="input-group-text" id="basic-addon1">Number Phone</span>
                        <input v-model="endpoint_contacts" type="number" maxlength="10" class="form-control" placeholder="8530230021" aria-label="tel" aria-describedby="basic-addon1">
                    </template>
                    <template v-else-if="protocol === 'email'">
                        <span class="input-group-text" id="basic-addon1">Email</span>
                        <input v-model="endpoint_contacts" type="email" class="form-control" placeholder="example@domain.com" aria-label="tel" aria-describedby="basic-addon1">
                    </template>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Contact Category</span>
                    <select v-model="category" name="category" id="category" class="form-select md-selected">
                        <option value="notifications" selected>Notifications</option>
                        <option value="trusted_contact">Trusted Contact</option>
                    </select>
                </div>
                <div class="d-flex justify-content-between">
                    <router-link to="/dashboard" type="button" class="btn btn-secondary">Torna indietro</router-link>
                    <template v-if="protocol.length > 0">
                        <button @click="confirm()" type="button" class="btn btn-primary">Conferma</button>
                    </template>
                </div>
            </div>
        </div>

        <div style="width:600px; margin:auto;">
            <div v-for="contact in listContacts" :key="contact">
                <div class="card m-2">
                    <div class="card-body">
                        <div class="p-2">
                            Protocol: {{contact.protocol}}
                        </div>
                        <div class="p-2">
                            Endpoint: {{contact.endpoint}}
                        </div>
                        <div class="p-2">
                            Status: {{contact.status}}
                        </div>
                        <template v-if="contact.status === 'Confirmed'">
                            <div class="d-grid">
                                <button @click="deleteContact(contact)" class="btn btn-danger"><i class="bi bi-trash3"></i></button>
                            </div>
                        </template>
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
                protocol:"",
                category:"notifications",
                endpoint_contacts:"",
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
                var customer_id = user.signInUserSession.idToken.payload.sub

                var data = {
                    "endpoint": this.endpoint_contacts,
                    "protocol": this.protocol,
                    "category": this.category
                }

                console.log(data);

                var rs = await this.$http.post(`${this.endpoint}users/${customer_id}/contacts`, JSON.stringify(data));
                console.log(rs);
            },
            async deleteContact(contact){

                var data = {
                    "endpoint":contact.endpoint,
                    "category":contact.category
                }

                console.log(data);
                var json = JSON.stringify(data)
                var user = this.store.getCognitoUser
                var customer_id = user.signInUserSession.idToken.payload.sub
                this.$http.delete(this.endpoint+"users/"+customer_id+"/contacts", { data:  data })
                    .catch(error => {console.log(error)});
            }
        },
        watch:{
            hide:{
                handler(){
                    var user = this.store.getCognitoUser
                    var customer_id = user.signInUserSession.idToken.payload.sub
                    this.listContacts = []
                    //get api internal
                    this.$http.get(this.endpoint+"users/"+customer_id+"/contacts?category=notifications")
                        .then(rs => {
                        if(rs.data.length > 0)
                            rs.data.forEach(element => {
                                element.category = "notifications"
                                this.listContacts.push(element)
                            });
                    });

                    //get api internal
                    this.$http.get(this.endpoint+"users/"+customer_id+"/contacts?category=trusted_contact")
                        .then(rs => {
                        if(rs.data.length > 0)
                            rs.data.forEach(element => {
                                element.category = "trusted_contact"
                                this.listContacts.push(element)
                            });
                    });

                    setTimeout(() => {
                        this.hide = new Date();
                    }, 30000);
                },
                immediate: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>