// ============================================
// LOGIN ACCOUNT
// ============================================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";



// ============================================
// GET ELEMENTS
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
// TASK 7 LOCAL STORAGE
// ============================================

let savedUsers =
    JSON.parse(
        localStorage.getItem(
            "cssUsers"
        )
    ) || [];


let savedReservations =
    JSON.parse(
        localStorage.getItem(
            "cssReservations"
        )
    ) || [];



function saveUsers() {

    localStorage.setItem(
        "cssUsers",
        JSON.stringify(savedUsers)
    );

}



function saveReservations() {

    localStorage.setItem(
        "cssReservations",
        JSON.stringify(
            savedReservations
        )
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

            error.textContent =
                "";

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
// LOGIN VALIDATION
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


        // USERNAME

        if (username === "") {

            showError(
                loginUsername,
                usernameError,
                "Username is required."
            );

            valid = false;

        } else if (
            username.length < 3
        ) {

            showError(
                loginUsername,
                usernameError,
                "Username must contain at least 3 characters."
            );

            valid = false;

        } else {

            showSuccess(
                loginUsername,
                usernameError
            );

        }


        // PASSWORD

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
                "Password must contain at least 8 characters."
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
            username ===
                ADMIN_USERNAME &&
            password ===
                ADMIN_PASSWORD
        ) {

            sessionStorage.setItem(
                "loggedInUser",
                username
            );


            clearValidation(
                loginForm
            );


            loginForm.reset();


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
// SIDEBAR NAVIGATION
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



function showDashboardPage(
    pageId
) {

    dashboardPages.forEach(
        function (page) {

            page.classList.remove(
                "active-page"
            );

        }
    );


    const selectedPage =
        document.getElementById(
            pageId
        );


    if (selectedPage) {

        selectedPage.classList.add(
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

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmLogout) {

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
                        class="delete-record-btn"
                        data-user-index="${index}">
                        Delete
                    </button>
                </td>
            `;

        }
    );


    const buttons =
        document.querySelectorAll(
            "[data-user-index]"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.getAttribute(
                                "data-user-index"
                            )
                        );


                    deleteUser(
                        index
                    );

                }
            );

        }
    );


    updateDashboardCounts();

}



// ============================================
// DELETE USER
// ============================================

function deleteUser(index) {

    const answer =
        confirm(
            "Are you sure you want to delete this user?"
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

}



// ============================================
// ADD USER
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



        // USER ID

        const userIdPattern =
            /^U[0-9]{3}$/;


        userId.value =
            userId.value
                .trim()
                .toUpperCase();


        if (
            userId.value === ""
        ) {

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



        // USERNAME

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
            username.value
                .trim()
                .length < 3
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



        // EMAIL

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



        // DEPARTMENT

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



        // STATUS

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



        // CHECK DUPLICATE ID

        const duplicate =
            savedUsers.some(
                function (user) {

                    return (
                        user.userId ===
                        userId.value
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



        // CREATE OBJECT

        const newUser = {

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


        // STORE

        savedUsers.push(
            newUser
        );


        saveUsers();

        displayUsers();


        alert(
            "User saved successfully!"
        );


        userForm.reset();

        clearValidation(
            userForm
        );

    }
);



// ============================================
// AUTO UPPERCASE USER ID
// ============================================

const userIdInput =
    document.getElementById(
        "userId"
    );


userIdInput.addEventListener(
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
                        class="delete-record-btn"
                        data-reservation-index="${index}">
                        Delete
                    </button>
                </td>
            `;


            const recordRow =
                recordsBody.insertRow();


            recordRow.innerHTML = `
                <td>R${String(index + 1).padStart(3, "0")}</td>
                <td>${reservation.studentName}</td>
                <td>${reservation.equipment}</td>
                <td>${reservation.date}</td>
                <td>${reservation.status}</td>
            `;

        }
    );


    const deleteButtons =
        document.querySelectorAll(
            "[data-reservation-index]"
        );


    deleteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.getAttribute(
                                "data-reservation-index"
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
// DELETE RESERVATION
// ============================================

function deleteReservation(
    index
) {

    const answer =
        confirm(
            "Are you sure you want to delete this reservation?"
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

}



// ============================================
// NEW RESERVATION
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



        // STUDENT NAME

        if (
            studentName.value
                .trim() === ""
        ) {

            showError(
                studentName,
                studentNameError,
                "Student name is required."
            );

            valid = false;

        } else if (
            studentName.value
                .trim()
                .length < 3
        ) {

            showError(
                studentName,
                studentNameError,
                "Enter at least 3 characters."
            );

            valid = false;

        } else {

            showSuccess(
                studentName,
                studentNameError
            );

        }



        // STUDENT ID

        const studentIdPattern =
            /^[0-9]{4}-[0-9]{5}$/;


        if (
            studentId.value
                .trim() === ""
        ) {

            showError(
                studentId,
                studentIdError,
                "Student ID is required."
            );

            valid = false;

        } else if (
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



        // EQUIPMENT

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



        // DATE

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

            const selectedDate =
                new Date(
                    reservationDate.value +
                    "T00:00:00"
                );


            const today =
                new Date();


            today.setHours(
                0,
                0,
                0,
                0
            );


            if (
                selectedDate < today
            ) {

                showError(
                    reservationDate,
                    dateError,
                    "Reservation date cannot be in the past."
                );

                valid = false;

            } else {

                showSuccess(
                    reservationDate,
                    dateError
                );

            }

        }



        // PURPOSE

        if (
            purpose.value
                .trim() === ""
        ) {

            showError(
                purpose,
                purposeError,
                "Purpose is required."
            );

            valid = false;

        } else if (
            purpose.value
                .trim()
                .length < 5
        ) {

            showError(
                purpose,
                purposeError,
                "Enter at least 5 characters."
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



        // CREATE OBJECT

        const newReservation = {

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


        savedReservations.push(
            newReservation
        );


        saveReservations();

        displayReservations();


        alert(
            "Reservation saved successfully!"
        );


        reservationForm.reset();

        clearValidation(
            reservationForm
        );


        showDashboardPage(
            "requestsPage"
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
                    "requestsPage"
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);



// ============================================
// DASHBOARD COUNTS
// ============================================

function updateDashboardCounts() {

    const reservationCount =
        document.getElementById(
            "reservationCount"
        );


    const userCount =
        document.getElementById(
            "userCount"
        );


    if (reservationCount) {

        reservationCount.textContent =
            savedReservations.length;

    }


    if (userCount) {

        userCount.textContent =
            savedUsers.length;

    }

}



// ============================================
// LOAD SAVED DATA
// ============================================

displayUsers();

displayReservations();

updateDashboardCounts();