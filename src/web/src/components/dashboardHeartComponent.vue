<template>
    <div class="card m-2">
        <canvas id="heart"></canvas>
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
                const ctx = document.getElementById('heart');
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['8:00','8:01','8:02','8:03','8:04','8:05','8:06','8:07','8:08','8:09','8:10','8:11','8:12','8:13','8:14'],
                        datasets: [{
                            label: '# heart',
                            data: [80,82,80,83,84,85,86,90,95,110,105,115,109,95,80],
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