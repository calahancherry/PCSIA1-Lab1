// ============================================
// LOGIN ACCOUNT
// ============================================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";



// ============================================
// ELEMENTS
// ============================================

const homePage =
    document.getElementById("homePage");

const getStartedBtn =
    document.getElementById("getStartedBtn");

const loginPage =
    document.getElementById("loginPage");

const loginForm =
    document.getElementById("loginForm");

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");

const backHomeBtn =
    document.getElementById("backHomeBtn");

const dashboardSystem =
    document.getElementById("dashboardSystem");

const logoutBtn =
    document.getElementById("logoutBtn");

const displayUsername =
    document.getElementById("displayUsername");



// ============================================
// LOCAL STORAGE
// ============================================

let savedUsers =
    JSON.parse(
        localStorage.getItem("cssUsers")
    ) || [];


let savedReservations =
    JSON.parse(
        localStorage.getItem("cssReservations")
    ) || [];



// ============================================
// EDIT INDEX
// ============================================

let editingUserIndex = -1;

let editingReservationIndex = -1;



// ============================================
// SAVE STORAGE
// ============================================

function saveUsers() {

    localStorage.setItem(
        "cssUsers",
        JSON.stringify(savedUsers)
    );

}


function saveReservations() {

    localStorage.setItem(
        "cssReservations",
        JSON.stringify(savedReservations)
    );

}



// ============================================
// VALIDATION FUNCTIONS
// ============================================

function showError(
    input,
    errorElement,
    message
) {

    input.classList.remove(
        "valid-input"
    );

    input.classList.add(
        "invalid-input"
    );

    errorElement.textContent =
        message;

}


function showSuccess(
    input,
    errorElement
) {

    input.classList.remove(
        "invalid-input"
    );

    input.classList.add(
        "valid-input"
    );

    errorElement.textContent =
        "";

}


function clearValidation(form) {

    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(
        function (field) {

            field.classList.remove(
                "valid-input",
                "invalid-input"
            );

        }
    );


    const errors =
        form.querySelectorAll(
            ".error-message"
        );


    errors.forEach(
        function (error) {

            error.textContent = "";

        }
    );

}



// ============================================
// GET STARTED
// ============================================

getStartedBtn.addEventListener(
    "click",
    function () {

        loginPage.classList.add(
            "show"
        );

        loginUsername.focus();

    }
);



// ============================================
// BACK
// ============================================

backHomeBtn.addEventListener(
    "click",
    function () {

        loginPage.classList.remove(
            "show"
        );

        loginForm.reset();

        clearValidation(
            loginForm
        );

    }
);



// ============================================
// LOGIN
// ============================================

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const username =
            loginUsername.value.trim();

        const password =
            loginPassword.value;


        const usernameError =
            document.getElementById(
                "loginUsernameError"
            );


        const passwordError =
            document.getElementById(
                "loginPasswordError"
            );


        let valid = true;


        if (username === "") {

            showError(
                loginUsername,
                usernameError,
                "Username is required."
            );

            valid = false;

        } else {

            showSuccess(
                loginUsername,
                usernameError
            );

        }


        if (password === "") {

            showError(
                loginPassword,
                passwordError,
                "Password is required."
            );

            valid = false;

        } else if (
            password.length < 8
        ) {

            showError(
                loginPassword,
                passwordError,
                "Password must have at least 8 characters."
            );

            valid = false;

        } else {

            showSuccess(
                loginPassword,
                passwordError
            );

        }


        if (!valid) {
            return;
        }


        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            sessionStorage.setItem(
                "loggedInUser",
                username
            );


            loginForm.reset();

            clearValidation(
                loginForm
            );


            loginPage.classList.remove(
                "show"
            );


            homePage.style.display =
                "none";


            dashboardSystem.classList.add(
                "show"
            );


            displayUsername.textContent =
                username.toUpperCase();


            showDashboardPage(
                "dashboardPage"
            );


            updateDashboardCounts();

        } else {

            showError(
                loginPassword,
                passwordError,
                "Invalid username or password."
            );

        }

    }
);



