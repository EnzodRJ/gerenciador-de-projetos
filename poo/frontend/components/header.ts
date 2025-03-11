document.addEventListener("DOMContentLoaded", function () {
    const profileMenu = document.getElementById("profile-menu") as HTMLElement;
    const profileBtn = document.getElementById("profile-btn") as HTMLElement;

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener("click", () => {
            profileMenu.classList.toggle("hidden");
        });

        document.addEventListener("click", (event: MouseEvent) => {
            const target = event.target as Node;

            if (!profileBtn.contains(target) && !profileMenu.contains(target)) {
                profileMenu.classList.add("hidden");
            }
        });
    }
});