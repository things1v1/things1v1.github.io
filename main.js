var canvas = document.getElementById('opengl');
gl = canvas.getContext('experimental-webgl');

var vertCode =
    'attribute vec3 position;' +

    'void main(void) {' +
    ' gl_Position = vec4(position, 1.0);' +
    '}';

var fragCode =
    'void main(void) {' +
    ' gl_FragColor = vec4(1.0, 1.0, 0.0, 0.1);' +
    '}';

var vertShader;
var fragShader;
var shaderProgram;

class baseObject {
    m_xPos;
    m_yPos;
    m_xRotate;
    m_yRotate;
    m_modelMatrix;

    m_vertex_buffer;
    m_index_buffer;

    m_vertexData = [
        -0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
    ];
    m_indexBufferData = [0, 1, 2];

    constructor() {
        m_xPos = 0;
        m_yPos = 0;
        m_xRotate = 0;
        m_yRotate = 0;
        m_modelMatrix = 0;
    }
}

function VertexSpecification(object) {
    object.m_vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, object.m_vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.m_vertexData), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    object.m_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.m_indexBufferData), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return object;
}

function compileShaders() {
    vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
}

function bindDraw(object) {
    gl.bindBuffer(gl.ARRAY_BUFFER, object.m_vertex_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.m_index_Buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
}

function draw(object) {
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawElements(gl.TRIANGLES, object.m_indexBufferData.length, gl.UNSIGNED_SHORT, 0);
}

gMesh1 = new baseObject;
gMesh1 = VertexSpecification(gMesh1);
compileShaders();
bindDraw(gMesh1);
draw(gMesh1);