// ============================================
// SIDEBAR
// ============================================

const menuButtons =
    document.querySelectorAll(
        ".menu-btn[data-page]"
    );


const dashboardPages =
    document.querySelectorAll(
        ".dashboard-page"
    );


menuButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const pageId =
                    this.getAttribute(
                        "data-page"
                    );


                showDashboardPage(
                    pageId
                );


                menuButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );

            }
        );

    }
);



function showDashboardPage(pageId) {

    dashboardPages.forEach(
        function (page) {

            page.classList.remove(
                "active-page"
            );

        }
    );


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.add(
            "active-page"
        );

    }


    document.querySelector(
        ".dashboard-content"
    ).scrollTop = 0;

}



// ============================================
// LOGOUT
// ============================================

logoutBtn.addEventListener(
    "click",
    function () {

        const answer =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!answer) {
            return;
        }


        sessionStorage.removeItem(
            "loggedInUser"
        );


        dashboardSystem.classList.remove(
            "show"
        );


        homePage.style.display =
            "block";


        window.scrollTo(
            0,
            0
        );

    }
);



// ============================================
// DISPLAY USERS
// ============================================

function displayUsers() {

    const tableBody =
        document.querySelector(
            "#userTable tbody"
        );


    tableBody.innerHTML = "";


    savedUsers.forEach(
        function (user, index) {

            const row =
                tableBody.insertRow();


            row.innerHTML = `
                <td>${user.userId}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.department}</td>
                <td>${user.status}</td>

                <td>

                    <button
                        class="edit-record-btn"
                        data-user-edit="${index}">
                        Edit
                    </button>

                    <button
                        class="delete-record-btn"
                        data-user-delete="${index}">
                        Delete
                    </button>

                </td>
            `;

        }
    );


    document
        .querySelectorAll(
            "[data-user-edit]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.getAttribute(
                                    "data-user-edit"
                                )
                            );


                        editUser(index);

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-user-delete]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.getAttribute(
                                    "data-user-delete"
                                )
                            );


                        deleteUser(index);

                    }
                );

            }
        );


    updateDashboardCounts();

}



// ============================================
// EDIT USER
// ============================================

function editUser(index) {

    const user =
        savedUsers[index];


    editingUserIndex =
        index;


    document.getElementById(
        "userId"
    ).value =
        user.userId;


    document.getElementById(
        "username"
    ).value =
        user.username;


    document.getElementById(
        "email"
    ).value =
        user.email;


    document.getElementById(
        "department"
    ).value =
        user.department;


    document.getElementById(
        "userStatus"
    ).value =
        user.status;


    document.getElementById(
        "userSubmitBtn"
    ).textContent =
        "Update User";


    document.getElementById(
        "userFormTitle"
    ).textContent =
        "Edit User";


    document.getElementById(
        "cancelUserEditBtn"
    ).classList.add(
        "show"
    );


    document.querySelector(
        "#usersPage .form-card"
    ).scrollIntoView({
        behavior: "smooth"
    });

}



// ============================================
// CANCEL USER EDIT
// ============================================

const cancelUserEditBtn =
    document.getElementById(
        "cancelUserEditBtn"
    );


cancelUserEditBtn.addEventListener(
    "click",
    function () {

        editingUserIndex = -1;


        userForm.reset();


        clearValidation(
            userForm
        );


        document.getElementById(
            "userSubmitBtn"
        ).textContent =
            "Add User";


        document.getElementById(
            "userFormTitle"
        ).textContent =
            "Add New User";


        this.classList.remove(
            "show"
        );

    }
);



// ============================================
// DELETE USER
// ============================================

function deleteUser(index) {

    const answer =
        confirm(
            "Are you sure you want to permanently delete this user?"
        );


    if (!answer) {
        return;
    }


    savedUsers.splice(
        index,
        1
    );


    saveUsers();

    displayUsers();


    alert(
        "User deleted successfully!"
    );

}



