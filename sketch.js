// Constants
var display = []
var selected = false
var editableMode = false
var offsetX = -27
var offsetY = -27
var selectedElement;

function setup() {
  canvas = createCanvas(600, 400);

  var newButton = select('#createText');
  newButton.mousePressed(insertText)
    //textSize(16);
}


function insertText() {
    let textToBeInserted = document.getElementById('newText').value;
    console.log(textToBeInserted)
    if (textToBeInserted == '') {
        alert('Empty input')
        return;
    }
    let newTextObj = {
        type: 'text',
        content: textToBeInserted,
        x_pos: 20,
        y_pos: 20,
        textSize: 20,
    }
    textSize(newTextObj.textSize);
    console.log(textWidth(textToBeInserted))
    newTextObj.width = textWidth(textToBeInserted) + textWidth(' ')
    newTextObj.height = newTextObj.textSize,
    display.push(newTextObj)
}

function printElem() {
    for (let i = 0; i < display.length; i++) {
        let currElem = display[i]
        fill(0);
        noStroke()
        //strokeWeight(1)
        textSize(currElem.textSize)
        text(currElem.content, currElem.x_pos, currElem.y_pos, currElem.width, currElem.height)
    }
}

function draw() {
    background(230);
    printElem();
    if (selected != false) {
        //console.log("Not false")
        const elem = display[selected.ind];
        noFill();
        stroke(255, 0, 0);
        strokeWeight(2);
        rect(elem.x_pos - 5, elem.y_pos - 5, elem.width + 10, elem.height + 10);
    }
}

/**
 * To check if mousePointer is within bounds of an element
 */
function ifWithinBounds() {
    for (let i = 0; i < display.length; i++) {
        let currElem = display[i]
        let elemX = currElem.x_pos
        let elemY = currElem.y_pos
        let elemW = currElem.width
        let elemH = currElem.height
        //let text = currElem.content
        //console.log()
        //console.log(currElem)
        if (mouseX > elemX && mouseX < elemX+elemW && mouseY > elemY && mouseY < elemY + elemH) {
            //rect(elemX - 5, elemY - 5, elemW + 10, elemY + 10)
            //console.log(currElem)
            selected = {elemX, elemY, elemW , elemH, ind: i}
            return currElem
        }
    }
    selected = false
    editableMode = false
    return false
}

function doubleClicked() {
    selectedElement = ifWithinBounds()
    if (selectedElement == false) {
        editableMode = false
        return ;
    }
    editableMode = true
}

function mouseClicked() {
    selectedElement = ifWithinBounds()
    //console.log(selectedElement)
    if (selectedElement != false) {
        console.log(selectedElement)
    }
    return false;
}

function keyTyped() {
    if (editableMode != false) {
        display[selected.ind].content += key;
        console.log(key)
        if (display[selected.ind].width < 400) { display[selected.ind].width += textWidth(key) }
        else {
            display[selected.ind].height += display[selected.ind].textSize + 4;
        }
    }
}

function keyPressed() {
    if (keyCode === BACKSPACE) {
        if (editableMode != false) {
            let textToChange = display[selected.ind].content;
            if (textToChange[textToChange.length - 1] == '\n') {
                display[selected.ind].height -= display[selected.ind].textSize + 2;
            }
            else {
                display[selected.ind].width -= textWidth(textToChange[textToChange.length - 1])
            }
            textToChange = textToChange.slice(0,-1)

            display[selected.ind].content = textToChange
            
        }
    }
    if (keyCode === ENTER) {
        if (editableMode != false) {
            display[selected.ind].content += '\n'
            display[selected.ind].height += display[selected.ind].textSize + 5;
            //displat[selected.ind].height += 
        }
    }
  }

  function mousePressed() {
        if (selected != false) {
        if (offsetX == -27 && offsetY == -27)
        { 
            offsetX = mouseX - display[selected.ind].x_pos; 
            offsetY = mouseY - display[selected.ind].x_pos;
        } 
    }
  }

  function mouseDragged() {
    if (selected != false) {
        display[selected.ind].x_pos = mouseX - offsetX;
        display[selected.ind].y_pos = mouseY - offsetY;
    }
  }

  function mouseRelease() {
      offsetX = -20
      offsetY = -20
      selected = false
  }
