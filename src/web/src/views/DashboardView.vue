<template>
    <div>
        <!-- auto refresh api  -->
        <input type="hidden" hidden :value="hide">

        <!-- bar -->
        <div class="container-fluid" style="position:absolute;">
            <button class="navbar-toggler m-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                <i class="bi bi-list" style="font-size: 40px;"></i>
            </button>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Seren Up</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-header">
                    <h1 class="offcanvas-title" id="offcanvasNavbarLabel">Welcome {{this.store.getCognitoUser.username}}👋</h1>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a href="/addcontact" class="nav-link active" aria-current="page">Managment contacts</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="listBracelet" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Bracelets
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="listBracelet">
                            <li v-for="bracialet in listBracialets" :key="bracialet.bracelet_id">
                                <a @click="changeSelectBracialet(bracialet.bracelet_id)" class="dropdown-item" href="#">{{bracialet.bracelet_id}}</a>
                            </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="d-flex flex-row-reverse">
                        <h1><i @click="logout()" style="cursor: pointer;" class="bi bi-door-open-fill"></i></h1>
                    </div>
                </div>
            </div>
        </div>

        <!-- basic element -->
        <div style="width: 70%; margin:auto; margin-top: 5px;">            
            <div class="d-flex flex-wrap mt-4 justify-content-between align-items-center">
                <div class="information card d-flex justify-content-center align-items-center" style="padding: 1%;" :style="statusBattery">
                    <div class="card-body">
                        <div>
                            <chart :data="balance"/>
                        </div>
                    </div>
                </div>
                <div class="information card d-flex justify-content-center align-items-center" style="width: 80px; padding: 1%;" :style="statusBattery">
                    <img src="/img/battery.png" style="width: 100%" />
                    <div class="card-body">
                        <div>
                            {{battery}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- seredepity -->        
        <template v-if="this.seredipity != undefined">
            <pharse :lastData="this.seredipity.measure_value" />
        </template>
        
        <!-- selected attual bracialet --> 
        <div class="d-flex justify-content-end" style="width:2000px; position: fixed; bottom: 0px; right: 0; margin: 10px;">
            <div class="card trasparent d-flex justify-content-center align-items-center" style="width: 25%;">
                <img class="m-1" src="/img/watch.png" style="width: 60px;"/>
                <div class="card-body p-1">
                    <div style="margin-top: 10px;">
                        {{selectBracialet}}
                    </div>
                </div>
            </div>
        </div>
        <!--<div style="width: 40%">
        </div>
        
        <div style="width: 40%">
            <dashboardSteps />
        </div>-->
    </div>
</template>

<script>
import { storeCognito } from '@/stores/store'
import pharseComponent from '../components/pharseComponent.vue'
import serendipityChartVue from '../components/serendipityChart.vue'
    export default {
        components:{
            pharse : pharseComponent,
            chart: serendipityChartVue
        },
        data(){
            return{
                store : storeCognito(),
                listBracialets:[],
                hide:"",
                endpoint:import.meta.env.VITE_ENDPOINT,
                data:null,
                selectBracialet:null,

                seredipity:null,
                battery:null,
                balance:null,
                statusBattery:"background-color: gray;"
            }
        },
        created(){
            this.dataSimulation()
        },
        methods:{
            logout(){
                var cognitoUser = this.store.getCognitoUser
                cognitoUser.signOut();
                this.$router.go()
            },
            dataSimulation(){
                this.data = {
                    "idbracialet":"055e6c78-4940-4b75-9006-e7289c604a1b",
                    "heart": 90,
                    "velocity": 20,
                    "steps": 120,
                    "accelerometer": [12,13,43,12,43],
                    "systolic_pressure": 60,
                    "diastolic_pression":60,
                    "battery": 70,
                    "temperature":36
                }
            },
            changeSelectBracialet(id){
                this.selectBracialet = id;
            }
        },
        watch:{
            hide:{
                handler(){
                    //get api internal
                    var user = this.store.getCognitoUser
                    var customer_id = user.signInUserSession.idToken.payload.sub
                    this.$http.get(this.endpoint+"users/"+customer_id+"/bracelets")
                        .then(rs => {
                        if(rs.data)
                        {
                            this.listBracialets = rs.data.data

                            if(this.selectBracialet == null && this.listBracialets.length > 0){
                                this.selectBracialet = this.listBracialets[0].bracelet_id
                            }
                        }
                    });

                    if(this.selectBracialet != null)
                    {
                        this.$http.get(this.endpoint+"bracelets/"+this.selectBracialet+"?from=1m&metric=balance")
                        .then(rs => {
                            this.balance = rs.data.data
                        });

                        this.$http.get(this.endpoint+"bracelets/"+this.selectBracialet+"?from=1m&metric=serendipity")
                        .then(rs => {
                            this.seredipity = rs.data.data[rs.data.data.length - 1]
                        });

                        this.$http.get(this.endpoint+"bracelets/"+this.selectBracialet+"?from=1m&metric=battery_level")
                        .then(rs => {
                            this.battery = Math.round(rs.data.data[rs.data.data.length - 1].measure_value)

                            if(this.battery < 10)
                            {
                                this.statusBattery = "background-color: rgb(255, 97, 97);"
                            }else if(this.battery >= 10 && this.battery < 20)
                            {
                                this.statusBattery = "background-color: rgb(255, 210, 97);"
                            }else
                            {
                                this.statusBattery = "background-color: rgb(115, 255, 134 );"
                            }

                        });
                    }

                    setTimeout(() => {
                        this.hide = new Date();
                    }, 5000);
                },
                immediate: true
            }
        }
    }
</script>

<style>
.dropdown-item{
    cursor: pointer;
}
.card{
    background-color: #EAF2F8;
}
.information{
    border-radius: 10px;
    font-size: 30px;
}
.trasparent{
    background-color: rgba(234, 242, 248, 0.3);
}
</style>