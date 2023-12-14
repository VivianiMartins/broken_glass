//Funções
//função para gerar um número inteiro entre o min e max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFloat(min, max) {
    return Math.floor( min + (Math.random() * (max - min)));
}

//função para criar os pontos/coordenadas
//So, in the context of a Voronoi diagram:
// Seed: Refers to the point around which a Voronoi cell is constructed.
// Vertex/sites: Refers to the corner points of the Voronoi cells.
function setSites(totalSites) {
    let sites = new Array(totalSites);
    let x = 0;
    let y = 0;
    for (let i = 0; i < totalSites; i++) {
        let x = getRandomFloat(-3.0, 3.0);
        let y = getRandomFloat(-3.0, 3.0);
        let seedX = getRandomFloat(-3.0, 3.0); //seed for X coordinate
        let seedY = getRandomFloat(-3.0, 3.0); //seed for Y coordinate
        sites[i] = { x, y, seed: { x: seedX, y: seedY } };
    }
    return sites;
}

//Criando Voronoi regiões
function fillVoronoi (sites) {
    for(let t in sites) {
        let tile = sites[t];
        tile.site = null;
        //Then, for each player we will check if it's the nearest:
        for (let s in sites){
            let site = sites[s];
            let tempDist = distance(tile,site);
            if (tile.site === null || tempDist < distance(tile, tile.site) ){
                tile.site = site; // Update site owner
            }
        }
    }
}

//calculo da distancia euclidiana para definir a distancia Euclasiana pontos
function distance(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy); // Euclidean distance formula
}

//gerando os poligonos
function getVoronoiCellVertices(pointIndex, sites) {
    const cellVertices = [];
    const site = sites[pointIndex]; // O ponto para o qual estamos criando a célula

    for (let j = 0; j < totalPoints; j++) {
        if (j !== pointIndex) {
            const neighborSite = sites[j];
            // Encontre a interseção das linhas entre o site atual e seu vizinho
            const intersection = findLineIntersection(site, neighborSite);

            if (intersection !== null) {
                // Adicione os vértices da aresta entre o site atual e seu vizinho
                cellVertices.push(intersection.x, intersection.y);
            } else {
                // Se a interseção for null, adicione diretamente os vértices dos pontos vizinhos
                cellVertices.push(neighborSite.x, neighborSite.y);
            }
        }
    }
    return cellVertices;
}

// Função para encontrar a interseção entre as linhas formadas pelos pontos
function findLineIntersection(point1, point2) {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;

    // Verifique se as linhas são verticais  ou Verifique se as linhas são horizontais
    if (x1 === x2 || y1 === y2){ // Linhas são paralelas ou coincidentes
        return null;
    }
    const m1 = (y2 - y1) / (x2 - x1);// Calcule as inclinações das linhas
    const b1 = y1 - m1 * x1; // Calcule as interceptações y
    const y = y1; // Ponto de interseção y para linhas horizontais
    const x = (y - b1) / m1;  // Ponto de interseção x
    // Verifique se o ponto de interseção está dentro do intervalo dos segmentos de linha
    if ( (x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) && (y >= Math.min(y1, y2) && y <= Math.max(y1, y2)) ) {
        return { x, y };
    } else {// As linhas não se intersectam dentro do intervalo dos segmentos de linha
        return null;
    }
}