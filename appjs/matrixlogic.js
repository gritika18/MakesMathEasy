function creatematrix1() {
    removeall('generatedmatrix1');
    var ids = "id1"
    for (i = 0; i < document.getElementById('row1').value; i++) {
        for (j = 0; j < document.getElementById('column1').value; j++) {
            var inp = document.createElement('input');
            inp.id = ids;
            inp.type = "number";
            inp.value = Math.floor(Math.random() * 10);
            inp.style.width = "90px"
            inp.style.display = 'inline';
            inp.className = "form-control paddingformat"
            inp.placeholder = "a" + parseInt(i + 1) + parseInt(j + 1);
            document.getElementById('generatedmatrix1').appendChild(inp);
            ids += "2";
        }
        document.getElementById('generatedmatrix1').appendChild(document.createElement('br'));
    }
}

function creatematrix2() {
    removeall('generatedmatrix2');
    var ids = "id2"
    for (i = 0; i < document.getElementById('row2').value; i++) {
        for (j = 0; j < document.getElementById('column2').value; j++) {
            var inp = document.createElement('input');
            inp.id = ids;
            inp.type = "number";
            inp.style.width = "90px"
            inp.style.display = 'inline';
            inp.value = Math.floor(Math.random() * 10);
            inp.className = "form-control paddingformat"
            inp.placeholder = "b" + parseInt(i + 1) + parseInt(j + 1);
            document.getElementById('generatedmatrix2').appendChild(inp);
            ids += "3";
        }
        document.getElementById('generatedmatrix2').appendChild(document.createElement('br'));
    }
}

var matrix1 = [];

function sendtomatrix2() {
    var ids = "id2"
    for (i = 0; i < document.getElementById('row2').value; i++) {
        matrix2[i] = [];
        for (j = 0; j < document.getElementById('column2').value; j++) {
            if (document.getElementById(ids).value == '') {
                matrix2[i][j] = 0;
                document.getElementById(ids).value = '0';
            } else {
                matrix2[i][j] = document.getElementById(ids).value;
            }

            ids += "3";
        }
    }
}

var matrix2 = [];

function sendtomatrix1() {
    var ids = "id1"
    for (i = 0; i < document.getElementById('row1').value; i++) {
        matrix1[i] = [];
        for (j = 0; j < document.getElementById('column1').value; j++) {
            if (document.getElementById(ids).value == '') {
                matrix1[i][j] = 0;
                document.getElementById(ids).value = '0';
            } else {
                matrix1[i][j] = document.getElementById(ids).value;
            }

            ids += "2";
        }
    }
}

function displaymatrix(val, ar, elid, m, n) {
    temp = val + '\\\\'
    temp += '\\begin{bmatrix}'
    for (i of ar) {
        for (j of i) {
            temp += nerdamer(j).toTeX().toString() + "&"
        }
        temp = temp.slice(0, -1);
        temp += '\\\\';
    }
    temp += '\\end{bmatrix}'
    temp += '_{' + m + '\\times' + n + '}'
    katex.render(temp, document.getElementById(elid), {
        throwOnError: false
    });
}

function signofmatrix(value) {
    var el = document.getElementById('signofmatrix');
    el.innerHTML = value;
    clearfields();
}

