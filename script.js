document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('.validate');
    const resetButton = document.getElementById('resetButton');
    let message = document.querySelector('.endmsg')
    let minLength = 2;
    let maxLength = 10;
    const alphaNumeric = /^[a-zA-Z0-9]*$/;
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
    const zipPattern = /^\d{5}$/;

    const submitButton = document.getElementById('submitButton');

    submitButton.disabled = true;

    //ok
    resetButton.addEventListener('click', function() {
        // Clear error messages
        document.getElementById('titleError').style.display = 'none';
        document.getElementById('sourceError').style.display = 'none';
        document.getElementById('selectError').style.display = 'none';
        document.getElementById('commentsError').style.display = 'none';
        const messageElements = form.querySelectorAll('.endmsg');
 
        messageElements.forEach((msgElement) => {
            msgElement.textContent = ""; // Clear the message
        });

    
        // Disable the submit button
        submitButton.disabled = true;
    });

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            validateField(input);
            checkFormValidity();
        });
    });

    const commentsField = document.getElementById('comments');
    const commentsError = document.getElementById('commentsError');

    
    function validateComments() {
        if (commentsField.value.trim() === '') {
            commentsError.style.display = 'inline'; 

        } else {
            commentsError.style.display = 'none'; 

        }
    }

    commentsField.addEventListener('input', validateComments);

    function validateCheckboxes() {
        const checkboxes = document.querySelectorAll('input[name="source"]');
        const sourceError = document.getElementById('sourceError');
        const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        if (!isChecked) {
            sourceError.style.display = 'inline'; 
            return false; 
        } else {
            sourceError.style.display = 'none'; 
            return true;
        }
    }
    function validateField(input) {
        const inputValue = input.value.trim()
        const inputName = input.getAttribute('name');


        if (inputName === 'firstName' || inputName === 'lastName') {

            if (inputValue === "") {
                setMessage(`Please enter your ${inputName}`, 'red', input)
            }
            else if (!alphaNumeric.test(inputValue)) {
                setMessage(`Name should not be special character`, 'red', input);
            }

            else if (inputValue.length < minLength || inputValue.length > maxLength) {
                setMessage(`Your ${inputName} should be between ${minLength} and ${maxLength}`, 'red', input)
            }

            else {
                setMessage("", '', input);
            }
        }

        else if (inputName === 'phoneNumber') {

            if (inputValue === "") {
                setMessage(`Please enter phone number`, 'red', input)
            }
            else if (!phonePattern.test(inputValue)) {
                setMessage(`Please enter a valid phone number in the format xxx-xxx-xxxx`, 'red', input);
            }
            else {
                setMessage("", '', input);
            }
        }


        else if (inputName === 'emailId') {
            if (inputValue === "") {
                setMessage(`Please enter Email Address`, 'red', input)
            }
            else if (!emailPattern.test(inputValue)) {
                setMessage(`Please enter a valid email address`, 'red', input);
            }
            else {
                setMessage("", '', input);
            }
        }


        else if (inputName === 'zipcode') {
            if (inputValue === "") {
                setMessage(`Please enter Zip Code`, 'red', input)
            }

            else if (!zipPattern.test(inputValue)) {
                setMessage(`Please enter a valid 5-digit zip code`, 'red', input);
            } else {
                setMessage("", '', input);
            }
        }

        else if (inputName === 'address1') {
            if (inputValue === "") {
                setMessage(`Please enter your address`, 'red', input)
            }
            else {
                setMessage("", '', input);
            }

        }
        else if (inputName === 'city') {
            if (inputValue === "") {
                setMessage(`Please enter your City`, 'red', input)
            }
            else if (inputValue.length < minLength) {
                setMessage(`Enter correct city`, 'red', input)
            }
            else {
                setMessage("", '', input);
            }

        }

        else if (inputName === 'state') {
            if (inputValue === "") {
                setMessage(`Please enter your State`, 'red', input)
            }
            else if (inputValue.length < minLength) {
                setMessage(`Enter correct state`, 'red', input)
            }
            else {
                setMessage("", '', input);
            }

        }
        else {
            setMessage("", '', input);
        }

    }

    function setMessage(msg, clr, input) {
        const msgElement = input.nextElementSibling;

        msgElement.style.color = clr;
        msgElement.textContent = msg;

    }

    function checkFormValidity() {
        let allValid = true;

        inputs.forEach(input => {
            const inputValue = input.value.trim();


            if (inputValue === "" && input.name !== 'address2') {
                allValid = false;
            }


            if (input.nextElementSibling.textContent !== "") {
                allValid = false;
            }
        });

        const commentsValue = commentsField.value.trim();

        if (commentsValue === "") {
            commentsError.style.display = 'inline';
            allValid = false;
        } else {
            commentsError.style.display = 'none';
        }

        //radio

        const titleChecked = document.querySelector('input[name="title"]:checked');
        const titleError = document.getElementById("titleError");
        if (!titleChecked) {
            titleError.style.display = 'inline';
            allValid = false;
        } else {
            titleError.style.display = 'none';
        }

          // Check "How did you hear"
          const sourceError = document.getElementById('sourceError');
          if (!validateCheckboxes()) {
              sourceError.style.display = 'inline';
              allValid = false;
          } else {
              sourceError.style.display = 'none';
          }

           // Check "Choose an option" select field
        const selectedOption = document.getElementById('dynamicSelect').value;
        const selectError = document.getElementById('selectError');
        if (!selectedOption || selectedOption === 'Select') {
            selectError.style.display = 'inline';
            allValid = false;
        } else {
            selectError.style.display = 'none';
        }

  




        submitButton.disabled = !allValid;
        // Disable the submit button if any input is invalid or empty
        submitButton.disabled = !allValid;
    }

    commentsField.addEventListener('input', checkFormValidity);
    inputs.forEach(input => input.addEventListener('input', checkFormValidity));
    document.getElementById('dynamicSelect').addEventListener('change', checkFormValidity);
    document.querySelectorAll('input[name="title"]').forEach(radio => radio.addEventListener('change', checkFormValidity));
    document.querySelectorAll('input[name="source"]').forEach(checkbox => checkbox.addEventListener('change', checkFormValidity));

    const selectList = document.getElementById('dynamicSelect');
    const checkboxContainer = document.getElementById('checkboxContainer');
    const optionContainer = document.getElementById('optionContainer');

    function handleSelect(event) {
        const inputOption = event.target.value;

        checkboxContainer.innerHTML = '';
        optionContainer.innerHTML = '';

        if (inputOption === 'Cold Coffee' || inputOption === 'Hot Coffee' || inputOption === 'Mocha' || inputOption === 'Latte' || inputOption === 'Americano') {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const label = document.createElement('label');
            label.textContent = `Add extra option for ${inputOption}`;
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);




            checkbox.addEventListener('change', function () {
                optionContainer.innerHTML = '';
                if (checkbox.checked) {
                    const dynamicBox = document.createElement('textarea');
                    dynamicBox.rows = "5";
                    dynamicBox.cols = "25";
                    const label1 = document.createElement('label');
                    dynamicBox.placeholder = `Extra option for ${inputOption}`;

                    optionContainer.appendChild(dynamicBox);
                    checkboxContainer.appendChild(label1);


                }
                else {
                    optionContainer.innerHTML = '';
                }
            })
        }
    }

    selectList.addEventListener('change', handleSelect);
    const form = document.querySelector('form');
    const dataTable = document.getElementById('dataTable');
    const tableBody = document.getElementById('tableBody');

    dataTable.style.display = 'none';


    const titleError = document.getElementById("titleError");

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const Stitle = document.querySelector('input[name="title"]:checked');
        if (!Stitle) {
            titleError.style.display = 'inline'; 
            return; 
        } else {
            titleError.style.display = 'none'; 
        }

        if (!validateCheckboxes()) {
            return; 
        }



        // Geting form data
        const title = document.querySelector('input[name="title"]:checked')?.value || "";
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('emailId').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const address1 = document.querySelector('input[name="address1"]').value;
        const address2 = document.querySelector('input[name="address2"]').value;
        const city = document.querySelector('input[name="city"]').value;
        const state = document.querySelector('input[name="state"]').value;
        const zipcode = document.querySelector('input[name="zipcode"]').value;
        const howDidYouHear = Array.from(document.querySelectorAll('input[name="source"]:checked')).map(checkbox => checkbox.value).join(', ');
        const selectedOption = document.getElementById('dynamicSelect').value;
        const extraOption = document.querySelector('#optionContainer textarea')?.value || '';
        const comments = document.getElementById('comments').value;

        // Create a new table row
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
        <td>${title}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phoneNumber}</td>
        <td>${address1}</td>
        <td>${address2}</td>
        <td>${city}</td>
        <td>${state}</td>
        <td>${zipcode}</td>
        <td>${howDidYouHear}</td>
        <td>${selectedOption}</td>
        <td>${extraOption}</td>
        <td>${comments}</td>
      `;

        // Append the new row to the table
        tableBody.appendChild(newRow);

        dataTable.style.display = 'table';
        form.reset();
        submitButton.disabled = true;


        document.getElementById('checkboxContainer').innerHTML = '';
        document.getElementById('optionContainer').innerHTML = '';
    });

});
