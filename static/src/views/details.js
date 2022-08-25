import { getGameById } from '../api/games.js';
import { html } from '../lib/lit-html.js';
import { repeat } from '../lib/directives/repeat.js';
import { until } from '../lib/directives/until.js';

const detailsTemplate = (gamePromise) => html`
<section>
    ${until(gamePromise, html`<h1>Lobby</h1>
    <p>Loading details...</p>`)}
</section>`;


export async function detailsView (ctx) {
    
    ctx.render(detailsTemplate(loadGames(ctx)));
}

async function loadGames(ctx) {
    const gameId = ctx.params.id;
    const game = await getGameById(gameId);
    return html`
    <h1>${game.name}</h1>
    <p>Mode: ${game.mode}</p>`;
}