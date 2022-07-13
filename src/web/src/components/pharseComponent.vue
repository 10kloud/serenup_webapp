<template>
    <div class="d-flex flex-wrap justify-content-around align-items-center" style="padding: 100px 0px; font-weight: bold;">
        <div class="card p-1" style="width: 90%" :style="backgroundColor">
            <div class="card-body">
                <h2 class="card-title">Serendipity</h2>
                <div class="p-5">
                    <h1><b>{{selectPharse}}</b></h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            lastData:Number
        },
        data(){
            return{
                pharseNegative:["Oggi è la giornata sbagliata, ti consiglio di stare al sicuro non perdere tempo", "cerca di non perderti in distrazioni", "trova il motivo per sorridere"],
                pharsePositive:["il sole oggi ti sorride","festeggia la bella giornata","la fortuna è dalla tua parte"],
                pharseNeutral:["passerai una giornata tranquilla", "cerca di rilassarti", "il sonno ti potrebbe aiutare"],
                selectPharse:"",
                backgroundColor:"background-color: gray;"
            }
        },
        mounted(){
            this.getPharse()
        },
        updated(){
            this.getPharse()
        },
        methods:{
            getPharse()
            {
                if(this.lastData > 0 && this.lastData < 6)
                {
                    this.selectPharse = this.pharseNegative[Math.floor(Math.random()*this.pharseNegative.length)]
                    this.backgroundColor = "background-color: rgb(255, 97, 97);"

                }else if(this.lastData >= 6 && this.lastData < 13)
                {
                    this.selectPharse = this.pharseNeutral[Math.floor(Math.random()*this.pharseNeutral.length)]
                    this.backgroundColor = "background-color: rgb(222, 222, 222);"
                }else
                {
                    this.selectPharse = this.pharsePositive[Math.floor(Math.random()*this.pharsePositive.length)]
                    this.backgroundColor = "background-color: rgb(115, 255, 134 );"
                }
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>