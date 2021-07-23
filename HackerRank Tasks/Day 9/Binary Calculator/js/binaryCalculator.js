function action(e) {
    var btn = e.target || e.srcElement;
    document.getElementById('res').innerText += document.getElementById(btn.id).innerHTML;
  }

  document.getElementById('btn0').addEventListener('click', action);
  document.getElementById('btn1').addEventListener('click', action);
  document.getElementById('btnSum').addEventListener('click', action);
  document.getElementById('btnSub').addEventListener('click', action);
  document.getElementById('btnDiv').addEventListener('click', action);
  document.getElementById('btnMul').addEventListener('click', action);

  document.getElementById('btnClr').addEventListener('click', function () {
    document.getElementById('res').innerText = "";
  });

  document.getElementById('btnEql').addEventListener('click', function () {
    var expression = document.getElementById('res').innerText;
    var reToMatchDigits = new RegExp('\\d+', 'g');
    var reToMatchOperators = new RegExp('\\D+', 'g');
    const operands = expression.match(reToMatchDigits);
    const operator = expression.match(reToMatchOperators);
    if (operator!=null&&operands.length==2) {
      var operand1 = parseInt(operands[0], 2);
      var operand2 = parseInt(operands[1], 2);
      switch (operator[0]) {
        case "+": {
          document.getElementById('res').innerText = (operand1 + operand2).toString(2);
          break;
        }
        case "-": {
          document.getElementById('res').innerText = (operand1 - operand2).toString(2);
          break;
        }
        case "*": {
          document.getElementById('res').innerText = (operand1 * operand2).toString(2);
          break;
        }
        case "/": {
          document.getElementById('res').innerText = (Math.floor(operand1 / operand2)).toString(2);
          break;
        }
      }
    }
  });
