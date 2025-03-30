window.addEventListener("DOMContentLoaded", loadUsers);

async function loadUsers() {
  const usersContainer = document.getElementById("users");
  const loadingBlock = document.getElementById("loading");
  usersContainer.innerHTML = ""; // 清空原本內容

  try {
    const res = await fetch("https://worker-backend-lab05.undecv.workers.dev/api/user/list");
    const users = await res.json();

    if (!res.ok) {
      console.error("載入用戶失敗：", users.error);
      return;
    }

    users.forEach(user => {
      const userBlock = document.createElement("div");
      userBlock.className = "link-block dark-block";
      userBlock.innerHTML = `
        <a>
          <div class="icon">
            <img src="./assets/images/avatar.default.jpg">
          </div>
          <div class="text">
            <p class="main">${user.username}</p>
            <p class="super-small-text">UID: <code>${user.uid}</code></p>
          </div>
        </a>
      `;
      usersContainer.appendChild(userBlock);
      loadingBlock.style.display = "none";
    });
  } catch (err) {
    console.error("載入用戶時發生錯誤：", err);
  }
}
