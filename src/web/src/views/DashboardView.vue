<template>
    <div>
        <div class="d-flex justify-content-end align-items-center" style="padding:10px; background-color: greenyellow; height: 50px;">
            <div class="d-flex align-items-center p1 m-1">
                <h1><i class="bi bi-person"></i></h1>
                <div>{{store.getCognitoUser.username}}</div>
            </div>
            <div class="m-1">
                <button class="btn btn-secondary" @click="logout()">logout</button>
            </div>
        </div>
        <div style="width: 40%">
            <dashboardHeart />
        </div>
        
        <div style="width: 40%">
            <dashboardSteps />
        </div>
    </div>
</template>

<script>
import { storeCognito } from '@/stores/store'
import dashboardHeartComponent from '../components/dashboardHeartComponent.vue'
import dashboardStepsComponent from '../components/dashboardStepsComponent.vue'
    export default {
        components:{
            dashboardHeart : dashboardHeartComponent,
            dashboardSteps: dashboardStepsComponent
        },
        data(){
            return{
                store : storeCognito()
            }
        },
        methods:{
            logout(){
                var cognitoUser = this.store.getCognitoUser
                cognitoUser.signOut();
                this.$router.go()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>