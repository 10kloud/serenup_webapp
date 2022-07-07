<template>
    <div>
        <h1>{{selectPharse}}</h1>
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
                selectPharse:""
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
                console.log(this.lastData);
                if(this.lastData < 0)
                {
                    console.log("negative");
                    this.selectPharse = this.pharseNegative[Math.floor(Math.random()*this.pharseNegative.length)]
                }else if(this.lastData >= 0 && this.lastData < 13)
                {
                    console.log("neutral");
                    this.selectPharse = this.pharseNeutral[Math.floor(Math.random()*this.pharseNeutral.length)]
                }else
                {
                    console.log("positive");
                    this.selectPharse = this.pharsePositive[Math.floor(Math.random()*this.pharsePositive.length)]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>