function sumofmatrix() {
    loader('show');
    setTimeout(function () {
        sendtomatrix1();
        sendtomatrix2();
        var summ = [];
        var sumexplanation = '';
        for (i = 0; i < document.getElementById('row2').value; i++) {
            summ[i] = [];
            sumexplanation += "<div style='border-radius:50px;padding:20px;min-width:900px;' class='bi'>"
            for (j = 0; j < document.getElementById('column2').value; j++) {
                sumexplanation += '\\[a_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '} = ' + String(parseInt(matrix1[i][j])) + '\\space and \\space b_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '} = ' + String(parseInt(matrix2[i][j])) + '\\]';
                summ[i][j] = parseInt(matrix1[i][j]) + parseInt(matrix2[i][j]);
                var dp = ''
                var dp2 = ''
                dp += '\\[\\color{black}\\begin{bmatrix}'
                for (ii = 0; ii < document.getElementById('row2').value; ii++) {
                    for (jj = 0; jj < document.getElementById('column2').value; jj++) {
                        if (ii == i && jj == j) {
                            dp += matrix1[ii][jj] + "&"
                        } else {
                            dp += ".&";
                        }
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += '\\end{bmatrix}'
                dp += '+\\begin{bmatrix}'
                for (ii = 0; ii < document.getElementById('row2').value; ii++) {
                    for (jj = 0; jj < document.getElementById('column2').value; jj++) {
                        if (ii == i && jj == j) {
                            dp += matrix2[ii][jj] + "&"
                        } else {
                            dp += ".&";
                        }
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += '\\end{bmatrix}='
                dp += '\\begin{bmatrix}'
                for (ii = 0; ii < document.getElementById('row2').value; ii++) {
                    for (jj = 0; jj < document.getElementById('column2').value; jj++) {
                        if (ii == i && jj == j) {
                            dp += String(matrix1[ii][jj]) + '+' + String(matrix2[ii][jj]) + "&"
                        } else {
                            dp += ".&";
                        }
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += "\\end{bmatrix}="
                dp += '\\color{blue}\\begin{bmatrix}'
                for (ii = 0; ii < document.getElementById('row2').value; ii++) {
                    for (jj = 0; jj < document.getElementById('column2').value; jj++) {
                        if (ii == i && jj == j) {
                            dp += eval(String(matrix1[ii][jj]) + '+' + String(matrix2[ii][jj])) + "&"
                        } else {
                            dp += ".&";
                        }
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += "\\end{bmatrix}\\]"
                sumexplanation += dp;
            }
            sumexplanation += "</div>"
            sumexplanation += '<br>';
        }
        // <!--            printhere-->
        document.getElementById('explanationmatrixresult').innerHTML = sumexplanation;
        displaymatrix('Addition\\space Result', summ, 'matrixresult', String(document.getElementById('row2').value), String(document.getElementById('column2').value))
        renderMathInElement(document.getElementById('explanationmatrixresult'));
        // <!--            printhere-->
    }, 100);
    setTimeout(function () {
        loader('hide');
    }, 2000);
}

function subtractofmatrix() {
    loader('show');
    setTimeout(function () {
        sendtomatrix1();
        sendtomatrix2();

        var subb = [];
        var subbexplanation = '';
        for (i = 0; i < document.getElementById('row2').value; i++) {
            subb[i] = [];
            subbexplanation += "<div style='border-radius:50px;padding:20px;min-width:900px;' class='bi'>"
            for (j = 0; j < document.getElementById('column2').value; j++) {
                subbexplanation += '\\[a_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '} = ' + String(parseInt(matrix1[i][j])) + '\\space and \\space b_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}=' + String(parseInt(matrix2[i][j])) + '\\]';
                subb[i][j] = parseInt(matrix1[i][j]) - parseInt(matrix2[i][j]);
                var dp = ''
                var dp2 = ''
                dp += '\\[\\color{black}\\begin{bmatrix}'
                for (ii = 0; ii < document.getElementById('row2').value; ii++) {
                    for (jj = 0; jj < document.getElementById('column2').value; jj++) {
                        if (ii == i && jj == j) {
                            dp += matrix1[ii][jj] + "&"
                        } else {
                            dp += ".&";
                        }
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += '\\end{bmatrix}'
                dp += '-\\begin{bmatrix}'
                for (ii = 0; ii < document.getElementById('row2').value; ii++) {
                    for (jj = 0; jj < document.getElementById('column2').value; jj++) {
                        if (ii == i && jj == j) {
                            dp += matrix2[ii][jj] + "&"
                        } else {
                            dp += ".&";
                        }
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += '\\end{bmatrix}='
                dp += '\\begin{bmatrix}'
                for (ii = 0; ii < document.getElementById('row2').value; ii++) {
                    for (jj = 0; jj < document.getElementById('column2').value; jj++) {
                        if (ii == i && jj == j) {
                            dp += String(matrix1[ii][jj]) + '-' + String(matrix2[ii][jj]) + "&"
                        } else {
                            dp += ".&";
                        }
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += "\\end{bmatrix}="
                dp += '\\color{blue}\\begin{bmatrix}'
                for (ii = 0; ii < document.getElementById('row2').value; ii++) {
                    for (jj = 0; jj < document.getElementById('column2').value; jj++) {
                        if (ii == i && jj == j) {
                            dp += eval(String(matrix1[ii][jj]) + '-' + String(matrix2[ii][jj])) + "&"
                        } else {
                            dp += ".&";
                        }
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += "\\end{bmatrix}\\]"
                subbexplanation += dp;
            }

            subbexplanation += '</div>';
            subbexplanation += '<br>';
        }
        // <!--            printhere-->
        document.getElementById('explanationmatrixresult').innerHTML = subbexplanation;
        displaymatrix('Subtraction\\space Result', subb, 'matrixresult', String(document.getElementById('row2').value), String(document.getElementById('column2').value))
        renderMathInElement(document.getElementById('explanationmatrixresult'));
        // <!--            printhere-->
    }, 100);
    setTimeout(function () {
        loader('hide');
    }, 2000);

}

function mulofmatrix() {
    loader('show');
    setTimeout(function () {
        sendtomatrix1();
        sendtomatrix2();
        var mul = [];
        var temp = '';
        var mulexplanation = '';
        var d = '';
        for (i = 0; i < document.getElementById('row1').value; i++) {
            mulexplanation += "<div class='dropdown-divider'></div><br>"
            mulexplanation += "<span style='color:var(--apppink) !important'>"
            mulexplanation += '<span style="font-size: 20px;"> Taking Row ' + String(i + 1) + ' of Matrix 1</span>';
            mulexplanation += "</span><br>"
            mul[i] = [];
            for (j = 0; j < document.getElementById('column2').value; j++) {
                mulexplanation += "<div class='bi' style='border-radius:50px;padding:20px;display:table;margin:3px;width:100%;'>"
                mulexplanation += '<span style="border: 3px solid var(--appblack);padding: 10px;border-radius: 30px;font-size: 20px;">Column ' + String(j + 1) + ' of Matrix 2</span><br>';
                mul[i][j] = 0;
                for (k = 0; k < document.getElementById('column1').value; k++) {
                    mulexplanation += '\\[a_{' + String(parseInt(j + 1)) + String(parseInt(k + 1)) + '} = ' + String(parseInt(matrix1[i][k])) + '\\space and \\space b_{' + String(parseInt(k + 1)) + String(parseInt(i + 1)) + '} = ' + String(parseInt(matrix2[k][j])) + '\\]\\[\\big( ' + String(parseInt(matrix1[i][k])) + ' &times; ' + String(parseInt(matrix2[k][j])) + ' \\big) = ' + String(parseInt(matrix1[i][k]) * parseInt(matrix2[k][j])) + '\\]'
                    temp += String(parseInt(matrix1[i][k]) * parseInt(matrix2[k][j])) + ' + '
                    mul[i][j] = parseInt(mul[i][j]) + parseInt(matrix1[i][k]) * parseInt(matrix2[k][j]);
                }
                var dp = '\\[\\begin{bmatrix}'
                var count = 0
                for (ij of matrix1) {
                    for (ji of ij) {
                        if (count == i)
                            dp += '\\color{blue}' + ji + "&"
                        else {
                            dp += ji + "&"
                        }
                    }
                    count += 1;
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += '\\end{bmatrix}\\times'
                dp += '\\begin{bmatrix}';
                for (ij of matrix2) {
                    var count = 0
                    for (ji of ij) {
                        if (count == j)
                            dp += '\\color{blue}' + ji + "&"
                        else {
                            dp += ji + "&"
                        }
                        count += 1;
                    }
                    dp = dp.slice(0, -1);
                    dp += '\\\\';
                }
                dp += '\\end{bmatrix}\\]'

                mulexplanation += dp;
                mulexplanation += '<b style="font-size: 25px;">' + temp.slice(0, -3) + ' = ' + eval(temp.slice(0, -3)) + '</b>';
                var mat = [];
                for (f = 0; f < document.getElementById('row1').value; f++) {
                    mat[f] = [];
                    for (d = 0; d < document.getElementById('column2').value; d++) {
                        if (f == i && d == j) {
                            mat[f][d] = String(eval(temp.slice(0, -3)))
                        } else {
                            mat[f][d] = '.';
                        }
                    }
                }
                dtemp = '\\[\\begin{bmatrix}'
                for (ij of mat) {
                    for (ji of ij) {
                        if (ji == '.')
                            dtemp += ji + "&"
                        else
                            dtemp += '\\color{blue}' + ji + "&"
                    }
                    dtemp = dtemp.slice(0, -1);
                    dtemp += '\\\\';
                }
                dtemp += '\\end{bmatrix}\\]'

                mulexplanation += dtemp;
                temp = '';
                mat = '';
                m1 = '';
                mulexplanation += "</div>"
            }
            mulexplanation += '<br>';
        }
        // <!--            printhere-->
        document.getElementById('explanationmatrixresult').innerHTML = mulexplanation;
        renderMathInElement(document.getElementById('explanationmatrixresult'));
        displaymatrix('Multiplication\\space Result', mul, 'matrixresult', String(document.getElementById('row1').value), String(document.getElementById('column2').value));
        // <!--            printhere-->
    }, 100);
    setTimeout(function () {
        loader('hide');
    }, 2000);
}

function clearfields() {
    document.getElementById('matrixresult').textContent = '';
    document.getElementById('explanationmatrixresult').textContent = '';
}

function checkfunctionsmultiple() {
    removeall('opval')
    var r1 = document.getElementById('row1').value;
    var r2 = document.getElementById('row2').value;
    var c1 = document.getElementById('column1').value;
    var c2 = document.getElementById('column2').value;
    if (r1 == '' || r2 == '' || c1 == '' || c2 == '') {
        addop('opval', 'Input Fields');
        removeall('generatedmatrix1');
        removeall('generatedmatrix2');
        document.getElementById('generatedmatrix1').innerHTML = '';
        document.getElementById('generatedmatrix2').innerHTML = '';
        document.getElementById('signofmatrix').innerHTML = '';

    }
	else if(parseInt(r1) <=0 || parseInt(r2) <=0 || parseInt(c1) <=0 || parseInt(c2) <=0)
	{
		 document.getElementById('mmatrixerror').innerHTML = "<center>Please enter positive integers for the dimensions.</center>";
		 removeall('generatedmatrix1');
         removeall('generatedmatrix2');
	}
	   
	else {
		removeall('mmatrixerror');
        creatematrix2();
        creatematrix1();
        if (r1 == r2 && c1 == c2) {
            if (c1 != r2) {
                addop('opval', 'Select Operation');
                addop('opval', '+');
                addop('opval', '-');
            } else if (c1 == r2) {
                addop('opval', 'Select Operation');
                addop('opval', '+');
                addop('opval', '-');
                addop('opval', '×');
            }

        } else if (c1 == r2) {
            if (c1 == r2 == r1 == c2) {
                addop('opval', 'Select Operation');
                addop('opval', '+');
                addop('opval', '-');
                addop('opval', '×');
            } else if (c1 == r2 && r1 != c2) {
                addop('opval', '×');
                signofmatrix('×');
            } else if (c1 == r2 && r1 == c2) {
                addop('opval', '×');
                signofmatrix('×');
            }
        } else {
            addop('opval', 'Not Possible with these inputs');
            removeall('generatedmatrix1');
            removeall('generatedmatrix2');
        }


    }
}

function calloperation(value) {
    if (value == '+') {
        sumofmatrix();
    } else if (value == '-') {
        subtractofmatrix();
    } else if (value == '×') {
        mulofmatrix();
    }

}


//single matrix
function creatematrixsingle() {
    removeall('generatedmatrixsingle');
    var ids = "id13"
    for (i = 0; i < document.getElementById('srow1').value; i++) {
        for (j = 0; j < document.getElementById('scolumn1').value; j++) {
            var inp = document.createElement('input');
            inp.id = ids;
            inp.type = "number";
            inp.style.width = "90px"
            inp.value = Math.floor(Math.random() * 10);
            inp.style.display = 'inline';
            inp.className = "form-control paddingformat"
            inp.placeholder = "a" + parseInt(i + 1) + parseInt(j + 1);
            document.getElementById('generatedmatrixsingle').appendChild(inp);
            ids += "23";
        }
        document.getElementById('generatedmatrixsingle').appendChild(document.createElement('br'));
    }
}

var matrixsingle = []

function sendtomatrixsingle() {
    var ids = "id13"
    for (i = 0; i < document.getElementById('srow1').value; i++) {
        matrixsingle[i] = [];
        for (j = 0; j < document.getElementById('scolumn1').value; j++) {
            if (document.getElementById(ids).value == '') {
                matrixsingle[i][j] = 0;
                document.getElementById(ids).value = '0';
            } else {
                matrixsingle[i][j] = document.getElementById(ids).value;
            }

            ids += "23";
        }
    }
}

function transpose() {
    loader('show');
    setTimeout(function () {
        sendtomatrixsingle();
        var trans = [];
        for (i = 0; i < document.getElementById('scolumn1').value; i++) {
            trans[i] = [];
            for (j = 0; j < document.getElementById('srow1').value; j++) {
                trans[i][j] = matrixsingle[j][i];
            }
        }
        displaymatrix('Transposed\\space Matrix', trans, 'singlematrixresult', String(document.getElementById('scolumn1').value), String(document.getElementById('srow1').value))
        document.getElementById('singlematrixexplanation').innerHTML = "&nbsp;&nbsp;Just Interchange Rows and Columns"
    }, 100);
    setTimeout(function () {
        loader('hide');
    }, 2000);
}

function soperation(value) {
    if (value == 'Transpose') {
        transpose();
    } else if (value == 'Minors & Co-Factors') {
        miandcofactors();
    } else if (value == "Determinant") {
        laplacedeterminant();
    }
}

function miandcofactors() {
    loader('show');
    setTimeout(function () {
        sendtomatrixsingle();
        var row = document.getElementById('srow1').value;
        var column = document.getElementById('scolumn1').value;
        var cof = [];
        var minor = []
        var temp = '';
        if (row == 2 && column == 2) {
            var temp = "<div style='border-radius:50px;display:table;color:black;padding:20px;margin-left: auto; margin-right: auto;'>"
            for (i = 0; i < row; i++) {
                cof[i] = [];
                minor[i] = [];
                for (j = 0; j < column; j++) {
                    if (i == 0 && j == 0) {
                        var lk = minor[i][j] = cof[i][j] = matrixsingle[1][1];
                        temp += "<div style='border:3px solid black;border-radius:30px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[1][1]
                        temp += '\\end{vmatrix}'
                        temp += '=+\\big(' + lk + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:30px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[1][1]
                        temp += '\\end{vmatrix}'
                        temp += '=' + lk
                        temp += '\\]</div>'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 0 && j == 1) {
                        cof[i][j] = -(matrixsingle[1][0]);
                        minor[i][j] = matrixsingle[1][0];
                        temp += "<div style='border:3px solid black;border-radius:30px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[1][0]
                        temp += '\\end{vmatrix}'
                        temp += '=-\\big(' + matrixsingle[1][0] + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:30px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[1][0]
                        temp += '\\end{vmatrix}'
                        temp += '=' + matrixsingle[1][0]
                        temp += '\\]</div>'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 1 && j == 0) {
                        var lk = cof[i][j] = -(matrixsingle[0][1]);
                        minor[i][j] = matrixsingle[0][1];
                        temp += "<div style='border:3px solid black;border-radius:30px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[0][1]
                        temp += '\\end{vmatrix}'
                        temp += '=-\\big(' + matrixsingle[0][1] + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:30px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[0][1]
                        temp += '\\end{vmatrix}'
                        temp += '=' + matrixsingle[0][1]
                        temp += '\\]</div>'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 1 && j == 1) {
                        var lk = minor[i][j] = cof[i][j] = matrixsingle[0][0];
                        temp += "<div style='border:3px solid black;border-radius:30px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + lk
                        temp += '\\end{vmatrix}'
                        temp += '=+\\big(' + lk + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:30px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + lk
                        temp += '\\end{vmatrix}'
                        temp += '=' + lk
                        temp += '\\]</div>'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    }
                }
            }
            temp += '</div>'
            displaymatrix('Co-Factor\\space Matrix', cof, 'singlematrixresult', String(document.getElementById('scolumn1').value), String(document.getElementById('srow1').value))
            var el = document.createElement('div')
            el.id = 'minormat'
            el.style.margin = '10px';
            document.getElementById('singlematrixresult').appendChild(el)
            displaymatrix('Minor\\space Matrix', minor, 'minormat', String(document.getElementById('scolumn1').value), String(document.getElementById('srow1').value))
            document.getElementById('singlematrixexplanation').innerHTML = temp;
            renderMathInElement(document.getElementById('singlematrixexplanation'));
        } else {
            var cof = [];
            var minor = []
            var temp = "<div style='border-radius:50px;display:table;color:black;padding:20px;margin-left: auto; margin-right: auto;'>"
            for (i = 0; i < row; i++) {
                cof[i] = [];
                minor[i] = []
                for (j = 0; j < column; j++) {
                    if (i == 0 && j == 0) {
                        var lk = cof[i][j] = minor[i][j] = (matrixsingle[1][1] * matrixsingle[2][2]) - (matrixsingle[2][1] * matrixsingle[1][2])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[1][1] + '&' + matrixsingle[1][2] + '\\\\' + matrixsingle[2][1] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}'
                        temp += '=+\\big(' + lk + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[1][1] + '&' + matrixsingle[1][2] + '\\\\' + matrixsingle[2][1] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}'
                        temp += '=' + lk
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[1][1] + '&' + matrixsingle[1][2] + '\\\\' + matrixsingle[2][1] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[1][1] + ')(' + matrixsingle[2][2] + ') - (' + matrixsingle[1][2] + ')(' + matrixsingle[2][1] + '\\big)\\bigg)=' + lk
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"

                    } else if (i == 0 && j == 1) {
                        var lk = cof[i][j] = -((matrixsingle[1][0] * matrixsingle[2][2]) - (matrixsingle[2][0] * matrixsingle[1][2]))
                        var kl = minor[i][j] = (matrixsingle[1][0] * matrixsingle[2][2]) - (matrixsingle[2][0] * matrixsingle[1][2])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[1][0] + '&' + matrixsingle[1][2] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}'
                        temp += '=-\\big(' + kl + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[1][0] + '&' + matrixsingle[1][2] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}'
                        temp += '=' + kl
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[1][0] + '&' + matrixsingle[1][2] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[1][0] + ')(' + matrixsingle[2][2] + ') - (' + matrixsingle[1][2] + ')(' + matrixsingle[2][0] + '\\big)\\bigg)=' + kl
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 0 && j == 2) {
                        var lk = cof[i][j] = minor[i][j] = (matrixsingle[1][0] * matrixsingle[2][1]) - (matrixsingle[2][0] * matrixsingle[1][1])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[1][0] + '&' + matrixsingle[1][1] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][1]
                        temp += '\\end{vmatrix}'
                        temp += '=+\\big(' + lk + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[1][0] + '&' + matrixsingle[1][1] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][1]
                        temp += '\\end{vmatrix}'
                        temp += '=' + lk
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[1][0] + '&' + matrixsingle[1][1] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][1]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[1][0] + ')(' + matrixsingle[2][1] + ') - (' + matrixsingle[1][1] + ')(' + matrixsingle[2][0] + '\\big)\\bigg)=' + lk
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 1 && j == 0) {
                        var lk = cof[i][j] = -((matrixsingle[0][1] * matrixsingle[2][2]) - (matrixsingle[0][2] * matrixsingle[2][1]))
                        var kl = minor[i][j] = (matrixsingle[0][1] * matrixsingle[2][2]) - (matrixsingle[0][2] * matrixsingle[2][1])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[0][1] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[2][1] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}'
                        temp += '=-\\big(' + kl + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[0][1] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[2][1] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}'
                        temp += '=' + kl
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[0][1] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[2][1] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[0][1] + ')(' + matrixsingle[2][2] + ') - (' + matrixsingle[0][2] + ')(' + matrixsingle[2][1] + '\\big)\\bigg)=' + kl
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 1 && j == 1) {
                        var lk = cof[i][j] = minor[i][j] = (matrixsingle[0][0] * matrixsingle[2][2]) - (matrixsingle[2][0] * matrixsingle[0][2])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}'
                        temp += '=+\\big(' + lk + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}'
                        temp += '=' + lk
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][2]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[0][0] + ')(' + matrixsingle[2][2] + ') - (' + matrixsingle[0][2] + ')(' + matrixsingle[2][0] + '\\big)\\bigg)=' + lk
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 1 && j == 2) {
                        var lk = cof[i][j] = -((matrixsingle[0][0] * matrixsingle[2][1]) - (matrixsingle[0][1] * matrixsingle[2][0]))
                        var kl = minor[i][j] = (matrixsingle[0][0] * matrixsingle[2][1]) - (matrixsingle[0][1] * matrixsingle[2][0])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][1] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][1]
                        temp += '\\end{vmatrix}'
                        temp += '=-\\big(' + kl + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][1] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][1]
                        temp += '\\end{vmatrix}'
                        temp += '=' + kl
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][1] + '\\\\' + matrixsingle[2][0] + '&' + matrixsingle[2][1]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[0][0] + ')(' + matrixsingle[2][1] + ') - (' + matrixsingle[0][1] + ')(' + matrixsingle[2][0] + '\\big)\\bigg)=' + kl
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 2 && j == 0) {
                        var lk = cof[i][j] = minor[i][j] = (matrixsingle[0][1] * matrixsingle[1][2]) - (matrixsingle[0][2] * matrixsingle[1][1])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[0][1] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[1][1] + '&' + matrixsingle[1][2]
                        temp += '\\end{vmatrix}'
                        temp += '=+\\big(' + lk + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[0][1] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[1][1] + '&' + matrixsingle[1][2]
                        temp += '\\end{vmatrix}'
                        temp += '=' + lk
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[0][1] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[1][1] + '&' + matrixsingle[1][2]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[0][1] + ')(' + matrixsingle[1][2] + ') - (' + matrixsingle[0][2] + ')(' + matrixsingle[1][1] + '\\big)\\bigg)=' + lk
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 2 && j == 1) {
                        var lk = cof[i][j] = -((matrixsingle[0][0] * matrixsingle[1][2]) - (matrixsingle[0][2] * matrixsingle[1][0]))
                        var kl = minor[i][j] = (matrixsingle[0][0] * matrixsingle[1][2]) - (matrixsingle[0][2] * matrixsingle[1][0])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[1][0] + '&' + matrixsingle[1][2]
                        temp += '\\end{vmatrix}'
                        temp += '=-\\big(' + kl + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Minor\\]"
                        temp += '\\[M_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[1][0] + '&' + matrixsingle[1][2]
                        temp += '\\end{vmatrix}'
                        temp += '=' + kl
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][2] + '\\\\' + matrixsingle[1][0] + '&' + matrixsingle[1][2]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[0][0] + ')(' + matrixsingle[1][2] + ') - (' + matrixsingle[0][2] + ')(' + matrixsingle[1][0] + '\\big)\\bigg)=' + kl
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"
                    } else if (i == 2 && j == 2) {
                        var lk = cof[i][j] = minor[i][j] = (matrixsingle[0][0] * matrixsingle[1][1]) - (matrixsingle[0][1] * matrixsingle[1][0])
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Co-Factor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '(-1)^{' + String(parseInt(i + 1)) + '+' + String(parseInt(j + 1)) + '}'
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][1] + '\\\\' + matrixsingle[1][0] + '&' + matrixsingle[1][1]
                        temp += '\\end{vmatrix}'
                        temp += '=+\\big(' + lk + '\\big)'
                        temp += '\\]</div>'
                        temp += "<div style='border:3px solid black;border-radius:50px;margin:2px'>\\[Minor\\]"
                        temp += '\\[C_{' + String(parseInt(i + 1)) + String(parseInt(j + 1)) + '}='
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][1] + '\\\\' + matrixsingle[1][0] + '&' + matrixsingle[1][1]
                        temp += '\\end{vmatrix}'
                        temp += '=' + lk
                        temp += '\\]</div>'
                        temp += 'Solution of Determinant'
                        temp += '\\['
                        temp += '\\begin{vmatrix}a&b\\\\c&d'
                        temp += '\\end{vmatrix}=a.d-b.c'
                        temp += '\\]'
                        temp += '\\['
                        temp += '\\begin{vmatrix}' + matrixsingle[0][0] + '&' + matrixsingle[0][1] + '\\\\' + matrixsingle[1][0] + '&' + matrixsingle[1][1]
                        temp += '\\end{vmatrix}=\\bigg(\\big(' + matrixsingle[0][0] + ')(' + matrixsingle[1][1] + ') - (' + matrixsingle[0][1] + ')(' + matrixsingle[1][0] + '\\big)\\bigg)=' + lk
                        temp += '\\]'
                        temp += "<div style='height:2px !important;margin:20px !important;'></div>"

                    }
                }
            }
            temp += "</div>"
            displaymatrix('Co-Factor\\space Matrix', cof, 'singlematrixresult', String(document.getElementById('scolumn1').value), String(document.getElementById('srow1').value))
            var el = document.createElement('div')
            el.id = 'minormat'
            el.style.margin = '10px';
            document.getElementById('singlematrixresult').appendChild(el)
            displaymatrix('Minor\\space Matrix', minor, 'minormat', String(document.getElementById('scolumn1').value), String(document.getElementById('srow1').value))
            document.getElementById('singlematrixexplanation').innerHTML = temp;
            renderMathInElement(document.getElementById('singlematrixexplanation'));
        }
    },100);
    setTimeout(function () {
        loader('hide');
    },2000);
}

