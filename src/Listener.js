class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
      }

      async listen(message) {
        try {
            const { playlistId,targetEmail } = JSON.parse(message.content.toString());

            const playlists = await this._playlistsService.getPlaylists(playlistId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists));
            console.log(JSON.stringify(playlists));
          } catch (error) {
            console.error(error);
          }
    }
}
 
module.exports = Listener;