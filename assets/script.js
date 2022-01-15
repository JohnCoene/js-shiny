// get data from server
Shiny.addCustomMessageHandler("dataset-in", (msg) => {
  $('#app').html(makeBoxes(msg.data));
  bindEvents();
});

const makeBoxes = (data) => {
  return data.map((box, index) => {
    return `<div class='card mb-3'>
      <div class='card-body'>
        <h5 class="card-title">Card #<span class='card-index'>${index + 1}</span></h5>
        ${makeBox(box)}
      </div>
    </div>`;
  }).join('');
}

const makeBox = (data) => {
  return data.map((el) => {
    return makeInput(el);
  }).join('');
}

// Simple switch over type to create the 
// correct input note that we set value of input
// when we create it
const makeInput = (input) => {
  switch(input.type) {
    case 'number':
      return makeNumber(input.value);
    case 'text':
      return makeText(input.value);
    case 'select':
      return makeSelect(input.value);
  }
}

const makeNumber = (value) => {
  return `<div>
    <input 
      type='range' 
      class='input input-select form-range'
      min='0'
      max='100'
      step='1'
      value='${value}'>
  </div>`;
}

const makeText = (value) => {
  return `<div>
    <input 
      type='text'
      value='${value}'
      class='input input-text form-control'>
  </div>`
}

const choices = ['A', 'B', 'C', 'D'];
const makeSelect = (value) => {
  let select = '<select class="input input-select form-select">'
  let options = choices.map((choice) => {
    return `<option ${choice == value ? 'selected' : ''}>${choice}</option>`
  }).join('');
  return select + options + '</select>';
}

/**
 * Bind events to all inputs, again lazy here for the example
 * we just bind to class 'input', you could have individual
 * listeners for input types.
 */
const bindEvents = () => {
  $('.input').on('change keyup', (event) => {
    let data = {
      box: getBoxIndex(event.currentTarget),
      values: captureBoxValues(event.currentTarget)
    };

    // you could just send the single input value if you want
    // but I often do like this, I find it easier albeit layzier
    // server-side I just squash the structure for box number x
    // given the nested data it can be painful to update a single
    // value: perhaps not in this simple example
    Shiny.setInputValue('datasetOut', data);
  });
}

/**
 * This capture all the values for a given box
 * @param  {HTMLElement} input - input triggering this capture
 * (we capture values on input change)
 */
const captureBoxValues = (input) => {
  let data = [];
  $(input)
    .closest('.card') // get closest parent card
    .find('.input') // get all inputs in box
    .each((index, el) => {
      data.push({
        type: getType(el),
        value: $(el).val()
      })
    });
  return data;
}

const getType = (element) => {
  if($(element).is('input[type="text"]'))
    return 'text';

  if($(element).is('input[type="range"]'))
    return 'number';
  
  return 'select';
}

const getBoxIndex = (el) => {
  return parseInt(
      $(el)
      .closest('.card')
      .find('.card-index')
      .text()
  );
}
