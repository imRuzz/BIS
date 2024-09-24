document.addEventListener("DOMContentLoaded", function () {
            const menuToggle = document.getElementById("menu-toggle");
            const sidebar = document.getElementById("sidebar");

            // Toggle the 'active' class on the sidebar when the toggle button is clicked
            menuToggle.addEventListener("click", function () {
                sidebar.classList.toggle("active");
            });
        });