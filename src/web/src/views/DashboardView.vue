<template>
    <div>
        dashboard
        <button @click="logout()">logout</button>
    </div>
</template>

<script>
import { storeCognito } from '@/stores/store'
    export default {
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