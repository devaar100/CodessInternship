const LIST = "LIST"
const MCQ = "MCQ"
const CHECKBOX = "CHECKBOX"

const data = [
    {
        type: LIST,
        options: ["Tea", "Coffee", "Soft drinks", "Water"],
        responses: ["Coffee", "Coffee", "Tea", "Soft drinks", "Coffee", "Coffee", "Water"]
    },
    {
        type: MCQ,
        options: ["England", "Australia", "UAE", "Malaysia"],
        responses: ["England" , "Norway", "England", "France", "England", "Malaysia", "UAE"]
    },
    {
        type: CHECKBOX,
        options: ["Dairy milk", "Five star", "Milky bar", "Munch", "KitKat"],
        responses: [["Five star", "Milky bar", "Munch", "KitKat"],
                ["KitKat"],
                ["Five star", "Milky bar", "Munch", "KitKat"],
                ["KitKat"],
                ["Dairy milk"],
                ["Dairy milk"],
                ["Dairy milk", "KitKat"]
            ]
    }
]

function listProcessing(listData) {
    const map = new Map()

    const options = listData.options
    for(let i=0;i<options.length;i++){
        map.set(options[i], 0)
    }

    const responses = listData.responses
    for(let i=0;i<responses.length;i++){
        map.set(responses[i], map.get(responses[i]) + 1)
    }

    const data = [[],[]]
    map.forEach((value, key) => {
        data[0].push(key)
        data[1].push(value)
    })

    const graph = document.createElement("canvas")
    const ctx = graph.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data[0],
            datasets: [{
                label: 'Graph for beverage choices',
                data: data[1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        max: Math.max(...data[1])+1,
                        min: 0
                    }
                }]
            }
        }
    });
    document.body.append(graph)
}

function checkboxProcessing(checkboxData) {
    const map = new Map()
    const options = checkboxData.options
    for(let i=0;i<options.length;i++){
        map.set(options[i], 0)
    }

    const responses = checkboxData.responses
    for(let i=0;i<responses.length;i++){
        for(let j=0;j<responses[i].length;j++) {
            map.set(responses[i][j], map.get(responses[i][j])+1)
        }
    }

    console.log(map)
}

function mcqProcessing(mcqData) {
    const map = new Map()
    const others = "Others"
    const options = mcqData.options
    for(let i=0;i<options.length;i++){
        map.set(options[i], 0)
    }
    map.set(others, 0)

    const responses = mcqData.responses
    for(let i=0;i<responses.length;i++){
        if(map.has(responses[i])) {
            map.set(responses[i], map.get(responses[i])+1)
        } else{
            map.set(others, map.get(others)+1)
        }
    }

    console.log(map)
}

window.onload = () => {
    data.forEach(item => {
        switch (item.type) {
            case LIST:
                listProcessing(item)
                break;
            case MCQ:
                mcqProcessing(item)
                break;
            case CHECKBOX:
                checkboxProcessing(item)
                break;
        }
    })
}

// listProcessing(item)
// BarChart
// mcqProcessing(item)
// BarChart
// checkboxProcessing(item)
// Doughnut / Piechart