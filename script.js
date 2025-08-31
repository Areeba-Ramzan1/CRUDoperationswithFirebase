var rollV, nameV, emailV, phoneV;

function readForm() {
    rollV = document.getElementById("rollNo").value.trim();
    nameV = document.getElementById("name").value.trim();
    emailV = document.getElementById("email").value.trim();
    phoneV = document.getElementById("phone").value.trim();
    console.log(rollV, nameV, emailV, phoneV);
}

// Form validation check
function isFormValid() {
    if (rollV === "" || nameV === "" || emailV === "" || phoneV === "") {
        alert("⚠️ Please fill all fields before performing this action!");
        return false;
    }
    return true;
}

// Create
document.getElementById("create").onclick = function () {
    readForm();
    if (!isFormValid()) return;

    firebase.database().ref("student/" + rollV)
        .set({
            rollNo: rollV,
            name: nameV,
            email: emailV,
            phone: phoneV,
        });
    alert("✅ Data Created Successfully!");
    document.getElementById("rollNo").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

// Read
document.getElementById("read").onclick = function () {
    readForm();
    if (!isFormValid()) return;

    firebase.database().ref("student/" + rollV)
        .on("value", function (snap) {
            if (snap.exists()) {
                document.getElementById("rollNo").value = snap.val().rollNo;
                document.getElementById("name").value = snap.val().name;
                document.getElementById("email").value = snap.val().email;
                document.getElementById("phone").value = snap.val().phone;
                alert("📖 Data Read Successfully!");
            } else {
                alert("⚠️ No record found for this Roll No!");
            }
        });
}

// Update 
document.getElementById("update").onclick = function () {
    readForm();
    if (!isFormValid()) return;

    firebase.database().ref("student/" + rollV)
        .update({
            name: nameV,
            email: emailV,
            phone: phoneV,
        });
    alert("✏️ Data Updated Successfully!");
    document.getElementById("rollNo").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

// Delete
document.getElementById("delete").onclick = function () {
    readForm();
    if (!isFormValid()) return;

    firebase.database().ref("student/" + rollV).remove();
    alert("🗑️ Data Deleted Successfully!");
    document.getElementById("rollNo").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}
