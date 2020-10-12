function main()
{
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //Vertices of a Triangle
    // var vertices = [
    //     -0.5, 0.5,      //Point A
    //     -0.5, -0.5,     //Point B
    //     0.5, -0.5       //Point C
    // ];

    var vertices = [
        -0.5, 0.5,      //Point A
        -0.5, -0.5,     //Point B
        -0.5, -0.5,     //Point B
        0.5, -0.5,       //Point C
        0.5, -0.5,      //Point C
        -0.5, 0.5       //Point A
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = document.getElementById("vertexShaderSource").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = document.getElementById("fragmentShaderSource").text;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPos = gl.getAttribLocation(shaderProgram, "a_Pos");
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var primitive = gl.LINES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitive, offset, count);
}