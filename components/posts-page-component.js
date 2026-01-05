import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
// Имортируем массив данных 'posts' и функцию навигации 'goToPage'
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // Удоляем статику
  const postsHtml = posts.map((post) => {
    return `
      <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button">
            <img src="./assets/images/like-not-active.svg">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${post.likes.length}</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          ${post.createdAt} </p>
      </li>`;
  }).join(""); // Превращаем массив строк в одну сплошную HTML-строку

  // Вставляем сгенерированный список в общую оболочку страницы
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHtml} </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  // Шапка одна для всех страниц
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  // Обработчик кликов на заголовки постов
  // goToPage при клике на заголовок дожны попасть в профиль автора
  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}