// ============================================
// USER FORM
// ============================================

const userForm =
    document.getElementById(
        "userForm"
    );


userForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const userId =
            document.getElementById(
                "userId"
            );


        const username =
            document.getElementById(
                "username"
            );


        const email =
            document.getElementById(
                "email"
            );


        const department =
            document.getElementById(
                "department"
            );


        const status =
            document.getElementById(
                "userStatus"
            );


        const userIdError =
            document.getElementById(
                "userIdError"
            );


        const usernameError =
            document.getElementById(
                "usernameError"
            );


        const emailError =
            document.getElementById(
                "emailError"
            );


        const departmentError =
            document.getElementById(
                "departmentError"
            );


        const statusError =
            document.getElementById(
                "userStatusError"
            );


        let valid = true;


        userId.value =
            userId.value
                .trim()
                .toUpperCase();


        const userIdPattern =
            /^U[0-9]{3}$/;


        if (userId.value === "") {

            showError(
                userId,
                userIdError,
                "User ID is required."
            );

            valid = false;

        } else if (
            !userIdPattern.test(
                userId.value
            )
        ) {

            showError(
                userId,
                userIdError,
                "Use format U006."
            );

            valid = false;

        } else {

            showSuccess(
                userId,
                userIdError
            );

        }


        if (
            username.value.trim() === ""
        ) {

            showError(
                username,
                usernameError,
                "Username is required."
            );

            valid = false;

        } else if (
            username.value.trim().length < 3
        ) {

            showError(
                username,
                usernameError,
                "Username must have at least 3 characters."
            );

            valid = false;

        } else {

            showSuccess(
                username,
                usernameError
            );

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            email.value.trim() === ""
        ) {

            showError(
                email,
                emailError,
                "Email is required."
            );

            valid = false;

        } else if (
            !emailPattern.test(
                email.value.trim()
            )
        ) {

            showError(
                email,
                emailError,
                "Enter a valid email address."
            );

            valid = false;

        } else {

            showSuccess(
                email,
                emailError
            );

        }


        if (
            department.value === ""
        ) {

            showError(
                department,
                departmentError,
                "Please select a department."
            );

            valid = false;

        } else {

            showSuccess(
                department,
                departmentError
            );

        }


        if (
            status.value === ""
        ) {

            showError(
                status,
                statusError,
                "Please select a status."
            );

            valid = false;

        } else {

            showSuccess(
                status,
                statusError
            );

        }


        if (!valid) {

            alert(
                "Please correct the highlighted fields."
            );

            return;

        }


        // CHECK DUPLICATE USER ID

        const duplicate =
            savedUsers.some(
                function (
                    user,
                    index
                ) {

                    return (
                        user.userId ===
                            userId.value &&
                        index !==
                            editingUserIndex
                    );

                }
            );


        if (duplicate) {

            showError(
                userId,
                userIdError,
                "This User ID already exists."
            );

            return;

        }


        const userData = {

            userId:
                userId.value,

            username:
                username.value.trim(),

            email:
                email.value.trim(),

            department:
                department.value,

            status:
                status.value

        };


        // UPDATE

        if (
            editingUserIndex !== -1
        ) {

            savedUsers[
                editingUserIndex
            ] = userData;


            alert(
                "User updated successfully!"
            );


            editingUserIndex =
                -1;

        }


        // CREATE

        else {

            savedUsers.push(
                userData
            );


            alert(
                "User added successfully!"
            );

        }


        saveUsers();

        displayUsers();


        userForm.reset();

        clearValidation(
            userForm
        );


        document.getElementById(
            "userSubmitBtn"
        ).textContent =
            "Add User";


        document.getElementById(
            "userFormTitle"
        ).textContent =
            "Add New User";


        cancelUserEditBtn.classList.remove(
            "show"
        );

    }
);