//single matrix

function addop(selectid, value) {
    var select = document.getElementById(selectid);
    var option = document.createElement("option");
    option.text = value;
    select.add(option);
}

function checkfunctions() {
    removeall('sopval')
    var row = document.getElementById("srow1").value;
    var column = document.getElementById("scolumn1").value;
    if (row == '' || column == '') {
        addop('sopval', 'Input Fields')
        document.getElementById('singlematrixexplanation').innerHTML = '';
        document.getElementById('singlematrixresult').innerHTML = '';
        removeall('generatedmatrixsingle');
    }
	else if(parseInt(row) <=0 || parseInt(column) <=0)
	{
		 document.getElementById('smatrixerror').innerHTML = "<center>Please enter positive integers for the dimensions.</center>";
		 removeall('generatedmatrixsingle');
	}
	else
	   removeall('smatrixerror');
    if (row != column && row != '' && column != '') {
        creatematrixsingle();
        addop('sopval', 'Transpose')
		
    }
    if (row == column) {
        creatematrixsingle();
        addop('sopval', 'Select Operation')
        addop('sopval', 'Transpose')
        addop('sopval', 'Minors & Co-Factors')
        addop('sopval', 'Determinant')
    }
    if (parseInt(row) > 3 && parseInt(column) > 3) {
        creatematrixsingle();
        removeall('sopval')
        if (parseInt(row) <= 5 && (parseInt(row) == parseInt(column))) {
            addop('sopval', 'Select Operation')
            addop('sopval', 'Transpose')
            addop('sopval', 'Determinant')
        } else {
            addop('sopval', 'Transpose')
        }

    }
}

