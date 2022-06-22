<template>
    <div class="card m-2">
        <canvas id="steps"></canvas>
    </div>
</template>

<script>
    export default {
        mounted(){
            this.setup()
        },
        updated(){
            this.setup()
        },
        methods:{
            setup(){
                const ctx = document.getElementById('steps');
                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["22/06/2022","23/06/2022","24/06/2022","25/06/2022","26/06/2022"],
                        datasets: [{
                            label: '# steps',
                            data: [1200, 1000, 1450, 1000, 500],
                            borderColor: 'rgb(0, 99, 255)',
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