/*functions for the form in contact us */

var c = 0;

function pop() {
    var firstname = document.getElementById('fname').value;
    var lastname = document.getElementById('lname').value;
    var phonenmbr = document.getElementById('phone').value;
    var selectoptions = document.getElementById('options').value;
    var sub = document.getElementById('subject').value;

    if ((c == 0) && phone.value.match(/^\(?([0-9]{3})\)?[-]?([0-9]{2})[-]?([0-9]{6})$/g) && phonenmbr != "" && firstname != "" && lastname != "" && selectoptions != "" && sub != "") {
        document.getElementById("errorbox").style.visibility = "hidden";
        document.getElementById("errorbox").style.opacity = 0;
        document.getElementById("modalbox").style.visibility = "visible";
        document.getElementById("modalbox").style.opacity = 1;
        c = 1;

    } else {
        document.getElementById("errorbox").style.visibility = "visible";
        document.getElementById("errorbox").style.opacity = 1;
        document.getElementById("modalbox").style.visibility = "hidden";
        document.getElementById("modalbox").style.opacity = 0;
        c = 0;
    }

}


function clearform() {
    var x = document.getElementById("contactform");
    x.reset();
}


/* end of functions for the form contact us */
// functions for book a trip form
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";

    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        document.getElementById("modalbox").style.visibility = "visible";
        document.getElementById("modalbox").style.opacity = 1;
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}


function validateForm() {
    // This function deals with validation of the form fields
    var t = document.getElementById("phone").value;
    var z = document.getElementById("pax_number").value;
    var e = document.getElementById("InputEmail").value;
    const re = /\S+@\S+\.\S+/;
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    y2 = x[currentTab].getElementsByTagName("select");

    // and set the current valid status to false
    if (t.match(/^\(?([0-9]{3})\)?[-]?([0-9]{2})[-]?([0-9]{6})$/g)) { valid = true; } else {
        document.getElementById("errorbox").style.visibility = "visible";
        document.getElementById("errorbox").style.opacity = 1;
        document.getElementById("modalbox").style.visibility = "hidden";
        document.getElementById("modalbox").style.opacity = 0;
        valid = false;
    }
    if (re.test(e) != true) {
        document.getElementById("errorbox").style.visibility = "visible";
        document.getElementById("errorbox").style.opacity = 1;
        document.getElementById("modalbox").style.visibility = "hidden";
        document.getElementById("modalbox").style.opacity = 0;
        valid = false;
    }

    if (z != 0 && z != 1 && z != 2 && z != 3 && z != 4 && z != 5) {
        document.getElementById("errorbox").style.visibility = "visible";
        document.getElementById("errorbox").style.opacity = 1;
        document.getElementById("modalbox").style.visibility = "hidden";
        document.getElementById("modalbox").style.opacity = 0;
        valid = false;
    }
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if ((y[i].value == "") && (y[i].id != "yesbaggage") && (y[i].id != "return_trip")) {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    for (i = 0; i < y2.length; i++) {
        // If a field is empty...
        if (y2[i].value == "") {
            // add an "invalid" class to the field:
            y2[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status

}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

function disableroundtrip() {
    var trips = document.getElementById('roundtrip').checked;
    var returntrip = document.getElementById('return_trip');

    if (trips) {
        returntrip.disabled = false;
        returntrip.classList.add("invalid");
        valid = false;
    } else {
        returntrip.disabled = true;

    }
    return valid;
}

function baggageHandler() {
    var x = document.getElementById("yesbaggage");
    var y = document.getElementById("excessbaggage");

    if (y.checked) {
        x.style.display = 'inline';
        x.setAttribute('required');
    } else x.style.display = 'none';

}

$('#DOB').datepicker({
    startDate: '-100y',
    endDate: '-18y',
    autoclose: true,
});


$('#departure').datepicker({
    startDate: new Date(),
    autoclose: true,
});


$('#return_trip').datepicker({
    startDate: new Date(),
    autoclose: true,
});

function modalclose() {
    var x = document.querySelector("#errorbox");
    x.style.visibility = 'hidden';
    x.style.opacity = 0;
}
// end of book a trip functions