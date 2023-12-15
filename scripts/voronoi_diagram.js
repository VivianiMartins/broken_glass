
//função para gerar um número inteiro entre o min e max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFloat(min, max) {
    return Math.random(min * 0.9898 + max * 0.233);
}

//função para criar os pontos/coordenadas
//So, in the context of a Voronoi diagram:
// Vertex/sites: Refers to the corner points of the Voronoi cells.
function setSites(totalSites) {
    let sites = [];
    for (let i = 0; i < totalSites; i++) {
        sites.push(vec2(getRandomFloat(-4.0, 4.0) , (getRandomFloat(-4.0, 4.0) + .8) ));
    }
    return sites;
}

//Criando Voronoi regiões
function fillVoronoi (sites, totalSites) {
    //iniciando com uma distancia grande para comparar
    let closeDist = length(vec2(1));
    let index = [];

    for (let i = 0; i<totalSites; i++){
        let index = 0;
        let tempDist = distance(sites[i].x,sites[i].y);

        if (tempDist < closeDist ){
            closeDist = tempDist;
            //aqui estou pegando a região que vou colorir
            index.push(i);
        }
    }
    return index;
}

//calculo da distancia euclidiana para definir a distancia Euclasiana pontos
function distance(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy); // Euclidean distance formula
}

function ColorPoints (coloringPoints, totalPoints, sites, positionArray, vertexColors){
    for (let i = 0; i<totalPoints; i++){
        if(coloringPoints[i] != 0){
            //a região que vou colorir
            if (i == totalPoints/2){
                positionArray.push(sites[i]);
                vertexColors.push(vec4(1.0,1.0,1.0,1.0));
            }else {
                positionArray.push(sites[i]);
                vertexColors.push(vec4(0.8,0.9,1.0,0.8));
            }
        }
    }
}