// ============================================
// AUTO UPPERCASE USER ID
// ============================================

document.getElementById(
    "userId"
).addEventListener(
    "input",
    function () {

        this.value =
            this.value.toUpperCase();

    }
);



// ============================================
// DISPLAY RESERVATIONS
// ============================================

function displayReservations() {

    const requestBody =
        document.querySelector(
            "#requestTable tbody"
        );


    const recordsBody =
        document.querySelector(
            "#recordsTable tbody"
        );


    requestBody.innerHTML =
        "";

    recordsBody.innerHTML =
        "";


    savedReservations.forEach(
        function (
            reservation,
            index
        ) {

            const requestRow =
                requestBody.insertRow();


            requestRow.innerHTML = `
                <td>${reservation.studentName}</td>
                <td>${reservation.studentId}</td>
                <td>${reservation.equipment}</td>
                <td>${reservation.date}</td>
                <td>${reservation.status}</td>

                <td>

                    <button
                        class="edit-record-btn"
                        data-reservation-edit="${index}">
                        Edit
                    </button>

                    <button
                        class="delete-record-btn"
                        data-reservation-delete="${index}">
                        Delete
                    </button>

                </td>
            `;


            const recordRow =
                recordsBody.insertRow();


            recordRow.innerHTML = `
                <td>
                    R${String(index + 1).padStart(3, "0")}
                </td>

                <td>
                    ${reservation.studentName}
                </td>

                <td>
                    ${reservation.equipment}
                </td>

                <td>
                    ${reservation.date}
                </td>

                <td>
                    ${reservation.status}
                </td>
            `;

        }
    );


    document
        .querySelectorAll(
            "[data-reservation-edit]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.getAttribute(
                                    "data-reservation-edit"
                                )
                            );


                        editReservation(
                            index
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-reservation-delete]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.getAttribute(
                                    "data-reservation-delete"
                                )
                            );


                        deleteReservation(
                            index
                        );

                    }
                );

            }
        );


    updateDashboardCounts();

}



// ============================================
// EDIT RESERVATION
// ============================================

