async function userLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const welcomeBlock = document.querySelector("#welcome");
  const usersContainer = document.getElementById("users");

  if (!username || !password) {
    alert("請輸入用戶名與密碼。");
    return;
  }

  const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#%&@\^`~])[a-zA-Z0-9#%&@\^`~]{8,64}$/;

  if (!USERNAME_REGEX.test(username)) {
    alert("用戶名格式錯誤，請使用 3–20 個字元的英文、數字或底線。");
    return;
  }

  if (!PASSWORD_REGEX.test(password)) {
    alert("密碼格式錯誤，需包含至少一個小寫字母、大寫字母、數字與符號（#%&@^`~），且僅能包含這些字元，長度 8–64 字元。");
    return;
  }

  try {
    const res = await fetch("https://worker-backend-lab05.undecv.workers.dev/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "登入失敗");
      return;
    }

    // 顯示歡迎區塊
    welcomeBlock.style.display = "block";

    // 建立使用者資訊元素
    const userBlock = document.createElement("div");
    userBlock.className = "link-block dark-block";
    userBlock.innerHTML = `
      <a>
        <div class="icon">
          <img src="./assets/images/avatar.default.jpg">
        </div>
        <div class="text">
          <p class="main">${result.username}</p>
          <p class="sub">UID: <code>${result.uid}</code></p>
        </div>
      </a>
    `;

    usersContainer.appendChild(userBlock);
  } catch (err) {
    console.error("登入錯誤：", err);
    alert("伺服器錯誤，請稍後再試。");
  }
}
