<template>
    <div class="card m-2">
        <canvas id="Seredipity" style="width: 750px;"></canvas>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                arrayLabels:[],
                arrayData:[],
                myChart:null
            }
        },
        props:{ 
            data:Array
        },
        mounted(){
            this.convert()
            this.setup()
        },
        updated(){
            this.convert()
            this.setup()
        },
        methods:{
            convert()
            {
                this.arrayLabels = [];
                this.arrayData = [];
                if(this.data != null)
                    this.data.forEach(element => {
                        var format = new Date(element.time)
                        this.arrayLabels.push(format.getHours() + ":" + format.getMinutes() + ":" + format.getMilliseconds())
                        this.arrayData.push(element.measure_value)
                    });
            },

            setup(){
                const ctx = document.getElementById('Seredipity');
                
                if(this.myChart != null)
                    this.myChart.destroy()

                this.myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.arrayLabels,
                        datasets: [{
                            label: '# Balance',
                            data: this.arrayData,
                            borderColor: 'rgb(255, 0, 0)',
                            fill: false,
                            tension: 0.5,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>