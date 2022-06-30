<template>
    <div>
        <!-- barr -->
        <div class="container-fluid" style="position:absolute;">
            <button class="navbar-toggler m-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                <i class="bi bi-list" style="font-size: 40px;"></i>
            </button>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Seren Up</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <router-link to="/addbracialet" class="nav-link active" aria-current="page" href="#">Add bracelets</router-link>
                            <router-link to="/addcontact" class="nav-link active" aria-current="page" href="#">Add contacts</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="listBracelet" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Bracelets
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="listBracelet">
                            <li><a class="dropdown-item" href="#">ID 1</a></li>
                            <li><a class="dropdown-item" href="#">ID 2</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="d-flex flex-row-reverse">
                        <i @click="logout()" style="cursor: pointer;" class="bi bi-x-square-fill">Exit</i>
                    </div>
                </div>
            </div>
        </div>

        <!-- basic element -->
        <div style="width: 70%; margin:auto; margin-top: 5px;">            
            <div class="card d-flex justify-content-center align-items-center" style="width: 100%;">
                <img class="m-1" src="/img/watch.png" style="width: 60px;"/>
                <div class="card-body p-1">
                    <div style="margin-top: 10px;">
                        {{data.idbracialet}}
                    </div>
                </div>
            </div>
            <div class="d-flex mt-4 justify-content-between  align-items-center" style="height: 150px; ">
                <div class="information card d-flex justify-content-center align-items-center" style="width: 80px; padding: 1%;">
                    <img src="/img/temperature.png" style="width: 100%" />
                    <div class="card-body">
                        <div style="margin-top: 10px;">
                            {{data.temperature}}
                        </div>
                    </div>
                </div>
                <div class="information card d-flex justify-content-center align-items-center" style="width: 80px; padding: 1%;">
                    <img src="/img/speed.png" style="width: 100%" />
                    <div class="card-body">
                        <div style="margin-top: 10px;">
                            {{data.velocity}}
                        </div>
                    </div>
                </div>
                <div class="information card d-flex justify-content-center align-items-center" style="width: 80px; padding: 1%;">
                    <img src="/img/steps.png" style="width: 100%" />
                    <div class="card-body">
                        <div style="margin-top: 10px;">
                            {{data.steps}}
                        </div>
                    </div>
                </div>
                <div class="information card d-flex justify-content-center align-items-center" style="width: 80px; padding: 1%;">
                    <img src="/img/battery.png" style="width: 100%" />
                    <div class="card-body">
                        <div style="margin-top: 10px;">
                            {{data.battery}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- seredepity -->
        <div class="d-flex justify-content-around align-items-center" style="height: 400px; font-weight: bold;">
            <div class="card p-5">
                <div class="card-body">
                    <h1 class="card-title" style="font-weight: bold;">Quality Sleep</h1>
                    <p class="card-text">GOOD</p>
                </div>
            </div>
            <div class="card p-5">
                <div class="card-body">
                    <h1 class="card-title" style="font-weight: bold;">Attention</h1>
                    <p class="card-text">30 minutes every day</p>
                </div>
            </div>
            <div class="card p-5">
                <div class="card-body">
                    <h1 class="card-title" style="font-weight: bold;">QOL</h1>
                    <p class="card-text">Stress</p>
                </div>
            </div>
        </div>
        <!--<div style="width: 40%">
            <dashboardHeart />
        </div>
        
        <div style="width: 40%">
            <dashboardSteps />
        </div>-->
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
                store : storeCognito(),

                data:null
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
</style>