function laplacedeterminant() {
    loader('show');
    sendtomatrixsingle();
    document.getElementById('singlematrixexplanation').innerHTML = '';
    setTimeout(function () {
        determinant(matrixsingle);
    }, 100);

    setTimeout(function () {
        loader('hide');
    }, 2000);
}

function determinant(ma) {
    var row = ma.length;
    var column = ma.length;
    var firstrow = [];
    var jj = 1;
    var el = 0;
    for (j = 0; j < column + column; j += 2) {
        if (el % 2 == 0) {
            var sign = '+'
        } else {
            sign = '-'
        }
        firstrow[j] = sign + ma[0][el];
        firstrow[jj] = '0' + String(el);
        jj += 2;
        el += 1;
    }
    var jj = 1;
    var firstrowel = 0;
    var result = [];
    var sol2 = '';
    var sol2sub = '';
    var vt = ''
    var dtemp = '';
    var vtofsub = '';
    var vtfinalfirstresult = '';
    var vtfinalfirstresult2 = '';
    var vtfinalfirst = '';
    var matsol = '';
    var vtfinal = '';
    var vtfinalresult = '';
    var vtfinalresult2 = '';
    var vtfinalresult3 = '';
    var vtfinalresult4 = '';
    var vtfinalofsub = '';
    var vtfinalofsubresult = '';
    var vtfinalofsubresult2 = '';
    var vtfinalofsubresult3 = '';
    var vtfinalofsubresult4 = '';
    var vtfinalofsubresult5 = '';
    var vtfinalofsubresult6 = '';
    var vtfinalfirstresult2final = ''
    var sol3 = '';
    var sol3sub = '';
    var sol4sub = '';
    var sol5sub = '';
    vtfinal += '\\['
    vtfinalresult += '\\[';
    vtfinalresult2 += '\\[';
    vtfinalresult3 += '\\[';
    vtfinalresult4 += '\\[';

    vtfinalfirst = '\\['
    vtfinalfirstresult = '\\['
    vtfinalfirstresult2 = '\\['

    vt += '\\['
    vtofsub += '\\['
    vtfinalofsub += '\\['
    vtfinalofsubresult += '\\['
    vtfinalofsubresult2 += '\\['
    vtfinalofsubresult3 += '\\['
    vtfinalofsubresult4 += '\\['
    vtfinalofsubresult5 += '\\['
    vtfinalofsubresult6 += '\\['
    dtemp += '\\[';
    if (row == 2 && column == 2) {
        var lets2 = "\\["
        lets2 += '\\color{red}\\big(\\color{black}' + ma[0][0] + '\\times' + ma[1][1] + '\\color{red}\\big)\\color{black}-\\color{red}\\big(\\color{black}' + ma[0][1] + '\\times' + ma[1][0] + '\\color{red}\\big)'
        lets2 += "\\]"

        var lets22 = "\\["
        var ss = nerdamer(ma[0][0] * ma[1][1]).evaluate().toString()
        var ss2 = nerdamer(ma[0][1] * ma[1][0]).evaluate().toString()
        lets22 += "\\color{red}\\big(\\color{black}" + ss + '\\color{red}\\big)\\color{black}-\\color{red}\\big(\\color{black}' + ss2 + "\\color{red}\\big)\\color{black}";
        lets22 += "\\]"

        var lets222 = "\\["
        ss2 = nerdamer(ss - ss2).evaluate().toString()
        lets222 += 'Determinant = ' + ss2;
        lets222 += "\\]"
        var dtemp = '\\[\\begin{vmatrix}'
        for (ij of ma) {
            for (ji of ij) {
                dtemp += ji + "&"
            }
            dtemp = dtemp.slice(0, -1);
            dtemp += '\\\\';
        }
        dtemp += '\\end{vmatrix} = ' + ss2 + '\\]'
        document.getElementById('singlematrixresult').innerHTML = dtemp;
        document.getElementById('singlematrixexplanation').innerHTML = lets2 + lets22 + lets222;

    } else {

        //    removes row and column
        for (lk = 0; lk < column; lk++) {
            var submatrix = [];
            var k = 0;
            var l = 0;
            for (i = 0; i < row; i++) {
                submatrix[l] = [];
                if (i == parseInt(firstrow[jj].slice(0, 1)))
                    continue;
                for (j = 0; j < column; j++) {
                    if (j == parseInt(firstrow[jj].slice(1, 2)))
                        continue;
                    submatrix[l][k] = ma[i][j];
                    k = (k + 1) % (row - 1);
                    if (k == 0)
                        l++;
                }
            }
            if (submatrix.length == parseInt(document.getElementById('srow1').value) - 1) {
                vtfinalfirst += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                vtfinalfirstresult += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                vtfinalfirstresult2 += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                vtfinalfirstresult2final += firstrow[firstrowel] + '('
                dtemp += '\\color{red}' + firstrow[firstrowel] + '\\color{black}\\begin{bmatrix}'
                for (ij of submatrix) {
                    for (ji of ij) {
                        dtemp += ji + "&"
                    }
                    dtemp = dtemp.slice(0, -1);
                    dtemp += '\\\\';
                }
                dtemp += '\\end{bmatrix}'
                vtfinalfirst += '\\big(' + submatrix[0][0] + '\\big)\\times\\big(' + submatrix[1][1] + '\\big)-\\big(' + submatrix[0][1] + '\\big)\\times\\big(' + submatrix[1][0] + '\\big)'
                vtfinalfirstresult += '\\big(' + eval(submatrix[0][0] * submatrix[1][1]) + '\\big)-\\big(' + eval(submatrix[0][1] * submatrix[1][0]) + '\\big)'
                vtfinalfirstresult2 += eval(eval(submatrix[0][0] * submatrix[1][1]) - eval(submatrix[0][1] * submatrix[1][0]))
                vtfinalfirstresult2final += eval(eval(submatrix[0][0] * submatrix[1][1]) - eval(submatrix[0][1] * submatrix[1][0]))
            }
            vtfinalfirst += '\\color{red}\\bigg)\\color{black}'
            vtfinalfirstresult += '\\color{red}\\bigg)\\color{black}'
            vtfinalfirstresult2 += '\\color{red}\\bigg)\\color{black}'
            vtfinalfirstresult2final += ')'
            //----------------------------------------------
            if (submatrix.length > 2) {
                var colofsub = submatrix.length;
                var rowofsub = submatrix.length;
                var firstrowofsub = [];
                var resultofsub = [];
                var jjofsub = 1;
                var elofsub = 0;
                for (jofsub = 0; jofsub < colofsub + colofsub; jofsub += 2) {
                    if (elofsub % 2 == 0) {
                        var signofsub = '+'
                    } else {
                        signofsub = '-'
                    }
                    firstrowofsub[jofsub] = signofsub + submatrix[0][elofsub];
                    firstrowofsub[jjofsub] = '0' + String(elofsub);
                    jjofsub += 2;
                    elofsub += 1;
                }
                var firstrowelofsub = 0;
                var jjofsub = 1;
                vt += '\\color{red}' + firstrow[firstrowel] + '\\left(\\color{black}'

                vtofsub += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                vtfinalofsub += '\\color{red}' + firstrow[firstrowel] + '\\left(\\color{black}'
                vtfinalofsubresult += '\\color{red}' + firstrow[firstrowel] + '\\left(\\color{black}'
                vtfinalofsubresult2 += '\\color{red}' + firstrow[firstrowel] + '\\left(\\color{black}'
                vtfinalofsubresult3 += '\\color{red}' + firstrow[firstrowel] + '\\left(\\color{black}'
                vtfinalofsubresult4 += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                vtfinalofsubresult5 += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                vtfinalofsubresult6 += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                sol5sub += firstrow[firstrowel] + '('

                vtfinal += '\\color{red}' + firstrow[firstrowel] + '\\left(\\color{black}'
                vtfinalresult += '\\color{red}' + firstrow[firstrowel] + '\\left(\\color{black}'
                vtfinalresult2 += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                vtfinalresult3 += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                vtfinalresult4 += '\\color{red}' + firstrow[firstrowel] + '\\bigg(\\color{black}'
                sol3 += firstrow[firstrowel] + '('

                for (lkofsub = 0; lkofsub < colofsub; lkofsub++) {
                    var submatrixofsub = [];
                    var kofsub = 0;
                    var lofsub = 0;
                    for (iofsub = 0; iofsub < rowofsub; iofsub++) {
                        submatrixofsub[lofsub] = [];
                        if (iofsub == parseInt(firstrowofsub[jjofsub].slice(0, 1)))
                            continue;
                        for (jofsub = 0; jofsub < colofsub; jofsub++) {
                            if (jofsub == parseInt(firstrowofsub[jjofsub].slice(1, 2)))
                                continue;
                            submatrixofsub[lofsub][kofsub] = submatrix[iofsub][jofsub];
                            kofsub = (kofsub + 1) % (rowofsub - 1);
                            if (kofsub == 0)
                                lofsub++;
                        }
                    }
                    vt += '\\color{blue}' + firstrowofsub[firstrowelofsub] + '\\color{black}\\begin{bmatrix}'
                    vtfinal += '\\color{blue}' + firstrowofsub[firstrowelofsub] + '\\bigg(\\color{black}'
                    vtfinalresult += '\\color{blue}' + firstrowofsub[firstrowelofsub] + '\\bigg(\\color{black}'
                    vtfinalresult2 += '\\color{blue}' + firstrowofsub[firstrowelofsub] + '\\big(\\color{black}'
                    vtfinalresult3 += '\\color{blue}' + firstrowofsub[firstrowelofsub][0] + '\\big(\\color{black}'
                    sol2 += firstrowofsub[firstrowelofsub][0] + '('
                    for (ij of submatrixofsub) {
                        for (ji of ij) {
                            vt += ji + "&"
                        }
                        vt = vt.slice(0, -1);
                        vt += '\\\\';
                    }
                    vt += '\\end{bmatrix}'
                    vtfinal += '\\big(' + submatrixofsub[0][0] + '\\times' + submatrixofsub[1][1] + '\\big)-\\big(' + submatrixofsub[0][1] + '\\times' + submatrixofsub[1][0] + '\\big)\\color{blue}\\bigg)'
                    vtfinalresult += '\\big(' + eval(submatrixofsub[0][0] * submatrixofsub[1][1]) + '\\big)-\\big(' + eval(submatrixofsub[0][1] * submatrixofsub[1][0]) + '\\big)\\color{blue}\\bigg)'
                    var sol = eval(eval(submatrixofsub[0][0] * submatrixofsub[1][1]) - eval(submatrixofsub[0][1] * submatrixofsub[1][0]))
                    vtfinalresult2 += sol + '\\color{blue}\\big)'
                    vtfinalresult3 += eval(firstrowofsub[firstrowelofsub].slice(1) * sol) + '\\color{blue}\\big)'
                    //			vtfinalresult3+='\\big)'
                    sol2 += eval(firstrowofsub[firstrowelofsub].slice(1) * sol) + ')'

                    jjofsub += 2;
                    firstrowelofsub += 2;
                    //inner sub------------------------------------------
                    if (submatrixofsub.length > 2) {
                        var colofsubofsub = submatrixofsub.length;
                        var rowofsubofsub = submatrixofsub.length;
                        var firstrowofsubofsub = [];
                        var resultofsubofsub = [];
                        var jjofsubofsub = 1;
                        var elofsubofsub = 0;
                        for (jofsubofsub = 0; jofsubofsub < colofsubofsub + colofsubofsub; jofsubofsub += 2) {
                            if (elofsubofsub % 2 == 0) {
                                var signofsubofsub = '+'
                            } else {
                                signofsubofsub = '-'
                            }
                            firstrowofsubofsub[jofsubofsub] = signofsubofsub + submatrixofsub[0][elofsubofsub];
                            firstrowofsubofsub[jjofsubofsub] = '0' + String(elofsubofsub);
                            jjofsubofsub += 2;
                            elofsubofsub += 1;
                        }
                        var firstrowelofsubofsub = 0;
                        var jjofsubofsub = 1;
                        vtfinalofsub += '\\color{blue}' + firstrowofsub[firstrowelofsub - 2] + '\\bigg(\\color{black}'

                        vtfinalofsubresult += '\\color{blue}' + firstrowofsub[firstrowelofsub - 2] + '\\bigg(\\color{black}'
                        vtfinalofsubresult2 += '\\color{blue}' + firstrowofsub[firstrowelofsub - 2] + '\\bigg(\\color{black}'
                        vtfinalofsubresult3 += '\\color{blue}' + firstrowofsub[firstrowelofsub - 2] + '\\bigg(\\color{black}'
                        vtfinalofsubresult4 += '\\color{blue}' + firstrowofsub[firstrowelofsub - 2] + '\\color{black}'//last 3

                        sol3sub += firstrowofsub[firstrowelofsub - 2] + '('
                        sol4sub += firstrowofsub[firstrowelofsub - 2] + '('

                        vtofsub += '\\color{blue}' + firstrowofsub[firstrowelofsub - 2] + '\\bigg(\\color{black}'

                        for (lkofsubofsub = 0; lkofsubofsub < colofsubofsub; lkofsubofsub++) {
                            var submatrixofsubofsub = [];
                            var kofsubofsub = 0;
                            var lofsubofsub = 0;
                            for (iofsubofsub = 0; iofsubofsub < rowofsubofsub; iofsubofsub++) {
                                submatrixofsubofsub[lofsubofsub] = [];
                                if (iofsubofsub == parseInt(firstrowofsubofsub[jjofsubofsub].slice(0, 1)))
                                    continue;
                                for (jofsubofsub = 0; jofsubofsub < colofsubofsub; jofsubofsub++) {
                                    if (jofsubofsub == parseInt(firstrowofsubofsub[jjofsubofsub].slice(1, 2)))
                                        continue;
                                    submatrixofsubofsub[lofsubofsub][kofsubofsub] = submatrixofsub[iofsubofsub][jofsubofsub];
                                    kofsubofsub = (kofsubofsub + 1) % (rowofsubofsub - 1);
                                    if (kofsubofsub == 0)
                                        lofsubofsub++;
                                }
                            }

                            vtofsub += '\\color{#fb650d}' + firstrowofsubofsub[firstrowelofsubofsub] + '\\color{black}\\begin{bmatrix}'
                            vtfinalofsub += '\\color{#fb650d}' + firstrowofsubofsub[firstrowelofsubofsub] + '\\bigg(\\color{black}'

                            vtfinalofsubresult += '\\color{#fb650d}' + firstrowofsubofsub[firstrowelofsubofsub] + '\\bigg(\\color{black}'
                            vtfinalofsubresult2 += '\\color{#fb650d}' + firstrowofsubofsub[firstrowelofsubofsub] + '\\color{black}'
                            vtfinalofsubresult3 += '\\color{#fb650d}' + firstrowofsubofsub[firstrowelofsubofsub][0] + '\\color{black}'
                            sol2sub += firstrowofsubofsub[firstrowelofsubofsub][0]
                            for (ijofsub of submatrixofsubofsub) {
                                for (jiofsub of ijofsub) {
                                    vtofsub += jiofsub + "&"
                                }
                                vtofsub = vtofsub.slice(0, -1);
                                vtofsub += '\\\\';
                            }
                            vtofsub += '\\end{bmatrix}'
                            vtfinalofsub += '\\big(' + submatrixofsubofsub[0][0] + '\\times' + submatrixofsubofsub[1][1] + '\\big)-\\big(' + submatrixofsubofsub[0][1] + '\\times' + submatrixofsubofsub[1][0] + '\\big)\\color{#fb650d}\\bigg)'

                            vtfinalofsubresult += '\\big(' + eval(submatrixofsubofsub[0][0] * submatrixofsubofsub[1][1]) + '\\big)-\\big(' + eval(submatrixofsubofsub[0][1] * submatrixofsubofsub[1][0]) + '\\big)\\color{#fb650d}\\bigg)'
                            var sol = eval(eval(submatrixofsubofsub[0][0] * submatrixofsubofsub[1][1]) - eval(submatrixofsubofsub[0][1] * submatrixofsubofsub[1][0]))
                            vtfinalofsubresult2 += '\\color{#fb650d}\\big(\\color{black}' + sol + '\\color{#fb650d}\\big)\\color{black}'
                            vtfinalofsubresult3 += '\\color{#fb650d}\\big(\\color{black}' + eval(firstrowofsubofsub[firstrowelofsubofsub].slice(1) * sol) + '\\color{#fb650d}\\big)\\color{black}'
                            sol2sub += '(' + eval(firstrowofsubofsub[firstrowelofsubofsub].slice(1) * sol) + ')'

                            jjofsubofsub += 2;
                            firstrowelofsubofsub += 2;

                        }
                        vtfinalofsubresult4 += '\\color{blue}\\big(\\color{black}' + nerdamer(sol2sub).evaluate().toString() + '\\color{blue}\\big)\\color{black}'

                        sol3sub += nerdamer(sol2sub).evaluate().toString() + ')'
                        sol4sub += nerdamer(sol2sub).evaluate().toString() + ')'
                        vtfinalofsubresult5 += '\\color{blue}+\\color{black}\\big(' + nerdamer(sol3sub).evaluate().toString() + '\\big)'
                        sol3sub = ''
                        sol2sub = '';

                        vtofsub += '\\color{blue}\\bigg)\\color{black}'
                        vtfinalofsub += '\\color{blue}\\bigg)\\color{black}'
                        vtfinalofsubresult += '\\color{blue}\\bigg)\\color{black}'
                        vtfinalofsubresult2 += '\\color{blue}\\bigg)\\color{black}'
                        vtfinalofsubresult3 += '\\color{blue}\\bigg)\\color{black}'

                    }
                    //inner sub------------------------------------------
                }

                vt += '\\color{red}\\right)'
                vtfinal += '\\color{red}\\right)'
                vtfinalresult += '\\color{red}\\right)'
                vtfinalresult2 += '\\color{red}\\bigg)'
                vtfinalresult3 += '\\color{red}\\bigg)'
                vtfinalofsubresult6 += nerdamer(sol4sub).evaluate().toString()
                sol5sub += nerdamer(sol4sub).evaluate().toString()
                sol4sub = ''
                var jk = nerdamer(sol2).evaluate().toString()
                vtfinalresult4 += jk + '\\color{red}\\bigg)'
                sol3 += jk + ')'
                sol2 = '';
                vtofsub += '\\color{red}\\bigg)\\color{black}'
                vtfinalofsub += '\\color{red}\\right)\\color{black}'
                vtfinalofsubresult += '\\color{red}\\right)\\color{black}'
                vtfinalofsubresult2 += '\\color{red}\\right)\\color{black}'
                vtfinalofsubresult3 += '\\color{red}\\right)\\color{black}'
                vtfinalofsubresult4 += '\\color{red}\\bigg)\\color{black}'
                vtfinalofsubresult5 += '\\color{red}\\bigg)\\color{black}'
                vtfinalofsubresult6 += '\\color{red}\\bigg)\\color{black}'
                sol5sub += ')'

            }
            //-----------------------------------
            if (submatrix.length <= 2) {
                result[lk] = eval(firstrow[firstrowel] * eval(eval(submatrix[0][0] * submatrix[1][1]) - eval(submatrix[0][1] * submatrix[1][0])))
            }
            jj += 2;
            firstrowel += 2;
        }
        //    removes row and column
        dtemp += '\\]'
        vt += '\\]'
        vtofsub += '\\]'
        vtfinal += '\\]'
        vtfinalofsub += '\\]'
        vtfinalofsubresult += '\\]'
        vtfinalofsubresult2 += '\\]'
        vtfinalofsubresult3 += '\\]'
        vtfinalofsubresult4 += '\\]'
        vtfinalofsubresult5 += '\\]'
        vtfinalofsubresult6 += '\\]'
        vtfinalfirst += '\\]'
        vtfinalfirstresult += '\\]'
        vtfinalfirstresult2 += '\\]'
        vtfinalresult += '\\]'
        vtfinalresult2 += '\\]'
        vtfinalresult3 += '\\]'
        vtfinalresult4 += '\\]'

        //    dtemp+='--------------------'
        document.getElementById('singlematrixexplanation').innerHTML += dtemp;
        if (submatrix.length == 2) {
            document.getElementById('singlematrixexplanation').innerHTML += vtfinalfirst;
            document.getElementById('singlematrixexplanation').innerHTML += vtfinalfirstresult;
            document.getElementById('singlematrixexplanation').innerHTML += vtfinalfirstresult2;
            var dis = '\\[\\begin{vmatrix}';
            for (om of ma) {
                for (omm of om) {
                    dis += omm + '&'
                }
                dis = dis.slice(0, -1)
                dis += '\\\\'
            }
            var sdd = nerdamer(vtfinalfirstresult2final).evaluate().toString();
            dis += '\\end{vmatrix}=' + sdd + '\\]'
            document.getElementById('singlematrixexplanation').innerHTML += '\\[Determinant = ' + sdd + '\\]';
            document.getElementById('singlematrixresult').innerHTML = dis;
        }

        if (submatrix.length > 2) {
            document.getElementById('singlematrixexplanation').innerHTML += vt;
            if (submatrixofsub.length == 2) {
                document.getElementById('singlematrixexplanation').innerHTML += vtfinal;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalresult;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalresult2;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalresult3;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalresult4;
                var dis = '\\[\\begin{vmatrix}';
                for (om of ma) {
                    for (omm of om) {
                        dis += omm + '&'
                    }
                    dis = dis.slice(0, -1)
                    dis += '\\\\'
                }
                var sdd = nerdamer(sol3).evaluate().toString();
                dis += '\\end{vmatrix}=' + sdd + '\\]'
                document.getElementById('singlematrixexplanation').innerHTML += '\\[Determinant = ' + sdd + '\\]';
                document.getElementById('singlematrixresult').innerHTML = dis;
            }
            if (submatrixofsub.length > 2) {
                document.getElementById('singlematrixexplanation').innerHTML += vtofsub;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalofsub;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalofsubresult;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalofsubresult2;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalofsubresult3;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalofsubresult4;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalofsubresult5;
                document.getElementById('singlematrixexplanation').innerHTML += vtfinalofsubresult6;
                var dis = '\\[\\begin{vmatrix}';
                for (om of ma) {
                    for (omm of om) {
                        dis += omm + '&'
                    }
                    dis = dis.slice(0, -1)
                    dis += '\\\\'
                }
                var sdd = nerdamer(sol5sub).evaluate().toString();
                dis += '\\end{vmatrix}=' + sdd + '\\]'
                document.getElementById('singlematrixexplanation').innerHTML += '\\[Determinant = ' + sdd + '\\]';
                document.getElementById('singlematrixresult').innerHTML = dis;
            }
        }
        submatrix = []
        submatrixofsub = []
        submatrixofsubofsub = []
    }
    renderMathInElement(document.getElementById('singlematrixexplanation'));
    renderMathInElement(document.getElementById('singlematrixresult'));
}
