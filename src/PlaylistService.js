const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

    async getPlaylists(playlistId) {
        const query = {
          
            text: `SELECT songs.id, songs.title, songs.performer FROM playlistsongs, songs
            WHERE songs.id = playlistsongs.song_id and playlistsongs.playlist_id = $1 `,
            values: [playlistId],
          };
          const result = await this._pool.query(query);
          return result.rows;
    }
}

module.exports = PlaylistsService;