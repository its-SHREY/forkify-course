import View from './View';
import icon from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage =
    'We could not find the recipe. Please search correct recipe again';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(el => window.addEventListener(el, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.imageUrl}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icon}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings"data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icon}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icon}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icon}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients //returns a string with updated elements for each part
              .map(this._generateMarkupIngredients)
              .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  _generateMarkupIngredients(ing) {
    return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icon}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toString() : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
  }
}

export default new RecipeView();