function editReservation(index) {

    const reservation =
        savedReservations[index];


    editingReservationIndex =
        index;


    document.getElementById(
        "studentName"
    ).value =
        reservation.studentName;


    document.getElementById(
        "studentId"
    ).value =
        reservation.studentId;


    document.getElementById(
        "equipmentSelect"
    ).value =
        reservation.equipment;


    document.getElementById(
        "reservationDate"
    ).value =
        reservation.date;


    document.getElementById(
        "reservationPurpose"
    ).value =
        reservation.purpose;


    showDashboardPage(
        "reservationPage"
    );


    menuButtons.forEach(
        function (button) {

            button.classList.remove(
                "active"
            );


            if (
                button.getAttribute(
                    "data-page"
                ) ===
                "reservationPage"
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    document.getElementById(
        "reservationSubmitBtn"
    ).textContent =
        "Update Reservation";


    document.getElementById(
        "reservationFormTitle"
    ).textContent =
        "Edit Reservation";


    document.getElementById(
        "cancelReservationEditBtn"
    ).classList.add(
        "show"
    );

}



// ============================================
// CANCEL RESERVATION EDIT
// ============================================

const cancelReservationEditBtn =
    document.getElementById(
        "cancelReservationEditBtn"
    );


cancelReservationEditBtn.addEventListener(
    "click",
    function () {

        editingReservationIndex =
            -1;


        reservationForm.reset();

        clearValidation(
            reservationForm
        );


        document.getElementById(
            "reservationSubmitBtn"
        ).textContent =
            "Submit Reservation";


        document.getElementById(
            "reservationFormTitle"
        ).textContent =
            "Add Reservation";


        this.classList.remove(
            "show"
        );

    }
);



// ============================================
// DELETE RESERVATION
// ============================================

function deleteReservation(index) {

    const answer =
        confirm(
            "Are you sure you want to permanently delete this reservation?"
        );


    if (!answer) {
        return;
    }


    savedReservations.splice(
        index,
        1
    );


    saveReservations();

    displayReservations();


    alert(
        "Reservation deleted successfully!"
    );

}



// ============================================
// RESERVATION FORM
// ============================================

const reservationForm =
    document.getElementById(
        "reservationForm"
    );


reservationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const studentName =
            document.getElementById(
                "studentName"
            );


        const studentId =
            document.getElementById(
                "studentId"
            );


        const equipment =
            document.getElementById(
                "equipmentSelect"
            );


        const reservationDate =
            document.getElementById(
                "reservationDate"
            );


        const purpose =
            document.getElementById(
                "reservationPurpose"
            );


        const studentNameError =
            document.getElementById(
                "studentNameError"
            );


        const studentIdError =
            document.getElementById(
                "studentIdError"
            );


        const equipmentError =
            document.getElementById(
                "equipmentError"
            );


        const dateError =
            document.getElementById(
                "reservationDateError"
            );


        const purposeError =
            document.getElementById(
                "purposeError"
            );


        let valid = true;


        if (
            studentName.value.trim() === ""
        ) {

            showError(
                studentName,
                studentNameError,
                "Student name is required."
            );

            valid = false;

        } else {

            showSuccess(
                studentName,
                studentNameError
            );

        }


        const studentIdPattern =
            /^[0-9]{4}-[0-9]{5}$/;


        if (
            !studentIdPattern.test(
                studentId.value.trim()
            )
        ) {

            showError(
                studentId,
                studentIdError,
                "Use format 2024-12345."
            );

            valid = false;

        } else {

            showSuccess(
                studentId,
                studentIdError
            );

        }


        if (
            equipment.value === ""
        ) {

            showError(
                equipment,
                equipmentError,
                "Please select equipment."
            );

            valid = false;

        } else {

            showSuccess(
                equipment,
                equipmentError
            );

        }


        if (
            reservationDate.value === ""
        ) {

            showError(
                reservationDate,
                dateError,
                "Reservation date is required."
            );

            valid = false;

        } else {

            showSuccess(
                reservationDate,
                dateError
            );

        }


        if (
            purpose.value.trim().length < 5
        ) {

            showError(
                purpose,
                purposeError,
                "Purpose must have at least 5 characters."
            );

            valid = false;

        } else {

            showSuccess(
                purpose,
                purposeError
            );

        }


        if (!valid) {

            alert(
                "Please correct the highlighted fields."
            );

            return;

        }


        const reservationData = {

            studentName:
                studentName.value.trim(),

            studentId:
                studentId.value.trim(),

            equipment:
                equipment.value,

            date:
                reservationDate.value,

            purpose:
                purpose.value.trim(),

            status:
                "Pending"

        };


        if (
            editingReservationIndex !== -1
        ) {

            savedReservations[
                editingReservationIndex
            ] = reservationData;


            editingReservationIndex =
                -1;


            alert(
                "Reservation updated successfully!"
            );

        } else {

            savedReservations.push(
                reservationData
            );


            alert(
                "Reservation added successfully!"
            );

        }


        saveReservations();

        displayReservations();


        reservationForm.reset();

        clearValidation(
            reservationForm
        );


        document.getElementById(
            "reservationSubmitBtn"
        ).textContent =
            "Submit Reservation";


        document.getElementById(
            "reservationFormTitle"
        ).textContent =
            "Add Reservation";


        cancelReservationEditBtn.classList.remove(
            "show"
        );


        showDashboardPage(
            "requestsPage"
        );

    }
);



// ============================================
// COUNTS
// ============================================

function updateDashboardCounts() {

    document.getElementById(
        "userCount"
    ).textContent =
        savedUsers.length;


    document.getElementById(
        "reservationCount"
    ).textContent =
        savedReservations.length;

}



// ============================================
// LOAD RECORDS
// ============================================

displayUsers();

displayReservations();

updateDashboardCounts();